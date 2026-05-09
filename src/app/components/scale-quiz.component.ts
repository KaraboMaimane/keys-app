import {
  Component, signal, computed, OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

// ── White-key data ────────────────────────────────────────────────────────────
// 15 white keys: C3 through E4 (2+ octaves, covers one full C major scale)
const WHITE_KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
// Map: display octave positions (index 0 = leftmost C shown)
// We render 2 octaves of white keys: C D E F G A B  C D E F G A B  C
const KEYS_LAYOUT: { name: string; octave: number; pos: number }[] = [];
for (let oct = 0; oct <= 1; oct++) {
  WHITE_KEYS.forEach((n, i) => {
    KEYS_LAYOUT.push({ name: n, octave: oct, pos: oct * 7 + i });
  });
}
KEYS_LAYOUT.push({ name: 'C', octave: 2, pos: 14 }); // final C

// Scale membership
const C_MAJOR = new Set(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
const A_MINOR = new Set(['A', 'B', 'C', 'D', 'E', 'F', 'G']); // natural

type QuizMode = 'name-to-key' | 'key-to-name';
type Scale     = 'C-major' | 'A-minor' | 'both';

interface QuizQuestion {
  type: QuizMode;
  targetName: string;     // e.g. 'F'
  targetPos: number;      // index in KEYS_LAYOUT (used for key-to-name)
  options: string[];      // 4 note-name options (for name-to-key: shown on keys; for key-to-name: shown as buttons)
}

@Component({
  selector: 'app-scale-quiz',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('cardFlip', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px) scale(0.97)' }),
        animate('280ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ])
    ]),
    trigger('resultAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.7)' }),
        animate('220ms cubic-bezier(0.34,1.56,0.64,1)', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ],
  template: `
    <div class="sq-wrap">

      <!-- ── Header / controls ── -->
      <div class="sq-header">
        <span class="sq-title">
          <i class="ti ti-cards"></i> Note Quiz
        </span>
        <div class="sq-controls">
          <!-- Scale selector -->
          <div class="sq-toggle-row">
            <button *ngFor="let s of scaleOptions"
                    class="sq-opt-btn"
                    [class.sq-opt-active]="scale() === s.value"
                    (click)="scale.set(s.value)">
              {{ s.label }}
            </button>
          </div>
          <!-- Mode selector -->
          <div class="sq-toggle-row">
            <button class="sq-opt-btn" [class.sq-opt-active]="mode() === 'name-to-key'"
                    (click)="mode.set('name-to-key'); newQuestion()" title="Show name → find it on the keyboard">
              Name → Key
            </button>
            <button class="sq-opt-btn" [class.sq-opt-active]="mode() === 'key-to-name'"
                    (click)="mode.set('key-to-name'); newQuestion()" title="See highlighted key → name it">
              Key → Name
            </button>
          </div>
        </div>
      </div>

      <!-- ── Score bar ── -->
      <div class="sq-score-row">
        <div class="sq-score-chip sq-correct">
          <i class="ti ti-check"></i> {{ correct() }}
        </div>
        <div class="sq-streak-chip" *ngIf="streak() >= 3">
          <i class="ti ti-flame"></i> {{ streak() }} streak!
        </div>
        <div class="sq-score-chip sq-wrong">
          <i class="ti ti-x"></i> {{ wrong() }}
        </div>
      </div>

      <!-- ── Question area ── -->
      <div class="sq-question" [@cardFlip]="q()?.targetName" *ngIf="q() as question">

        <!-- Prompt -->
        <div class="sq-prompt" [ngSwitch]="mode()">
          <div *ngSwitchCase="'name-to-key'">
            Find this note on the keyboard:
            <span class="sq-note-badge">{{ question.targetName }}</span>
          </div>
          <div *ngSwitchCase="'key-to-name'">
            What note is <span class="sq-note-badge">highlighted</span>?
          </div>
        </div>

        <!-- ── Mini keyboard ── -->
        <div class="sq-keyboard">
          <div *ngFor="let key of keysLayout; let ki = index"
               class="sq-white-key"
               [class.sq-key-scale]="isInScale(key.name)"
               [class.sq-key-target]="mode() === 'key-to-name' && ki === question.targetPos"
               [class.sq-key-correct]="answered() && ki === question.targetPos && lastCorrect()"
               [class.sq-key-wrong]="answered() && ki === question.targetPos && !lastCorrect()"
               [class.sq-key-clickable]="mode() === 'name-to-key' && !answered()"
               (click)="mode() === 'name-to-key' && !answered() && onKeyClick(ki, key.name)">

            <!-- Only show name label when answered or always for key-to-name after answer -->
            <span class="sq-key-label"
                  [class.sq-label-visible]="
                    answered() ||
                    (mode() === 'key-to-name' && ki === question.targetPos)
                  ">
              {{ key.name }}
            </span>
          </div>
        </div>

        <!-- ── Name buttons (key-to-name mode only) ── -->
        <div class="sq-name-buttons" *ngIf="mode() === 'key-to-name' && !answered()">
          <button *ngFor="let opt of question.options"
                  class="sq-name-btn"
                  (click)="onNameClick(opt, question.targetName)">
            {{ opt }}
          </button>
        </div>

        <!-- ── Result feedback ── -->
        <div class="sq-result" *ngIf="answered()" [@resultAnim]>
          <div class="sq-result-inner"
               [class.sq-result-correct]="lastCorrect()"
               [class.sq-result-wrong]="!lastCorrect()">
            <i class="ti" [class.ti-check]="lastCorrect()" [class.ti-x]="!lastCorrect()"></i>
            <span>{{ lastCorrect() ? 'Correct!' : 'The answer was ' + q()!.targetName }}</span>
          </div>
          <button class="sq-next-btn" (click)="newQuestion()">
            Next <i class="ti ti-arrow-right"></i>
          </button>
        </div>

        <!-- ── Scale membership hint ── -->
        <div class="sq-hint">
          <span class="sq-hint-label">
            <i class="ti ti-info-circle"></i>
            {{ scaleName() }} notes:
          </span>
          <span *ngFor="let n of scaleNotes()" class="sq-note-chip">{{ n }}</span>
        </div>

      </div>

    </div>
  `,
  styles: [`
    .sq-wrap {
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.09);
      border-radius: 16px;
      padding: 16px;
      display: flex; flex-direction: column; gap: 14px;
    }

    /* ── Header ── */
    .sq-header {
      display: flex; flex-direction: column; gap: 10px;
    }
    .sq-title {
      font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--text-muted);
      display: flex; align-items: center; gap: 6px;
      i { font-size: 14px; }
    }
    .sq-controls {
      display: flex; flex-direction: column; gap: 6px;
    }
    .sq-toggle-row {
      display: flex; gap: 5px; flex-wrap: wrap;
    }
    .sq-opt-btn {
      padding: 5px 12px; border-radius: 99px; font-size: 10px; font-weight: 700;
      border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04);
      color: var(--text-muted); cursor: pointer; transition: all 0.15s; letter-spacing: 0.04em;
      &:hover { background: rgba(255,255,255,0.09); color: var(--text-secondary); }
      &.sq-opt-active {
        background: rgba(139,126,248,0.18); border-color: rgba(139,126,248,0.5); color: #c4bbfe;
      }
    }

    /* ── Score ── */
    .sq-score-row {
      display: flex; align-items: center; gap: 8px;
    }
    .sq-score-chip {
      display: flex; align-items: center; gap: 5px;
      padding: 4px 12px; border-radius: 99px;
      font-family: var(--font-display); font-size: 13px; font-weight: 900;
      i { font-size: 12px; }
      &.sq-correct {
        background: rgba(52,211,153,0.12); border: 1px solid rgba(52,211,153,0.3); color: #34d399;
      }
      &.sq-wrong {
        background: rgba(251,113,133,0.12); border: 1px solid rgba(251,113,133,0.3); color: #fb7185;
      }
    }
    .sq-streak-chip {
      flex: 1; text-align: center;
      font-family: var(--font-display); font-size: 11px; font-weight: 700;
      color: #fbbf24; letter-spacing: 0.04em;
      display: flex; align-items: center; justify-content: center; gap: 5px;
      i { font-size: 14px; color: #fb923c; }
    }

    /* ── Question ── */
    .sq-question {
      display: flex; flex-direction: column; gap: 14px;
    }
    .sq-prompt {
      font-size: 14px; font-weight: 600; color: var(--text-secondary);
      text-align: center; line-height: 1.5;
    }
    .sq-note-badge {
      display: inline-block;
      font-family: var(--font-display); font-size: 20px; font-weight: 900; color: #c4bbfe;
      background: rgba(139,126,248,0.18); border: 1px solid rgba(139,126,248,0.4);
      border-radius: 10px; padding: 2px 14px; margin: 0 4px;
      letter-spacing: 0.04em;
    }

    /* ── Keyboard ── */
    .sq-keyboard {
      display: flex; gap: 3px; justify-content: center;
      padding: 4px 0 8px;
    }
    .sq-white-key {
      flex: 1; max-width: 38px; min-width: 18px;
      height: 80px; border-radius: 0 0 8px 8px;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.12);
      display: flex; align-items: flex-end; justify-content: center;
      padding-bottom: 6px;
      transition: all 0.15s; position: relative;
      cursor: default; user-select: none;

      &.sq-key-scale {
        background: rgba(255,255,255,0.11);
        border-color: rgba(255,255,255,0.2);
      }
      &.sq-key-clickable {
        cursor: pointer;
        &:hover {
          background: rgba(139,126,248,0.25);
          border-color: rgba(139,126,248,0.6);
          transform: scaleY(0.97);
        }
        &:active { transform: scaleY(0.94); }
      }
      &.sq-key-target {
        background: rgba(139,126,248,0.3) !important;
        border-color: #a78bfa !important;
        box-shadow: 0 0 16px rgba(139,126,248,0.5);
        animation: keyPulse 1.2s ease-in-out infinite;
      }
      &.sq-key-correct {
        background: rgba(52,211,153,0.35) !important;
        border-color: #34d399 !important;
        box-shadow: 0 0 16px rgba(52,211,153,0.5);
        animation: none;
      }
      &.sq-key-wrong {
        background: rgba(251,113,133,0.25) !important;
        border-color: #fb7185 !important;
        animation: none;
      }
    }

    @keyframes keyPulse {
      0%, 100% { box-shadow: 0 0 12px rgba(139,126,248,0.4); }
      50%       { box-shadow: 0 0 24px rgba(139,126,248,0.75); }
    }

    .sq-key-label {
      font-size: 9px; font-weight: 700; color: var(--text-muted);
      opacity: 0; transition: opacity 0.2s; text-align: center;
      &.sq-label-visible { opacity: 1; }
    }

    /* ── Name buttons ── */
    .sq-name-buttons {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;
    }
    .sq-name-btn {
      padding: 12px 6px; border-radius: 10px; cursor: pointer;
      font-family: var(--font-display); font-size: 16px; font-weight: 900; letter-spacing: 0.04em;
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12);
      color: var(--text-primary); transition: all 0.15s;
      &:hover { background: rgba(139,126,248,0.18); border-color: rgba(139,126,248,0.5); color: #c4bbfe; }
      &:active { transform: scale(0.95); }
    }

    /* ── Result ── */
    .sq-result {
      display: flex; flex-direction: column; gap: 10px; align-items: center;
    }
    .sq-result-inner {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 20px; border-radius: 12px;
      font-size: 14px; font-weight: 700;
      &.sq-result-correct {
        background: rgba(52,211,153,0.15); border: 1px solid rgba(52,211,153,0.4); color: #34d399;
      }
      &.sq-result-wrong {
        background: rgba(251,113,133,0.12); border: 1px solid rgba(251,113,133,0.3); color: #fb7185;
      }
      i { font-size: 18px; }
    }
    .sq-next-btn {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 24px; border-radius: 10px; cursor: pointer;
      font-family: var(--font-display); font-size: 12px; font-weight: 700; letter-spacing: 0.06em;
      background: rgba(139,126,248,0.15); border: 1px solid rgba(139,126,248,0.4); color: #c4bbfe;
      transition: all 0.2s;
      i { font-size: 16px; transition: transform 0.2s; }
      &:hover { background: rgba(139,126,248,0.25); i { transform: translateX(4px); } }
    }

    /* ── Hint ── */
    .sq-hint {
      display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
      padding: 8px 10px; border-radius: 10px;
      background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06);
    }
    .sq-hint-label {
      font-size: 10px; font-weight: 700; color: var(--text-muted);
      letter-spacing: 0.06em; text-transform: uppercase;
      display: flex; align-items: center; gap: 4px;
      i { font-size: 12px; }
    }
    .sq-note-chip {
      font-family: var(--font-display); font-size: 11px; font-weight: 700;
      padding: 2px 8px; border-radius: 6px;
      background: rgba(139,126,248,0.12); border: 1px solid rgba(139,126,248,0.25);
      color: #a78bfa;
    }
  `]
})
export class ScaleQuizComponent implements OnInit {

  keysLayout = KEYS_LAYOUT;

  scale = signal<Scale>('C-major');
  mode  = signal<QuizMode>('name-to-key');

  q            = signal<QuizQuestion | null>(null);
  answered     = signal(false);
  lastCorrect  = signal(false);
  correct      = signal(0);
  wrong        = signal(0);
  streak       = signal(0);

  scaleOptions = [
    { label: 'C major', value: 'C-major' as Scale },
    { label: 'A minor', value: 'A-minor' as Scale },
    { label: 'Both',    value: 'both'    as Scale },
  ];

  private getActiveNotes(): string[] {
    const s = this.scale();
    if (s === 'C-major') return [...C_MAJOR];
    if (s === 'A-minor') return [...A_MINOR];
    return [...new Set([...C_MAJOR, ...A_MINOR])];
  }

  isInScale(name: string): boolean {
    return this.getActiveNotes().includes(name);
  }

  scaleName = computed(() => {
    if (this.scale() === 'C-major') return 'C major';
    if (this.scale() === 'A-minor') return 'A minor';
    return 'C maj / A min';
  });

  scaleNotes = computed(() => {
    if (this.scale() === 'C-major') return ['C','D','E','F','G','A','B'];
    if (this.scale() === 'A-minor') return ['A','B','C','D','E','F','G'];
    return ['C','D','E','F','G','A','B'];
  });

  ngOnInit(): void { this.newQuestion(); }

  newQuestion(): void {
    this.answered.set(false);

    const notes = this.getActiveNotes(); // 7 unique note names
    // Pick a random target note name
    const targetName = notes[Math.floor(Math.random() * notes.length)];

    // For key-to-name: pick a specific key position in the layout that matches
    const matchingPositions = KEYS_LAYOUT
      .map((k, i) => ({ ...k, i }))
      .filter(k => k.name === targetName);
    const targetEntry = matchingPositions[Math.floor(Math.random() * matchingPositions.length)];

    // Build 4 options (always includes the correct answer, 3 distractors from scale)
    const distractors = notes.filter(n => n !== targetName);
    const shuffled    = this.shuffle(distractors).slice(0, 3);
    const options     = this.shuffle([targetName, ...shuffled]);

    this.q.set({
      type: this.mode(),
      targetName,
      targetPos: targetEntry.i,
      options,
    });
  }

  onKeyClick(pos: number, name: string): void {
    if (this.answered()) return;
    const correct = name === this.q()!.targetName;
    this.recordResult(correct);
  }

  onNameClick(chosen: string, correct: string): void {
    if (this.answered()) return;
    this.recordResult(chosen === correct);
  }

  private recordResult(isCorrect: boolean): void {
    this.answered.set(true);
    this.lastCorrect.set(isCorrect);
    if (isCorrect) {
      this.correct.update(n => n + 1);
      this.streak.update(n => n + 1);
    } else {
      this.wrong.update(n => n + 1);
      this.streak.set(0);
    }
  }

  private shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
  }
}

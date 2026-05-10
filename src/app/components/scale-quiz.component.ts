import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

// ── Layout constants ──────────────────────────────────────────────────────────
const WK_W = 34, WK_GAP = 2, WK_STEP = 36, WK_H = 120;
const BK_W = 22, BK_H = 75;
const KB_W = 15 * WK_STEP - WK_GAP; // 538

// 15 white keys: C D E F G A B | C D E F G A B | C
const NOTE_NAMES = ['C','D','E','F','G','A','B'];
const WHITE_KEYS = [...Array(15)].map((_, i) => ({
  name: NOTE_NAMES[i % 7],
  octave: Math.floor(i / 7),
  idx: i,
  x: i * WK_STEP,
}));

// Black key positions per octave: gaps between (C,D),(D,E),(F,G),(G,A),(A,B)
const BK_PER_OCT = [
  { name:'C#', wGap:0 }, { name:'D#', wGap:1 },
  { name:'F#', wGap:3 }, { name:'G#', wGap:4 }, { name:'A#', wGap:5 },
];
const BLACK_KEYS = [0,1].flatMap(oct =>
  BK_PER_OCT.map(bk => ({
    name: bk.name,
    x: oct * 7 * WK_STEP + bk.wGap * WK_STEP + WK_W - Math.floor(BK_W / 2),
  }))
);

const C_MAJOR = new Set(['C','D','E','F','G','A','B']);
const A_MINOR = new Set(['A','B','C','D','E','F','G']);

type QuizMode = 'name-to-key' | 'key-to-name';
type Scale    = 'C-major' | 'A-minor' | 'both';
interface Q { targetName: string; targetPos: number; options: string[]; }

@Component({
  selector: 'app-scale-quiz',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(8px)' }),
        animate('260ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('pop', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.75)' }),
        animate('200ms cubic-bezier(0.34,1.56,0.64,1)', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ],
  template: `
<div class="sq-wrap">

  <!-- Header -->
  <div class="sq-header">
    <span class="sq-title"><i class="ti ti-piano"></i> Note Quiz</span>
    <div class="sq-rows">
      <div class="sq-toggle-row">
        <button *ngFor="let s of scaleOpts" class="sq-btn" [class.sq-on]="scale()===s.v" (click)="scale.set(s.v);newQ()">{{s.l}}</button>
      </div>
      <div class="sq-toggle-row">
        <button class="sq-btn" [class.sq-on]="mode()==='name-to-key'" (click)="mode.set('name-to-key');newQ()">Name → Key</button>
        <button class="sq-btn" [class.sq-on]="mode()==='key-to-name'" (click)="mode.set('key-to-name');newQ()">Key → Name</button>
      </div>
    </div>
  </div>

  <!-- Score -->
  <div class="sq-score-row">
    <span class="sq-chip sq-ok"><i class="ti ti-check"></i> {{correct()}}</span>
    <span class="sq-streak" *ngIf="streak()>=3"><i class="ti ti-flame"></i> {{streak()}} streak!</span>
    <span class="sq-chip sq-bad"><i class="ti ti-x"></i> {{wrong()}}</span>
  </div>

  <!-- Question -->
  <div *ngIf="q() as question" [@fadeSlide]="question.targetName">

    <!-- Prompt -->
    <p class="sq-prompt" [ngSwitch]="mode()">
      <ng-container *ngSwitchCase="'name-to-key'">
        Find this note: <span class="sq-badge">{{question.targetName}}</span>
      </ng-container>
      <ng-container *ngSwitchCase="'key-to-name'">
        What note is <span class="sq-badge">highlighted</span>?
      </ng-container>
    </p>

    <!-- ── SVG Piano ── -->
    <div class="sq-piano-wrap">
      <svg [attr.viewBox]="'0 0 '+kbW+' '+kbH" class="sq-piano-svg" [attr.aria-label]="'Piano keyboard'">
        <defs>
          <!-- White key gradients -->
          <linearGradient id="wk-n" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f5f4f0"/>
            <stop offset="85%" stop-color="#e2e0d8"/>
            <stop offset="100%" stop-color="#cac8be"/>
          </linearGradient>
          <linearGradient id="wk-h" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ddd8ff"/>
            <stop offset="100%" stop-color="#bab0fc"/>
          </linearGradient>
          <linearGradient id="wk-t" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#c8bbff"/>
            <stop offset="100%" stop-color="#9d8ef8"/>
          </linearGradient>
          <linearGradient id="wk-ok" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#a8f5d8"/>
            <stop offset="100%" stop-color="#5dddb0"/>
          </linearGradient>
          <linearGradient id="wk-bad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffd0d8"/>
            <stop offset="100%" stop-color="#f8909c"/>
          </linearGradient>
          <!-- Black key gradient -->
          <linearGradient id="bk-n" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#3a3936"/>
            <stop offset="60%" stop-color="#1c1b19"/>
            <stop offset="100%" stop-color="#111010"/>
          </linearGradient>
          <!-- Shadow filter for black keys -->
          <filter id="bk-shadow" x="-20%" y="-5%" width="140%" height="130%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000" flood-opacity="0.55"/>
          </filter>
          <!-- Glow for target key -->
          <filter id="glow-purple" x="-30%" y="-20%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="glow-green" x="-30%" y="-20%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <!-- Piano body frame -->
        <rect x="0" y="0" [attr.width]="kbW" [attr.height]="kbH+8"
              rx="4" fill="#1a1916" stroke="#0d0d0b" stroke-width="1"/>
        <rect x="2" y="2" [attr.width]="kbW-4" [attr.height]="kbH+4"
              rx="3" fill="#252420"/>

        <!-- White keys -->
        <g *ngFor="let wk of whiteKeys">
          <rect
            [attr.x]="wk.x + 2"
            [attr.y]="4"
            [attr.width]="wkW - 1"
            [attr.height]="wkH"
            rx="2" ry="2"
            [attr.fill]="wkFill(wk.idx, question)"
            [attr.stroke]="wkStroke(wk.idx, question)"
            stroke-width="0.8"
            [attr.filter]="wkFilter(wk.idx, question)"
            [class.wk-clickable]="mode()==='name-to-key' && !answered()"
            (click)="onWkClick(wk.idx, wk.name)"
            style="cursor:inherit"
          />
          <!-- Shine strip -->
          <rect
            [attr.x]="wk.x + 2"
            [attr.y]="4"
            [attr.width]="wkW - 1"
            height="14"
            rx="2"
            fill="rgba(255,255,255,0.18)"
            pointer-events="none"
          />
          <!-- Note label (shown when answered or is target in key-to-name) -->
          <text
            [attr.x]="wk.x + 2 + (wkW-1)/2"
            [attr.y]="4 + wkH - 7"
            text-anchor="middle"
            font-family="'Outfit', sans-serif"
            font-size="9"
            font-weight="700"
            [attr.opacity]="showLabel(wk.idx, question) ? 1 : 0"
            [attr.fill]="labelColor(wk.idx, question)"
            pointer-events="none"
          >{{wk.name}}</text>
        </g>

        <!-- Black keys (on top, purely visual decorators except the frame) -->
        <g *ngFor="let bk of blackKeys">
          <rect
            [attr.x]="bk.x + 2"
            [attr.y]="4"
            [attr.width]="bkW"
            [attr.height]="bkH"
            rx="2" ry="2"
            fill="url(#bk-n)"
            stroke="#080807"
            stroke-width="0.5"
            filter="url(#bk-shadow)"
            pointer-events="none"
          />
          <!-- Highlight strip at top of black key -->
          <rect
            [attr.x]="bk.x + 2 + 3"
            [attr.y]="5"
            [attr.width]="bkW - 6"
            height="8"
            rx="1"
            fill="rgba(255,255,255,0.07)"
            pointer-events="none"
          />
        </g>
      </svg>
    </div>

    <!-- Name buttons (key-to-name mode) -->
    <div class="sq-name-btns" *ngIf="mode()==='key-to-name' && !answered()">
      <button *ngFor="let opt of question.options" class="sq-name-btn"
              (click)="onNameClick(opt, question.targetName)">{{opt}}</button>
    </div>

    <!-- Result -->
    <div class="sq-result" *ngIf="answered()" [@pop]>
      <div class="sq-result-pill" [class.sq-r-ok]="lastCorrect()" [class.sq-r-bad]="!lastCorrect()">
        <i class="ti" [class.ti-check]="lastCorrect()" [class.ti-x]="!lastCorrect()"></i>
        {{lastCorrect() ? 'Correct!' : 'Answer: ' + q()!.targetName}}
      </div>
      <button class="sq-next-btn" (click)="newQ()">Next <i class="ti ti-arrow-right"></i></button>
    </div>

    <!-- Scale hint -->
    <div class="sq-hint">
      <span class="sq-hint-lbl"><i class="ti ti-info-circle"></i> {{scaleName()}}:</span>
      <span *ngFor="let n of scaleNotes()" class="sq-note-chip">{{n}}</span>
    </div>
  </div>

</div>
  `,
  styles: [`
    .sq-wrap {
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.09);
      border-radius: 16px; padding: 16px;
      display: flex; flex-direction: column; gap: 14px;
    }
    .sq-header { display: flex; flex-direction: column; gap: 8px; }
    .sq-title {
      font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--text-muted);
      display: flex; align-items: center; gap: 6px;
      i { font-size: 14px; }
    }
    .sq-rows { display: flex; flex-direction: column; gap: 5px; }
    .sq-toggle-row { display: flex; gap: 5px; flex-wrap: wrap; }
    .sq-btn {
      padding: 5px 12px; border-radius: 99px; font-size: 10px; font-weight: 700;
      border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04);
      color: var(--text-muted); cursor: pointer; transition: all 0.15s;
      &:hover { background: rgba(255,255,255,0.09); color: var(--text-secondary); }
      &.sq-on { background: rgba(139,126,248,0.18); border-color: rgba(139,126,248,0.5); color: #c4bbfe; }
    }
    .sq-score-row { display: flex; align-items: center; gap: 8px; }
    .sq-chip {
      display: flex; align-items: center; gap: 5px;
      padding: 4px 12px; border-radius: 99px;
      font-family: var(--font-display); font-size: 13px; font-weight: 900;
      i { font-size: 12px; }
      &.sq-ok  { background: rgba(52,211,153,0.12);  border: 1px solid rgba(52,211,153,0.3);  color: #34d399; }
      &.sq-bad { background: rgba(251,113,133,0.12); border: 1px solid rgba(251,113,133,0.3); color: #fb7185; }
    }
    .sq-streak {
      flex: 1; text-align: center; font-family: var(--font-display);
      font-size: 11px; font-weight: 700; color: #fbbf24;
      display: flex; align-items: center; justify-content: center; gap: 5px;
      i { color: #fb923c; font-size: 14px; }
    }
    .sq-prompt {
      font-size: 14px; font-weight: 600; color: var(--text-secondary);
      text-align: center; margin: 0 0 12px; line-height: 1.5;
    }
    .sq-badge {
      display: inline-block; font-family: var(--font-display);
      font-size: 20px; font-weight: 900; color: #c4bbfe;
      background: rgba(139,126,248,0.18); border: 1px solid rgba(139,126,248,0.4);
      border-radius: 10px; padding: 1px 14px; margin: 0 4px;
    }

    /* ── Piano ── */
    .sq-piano-wrap {
      width: 100%; overflow-x: auto; border-radius: 8px;
      scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.1) transparent;
    }
    .sq-piano-svg {
      display: block; width: 100%; min-width: 320px; max-width: 600px;
      margin: 0 auto; border-radius: 6px; overflow: visible;
    }
    .wk-clickable { cursor: pointer !important; }

    @keyframes keyPulse {
      0%, 100% { filter: drop-shadow(0 0 6px rgba(139,126,248,0.7)); }
      50%       { filter: drop-shadow(0 0 14px rgba(139,126,248,1)); }
    }
    .wk-target-anim { animation: keyPulse 1.1s ease-in-out infinite; }

    /* ── Name buttons ── */
    .sq-name-btns { display: grid; grid-template-columns: repeat(4,1fr); gap: 8px; margin-top: 4px; }
    .sq-name-btn {
      padding: 12px 6px; border-radius: 10px; cursor: pointer;
      font-family: var(--font-display); font-size: 16px; font-weight: 900;
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12);
      color: var(--text-primary); transition: all 0.15s;
      &:hover { background: rgba(139,126,248,0.18); border-color: rgba(139,126,248,0.5); color: #c4bbfe; }
      &:active { transform: scale(0.95); }
    }

    /* ── Result ── */
    .sq-result { display: flex; flex-direction: column; gap: 10px; align-items: center; }
    .sq-result-pill {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 20px; border-radius: 12px; font-size: 14px; font-weight: 700;
      &.sq-r-ok  { background: rgba(52,211,153,0.15);  border: 1px solid rgba(52,211,153,0.4);  color: #34d399; }
      &.sq-r-bad { background: rgba(251,113,133,0.12); border: 1px solid rgba(251,113,133,0.3); color: #fb7185; }
      i { font-size: 18px; }
    }
    .sq-next-btn {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 24px; border-radius: 10px; cursor: pointer;
      font-family: var(--font-display); font-size: 12px; font-weight: 700;
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
    .sq-hint-lbl {
      font-size: 10px; font-weight: 700; color: var(--text-muted);
      letter-spacing: 0.06em; text-transform: uppercase;
      display: flex; align-items: center; gap: 4px;
      i { font-size: 12px; }
    }
    .sq-note-chip {
      font-family: var(--font-display); font-size: 11px; font-weight: 700;
      padding: 2px 8px; border-radius: 6px;
      background: rgba(139,126,248,0.12); border: 1px solid rgba(139,126,248,0.25); color: #a78bfa;
    }
  `]
})
export class ScaleQuizComponent implements OnInit {

  // SVG dimension constants exposed to template
  readonly kbW = KB_W;
  readonly kbH = WK_H;
  readonly wkW = WK_W;
  readonly wkH = WK_H;
  readonly bkW = BK_W;
  readonly bkH = BK_H;
  readonly whiteKeys = WHITE_KEYS;
  readonly blackKeys = BLACK_KEYS;

  scale = signal<Scale>('C-major');
  mode  = signal<QuizMode>('name-to-key');

  q           = signal<Q | null>(null);
  answered    = signal(false);
  lastCorrect = signal(false);
  correct     = signal(0);
  wrong       = signal(0);
  streak      = signal(0);

  scaleOpts = [
    { l: 'C major', v: 'C-major' as Scale },
    { l: 'A minor', v: 'A-minor' as Scale },
    { l: 'Both',    v: 'both'    as Scale },
  ];

  // ── Fill / stroke helpers for SVG white keys ─────────────────────────────

  wkFill(idx: number, q: Q): string {
    if (this.answered() && idx === q.targetPos)
      return this.lastCorrect() ? 'url(#wk-ok)' : 'url(#wk-bad)';
    if (this.mode() === 'key-to-name' && idx === q.targetPos)
      return 'url(#wk-t)';
    if (this.mode() === 'name-to-key' && !this.answered())
      return 'url(#wk-h)';          // all scale keys brighter when clickable
    return 'url(#wk-n)';
  }

  wkStroke(idx: number, q: Q): string {
    if (this.answered() && idx === q.targetPos)
      return this.lastCorrect() ? '#34d399' : '#fb7185';
    if (this.mode() === 'key-to-name' && idx === q.targetPos)
      return '#a78bfa';
    return '#8a8880';
  }

  wkFilter(idx: number, q: Q): string {
    if (!this.answered() && this.mode() === 'key-to-name' && idx === q.targetPos)
      return 'url(#glow-purple)';
    if (this.answered() && idx === q.targetPos && this.lastCorrect())
      return 'url(#glow-green)';
    return '';
  }

  showLabel(idx: number, q: Q): boolean {
    return this.answered() || (this.mode() === 'key-to-name' && idx === q.targetPos);
  }

  labelColor(idx: number, q: Q): string {
    if (this.answered() && idx === q.targetPos)
      return this.lastCorrect() ? '#0a5a38' : '#7a1828';
    if (this.mode() === 'key-to-name' && idx === q.targetPos) return '#3d1f8f';
    return '#555450';
  }

  // ── Quiz logic ────────────────────────────────────────────────────────────

  private activeNotes(): string[] {
    const s = this.scale();
    if (s === 'C-major') return [...C_MAJOR];
    if (s === 'A-minor') return [...A_MINOR];
    return [...new Set([...C_MAJOR, ...A_MINOR])];
  }

  scaleName = computed(() =>
    this.scale() === 'C-major' ? 'C major' : this.scale() === 'A-minor' ? 'A minor' : 'C maj / A min'
  );

  scaleNotes = computed(() =>
    this.scale() === 'A-minor'
      ? ['A','B','C','D','E','F','G']
      : ['C','D','E','F','G','A','B']
  );

  ngOnInit() { this.newQ(); }

  newQ(): void {
    this.answered.set(false);
    const notes = this.activeNotes();
    const tName = notes[Math.floor(Math.random() * notes.length)];
    const matches = WHITE_KEYS.filter(k => k.name === tName);
    const target  = matches[Math.floor(Math.random() * matches.length)];
    const opts = this.shuffle(notes.filter(n => n !== tName)).slice(0, 3);
    this.q.set({ targetName: tName, targetPos: target.idx, options: this.shuffle([tName, ...opts]) });
  }

  onWkClick(idx: number, name: string): void {
    if (this.answered() || this.mode() !== 'name-to-key') return;
    this.recordResult(name === this.q()!.targetName);
  }

  onNameClick(chosen: string, correct: string): void {
    if (this.answered()) return;
    this.recordResult(chosen === correct);
  }

  private recordResult(ok: boolean): void {
    this.answered.set(true);
    this.lastCorrect.set(ok);
    if (ok) { this.correct.update(n => n + 1); this.streak.update(n => n + 1); }
    else    { this.wrong.update(n => n + 1);   this.streak.set(0); }
  }

  private shuffle<T>(a: T[]): T[] { return [...a].sort(() => Math.random() - 0.5); }
}

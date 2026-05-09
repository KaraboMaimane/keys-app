import { Component, inject, signal, computed, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetronomeService } from '../metronome.service';
import { SessionTimerService } from '../session-timer.service';

@Component({
  selector: 'app-practice-hud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="phud-wrap">

      <!-- ── METRONOME ─────────────────────────────────────────────────── -->
      <div class="phud-panel" [class.phud-active]="metro.isPlaying()">
        <div class="phud-title">
          <i class="ti ti-metronome"></i> Metronome
        </div>

        <!-- Beat visualiser -->
        <div class="beat-dots" *ngIf="metro.isPlaying()">
          <span *ngFor="let b of beats(); let bi = index"
                class="beat-dot"
                [class.beat-dot-accent]="bi === 0"
                [class.beat-dot-lit]="metro.beat() === bi">
          </span>
        </div>

        <!-- BPM display + controls -->
        <div class="bpm-row">
          <button class="bpm-adj-btn" (click)="adjustBpm(-5)" title="-5 BPM">−5</button>
          <button class="bpm-adj-btn" (click)="adjustBpm(-1)" title="-1 BPM">−</button>
          <div class="bpm-display" [class.bpm-playing]="metro.isPlaying()">
            <span class="bpm-val">{{ metro.bpm() }}</span>
            <span class="bpm-label">BPM</span>
          </div>
          <button class="bpm-adj-btn" (click)="adjustBpm(1)" title="+1 BPM">+</button>
          <button class="bpm-adj-btn" (click)="adjustBpm(5)" title="+5 BPM">+5</button>
        </div>

        <!-- BPM slider -->
        <input type="range" class="bpm-slider"
               min="20" max="200" step="1"
               [value]="metro.bpm()"
               (input)="onSlider($event)" />

        <!-- Quick presets -->
        <div class="bpm-presets">
          <button class="preset-btn" *ngFor="let p of bpmPresets"
                  [class.preset-active]="metro.bpm() === p"
                  (click)="metro.setBpm(p)">
            {{ p }}
          </button>
        </div>

        <!-- Transport row -->
        <div class="metro-transport">
          <button class="tap-btn" (click)="metro.tap()" title="Tap tempo">
            <i class="ti ti-hand-finger"></i> Tap
          </button>
          <button class="play-btn" [class.playing]="metro.isPlaying()" (click)="metro.toggle()">
            <i class="ti" [class.ti-player-play-filled]="!metro.isPlaying()"
                          [class.ti-player-stop-filled]="metro.isPlaying()"></i>
            {{ metro.isPlaying() ? 'Stop' : 'Start' }}
          </button>
          <!-- Beats per bar -->
          <div class="bpb-wrap">
            <span class="bpb-label">Bar</span>
            <button class="bpb-btn" *ngFor="let n of [2,3,4]"
                    [class.bpb-active]="metro.beatsPerBar() === n"
                    (click)="metro.beatsPerBar.set(n)">{{ n }}</button>
          </div>
        </div>
      </div>

      <!-- ── SESSION TIMER ───────────────────────────────────────────────── -->
      <div class="phud-panel" [class.phud-active]="timer.sessionRunning()">
        <div class="phud-title">
          <i class="ti ti-clock"></i> Session
        </div>

        <div class="session-display" [class.session-urgent]="sessionUrgent()">
          {{ timer.sessionDisplay() || formattedTarget() }}
        </div>

        <!-- Arc progress ring -->
        <div class="session-ring-wrap" *ngIf="timer.sessionRunning()">
          <svg class="session-ring" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="28" class="ring-bg"/>
            <circle cx="32" cy="32" r="28" class="ring-prog"
                    [style.stroke-dasharray]="ringDash()"
                    [style.stroke]="sessionUrgent() ? '#fb7185' : '#8b7ef8'"/>
          </svg>
          <div class="ring-inner-pct">{{ timer.sessionPct() }}%</div>
        </div>

        <!-- Duration picker (only when not running) -->
        <div class="session-pick-row" *ngIf="!timer.sessionRunning()">
          <button class="preset-btn" *ngFor="let m of sessionPresets"
                  [class.preset-active]="timer.sessionMinutes() === m"
                  (click)="timer.sessionMinutes.set(m)">
            {{ m }}m
          </button>
        </div>

        <div class="session-transport">
          <button class="play-btn"
                  [class.playing]="timer.sessionRunning()"
                  (click)="toggleSession()">
            <i class="ti" [class.ti-player-play-filled]="!timer.sessionRunning()"
                          [class.ti-player-stop-filled]="timer.sessionRunning()"></i>
            {{ timer.sessionRunning() ? 'Stop' : 'Start' }}
          </button>
          <button class="tap-btn" *ngIf="timer.sessionRunning()" (click)="timer.resetSession()">
            <i class="ti ti-refresh"></i> Reset
          </button>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .phud-wrap {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin: 0 0 16px;
    }
    @media (max-width: 520px) {
      .phud-wrap { grid-template-columns: 1fr; }
    }

    .phud-panel {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.09);
      border-radius: 16px;
      padding: 14px 14px 12px;
      display: flex; flex-direction: column; gap: 10px;
      transition: border-color 0.3s, box-shadow 0.3s;
      &.phud-active {
        border-color: rgba(139,126,248,0.4);
        box-shadow: 0 0 24px rgba(139,126,248,0.1);
      }
    }

    .phud-title {
      font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--text-muted);
      display: flex; align-items: center; gap: 6px;
      i { font-size: 14px; }
    }

    /* ── Beat dots ── */
    .beat-dots {
      display: flex; gap: 6px; justify-content: center;
    }
    .beat-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: rgba(255,255,255,0.12);
      transition: background 0.05s, transform 0.05s;
      &.beat-dot-accent { background: rgba(139,126,248,0.3); }
      &.beat-dot-lit {
        background: #a78bfa !important;
        transform: scale(1.4);
        box-shadow: 0 0 8px rgba(167,139,250,0.8);
      }
      &.beat-dot-accent.beat-dot-lit {
        background: #c4bbfe !important;
        box-shadow: 0 0 12px rgba(196,187,254,0.9);
      }
    }

    /* ── BPM ── */
    .bpm-row {
      display: flex; align-items: center; justify-content: center; gap: 6px;
    }
    .bpm-adj-btn {
      width: 28px; height: 28px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.04); color: var(--text-secondary);
      font-size: 12px; font-weight: 700; cursor: pointer; transition: all 0.15s;
      display: flex; align-items: center; justify-content: center;
      &:hover { background: rgba(255,255,255,0.1); color: var(--text-primary); }
      &:active { transform: scale(0.92); }
    }
    .bpm-display {
      display: flex; flex-direction: column; align-items: center; line-height: 1;
      min-width: 56px; padding: 6px 10px; border-radius: 10px;
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
      transition: border-color 0.3s;
      &.bpm-playing { border-color: rgba(139,126,248,0.5); }
    }
    .bpm-val {
      font-family: var(--font-display); font-size: 22px; font-weight: 900;
      color: var(--text-primary);
    }
    .bpm-label {
      font-size: 8px; font-weight: 700; letter-spacing: 0.1em;
      color: var(--text-muted); text-transform: uppercase;
    }

    .bpm-slider {
      width: 100%; accent-color: #8b7ef8; cursor: pointer;
      height: 4px; border-radius: 99px;
    }

    .bpm-presets {
      display: flex; gap: 5px; flex-wrap: wrap; justify-content: center;
    }
    .preset-btn {
      padding: 3px 9px; border-radius: 99px; font-size: 10px; font-weight: 700;
      border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04);
      color: var(--text-muted); cursor: pointer; transition: all 0.15s;
      &:hover { background: rgba(255,255,255,0.09); color: var(--text-secondary); }
      &.preset-active {
        background: rgba(139,126,248,0.18); border-color: rgba(139,126,248,0.5);
        color: #c4bbfe;
      }
    }

    /* ── Transport ── */
    .metro-transport {
      display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
    }
    .play-btn {
      flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
      padding: 9px 12px; border-radius: 10px; cursor: pointer; font-size: 12px; font-weight: 700;
      background: rgba(139,126,248,0.14); border: 1px solid rgba(139,126,248,0.4);
      color: #c4bbfe; transition: all 0.2s;
      i { font-size: 14px; }
      &:hover { background: rgba(139,126,248,0.22); }
      &.playing {
        background: rgba(251,113,133,0.14); border-color: rgba(251,113,133,0.4);
        color: #fb7185;
      }
    }
    .tap-btn {
      display: flex; align-items: center; gap: 5px;
      padding: 9px 12px; border-radius: 10px; cursor: pointer; font-size: 11px; font-weight: 700;
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
      color: var(--text-secondary); transition: all 0.2s;
      &:hover { background: rgba(255,255,255,0.1); color: var(--text-primary); }
      &:active { transform: scale(0.94); }
      i { font-size: 14px; }
    }
    .bpb-wrap {
      display: flex; align-items: center; gap: 4px;
    }
    .bpb-label {
      font-size: 9px; font-weight: 700; letter-spacing: 0.08em;
      color: var(--text-muted); text-transform: uppercase; margin-right: 2px;
    }
    .bpb-btn {
      width: 24px; height: 24px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.04); color: var(--text-muted);
      font-size: 11px; font-weight: 700; cursor: pointer; transition: all 0.15s;
      display: flex; align-items: center; justify-content: center;
      &:hover { background: rgba(255,255,255,0.09); }
      &.bpb-active {
        background: rgba(52,211,153,0.15); border-color: rgba(52,211,153,0.4); color: #34d399;
      }
    }

    /* ── Session ── */
    .session-display {
      font-family: var(--font-display); font-size: 28px; font-weight: 900;
      color: var(--text-primary); text-align: center; letter-spacing: 0.04em;
      transition: color 0.3s;
      &.session-urgent { color: #fb7185; text-shadow: 0 0 16px rgba(251,113,133,0.5); }
    }
    .session-ring-wrap {
      position: relative; width: 72px; height: 72px; margin: 0 auto;
    }
    .session-ring {
      width: 100%; height: 100%; transform: rotate(-90deg);
    }
    .ring-bg { fill: none; stroke: rgba(255,255,255,0.07); stroke-width: 5; }
    .ring-prog { fill: none; stroke-width: 5; stroke-linecap: round; transition: stroke-dasharray 1s linear, stroke 0.4s; }
    .ring-inner-pct {
      position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
      font-family: var(--font-display); font-size: 13px; font-weight: 700; color: var(--text-muted);
    }
    .session-pick-row {
      display: flex; gap: 5px; flex-wrap: wrap; justify-content: center;
    }
    .session-transport {
      display: flex; gap: 8px;
    }
  `]
})
export class PracticeHudComponent implements OnDestroy {
  metro = inject(MetronomeService);
  timer = inject(SessionTimerService);

  bpmPresets = [40, 60, 70, 80, 90, 100, 120];
  sessionPresets = [10, 15, 20, 30, 45];
  beats = computed(() => Array.from({ length: this.metro.beatsPerBar() }));

  adjustBpm(delta: number): void { this.metro.setBpm(this.metro.bpm() + delta); }

  onSlider(event: Event): void {
    this.metro.setBpm(Number((event.target as HTMLInputElement).value));
  }

  toggleSession(): void {
    if (this.timer.sessionRunning()) {
      this.timer.stopSession();
    } else {
      this.timer.startSession();
    }
  }

  formattedTarget(): string {
    const m = this.timer.sessionMinutes();
    return `${String(m).padStart(2,'0')}:00`;
  }

  sessionUrgent = computed(() =>
    this.timer.sessionRunning() && this.timer.sessionSecondsLeft() <= 60
  );

  /** SVG ring dash for progress */
  ringDash(): string {
    const c = 2 * Math.PI * 28; // circumference r=28
    const pct = this.timer.sessionPct() / 100;
    return `${c * pct} ${c}`;
  }

  ngOnDestroy(): void {
    this.metro.stop();
  }
}

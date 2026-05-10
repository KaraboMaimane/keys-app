import { Component, inject, signal, computed, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetronomeService } from '../metronome.service';
import { SessionTimerService } from '../session-timer.service';
import { trigger, transition, style, animate } from '@angular/animations';

type Panel = 'metro' | 'session' | 'drill' | null;

@Component({
  selector: 'app-practice-float-bar',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('sheet', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(16px)' }),
        animate('220ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('160ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 0, transform: 'translateY(12px)' }))
      ])
    ])
  ],
  template: `
<!-- Sheet panel (slides up above bar) -->
<div class="pfb-sheet-overlay" *ngIf="open()" (click)="open.set(null)"></div>

<div class="pfb-sheet" *ngIf="open() === 'metro'" [@sheet]>
  <div class="pfb-sheet-handle"></div>
  <div class="pfb-sheet-title"><i class="ti ti-metronome"></i> Metronome</div>

  <!-- Beat dots -->
  <div class="pfb-beats" *ngIf="metro.isPlaying()">
    <span *ngFor="let b of beats(); let bi=index" class="pfb-dot"
      [class.pfb-dot-accent]="bi===0" [class.pfb-dot-lit]="metro.beat()===bi"></span>
  </div>

  <!-- BPM row -->
  <div class="pfb-bpm-row">
    <button class="pfb-adj" (click)="adj(-5)">−5</button>
    <button class="pfb-adj" (click)="adj(-1)">−</button>
    <div class="pfb-bpm-box" [class.pfb-bpm-live]="metro.isPlaying()">
      <span class="pfb-bpm-val">{{metro.bpm()}}</span>
      <span class="pfb-bpm-lbl">BPM</span>
    </div>
    <button class="pfb-adj" (click)="adj(1)">+</button>
    <button class="pfb-adj" (click)="adj(5)">+5</button>
  </div>

  <input type="range" class="pfb-slider" min="20" max="200" step="1"
    [value]="metro.bpm()" (input)="onSlider($event)"/>

  <div class="pfb-presets">
    <button *ngFor="let p of bpmPresets" class="pfb-preset"
      [class.pfb-preset-on]="metro.bpm()===p" (click)="metro.setBpm(p)">{{p}}</button>
  </div>

  <div class="pfb-transport">
    <button class="pfb-tap" (click)="metro.tap()"><i class="ti ti-hand-finger"></i> Tap</button>
    <button class="pfb-play" [class.pfb-stop]="metro.isPlaying()" (click)="metro.toggle()">
      <i class="ti" [class.ti-player-play-filled]="!metro.isPlaying()"
         [class.ti-player-stop-filled]="metro.isPlaying()"></i>
      {{metro.isPlaying() ? 'Stop' : 'Start'}}
    </button>
    <div class="pfb-bpb">
      <span class="pfb-bpb-lbl">Bar</span>
      <button *ngFor="let n of [2,3,4]" class="pfb-bpb-btn"
        [class.pfb-bpb-on]="metro.beatsPerBar()===n" (click)="metro.beatsPerBar.set(n)">{{n}}</button>
    </div>
  </div>
</div>

<div class="pfb-sheet" *ngIf="open() === 'session'" [@sheet]>
  <div class="pfb-sheet-handle"></div>
  <div class="pfb-sheet-title"><i class="ti ti-clock"></i> Session Timer</div>

  <div class="pfb-session-display" [class.pfb-urgent]="sessionUrgent()">
    {{timer.sessionRunning() ? timer.sessionDisplay() : targetDisplay()}}
  </div>

  <div class="pfb-ring-wrap" *ngIf="timer.sessionRunning()">
    <svg viewBox="0 0 64 64" class="pfb-ring-svg">
      <circle cx="32" cy="32" r="28" class="pfb-ring-bg"/>
      <circle cx="32" cy="32" r="28" class="pfb-ring-fg"
        [style.stroke-dasharray]="ringDash()"
        [style.stroke]="sessionUrgent() ? '#fb7185' : '#8b7ef8'"/>
    </svg>
    <span class="pfb-ring-pct">{{timer.sessionPct()}}%</span>
  </div>

  <div class="pfb-presets" *ngIf="!timer.sessionRunning()">
    <button *ngFor="let m of sessionPresets" class="pfb-preset"
      [class.pfb-preset-on]="timer.sessionMinutes()===m"
      (click)="timer.sessionMinutes.set(m)">{{m}}m</button>
  </div>

  <div class="pfb-transport">
    <button class="pfb-play" [class.pfb-stop]="timer.sessionRunning()" (click)="toggleSession()">
      <i class="ti" [class.ti-player-play-filled]="!timer.sessionRunning()"
         [class.ti-player-stop-filled]="timer.sessionRunning()"></i>
      {{timer.sessionRunning() ? 'Stop' : 'Start'}}
    </button>
    <button class="pfb-tap" *ngIf="timer.sessionRunning()" (click)="timer.resetSession()">
      <i class="ti ti-refresh"></i> Reset
    </button>
  </div>
</div>

<div class="pfb-sheet" *ngIf="open() === 'drill' && drillLevels.length" [@sheet]>
  <div class="pfb-sheet-handle"></div>
  <div class="pfb-sheet-title"><i class="ti ti-layers-intersect"></i> Drill Level — tap to time</div>
  <div class="pfb-drill-levels">
    <button *ngFor="let lvl of drillLevels; let i=index"
      class="pfb-drill-lvl"
      [class.pfb-lvl-active]="isDrillActive('L'+(i+1))"
      [class.pfb-lvl-done]="drillDone('L'+(i+1)) > 0 && !isDrillActive('L'+(i+1))"
      (click)="toggleDrill('L'+(i+1))">
      <div class="pfb-lvl-top">
        <span class="pfb-lvl-key">L{{i+1}}</span>
        <span class="pfb-lvl-time" *ngIf="isDrillActive('L'+(i+1))">
          <i class="ti ti-clock" style="font-size:10px"></i> {{timer.drillDisplay()}}
          <span class="pfb-rec-dot"></span>
        </span>
        <span class="pfb-lvl-today" *ngIf="!isDrillActive('L'+(i+1)) && drillDone('L'+(i+1))>0">
          ✓ {{fmtSec(drillDone('L'+(i+1)))}} today
        </span>
      </div>
      <div class="pfb-lvl-label">{{lvl.title}}</div>
    </button>
  </div>
  <div class="pfb-drill-save" *ngIf="timer.drillRunning()">
    <button class="pfb-play" (click)="saveDrill()">
      <i class="ti ti-device-floppy"></i> Save ({{timer.drillDisplay()}})
    </button>
    <button class="pfb-tap" (click)="timer.stopDrill(false)"><i class="ti ti-x"></i></button>
  </div>
</div>

<!-- ── Fixed bottom bar ─────────────────────────────────────────── -->
<div class="pfb-bar" [class.pfb-panel-open]="open()">

  <!-- Metronome pill -->
  <button class="pfb-pill" [class.pfb-pill-active]="open()==='metro' || metro.isPlaying()"
    [attr.aria-pressed]="open()==='metro'"
    [attr.aria-expanded]="open()==='metro'"
    (click)="toggle('metro')">
    <i class="ti ti-metronome pfb-pill-ico"></i>
    <span class="pfb-pill-val">{{metro.bpm()}}</span>
    <span class="pfb-pill-sub">BPM</span>
    <span *ngIf="metro.isPlaying()" class="pfb-live-dot"></span>
  </button>

  <div class="pfb-sep"></div>

  <!-- Session pill -->
  <button class="pfb-pill" [class.pfb-pill-active]="open()==='session' || timer.sessionRunning()"
    [class.pfb-pill-urgent]="sessionUrgent()"
    [attr.aria-pressed]="open()==='session'"
    [attr.aria-expanded]="open()==='session'"
    (click)="toggle('session')">
    <i class="ti ti-clock pfb-pill-ico"></i>
    <span class="pfb-pill-val">{{timer.sessionRunning() ? timer.sessionDisplay() : targetDisplay()}}</span>
    <span class="pfb-pill-sub">SESSION</span>
    <span *ngIf="timer.sessionRunning()" class="pfb-live-dot"></span>
  </button>

  <div class="pfb-sep" *ngIf="drillLevels.length"></div>

  <!-- Drill pill -->
  <button *ngIf="drillLevels.length" class="pfb-pill"
    [class.pfb-pill-active]="open()==='drill' || timer.drillRunning()"
    [attr.aria-pressed]="open()==='drill'"
    [attr.aria-expanded]="open()==='drill'"
    (click)="toggle('drill')">
    <i class="ti ti-layers-intersect pfb-pill-ico"></i>
    <span class="pfb-pill-val">{{timer.drillRunning() ? timer.drillLevelKey() : 'DRILL'}}</span>
    <span class="pfb-pill-sub">{{timer.drillRunning() ? timer.drillDisplay() : 'levels'}}</span>
    <span *ngIf="timer.drillRunning()" class="pfb-live-dot pfb-live-purple"></span>
  </button>

</div>
  `,
  styles: [`
    /* ── Overlay (closes sheet on tap outside) ── */
    .pfb-sheet-overlay {
      position: fixed; inset: 0; z-index: 199;
    }

    /* ── Sheet panel ── */
    .pfb-sheet {
      position: fixed; bottom: 68px; left: 50%; transform: translateX(-50%);
      width: min(720px, calc(100vw - 24px));
      background: #16141e;
      border: 1px solid rgba(139,126,248,0.3);
      border-radius: 20px 20px 16px 16px;
      padding: 12px 16px 16px;
      z-index: 200;
      box-shadow: 0 -4px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04);
      display: flex; flex-direction: column; gap: 12px;
    }
    .pfb-sheet-handle {
      width: 36px; height: 4px; border-radius: 99px;
      background: rgba(255,255,255,0.15); margin: 0 auto 4px;
    }
    .pfb-sheet-title {
      font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--text-muted);
      display: flex; align-items: center; gap: 6px;
      i { font-size: 14px; }
    }

    /* ── Bottom bar ── */
    .pfb-bar {
      position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
      width: min(720px, 100vw);
      display: flex; align-items: center; justify-content: center;
      gap: 0;
      background: rgba(14,12,20,0.92);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border-top: 1px solid rgba(139,126,248,0.18);
      padding: 10px 16px calc(10px + env(safe-area-inset-bottom));
      z-index: 201;
      transition: border-color 0.3s;
      &.pfb-panel-open { border-color: rgba(139,126,248,0.45); }
    }

    /* ── Pill buttons ── */
    .pfb-pill {
      flex: 1; display: flex; align-items: center; justify-content: center;
      gap: 6px; padding: 8px 6px; border-radius: 12px;
      background: none; border: none; cursor: pointer;
      transition: background 0.15s; position: relative;
      min-height: 44px;
    }
    .pfb-pill:hover { background: rgba(255,255,255,0.06); }
    .pfb-pill:focus-visible,
    .pfb-play:focus-visible,
    .pfb-tap:focus-visible,
    .pfb-adj:focus-visible,
    .pfb-preset:focus-visible,
    .pfb-drill-lvl:focus-visible,
    .pfb-bpb-btn:focus-visible {
      outline: 2px solid color-mix(in srgb, #34d399 60%, #ffffff);
      outline-offset: 2px;
    }
    .pfb-pill-ico { font-size: 18px; color: var(--text-muted); transition: color 0.2s; }
    .pfb-pill-val {
      font-family: var(--font-display); font-size: 14px; font-weight: 900;
      color: var(--text-secondary); letter-spacing: 0.02em; line-height: 1;
    }
    .pfb-pill-sub {
      font-size: 8px; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--text-muted); align-self: flex-end; line-height: 1.8;
    }
    .pfb-pill-active {
      background: rgba(139,126,248,0.12);
      .pfb-pill-ico { color: #a78bfa; }
      .pfb-pill-val { color: #c4bbfe; }
    }
    .pfb-pill-urgent {
      .pfb-pill-ico { color: #fb7185 !important; }
      .pfb-pill-val { color: #fb7185 !important; }
    }
    .pfb-sep {
      width: 1px; height: 32px; background: rgba(255,255,255,0.08); margin: 0 4px;
    }

    /* Live pulse dot */
    .pfb-live-dot {
      position: absolute; top: 8px; right: 8px;
      width: 6px; height: 6px; border-radius: 50%;
      background: #34d399;
      animation: pfbPulse 1.2s ease-in-out infinite;
    }
    .pfb-live-purple { background: #a78bfa; }
    @keyframes pfbPulse {
      0%,100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.65); }
    }

    /* ── Beat dots ── */
    .pfb-beats { display: flex; gap: 6px; justify-content: center; }
    .pfb-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: rgba(255,255,255,0.12); transition: all 0.05s;
      &.pfb-dot-accent { background: rgba(139,126,248,0.3); }
      &.pfb-dot-lit { background: #a78bfa !important; transform: scale(1.4); box-shadow: 0 0 8px rgba(167,139,250,0.8); }
      &.pfb-dot-accent.pfb-dot-lit { background: #c4bbfe !important; }
    }

    /* ── BPM controls ── */
    .pfb-bpm-row { display: flex; align-items: center; justify-content: center; gap: 6px; }
    .pfb-adj {
      width: 32px; height: 32px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.04); color: var(--text-secondary);
      font-size: 12px; font-weight: 700; cursor: pointer; transition: all 0.15s;
      display: flex; align-items: center; justify-content: center;
      &:hover { background: rgba(255,255,255,0.1); }
      &:active { transform: scale(0.92); }
    }
    .pfb-bpm-box {
      display: flex; flex-direction: column; align-items: center;
      min-width: 60px; padding: 6px 12px; border-radius: 10px;
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
      &.pfb-bpm-live { border-color: rgba(139,126,248,0.5); }
    }
    .pfb-bpm-val { font-family: var(--font-display); font-size: 24px; font-weight: 900; color: var(--text-primary); }
    .pfb-bpm-lbl { font-size: 8px; font-weight: 700; letter-spacing: 0.1em; color: var(--text-muted); text-transform: uppercase; }
    .pfb-slider { width: 100%; accent-color: #8b7ef8; }
    .pfb-presets { display: flex; gap: 5px; flex-wrap: wrap; justify-content: center; }
    .pfb-preset {
      padding: 4px 10px; border-radius: 99px; font-size: 10px; font-weight: 700;
      border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04);
      color: var(--text-muted); cursor: pointer; transition: all 0.15s;
      &:hover { background: rgba(255,255,255,0.09); }
      &.pfb-preset-on { background: rgba(139,126,248,0.18); border-color: rgba(139,126,248,0.5); color: #c4bbfe; }
    }
    .pfb-transport { display: flex; align-items: center; gap: 8px; }
    .pfb-play {
      flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
      padding: 10px 12px; border-radius: 10px; cursor: pointer; font-size: 12px; font-weight: 700;
      background: rgba(139,126,248,0.14); border: 1px solid rgba(139,126,248,0.4); color: #c4bbfe;
      transition: all 0.2s; i { font-size: 14px; }
      &:hover { background: rgba(139,126,248,0.22); }
      &.pfb-stop { background: rgba(251,113,133,0.14); border-color: rgba(251,113,133,0.4); color: #fb7185; }
    }
    .pfb-tap {
      display: flex; align-items: center; gap: 5px;
      padding: 10px 12px; border-radius: 10px; cursor: pointer; font-size: 11px; font-weight: 700;
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
      color: var(--text-secondary); transition: all 0.2s;
      i { font-size: 14px; }
      &:hover { background: rgba(255,255,255,0.1); }
      &:active { transform: scale(0.94); }
    }
    .pfb-bpb { display: flex; align-items: center; gap: 4px; }
    .pfb-bpb-lbl { font-size: 9px; font-weight: 700; letter-spacing: 0.08em; color: var(--text-muted); text-transform: uppercase; margin-right: 2px; }
    .pfb-bpb-btn {
      width: 26px; height: 26px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.04); color: var(--text-muted);
      font-size: 11px; font-weight: 700; cursor: pointer; transition: all 0.15s;
      display: flex; align-items: center; justify-content: center;
      &.pfb-bpb-on { background: rgba(52,211,153,0.15); border-color: rgba(52,211,153,0.4); color: #34d399; }
    }

    /* ── Session ── */
    .pfb-session-display {
      font-family: var(--font-display); font-size: 32px; font-weight: 900;
      color: var(--text-primary); text-align: center; letter-spacing: 0.04em;
      &.pfb-urgent { color: #fb7185; text-shadow: 0 0 16px rgba(251,113,133,0.5); }
    }
    .pfb-ring-wrap { position: relative; width: 72px; height: 72px; margin: 0 auto; }
    .pfb-ring-svg { width: 100%; height: 100%; transform: rotate(-90deg); }
    .pfb-ring-bg { fill: none; stroke: rgba(255,255,255,0.07); stroke-width: 5; }
    .pfb-ring-fg { fill: none; stroke-width: 5; stroke-linecap: round; transition: stroke-dasharray 1s linear, stroke 0.4s; }
    .pfb-ring-pct {
      position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
      font-family: var(--font-display); font-size: 13px; font-weight: 700; color: var(--text-muted);
    }

    /* ── Drill levels ── */
    .pfb-drill-levels { display: flex; flex-direction: column; gap: 6px; }
    .pfb-drill-lvl {
      display: flex; flex-direction: column; gap: 3px;
      padding: 10px 12px; border-radius: 10px; cursor: pointer; text-align: left;
      background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
      transition: all 0.2s;
      &:hover { background: rgba(255,255,255,0.06); }
      &.pfb-lvl-active { background: rgba(139,126,248,0.1); border-color: rgba(139,126,248,0.45); }
      &.pfb-lvl-done { border-color: rgba(52,211,153,0.25); background: rgba(52,211,153,0.04); }
    }
    .pfb-lvl-top { display: flex; align-items: center; gap: 8px; }
    .pfb-lvl-key {
      font-family: var(--font-display); font-size: 11px; font-weight: 900;
      color: #a78bfa; background: rgba(139,126,248,0.15); padding: 2px 8px; border-radius: 6px;
    }
    .pfb-lvl-time {
      font-family: var(--font-display); font-size: 13px; font-weight: 700; color: #c4bbfe;
      display: flex; align-items: center; gap: 4px;
    }
    .pfb-lvl-today { font-size: 10px; font-weight: 600; color: var(--text-muted); }
    .pfb-lvl-label { font-size: 12px; font-weight: 600; color: var(--text-primary); line-height: 1.3; }
    .pfb-rec-dot {
      width: 6px; height: 6px; border-radius: 50%; background: #a78bfa;
      animation: pfbPulse 1s ease-in-out infinite; display: inline-block;
    }
    .pfb-drill-save { display: flex; gap: 8px; }
  `]
})
export class PracticeFloatBarComponent implements OnDestroy, OnChanges {
  metro = inject(MetronomeService);
  timer = inject(SessionTimerService);

  @Input() drillLevels: { title: string; detail: string }[] = [];
  @Input() phaseId = 0;
  @Input() sectionTitle = '';
  @Input() launchToken = 0;
  @Input() launchMode: 'none' | 'guided-practice' = 'none';
  @Input() launchSessionMinutes = 20;

  open = signal<Panel>(null);
  beats = computed(() => Array.from({ length: this.metro.beatsPerBar() }));

  bpmPresets = [40, 60, 70, 80, 90, 100, 120];
  sessionPresets = [10, 15, 20, 30, 45];

  toggle(p: Panel): void { this.open.update(v => v === p ? null : p); }

  adj(d: number): void { this.metro.setBpm(this.metro.bpm() + d); }
  onSlider(e: Event): void { this.metro.setBpm(+(e.target as HTMLInputElement).value); }

  toggleSession(): void {
    this.timer.sessionRunning() ? this.timer.stopSession() : this.timer.startSession();
  }

  targetDisplay(): string {
    const m = this.timer.sessionMinutes();
    return `${String(m).padStart(2,'0')}:00`;
  }

  sessionUrgent = computed(() =>
    this.timer.sessionRunning() && this.timer.sessionSecondsLeft() <= 60
  );

  ringDash(): string {
    const c = 2 * Math.PI * 28;
    return `${c * this.timer.sessionPct() / 100} ${c}`;
  }

  isDrillActive(key: string): boolean {
    return this.timer.drillRunning() && this.timer.drillLevelKey() === key;
  }

  drillDone(key: string): number {
    return this.timer.todaySeconds(this.phaseId, this.sectionTitle, key);
  }

  toggleDrill(key: string): void {
    if (this.isDrillActive(key)) return;
    if (this.timer.drillRunning()) this.timer.stopDrill(true, this.phaseId, this.sectionTitle);
    this.timer.startDrill(key);
  }

  saveDrill(): void { this.timer.stopDrill(true, this.phaseId, this.sectionTitle); }

  fmtSec(s: number): string {
    return s < 60 ? `${s}s` : `${Math.floor(s/60)}m${s%60 ? ' '+s%60+'s' : ''}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['launchToken'] || this.launchMode !== 'guided-practice') return;

    this.timer.sessionMinutes.set(this.launchSessionMinutes);
    this.metro.setBpm(70);

    if (!this.timer.sessionRunning()) this.timer.startSession();

    if (this.drillLevels.length > 0) {
      if (!this.timer.drillRunning()) this.timer.startDrill('L1');
      this.open.set('drill');
      return;
    }

    this.open.set('session');
  }

  ngOnDestroy(): void {
    this.metro.stop();
    this.timer.stopDrill(false);
  }
}

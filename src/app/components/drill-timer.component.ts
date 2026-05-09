import {
  Component, inject, Input, OnDestroy, signal, computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionTimerService } from '../session-timer.service';

interface DrillLevel {
  key: string;    // e.g. 'L1'
  label: string;  // e.g. 'Level 1 — Shape only'
  detail: string;
}

@Component({
  selector: 'app-drill-timer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dt-wrap">
      <div class="dt-header">
        <span class="dt-title">
          <i class="ti ti-layers-intersect"></i> Drill Levels
        </span>
        <span class="dt-sub">Tap a level to start timing it</span>
      </div>

      <div class="dt-levels">
        <button *ngFor="let lvl of parsedLevels()"
                class="dt-level"
                [class.dt-active]="isActive(lvl.key)"
                [class.dt-done]="todayDone(lvl.key) > 0 && !isActive(lvl.key)"
                (click)="toggleLevel(lvl.key)">

          <div class="dt-level-top">
            <span class="dt-key">{{ lvl.key }}</span>
            <span class="dt-elapsed" *ngIf="isActive(lvl.key)">
              <i class="ti ti-clock" style="font-size:11px"></i>
              {{ timer.drillDisplay() }}
            </span>
            <span class="dt-today" *ngIf="!isActive(lvl.key) && todayDone(lvl.key) > 0">
              <i class="ti ti-check" style="font-size:10px;color:#34d399"></i>
              {{ formatSec(todayDone(lvl.key)) }} today
            </span>
            <span class="dt-status" *ngIf="isActive(lvl.key)">
              <span class="pulse-dot"></span> recording
            </span>
          </div>

          <div class="dt-level-label">{{ lvl.label }}</div>
          <div class="dt-level-detail">{{ lvl.detail }}</div>
        </button>
      </div>

      <!-- Save/stop active level -->
      <div class="dt-save-row" *ngIf="timer.drillRunning()">
        <button class="dt-save-btn" (click)="saveCurrent()">
          <i class="ti ti-device-floppy"></i> Save & stop ({{ timer.drillDisplay() }})
        </button>
        <button class="dt-discard-btn" (click)="discardCurrent()">
          <i class="ti ti-x"></i>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dt-wrap {
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 14px;
      padding: 14px;
      display: flex; flex-direction: column; gap: 10px;
      margin-top: 6px;
    }

    .dt-header {
      display: flex; align-items: baseline; justify-content: space-between; gap: 8px;
    }
    .dt-title {
      font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--text-muted);
      display: flex; align-items: center; gap: 6px;
      i { font-size: 14px; }
    }
    .dt-sub {
      font-size: 10px; color: var(--text-muted);
    }

    .dt-levels {
      display: flex; flex-direction: column; gap: 6px;
    }

    .dt-level {
      display: flex; flex-direction: column; gap: 4px;
      padding: 10px 12px; border-radius: 10px; cursor: pointer; text-align: left;
      background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
      transition: all 0.2s;
      &:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.14); }
      &.dt-active {
        background: rgba(139,126,248,0.1); border-color: rgba(139,126,248,0.45);
        box-shadow: 0 0 16px rgba(139,126,248,0.12);
      }
      &.dt-done {
        border-color: rgba(52,211,153,0.25);
        background: rgba(52,211,153,0.04);
      }
    }

    .dt-level-top {
      display: flex; align-items: center; gap: 8px;
    }
    .dt-key {
      font-family: var(--font-display); font-size: 11px; font-weight: 900;
      letter-spacing: 0.06em; color: #a78bfa;
      background: rgba(139,126,248,0.15); padding: 2px 8px; border-radius: 6px;
      flex-shrink: 0;
    }
    .dt-elapsed {
      font-family: var(--font-display); font-size: 13px; font-weight: 700;
      color: #c4bbfe; display: flex; align-items: center; gap: 4px;
    }
    .dt-today {
      font-size: 10px; font-weight: 600; color: var(--text-muted);
      display: flex; align-items: center; gap: 3px;
    }
    .dt-status {
      display: flex; align-items: center; gap: 5px;
      font-size: 9px; font-weight: 700; letter-spacing: 0.1em;
      color: #a78bfa; text-transform: uppercase; margin-left: auto;
    }
    .pulse-dot {
      width: 6px; height: 6px; border-radius: 50%; background: #a78bfa;
      animation: pulseRec 1s ease-in-out infinite;
    }
    @keyframes pulseRec {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.7); }
    }

    .dt-level-label {
      font-size: 12px; font-weight: 600; color: var(--text-primary); line-height: 1.3;
    }
    .dt-level-detail {
      font-size: 11px; color: var(--text-secondary); line-height: 1.4;
    }

    .dt-save-row {
      display: flex; gap: 8px;
    }
    .dt-save-btn {
      flex: 1; display: flex; align-items: center; justify-content: center; gap: 7px;
      padding: 9px 12px; border-radius: 10px; cursor: pointer; font-size: 12px; font-weight: 700;
      background: rgba(52,211,153,0.12); border: 1px solid rgba(52,211,153,0.35); color: #34d399;
      transition: all 0.2s;
      i { font-size: 14px; }
      &:hover { background: rgba(52,211,153,0.2); }
    }
    .dt-discard-btn {
      display: flex; align-items: center; justify-content: center;
      width: 38px; border-radius: 10px; cursor: pointer;
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
      color: var(--text-muted); font-size: 14px;
      transition: all 0.2s;
      i { font-size: 14px; }
      &:hover { background: rgba(251,113,133,0.12); border-color: rgba(251,113,133,0.3); color: #fb7185; }
    }
  `]
})
export class DrillTimerComponent implements OnDestroy {
  @Input() phaseId = 0;
  @Input() sectionTitle = '';
  /** Pass the card items array directly from a two-col-drill card */
  @Input() levels: { title: string; detail: string }[] = [];

  timer = inject(SessionTimerService);

  parsedLevels = computed(() =>
    this.levels.map((l, i) => ({
      key: `L${i + 1}`,
      label: l.title,
      detail: l.detail,
    }))
  );

  isActive(key: string): boolean {
    return this.timer.drillRunning() && this.timer.drillLevelKey() === key;
  }

  todayDone(key: string): number {
    return this.timer.todaySeconds(this.phaseId, this.sectionTitle, key);
  }

  toggleLevel(key: string): void {
    if (this.isActive(key)) {
      this.saveCurrent();
    } else {
      if (this.timer.drillRunning()) {
        // Save current before switching
        this.timer.stopDrill(true, this.phaseId, this.sectionTitle);
      }
      this.timer.startDrill(key);
    }
  }

  saveCurrent(): void {
    this.timer.stopDrill(true, this.phaseId, this.sectionTitle);
  }

  discardCurrent(): void {
    this.timer.stopDrill(false);
  }

  formatSec(s: number): string {
    if (s < 60) return `${s}s`;
    return `${Math.floor(s / 60)}m ${s % 60}s`;
  }

  ngOnDestroy(): void {
    // Don't auto-save on navigate away — user should explicitly save
    this.timer.stopDrill(false);
  }
}

import { Injectable, signal, computed } from '@angular/core';

const STORAGE_KEY = 'keys_drill_times';

export interface DrillTimeEntry {
  date: string;           // ISO date YYYY-MM-DD
  phaseId: number;
  sectionTitle: string;
  levelKey: string;       // e.g. "L1"
  durationSec: number;
}

@Injectable({ providedIn: 'root' })
export class SessionTimerService {

  // ── Session countdown ───────────────────────────────────────────────────────
  sessionMinutes = signal(20);
  sessionRunning = signal(false);
  sessionSecondsLeft = signal(0);

  private sessionInterval: ReturnType<typeof setInterval> | null = null;

  startSession(): void {
    if (this.sessionRunning()) return;
    this.sessionSecondsLeft.set(this.sessionMinutes() * 60);
    this.sessionRunning.set(true);
    this.sessionInterval = setInterval(() => {
      const s = this.sessionSecondsLeft() - 1;
      if (s <= 0) {
        this.sessionSecondsLeft.set(0);
        this.stopSession();
      } else {
        this.sessionSecondsLeft.set(s);
      }
    }, 1000);
  }

  stopSession(): void {
    if (this.sessionInterval) clearInterval(this.sessionInterval);
    this.sessionInterval = null;
    this.sessionRunning.set(false);
  }

  resetSession(): void {
    this.stopSession();
    this.sessionSecondsLeft.set(0);
  }

  sessionDisplay = computed(() => {
    const s = this.sessionSecondsLeft();
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  });

  sessionPct = computed(() => {
    const total = this.sessionMinutes() * 60;
    if (total === 0) return 0;
    return Math.round(((total - this.sessionSecondsLeft()) / total) * 100);
  });

  // ── Drill level timer ──────────────────────────────────────────────────────
  drillRunning   = signal(false);
  drillElapsed   = signal(0);   // seconds
  drillLevelKey  = signal('');

  private drillInterval: ReturnType<typeof setInterval> | null = null;

  startDrill(levelKey: string): void {
    this.stopDrill(false);   // stop any running drill without saving
    this.drillLevelKey.set(levelKey);
    this.drillElapsed.set(0);
    this.drillRunning.set(true);
    this.drillInterval = setInterval(() => {
      this.drillElapsed.update(e => e + 1);
    }, 1000);
  }

  stopDrill(save: boolean, phaseId?: number, sectionTitle?: string): void {
    if (this.drillInterval) clearInterval(this.drillInterval);
    this.drillInterval = null;
    if (save && this.drillElapsed() > 0 && phaseId !== undefined && sectionTitle) {
      this.saveDrillTime({
        date: new Date().toISOString().split('T')[0],
        phaseId,
        sectionTitle,
        levelKey: this.drillLevelKey(),
        durationSec: this.drillElapsed(),
      });
    }
    this.drillRunning.set(false);
    this.drillElapsed.set(0);
    this.drillLevelKey.set('');
  }

  drillDisplay = computed(() => {
    const s = this.drillElapsed();
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '00')}`;
  });

  // ── Persistence ───────────────────────────────────────────────────────────
  private loadHistory(): DrillTimeEntry[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    } catch { return []; }
  }

  private saveDrillTime(entry: DrillTimeEntry): void {
    const history = this.loadHistory();
    history.push(entry);
    // Keep last 200 entries
    if (history.length > 200) history.splice(0, history.length - 200);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }

  getHistory(): DrillTimeEntry[] {
    return this.loadHistory();
  }

  /** Total seconds spent on a specific level today */
  todaySeconds(phaseId: number, sectionTitle: string, levelKey: string): number {
    const today = new Date().toISOString().split('T')[0];
    return this.loadHistory()
      .filter(e => e.date === today && e.phaseId === phaseId && e.sectionTitle === sectionTitle && e.levelKey === levelKey)
      .reduce((sum, e) => sum + e.durationSec, 0);
  }
}

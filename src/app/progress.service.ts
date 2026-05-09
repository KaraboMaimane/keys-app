import { Injectable, signal, computed } from '@angular/core';

const STORAGE_KEY = 'keys_app_progress';
const STREAK_KEY = 'keys_app_streak';

interface ProgressState {
  /** phaseId → set of completed checklist item indices */
  completed: Record<number, number[]>;
}

interface StreakState {
  lastSessionDate: string | null; // ISO date string YYYY-MM-DD
  currentStreak: number;
  totalSessions: number;
}

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private _state = signal<ProgressState>(this._load());
  private _streak = signal<StreakState>(this._loadStreak());

  // ─── Public signals ────────────────────────────────────────────────────────

  /** Returns the set of completed checklist indices for a given phase */
  completedItems(phaseId: number): number[] {
    return this._state().completed[phaseId] ?? [];
  }

  /** True if every checklist item for a phase is checked */
  isPhaseComplete(phaseId: number, totalItems: number): boolean {
    return this.completedItems(phaseId).length >= totalItems;
  }

  /** True if this phase is accessible (previous phase complete, or it's phase 1) */
  isPhaseUnlocked(phaseId: number, phases: { id: number; checkList?: string[] }[]): boolean {
    if (phaseId === 1) return true;
    const prev = phases.find(p => p.id === phaseId - 1);
    if (!prev || !prev.checkList) return true;
    return this.isPhaseComplete(prev.id, prev.checkList.length);
  }

  currentStreak = computed(() => this._streak().currentStreak);
  totalSessions = computed(() => this._streak().totalSessions);
  lastSessionDate = computed(() => this._streak().lastSessionDate);

  // ─── Mutations ─────────────────────────────────────────────────────────────

  toggleItem(phaseId: number, itemIndex: number): void {
    const current = { ...this._state() };
    const items = [...(current.completed[phaseId] ?? [])];
    const idx = items.indexOf(itemIndex);
    if (idx > -1) {
      items.splice(idx, 1);
    } else {
      items.push(itemIndex);
    }
    current.completed = { ...current.completed, [phaseId]: items };
    this._state.set(current);
    this._save(current);
  }

  recordSession(): void {
    const today = new Date().toISOString().split('T')[0];
    const s = { ...this._streak() };

    if (s.lastSessionDate === today) return; // already recorded today

    const yesterday = new Date(Date.now() - 86_400_000).toISOString().split('T')[0];
    s.currentStreak = s.lastSessionDate === yesterday ? s.currentStreak + 1 : 1;
    s.totalSessions += 1;
    s.lastSessionDate = today;

    this._streak.set(s);
    this._saveStreak(s);
  }

  // ─── Persistence ───────────────────────────────────────────────────────────

  private _load(): ProgressState {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { completed: {} };
    } catch {
      return { completed: {} };
    }
  }

  private _save(state: ProgressState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch { /* storage unavailable */ }
  }

  private _loadStreak(): StreakState {
    try {
      const raw = localStorage.getItem(STREAK_KEY);
      return raw ? JSON.parse(raw) : { lastSessionDate: null, currentStreak: 0, totalSessions: 0 };
    } catch {
      return { lastSessionDate: null, currentStreak: 0, totalSessions: 0 };
    }
  }

  private _saveStreak(s: StreakState): void {
    try {
      localStorage.setItem(STREAK_KEY, JSON.stringify(s));
    } catch { /* storage unavailable */ }
  }
}

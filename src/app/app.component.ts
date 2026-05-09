import { Component, signal, computed, inject, OnInit, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { PHASES } from './data/phases.data';
import { ProgressService } from './progress.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatTabsModule, MatRippleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('viewIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(18px)' }),
        animate('300ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('160ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 0, transform: 'translateY(-8px)' }))
      ])
    ]),
    trigger('phaseIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('350ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerCards', [
      transition('* => *', [
        query('.glass-card', [
          style({ opacity: 0, transform: 'translateY(12px)' }),
          stagger(60, animate('300ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'translateY(0)' })))
        ], { optional: true })
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  phases = PHASES;
  progress = inject(ProgressService);
  readonly devToolsEnabled = isDevMode();

  activeIndex    = signal(0);
  activePhase    = computed(() => this.phases[this.activeIndex()]);
  currentView    = signal<'home' | 'phase'>('home');
  sectionFilter  = signal<'all' | 'theory' | 'practice'>('all');
  devUnlocked    = signal(false);
  /** 25 = mini keyboard always available; 61 = full keyboard (setup required) */
  keyboard       = signal<25 | 61>(this.loadKeyboard());

  private loadKeyboard(): 25 | 61 {
    return (localStorage.getItem('keys_app_keyboard') as '61' | null) === '61' ? 61 : 25;
  }

  toggleKeyboard(): void {
    const next: 25 | 61 = this.keyboard() === 25 ? 61 : 25;
    this.keyboard.set(next);
    localStorage.setItem('keys_app_keyboard', String(next));
  }

  ngOnInit(): void {
    this.progress.recordSession();
  }

  /** Index of the first incomplete phase — the "current" one to highlight */
  currentPhaseIndex = computed(() => {
    for (let i = 0; i < this.phases.length; i++) {
      const total = this.phases[i].checkList?.length ?? 0;
      if (!this.progress.isPhaseComplete(this.phases[i].id, total)) return i;
    }
    return this.phases.length - 1;
  });

  completedPhasesCount = computed(() =>
    this.phases.filter(p =>
      this.progress.isPhaseComplete(p.id, p.checkList?.length ?? 0)
    ).length
  );

  /** Human-readable label for when the last session was */
  lastSessionLabel = computed(() => {
    const d = this.progress.lastSessionDate();
    if (!d) return 'No sessions yet';
    const today     = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86_400_000).toISOString().split('T')[0];
    if (d === today)     return 'Active today';
    if (d === yesterday) return 'Active yesterday';
    return 'Last: ' + new Date(d + 'T00:00:00').toLocaleDateString('en', { month: 'short', day: 'numeric' });
  });

  /** True when streak is still alive (last session today or yesterday) */
  streakAlive = computed(() => {
    const d = this.progress.lastSessionDate();
    if (!d) return false;
    const today     = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86_400_000).toISOString().split('T')[0];
    return d === today || d === yesterday;
  });

  phaseProgress(phaseId: number): { done: number; total: number; pct: number } {
    const phase = this.phases.find(p => p.id === phaseId);
    const total = phase?.checkList?.length ?? 0;
    const done = this.progress.completedItems(phaseId).length;
    return { done, total, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  }

  /** Whether the phase at index i is accessible */
  isUnlocked(i: number): boolean {
    if (this.devToolsEnabled && this.devUnlocked()) return true;
    return this.progress.isPhaseUnlocked(this.phases[i].id, this.phases);
  }

  filteredSections = computed(() => {
    const sections = this.activePhase().sections;
    const f = this.sectionFilter();
    if (f === 'practice') return sections.filter(s => s.sectionType === 'practice');
    if (f === 'theory')   return sections.filter(s => (s.sectionType ?? 'theory') === 'theory');
    return sections;
  });

  /** Number of 61-key sections in the currently active phase */
  current61KeyCount = computed(() =>
    this.activePhase().sections.filter(s => s.keysNeeded === 61).length
  );

  /**
   * The single next checklist item the user hasn't completed yet,
   * surfaced directly on the dashboard so they know exactly what to do.
   */
  todaysFocus = computed((): { phaseId: number; phaseLabel: string; phaseIndex: number; accentColor: string; item: string; itemIndex: number; totalDone: number; totalItems: number } | null => {
    for (let i = 0; i < this.phases.length; i++) {
      if (!this.isUnlocked(i)) continue;
      const phase = this.phases[i];
      const done = this.progress.completedItems(phase.id);
      const list = phase.checkList ?? [];
      const nextIdx = list.findIndex((_, idx) => !done.includes(idx));
      if (nextIdx !== -1) {
        return {
          phaseId: phase.id,
          phaseLabel: phase.label,
          phaseIndex: i,
          accentColor: phase.accentColor,
          item: list[nextIdx],
          itemIndex: nextIdx,
          totalDone: done.length,
          totalItems: list.length,
        };
      }
    }
    return null;
  });

  /** Marks the todaysFocus item done directly from the dashboard */
  completeFocusItem(): void {
    const f = this.todaysFocus();
    if (!f) return;
    this.progress.toggleItem(f.phaseId, f.itemIndex);
  }

  /** Total checklist items completed across ALL phases */
  totalItemsDone = computed(() =>
    this.phases.reduce((sum, p) => sum + this.progress.completedItems(p.id).length, 0)
  );

  /** Total checklist items across ALL phases */
  totalItemsAll = computed(() =>
    this.phases.reduce((sum, p) => sum + (p.checkList?.length ?? 0), 0)
  );

  toggleDevMode(): void {
    if (!this.devToolsEnabled) return;
    this.devUnlocked.update(v => !v);
  }

  enterPhase(i: number): void {
    if (!this.isUnlocked(i)) return;
    this.activeIndex.set(i);
    this.currentView.set('phase');
  }

  goHome(): void {
    this.currentView.set('home');
  }

  setPhase(i: number): void {
    if (!this.isUnlocked(i)) return;
    this.activeIndex.set(i);
  }

  trackByIndex(i: number) { return i; }
}

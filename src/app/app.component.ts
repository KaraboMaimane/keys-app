import { Component, signal, computed, inject, OnInit, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { MatRippleModule } from '@angular/material/core';
import { PHASES, Section } from './data/phases.data';
import { ProgressService } from './progress.service';
import { PracticeFloatBarComponent } from './components/practice-float-bar.component';
import { ScaleQuizComponent } from './components/scale-quiz.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, MatRippleModule, PracticeFloatBarComponent, ScaleQuizComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('viewIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(18px)' }),
        animate('280ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('160ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 0, transform: 'translateY(-8px)' }))
      ])
    ]),
    trigger('slideUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(24px)' }),
        animate('300ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('180ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 0, transform: 'translateY(16px)' }))
      ])
    ]),
    trigger('staggerList', [
      transition(':enter', [
        query('.section-row', [
          style({ opacity: 0, transform: 'translateY(10px)' }),
          stagger(40, animate('240ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'translateY(0)' })))
        ], { optional: true })
      ])
    ]),
    trigger('staggerCards', [
      transition('* => *', [
        query('.glass-card', [
          style({ opacity: 0, transform: 'translateY(12px)' }),
          stagger(50, animate('280ms cubic-bezier(0.4,0,0.2,1)', style({ opacity: 1, transform: 'translateY(0)' })))
        ], { optional: true })
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  phases = PHASES;
  progress = inject(ProgressService);
  readonly devToolsEnabled = isDevMode();

  activeIndex   = signal(0);
  activePhase   = computed(() => this.phases[this.activeIndex()]);
  /** 'home' | 'phase' (section list) | 'section' (focused section content) */
  currentView   = signal<'home' | 'phase' | 'section'>('home');
  sectionFilter = signal<'all' | 'theory' | 'practice'>('all');
  devUnlocked   = signal(false);
  keyboard      = signal<25 | 61>(this.loadKeyboard());

  /** The section the user has opened */
  activeSection = signal<Section | null>(null);

  private loadKeyboard(): 25 | 61 {
    return (localStorage.getItem('keys_app_keyboard') as '61' | null) === '61' ? 61 : 25;
  }

  toggleKeyboard(): void {
    const next: 25 | 61 = this.keyboard() === 25 ? 61 : 25;
    this.keyboard.set(next);
    localStorage.setItem('keys_app_keyboard', String(next));
  }

  ngOnInit(): void { this.progress.recordSession(); }

  currentPhaseIndex = computed(() => {
    for (let i = 0; i < this.phases.length; i++) {
      const total = this.phases[i].checkList?.length ?? 0;
      if (!this.progress.isPhaseComplete(this.phases[i].id, total)) return i;
    }
    return this.phases.length - 1;
  });

  lastSessionLabel = computed(() => {
    const d = this.progress.lastSessionDate();
    if (!d) return 'No sessions yet';
    const today     = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86_400_000).toISOString().split('T')[0];
    if (d === today)     return 'Active today';
    if (d === yesterday) return 'Active yesterday';
    return 'Last: ' + new Date(d + 'T00:00:00').toLocaleDateString('en', { month: 'short', day: 'numeric' });
  });

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
    const done  = this.progress.completedItems(phaseId).length;
    return { done, total, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  }

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

  todaysFocus = computed((): { phaseId: number; phaseLabel: string; phaseIndex: number; accentColor: string; item: string; itemIndex: number; totalDone: number; totalItems: number } | null => {
    for (let i = 0; i < this.phases.length; i++) {
      if (!this.isUnlocked(i)) continue;
      const phase = this.phases[i];
      const done  = this.progress.completedItems(phase.id);
      const list  = phase.checkList ?? [];
      const nextIdx = list.findIndex((_, idx) => !done.includes(idx));
      if (nextIdx !== -1) {
        return { phaseId: phase.id, phaseLabel: phase.label, phaseIndex: i, accentColor: phase.accentColor, item: list[nextIdx], itemIndex: nextIdx, totalDone: done.length, totalItems: list.length };
      }
    }
    return null;
  });

  completeFocusItem(): void {
    const f = this.todaysFocus();
    if (!f) return;
    this.progress.toggleItem(f.phaseId, f.itemIndex);
  }

  totalItemsDone = computed(() => this.phases.reduce((sum, p) => sum + this.progress.completedItems(p.id).length, 0));
  totalItemsAll  = computed(() => this.phases.reduce((sum, p) => sum + (p.checkList?.length ?? 0), 0));

  toggleDevMode(): void { if (this.devToolsEnabled) this.devUnlocked.update(v => !v); }

  enterPhase(i: number): void {
    if (!this.isUnlocked(i)) return;
    this.activeIndex.set(i);
    this.sectionFilter.set('all');
    this.activeSection.set(null);
    this.currentView.set('phase');
  }

  openSection(section: Section): void {
    this.activeSection.set(section);
    this.currentView.set('section');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  closeSection(): void {
    this.activeSection.set(null);
    this.currentView.set('phase');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goHome(): void {
    this.activeSection.set(null);
    this.currentView.set('home');
  }

  setPhase(i: number): void {
    if (!this.isUnlocked(i)) return;
    this.activeIndex.set(i);
    this.activeSection.set(null);
    this.currentView.set('phase');
  }

  /** Navigate to previous/next section from section view */
  prevSection(): void {
    const list = this.filteredSections();
    const idx  = list.indexOf(this.activeSection()!);
    if (idx > 0) this.openSection(list[idx - 1]);
  }

  nextSection(): void {
    const list = this.filteredSections();
    const idx  = list.indexOf(this.activeSection()!);
    if (idx < list.length - 1) this.openSection(list[idx + 1]);
  }

  sectionIdx = computed(() => {
    const s = this.activeSection();
    if (!s) return -1;
    return this.filteredSections().indexOf(s);
  });

  // ── Float bar wiring ──────────────────────────────────────────────────────

  showFloatBar = computed(() =>
    this.currentView() === 'section' && this.activeSection()?.sectionType === 'practice'
  );

  activeSectionTitle = computed(() => this.activeSection()?.title ?? '');

  activeDrillItems = computed(() => {
    const s = this.activeSection();
    if (!s) return [];
    const card = (s as any).cards?.find((c: any) => c.type === 'two-col-drill');
    return card?.items ?? [];
  });

  // ── Helpers ───────────────────────────────────────────────────────────────

  isScaleSection(section: { title: string }): boolean {
    return section.title.toLowerCase().includes('week 1') ||
           section.title.toLowerCase().includes('natural minor');
  }

  sectionTypeLabel(s: Section): string {
    return s.sectionType === 'practice' ? 'Practice' : 'Theory';
  }

  sectionTypeIcon(s: Section): string {
    return s.sectionType === 'practice' ? 'ti-dumbbell' : 'ti-brain';
  }

  trackByIndex(i: number) { return i; }
}

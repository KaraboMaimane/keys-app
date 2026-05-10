import { Component, signal, computed, inject, OnInit, isDevMode, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { MatRippleModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PHASES, Phase, Section } from './data/phases.data';
import { ProgressService } from './progress.service';
import { PracticeFloatBarComponent } from './components/practice-float-bar.component';
import { SectionContentCardsComponent } from './components/section-content-cards.component';

@Component({
  selector: 'app-course-shell',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatRippleModule,
    PracticeFloatBarComponent,
    SectionContentCardsComponent,
  ],
  templateUrl: './course-shell.component.html',
  styleUrl: './course-shell.component.scss',
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
export class CourseShellComponent implements OnInit {
  phases = PHASES;
  progress = inject(ProgressService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly devToolsEnabled = isDevMode();

  activeIndex   = signal(0);
  activePhase   = computed(() => this.phases[this.activeIndex()]);
  /** 'home' | 'phase' (section list) | 'section' (focused section content) */
  currentView   = signal<'home' | 'phase' | 'section'>('home');
  sectionFilter = signal<'all' | 'theory' | 'practice'>('all');
  showAllSections = signal(false);
  devUnlocked   = signal(false);
  keyboard      = signal<25 | 61>(this.loadKeyboard());
  calmMode      = signal<boolean>(this.loadCalmMode());
  taskFirstMode = signal<boolean>(this.loadTaskFirstMode());
  homeDetailsExpanded = signal<boolean>(this.loadHomeDetailsExpanded());
  phaseGuidanceExpanded = signal(false);
  practiceLaunchToken = signal(0);
  practiceLaunchMode = signal<'none' | 'guided-practice'>('none');
  practiceLaunchSessionMinutes = signal(20);

  /** The section the user has opened */
  activeSection = signal<Section | null>(null);

  /** Visited section keys (phaseId::title) — localStorage backed */
  private loadVisited(): Set<string> {
    try { return new Set(JSON.parse(localStorage.getItem('keys_visited') ?? '[]') as string[]); }
    catch { return new Set(); }
  }
  visitedSections = signal<Set<string>>(this.loadVisited());

  markSectionVisited(section: Section): void {
    const key = `${this.activePhase().id}::${section.title}`;
    const next = new Set(this.visitedSections()); next.add(key);
    this.visitedSections.set(next);
    localStorage.setItem('keys_visited', JSON.stringify([...next]));
  }

  isSectionVisited(section: Section): boolean {
    return this.visitedSections().has(`${this.activePhase().id}::${section.title}`);
  }

  /** Whether the phase readiness checklist is expanded */
  readinessExpanded = signal(false);
  toggleReadiness(): void { this.readinessExpanded.update(v => !v); }

  /** Session indicator: 'today' | 'yesterday' | 'inactive' */
  sessionIndicator = computed(() => {
    const d = this.progress.lastSessionDate();
    if (!d) return 'inactive';
    const today     = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86_400_000).toISOString().split('T')[0];
    if (d === today)     return 'today';
    if (d === yesterday) return 'yesterday';
    return 'inactive';
  });

  /** Returns a semantic CSS class for a card based on its heading/type */
  cardClass(card: { type: string; heading?: string }): string {
    if (card.type === 'two-col-drill') return 'card-drill';
    if (card.heading?.startsWith('⚠️')) return 'card-warning';
    if (card.heading?.startsWith('✓') || card.heading?.toLowerCase().startsWith('pass mark')) return 'card-pass';
    if (card.heading?.toLowerCase().includes('insight') || card.heading?.startsWith('Critical')) return 'card-insight';
    return '';
  }

  /** Whether this section contains an interactive quiz */
  hasQuiz(section: { title: string }): boolean { return this.isScaleSection(section); }

  private loadKeyboard(): 25 | 61 {
    return (localStorage.getItem('keys_app_keyboard') as '61' | null) === '61' ? 61 : 25;
  }

  private loadCalmMode(): boolean {
    return localStorage.getItem('keys_app_calm_mode') === '1';
  }

  private loadTaskFirstMode(): boolean {
    const stored = localStorage.getItem('keys_app_task_first');
    return stored === null ? true : stored === '1';
  }

  private loadHomeDetailsExpanded(): boolean {
    return localStorage.getItem('keys_app_home_details') === '1';
  }

  toggleKeyboard(): void {
    const next: 25 | 61 = this.keyboard() === 25 ? 61 : 25;
    this.keyboard.set(next);
    localStorage.setItem('keys_app_keyboard', String(next));
  }

  toggleCalmMode(): void {
    const next = !this.calmMode();
    this.calmMode.set(next);
    localStorage.setItem('keys_app_calm_mode', next ? '1' : '0');
  }

  toggleTaskFirstMode(): void {
    const next = !this.taskFirstMode();
    this.taskFirstMode.set(next);
    localStorage.setItem('keys_app_task_first', next ? '1' : '0');
    if (this.currentView() === 'phase') {
      this.sectionFilter.set(this.defaultFilterForPhase(this.activePhase()));
      this.showAllSections.set(false);
    }
  }

  toggleHomeDetails(): void {
    const next = !this.homeDetailsExpanded();
    this.homeDetailsExpanded.set(next);
    localStorage.setItem('keys_app_home_details', next ? '1' : '0');
  }

  togglePhaseGuidance(): void {
    this.phaseGuidanceExpanded.update(v => !v);
  }

  ngOnInit(): void {
    this.progress.recordSession();
    this.syncStateFromRoute();
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.syncStateFromRoute());
  }

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

  visibleSections = computed(() =>
    this.showAllSections() ? this.filteredSections() : this.filteredSections().slice(0, 3)
  );

  remainingSectionCount = computed(() =>
    Math.max(0, this.filteredSections().length - this.visibleSections().length)
  );

  nextActionSection = computed(() => {
    const pending = this.activePhase().sections.find(section =>
      !this.isSectionVisited(section) && section.sectionType === 'practice'
    );
    if (pending) return pending;
    const pendingAny = this.activePhase().sections.find(section =>
      !this.isSectionVisited(section)
    );
    return pendingAny ?? this.activePhase().sections[0] ?? null;
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

  phaseSummaries = computed(() => this.phases.map((phase, index) => {
    const practiceCount = phase.sections.filter(section => section.sectionType === 'practice').length;
    const theoryCount = phase.sections.length - practiceCount;
    const progress = this.phaseProgress(phase.id);

    return {
      phase,
      index,
      practiceCount,
      theoryCount,
      progress,
      focus: this.phaseFocusLabel(phase),
      nextSection: this.nextSectionLabel(phase)
    };
  }));

  courseSnapshot = computed(() => {
    const totalSections = this.phases.reduce((sum, phase) => sum + phase.sections.length, 0);
    const practiceSections = this.phases.reduce((sum, phase) => sum + phase.sections.filter(section => section.sectionType === 'practice').length, 0);
    const theorySections = totalSections - practiceSections;

    return {
      phases: this.phases.length,
      sections: totalSections,
      practiceSections,
      theorySections
    };
  });

  toggleDevMode(): void { if (this.devToolsEnabled) this.devUnlocked.update(v => !v); }

  enterPhase(i: number): void {
    if (!this.isUnlocked(i)) return;
    this.activeIndex.set(i);
    this.sectionFilter.set(this.defaultFilterForPhase(this.phases[i]));
    this.showAllSections.set(false);
    this.phaseGuidanceExpanded.set(false);
    this.activeSection.set(null);
    this.currentView.set('phase');
    this.router.navigate(['/phase', this.phases[i].id]);
  }

  openSection(section: Section): void {
    this.markSectionVisited(section);
    this.readinessExpanded.set(false);
    this.activeSection.set(section);
    this.currentView.set('section');
    this.router.navigate(['/phase', this.activePhase().id, 'section', this.sectionToSlug(section)]);
    this.scrollToTop();
  }

  closeSection(): void {
    this.activeSection.set(null);
    this.currentView.set('phase');
    this.router.navigate(['/phase', this.activePhase().id]);
    this.scrollToTop();
  }

  goHome(): void {
    this.activeSection.set(null);
    this.readinessExpanded.set(false);
    this.currentView.set('home');
    this.router.navigate(['/']);
  }

  setPhase(i: number): void {
    if (!this.isUnlocked(i)) return;
    this.activeIndex.set(i);
    this.sectionFilter.set(this.defaultFilterForPhase(this.phases[i]));
    this.showAllSections.set(false);
    this.phaseGuidanceExpanded.set(false);
    this.activeSection.set(null);
    this.currentView.set('phase');
    this.router.navigate(['/phase', this.phases[i].id]);
  }

  startPracticeFromHome(sessionMinutes = 20): void {
    let targetIndex = this.currentPhaseIndex();
    if (!this.isUnlocked(targetIndex)) {
      targetIndex = this.phases.findIndex((_, idx) => this.isUnlocked(idx));
    }
    if (targetIndex === -1) return;

    this.activeIndex.set(targetIndex);
    this.sectionFilter.set('practice');
    this.showAllSections.set(false);
    this.currentView.set('phase');
    this.launchGuidedPractice(sessionMinutes);
  }

  openNextActionSection(): void {
    const section = this.nextActionSection();
    if (!section) return;
    this.openSection(section);
  }

  launchGuidedPractice(sessionMinutes = 20): void {
    const practiceSection = this.activePhase().sections.find(section => section.sectionType === 'practice') ?? this.nextActionSection();
    if (!practiceSection) return;
    this.openSection(practiceSection);
    this.practiceLaunchSessionMinutes.set(sessionMinutes);
    this.practiceLaunchMode.set('guided-practice');
    this.practiceLaunchToken.update(v => v + 1);
  }

  setSectionFilter(filter: 'all' | 'theory' | 'practice'): void {
    this.sectionFilter.set(filter);
    this.showAllSections.set(false);
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

  sectionPreview(section: Section): string {
    const card = section.cards.find(item => item.intro || item.body || item.heading);
    const source = card?.intro ?? card?.body ?? card?.heading ?? '';
    const plain = source
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!plain) return section.sectionType === 'practice'
      ? 'Hands-on drills and checkpoints for this topic.'
      : 'Core concept and studio context for this topic.';

    const sentence = plain.split(/(?<=[.!?])\s+/)[0] ?? plain;
    return sentence.length > 120 ? sentence.slice(0, 117).trimEnd() + '...' : sentence;
  }

  phaseRequiresFullKeys(phase: Phase): boolean {
    return phase.sections.some(section => section.keysNeeded === 61);
  }

  practiceSectionCount(phase: Phase): number {
    return phase.sections.filter(section => section.sectionType === 'practice').length;
  }

  theorySectionCount(phase: Phase): number {
    return phase.sections.length - this.practiceSectionCount(phase);
  }

  phaseFocusLabel(phase: Phase): string {
    return phase.title.split('—')[1]?.trim() ?? phase.title;
  }

  nextSectionLabel(phase: Phase): string {
    const nextPractice = phase.sections.find(section => section.sectionType === 'practice');
    return nextPractice?.title ?? phase.sections[0]?.title ?? 'No sections yet';
  }

  private defaultFilterForPhase(phase: Phase): 'all' | 'practice' {
    return this.taskFirstMode() && this.practiceSectionCount(phase) > 0 ? 'practice' : 'all';
  }

  private scrollToTop(): void {
    const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  private syncStateFromRoute(): void {
    const phaseIdParam = this.route.snapshot.paramMap.get('phaseId');
    const sectionSlugParam = this.route.snapshot.paramMap.get('sectionSlug');

    if (!phaseIdParam) {
      this.activeSection.set(null);
      this.readinessExpanded.set(false);
      this.currentView.set('home');
      return;
    }

    const phaseId = Number(phaseIdParam);
    const phaseIndex = this.phases.findIndex(phase => phase.id === phaseId);
    if (phaseIndex === -1) {
      this.router.navigate(['/'], { replaceUrl: true });
      return;
    }

    this.activeIndex.set(phaseIndex);
    this.sectionFilter.set(this.defaultFilterForPhase(this.phases[phaseIndex]));
    this.showAllSections.set(false);
    this.phaseGuidanceExpanded.set(false);

    if (!sectionSlugParam) {
      this.activeSection.set(null);
      this.currentView.set('phase');
      return;
    }

    const section = this.findSectionBySlug(this.phases[phaseIndex], sectionSlugParam);
    if (!section) {
      this.router.navigate(['/phase', phaseId], { replaceUrl: true });
      return;
    }

    this.markSectionVisited(section);
    this.readinessExpanded.set(false);
    this.activeSection.set(section);
    this.currentView.set('section');
  }

  private sectionToSlug(section: Section): string {
    return section.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  private findSectionBySlug(phase: Phase, slug: string): Section | null {
    return phase.sections.find(section => this.sectionToSlug(section) === slug) ?? null;
  }

  trackByIndex(i: number) { return i; }
}

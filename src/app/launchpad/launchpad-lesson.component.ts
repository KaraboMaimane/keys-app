import { Component, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchpadGridComponent } from './launchpad-grid.component';
import { LaunchpadGridService } from './launchpad.service';
import { LAUNCHPAD_LESSONS } from './launchpad.data';
import {
  GridConfig, PadState, PadHighlight, LaunchpadLesson,
  SCALE_LABELS, ROOT_NAMES,
} from './launchpad.models';

type LessonCategory = 'all' | 'scale' | 'chord' | 'lick' | 'run' | 'progression';

const CATEGORY_ICONS: Record<string, string> = {
  scale: 'ti-waves',
  chord: 'ti-stack-2',
  lick: 'ti-flame',
  run: 'ti-run',
  progression: 'ti-timeline',
};

@Component({
  selector: 'app-launchpad-lesson',
  standalone: true,
  imports: [CommonModule, LaunchpadGridComponent],
  styles: [`
    :host { display: block; }

    .lesson-layout {
      display: grid;
      grid-template-columns: 260px 1fr;
      gap: 20px;
      align-items: start;
    }
    @media (max-width: 720px) {
      .lesson-layout { grid-template-columns: 1fr; }
    }

    /* ── Lesson list ── */
    .lesson-list-panel {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .filter-row {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-bottom: 6px;
    }
    .filter-btn {
      padding: 3px 10px;
      border-radius: 99px;
      font-size: 11px;
      font-weight: 600;
      font-family: 'Outfit', sans-serif;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.04);
      color: rgba(255,255,255,0.5);
      cursor: pointer;
      transition: all 0.15s ease;
      text-transform: capitalize;
    }
    .filter-btn.active {
      background: rgba(124,58,237,0.3);
      border-color: rgba(167,139,250,0.4);
      color: #fff;
    }

    .lesson-item {
      padding: 9px 11px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.07);
      background: rgba(255,255,255,0.03);
      cursor: pointer;
      transition: all 0.15s ease;
      font-family: 'Outfit', sans-serif;
    }
    .lesson-item:hover { border-color: rgba(167,139,250,0.25); background: rgba(255,255,255,0.05); }
    .lesson-item.active {
      border-color: rgba(167,139,250,0.5);
      background: rgba(124,58,237,0.12);
    }
    .lesson-item-head {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .lesson-cat-icon {
      font-size: 12px;
      color: rgba(255,255,255,0.4);
    }
    .lesson-cat-tag {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 1px 6px;
      border-radius: 99px;
      background: rgba(255,255,255,0.07);
      color: rgba(255,255,255,0.4);
    }
    .lesson-item-title {
      font-size: 12px;
      font-weight: 600;
      color: rgba(255,255,255,0.8);
      margin-top: 3px;
      line-height: 1.3;
    }

    /* ── Active lesson panel ── */
    .lesson-panel {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .lesson-header {
      padding: 14px 16px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
    }
    .lesson-header-top {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .lesson-title {
      font-size: 16px;
      font-weight: 700;
      color: rgba(255,255,255,0.95);
      font-family: 'Outfit', sans-serif;
    }
    .lesson-desc {
      font-size: 13px;
      color: rgba(255,255,255,0.55);
      line-height: 1.5;
      font-family: 'Outfit', sans-serif;
    }

    .config-banner {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: rgba(251,191,36,0.08);
      border: 1px solid rgba(251,191,36,0.2);
      border-radius: 8px;
      font-size: 12px;
      color: rgba(251,191,36,0.85);
      font-family: 'Outfit', sans-serif;
    }

    /* Step player */
    .step-card {
      padding: 16px;
      background: rgba(15,20,30,0.5);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
    }
    .step-counter {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: rgba(167,139,250,0.7);
      margin-bottom: 6px;
      font-family: 'Orbitron', sans-serif;
    }
    .step-instruction {
      font-size: 15px;
      font-weight: 700;
      color: rgba(255,255,255,0.95);
      margin-bottom: 4px;
      font-family: 'Outfit', sans-serif;
      line-height: 1.4;
    }
    .step-subtext {
      font-size: 13px;
      color: rgba(255,255,255,0.55);
      line-height: 1.5;
      font-family: 'Outfit', sans-serif;
    }

    .step-nav {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 14px;
    }
    .nav-btn {
      padding: 7px 18px;
      border-radius: 99px;
      font-size: 13px;
      font-weight: 700;
      font-family: 'Outfit', sans-serif;
      border: 1px solid rgba(255,255,255,0.15);
      background: rgba(255,255,255,0.07);
      color: rgba(255,255,255,0.7);
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .nav-btn:hover:not(:disabled) { background: rgba(124,58,237,0.3); border-color: rgba(167,139,250,0.4); color: #fff; }
    .nav-btn:disabled { opacity: 0.3; cursor: default; }
    .nav-btn.primary {
      background: rgba(124,58,237,0.4);
      border-color: rgba(167,139,250,0.5);
      color: #fff;
    }
    .nav-btn.primary:hover:not(:disabled) { background: rgba(124,58,237,0.6); }

    .step-progress {
      flex: 1;
      height: 3px;
      background: rgba(255,255,255,0.08);
      border-radius: 99px;
      overflow: hidden;
    }
    .step-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #7c3aed, #a78bfa);
      border-radius: 99px;
      transition: width 0.3s ease;
    }

    .empty-state {
      padding: 40px 20px;
      text-align: center;
      color: rgba(255,255,255,0.4);
      font-family: 'Outfit', sans-serif;
      font-size: 14px;
    }
    .empty-state i { font-size: 32px; display: block; margin-bottom: 10px; opacity: 0.4; }
  `],
  template: `
    <div class="lesson-layout">

      <!-- Lesson list -->
      <div class="lesson-list-panel">
        <div class="filter-row">
          <button *ngFor="let cat of categories"
                  class="filter-btn"
                  [class.active]="filterCat() === cat"
                  (click)="setFilter(cat)">{{ cat }}</button>
        </div>
        <div class="lesson-item"
             *ngFor="let lesson of filteredLessons()"
             [class.active]="activeLesson()?.id === lesson.id"
             (click)="selectLesson(lesson)">
          <div class="lesson-item-head">
            <i class="ti lesson-cat-icon" [class]="'ti ' + catIcon(lesson.category)"></i>
            <span class="lesson-cat-tag">{{ lesson.category }}</span>
          </div>
          <div class="lesson-item-title">{{ lesson.title }}</div>
        </div>
      </div>

      <!-- Active lesson -->
      <div class="lesson-panel" *ngIf="activeLesson() as lesson; else noLesson">

        <!-- Header -->
        <div class="lesson-header">
          <div class="lesson-header-top">
            <i class="ti" [class]="'ti ' + catIcon(lesson.category)" style="color:#a78bfa;font-size:18px;"></i>
            <span class="lesson-title">{{ lesson.title }}</span>
          </div>
          <p class="lesson-desc">{{ lesson.description }}</p>
        </div>

        <!-- Config suggestion -->
        <div class="config-banner" *ngIf="lesson.recommendedOverlap || lesson.recommendedMode">
          <i class="ti ti-info-circle"></i>
          Recommended for this lesson:
          <ng-container *ngIf="lesson.recommendedOverlap">
            <strong>{{ overlapLabel(lesson.recommendedOverlap) }}</strong>
          </ng-container>
          <ng-container *ngIf="lesson.recommendedMode">
            · <strong>{{ lesson.recommendedMode | titlecase }} mode</strong>
          </ng-container>
        </div>

        <!-- Grid -->
        <app-launchpad-grid
          [grid]="grid()"
          [highlights]="currentHighlights()"
          [sequenceSteps]="currentSequence()"
          [currentStep]="seqStep()"
        />

        <!-- Step card -->
        <div class="step-card" *ngIf="currentStep() as step">
          <div class="step-counter">Step {{ stepIndex() + 1 }} / {{ lesson.steps.length }}</div>
          <div class="step-instruction">{{ step.instruction }}</div>
          <p class="step-subtext" *ngIf="step.subtext">{{ step.subtext }}</p>

          <div class="step-nav">
            <button class="nav-btn" (click)="prevStep()" [disabled]="stepIndex() === 0">← Prev</button>
            <div class="step-progress">
              <div class="step-progress-fill"
                   [style.width]="((stepIndex() + 1) / lesson.steps.length * 100) + '%'">
              </div>
            </div>
            <button class="nav-btn primary" (click)="nextStep()" [disabled]="stepIndex() === lesson.steps.length - 1">Next →</button>
          </div>
        </div>

      </div>

      <ng-template #noLesson>
        <div class="empty-state">
          <i class="ti ti-music"></i>
          Select a lesson from the list to begin
        </div>
      </ng-template>

    </div>
  `,
})
export class LaunchpadLessonComponent implements OnChanges {
  @Input({ required: true }) config!: GridConfig;

  activeLesson = signal<LaunchpadLesson | null>(null);
  stepIndex = signal(0);
  seqStep = signal(0);
  filterCat = signal<LessonCategory>('all');

  private _grid: PadState[][] = [];

  readonly categories: LessonCategory[] = ['all', 'scale', 'chord', 'lick', 'run', 'progression'];

  constructor(private svc: LaunchpadGridService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this._grid = this.svc.computeGrid(this.config);
    }
  }

  grid(): PadState[][] { return this._grid; }

  filteredLessons(): LaunchpadLesson[] {
    const cat = this.filterCat();
    return cat === 'all' ? LAUNCHPAD_LESSONS : LAUNCHPAD_LESSONS.filter(l => l.category === cat);
  }

  setFilter(cat: LessonCategory): void {
    this.filterCat.set(cat);
  }

  selectLesson(lesson: LaunchpadLesson): void {
    this.activeLesson.set(lesson);
    this.stepIndex.set(0);
    this.seqStep.set(0);
  }

  currentStep() {
    const lesson = this.activeLesson();
    if (!lesson) return null;
    return lesson.steps[this.stepIndex()] ?? null;
  }

  currentHighlights(): PadHighlight[] {
    return this.currentStep()?.highlights ?? [];
  }

  currentSequence(): PadHighlight[][] {
    return this.currentStep()?.sequence ?? [];
  }

  prevStep(): void {
    if (this.stepIndex() > 0) {
      this.stepIndex.update(s => s - 1);
      this.seqStep.set(0);
    }
  }

  nextStep(): void {
    const lesson = this.activeLesson();
    if (lesson && this.stepIndex() < lesson.steps.length - 1) {
      this.stepIndex.update(s => s + 1);
      this.seqStep.set(0);
    }
  }

  catIcon(cat: string): string {
    return CATEGORY_ICONS[cat] ?? 'ti-music';
  }

  overlapLabel(overlap: unknown): string {
    if (overlap === 'sequential') return 'Sequential';
    return `${overlap}-Finger`;
  }
}

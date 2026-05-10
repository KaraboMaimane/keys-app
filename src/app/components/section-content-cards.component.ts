import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ScaleQuizComponent } from './scale-quiz.component';
import { CardBlock, Section } from '../data/phases.data';

@Component({
  selector: 'app-section-content-cards',
  standalone: true,
  imports: [CommonModule, ScaleQuizComponent],
  styles: [`
    :host { display: block; }

    .section-content {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      padding-top: var(--space-3);
    }

    .milestone-card {
      border-color: rgba(52,211,153,0.3) !important;
      background: rgba(52,211,153,0.07) !important;
    }

    .milestone-card h3 { color: #6ee7b7; }

    .milestone-card li {
      color: rgba(110,231,183,0.85) !important;
      font-size: 13px;
      margin-bottom: 4px;
    }

    .card-intro {
      font-size: 13px;
      color: var(--text-secondary);
      margin-bottom: 10px;
      line-height: 1.6;
    }

    .drill-timer-hint {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      margin-top: var(--space-3);
      padding: var(--space-2) var(--space-3);
      border-radius: 8px;
      border: 1px solid rgba(139,126,248,0.25);
      background: rgba(139,126,248,0.08);
      color: #c4bbfe;
      font-size: 11px;
    }

    .section-readiness-card {
      margin-top: 16px;
      border-color: rgba(255,255,255,0.08) !important;
      background: rgba(255,255,255,0.03) !important;
    }

    .readiness-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-3);
    }

    .section-readiness-pill {
      font-family: var(--font-display);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-muted);
      padding: 5px 10px;
      border-radius: 999px;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.04);
    }

    .section-readiness-hint {
      font-size: 12px;
      color: var(--text-muted);
      line-height: 1.5;
      margin: 0;
    }

    .section-check-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .section-check-item {
      cursor: default;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
    }

    .section-check-icon {
      background: rgba(52,211,153,0.12);
      border-color: rgba(52,211,153,0.28);
      color: #34d399;
    }

    .section-nav-row {
      display: flex;
      gap: var(--space-3);
      margin-top: var(--space-2);
    }

    .section-nav-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 14px 12px;
      border-radius: 12px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.04em;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.1);
      color: var(--text-secondary);
      transition: all 0.2s;
    }

    .section-nav-btn i { font-size: 16px; }

    .section-nav-btn:hover:not(:disabled) {
      background: rgba(255,255,255,0.09);
      color: var(--text-primary);
    }

    .section-nav-btn:disabled {
      opacity: 0.3;
      cursor: default;
    }

    .section-nav-next {
      background: rgba(139,126,248,0.1);
      border-color: rgba(139,126,248,0.3);
      color: #c4bbfe;
    }

    .section-nav-next:hover:not(:disabled) {
      background: rgba(139,126,248,0.2);
    }
  `],
  template: `
    <main class="section-content" [style.padding-bottom]="paddingBottom">
      <app-scale-quiz *ngIf="showScaleQuiz" style="display:block;margin-bottom:4px"></app-scale-quiz>

      <ng-container *ngFor="let card of section.cards; trackBy: trackByIndex">
        <div *ngIf="card.type === 'studio-milestone'" class="glass-card milestone-card animate-in">
          <h3>{{ card.heading }}</h3>
          <ul><li *ngFor="let item of card.items">{{ item }}</li></ul>
        </div>

        <div *ngIf="card.type === 'text'" class="glass-card animate-in" [class]="cardClass(card)">
          <h3 *ngIf="card.heading">{{ card.heading }}</h3>
          <p *ngIf="card.intro" class="card-intro" [innerHTML]="card.intro"></p>
          <ng-container *ngIf="card.body">
            <p *ngFor="let para of card.body.split('\n\n')" style="margin-bottom:8px" [innerHTML]="para"></p>
          </ng-container>
        </div>

        <div *ngIf="card.type === 'list'" class="glass-card animate-in" [class]="cardClass(card)">
          <h3 *ngIf="card.heading">{{ card.heading }}</h3>
          <p *ngIf="card.intro" class="card-intro">{{ card.intro }}</p>
          <ul><li *ngFor="let item of card.items">{{ item }}</li></ul>
          <p *ngIf="card.body" style="margin-top:8px;font-size:13px;color:var(--text-secondary)">{{ card.body }}</p>
        </div>

        <div *ngIf="card.type === 'tag-list'" class="glass-card animate-in" [class]="cardClass(card)">
          <h3 *ngIf="card.heading">{{ card.heading }}</h3>
          <p *ngIf="card.intro" class="card-intro" [innerHTML]="card.intro"></p>
          <ul style="padding-left:0">
            <li *ngFor="let item of card.items" [innerHTML]="item" style="margin-bottom:6px;list-style:none"></li>
          </ul>
          <p *ngIf="card.body" style="margin-top:8px;font-size:13px;color:var(--text-secondary)" [innerHTML]="card.body"></p>
        </div>

        <div *ngIf="card.type === 'two-col-drill'" class="glass-card animate-in card-drill">
          <h3 *ngIf="card.heading">{{ card.heading }}</h3>
          <p *ngIf="card.intro" class="card-intro">{{ card.intro }}</p>
          <div class="drill-grid">
            <div class="drill-item" *ngFor="let item of $any(card.items)">
              <p>{{ item.title }}</p>
              <span>{{ item.detail }}</span>
            </div>
          </div>
          <div *ngIf="section.sectionType === 'practice'" class="drill-timer-hint">
            <i class="ti ti-clock"></i> Time each level using the practice bar below
          </div>
        </div>

        <div *ngIf="card.type === 'numeral-grid'" class="glass-card animate-in" [class]="cardClass(card)">
          <h3 *ngIf="card.heading">{{ card.heading }}</h3>
          <p *ngIf="card.intro" class="card-intro">{{ card.intro }}</p>
          <div class="numeral-grid">
            <div class="numeral-cell" *ngFor="let n of card.numerals" [style]="n.style">
              <div class="num">{{ n.label }}</div>
              <div class="chord">{{ n.chord }}</div>
            </div>
          </div>
          <p *ngIf="card.body" style="margin-top:10px;font-size:13px;color:var(--text-secondary)">{{ card.body }}</p>
        </div>
      </ng-container>

      <div *ngIf="section.checkList?.length" class="glass-card readiness-card section-readiness-card animate-in">
        <div class="readiness-header">
          <div class="section-title" style="margin-bottom:0">
            <i class="ti ti-flag-3"></i> Move on once you can...
          </div>
          <div class="section-readiness-pill">{{ section.checkList!.length }} checks</div>
        </div>
        <p class="section-readiness-hint">Use this checklist before progressing to the next section.</p>
        <ul class="check-list section-check-list" style="margin-top: 14px;">
          <li *ngFor="let item of section.checkList" class="check-item section-check-item">
            <span class="check-icon section-check-icon"><i class="ti ti-check"></i></span>
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="section-nav-row">
        <button class="section-nav-btn" [disabled]="isAtStart" (click)="previous.emit()">
          <i class="ti ti-chevron-left"></i> Previous
        </button>
        <button class="section-nav-btn section-nav-next" [disabled]="isAtEnd" (click)="next.emit()">
          Next <i class="ti ti-chevron-right"></i>
        </button>
      </div>
    </main>
  `,
})
export class SectionContentCardsComponent {
  @Input({ required: true }) section!: Section;
  @Input() showScaleQuiz = false;
  @Input() paddingBottom = '32px';
  @Input() isAtStart = false;
  @Input() isAtEnd = false;

  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  cardClass(card: CardBlock): string {
    if (card.type === 'two-col-drill') return 'card-drill';
    if (card.heading?.startsWith('⚠️')) return 'card-warning';
    if (card.heading?.startsWith('✓') || card.heading?.toLowerCase().startsWith('pass mark')) return 'card-pass';
    if (card.heading?.toLowerCase().includes('insight') || card.heading?.startsWith('Critical')) return 'card-insight';
    return '';
  }

  trackByIndex(i: number): number {
    return i;
  }
}

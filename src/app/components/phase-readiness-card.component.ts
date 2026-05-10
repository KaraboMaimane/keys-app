import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Phase } from '../data/phases.data';

@Component({
  selector: 'app-phase-readiness-card',
  standalone: true,
  imports: [CommonModule],
  styles: [
    `
      :host { display: block; }

      .readiness-score {
        font-family: var(--font-display);
        font-size: 18px;
        font-weight: 900;
        color: var(--text-muted);
        transition: color 0.3s;
      }

      .score-total {
        font-size: 12px;
        font-weight: 600;
      }

      .score-complete {
        color: #34d399;
        text-shadow: 0 0 16px rgba(52,211,153,0.5);
      }

      .readiness-prog-bar {
        height: 4px;
        border-radius: 99px;
        background: rgba(255,255,255,0.07);
        overflow: hidden;
      }

      .readiness-prog-fill {
        height: 100%;
        border-radius: 99px;
        transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
        box-shadow: 0 0 8px currentColor;
      }

      .readiness-collapse-header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-3);
        background: transparent;
        border: none;
        color: inherit;
        cursor: pointer;
        text-align: left;
        padding: 0;
      }
    `,
  ],
  template: `
    <div *ngIf="phase.checkList" class="glass-card readiness-card" style="margin-top:16px">
      <button class="readiness-collapse-header" type="button" [attr.aria-expanded]="readinessExpanded" (click)="toggleReadiness.emit()">
        <div class="section-title" style="margin-bottom:0">
          <i class="ti ti-checkbox"></i> Readiness check
        </div>
        <div style="display:flex;align-items:center;gap:8px">
          <div class="readiness-score" [class.score-complete]="progress.pct === 100">
            {{ progress.done }}<span class="score-total">/{{ progress.total }}</span>
          </div>
          <i class="ti" [class.ti-chevron-down]="!readinessExpanded" [class.ti-chevron-up]="readinessExpanded"
             style="color:var(--text-muted);font-size:16px"></i>
        </div>
      </button>
      <ng-container *ngIf="readinessExpanded">
        <div class="readiness-prog-bar" style="margin-top:10px">
          <div class="readiness-prog-fill" [style.width]="progress.pct + '%'" [style.background]="phase.accentColor"></div>
        </div>
        <ul class="check-list" style="margin-top: 14px;">
          <li *ngFor="let item of phase.checkList; let i = index"
              class="check-item" [class.item-done]="completedItems.includes(i)"
              (click)="toggleItem.emit(i)">
            <span class="check-icon" [class.icon-done]="completedItems.includes(i)">
              <i class="ti ti-check"></i>
            </span>
            {{ item }}
          </li>
        </ul>
      </ng-container>
    </div>
  `,
})
export class PhaseReadinessCardComponent {
  @Input({ required: true }) phase!: Phase;
  @Input({ required: true }) progress!: { done: number; total: number; pct: number };
  @Input() completedItems: number[] = [];
  @Input() readinessExpanded = false;

  @Output() toggleReadiness = new EventEmitter<void>();
  @Output() toggleItem = new EventEmitter<number>();
}

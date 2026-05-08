import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { PHASES } from './data/phases.data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatTabsModule, MatRippleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
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
export class AppComponent {
  phases = PHASES;
  activeIndex = signal(0);
  activePhase = computed(() => this.phases[this.activeIndex()]);

  setPhase(i: number) {
    this.activeIndex.set(i);
  }

  trackByIndex(i: number) { return i; }
}

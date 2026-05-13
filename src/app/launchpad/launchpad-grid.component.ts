import { Component, Input, computed, signal, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PadState, PadHighlight, PadStatus } from './launchpad.models';

@Component({
  selector: 'app-launchpad-grid',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    :host { display: block; }

    .grid-wrap {
      display: flex;
      flex-direction: column-reverse;
      gap: 4px;
      width: 100%;
      max-width: 520px;
      margin: 0 auto;
    }

    .grid-row {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 4px;
    }

    .pad {
      aspect-ratio: 1;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: default;
      position: relative;
      transition: background 0.15s ease, box-shadow 0.15s ease, transform 0.1s ease;
      border: 1px solid transparent;
      overflow: hidden;
      font-family: 'Outfit', sans-serif;
    }

    .pad:hover { transform: scale(1.08); }

    .pad-note {
      font-size: 9px;
      font-weight: 600;
      line-height: 1;
      color: rgba(255,255,255,0.9);
      letter-spacing: -0.3px;
    }

    .pad-octave {
      font-size: 7px;
      color: rgba(255,255,255,0.5);
      line-height: 1;
    }

    .pad-label {
      position: absolute;
      top: 3px;
      right: 4px;
      font-size: 8px;
      font-weight: 700;
      color: rgba(0,0,0,0.85);
      line-height: 1;
    }

    /* ── Base status styles ── */
    .pad-root {
      background: #7c3aed;
      border-color: rgba(167,139,250,0.5);
      box-shadow: 0 0 10px rgba(139,92,246,0.6), inset 0 1px 0 rgba(255,255,255,0.15);
    }
    .pad-root .pad-note { color: #fff; }

    .pad-in-scale {
      background: rgba(59,130,246,0.5);
      border-color: rgba(96,165,250,0.3);
      box-shadow: 0 0 6px rgba(59,130,246,0.25);
    }
    .pad-in-scale .pad-note { color: rgba(255,255,255,0.9); }

    .pad-out-of-scale {
      background: rgba(255,255,255,0.04);
      border-color: rgba(255,255,255,0.06);
    }
    .pad-out-of-scale .pad-note { color: rgba(255,255,255,0.2); }
    .pad-out-of-scale .pad-octave { display: none; }

    /* ── Highlight overrides ── */
    .pad-chord-root {
      background: #b45309 !important;
      border-color: rgba(251,191,36,0.6) !important;
      box-shadow: 0 0 14px rgba(251,191,36,0.7), inset 0 1px 0 rgba(255,255,255,0.2) !important;
    }
    .pad-chord-root .pad-note { color: #fff !important; }
    .pad-chord-root .pad-label { color: rgba(0,0,0,0.9); }

    .pad-chord-tone {
      background: #065f46 !important;
      border-color: rgba(52,211,153,0.5) !important;
      box-shadow: 0 0 10px rgba(52,211,153,0.4) !important;
    }
    .pad-chord-tone .pad-note { color: #fff !important; }

    .pad-step-active {
      background: #c2410c !important;
      border-color: rgba(249,115,22,0.7) !important;
      box-shadow: 0 0 16px rgba(249,115,22,0.8) !important;
      transform: scale(1.1);
    }
    .pad-step-active .pad-note { color: #fff !important; }

    .pad-step-next {
      background: rgba(249,115,22,0.2) !important;
      border-color: rgba(249,115,22,0.35) !important;
    }
    .pad-step-next .pad-note { color: rgba(255,255,255,0.7) !important; }

    .pad-inactive {
      background: rgba(255,255,255,0.02) !important;
      border-color: rgba(255,255,255,0.04) !important;
    }

    /* Legend */
    .pad-legend {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 10px;
      padding: 8px 12px;
      background: rgba(255,255,255,0.04);
      border-radius: 8px;
      font-family: 'Outfit', sans-serif;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
      color: rgba(255,255,255,0.6);
    }
    .legend-dot {
      width: 10px; height: 10px;
      border-radius: 3px;
      flex-shrink: 0;
    }
  `],
  template: `
    <div class="grid-wrap">
      <div class="grid-row" *ngFor="let row of displayGrid(); trackBy: trackByIndex">
        <div
          class="pad"
          *ngFor="let pad of row; trackBy: trackByIndex"
          [class]="padClass(pad)"
          [title]="pad.noteName + pad.octave + ' (MIDI ' + pad.midiNote + ')'"
        >
          <span class="pad-note">{{ pad.noteName }}</span>
          <span class="pad-octave" *ngIf="pad.isInScale || pad.status === 'root'">{{ pad.octave }}</span>
          <span class="pad-label" *ngIf="labelFor(pad) as lbl">{{ lbl }}</span>
        </div>
      </div>
    </div>

    <div class="pad-legend">
      <div class="legend-item">
        <div class="legend-dot" style="background:#7c3aed;"></div>Root note
      </div>
      <div class="legend-item">
        <div class="legend-dot" style="background:rgba(59,130,246,0.5);"></div>In scale
      </div>
      <div class="legend-item">
        <div class="legend-dot" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1);"></div>Out of scale
      </div>
      <ng-container *ngIf="hasHighlights()">
        <div class="legend-item">
          <div class="legend-dot" style="background:#b45309;"></div>Chord root
        </div>
        <div class="legend-item">
          <div class="legend-dot" style="background:#065f46;"></div>Chord tone
        </div>
      </ng-container>
      <ng-container *ngIf="hasSequence()">
        <div class="legend-item">
          <div class="legend-dot" style="background:#c2410c;"></div>Active
        </div>
        <div class="legend-item">
          <div class="legend-dot" style="background:rgba(249,115,22,0.2);"></div>Next
        </div>
      </ng-container>
    </div>
  `,
})
export class LaunchpadGridComponent implements OnChanges {
  @Input({ required: true }) grid: PadState[][] = [];
  @Input() highlights: PadHighlight[] = [];
  @Input() sequenceSteps: PadHighlight[][] = [];
  @Input() currentStep = -1;

  private highlightMap = new Map<string, PadHighlight>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['highlights'] || changes['sequenceSteps'] || changes['currentStep']) {
      this.buildHighlightMap();
    }
  }

  private buildHighlightMap(): void {
    this.highlightMap.clear();
    // Apply base highlights
    for (const h of this.highlights) {
      this.highlightMap.set(`${h.row},${h.col}`, h);
    }
    // Apply sequence highlights
    if (this.currentStep >= 0 && this.sequenceSteps.length > 0) {
      const active = this.sequenceSteps[this.currentStep] ?? [];
      const next = this.sequenceSteps[this.currentStep + 1] ?? [];
      for (const h of active) {
        this.highlightMap.set(`${h.row},${h.col}`, { ...h, status: 'step-active' });
      }
      for (const h of next) {
        if (!this.highlightMap.has(`${h.row},${h.col}`)) {
          this.highlightMap.set(`${h.row},${h.col}`, { ...h, status: 'step-next' });
        }
      }
    }
  }

  displayGrid(): PadState[][] {
    return this.grid;
  }

  padClass(pad: PadState): string {
    const key = `${pad.row},${pad.col}`;
    const hl = this.highlightMap.get(key);
    const status = hl ? hl.status : pad.status;
    return `pad pad-${status}`;
  }

  labelFor(pad: PadState): string | null {
    const key = `${pad.row},${pad.col}`;
    const hl = this.highlightMap.get(key);
    return hl?.label ?? null;
  }

  hasHighlights(): boolean {
    return this.highlights.length > 0;
  }

  hasSequence(): boolean {
    return this.sequenceSteps.length > 0 && this.currentStep >= 0;
  }

  trackByIndex(index: number): number { return index; }
}

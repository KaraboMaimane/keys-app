import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  GridConfig, OverlapMode, PadMode, ScaleType, RootNote,
  SCALE_LABELS, ROOT_NAMES,
} from './launchpad.models';

const OVERLAPS: { label: string; value: OverlapMode }[] = [
  { label: 'Seq', value: 'sequential' },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
];

const SCALE_GROUPS: { label: string; scales: ScaleType[] }[] = [
  {
    label: 'Western Modes',
    scales: ['major', 'natural-minor', 'dorian', 'phrygian', 'mixolydian',
             'melodic-minor', 'harmonic-minor'],
  },
  {
    label: 'Jazz / Blues',
    scales: ['bebop-dorian', 'blues', 'minor-pentatonic', 'whole-tone'],
  },
  {
    label: 'World / Folk',
    scales: ['hungarian-minor', 'ukrainian-dorian', 'marva', 'todi', 'hirajoshi'],
  },
];

const OCTAVES = [
  { label: 'C1', value: 24 },
  { label: 'C2', value: 36 },
  { label: 'C3', value: 48 },
  { label: 'C4', value: 60 },
  { label: 'C5', value: 72 },
];

@Component({
  selector: 'app-launchpad-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [`
    :host { display: block; }

    .settings-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 12px 20px;
      padding: 14px 16px;
      background: rgba(15,20,30,0.6);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      font-family: 'Outfit', sans-serif;
    }

    .setting-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
      min-width: 0;
    }

    .setting-label {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.4);
    }

    .pill-row {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
    }

    .pill {
      padding: 4px 10px;
      border-radius: 99px;
      font-size: 12px;
      font-weight: 600;
      border: 1px solid rgba(255,255,255,0.12);
      background: rgba(255,255,255,0.06);
      color: rgba(255,255,255,0.6);
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }
    .pill:hover { border-color: rgba(167,139,250,0.4); color: rgba(255,255,255,0.9); }
    .pill.active {
      background: rgba(124,58,237,0.4);
      border-color: rgba(167,139,250,0.7);
      color: #fff;
      box-shadow: 0 0 8px rgba(139,92,246,0.4);
    }

    .mode-toggle {
      display: flex;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 99px;
      overflow: hidden;
    }
    .mode-btn {
      padding: 4px 12px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      color: rgba(255,255,255,0.5);
      border: none;
      background: transparent;
      transition: all 0.15s ease;
    }
    .mode-btn.active {
      background: rgba(124,58,237,0.5);
      color: #fff;
    }

    .root-row {
      display: flex;
      gap: 3px;
    }
    .root-btn {
      min-width: 28px;
      padding: 4px 5px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.04);
      color: rgba(255,255,255,0.5);
      cursor: pointer;
      text-align: center;
      transition: all 0.15s ease;
    }
    .root-btn.active {
      background: rgba(124,58,237,0.5);
      border-color: rgba(167,139,250,0.6);
      color: #fff;
      box-shadow: 0 0 8px rgba(139,92,246,0.35);
    }
    .root-btn.sharp { font-size: 10px; }

    .scale-select {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 8px;
      color: rgba(255,255,255,0.85);
      font-size: 12px;
      font-family: 'Outfit', sans-serif;
      padding: 4px 8px;
      cursor: pointer;
      outline: none;
      min-width: 180px;
    }
    .scale-select:focus { border-color: rgba(167,139,250,0.5); }
    .scale-select option, .scale-select optgroup {
      background: #0f141e;
      color: rgba(255,255,255,0.85);
    }

    .octave-row {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .octave-btn {
      width: 26px; height: 26px;
      border-radius: 6px;
      border: 1px solid rgba(255,255,255,0.12);
      background: rgba(255,255,255,0.06);
      color: rgba(255,255,255,0.7);
      font-size: 16px;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s;
    }
    .octave-btn:hover:not(:disabled) { background: rgba(124,58,237,0.3); }
    .octave-btn:disabled { opacity: 0.3; cursor: default; }
    .octave-val {
      font-size: 12px;
      font-weight: 600;
      color: rgba(255,255,255,0.7);
      min-width: 28px;
      text-align: center;
    }
  `],
  template: `
    <div class="settings-bar">

      <!-- Overlap -->
      <div class="setting-group">
        <span class="setting-label">Overlap</span>
        <div class="pill-row">
          <button
            *ngFor="let o of overlaps"
            class="pill"
            [class.active]="config.overlap === o.value"
            (click)="setOverlap(o.value)"
          >{{ o.label }}</button>
        </div>
      </div>

      <!-- Mode -->
      <div class="setting-group">
        <span class="setting-label">Mode</span>
        <div class="mode-toggle">
          <button class="mode-btn" [class.active]="config.mode === 'chromatic'" (click)="setMode('chromatic')">Chromatic</button>
          <button class="mode-btn" [class.active]="config.mode === 'scale'" (click)="setMode('scale')">Scale</button>
        </div>
      </div>

      <!-- Root note -->
      <div class="setting-group">
        <span class="setting-label">Root</span>
        <div class="root-row">
          <button
            *ngFor="let r of roots; let i = index"
            class="root-btn"
            [class.active]="config.rootNote === i"
            [class.sharp]="r.includes('#')"
            (click)="setRoot(i)"
          >{{ r }}</button>
        </div>
      </div>

      <!-- Scale -->
      <div class="setting-group">
        <span class="setting-label">Scale</span>
        <select
          class="scale-select"
          [ngModel]="config.scale"
          (ngModelChange)="setScale($event)"
        >
          <optgroup *ngFor="let g of scaleGroups" [label]="g.label">
            <option *ngFor="let s of g.scales" [value]="s">{{ scaleLabel(s) }}</option>
          </optgroup>
        </select>
      </div>

      <!-- Start octave -->
      <div class="setting-group">
        <span class="setting-label">Start</span>
        <div class="octave-row">
          <button class="octave-btn" (click)="stepOctave(-1)" [disabled]="octaveIndex() <= 0">−</button>
          <span class="octave-val">{{ currentOctaveLabel() }}</span>
          <button class="octave-btn" (click)="stepOctave(1)" [disabled]="octaveIndex() >= octaves.length - 1">+</button>
        </div>
      </div>

    </div>
  `,
})
export class LaunchpadSettingsComponent {
  @Input({ required: true }) config!: GridConfig;
  @Output() configChange = new EventEmitter<GridConfig>();

  overlaps = OVERLAPS;
  roots = ROOT_NAMES;
  scaleGroups = SCALE_GROUPS;
  octaves = OCTAVES;

  octaveIndex(): number {
    return this.octaves.findIndex(o => o.value === this.config.startNote);
  }

  currentOctaveLabel(): string {
    return this.octaves[this.octaveIndex()]?.label ?? 'C2';
  }

  scaleLabel(s: ScaleType): string {
    return SCALE_LABELS[s];
  }

  setOverlap(v: OverlapMode): void {
    this.emit({ overlap: v });
  }

  setMode(v: PadMode): void {
    this.emit({ mode: v });
  }

  setRoot(i: number): void {
    this.emit({ rootNote: i as RootNote });
  }

  setScale(v: ScaleType): void {
    this.emit({ scale: v });
  }

  stepOctave(dir: -1 | 1): void {
    const idx = this.octaveIndex() + dir;
    if (idx >= 0 && idx < this.octaves.length) {
      this.emit({ startNote: this.octaves[idx].value });
    }
  }

  private emit(partial: Partial<GridConfig>): void {
    this.configChange.emit({ ...this.config, ...partial });
  }
}

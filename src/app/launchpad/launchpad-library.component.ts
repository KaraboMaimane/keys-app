import { Component, Input, OnChanges, SimpleChanges, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchpadGridComponent } from './launchpad-grid.component';
import { LaunchpadGridService } from './launchpad.service';
import {
  GridConfig, PadState, PadHighlight, ChordType, ScaleType,
  CHORD_LABELS, SCALE_LABELS, ROOT_NAMES, SCALE_FORMULA_LABELS,
} from './launchpad.models';

type LibTab = 'scales' | 'chords' | 'progressions';

const CHORD_GROUPS: { label: string; chords: ChordType[] }[] = [
  { label: 'Triads', chords: ['major', 'minor', 'diminished', 'augmented'] },
  { label: '7th Chords', chords: ['major7', 'minor7', 'dominant7', 'diminished7', 'half-dim7', 'aug7'] },
  { label: 'Extended', chords: ['major9', 'minor9', 'dom9', 'add9'] },
  { label: 'Suspended', chords: ['sus2', 'sus4', 'dom7sus4'] },
];

const PROGRESSIONS: { label: string; name: string; chords: { semitones: number; chordType: ChordType; degree: string }[] }[] = [
  {
    label: 'i – ♭VII – ♭VI – ♭VII',
    name: 'Amapiano / Deep House',
    chords: [
      { semitones: 0, chordType: 'minor7', degree: 'i' },
      { semitones: -2, chordType: 'major', degree: '♭VII' },
      { semitones: -4, chordType: 'major', degree: '♭VI' },
      { semitones: -2, chordType: 'major', degree: '♭VII' },
    ],
  },
  {
    label: 'i – iv',
    name: 'Deep House Vamp',
    chords: [
      { semitones: 0, chordType: 'minor7', degree: 'i' },
      { semitones: 5, chordType: 'minor7', degree: 'iv' },
    ],
  },
  {
    label: 'ii° – V7 – i',
    name: 'Jazz Minor Cadence',
    chords: [
      { semitones: 2, chordType: 'half-dim7', degree: 'ii°' },
      { semitones: 7, chordType: 'dominant7', degree: 'V7' },
      { semitones: 0, chordType: 'minor', degree: 'i' },
    ],
  },
  {
    label: 'I – V – vi – IV',
    name: 'Afrohouse / Gospel',
    chords: [
      { semitones: 0, chordType: 'major', degree: 'I' },
      { semitones: 7, chordType: 'major', degree: 'V' },
      { semitones: 9, chordType: 'minor', degree: 'vi' },
      { semitones: 5, chordType: 'major', degree: 'IV' },
    ],
  },
  {
    label: 'I7 – IV7 – V7',
    name: '12-Bar Blues (short)',
    chords: [
      { semitones: 0, chordType: 'dominant7', degree: 'I7' },
      { semitones: 5, chordType: 'dominant7', degree: 'IV7' },
      { semitones: 7, chordType: 'dominant7', degree: 'V7' },
      { semitones: 0, chordType: 'dominant7', degree: 'I7' },
    ],
  },
];

@Component({
  selector: 'app-launchpad-library',
  standalone: true,
  imports: [CommonModule, LaunchpadGridComponent],
  styles: [`
    :host { display: block; }

    .lib-tabs {
      display: flex;
      gap: 4px;
      margin-bottom: 16px;
    }
    .lib-tab {
      padding: 6px 16px;
      border-radius: 99px;
      font-size: 13px;
      font-weight: 600;
      font-family: 'Outfit', sans-serif;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.04);
      color: rgba(255,255,255,0.5);
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .lib-tab.active {
      background: rgba(124,58,237,0.35);
      border-color: rgba(167,139,250,0.5);
      color: #fff;
    }

    .lib-layout {
      display: grid;
      grid-template-columns: 1fr 280px;
      gap: 20px;
      align-items: start;
    }
    @media (max-width: 700px) {
      .lib-layout { grid-template-columns: 1fr; }
    }

    .side-panel {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .info-card {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      padding: 14px;
      font-family: 'Outfit', sans-serif;
    }
    .info-title {
      font-size: 14px;
      font-weight: 700;
      color: rgba(255,255,255,0.9);
      margin-bottom: 6px;
    }
    .info-sub {
      font-size: 12px;
      color: rgba(255,255,255,0.5);
      margin-bottom: 8px;
    }
    .formula {
      font-family: 'Orbitron', monospace;
      font-size: 11px;
      color: #a78bfa;
      letter-spacing: 1px;
      padding: 6px 10px;
      background: rgba(124,58,237,0.1);
      border-radius: 6px;
      margin-bottom: 8px;
    }
    .notes-row {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }
    .note-chip {
      padding: 3px 8px;
      border-radius: 99px;
      font-size: 11px;
      font-weight: 700;
      background: rgba(59,130,246,0.2);
      border: 1px solid rgba(96,165,250,0.3);
      color: #93c5fd;
    }
    .note-chip.root {
      background: rgba(124,58,237,0.3);
      border-color: rgba(167,139,250,0.5);
      color: #c4b5fd;
    }

    .chord-group { margin-bottom: 10px; }
    .chord-group-label {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.8px;
      text-transform: uppercase;
      color: rgba(255,255,255,0.3);
      padding: 0 2px;
      margin-bottom: 5px;
    }
    .chord-pills { display: flex; flex-wrap: wrap; gap: 5px; }
    .chord-pill {
      padding: 5px 10px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      font-family: 'Outfit', sans-serif;
      border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.05);
      color: rgba(255,255,255,0.6);
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .chord-pill:hover { border-color: rgba(52,211,153,0.4); color: rgba(255,255,255,0.9); }
    .chord-pill.active {
      background: rgba(5,95,70,0.4);
      border-color: rgba(52,211,153,0.5);
      color: #6ee7b7;
    }

    .chord-info {
      margin-top: 4px;
      padding: 10px 12px;
      background: rgba(5,95,70,0.1);
      border: 1px solid rgba(52,211,153,0.15);
      border-radius: 10px;
    }
    .chord-info-name { font-size: 14px; font-weight: 700; color: #6ee7b7; margin-bottom: 4px; }
    .chord-info-intervals {
      font-family: 'Orbitron', monospace;
      font-size: 11px;
      color: rgba(255,255,255,0.6);
      letter-spacing: 1px;
    }

    .prog-list { display: flex; flex-direction: column; gap: 6px; }
    .prog-btn {
      display: flex;
      flex-direction: column;
      padding: 10px 12px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.08);
      background: rgba(255,255,255,0.04);
      text-align: left;
      cursor: pointer;
      transition: all 0.15s ease;
      font-family: 'Outfit', sans-serif;
    }
    .prog-btn:hover { border-color: rgba(251,191,36,0.3); background: rgba(251,191,36,0.05); }
    .prog-btn.active {
      border-color: rgba(251,191,36,0.5);
      background: rgba(180,83,9,0.15);
    }
    .prog-label { font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.85); }
    .prog-name { font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 2px; }

    .prog-stepper {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-top: 10px;
      padding: 8px;
      background: rgba(255,255,255,0.04);
      border-radius: 8px;
    }
    .step-btn {
      width: 32px; height: 32px;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.12);
      background: rgba(255,255,255,0.06);
      color: rgba(255,255,255,0.7);
      font-size: 16px;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s;
    }
    .step-btn:hover:not(:disabled) { background: rgba(251,191,36,0.2); }
    .step-btn:disabled { opacity: 0.3; cursor: default; }
    .step-info { font-size: 12px; color: rgba(255,255,255,0.6); font-family: 'Outfit',sans-serif; min-width: 80px; text-align: center; }

    .overlap-tip {
      padding: 10px 12px;
      background: rgba(167,139,250,0.08);
      border: 1px solid rgba(167,139,250,0.15);
      border-radius: 8px;
      font-size: 12px;
      color: rgba(255,255,255,0.6);
      line-height: 1.5;
      font-family: 'Outfit', sans-serif;
    }
    .overlap-tip strong { color: #a78bfa; }
  `],
  template: `
    <div class="lib-tabs">
      <button class="lib-tab" [class.active]="tab() === 'scales'" (click)="setTab('scales')">Scales</button>
      <button class="lib-tab" [class.active]="tab() === 'chords'" (click)="setTab('chords')">Chords</button>
      <button class="lib-tab" [class.active]="tab() === 'progressions'" (click)="setTab('progressions')">Progressions</button>
    </div>

    <!-- SCALES TAB -->
    <div class="lib-layout" *ngIf="tab() === 'scales'">
      <app-launchpad-grid [grid]="grid()" [highlights]="[]" />
      <div class="side-panel">
        <div class="info-card">
          <div class="info-title">{{ scaleName() }}</div>
          <div class="info-sub">Root: {{ rootName() }}</div>
          <div class="formula">{{ formula() }}</div>
          <div class="notes-row">
            <span *ngFor="let n of scaleNotes(); let i = index"
                  class="note-chip" [class.root]="i === 0">{{ n }}</span>
          </div>
        </div>
        <div class="overlap-tip" [innerHTML]="overlapTip()"></div>
      </div>
    </div>

    <!-- CHORDS TAB -->
    <div class="lib-layout" *ngIf="tab() === 'chords'">
      <app-launchpad-grid [grid]="grid()" [highlights]="chordHighlights()" />
      <div class="side-panel">
        <div class="chord-group" *ngFor="let g of chordGroups">
          <div class="chord-group-label">{{ g.label }}</div>
          <div class="chord-pills">
            <button *ngFor="let c of g.chords"
                    class="chord-pill"
                    [class.active]="selectedChord() === c"
                    (click)="selectChord(c)">{{ chordLabel(c) }}</button>
          </div>
        </div>
        <div class="chord-info" *ngIf="selectedChord() as ch">
          <div class="chord-info-name">{{ rootName() }} {{ chordLabel(ch) }}</div>
          <div class="chord-info-intervals">{{ chordIntervalLabel(ch) }}</div>
        </div>
      </div>
    </div>

    <!-- PROGRESSIONS TAB -->
    <div class="lib-layout" *ngIf="tab() === 'progressions'">
      <div>
        <app-launchpad-grid [grid]="grid()" [highlights]="progHighlights()" />
        <div class="prog-stepper" *ngIf="selectedProg() !== null">
          <button class="step-btn" (click)="prevProgStep()" [disabled]="progStep() === 0">‹</button>
          <div class="step-info">
            <div style="font-weight:700;color:rgba(255,255,255,0.85);font-size:13px;">
              {{ currentProgChord() }}
            </div>
            <div>Step {{ progStep() + 1 }} / {{ selectedProgChords().length }}</div>
          </div>
          <button class="step-btn" (click)="nextProgStep()" [disabled]="progStep() >= selectedProgChords().length - 1">›</button>
        </div>
      </div>
      <div class="side-panel">
        <div class="prog-list">
          <button *ngFor="let p of progs; let i = index"
                  class="prog-btn"
                  [class.active]="selectedProg() === i"
                  (click)="selectProg(i)">
            <span class="prog-label">{{ p.label }}</span>
            <span class="prog-name">{{ p.name }}</span>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class LaunchpadLibraryComponent implements OnChanges {
  @Input({ required: true }) config!: GridConfig;

  tab = signal<LibTab>('scales');
  selectedChord = signal<ChordType | null>(null);
  selectedProg = signal<number | null>(null);
  progStep = signal(0);

  private _grid: PadState[][] = [];

  chordGroups = CHORD_GROUPS;
  progs = PROGRESSIONS;

  constructor(private svc: LaunchpadGridService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this._grid = this.svc.computeGrid(this.config);
    }
  }

  grid(): PadState[][] { return this._grid; }

  setTab(t: LibTab): void { this.tab.set(t); }

  scaleName(): string { return SCALE_LABELS[this.config.scale]; }
  rootName(): string { return ROOT_NAMES[this.config.rootNote]; }
  formula(): string { return SCALE_FORMULA_LABELS[this.config.scale]; }

  scaleNotes(): string[] {
    const intervals = this.svc.getScaleIntervals(this.config.scale);
    return intervals.map(i => ROOT_NAMES[(this.config.rootNote + i) % 12]);
  }

  overlapTip(): string {
    const tips: Record<string, string> = {
      sequential: '<strong>Sequential:</strong> No overlapping notes. Every pad is unique — 64 consecutive notes. Great for seeing the full chromatic picture.',
      '2': '<strong>2-Finger:</strong> Moving up one row = 2 semitones. Scale patterns repeat very quickly — rows are closely spaced.',
      '3': '<strong>3-Finger:</strong> Moving up one row = 3 semitones (minor 3rd). Diminished chord shapes sit neatly in single rows.',
      '4': '<strong>4-Finger:</strong> Moving up one row = 4 semitones (major 3rd). Major and minor triads align cleanly across two rows.',
      '5': '<strong>5-Finger:</strong> Moving up one row = 5 semitones (perfect 4th). Mirrors the guitar fretboard — the most "natural" feel for guitarists.',
    };
    return tips[String(this.config.overlap)] ?? '';
  }

  // Chords
  selectChord(c: ChordType): void {
    this.selectedChord.set(c);
  }

  chordLabel(c: ChordType): string { return CHORD_LABELS[c]; }

  chordIntervalLabel(c: ChordType): string {
    const intervals = this.svc.getChordIntervals(c);
    const semitoneNames = ['R', '♭2', '2', '♭3', '3', '4', '♭5', '5', '♭6', '6', '♭7', '7', '8', '♭9', '9'];
    return intervals.map(i => semitoneNames[i] ?? i).join(' – ');
  }

  chordHighlights(): PadHighlight[] {
    const ch = this.selectedChord();
    if (!ch) return [];
    const rootMidi = this.config.startNote + this.config.rootNote;
    return this.svc.findChordShape(rootMidi, ch, this.config);
  }

  // Progressions
  selectProg(i: number): void {
    this.selectedProg.set(i);
    this.progStep.set(0);
  }

  selectedProgChords() {
    const idx = this.selectedProg();
    return idx !== null ? PROGRESSIONS[idx].chords : [];
  }

  currentProgChord(): string {
    const chords = this.selectedProgChords();
    const step = this.progStep();
    if (!chords[step]) return '';
    const { degree, chordType } = chords[step];
    return `${degree} — ${CHORD_LABELS[chordType]}`;
  }

  progHighlights(): PadHighlight[] {
    const idx = this.selectedProg();
    if (idx === null) return [];
    const chord = PROGRESSIONS[idx].chords[this.progStep()];
    if (!chord) return [];
    const rootMidi = this.config.startNote + this.config.rootNote + chord.semitones;
    return this.svc.findChordShape(rootMidi, chord.chordType, this.config);
  }

  prevProgStep(): void {
    if (this.progStep() > 0) this.progStep.update(s => s - 1);
  }

  nextProgStep(): void {
    if (this.progStep() < this.selectedProgChords().length - 1) this.progStep.update(s => s + 1);
  }
}

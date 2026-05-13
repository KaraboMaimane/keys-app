import { Component, Input, OnChanges, SimpleChanges, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchpadGridComponent } from './launchpad-grid.component';
import { LaunchpadGridService } from './launchpad.service';
import {
  GridConfig, PadState, PadHighlight, ChordType, ScaleType,
  CHORD_LABELS, SCALE_LABELS, ROOT_NAMES, SCALE_FORMULA_LABELS,
} from './launchpad.models';

type LibTab = 'scales' | 'chords' | 'progressions' | 'technique';

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

const OVERLAP_CARDS: { key: 'sequential' | 2 | 3 | 4 | 5; badge: string; name: string; interval: string; semitones: number; desc: string }[] = [
  { key: 'sequential', badge: 'SEQ', name: 'Sequential', interval: 'Octave (8 st)', semitones: 8, desc: '64 unique notes — each row is one full octave. Best for a complete pitch reference or chromatic runs.' },
  { key: 2, badge: '×2', name: '2-Finger', interval: 'Major 2nd (2 st)', semitones: 2, desc: 'Rows are very tightly spaced. Arpeggios cover many octaves across rows quickly. Patterns repeat every 6 rows.' },
  { key: 3, badge: '×3', name: '3-Finger', interval: 'Minor 3rd (3 st)', semitones: 3, desc: 'Diminished 7th shapes form perfect squares across rows. Good for chromatic and symmetrical patterns.' },
  { key: 4, badge: '×4', name: '4-Finger', interval: 'Major 3rd (4 st)', semitones: 4, desc: 'Major and minor triads fit cleanly in 2-row spans. Natural 3-finger chord voicings.' },
  { key: 5, badge: '×5', name: '5-Finger', interval: 'Perfect 4th (5 st)', semitones: 5, desc: 'Mirrors guitar string tuning. Most intuitive for players with string instrument background.' },
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

    .hand-split-line {
      font-size: 10px;
      color: rgba(52,211,153,0.75);
      margin-top: 5px;
      font-family: 'Outfit', sans-serif;
      line-height: 1.4;
    }

    .movement-hint {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin-top: 10px;
      padding: 9px 12px;
      background: rgba(14,165,233,0.07);
      border: 1px solid rgba(56,189,248,0.2);
      border-radius: 8px;
      font-size: 12px;
      color: rgba(186,230,253,0.85);
      font-family: 'Outfit', sans-serif;
      line-height: 1.5;
    }
    .movement-hint i { flex-shrink: 0; font-size: 14px; margin-top: 1px; }
    .movement-hint strong { color: rgba(186,230,253,1); }

    .prog-ghost-key {
      margin-top: 12px;
      padding: 10px 12px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 11px;
      color: rgba(255,255,255,0.5);
      font-family: 'Outfit', sans-serif;
    }
    .ghost-key-row { display: flex; align-items: center; gap: 7px; }
    .ghost-dot {
      width: 12px; height: 12px;
      border-radius: 3px;
      flex-shrink: 0;
    }
    .ghost-dot.current { background: #b45309; border: 1px solid rgba(251,191,36,0.5); }
    .ghost-dot.next { background: rgba(14,165,233,0.2); border: 1px solid rgba(56,189,248,0.45); }

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

    /* ── Technique tab ── */
    .iso-banner {
      padding: 14px 16px;
      background: linear-gradient(135deg, rgba(124,58,237,0.15), rgba(167,139,250,0.05));
      border: 1px solid rgba(167,139,250,0.25);
      border-radius: 12px;
      margin-bottom: 20px;
      font-family: 'Outfit', sans-serif;
    }
    .iso-title {
      font-size: 13px;
      font-weight: 700;
      color: #a78bfa;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .iso-text {
      font-size: 13px;
      color: rgba(255,255,255,0.65);
      line-height: 1.6;
    }

    .overlap-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px;
      margin-bottom: 24px;
    }
    @media (max-width: 700px) {
      .overlap-grid { grid-template-columns: repeat(2, 1fr); }
    }
    .ov-card {
      padding: 10px 10px 12px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.07);
      background: rgba(255,255,255,0.03);
      font-family: 'Outfit', sans-serif;
      transition: border-color 0.2s;
    }
    .ov-card.active {
      border-color: rgba(167,139,250,0.45);
      background: rgba(124,58,237,0.1);
    }
    .ov-badge {
      font-family: 'Orbitron', monospace;
      font-size: 10px;
      font-weight: 700;
      color: #a78bfa;
      margin-bottom: 5px;
      letter-spacing: 0.5px;
    }
    .ov-name {
      font-size: 12px;
      font-weight: 700;
      color: rgba(255,255,255,0.85);
      margin-bottom: 3px;
    }
    .ov-interval {
      font-size: 10px;
      color: rgba(255,255,255,0.4);
      margin-bottom: 6px;
    }
    .ov-desc {
      font-size: 11px;
      color: rgba(255,255,255,0.5);
      line-height: 1.5;
    }

    .tech-section {
      margin-bottom: 24px;
    }
    .tech-section-title {
      font-size: 13px;
      font-weight: 700;
      color: rgba(255,255,255,0.85);
      margin-bottom: 4px;
      font-family: 'Outfit', sans-serif;
    }
    .tech-section-sub {
      font-size: 12px;
      color: rgba(255,255,255,0.45);
      margin-bottom: 12px;
      font-family: 'Outfit', sans-serif;
      line-height: 1.5;
    }
    .tech-rule-list {
      display: flex;
      flex-direction: column;
      gap: 7px;
    }
    .tech-rule {
      display: flex;
      align-items: flex-start;
      gap: 9px;
      font-size: 13px;
      color: rgba(255,255,255,0.6);
      font-family: 'Outfit', sans-serif;
      line-height: 1.5;
      padding: 9px 12px;
      border-radius: 8px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
    }
    .tech-rule strong { color: rgba(255,255,255,0.9); }
    .tech-rule::before {
      content: '→';
      color: #a78bfa;
      font-weight: 700;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .finger-legend {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 12px;
    }
    .finger-chip {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 12px;
      color: rgba(255,255,255,0.6);
      font-family: 'Outfit', sans-serif;
    }
    .finger-dot {
      width: 18px;
      height: 18px;
      border-radius: 4px;
      background: rgba(0,0,0,0.45);
      border: 1px solid rgba(255,255,255,0.15);
      font-family: 'Orbitron', monospace;
      font-size: 9px;
      font-weight: 900;
      color: rgba(255,255,255,0.9);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `],
  template: `
    <div class="lib-tabs">
      <button class="lib-tab" [class.active]="tab() === 'scales'" (click)="setTab('scales')">Scales</button>
      <button class="lib-tab" [class.active]="tab() === 'chords'" (click)="setTab('chords')">Chords</button>
      <button class="lib-tab" [class.active]="tab() === 'progressions'" (click)="setTab('progressions')">Progressions</button>
      <button class="lib-tab" [class.active]="tab() === 'technique'" (click)="setTab('technique')">
        <i class="ti ti-hand-finger" style="margin-right:4px;"></i>How to Play
      </button>
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
            <div style="font-weight:700;color:rgba(255,255,255,0.85);font-size:14px;">
              {{ currentProgChord() }}
            </div>
            <div style="font-size:11px;color:rgba(255,255,255,0.45);margin-top:2px;">
              Step {{ progStep() + 1 }} / {{ selectedProgChords().length }}
            </div>
            <div class="hand-split-line" *ngIf="currentHandSplit() as hs">{{ hs }}</div>
          </div>
          <button class="step-btn" (click)="nextProgStep()" [disabled]="progStep() >= selectedProgChords().length - 1">›</button>
        </div>
        <div class="movement-hint" *ngIf="progMovementText() as mv">
          <i class="ti ti-arrows-right-left"></i>
          <span [innerHTML]="mv"></span>
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
        <div class="prog-ghost-key" *ngIf="selectedProg() !== null && progStep() < selectedProgChords().length - 1">
          <div class="ghost-key-row">
            <div class="ghost-dot current"></div><span>Current chord</span>
          </div>
          <div class="ghost-key-row">
            <div class="ghost-dot next"></div><span>Next chord (preview)</span>
          </div>
        </div>
      </div>
    </div>
    <!-- TECHNIQUE TAB -->
    <div *ngIf="tab() === 'technique'">

      <!-- Isomorphic principle -->
      <div class="iso-banner">
        <div class="iso-title"><i class="ti ti-infinity"></i> The Isomorphic Grid</div>
        <div class="iso-text">
          Every adjacent pair of pads has a fixed interval. This means <strong>every chord and scale has exactly one shape per overlap setting</strong> — learn that shape once and it works in every key. To transpose: slide the shape to a different root pad. Nothing else changes.
        </div>
      </div>

      <!-- Overlap reference cards -->
      <div class="tech-section">
        <div class="tech-section-title">What Each Overlap Setting Means</div>
        <div class="tech-section-sub">Moving up one row = the interval shown below. Your current setting is highlighted.</div>
        <div class="overlap-grid">
          <div class="ov-card" *ngFor="let ov of overlapCards" [class.active]="isCurrentOverlap(ov.key)">
            <div class="ov-badge">{{ ov.badge }}</div>
            <div class="ov-name">{{ ov.name }}</div>
            <div class="ov-interval">{{ ov.interval }}</div>
            <div class="ov-desc">{{ ov.desc }}</div>
          </div>
        </div>
      </div>

      <!-- Scale fingering live demo -->
      <div class="tech-section">
        <div class="tech-section-title">Scale Fingering — {{ scaleName() }} / {{ rootName() }}</div>
        <div class="tech-section-sub">
          Numbers show suggested fingers for one ascending octave. Finger count resets at each row — moving to a new row means you shift your whole hand up.
          Row shift with current overlap: <strong>{{ overlapSemitones() }} semitones</strong>.
        </div>
        <div class="finger-legend">
          <div class="finger-chip"><div class="finger-dot">1</div>Thumb</div>
          <div class="finger-chip"><div class="finger-dot">2</div>Index</div>
          <div class="finger-chip"><div class="finger-dot">3</div>Middle</div>
          <div class="finger-chip"><div class="finger-dot">4</div>Ring</div>
          <div class="finger-chip"><div class="finger-dot">5</div>Pinky</div>
        </div>
        <app-launchpad-grid [grid]="grid()" [highlights]="scaleFingering()" />
      </div>

      <!-- Chord voicing rules -->
      <div class="tech-section">
        <div class="tech-section-title">Chord Voicing</div>
        <div class="tech-section-sub">Go to the Chords tab — every highlighted pad now shows a finger number. Rules below explain the physical approach.</div>
        <div class="tech-rule-list">
          <div class="tech-rule">Triads (3 pads): one hand, fingers 1–2–3. Root always on finger 1 (lowest pitch pad).</div>
          <div class="tech-rule">7th chords (4 pads): one hand, fingers 1–2–3–4. Pads may span two rows — flatten your hand slightly to reach both rows.</div>
          <div class="tech-rule">9th / extended chords (5+ pads): split across both hands. Left hand = root + 5th, right hand = 7th + upper extensions.</div>
          <div class="tech-rule">For any chord: <strong>keep the root under thumb (1)</strong>. Stretch or close spacing depends on overlap — try 4-finger or 5-finger overlap for the most compact triad shapes.</div>
        </div>
      </div>

      <!-- Moving shapes -->
      <div class="tech-section">
        <div class="tech-section-title">Transposing a Shape</div>
        <div class="tech-rule-list">
          <div class="tech-rule">To change key: <strong>move the entire shape to a different root pad</strong>. Every finger keeps the same relative position.</div>
          <div class="tech-rule">Horizontal shift = chromatic transposition (1 semitone per pad in chromatic mode, 1 scale step in scale mode).</div>
          <div class="tech-rule">Vertical shift (up one row) = {{ overlapSemitones() }}-semitone jump with current overlap. Use this to play the same chord an interval higher without moving horizontally.</div>
          <div class="tech-rule">Diagonal movement combines both: up-right = up {{ overlapSemitones() }} semitones + 1. Useful for smooth voice leading across a progression.</div>
        </div>
      </div>

      <!-- Scale mode vs chromatic mode -->
      <div class="tech-section">
        <div class="tech-section-title">Scale Mode vs Chromatic Mode</div>
        <div class="tech-rule-list">
          <div class="tech-rule"><strong>Chromatic mode:</strong> every pad is a semitone. Out-of-scale pads (dark) exist. You can reach any note, but must know which to avoid.</div>
          <div class="tech-rule"><strong>Scale mode:</strong> every pad is a scale degree — no wrong notes. Perfect for beginners or improvising. The same fingering principle applies; row shift still equals {{ overlapSemitones() }} semitones but only hits scale steps.</div>
          <div class="tech-rule">Switching modes does not change the overlap finger numbers — the physical hand shapes remain identical in structure.</div>
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
  overlapCards = OVERLAP_CARDS;

  private _scaleFingering: PadHighlight[] = [];

  constructor(private svc: LaunchpadGridService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this._grid = this.svc.computeGrid(this.config);
      this._scaleFingering = this.svc.getScaleFingering(this.config);
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

  isCurrentOverlap(key: 'sequential' | 2 | 3 | 4 | 5): boolean {
    return this.config.overlap === key;
  }

  overlapSemitones(): number {
    if (this.config.overlap === 'sequential') return 8;
    return this.config.overlap as number;
  }

  scaleFingering(): PadHighlight[] { return this._scaleFingering; }

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
    const prog = PROGRESSIONS[idx];
    const step = this.progStep();
    const chord = prog.chords[step];
    if (!chord) return [];

    const result: PadHighlight[] = [];

    // Add next chord first (lower priority — current chord overwrites shared pads)
    if (step < prog.chords.length - 1) {
      const nextChord = prog.chords[step + 1];
      const nextRoot = this.config.startNote + this.config.rootNote + nextChord.semitones;
      const nextHighlights = this.svc.findChordShape(nextRoot, nextChord.chordType, this.config);
      for (const h of nextHighlights) {
        result.push({ ...h, status: h.status === 'chord-root' ? 'next-chord-root' : 'next-chord', finger: undefined, label: undefined });
      }
    }

    // Current chord on top (overwrites any shared pads)
    const rootMidi = this.config.startNote + this.config.rootNote + chord.semitones;
    result.push(...this.svc.findChordShape(rootMidi, chord.chordType, this.config));
    return result;
  }

  currentHandSplit(): string {
    const chords = this.selectedProgChords();
    const ch = chords[this.progStep()];
    if (!ch) return '';
    return this.svc.getHandSplit(ch.chordType);
  }

  progMovementText(): string {
    const idx = this.selectedProg();
    if (idx === null) return '';
    const chords = PROGRESSIONS[idx].chords;
    const step = this.progStep();
    if (step >= chords.length - 1) return '';

    const currentRoot = this.config.rootNote + chords[step].semitones;
    const nextChord = chords[step + 1];
    const nextRoot = this.config.rootNote + nextChord.semitones;
    const diff = nextRoot - currentRoot;
    const absDiff = Math.abs(diff);
    const intervalNames: Record<number, string> = {
      0: 'unison', 1: 'm2', 2: 'M2', 3: 'm3', 4: 'M3',
      5: 'P4', 6: 'tritone', 7: 'P5', 8: 'm6', 9: 'M6', 10: 'm7', 11: 'M7', 12: 'oct',
    };
    const name = intervalNames[absDiff % 12] ?? `${absDiff % 12}st`;
    const nextChordName = `${ROOT_NAMES[(nextRoot + 12) % 12]} ${CHORD_LABELS[nextChord.chordType]}`;

    if (diff === 0) {
      return `Root stays — chord quality changes to <strong>${nextChordName}</strong>. Reshape fingers in place.`;
    }
    const dir = diff > 0 ? 'up' : 'down';
    const semitones = Math.abs(diff);
    return `Next: <strong>${nextChordName}</strong> — root moves <strong>${semitones} semitones ${dir}</strong> (${name}). Slide the shape ${dir} on the grid.`;
  }

  prevProgStep(): void {
    if (this.progStep() > 0) this.progStep.update(s => s - 1);
  }

  nextProgStep(): void {
    if (this.progStep() < this.selectedProgChords().length - 1) this.progStep.update(s => s + 1);
  }
}

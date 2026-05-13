import { Injectable } from '@angular/core';
import {
  GridConfig, PadState, PadStatus, PadHighlight, LessonStep,
  ScaleType, ChordType, OverlapMode, ROOT_NAMES,
} from './launchpad.models';

const SCALE_INTERVALS: Record<ScaleType, number[]> = {
  'natural-minor':    [0, 2, 3, 5, 7, 8, 10],
  'major':            [0, 2, 4, 5, 7, 9, 11],
  'dorian':           [0, 2, 3, 5, 7, 9, 10],
  'phrygian':         [0, 1, 3, 5, 7, 8, 10],
  'mixolydian':       [0, 2, 4, 5, 7, 9, 10],
  'melodic-minor':    [0, 2, 3, 5, 7, 9, 11],
  'harmonic-minor':   [0, 2, 3, 5, 7, 8, 11],
  'bebop-dorian':     [0, 2, 3, 4, 5, 7, 9, 10],
  'blues':            [0, 3, 5, 6, 7, 10],
  'minor-pentatonic': [0, 3, 5, 7, 10],
  'hungarian-minor':  [0, 2, 3, 6, 7, 8, 11],
  'ukrainian-dorian': [0, 2, 3, 6, 7, 9, 10],
  'marva':            [0, 1, 4, 6, 7, 9, 11],
  'todi':             [0, 1, 3, 6, 7, 8, 11],
  'whole-tone':       [0, 2, 4, 6, 8, 10],
  'hirajoshi':        [0, 2, 3, 7, 8],
};

const CHORD_INTERVALS: Record<ChordType, number[]> = {
  'major':        [0, 4, 7],
  'minor':        [0, 3, 7],
  'diminished':   [0, 3, 6],
  'augmented':    [0, 4, 8],
  'major7':       [0, 4, 7, 11],
  'minor7':       [0, 3, 7, 10],
  'dominant7':    [0, 4, 7, 10],
  'diminished7':  [0, 3, 6, 9],
  'half-dim7':    [0, 3, 6, 10],
  'aug7':         [0, 4, 8, 10],
  'major9':       [0, 4, 7, 11, 14],
  'minor9':       [0, 3, 7, 10, 14],
  'dom9':         [0, 4, 7, 10, 14],
  'add9':         [0, 4, 7, 14],
  'sus2':         [0, 2, 7],
  'sus4':         [0, 5, 7],
  'dom7sus4':     [0, 5, 7, 10],
};

const CHORD_TONE_LABELS = ['R', '3', '5', '7', '9', '11'];

@Injectable({ providedIn: 'root' })
export class LaunchpadGridService {

  getMidiNote(row: number, col: number, config: GridConfig): number {
    const { rootNote, scale, overlap, mode, startNote } = config;
    const intervals = SCALE_INTERVALS[scale];
    const len = intervals.length;

    if (mode === 'chromatic') {
      if (overlap === 'sequential') {
        return startNote + row * 8 + col;
      }
      return startNote + row * (overlap as number) + col;
    }

    // Scale mode: each pad step = one scale degree
    let step: number;
    if (overlap === 'sequential') {
      step = row * len + col;
    } else {
      step = row * (overlap as number) + col;
    }
    const degree = ((step % len) + len) % len;
    const octave = Math.floor(step / len);
    return startNote + rootNote + intervals[degree] + octave * 12;
  }

  computeGrid(config: GridConfig): PadState[][] {
    const { rootNote, scale } = config;
    const intervals = SCALE_INTERVALS[scale];
    const grid: PadState[][] = [];

    for (let row = 0; row < 8; row++) {
      const rowPads: PadState[] = [];
      for (let col = 0; col < 8; col++) {
        const midiNote = this.getMidiNote(row, col, config);
        // Normalise to 0–11 relative to root
        const noteInOctave = ((midiNote - rootNote) % 12 + 12) % 12;
        const isRoot = noteInOctave === 0;
        const isInScale = isRoot || intervals.includes(noteInOctave);
        const status: PadStatus = isRoot ? 'root' : isInScale ? 'in-scale' : 'out-of-scale';
        const scaleStep = isInScale ? intervals.indexOf(noteInOctave) : undefined;

        rowPads.push({
          row, col, midiNote,
          noteName: ROOT_NAMES[midiNote % 12],
          octave: Math.floor(midiNote / 12) - 1,
          status, isRoot, isInScale, scaleStep,
        });
      }
      grid.push(rowPads);
    }
    return grid;
  }

  findChordShape(rootMidi: number, chordType: ChordType, config: GridConfig): PadHighlight[] {
    const intervals = CHORD_INTERVALS[chordType];
    const targetMidis = intervals.map(i => rootMidi + i);
    const found: PadHighlight[] = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const midi = this.getMidiNote(row, col, config);
        const idx = targetMidis.indexOf(midi);
        if (idx >= 0) {
          found.push({
            row, col,
            status: idx === 0 ? 'chord-root' : 'chord-tone',
            label: CHORD_TONE_LABELS[idx],
          });
        }
      }
    }
    // Sort lowest → highest pitch, then assign finger numbers (1 = thumb/lowest)
    found.sort((a, b) => this.getMidiNote(a.row, a.col, config) - this.getMidiNote(b.row, b.col, config));
    found.forEach((h, i) => { h.finger = i + 1; });
    return found;
  }

  // Returns in-scale pads for one octave with suggested finger numbers.
  // Fingers reset at each row boundary — moving to a new row = shift the hand.
  getScaleFingering(config: GridConfig): PadHighlight[] {
    const grid = this.computeGrid(config);
    const inScale: Array<{ row: number; col: number; midi: number; isRoot: boolean }> = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const pad = grid[row][col];
        if (pad.isInScale) {
          inScale.push({ row, col, midi: pad.midiNote, isRoot: pad.isRoot });
        }
      }
    }
    inScale.sort((a, b) => a.midi - b.midi);

    const rootMidi = inScale.find(p => p.isRoot)?.midi ?? inScale[0]?.midi ?? 0;
    const oneOctave = inScale.filter(p => p.midi >= rootMidi && p.midi <= rootMidi + 12);

    const result: PadHighlight[] = [];
    let fingerInRow = 0;
    let lastRow = -1;
    for (const p of oneOctave) {
      if (p.row !== lastRow) { fingerInRow = 0; lastRow = p.row; }
      fingerInRow++;
      result.push({
        row: p.row, col: p.col,
        status: p.isRoot ? 'chord-root' : 'chord-tone',
        finger: fingerInRow,
      });
    }
    return result;
  }

  // Returns all root-note pads for a given MIDI root
  findRootPads(rootMidi: number, config: GridConfig): PadHighlight[] {
    const highlights: PadHighlight[] = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const midi = this.getMidiNote(row, col, config);
        if (midi % 12 === rootMidi % 12) {
          highlights.push({ row, col, status: 'chord-root', label: 'R' });
        }
      }
    }
    return highlights;
  }

  // Returns ascending scale run as sequence of single pads (chromatic mode, all in-scale)
  getAscendingRun(config: GridConfig): PadHighlight[][] {
    const grid = this.computeGrid(config);
    const allInScale: PadHighlight[] = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const pad = grid[row][col];
        if (pad.isInScale) {
          allInScale.push({ row, col, status: pad.isRoot ? 'chord-root' : 'chord-tone' });
        }
      }
    }
    // Sort by MIDI note ascending
    allInScale.sort((a, b) => {
      const ma = this.getMidiNote(a.row, a.col, config);
      const mb = this.getMidiNote(b.row, b.col, config);
      return ma - mb;
    });

    return allInScale.map(p => [p]);
  }

  // Returns progression lesson steps — progression is array of semitone offsets from root
  buildProgressionSteps(progression: { label: string; semitones: number; chordType: ChordType }[], rootMidi: number, config: GridConfig): LessonStep[] {
    return progression.map(({ label, semitones, chordType }) => {
      const chordRoot = rootMidi + semitones;
      const highlights = this.findChordShape(chordRoot, chordType, config);
      const handSplit = this.getHandSplit(chordType);
      return {
        instruction: `Play the ${label} chord`,
        subtext: `${ROOT_NAMES[chordRoot % 12]} ${chordType}  ·  ${handSplit}`,
        highlights,
      };
    });
  }

  // Returns a hand-split suggestion for a given chord type.
  // Standard practice: low notes (root/5th) in left hand, upper extensions in right.
  getHandSplit(chordType: ChordType): string {
    const splits: Partial<Record<ChordType, string>> = {
      'major':       'One hand — root(1) · 3rd(2) · 5th(3)',
      'minor':       'One hand — root(1) · 3rd(2) · 5th(3)',
      'diminished':  'One hand — root(1) · m3rd(2) · dim5(3)',
      'augmented':   'One hand — root(1) · M3rd(2) · aug5(3)',
      'major7':      'L: root + 5th  ·  R: 3rd + 7th',
      'minor7':      'L: root + 5th  ·  R: 3rd + 7th',
      'dominant7':   'L: root + 5th  ·  R: 3rd + ♭7th',
      'diminished7': 'L: root + dim5  ·  R: m3rd + dim7th',
      'half-dim7':   'L: root + dim5  ·  R: m3rd + m7th',
      'aug7':        'L: root + aug5  ·  R: M3rd + ♭7th',
      'major9':      'L: root + 5th  ·  R: 3rd + 7th + 9th',
      'minor9':      'L: root + 5th  ·  R: 3rd + 7th + 9th',
      'dom9':        'L: root + 5th  ·  R: 3rd + ♭7th + 9th',
      'add9':        'L: root + 5th  ·  R: 3rd + 9th',
      'sus2':        'One hand — root(1) · 2nd(2) · 5th(3)',
      'sus4':        'One hand — root(1) · 4th(2) · 5th(3)',
      'dom7sus4':    'L: root + 5th  ·  R: 4th + ♭7th',
    };
    return splits[chordType] ?? 'L: root + 5th  ·  R: extensions';
  }

  getScaleIntervals(scale: ScaleType): number[] {
    return SCALE_INTERVALS[scale];
  }

  getChordIntervals(chord: ChordType): number[] {
    return CHORD_INTERVALS[chord];
  }

  // Find the first root pad (lowest MIDI note) for a given root note in the grid
  findFirstRootPad(rootMidi: number, config: GridConfig): { row: number; col: number } | null {
    let best: { row: number; col: number; midi: number } | null = null;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const midi = this.getMidiNote(row, col, config);
        if (midi % 12 === rootMidi % 12) {
          if (!best || midi < best.midi) best = { row, col, midi };
        }
      }
    }
    return best ? { row: best.row, col: best.col } : null;
  }

  defaultConfig(): GridConfig {
    return {
      rootNote: 0,      // C
      scale: 'natural-minor',
      overlap: 5,
      mode: 'chromatic',
      startNote: 36,    // C2
    };
  }
}

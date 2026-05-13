export type OverlapMode = 'sequential' | 2 | 3 | 4 | 5;
export type PadMode = 'chromatic' | 'scale';
export type ScaleType =
  | 'natural-minor' | 'major' | 'dorian' | 'phrygian' | 'mixolydian'
  | 'melodic-minor' | 'harmonic-minor' | 'bebop-dorian' | 'blues'
  | 'minor-pentatonic' | 'hungarian-minor' | 'ukrainian-dorian'
  | 'marva' | 'todi' | 'whole-tone' | 'hirajoshi';

export type RootNote = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type PadStatus =
  | 'root' | 'in-scale' | 'out-of-scale'
  | 'chord-root' | 'chord-tone'
  | 'step-active' | 'step-next' | 'inactive';

export type ChordType =
  | 'major' | 'minor' | 'diminished' | 'augmented'
  | 'major7' | 'minor7' | 'dominant7' | 'diminished7' | 'half-dim7' | 'aug7'
  | 'major9' | 'minor9' | 'dom9' | 'add9'
  | 'sus2' | 'sus4' | 'dom7sus4';

export interface GridConfig {
  rootNote: RootNote;
  scale: ScaleType;
  overlap: OverlapMode;
  mode: PadMode;
  startNote: number;
}

export interface PadState {
  row: number;
  col: number;
  midiNote: number;
  noteName: string;
  octave: number;
  status: PadStatus;
  isRoot: boolean;
  isInScale: boolean;
  scaleStep?: number;
}

export interface PadHighlight {
  row: number;
  col: number;
  status: PadStatus;
  label?: string;
}

export interface LessonStep {
  instruction: string;
  subtext?: string;
  highlights: PadHighlight[];
  sequence?: PadHighlight[][];
}

export interface LaunchpadLesson {
  id: string;
  title: string;
  category: 'scale' | 'chord' | 'lick' | 'run' | 'progression';
  description: string;
  recommendedOverlap?: OverlapMode;
  recommendedMode?: PadMode;
  steps: LessonStep[];
}

export const SCALE_LABELS: Record<ScaleType, string> = {
  'natural-minor': 'Natural Minor',
  'major': 'Major',
  'dorian': 'Dorian',
  'phrygian': 'Phrygian',
  'mixolydian': 'Mixolydian',
  'melodic-minor': 'Melodic Minor (Asc.)',
  'harmonic-minor': 'Harmonic Minor',
  'bebop-dorian': 'BeBop Dorian',
  'blues': 'Blues',
  'minor-pentatonic': 'Minor Pentatonic',
  'hungarian-minor': 'Hungarian Minor',
  'ukrainian-dorian': 'Ukrainian Dorian',
  'marva': 'Marva',
  'todi': 'Todi',
  'whole-tone': 'Whole Tone',
  'hirajoshi': 'Hirajoshi',
};

export const ROOT_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const CHORD_LABELS: Record<ChordType, string> = {
  'major': 'Major Triad',
  'minor': 'Minor Triad',
  'diminished': 'Diminished Triad',
  'augmented': 'Augmented Triad',
  'major7': 'Major 7th',
  'minor7': 'Minor 7th',
  'dominant7': 'Dominant 7th',
  'diminished7': 'Diminished 7th',
  'half-dim7': 'Half-Diminished 7th',
  'aug7': 'Augmented 7th',
  'major9': 'Major 9th',
  'minor9': 'Minor 9th',
  'dom9': 'Dominant 9th',
  'add9': 'Add 9',
  'sus2': 'Sus 2',
  'sus4': 'Sus 4',
  'dom7sus4': 'Dom 7 Sus 4',
};

export const SCALE_FORMULA_LABELS: Record<ScaleType, string> = {
  'natural-minor': 'W–H–W–W–H–W–W',
  'major': 'W–W–H–W–W–W–H',
  'dorian': 'W–H–W–W–W–H–W',
  'phrygian': 'H–W–W–W–H–W–W',
  'mixolydian': 'W–W–H–W–W–H–W',
  'melodic-minor': 'W–H–W–W–W–W–H',
  'harmonic-minor': 'W–H–W–W–H–A–H',
  'bebop-dorian': 'W–H–H–H–W–W–H–W',
  'blues': 'm3–W–H–H–m3–W',
  'minor-pentatonic': 'm3–W–W–m3–W',
  'hungarian-minor': 'W–H–A–H–H–A–H',
  'ukrainian-dorian': 'W–H–A–H–W–H–W',
  'marva': 'H–A–W–H–W–W–H',
  'todi': 'H–W–A–H–H–A–H',
  'whole-tone': 'W–W–W–W–W–W',
  'hirajoshi': 'W–H–P4–H–P4',
};

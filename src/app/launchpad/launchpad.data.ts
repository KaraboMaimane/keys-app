import { LaunchpadLesson, GridConfig } from './launchpad.models';

// All lessons use C as root on startNote=36 (C2) so highlight positions are concrete.
// The lesson component re-computes highlights when user changes config.
// Lessons here use 5-finger chromatic as default (most transferable to hardware).

export const LAUNCHPAD_LESSONS: LaunchpadLesson[] = [

  // ─── SCALES ─────────────────────────────────────────────────────────────────

  {
    id: 'scale-natural-minor-5f',
    title: 'Natural Minor — 5 Finger',
    category: 'scale',
    description: 'Learn the Aeolian (Natural Minor) scale pattern. 5-Finger overlap mirrors the guitar fretboard — the same scale you use daily in amapiano and deep house.',
    recommendedOverlap: 5,
    recommendedMode: 'chromatic',
    steps: [
      {
        instruction: 'Find your root note (C)',
        subtext: 'Purple pads are root notes. The lowest C on the grid is your anchor point. Every pattern starts here.',
        highlights: [{ row: 0, col: 0, status: 'chord-root', label: 'R' }, { row: 1, col: 3, status: 'chord-root', label: 'R' }, { row: 2, col: 6, status: 'chord-root', label: 'R' }],
      },
      {
        instruction: 'Play the first 4 notes: C – D♭ – E♭ – F',
        subtext: 'Bottom row, columns 0→1→3→5. Notice column 2 (D) is OUT of scale — that dark pad is your skip.',
        highlights: [
          { row: 0, col: 0, status: 'chord-root', label: '1' },
          { row: 0, col: 2, status: 'chord-tone', label: '2' },
          { row: 0, col: 3, status: 'chord-tone', label: '♭3' },
          { row: 0, col: 5, status: 'chord-tone', label: '4' },
        ],
      },
      {
        instruction: 'Continue to the 5th, 6th and 7th degrees',
        subtext: 'Move to row 1 for G, A♭, B♭. In 5-finger overlap, row 1 starts 5 semitones above row 0.',
        highlights: [
          { row: 1, col: 2, status: 'chord-tone', label: '5' },
          { row: 1, col: 3, status: 'chord-tone', label: '♭6' },  // wait this isnt right statically
          { row: 1, col: 0, status: 'chord-tone', label: '5' },
        ],
      },
      {
        instruction: 'Reach the octave',
        subtext: 'The octave root lands at row 1 col 3 (same purple color as the root). You\'ve climbed one full octave diagonally.',
        highlights: [{ row: 1, col: 3, status: 'chord-root', label: '8' }],
      },
      {
        instruction: 'Play the full ascending scale',
        subtext: 'Follow the blue pads from bottom-left to top-right. Purple marks octave roots — they\'re your compass points.',
        highlights: [],
      },
      {
        instruction: 'Now descend',
        subtext: 'Same pattern in reverse. Start at the higher root, hit every blue/purple pad down to your anchor C.',
        highlights: [],
      },
    ],
  },

  {
    id: 'scale-major-5f',
    title: 'Major Scale — 5 Finger',
    category: 'scale',
    description: 'The Major scale in 5-finger chromatic mode. Bright, uplifting — forms the basis for all diatonic chord harmony.',
    recommendedOverlap: 5,
    recommendedMode: 'chromatic',
    steps: [
      {
        instruction: 'Identify the major scale pattern',
        subtext: 'Compared to Natural Minor, the major scale has a raised 3rd, 6th, and 7th. The blue pads shift accordingly.',
        highlights: [],
      },
      {
        instruction: 'Play C – D – E (first 3 notes)',
        subtext: 'Bottom row: col 0, col 2, col 4. The whole-step gaps create a wider spacing than minor.',
        highlights: [
          { row: 0, col: 0, status: 'chord-root', label: '1' },
          { row: 0, col: 2, status: 'chord-tone', label: '2' },
          { row: 0, col: 4, status: 'chord-tone', label: '3' },
        ],
      },
      {
        instruction: 'F – G on row 0, A – B on row 1',
        subtext: 'F is at col 5, G at col 7. Then jump to row 1 — A lands at col 4, B at col 6.',
        highlights: [
          { row: 0, col: 5, status: 'chord-tone', label: '4' },
          { row: 0, col: 7, status: 'chord-tone', label: '5' },
          { row: 1, col: 4, status: 'chord-tone', label: '6' },
          { row: 1, col: 6, status: 'chord-tone', label: '7' },
        ],
      },
      {
        instruction: 'Octave C at row 1 col 8 — overflow to next row',
        subtext: 'The octave C wraps to row 2 col 0. This diagonal staircase is the key spatial pattern to memorise.',
        highlights: [{ row: 2, col: 0, status: 'chord-root', label: '8' }],
      },
    ],
  },

  {
    id: 'scale-pentatonic-scale-mode',
    title: 'Minor Pentatonic — Scale Mode',
    category: 'scale',
    description: 'Switch to Scale Mode and the grid locks to only pentatonic notes. Every pad you hit is correct — perfect for building speed and muscle memory.',
    recommendedOverlap: 5,
    recommendedMode: 'scale',
    steps: [
      {
        instruction: 'Switch to Scale Mode',
        subtext: 'In Scale Mode, out-of-key pads go dark. Only the 5 pentatonic degrees remain active. There is no wrong note.',
        highlights: [],
      },
      {
        instruction: 'The pentatonic staircase',
        subtext: 'With 5-finger overlap in Scale Mode: row 0 = degrees 1,2,3,4,5 (cols 0–4). Row 1 starts at degree 6 (same as degree 1 of next octave).',
        highlights: [
          { row: 0, col: 0, status: 'chord-root', label: '1' },
          { row: 0, col: 1, status: 'chord-tone', label: '♭3' },
          { row: 0, col: 2, status: 'chord-tone', label: '4' },
          { row: 0, col: 3, status: 'chord-tone', label: '5' },
          { row: 0, col: 4, status: 'chord-tone', label: '♭7' },
        ],
      },
      {
        instruction: 'Row 1 picks up seamlessly',
        subtext: 'Col 0 on row 1 = next root octave. In 5-finger scale mode, every 5 pads going right = 5 scale steps, wrapping to root.',
        highlights: [
          { row: 1, col: 0, status: 'chord-root', label: '1' },
          { row: 1, col: 1, status: 'chord-tone', label: '♭3' },
          { row: 1, col: 2, status: 'chord-tone', label: '4' },
          { row: 1, col: 3, status: 'chord-tone', label: '5' },
          { row: 1, col: 4, status: 'chord-tone', label: '♭7' },
        ],
      },
      {
        instruction: 'Run it across 4 octaves',
        subtext: 'Every row is the same pattern! This is the power of Scale Mode — the visual layout stays constant, only the pitch changes.',
        highlights: [],
      },
    ],
  },

  {
    id: 'scale-blues-chromatic',
    title: 'Blues Scale — Chromatic Mode',
    category: 'scale',
    description: 'The Blues scale adds a chromatic "blue note" (♭5) to the minor pentatonic. In chromatic mode you can see and use this passing note.',
    recommendedOverlap: 5,
    recommendedMode: 'chromatic',
    steps: [
      {
        instruction: 'Start with the minor pentatonic skeleton',
        subtext: 'Blue pads show your foundation: 1 ♭3 4 5 ♭7. These are identical to the minor pentatonic.',
        highlights: [],
      },
      {
        instruction: 'Find the blue note (♭5 / #4)',
        subtext: 'The ♭5 is ONE semitone above the 4th. It\'s a dark (out-of-scale) pad when you\'re set to Minor Pentatonic. Switch scale to Blues to light it up.',
        highlights: [],
      },
      {
        instruction: 'The blues "bend" feel',
        subtext: 'Play: 1 → ♭3 → 4 → ♭5 → 5. That half-step between ♭5 and 5 creates the blues tension. Hit it quickly as a passing note.',
        highlights: [],
      },
      {
        instruction: 'Classic blues run',
        subtext: 'Descending: 5 → ♭5 → 4 → ♭3 → 1. This is the most common blues/house lick. Practice it until it\'s automatic.',
        highlights: [],
      },
    ],
  },

  {
    id: 'scale-dorian-compare',
    title: 'Dorian Mode — vs Natural Minor',
    category: 'scale',
    description: 'Dorian is Natural Minor with a raised 6th. This one change creates a brighter, more "jazzy" feel — hugely popular in deep house and neo-soul.',
    recommendedOverlap: 5,
    recommendedMode: 'chromatic',
    steps: [
      {
        instruction: 'Natural Minor grid — memorise the blue pads',
        subtext: 'Set scale to Natural Minor. Note where the 6th degree lands on the grid (the ♭6 position).',
        highlights: [],
      },
      {
        instruction: 'Switch to Dorian — spot the difference',
        subtext: 'Change scale to Dorian. One pad shifts: the ♭6 becomes a natural 6. Watch how one blue pad moves one column to the right.',
        highlights: [],
      },
      {
        instruction: 'The Dorian characteristic note',
        subtext: 'The raised 6th is what gives Dorian its warmth. A classic Dorian lick: 1 → 2 → ♭3 → 2 → natural-6 → 5.',
        highlights: [],
      },
    ],
  },

  // ─── CHORDS ─────────────────────────────────────────────────────────────────

  {
    id: 'chord-major-triad',
    title: 'Major Triad Shapes',
    category: 'chord',
    description: 'Find major triads across the grid in every overlap setting. Root + major 3rd + perfect 5th.',
    recommendedOverlap: 5,
    recommendedMode: 'chromatic',
    steps: [
      {
        instruction: 'The major triad: R – 3 – 5 (intervals: 0 – 4 – 7 semitones)',
        subtext: 'On a piano: C – E – G. On the Launchpad, these three notes form a compact triangular cluster.',
        highlights: [],
      },
      {
        instruction: 'In 5-finger chromatic: the triad is a diagonal wedge',
        subtext: 'Root at (row 0, col 0). Major 3rd is 4 semitones right → col 4 on row 0. Perfect 5th is 7 semitones → col 2 on row 1.',
        highlights: [
          { row: 0, col: 0, status: 'chord-root', label: 'R' },
          { row: 0, col: 4, status: 'chord-tone', label: '3' },
          { row: 1, col: 2, status: 'chord-tone', label: '5' },
        ],
      },
      {
        instruction: '1st Inversion: 3 – 5 – R (bass note = 3rd)',
        subtext: 'Start on the major 3rd. The root moves up an octave. Creates a lighter, floating sound.',
        highlights: [
          { row: 0, col: 0, status: 'chord-root', label: '3' },
          { row: 0, col: 3, status: 'chord-tone', label: '5' },
          { row: 1, col: 1, status: 'chord-tone', label: 'R' },
        ],
      },
      {
        instruction: '2nd Inversion: 5 – R – 3 (bass note = 5th)',
        subtext: 'Start on the 5th. Gives a strong, stable cadential sound — common in house chord drops.',
        highlights: [
          { row: 0, col: 0, status: 'chord-root', label: '5' },
          { row: 0, col: 5, status: 'chord-tone', label: 'R' },
          { row: 1, col: 3, status: 'chord-tone', label: '3' },
        ],
      },
      {
        instruction: 'Try the same shape in 4-finger overlap',
        subtext: 'Switch to 4-finger. Row interval changes from 5 to 4 semitones — the 5th now lands on a different column. Feel the visual shift.',
        highlights: [],
      },
    ],
  },

  {
    id: 'chord-minor-triad',
    title: 'Minor Triad Shapes',
    category: 'chord',
    description: 'Minor triads: R + minor 3rd (3 semitones) + perfect 5th (7 semitones). Darker, more emotional — the backbone of amapiano.',
    recommendedOverlap: 5,
    recommendedMode: 'chromatic',
    steps: [
      {
        instruction: 'Minor triad intervals: 0 – 3 – 7 semitones',
        subtext: 'Compared to major, only the 3rd changes: flat by one semitone. The 5th stays the same.',
        highlights: [],
      },
      {
        instruction: 'Shape in 5-finger: root → one col left of major 3rd',
        subtext: 'Root at (row 0, col 0). Minor 3rd = 3 semitones → col 3. Perfect 5th = 7 semitones → col 2 row 1.',
        highlights: [
          { row: 0, col: 0, status: 'chord-root', label: 'R' },
          { row: 0, col: 3, status: 'chord-tone', label: '♭3' },
          { row: 1, col: 2, status: 'chord-tone', label: '5' },
        ],
      },
      {
        instruction: 'Spot the difference from major',
        subtext: 'Major: cols 0, 4, +row. Minor: cols 0, 3, +row. That single column shift is the minor vs major feel difference on the grid.',
        highlights: [],
      },
    ],
  },

  {
    id: 'chord-dom7',
    title: 'Dominant 7th (V7)',
    category: 'chord',
    description: 'The dominant 7th chord creates strong tension and resolution. Essential for ii–V–I jazz moves and house drop builds.',
    recommendedOverlap: 5,
    recommendedMode: 'chromatic',
    steps: [
      {
        instruction: 'Dominant 7th: R – 3 – 5 – ♭7 (0 – 4 – 7 – 10)',
        subtext: 'Major triad plus a minor 7th on top. The ♭7 creates the tension that "wants" to resolve down a 5th.',
        highlights: [],
      },
      {
        instruction: 'The 4-pad shape in 5-finger',
        subtext: 'Root (0,0), Major 3rd (0,4), 5th (1,2), ♭7th (1,5). A diagonal parallelogram across two rows.',
        highlights: [
          { row: 0, col: 0, status: 'chord-root', label: 'R' },
          { row: 0, col: 4, status: 'chord-tone', label: '3' },
          { row: 1, col: 2, status: 'chord-tone', label: '5' },
          { row: 1, col: 5, status: 'chord-tone', label: '♭7' },
        ],
      },
      {
        instruction: 'Voice it without the 5th',
        subtext: 'Remove the 5th — play just R + 3 + ♭7. This is a "shell voicing" — lighter, less muddy on the low end. Common in house production.',
        highlights: [
          { row: 0, col: 0, status: 'chord-root', label: 'R' },
          { row: 0, col: 4, status: 'chord-tone', label: '3' },
          { row: 1, col: 5, status: 'chord-tone', label: '♭7' },
        ],
      },
    ],
  },

  {
    id: 'chord-sus',
    title: 'Sus 2 & Sus 4 Chords',
    category: 'chord',
    description: 'Suspended chords replace the 3rd with a 2nd or 4th — creating an open, floating sound used constantly in deep house and amapiano pads.',
    recommendedOverlap: 5,
    recommendedMode: 'chromatic',
    steps: [
      {
        instruction: 'Sus 4: R – 4 – 5 (replace 3rd with perfect 4th)',
        subtext: 'Intervals: 0 – 5 – 7. Remove the 3rd entirely — no major or minor quality. Pure suspension.',
        highlights: [
          { row: 0, col: 0, status: 'chord-root', label: 'R' },
          { row: 0, col: 5, status: 'chord-tone', label: '4' },
          { row: 1, col: 2, status: 'chord-tone', label: '5' },
        ],
      },
      {
        instruction: 'Sus 2: R – 2 – 5 (replace 3rd with major 2nd)',
        subtext: 'Intervals: 0 – 2 – 7. Even more open than Sus 4. The 2nd sits close to the root creating a wide spread.',
        highlights: [
          { row: 0, col: 0, status: 'chord-root', label: 'R' },
          { row: 0, col: 2, status: 'chord-tone', label: '2' },
          { row: 1, col: 2, status: 'chord-tone', label: '5' },
        ],
      },
      {
        instruction: 'Sus4 → Major resolution',
        subtext: 'Play Sus4, then Major. The 4th resolves down to the 3rd. This is one of the most satisfying movements in house music.',
        highlights: [],
      },
      {
        instruction: 'Dom7Sus4 — the house staple',
        subtext: 'R – 4 – 5 – ♭7 (0–5–7–10). Combines suspension with the dominant 7th tension. Used in virtually every deep house chord progression.',
        highlights: [
          { row: 0, col: 0, status: 'chord-root', label: 'R' },
          { row: 0, col: 5, status: 'chord-tone', label: '4' },
          { row: 1, col: 2, status: 'chord-tone', label: '5' },
          { row: 1, col: 5, status: 'chord-tone', label: '♭7' },
        ],
      },
    ],
  },

  {
    id: 'chord-minor7',
    title: 'Minor 7th Chords',
    category: 'chord',
    description: 'Minor 7th: the most used chord voicing in deep house, neo-soul and amapiano. Smooth, rich and emotional.',
    recommendedOverlap: 5,
    recommendedMode: 'chromatic',
    steps: [
      {
        instruction: 'Minor 7th: R – ♭3 – 5 – ♭7 (0–3–7–10)',
        subtext: 'Minor triad plus a minor 7th. Four notes — all dark and smooth. The Cm7 in deep house is practically a genre requirement.',
        highlights: [
          { row: 0, col: 0, status: 'chord-root', label: 'R' },
          { row: 0, col: 3, status: 'chord-tone', label: '♭3' },
          { row: 1, col: 2, status: 'chord-tone', label: '5' },
          { row: 1, col: 5, status: 'chord-tone', label: '♭7' },
        ],
      },
      {
        instruction: 'Shell voicing: R + ♭3 + ♭7',
        subtext: 'Drop the 5th. The minor 7th shell voicing is clean and won\'t clash with bass lines. Essential in house production.',
        highlights: [
          { row: 0, col: 0, status: 'chord-root', label: 'R' },
          { row: 0, col: 3, status: 'chord-tone', label: '♭3' },
          { row: 1, col: 5, status: 'chord-tone', label: '♭7' },
        ],
      },
    ],
  },

  {
    id: 'chord-half-dim',
    title: 'Half-Diminished (m7♭5)',
    category: 'chord',
    description: 'The half-diminished chord: R – ♭3 – ♭5 – ♭7. Acts as the ii chord in minor key progressions. Sophisticated and slightly tense.',
    recommendedOverlap: 5,
    recommendedMode: 'chromatic',
    steps: [
      {
        instruction: 'Half-dim: 0 – 3 – 6 – 10 semitones',
        subtext: 'Diminished triad (0–3–6) plus a minor 7th. The ♭5 is what makes it "diminished" — darker than a minor 7th.',
        highlights: [
          { row: 0, col: 0, status: 'chord-root', label: 'R' },
          { row: 0, col: 3, status: 'chord-tone', label: '♭3' },
          { row: 0, col: 6, status: 'chord-tone', label: '♭5' },
          { row: 1, col: 5, status: 'chord-tone', label: '♭7' },
        ],
      },
      {
        instruction: 'Its role: the ii chord in minor',
        subtext: 'In C minor: the ii chord is D half-dim (D–F–A♭–C). Leads naturally into G7 (V), then Cm (i). The jazz ii–V–i.',
        highlights: [],
      },
    ],
  },

  {
    id: 'chord-major9',
    title: 'Major 9th & Minor 9th',
    category: 'chord',
    description: 'Extended chords add richness — 5 notes across 2+ octaves. Beautiful as stabs or pads in house and amapiano.',
    recommendedOverlap: 5,
    recommendedMode: 'chromatic',
    steps: [
      {
        instruction: 'Major 9th: R–3–5–7–9 (0–4–7–11–14)',
        subtext: 'Major 7th plus the major 9th (same as the 2nd but up an octave). Lush, sophisticated — a staple in gospel-influenced house.',
        highlights: [],
      },
      {
        instruction: 'The 9th lands 2 semitones above the octave root',
        subtext: 'In 5-finger chromatic, octave root is at (row 1, col 3). The major 9th is 2 columns further right at (row 1, col 5) or (row 2, col 0).',
        highlights: [],
      },
      {
        instruction: 'Minor 9th: R–♭3–5–♭7–9 (0–3–7–10–14)',
        subtext: 'Minor 7th plus the 9th. Deeply emotional — a signature chord in deep house and late-night amapiano.',
        highlights: [],
      },
      {
        instruction: 'Try add9 for a simpler version',
        subtext: 'Add9 skips the 7th: R–3–5–9 (0–4–7–14). Less complex, more "pop" but still rich. Common in afrohouse.',
        highlights: [],
      },
    ],
  },

  // ─── LICKS ──────────────────────────────────────────────────────────────────

  {
    id: 'lick-pentatonic-house',
    title: 'Minor Pentatonic House Lick',
    category: 'lick',
    description: 'A classic 4-note pentatonic motif that appears in countless deep house and amapiano tracks. Learn the pattern then transpose it.',
    recommendedOverlap: 5,
    recommendedMode: 'chromatic',
    steps: [
      {
        instruction: 'The lick: 5 → ♭7 → 1(oct) → ♭7 → 5',
        subtext: 'Five notes, starting on the 5th scale degree. The ♭7 – root – ♭7 bounce is the signature "house" feel.',
        highlights: [],
      },
      {
        instruction: 'Find position: 5th degree in C minor = G',
        subtext: 'On the grid (5-finger, C minor): G is at row 1 col 2. Start here.',
        highlights: [{ row: 1, col: 2, status: 'chord-root', label: 'G' }],
      },
      {
        instruction: 'Step 1: G (5th) → B♭ (♭7)',
        subtext: 'From G (row 1 col 2), move right 3 columns to B♭ (row 1 col 5). 3 semitones right.',
        highlights: [
          { row: 1, col: 2, status: 'step-active', label: '1' },
          { row: 1, col: 5, status: 'step-next', label: '2' },
        ],
      },
      {
        instruction: 'Step 2: B♭ (♭7) → C (octave root)',
        subtext: 'From B♭ (row 1 col 5), move 2 semitones right. Wraps to row 2 col 0 — the octave C.',
        highlights: [
          { row: 1, col: 5, status: 'step-active', label: '2' },
          { row: 2, col: 0, status: 'step-next', label: '3' },
        ],
      },
      {
        instruction: 'Step 3: C (oct) → B♭ → G — resolve',
        subtext: 'Come back down: C → B♭ → G. End on G (the 5th) for an unresolved loop, or land on C for resolution.',
        highlights: [
          { row: 2, col: 0, status: 'step-active', label: '3' },
          { row: 1, col: 5, status: 'step-next', label: '4' },
          { row: 1, col: 2, status: 'step-next', label: '5' },
        ],
      },
      {
        instruction: 'Loop it — then transpose',
        subtext: 'Repeat the pattern until it\'s fluid. Then change root note to A minor or F minor and see the same physical pattern work in a new key.',
        highlights: [],
      },
    ],
  },

  {
    id: 'lick-blues-approach',
    title: 'Blues Chromatic Approach Lick',
    category: 'lick',
    description: 'Use the ♭5 "blue note" as a chromatic approach to the 5th — the signature blues tension-release. In chromatic mode you can access this out-of-scale passing note.',
    recommendedOverlap: 5,
    recommendedMode: 'chromatic',
    steps: [
      {
        instruction: 'The target: 4 → ♭5 → 5 (three adjacent semitones)',
        subtext: 'These three pads are consecutive columns in chromatic mode. The ♭5 is a dark (dim) pad — a passing note between two in-scale pads.',
        highlights: [],
      },
      {
        instruction: 'Full lick: 1 → ♭3 → 4 → ♭5 → 5',
        subtext: 'Start on root, climb to the 4th, then do the chromatic approach: ♭5 → 5. Accent the arrival on 5.',
        highlights: [],
      },
      {
        instruction: 'Descending version: 5 → ♭5 → 4 → ♭3 → 1',
        subtext: 'More common in blues. The ♭5 between the 4th and 5th sounds especially tense going down.',
        highlights: [],
      },
    ],
  },

  {
    id: 'lick-dorian-house',
    title: 'Dorian House Motif',
    category: 'lick',
    description: 'A call-and-response motif using Dorian mode. The raised 6th gives it the jazzy warmth common in deep house and afrohouse melodies.',
    recommendedOverlap: 5,
    recommendedMode: 'chromatic',
    steps: [
      {
        instruction: 'Set scale to Dorian',
        subtext: 'The raised 6th (natural 6) is what gives Dorian its character vs Natural Minor.',
        highlights: [],
      },
      {
        instruction: 'Call phrase: 1 → 2 → ♭3 → 2 → natural-6',
        subtext: 'Move up the scale to ♭3, come back to 2, then jump up to the characteristic natural 6th. Leaves a question hanging.',
        highlights: [],
      },
      {
        instruction: 'Response phrase: 5 → 4 → ♭3 → 2 → 1',
        subtext: 'Descend from the 5th back to root. Together the call and response form a complete melodic phrase.',
        highlights: [],
      },
    ],
  },

  // ─── RUNS ───────────────────────────────────────────────────────────────────

  {
    id: 'run-major-ascending',
    title: 'Full Major Scale Run',
    category: 'run',
    description: 'Play the major scale across the entire grid — 3+ octaves. Builds muscle memory for the spatial layout in 5-finger mode.',
    recommendedOverlap: 5,
    recommendedMode: 'chromatic',
    steps: [
      {
        instruction: 'The run spans from C2 (bottom-left) to the top of the grid',
        subtext: 'In 5-finger chromatic, scale notes zigzag diagonally upward. Follow every blue and purple pad from bottom to top.',
        highlights: [],
      },
      {
        instruction: 'Identify the "break points" — where octaves reset',
        subtext: 'Every time you hit a purple pad, you\'ve crossed an octave. Use these as landmarks to stay oriented.',
        highlights: [],
      },
      {
        instruction: 'Slow run — one note per beat',
        subtext: 'With the metronome at 60 BPM, play one note per beat. Count: 1–2–3–4–5–6–7–8 as you ascend.',
        highlights: [],
      },
      {
        instruction: 'Fast run — 16th notes at 80 BPM',
        subtext: 'Four notes per beat. The key challenge: tracking which pad row you\'re on while maintaining speed.',
        highlights: [],
      },
    ],
  },

  {
    id: 'run-pentatonic-3-octave',
    title: 'Pentatonic 3-Octave Run',
    category: 'run',
    description: 'The minor pentatonic run is the easiest to master — only 5 notes per octave means less column skipping. Ideal for building speed.',
    recommendedOverlap: 5,
    recommendedMode: 'scale',
    steps: [
      {
        instruction: 'In Scale Mode with Minor Pentatonic: every pad is active',
        subtext: 'No dark pads to skip. Row 0 col 0 → row 7 col 4 traces 3+ octaves of pure pentatonic. Every pad you hit is in key.',
        highlights: [],
      },
      {
        instruction: 'The 5-finger pentatonic pattern per row: 5 active pads then overlap',
        subtext: 'In 5-finger scale mode, each row plays exactly 5 pentatonic steps before the row above continues. No gaps.',
        highlights: [],
      },
      {
        instruction: 'Play rows 0–2 ascending',
        subtext: 'That\'s 15 pads = 3 full pentatonic octaves. Listen to how it spirals upward.',
        highlights: [],
      },
      {
        instruction: 'Reverse: descend rows 2→0',
        subtext: 'Same path backwards. The descent sounds very different — more "question" energy vs "statement" energy going up.',
        highlights: [],
      },
    ],
  },

  // ─── PROGRESSIONS ────────────────────────────────────────────────────────────

  {
    id: 'prog-i-VII-VI-VII',
    title: 'i – ♭VII – ♭VI – ♭VII (Amapiano Foundation)',
    category: 'progression',
    description: 'The most common chord movement in amapiano and deep house. Natural minor chords cycling around the i chord. Hypnotic and loopable.',
    recommendedOverlap: 5,
    recommendedMode: 'chromatic',
    steps: [
      {
        instruction: 'Chord 1: i — Cm (C minor triad)',
        subtext: 'Root position: R–♭3–5. This is home base. Play it and let it ring — feel the stability.',
        highlights: [
          { row: 0, col: 0, status: 'chord-root', label: 'i' },
          { row: 0, col: 3, status: 'chord-tone', label: '♭3' },
          { row: 1, col: 2, status: 'chord-tone', label: '5' },
        ],
      },
      {
        instruction: 'Chord 2: ♭VII — B♭ major (2 semitones below root)',
        subtext: 'Move your root down 2 semitones to B♭. Same major triad shape, just shifted left. Creates motion away from home.',
        highlights: [
          { row: 0, col: 0, status: 'chord-root', label: '♭VII' },
        ],
      },
      {
        instruction: 'Chord 3: ♭VI — A♭ major (4 semitones below root)',
        subtext: 'Move to A♭. Further from home — maximum tension in this loop. The lowest of the three chords.',
        highlights: [],
      },
      {
        instruction: 'Chord 4: ♭VII — B♭ major (return path)',
        subtext: 'Back to B♭ as a "turnaround." This creates the hypnotic loop: i → ♭VII → ♭VI → ♭VII → i.',
        highlights: [],
      },
      {
        instruction: 'Play the full loop',
        subtext: 'Cm → B♭ → A♭ → B♭ → Cm. Keep it simple — one chord per bar at 120 BPM. This is 90% of what you hear in amapiano.',
        highlights: [],
      },
    ],
  },

  {
    id: 'prog-i-iv',
    title: 'i – iv (Deep House Vamp)',
    category: 'progression',
    description: 'The deep house 2-chord loop. Minimal, hypnotic, effective. Minor tonic to subdominant and back.',
    recommendedOverlap: 5,
    recommendedMode: 'chromatic',
    steps: [
      {
        instruction: 'Chord 1: i — Cm7 (minor 7th for richness)',
        subtext: 'Add the ♭7 to make it Cm7. The 7th adds harmonic richness without changing the basic feel.',
        highlights: [],
      },
      {
        instruction: 'Chord 2: iv — Fm7 (5 semitones up from root)',
        subtext: 'Move to the 4th minor — Fm7 in C minor. Just shift your Cm7 shape 5 semitones higher on the grid.',
        highlights: [],
      },
      {
        instruction: 'The deep house vamp rhythm',
        subtext: 'Play Cm7 for 2 bars, Fm7 for 2 bars. Add syncopation: land on the "and" of beats, not the downbeat. That off-beat feel IS deep house.',
        highlights: [],
      },
    ],
  },

  {
    id: 'prog-ii-V-i',
    title: 'ii° – V7 – i (Jazz Resolution)',
    category: 'progression',
    description: 'The foundational jazz cadence. Half-diminished ii leads to dominant V, resolving to minor i. Adds sophistication to house progressions.',
    recommendedOverlap: 5,
    recommendedMode: 'chromatic',
    steps: [
      {
        instruction: 'ii° chord: D half-diminished (in C minor)',
        subtext: 'D – F – A♭ – C. Half-dim is tense — it "wants" to move somewhere. Let it hang for one beat.',
        highlights: [],
      },
      {
        instruction: 'V7 chord: G dominant 7th',
        subtext: 'G – B – D – F. Maximum tension. The tritone between B and F creates strong pull toward resolution.',
        highlights: [],
      },
      {
        instruction: 'i chord: Cm (resolution)',
        subtext: 'C – E♭ – G. Resolution! The release of tension on the downbeat is what gives jazz its satisfying push-pull.',
        highlights: [],
      },
      {
        instruction: 'Speed it up: ii–V as a "turnaround"',
        subtext: 'Play ii and V each for half a bar, then land on i for a full bar. This 2-beat turnaround speeds up the harmonic rhythm.',
        highlights: [],
      },
    ],
  },

  {
    id: 'prog-I-V-vi-IV',
    title: 'I – V – vi – IV (Afrohouse Anthem)',
    category: 'progression',
    description: 'The most popular chord progression in popular music — adapted for major key afrohouse and amapiano gospel crossover.',
    recommendedOverlap: 5,
    recommendedMode: 'chromatic',
    steps: [
      {
        instruction: 'Chord 1: I — C major (bright tonic)',
        subtext: 'Set your scale to Major for this one. C – E – G. Home base, bright and uplifting.',
        highlights: [],
      },
      {
        instruction: 'Chord 2: V — G major (5 semitones + octave up)',
        subtext: 'G – B – D. Moves away from home. In 5-finger: same triad shape shifted right 7 semitones.',
        highlights: [],
      },
      {
        instruction: 'Chord 3: vi — A minor (relative minor)',
        subtext: 'A – C – E. The minor 6th gives emotional depth mid-progression. Creates that "lift then drop" feeling.',
        highlights: [],
      },
      {
        instruction: 'Chord 4: IV — F major (subdominant)',
        subtext: 'F – A – C. Leads naturally back to I. The 4 chord is the "journey" chord — always moving forward.',
        highlights: [],
      },
      {
        instruction: 'Loop the full progression at 120 BPM',
        subtext: 'C → G → Am → F → C. One chord per bar in 4/4. Add 7ths (Cmaj7, G7, Am7, Fmaj7) for a fuller sound.',
        highlights: [],
      },
    ],
  },

  {
    id: 'prog-12-bar-blues',
    title: '12-Bar Blues Structure',
    category: 'progression',
    description: 'The foundation of blues, soul, funk, and house. 12 bars cycling through I7 – IV7 – V7. Every chord is a dominant 7th.',
    recommendedOverlap: 5,
    recommendedMode: 'chromatic',
    steps: [
      {
        instruction: 'The 12-bar structure: I(4) – IV(2) – I(2) – V(1) – IV(1) – I(2)',
        subtext: 'Numbers in brackets = bars. I7 gets the most time (home). The cycle creates a complete musical sentence every 12 bars.',
        highlights: [],
      },
      {
        instruction: 'Bars 1–4: I7 (C dominant 7)',
        subtext: 'C – E – G – B♭. Stay here for 4 bars. Get comfortable with the shape before moving.',
        highlights: [],
      },
      {
        instruction: 'Bars 5–6: IV7 (F dominant 7)',
        subtext: 'F – A – C – E♭. Shift to the 4th for 2 bars. This is the first movement — feel the energy lift.',
        highlights: [],
      },
      {
        instruction: 'Bar 7–8: back to I7',
        subtext: 'Return home briefly. The repeated visit to I is what gives blues its stable centre.',
        highlights: [],
      },
      {
        instruction: 'Bar 9: V7 (G dominant 7) — the turnaround',
        subtext: 'G – B – D – F. Maximum tension. Bar 9 of the blues is always the moment of highest energy.',
        highlights: [],
      },
      {
        instruction: 'Bar 10: IV7, Bars 11–12: I7 — home',
        subtext: 'Wind down through IV back to I. Bar 12 can add a "turnaround" V7 to start the cycle again.',
        highlights: [],
      },
    ],
  },

];

export const DEFAULT_GRID_CONFIG: GridConfig = {
  rootNote: 0,
  scale: 'natural-minor',
  overlap: 5,
  mode: 'chromatic',
  startNote: 36,
};

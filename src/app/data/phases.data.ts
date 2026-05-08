export interface DrillItem { title: string; detail: string; }
export interface CardBlock {
  type: 'text' | 'list' | 'drill-grid' | 'numeral-grid' | 'tag-list' | 'two-col-drill' | 'studio-milestone' | 'transitions';
  heading?: string;
  intro?: string;
  body?: string;
  items?: (string | DrillItem)[];
  numerals?: { label: string; chord: string; style: string }[];
}
export interface Section {
  icon: string;
  title: string;
  cards: CardBlock[];
  checkList?: string[];
  actionButton?: { label: string; prompt: string };
}
export interface Phase {
  id: number;
  label: string;
  title: string;
  description: string;
  timeline: string;
  badgeStyle: string;
  accentColor: string;
  sections: Section[];
  checkList?: string[];
}

export const PHASES: Phase[] = [
  // ─── PHASE 1 ──────────────────────────────────────────────────────────────
  {
    id: 1,
    label: 'Phase 1',
    title: 'Foundation — C major, basic chords & hand position',
    description: 'Before anything musical happens, your hands need to know the keyboard. C major is the ideal starting key — no black keys, clean shapes, and every chord theory concept maps directly onto it.',
    timeline: '~6–8 weeks (3–4 sessions/week, 30–45 min)',
    badgeStyle: 'background:rgba(139,126,248,0.2);color:#c4bbfe;border:1px solid rgba(139,126,248,0.3)',
    accentColor: '#8b7ef8',
    sections: [
      {
        icon: 'ti-adjustments',
        title: 'Why C major (not Am)',
        cards: [
          {
            type: 'text',
            body: 'C major and A minor share the same notes — they are relative keys. Starting in C major gives you a visual anchor: the white keys only. A minor is equally valid but emotionally darker. For deep house and amapiano, you\'ll use both constantly — so learn C major first as your theory home, then treat Am as a free bonus later.'
          }
        ]
      },
      {
        icon: 'ti-target',
        title: 'Your studio-ready path',
        cards: [
          {
            type: 'two-col-drill',
            heading: 'How long to the studio?',
            intro: 'At 3–4 sessions/week, 30–45 minutes each, here is an honest timeline:',
            items: [
              { title: 'Phase 1 — Foundation', detail: '~6–8 weeks' },
              { title: 'Phase 2 — Technique + bass', detail: '~6–8 weeks' },
              { title: 'Phase 3 — Progressions', detail: '~4–6 weeks' },
              { title: '🎯 Studio basics ready', detail: '~4–5 months total' },
              { title: 'Phase 4 — Genre fluency', detail: '~8–12 weeks' },
              { title: '🎹 Studio confident', detail: '~6–8 months total' },
            ]
          },
          {
            type: 'list',
            heading: 'What "studio basics" looks like at Phase 3',
            items: [
              'You can play 8 chord progressions in C major and A minor with 7th chord voicings',
              'You can lay down a root bassline and simple walking bass over any progression',
              'You can improvise a short melodic phrase using C major pentatonic and A blues scale',
              'You understand the number system well enough to follow a producer\'s direction ("give me a ii–V–I here")',
              'You can translate what you hear in your head to the keys — slowly, but reliably',
            ]
          }
        ]
      },
      {
        icon: 'ti-music',
        title: 'Week 1 — notes, scale & hand position',
        cards: [
          {
            type: 'list',
            heading: 'What to learn',
            items: [
              'Name every white key by sight: C D E F G A B (and back)',
              'Learn the C major scale with right hand, then left hand, then both in parallel (fingering: 1 2 3 | 1 2 3 4 5 — thumb crosses under after E)',
              'Curved fingers, relaxed wrists — no flat fingers, no tension',
              'Play the scale ascending and descending at 60 BPM with a metronome',
            ]
          },
          {
            type: 'two-col-drill',
            heading: 'Daily drill (20 min)',
            items: [
              { title: 'Scale loop', detail: 'Up + down, 4x each hand, 60 BPM' },
              { title: 'Note naming', detail: 'Say each note name aloud as you play' },
              { title: 'Slow practice', detail: '40 BPM — feel each finger land cleanly' },
              { title: 'Listening', detail: 'Sing or hum each note as you play' },
            ]
          }
        ]
      },
      {
        icon: 'ti-music',
        title: 'Week 2 — triads in root position',
        cards: [
          {
            type: 'tag-list',
            heading: 'The 7 diatonic triads of C major',
            items: [
              '<span class="tag tag-purple">C maj</span> C–E–G',
              '<span class="tag tag-teal">D min</span> D–F–A',
              '<span class="tag tag-teal">E min</span> E–G–B',
              '<span class="tag tag-purple">F maj</span> F–A–C',
              '<span class="tag tag-purple">G maj</span> G–B–D',
              '<span class="tag tag-teal">A min</span> A–C–E',
              '<span class="tag tag-amber">B dim</span> B–D–F (avoid for now)',
            ]
          },
          {
            type: 'list',
            heading: 'Daily drill',
            items: [
              'Play each triad with right hand only, 4 beats each, slowly',
              'Name the chord aloud as you play: "C major", "D minor"…',
              'Play them in order C→D→E→F→G→A and back',
              'Add left hand: play just the root note (C, D, E…) in bass',
            ]
          }
        ]
      },
      {
        icon: 'ti-music',
        title: 'Week 3 — inversions',
        cards: [
          {
            type: 'tag-list',
            heading: 'What are inversions?',
            intro: 'Every triad has 3 positions. For C major (C–E–G):',
            items: [
              '<span class="tag tag-purple">Root</span> C–E–G (C on bottom)',
              '<span class="tag tag-teal">1st inversion</span> E–G–C (E on bottom)',
              '<span class="tag tag-coral">2nd inversion</span> G–C–E (G on bottom)',
            ],
            body: 'Inversions let you move between chords with minimal hand movement — essential for smooth amapiano-style chord progressions.'
          },
          {
            type: 'list',
            heading: 'Daily drill',
            items: [
              'Take each of the 7 triads and play all 3 inversions in a row',
              'Stay on C major for day 1, add one new chord per day',
              'Practice "voice leading": C major root → F major 2nd inversion → G major 1st inversion (move as little as possible)',
            ]
          }
        ]
      },
      {
        icon: 'ti-git-merge',
        title: 'Voice leading — moving chords smoothly',
        cards: [
          {
            type: 'text',
            heading: 'What is voice leading?',
            body: 'Voice leading is the art of moving from one chord to the next with as little motion as possible. Each "voice" (individual note in the chord) moves by the smallest interval available. This is what separates professional-sounding chord progressions from clunky, amateur ones — and it is the secret behind that buttery Rhodes feel in deep house and neo-soul.'
          },
          {
            type: 'tag-list',
            heading: 'The 4 rules',
            items: [
              '<span class="tag tag-purple">Common tones stay put</span> If a note appears in both chords, hold it in the same finger — don\'t move it.',
              '<span class="tag tag-teal">Move by step</span> Other voices should move by 1–2 semitones (a step) where possible. Avoid large jumps in inner voices.',
              '<span class="tag tag-blue">Bass can jump</span> The bass note (left hand) is allowed to leap a 4th or 5th — that\'s normal and sounds grounded.',
              '<span class="tag tag-amber">Resolve tendency tones</span> The 7th of a dominant chord (F in G7) wants to resolve DOWN by step to E. The leading tone (B in G7) wants to resolve UP to C.',
            ]
          },
          {
            type: 'two-col-drill',
            heading: '5 smooth transitions (all white keys)',
            items: [
              { title: 'Cmaj7 → Fmaj7', detail: 'E stays (common tone), B→A (step down), G→A (step up), C→F (bass)' },
              { title: 'Am7 → Dm7', detail: 'C stays (common tone), G→F (step down), E→F (step up), A→D (bass)' },
              { title: 'Fmaj7 → G7', detail: 'E→F (step up), C→B (step down), A→G (step down), F→G (bass)' },
              { title: 'G7 → Cmaj7', detail: 'F→E (resolves down), B→C (leading tone resolves up), D→E (step up), G→C (bass)' },
              { title: 'Em7 → Am7', detail: 'G stays (common tone), D→C (step down), B→C (step up), E→A (bass)' },
            ]
          }
        ]
      },
      {
        icon: 'ti-music',
        title: 'Week 4 — 7th chords & jazz shapes',
        cards: [
          {
            type: 'tag-list',
            heading: 'Add the 7th — the deep house sound',
            items: [
              '<span class="tag tag-purple">Cmaj7</span> C–E–G–B',
              '<span class="tag tag-teal">Dm7</span> D–F–A–C',
              '<span class="tag tag-teal">Em7</span> E–G–B–D',
              '<span class="tag tag-purple">Fmaj7</span> F–A–C–E',
              '<span class="tag tag-amber">G7</span> G–B–D–F (dominant 7th — the "tension" chord)',
              '<span class="tag tag-teal">Am7</span> A–C–E–G',
            ],
            body: 'These 4-note chords are the backbone of deep house. Fmaj7 and Cmaj7 especially appear in almost every deep house and amapiano track.'
          },
          {
            type: 'two-col-drill',
            heading: 'Shell voicings — the Rhodes approach',
            intro: 'Play just 3 notes: the root (left hand), the 3rd and the 7th (right hand). Drop the 5th entirely. This is how Rhodes players build that stripped-back warmth.',
            items: [
              { title: 'Cmaj7 shell', detail: 'C (LH) + E–B (RH)' },
              { title: 'Am7 shell', detail: 'A (LH) + C–G (RH)' },
              { title: 'Fmaj7 shell', detail: 'F (LH) + A–E (RH)' },
              { title: 'Dm7 shell', detail: 'D (LH) + F–C (RH)' },
            ]
          }
        ]
      },
    ],
    checkList: [
      'You can play all 7 triads in root position without looking at notes or hesitating',
      'You can play all 7 triads in all 3 inversions',
      'You can play all 6 seventh chords (Cmaj7, Dm7, Em7, Fmaj7, G7, Am7)',
      'You can transition between C–F–G–Am smoothly at 70 BPM without pausing',
      'Both hands can play the C major scale cleanly in parallel',
    ]
  },

  // ─── PHASE 2 ──────────────────────────────────────────────────────────────
  {
    id: 2,
    label: 'Phase 2',
    title: 'Hand technique & soloing drills',
    description: 'Speed, independence, and muscle memory. Your Launchkey Mini has a short keybed — this phase trains your hands to work efficiently in that limited range.',
    timeline: '~6–8 weeks (3–4 sessions/week, 30–45 min)',
    badgeStyle: 'background:rgba(52,211,153,0.2);color:#6ee7b7;border:1px solid rgba(52,211,153,0.3)',
    accentColor: '#34d399',
    sections: [
      {
        icon: 'ti-bolt',
        title: 'Core technique drills',
        cards: [
          {
            type: 'list',
            heading: 'Hanon-style finger independence (10 min/day)',
            items: [
              '5-finger position exercise: starting on C, play C–D–E–F–G up and back with each finger pressing firmly and evenly',
              'Do this at 60 BPM, then 80, then 100 over weeks',
              'Focus: every note same volume, no "bumping" on strong fingers (index, middle)',
              'Right hand, then left hand, then both in parallel',
            ]
          },
          {
            type: 'list',
            heading: 'Chromatic scale drill (5 min/day)',
            items: [
              'Play every note (white and black) from C to C one octave up and back',
              'Builds keyboard familiarity beyond just white keys',
              'Use fingering: 1-2-3-1-2-3-4-1-2-3-1-2-3-4-5',
              'Start at 50 BPM, goal is 100 BPM cleanly',
            ]
          }
        ]
      },
      {
        icon: 'ti-bolt',
        title: 'Soloing in C major — pentatonic first',
        cards: [
          {
            type: 'tag-list',
            heading: 'C major pentatonic (5 notes — easiest to solo with)',
            intro: 'Notes:',
            items: [
              '<span class="tag tag-purple">C</span> <span class="tag tag-purple">D</span> <span class="tag tag-purple">E</span> <span class="tag tag-purple">G</span> <span class="tag tag-purple">A</span>',
            ],
            body: 'This 5-note scale removes the "avoid" notes and lets you solo freely over any chord in C major. It\'s used heavily in amapiano piano riffs and melodic lines.'
          },
          {
            type: 'list',
            heading: 'Pentatonic drill sequence (15 min/day)',
            items: [
              'Step 1: Play C–D–E–G–A–C up and down, both directions, looping',
              'Step 2: Add rhythmic variation — try swinging the rhythm (short-long, short-long)',
              'Step 3: Improvise freely — just play any notes from the pentatonic over a simple Cm or Am chord in your DAW',
              'Step 4: Pattern exercise: play in groups of 3 (C–D–E, D–E–G, E–G–A…), then groups of 4',
            ]
          }
        ]
      },
      {
        icon: 'ti-piano',
        title: 'Bass fundamentals',
        cards: [
          {
            type: 'text',
            heading: 'The 25-key approach to bass',
            body: 'On the Launchkey Mini you have roughly 2 octaves — you can\'t play bass and full chords at the same time without octave-shifting. Shift down 2 octaves using the octave buttons (Oct– twice) to drop into bass register (~C1), play your bass pattern, then shift back up for chords. Practice the shift until it\'s muscle memory.'
          },
          {
            type: 'tag-list',
            heading: 'The 4 bass types to know',
            items: [
              '<span class="tag tag-purple">Root bass</span> Play only the root note of each chord. The simplest, cleanest approach. Foundation of all SA house bass.',
              '<span class="tag tag-teal">Root + 5th alternating</span> Alternate between the root and the 5th of the chord (A–E–A–E over Am). Creates gentle movement without changing harmony.',
              '<span class="tag tag-blue">Octave pump</span> Play the root, then jump to the same note one octave higher and back. Warm, round, signature deep house feel.',
              '<span class="tag tag-amber">Walking bass</span> Connect chord roots using scale steps. Jazz and sgidongo signature.',
            ]
          },
          {
            type: 'two-col-drill',
            heading: 'Root bass drill — your starting point',
            items: [
              { title: 'Over Am7–Gmaj7–Fmaj7–Gmaj7', detail: 'Play: A . . . | G . . . | F . . . | G . . .' },
              { title: 'Root + 5th over Am', detail: 'Play: A – E – A – E (the 5th of Am is E)' },
              { title: 'Root + 5th over Dm', detail: 'Play: D – A – D – A (the 5th of Dm is A)' },
              { title: 'Root + 5th over Fmaj7', detail: 'Play: F – C – F – C (the 5th of F is C)' },
            ]
          }
        ]
      },
      {
        icon: 'ti-flame',
        title: 'The blues scale — your first chromatic note',
        cards: [
          {
            type: 'text',
            heading: 'From pentatonic to blues',
            body: 'The A minor pentatonic is A–C–D–E–G. The blues scale adds one note: E♭ (the "blue note" — also called the ♭5 or ♯4). Full A blues scale: A–C–D–E♭–E–G. The E♭ lives between D and E on your keyboard — it\'s a black key. Your first deliberate chromatic note. Use it as a passing tone or a bend, never as a resting note.'
          },
          {
            type: 'tag-list',
            heading: 'Three ways to use E♭',
            items: [
              '<span class="tag tag-coral">Passing tone</span> D → E♭ → E (quick slide upward, don\'t linger on E♭)',
              '<span class="tag tag-coral">Approach from above</span> E → E♭ → D (resolves downward — very bluesy, very emotional)',
              '<span class="tag tag-amber">Ghost note</span> Touch it barely audibly between D and E. Implied, not stated. Creates texture.',
            ]
          },
          {
            type: 'list',
            heading: '4 practice patterns',
            items: [
              'Pattern 1: A–C–D–E♭–E–G–E–D (ascending blues, resolve down)',
              'Pattern 2: A–C–D–E♭–E–G (ascending, land on G for open feel)',
              'Pattern 3: E–D–E♭–D–C–A (descending with blue note passing)',
              'Pattern 4: A–C–E♭–E–G–E–E♭–D–A (full resolution arc)',
            ]
          }
        ]
      },
      {
        icon: 'ti-bolt',
        title: 'Amapiano-specific melodic patterns',
        cards: [
          {
            type: 'tag-list',
            heading: 'Log drum / piano riff patterns',
            intro: 'Amapiano piano lines often use these shapes — practice them until they\'re automatic:',
            items: [
              '<span class="tag tag-blue">Pattern 1</span> E–G–A–G–E (descending resolution) — play over Am or Am7',
              '<span class="tag tag-blue">Pattern 2</span> C–E–G–A–G (ascending then fall) — over Cmaj7 or Fmaj7',
              '<span class="tag tag-blue">Pattern 3</span> A–C–E–D–C (minor feel riff) — over Am or Dm',
              '<span class="tag tag-blue">Pattern 4</span> G–A–G–E–D (pentatonic walkdown) — over G or G7',
            ],
            body: 'Record each pattern into your DAW. Loop it. Hear it in context.'
          }
        ]
      },
      {
        icon: 'ti-wave-square',
        title: 'Rhythm and feel',
        cards: [
          {
            type: 'text',
            heading: 'Straight vs groove feel',
            body: 'Straight feel = every 8th note lands exactly on the grid, mathematically even. Groove feel = notes are slightly pushed or pulled from the grid. Deep house and amapiano live slightly ahead of the beat — chord stabs pushed a 16th note early create that forward momentum and irresistible pull.'
          },
          {
            type: 'tag-list',
            heading: 'Velocity as expression — 5 rules',
            items: [
              '<span class="tag tag-purple">Root/bass notes</span> velocity 70–85 — solid, present, but not harsh',
              '<span class="tag tag-teal">Inner chord tones</span> velocity 55–70 — softer, blend into the texture',
              '<span class="tag tag-blue">Melody notes on the beat</span> velocity 75–90 — let them sing out above the chord',
              '<span class="tag tag-amber">Passing tones</span> velocity 40–60 — ghost them, they\'re connective tissue',
              '<span class="tag tag-coral">Chord stabs (amapiano)</span> velocity 80–100 — punchy and short, meant to cut through',
            ]
          }
        ]
      },
    ],
    checkList: [
      'C major scale, both hands, clean at 100 BPM (16th notes)',
      'C major pentatonic — you can improvise freely for 2 minutes without running out of ideas',
      'You can play all 4 amapiano patterns from memory, in time',
      '5-finger hanon drill clean at 90 BPM both hands',
      'You\'ve recorded at least one melodic riff into your DAW that you\'re happy with',
    ]
  },

  // ─── PHASE 3 ──────────────────────────────────────────────────────────────
  {
    id: 3,
    label: 'Phase 3',
    title: 'The Nashville numbering system',
    description: 'Stop thinking in note names. Start thinking in numbers. This is the single most important theory shift for a producer — it unlocks every key, every chord progression, and every genre instantly.',
    timeline: '~4–6 weeks (3–4 sessions/week, 30–45 min)',
    badgeStyle: 'background:rgba(251,191,36,0.2);color:#fde68a;border:1px solid rgba(251,191,36,0.3)',
    accentColor: '#fbbf24',
    sections: [
      {
        icon: 'ti-list-numbers',
        title: 'What the numbering system is',
        cards: [
          {
            type: 'numeral-grid',
            heading: 'The concept',
            intro: 'Every chord in a key gets a number (I through VII). In C major:',
            numerals: [
              { label: 'I', chord: 'C maj', style: 'background:rgba(139,126,248,0.2);border:1px solid rgba(139,126,248,0.3)' },
              { label: 'ii', chord: 'D min', style: 'background:rgba(52,211,153,0.15);border:1px solid rgba(52,211,153,0.3)' },
              { label: 'iii', chord: 'E min', style: 'background:rgba(52,211,153,0.15);border:1px solid rgba(52,211,153,0.3)' },
              { label: 'IV', chord: 'F maj', style: 'background:rgba(139,126,248,0.2);border:1px solid rgba(139,126,248,0.3)' },
              { label: 'V', chord: 'G maj', style: 'background:rgba(139,126,248,0.2);border:1px solid rgba(139,126,248,0.3)' },
              { label: 'vi', chord: 'A min', style: 'background:rgba(52,211,153,0.15);border:1px solid rgba(52,211,153,0.3)' },
              { label: 'vii°', chord: 'B dim', style: 'background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.3)' },
            ],
            body: 'Upper case = major. Lower case = minor. The pattern I–ii–iii–IV–V–vi–vii° is the same in every major key. Learn this pattern, not just C major\'s notes.'
          }
        ]
      },
      {
        icon: 'ti-list-numbers',
        title: 'Common progressions — deep analysis',
        cards: [
          {
            type: 'text',
            heading: 'P1 — I–vi–IV–V',
            intro: '<span class="tag tag-blue">Pop house</span><span class="tag tag-purple">Gospel</span>',
            body: 'In C: Cmaj7–Am7–Fmaj7–G7 | Emotional: Universal, uplifting, resolved\n\nThe "everywhere" loop. Works because V always resolves urgently back to I, making the loop feel inevitable and satisfying. Add 7ths to all chords for deep house colour.\n\nVoicing hint: Cmaj9–Am7–Fmaj7–G7. The 9th on the I chord lifts the whole loop.'
          },
          {
            type: 'text',
            heading: 'P2 — i–VII–VI–VII',
            intro: '<span class="tag tag-teal">SA Deep House</span><span class="tag tag-teal">Sgidongo</span>',
            body: 'In Am: Am7–Gmaj7–Fmaj7–Gmaj7 | Emotional: Dark, resilient, driving forward\n\nVII (G major) is a borrowed/Mixolydian chord — that flat-VII movement is a signature SA deep house sound. Slow chord changes: 4–8 bars each.\n\nVoicing hint: Use Am7 shell voicing (A + C–G), let Gmaj7 feel bright and open.'
          },
          {
            type: 'text',
            heading: 'P3 — i–iv–VII–III',
            intro: '<span class="tag tag-teal">Deep house</span><span class="tag tag-coral">Neo-soul</span>',
            body: 'In Am: Am9–Dm9–G7–Cmaj7 | Emotional: Descending emotional weight, melancholic, cinematic\n\nEach chord is a 4th below the last. The descending motion creates a sense of weight and inevitability. Use 9th chords on Am and Dm for the most depth.'
          },
          {
            type: 'text',
            heading: 'P4 — ii–V–I',
            intro: '<span class="tag tag-purple">Jazz house</span><span class="tag tag-teal">Sgidongo stabs</span>',
            body: 'In C: Dm7–G7–Cmaj7 | Emotional: Tension → urgency → resolution. Complete, satisfying, sophisticated.\n\nThe jazz cadence. ii sets up tension, V creates urgency, I resolves it. As a stab at 128 BPM it\'s sgidongo; as a slow sustained loop it\'s deep house.'
          },
          {
            type: 'text',
            heading: 'P5 — I–IV–I–V (gospel cadence)',
            intro: '<span class="tag tag-green">Gospel</span><span class="tag tag-purple">Soulful house</span>',
            body: 'In C: Cmaj7–Fmaj7–Cmaj7–G7 | Emotional: Uplift, praise energy, bright and declarative\n\nThe IV chord is the "amen" chord — moving to it and back gives a call-and-response feeling. Voicing hint: Cadd9–Fadd9–Cadd9–G7 for a brighter gospel variation.'
          },
          {
            type: 'text',
            heading: 'P6 — I–V–vi–IV',
            intro: '<span class="tag tag-blue">Soulful house</span><span class="tag tag-green">Afro-house</span>',
            body: 'In C: Cmaj9–Gmaj7–Am7–Fmaj7 | Emotional: Hopeful, bittersweet, always moving\n\nThe vi (Am7) is the emotional hinge — the progression lifts from C to G then softens into Am before the Fmaj7 opens it up again. One of the most used loops in modern SA music.'
          },
          {
            type: 'text',
            heading: 'P7 — i–VI–III–VII',
            intro: '<span class="tag tag-teal">Deep house</span><span class="tag tag-coral">Amapiano</span>',
            body: 'In Am: Am7–Fmaj7–Cmaj7–G7 | Emotional: Cyclical, searching, meditative\n\nDescends by thirds. Cmaj7 and G7 feel major and open after the dark Am–F opening — a shift from shadow to light mid-loop. At 112 BPM with stabs, this becomes instantly amapiano.'
          },
          {
            type: 'text',
            heading: 'P8 — ii–V–iii–vi (jazz cycle)',
            intro: '<span class="tag tag-purple">Jazz house</span><span class="tag tag-purple">Neo-soul</span>',
            body: 'In C: Dm7–G7–Em7–Am7 | Emotional: Circular, sophisticated, never fully settling\n\nTwo back-to-back ii–V movements. Creates constant forward motion without a definitive resolution. Shell voicings: Dm7 (D+F+C) → G7 (G+B+F) → Em7 (E+G+D) → Am7 (A+C+G). Nearly every voice moves by step.'
          }
        ]
      },
      {
        icon: 'ti-arrow-right-circle',
        title: 'Secondary dominants — first look',
        cards: [
          {
            type: 'text',
            heading: 'What is a secondary dominant?',
            body: 'A secondary dominant is a dominant 7th chord borrowed from another key to create tension before resolving. Each one adds a chromatic note and creates a "surprise" pull toward the next chord. You\'ll recognise these by ear — they are everywhere in neo-soul, gospel, and SA deep house.'
          },
          {
            type: 'tag-list',
            heading: 'The three most useful in C major',
            items: [
              '<span class="tag tag-green">V/IV = C7</span> C–E–G–B♭ (B♭ borrowed) → used before Fmaj7. Bluesy dip before the IV chord blooms.',
              '<span class="tag tag-blue">V/V = D7</span> D–F#–A–C (F# borrowed) → used before G7. Chain of dominants. Jazz tension building.',
              '<span class="tag tag-coral">V/vi = E7</span> E–G#–B–D (G# borrowed) → used before Am7. Dramatic, urgent — makes Am feel like a powerful landing.',
            ]
          },
          {
            type: 'two-col-drill',
            heading: 'Drill',
            items: [
              { title: 'C7 → Fmaj7', detail: 'Hear the B♭ resolve down to A' },
              { title: 'D7 → G7 → Cmaj7', detail: 'Chain of two dominants, one resolution' },
              { title: 'E7 → Am7', detail: 'G# pulls urgently up to A' },
              { title: 'Add one to any P1–P8 progression', detail: 'This is how neo-soul composers think' },
            ]
          }
        ]
      },
      {
        icon: 'ti-star',
        title: 'Studio-ready milestone',
        cards: [
          {
            type: 'studio-milestone',
            heading: 'You are studio-ready when Phase 3 is complete',
            items: [
              'You can play all 8 progressions (P1–P8) from memory in C major / A minor',
              'You understand what each progression feels like and can choose one to match a mood',
              'You can lay a root bassline over any of them on the Launchkey Mini using octave shift',
              'You know the number system well enough to respond to "give me the IV" or "that\'s a ii–V–I"',
              'You can play a short blues-scale riff over Am without thinking about it',
            ]
          }
        ]
      },
    ],
    checkList: [
      'You can recite I–ii–iii–IV–V–vi–vii° and their chord qualities from memory',
      'Given any number (e.g. "play the IV chord in G major"), you can find it within 5 seconds',
      'You can play I–vi–IV–V in at least 3 different keys',
      'You can listen to a song and roughly identify where the I chord is',
      'You\'ve built at least one original chord progression using numbers in your DAW',
    ]
  },

  // ─── PHASE 4 ──────────────────────────────────────────────────────────────
  {
    id: 4,
    label: 'Phase 4',
    title: 'Genre application — deep house, amapiano & sgidongo',
    description: 'Now you combine everything. Your chords, your melodic ideas, and your number system knowledge meet genre-specific production techniques. This is where you start making music, not just practising.',
    timeline: '~8–12 weeks (3–4 sessions/week, ongoing project-based)',
    badgeStyle: 'background:rgba(251,113,133,0.2);color:#fca5a5;border:1px solid rgba(251,113,133,0.3)',
    accentColor: '#fb7185',
    sections: [
      {
        icon: 'ti-headphones',
        title: 'South African deep house',
        cards: [
          {
            type: 'list',
            heading: 'Sound & chord characteristics',
            items: [
              'Keys: typically A minor, C major, D minor, F major — all relative or neighbour keys to what you\'ve learned',
              'Chord movement is slow — often 4 or 8 bars per chord, letting the groove breathe',
              'Use 7th chords (Fmaj7, Am7, Dm7) — never just plain triads',
              'Left hand plays the single root note; right hand plays the chord voicing above',
              'Inversions are critical — minimal hand movement between chords keeps the flow smooth',
            ]
          },
          {
            type: 'tag-list',
            heading: 'Deep house progression library',
            intro: 'All in Am / C major (white keys). Use 7th chord voicings throughout.',
            items: [
              '<span class="tag tag-teal">DH-1</span> <strong>i–VII–VI–VII</strong> | Am7–Gmaj7–Fmaj7–Gmaj7 | 100–120 BPM | Classic SA deep house. Let each chord breathe 4–8 bars.',
              '<span class="tag tag-teal">DH-2</span> <strong>i–VI–iv–VII</strong> | Am7–Fmaj7–Dm7–Gmaj7 | 118–122 BPM | Soulful and circular. Dm7 adds melancholy mid-cycle.',
              '<span class="tag tag-teal">DH-3</span> <strong>vi–IV–I–V</strong> | Am7–Fmaj7–Cmaj7–G7 | 95–110 BPM | Starts minor, ends on major dominant. Full emotional arc in one loop.',
              '<span class="tag tag-teal">DH-4</span> <strong>ii–V–I–vi</strong> | Dm7–G7–Cmaj7–Am7 | 112–118 BPM | Jazz cadence into the vi — never fully settles. Keeps the dancefloor engaged.',
              '<span class="tag tag-teal">DH-5</span> <strong>i–iv–III–VII</strong> | Am7–Dm7–C–G | 115–122 BPM | C and G feel bright after the minor opening — dark and light in one loop.',
            ]
          }
        ]
      },
      {
        icon: 'ti-headphones',
        title: 'Amapiano',
        cards: [
          {
            type: 'list',
            heading: 'Piano style',
            items: [
              'Log drum is the signature instrument — but the piano/keys melody rides on top',
              'Melodic lines use pentatonic runs, often in A minor or C major pentatonic',
              'Chords are often stabbed rhythmically (short, punchy) in sync with the log drum pattern',
              'Use 9th chords: Am9, Cmaj9, Fmaj9 — these define the amapiano harmonic language',
              'Common BPM: 112–114',
            ]
          },
          {
            type: 'list',
            heading: 'Amapiano piano exercise',
            items: [
              'Set your DAW to 112 BPM',
              'Lay down a basic log drum pattern (kick on 1 and 3, snare on 2 and 4, 8th note sub-bass)',
              'Record this riff over Am: A–C–E–D–C (use your Phase 2 patterns!)',
              'Add an Am9 chord stab on beat 2 and the "and" of 3',
              'Loop it 8 bars. That\'s a working amapiano piano section.',
            ]
          }
        ]
      },
      {
        icon: 'ti-heart',
        title: 'Gospel and neo-soul house',
        cards: [
          {
            type: 'text',
            heading: 'Gospel harmony principles',
            body: 'Gospel uses the same diatonic chords as deep house but treats them with more rhythmic energy and more emotional directness. Key gospel moves: the IV chord as an "amen" lift; the vi chord as a moment of reflection; borrowed chords (♭VII especially) for dramatic colour; and the ii–V–I cadence as a closing statement.'
          },
          {
            type: 'tag-list',
            heading: '4 gospel / neo-soul progressions',
            items: [
              '<span class="tag tag-green">GL-1</span> <strong>I–IV–vi–V</strong> | Cmaj9–Fmaj7–Am7–G7 | Gospel call-and-response. Simple, declarative, uplifting.',
              '<span class="tag tag-green">GL-2</span> <strong>i–VII–VI–V</strong> | Am–G–F–E7 | Minor with secondary dominant at the end (E7 = V/i). Very neo-soul.',
              '<span class="tag tag-green">GL-4</span> <strong>ii–V–I (with extensions)</strong> | Dm9–G13–Cmaj9 | Full jazz-gospel cadence. Rich and complete.',
            ]
          }
        ]
      },
      {
        icon: 'ti-star',
        title: 'Jazz-influenced SA house & sgidongo',
        cards: [
          {
            type: 'text',
            heading: 'Jazz harmony in a house context',
            body: 'SA house borrows from jazz primarily through the ii–V–I cadence and secondary dominants. The difference is not the harmony — it\'s the feel. In SA deep house you play the same chords slow with long sustain and warm reverb. In sgidongo you play them as short stabs at 125–130 BPM. Same theory, radically different energy.'
          },
          {
            type: 'tag-list',
            heading: '3 jazz-house progressions',
            items: [
              '<span class="tag tag-purple">JZ-1</span> <strong>ii–V–I</strong> | Dm7–G7–Cmaj7 | The fundamental jazz cadence. With shell voicings at 120 BPM sustained = deep house. At 128 BPM as stabs = sgidongo.',
              '<span class="tag tag-purple">JZ-2</span> <strong>iii–VI7–ii–V–I</strong> | Em7–A7–Dm7–G7–Cmaj7 | Chain of dominants. Play slowly with clean voice leading.',
              '<span class="tag tag-purple">JZ-3</span> <strong>I–vi–ii–V (loop)</strong> | Cmaj7–Am7–Dm7–G7 | Extremely smooth voice leading. Nearly every voice moves by step.',
            ]
          }
        ]
      },
      {
        icon: 'ti-music-bolt',
        title: 'Basslines — genre-specific patterns',
        cards: [
          {
            type: 'tag-list',
            heading: 'SA deep house bass',
            intro: 'Slow, warm, sub-bass weight. The bass follows chord roots with minimal movement.',
            items: [
              '<span class="tag tag-teal">Root hold</span> Play root on beat 1, sustain or ghost repeat on beat 3.',
              '<span class="tag tag-teal">Root + 5th</span> Root on beat 1, 5th on beat 3. Over Am: A . E . | Over G: G . D . | Over F: F . C .',
              '<span class="tag tag-teal">Descending approach</span> On the last beat before a chord change, play the note a step above the incoming root.',
            ]
          },
          {
            type: 'tag-list',
            heading: 'Amapiano bass',
            intro: 'Pumping 8th-note sub-bass. Constant motion. The energy engine of the track.',
            items: [
              '<span class="tag tag-coral">8th note pump</span> Play the root on every 8th note: A–A–A–A–A–A–A–A over Am7.',
              '<span class="tag tag-coral">Root + octave pump</span> Alternate root and octave on 8th notes: A(low)–A(high)–A(low)–A(high).',
              '<span class="tag tag-coral">Syncopated</span> A on beat 1, rest, A on "and" of 2, A on beat 3, rest, A on "and" of 4.',
              '<span class="tag tag-coral">Arpeggio bass</span> Play chord tones in sequence: over Am7: A–C–E–G (one note per beat).',
            ]
          }
        ]
      },
    ],
    checkList: [
      'You\'ve finished at least one complete deep house demo (verse + chorus chord loop, melody, bass)',
      'You\'ve recorded a full amapiano piano riff section at 112 BPM with chord stabs',
      'When you hear a track, you can roughly say "that\'s a i–VII–VI progression"',
      'You can transpose a chord progression to a new key in under 30 seconds',
    ]
  },

  // ─── PHASE 5 ──────────────────────────────────────────────────────────────
  {
    id: 5,
    label: 'Phase 5',
    title: 'Advanced Harmony — modal mixture, borrowed chords & your signature sound',
    description: 'This is where your music stops sounding like practice and starts sounding like you. Every tool here is something working producers use in every SA house track you love. No rush — return to this phase whenever Phase 4 material feels automatic.',
    timeline: 'When Phase 4 feels effortless (no end date)',
    badgeStyle: 'background:rgba(96,165,250,0.2);color:#93c5fd;border:1px solid rgba(96,165,250,0.3)',
    accentColor: '#60a5fa',
    sections: [
      {
        icon: 'ti-palette',
        title: 'Borrowed chords — modal mixture',
        cards: [
          {
            type: 'text',
            heading: 'What are borrowed chords?',
            body: 'Borrowing means taking a chord from the parallel minor (or major) key and using it in your current key. In C major, chords built on notes from C natural minor are borrowed chords. They bring darkness and colour into bright major tonality — and sudden brightness into dark minor tonality. This is the difference between a progression that sounds competent and one that sounds soulful.'
          },
          {
            type: 'tag-list',
            heading: 'Borrowed chords in C major (from C natural minor)',
            items: [
              '<span class="tag tag-purple">♭VII — B♭ major</span> B♭–D–F. Gospel lift, warm, declarative. The most common borrowed chord in SA house and gospel. Example: C–B♭–F–C',
              '<span class="tag tag-blue">♭VI — A♭ major</span> A♭–C–E♭. Cinematic, darker, surprising. Example: Am–Fmaj7–A♭–G7',
              '<span class="tag tag-coral">♭III — E♭ major</span> E♭–G–B♭. Jazzy, neo-soul weight. Example: C–E♭–F–G',
              '<span class="tag tag-teal">iv — F minor</span> F–A♭–C. Sorrowful pull, deeply emotional. Example: Fmaj7 → Fm → Cmaj7',
            ]
          },
          {
            type: 'tag-list',
            heading: 'Borrowed chords in A minor (from A major / A Dorian)',
            items: [
              '<span class="tag tag-green">IV — D major</span> D–F#–A (has F#). Sudden brightness in dark minor context. Gospel lift. Example: Am7–Gmaj7–D–Am7',
              '<span class="tag tag-amber">V — E major</span> E–G#–B (has G#). Strong dominant pull from A harmonic minor. Example: Fmaj7–E–Am',
              '<span class="tag tag-purple">I — A major (Picardy third)</span> A–C#–E. Triumphant, earned resolution. Example: Dm–G–E7–A major',
            ]
          }
        ]
      },
      {
        icon: 'ti-arrow-loop-right',
        title: 'Secondary dominants — full treatment',
        cards: [
          {
            type: 'tag-list',
            heading: 'Complete secondary dominant table — C major / A minor',
            items: [
              '<span class="tag tag-green">V/IV = C7</span> C–E–G–B♭ | chromatic: B♭ | resolves to: Fmaj7. Bluesy dip before the lift.',
              '<span class="tag tag-blue">V/V = D7</span> D–F#–A–C | chromatic: F# | resolves to: G7. Chain tension — pure jazz motion.',
              '<span class="tag tag-coral">V/vi = E7</span> E–G#–B–D | chromatic: G# | resolves to: Am7. Dramatic, urgent.',
              '<span class="tag tag-purple">V/ii = A7</span> A–C#–E–G | chromatic: C# | resolves to: Dm7. Jazzy, unexpected brightening.',
            ]
          },
          {
            type: 'text',
            heading: 'Extended progression using 3 secondary dominants',
            body: 'In C major: Cmaj7 → A7 → Dm7 → D7 → G7 → Cmaj7\n\nAnalysis: I → V/ii → ii → V/V → V → I\n\nA chain of dominants, each one pointing to the next. This is how neo-soul and jazz-house progressions build momentum before a big resolution. Play it slowly. Feel each resolution arrive.'
          }
        ]
      },
      {
        icon: 'ti-layers-difference',
        title: 'Extensions — 9ths, 11ths, 13ths in practice',
        cards: [
          {
            type: 'text',
            heading: 'The extension ladder',
            body: 'Start with a 7th chord (root–3rd–5th–7th). Add the 9th (same as the 2nd, one octave higher). Add the 11th (same as the 4th). Add the 13th (same as the 6th). In C major and A minor, all of these are white keys. You are still entirely in the scale — just using more of it at once.'
          },
          {
            type: 'tag-list',
            heading: 'White-key extension reference',
            items: [
              '<span class="tag tag-purple">Cmaj9</span> C–E–G–B–D — all white. Floating, open, airy.',
              '<span class="tag tag-purple">Fmaj9</span> F–A–C–E–G — all white. Lifted, hopeful.',
              '<span class="tag tag-teal">Am9</span> A–C–E–G–B — all white. Emotional, watery. Deep house staple.',
              '<span class="tag tag-teal">Dm11</span> D–F–A–C–E–G — all white. Rich and complex. Use sparingly.',
              '<span class="tag tag-amber">G13</span> G–B–D–F–A — play as G–B–F–A in right hand. The A adds colour and warmth over the dominant tension.',
            ]
          }
        ]
      },
      {
        icon: 'ti-git-merge',
        title: 'Voice leading at depth',
        cards: [
          {
            type: 'text',
            heading: 'The soprano line as a hidden melody',
            body: 'In advanced harmony, the top note of your chord voicing becomes a melody line of its own. If you voice Cmaj7 with B on top, then Fmaj7 with A on top, then G7 with G on top — you have a descending melodic line B–A–G happening automatically through your chord progression. Always be aware of what your top voice is doing.'
          },
          {
            type: 'tag-list',
            heading: '7 advanced transitions for deep house / neo-soul',
            items: [
              '<span class="tag tag-teal">Cmaj7 → Am7</span> Hold E (common tone), B→G, G holds, C→A (bass)',
              '<span class="tag tag-teal">Am7 → Fmaj7</span> Hold C (common tone), E stays as 7th of Fmaj7, G→A, A→F (bass)',
              '<span class="tag tag-teal">Fmaj7 → Em7</span> Hold E (7th of Fmaj7 → root of Em7), A→G, C→B, F→E (bass step)',
              '<span class="tag tag-blue">Dm7 → G7</span> Hold F (common tone: 3rd of Dm7, 7th of G7), A→G, C→B, D→G (bass leaps 4th)',
              '<span class="tag tag-blue">G7 → Cmaj7</span> F→E (7th resolves down), B→C (leading tone resolves up), G→C (bass)',
              '<span class="tag tag-coral">Am7 → E7</span> Hold E, C→B, G→G# (chromatic — the borrowed note arrives), A holds (bass)',
              '<span class="tag tag-coral">E7 → Am7</span> G#→A (chromatic resolution — the dramatic arrival), B→C, D→C, E→A (bass)',
            ]
          }
        ]
      },
      {
        icon: 'ti-flame',
        title: 'Blues scale — full production context',
        cards: [
          {
            type: 'text',
            heading: 'The two blues scales you need',
            body: 'A blues scale: A–C–D–E♭–E–G. The E♭ (D#) is your primary blue note. C blues scale: C–E♭–F–G♭–G–B♭. Start with A blues over Am progressions — it maps directly onto everything you already know. Add C blues when A blues feels automatic.'
          },
          {
            type: 'tag-list',
            heading: '6 production-ready licks (in A minor)',
            items: [
              '<span class="tag tag-blue">Lick 1</span> A–C–D–E♭–E–G–E (climb, peak, descend to E)',
              '<span class="tag tag-blue">Lick 2</span> G–E–E♭–D–C–A (descending, very emotional)',
              '<span class="tag tag-blue">Lick 3</span> E–D–E♭–D–C (the "double-back" — E♭ used as a bend effect)',
              '<span class="tag tag-blue">Lick 4</span> A–C–D–E♭–E–A (octave riff with blue note mid-arc)',
              '<span class="tag tag-blue">Lick 5</span> C–E♭–E–G (quick 4-note riff, strong over Am)',
              '<span class="tag tag-blue">Lick 6</span> G–E–D–E♭–D–C–A (long descending phrase — use over 2 bars at slow tempo)',
            ]
          }
        ]
      },
      {
        icon: 'ti-key',
        title: 'Taking it into new keys',
        cards: [
          {
            type: 'tag-list',
            heading: 'Your migration path',
            intro: 'You know C major and A minor deeply. Every concept transfers directly — you are just moving the pattern.',
            items: [
              '<span class="tag tag-teal">A minor</span> Already mastered — same notes as C major, different emotional centre',
              '<span class="tag tag-teal">D minor</span> Shares C, F, A with C major. Adds B♭ (one new black key). Very common SA house key.',
              '<span class="tag tag-purple">F major</span> One black key (B♭). Warm, soulful. Fmaj7 as home chord is a beautiful sound.',
              '<span class="tag tag-purple">G major</span> One black key (F#). Bright, afro-inspired, slightly uplifting feel.',
              '<span class="tag tag-amber">G minor</span> Two black keys (B♭, E♭). Opens up deeper gospel and deep house colour palettes.',
            ]
          },
          {
            type: 'text',
            heading: 'The number system method',
            body: 'Take any progression by number. Example: i–VII–VI–VII. In A minor that\'s Am–G–F–G. In D minor it\'s Dm–C–B♭–C. In G minor it\'s Gm–F–E♭–F. You don\'t relearn the progression — you apply the same number pattern to new roots. The harmonic relationships and emotional character remain identical. Only the key colour changes.'
          }
        ]
      },
    ],
    checkList: [
      'You can use at least 3 different borrowed chords within a C major or A minor progression and describe what each one does emotionally',
      'You can identify a secondary dominant by ear — "that chord felt like it was pulling hard toward the next one"',
      'You can play at least one ii–V–I progression with smooth voice leading (no jumps) at 80 BPM',
      'You can improvise a 4-bar phrase using the A blues scale over an Am7 vamp, using E♭ as a passing tone only',
      'You can play the i–VII–VI–VII progression in both A minor AND D minor from memory, with 7th chord voicings',
    ]
  }
];

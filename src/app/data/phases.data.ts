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
  sectionType?: 'theory' | 'practice';
  /** undefined = works on 25-key; 61 = strongly benefits from a full keyboard */
  keysNeeded?: 61;
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
        sectionType: 'theory',
        cards: [
          {
            type: 'text',
            body: 'C major and A minor share the same notes — they are relative keys. Starting in C major gives you a visual anchor: the white keys only. A minor is equally valid but emotionally darker. For deep house and amapiano, you\'ll use both constantly — so learn C major first as your theory home, then treat Am as a free bonus later.'
          }
        ],
        checkList: [
          'You can explain why C major and A minor share the same notes',
          'You can find C instantly from any 2-black-key group',
          'You can state why C major is the default training key in early phases',
        ]
      },
      {
        icon: 'ti-target',
        title: 'Your studio-ready path',
        sectionType: 'theory',
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
        ],
        checkList: [
          'You know your realistic timeline to studio basics and studio confidence',
          'You can describe what Phase 3 readiness practically sounds like on keys',
          'You can translate at least one curriculum goal into your weekly practice plan',
        ]
      },
      {
        icon: 'ti-music',
        title: 'How drills will progress (simple -> advanced)',
        sectionType: 'practice',
        cards: [
          {
            type: 'text',
            heading: 'Your training system (so you never feel lost)',
            body: 'Every practice topic now follows a ladder: start simple, add one challenge at a time, then move on only when your ear, hands, and timing are stable. This prevents random-note playing and builds real understanding.'
          },
          {
            type: 'two-col-drill',
            heading: '4-level ladder used in every topic',
            items: [
              { title: 'Level 1 — Shape only', detail: 'Single chord or scale shape, slow tempo, no rhythm pressure. Goal: zero confusion.' },
              { title: 'Level 2 — Time locked', detail: 'Same material with metronome and strict count. Goal: clean timing with no pauses.' },
              { title: 'Level 3 — Musical use', detail: 'Apply it inside a short progression, bass pattern, or phrase. Goal: make it sound like music.' },
              { title: 'Level 4 — Producer mode', detail: 'Play over a loop/beat, transpose, or vary voicings. Goal: studio-ready control.' },
            ]
          },
          {
            type: 'list',
            heading: 'Your advancement rule (customized to you)',
            items: [
              'Default session: 30 minutes, 4 sessions per week.',
              'Advance only when you hit the pass mark and repeat it in 2 sessions in a row.',
              'If you struggle: keep difficulty but reduce tempo first.',
              'If still struggling: switch to a related drill for variety, then return.',
              'If you pass quickly because you already know it: use "Already know this" and move forward.',
            ]
          },
          {
            type: 'text',
            heading: 'What this fixes for you',
            body: 'You said you were pressing random C major, A minor, and 7th chords without knowing why. This ladder fixes that by forcing three things in order: shape accuracy, timing control, and harmonic purpose. By Level 3, every note you play has a role in the progression. By Level 4, you can use it creatively in production.'
          }
        ],
        checkList: [
          'You can identify which ladder level your current drill belongs to',
          'You only increase difficulty after two clean sessions in a row',
          'You can explain the musical purpose of the notes you are playing in a progression',
        ]
      },
      {
        icon: 'ti-music',
        title: 'Week 1 — notes, scale & hand position',
        sectionType: 'practice',
        cards: [
          {
            type: 'text',
            heading: 'Keyboard layout — your map of the instrument',
            body: 'The keyboard repeats the same 12-note pattern (7 white + 5 black) from left to right. Low pitch is on the left, high pitch on the right.\n\nThe two easiest landmarks: black keys always appear in groups of 2 and groups of 3, alternating. C is always the white key immediately to the LEFT of a group of 2 black keys. Find one C and you can find every C on the entire keyboard instantly.\n\nOctave awareness: on a 25-key keyboard you have roughly 2 octaves. On a 61-key you have 5. As a producer, you think in zones — bass register (left), mid/chord zone (centre), melody/treble zone (right). Most of your chord work lives in the 2 octaves centred around middle C.'
          },
          {
            type: 'drill-grid',
            heading: 'Navigation anchors — memorise these first',
            items: [
              { title: 'C', detail: 'White key LEFT of the 2-black-key group. Your home base.' },
              { title: 'D', detail: 'White key BETWEEN the 2-black-key group.' },
              { title: 'E', detail: 'White key RIGHT of the 2-black-key group.' },
              { title: 'F', detail: 'White key LEFT of the 3-black-key group.' },
              { title: 'B', detail: 'White key RIGHT of the 3-black-key group.' },
              { title: 'Middle C', detail: 'The C closest to the centre of a 61-key board. On a 25-key mini, it is roughly the leftmost C.' },
            ] as any
          },
          {
            type: 'list',
            heading: 'What to learn',
            items: [
              'Name every white key by sight: C D E F G A B (and back)',
              'Learn the C major scale with right hand first, then left hand, then both in parallel (fingering: 1 2 3 | 1 2 3 4 5 — thumb crosses under after E)',
              'Curved fingers, relaxed wrists — no flat fingers, no tension',
              'Progression order: RH alone until clean → LH alone until clean → both hands in parallel. Do NOT rush to both hands.',
            ]
          },
          {
            type: 'text',
            heading: 'The subdivision ladder — how to actually build speed',
            body: 'The metronome BPM alone does not tell you how hard you are working. The note value matters just as much. Follow this exact ladder and do not skip steps:\n\nStep 1: 60 BPM, quarter notes (one note per click). Slow and deliberate — feel every finger land.\nStep 2: 60 BPM, 8th notes (two notes per click). This is your main working tempo for Week 1.\nStep 3: 60 BPM, 16th notes (four notes per click). Same BPM — but now it is physically 4× harder. Do not rush here.\nStep 4: 80 BPM, 8th notes. Only attempt this after Step 3 feels controlled.\n\nMost beginners plateau at Step 2 and think they are done. Step 3 is where your scale becomes a real tool. Breaking a sweat on 16th notes at 60 BPM is completely normal and expected — it means you are working at the right level.'
          },
          {
            type: 'two-col-drill',
            heading: 'Daily drill (20 min)',
            items: [
              { title: 'Scale loop', detail: 'Up + down, 4x each hand. Start at 60 BPM 8th notes.' },
              { title: 'Note naming', detail: 'Drop to 40 BPM. Say each note name aloud as you play. Do not try this at 60 BPM yet — your brain does not have enough spare capacity.' },
              { title: 'Slow practice', detail: '40 BPM quarter notes — feel each finger land cleanly and independently.' },
              { title: 'Listening', detail: 'Sing or hum each note as you play. Even quiet humming trains your ear faster than silent practice.' },
            ]
          },
          {
            type: 'text',
            heading: 'When do scales stop being a lesson and become a warm-up?',
            body: 'The moment you can play C major ascending and descending with both hands at 60 BPM 8th notes without counting or thinking about fingering, scales become a 5-minute warm-up — not a main exercise.\n\nFrom that point forward: open every single session with 2 octaves up and down, both hands, for 5 minutes. Then move on to whatever the current lesson is. You never stop doing scales — you just stop spending 20 minutes on them.\n\nDo not wait until you are perfect at 16th notes before moving to triads. Once 8th notes feel easy, start triads and keep working the 16th note ladder in your warm-up.'
          }
        ],
        checkList: [
          'You can name all white keys without pausing',
          'You can play C major with both hands at 60 BPM in 8th notes cleanly',
          'You can complete one 20-minute Week 1 drill block without breaking form',
        ]
      },
      {
        icon: 'ti-moon',
        title: 'The A natural minor scale — your second home',
        sectionType: 'practice',
        cards: [
          {
            type: 'text',
            heading: 'Critical insight: you already know this scale',
            body: 'A natural minor and C major use the exact same 7 notes: C D E F G A B. There are zero new notes to find on the keyboard. The only difference is where you start and where you resolve — A instead of C.\n\nThis means you do not need to learn A minor from scratch. You need to shift your sense of home. Play the same white-key pattern, but start on A and feel A as the "landing" note. The notes feel familiar; the emotional colour changes completely.\n\nAdd A minor to your warm-up as soon as your C major scale feels comfortable — it costs you only 2 extra minutes per session.'
          },
          {
            type: 'tag-list',
            heading: 'A natural minor scale',
            intro: 'Notes: A – B – C – D – E – F – G – A (same white keys as C major, different starting point)',
            items: [
              '<span class="tag tag-purple">Fingering (RH)</span> 1–2–3–1–2–3–4–5 (same thumb-under technique as C major)',
              '<span class="tag tag-teal">Fingering (LH)</span> 5–4–3–2–1–3–2–1',
              '<span class="tag tag-blue">Starting note</span> A is the white key immediately to the left of any group of three black keys',
              '<span class="tag tag-coral">The only thing that changes</span> You resolve to A, not C. Land on A and hold it. Feel the difference in mood.',
            ],
            body: 'Practice at 40 BPM saying the note names first. Then 60 BPM 8th notes without names. Then back to 40 BPM with names again. This in-and-out approach locks in both the physical pattern and the note recognition together.'
          },
          {
            type: 'two-col-drill',
            heading: 'Daily warm-up drill (10 min total — add to C major warm-up)',
            items: [
              { title: 'C major scale', detail: 'Up + down, 4x — land on C, feel resolved' },
              { title: 'A minor scale', detail: 'Up + down, 4x — land on A, feel the mood shift' },
              { title: 'Same notes, different home', detail: 'Play both back to back with no gap. Notice: identical fingers, completely different emotional colour.' },
              { title: 'Note naming pass', detail: 'One slow run at 40 BPM saying each note aloud. One fast run at 60 BPM in silence. Repeat.' },
            ]
          }
        ],
        checkList: [
          'You can play A natural minor with correct fingering in both hands',
          'You can audibly hear and describe the mood shift between C major and A minor',
          'You can switch between C major and A minor without changing hand-map confidence',
        ]
      },
      {
        icon: 'ti-ruler-measure',
        title: 'Intervals — the building blocks of all harmony',
        sectionType: 'theory',
        cards: [
          {
            type: 'text',
            heading: 'What is an interval?',
            body: 'An interval is the distance between two notes. Every chord, every scale, every melody is built from intervals. Once you understand intervals, you can construct any chord in any key without memorising shapes — you just count the gaps. This is the single most important theory concept for understanding why chords sound the way they do.'
          },
          {
            type: 'tag-list',
            heading: 'The essential intervals (from C upward, counting every key)',
            items: [
              '<span class="tag tag-purple">2 semitones — Major 2nd (M2)</span> C to D. Open, unresolved. Found in sus2 chords.',
              '<span class="tag tag-teal">3 semitones — Minor 3rd (m3)</span> C to E♭. Dark, sad, minor. The defining interval of all minor chords.',
              '<span class="tag tag-teal">4 semitones — Major 3rd (M3)</span> C to E. Bright, happy, major. The defining interval of all major chords.',
              '<span class="tag tag-blue">5 semitones — Perfect 4th (P4)</span> C to F. Open, neutral. Used in sus4 chords and bass movement.',
              '<span class="tag tag-blue">6 semitones — Tritone (dim5)</span> C to F#. Maximum tension. Used in dominant 7th chords.',
              '<span class="tag tag-blue">7 semitones — Perfect 5th (P5)</span> C to G. Stable, powerful. The anchor in all triads.',
              '<span class="tag tag-amber">10 semitones — Minor 7th (m7)</span> C to B♭. Bluesy tension. Used in dominant and minor 7th chords.',
              '<span class="tag tag-amber">11 semitones — Major 7th (M7)</span> C to B. Dreamy, floating. Used in maj7 chords.',
              '<span class="tag tag-coral">8 semitones — Minor 6th / Aug 5th</span> C to A♭. Used in augmented chords. Cinematic.',
              '<span class="tag tag-purple">12 semitones — Octave (P8)</span> C to C. Same note, higher register. Perfect resolution.',
            ]
          },
          {
            type: 'two-col-drill',
            heading: 'Ear association — learn to hear intervals',
            intro: 'Associate each interval with its emotional quality:',
            items: [
              { title: 'Minor 3rd (m3)', detail: 'C to E♭ — the "sad" step. Every minor chord opens with this.' },
              { title: 'Major 3rd (M3)', detail: 'C to E — the "happy" step. Every major chord opens with this.' },
              { title: 'Perfect 5th (P5)', detail: 'C to G — the stable anchor. Present in almost every chord.' },
              { title: 'Minor 7th (m7)', detail: 'C to B♭ — the blues/tension sound. Defines dominant and minor 7th chords.' },
              { title: 'Major 7th (M7)', detail: 'C to B — the floating, dreamy sound. Defines maj7 chords.' },
            ]
          }
        ],
        checkList: [
          'You can count semitones accurately from any white-key root',
          'You can identify m3, M3, P5, m7, and M7 by ear on C-based examples',
          'You can explain how interval quality changes chord emotion',
        ]
      },
      {
        icon: 'ti-calculator',
        title: 'Chord construction — building chords from intervals',
        sectionType: 'theory',
        cards: [
          {
            type: 'text',
            heading: 'The stacking principle',
            body: 'Every chord is built by stacking intervals on top of a root note. You don\'t need to memorise every chord shape separately — you just need to know the interval formula. The same formula works from any root note in any key.'
          },
          {
            type: 'tag-list',
            heading: 'The 4 essential chord formulas',
            items: [
              '<span class="tag tag-purple">Major triad</span> Root + Major 3rd (4 semitones) + Perfect 5th (7 semitones) → C + E + G = C major. Bright, stable.',
              '<span class="tag tag-teal">Minor triad</span> Root + Minor 3rd (3 semitones) + Perfect 5th (7 semitones) → A + C + E = A minor. Dark, expressive.',
              '<span class="tag tag-amber">Diminished triad</span> Root + Minor 3rd (3 semitones) + Diminished 5th (6 semitones) → B + D + F = B diminished. Tense, unstable.',
              '<span class="tag tag-coral">Augmented triad</span> Root + Major 3rd (4 semitones) + Augmented 5th (8 semitones) → C + E + G# = C augmented. Floating, unresolved.',
            ]
          },
          {
            type: 'tag-list',
            heading: '7th chord formulas — adding the 4th note',
            items: [
              '<span class="tag tag-purple">Major 7th (maj7)</span> Major triad + Major 7th (11 semitones from root) → C–E–G–B = Cmaj7. The deep house sound.',
              '<span class="tag tag-teal">Minor 7th (m7)</span> Minor triad + Minor 7th (10 semitones from root) → A–C–E–G = Am7. Dark and soulful.',
              '<span class="tag tag-amber">Dominant 7th (7)</span> Major triad + Minor 7th (10 semitones from root) → G–B–D–F = G7. Maximum tension before resolution.',
            ]
          },
          {
            type: 'two-col-drill',
            heading: 'Build-a-chord drills — construct from the formula, not memory',
            items: [
              { title: 'D major triad', detail: 'D + M3 (F#) + P5 (A) = D–F#–A' },
              { title: 'G minor triad', detail: 'G + m3 (B♭) + P5 (D) = G–B♭–D' },
              { title: 'E dominant 7th', detail: 'E + M3 (G#) + P5 (B) + m7 (D) = E7 = E–G#–B–D' },
              { title: 'Fmaj7', detail: 'F + M3 (A) + P5 (C) + M7 (E) = F–A–C–E ✓' },
            ]
          }
        ],
        checkList: [
          'You can build any major or minor triad from interval formulas',
          'You can build maj7, m7, and dominant 7th chords from a named root',
          'You can verify your chord spelling by semitone counting instead of shape memory',
        ]
      },
      {
        icon: 'ti-music',
        title: 'Week 2 — triads in root position',
        sectionType: 'practice',
        cards: [
          {
            type: 'tag-list',
            heading: 'The 7 diatonic triads of C major',
            items: [
              '<span class="tag tag-purple">C maj</span> C–E–G (Fingering: 1-3-5)',
              '<span class="tag tag-teal">D min</span> D–F–A (Fingering: 1-3-5)',
              '<span class="tag tag-teal">E min</span> E–G–B (Fingering: 1-3-5)',
              '<span class="tag tag-purple">F maj</span> F–A–C (Fingering: 1-3-5)',
              '<span class="tag tag-purple">G maj</span> G–B–D (Fingering: 1-3-5)',
              '<span class="tag tag-teal">A min</span> A–C–E (Fingering: 1-3-5)',
              '<span class="tag tag-amber">B dim</span> B–D–F — skip for now (explained below)',
            ]
          },
          {
            type: 'text',
            heading: 'Why skip B diminished?',
            body: 'B diminished (B–D–F) is the 7th chord of C major and it does exist — but it is the only chord in the key that sounds genuinely dissonant and unresolved on its own. At this stage, your ear is still learning what "right" and "wrong" sound like in this key. Playing Bdim now risks confusing your ear before the other 6 chords are locked in.\n\nYou will encounter it naturally in Phase 3 when you learn the number system and progressions. At that point it will make sense in context (it typically functions as a passing chord resolving to C). For now, build fluency on the 6 chords that form the harmonic backbone of almost every deep house and amapiano track.'
          },
          {
            type: 'text',
            heading: '⚠️ The finger 4 trap — read this before you start',
            body: 'Every beginner hits this: your brain defaults to using all five fingers evenly (1-2-3-4-5). Triads only use three fingers: 1, 3, and 5. Finger 4 (ring finger) should not be touching the keys at all during root-position triads.\n\nHow to fix it before it becomes a habit:\n1. Before placing any triad, physically curl finger 4 slightly toward your palm and hold it there.\n2. Place only fingers 1, 3, and 5 on the keys. Check: is finger 4 floating? Good.\n3. Play the chord. If finger 4 sneaks down, stop, reset, and curl it again.\n4. Do this consciously for 3–5 sessions. It will feel awkward at first — that is normal. After a week it stops fighting you.\n\nThis is not a flaw in your hands. It is how every beginner\'s motor memory starts. You are just overriding the default pattern with the correct one.'
          },
          {
            type: 'two-col-drill',
            heading: 'Drill ladder (20 min)',
            intro: 'Do not move up a level until you hit the target cleanly. Advance to Week 3 only after passing Level 4 in 2 sessions in a row.',
            items: [
              { title: 'L1 — Shape only', detail: 'RH only. Play C, Dm, Em, F, G, Am in order and back at 60 BPM. Hold each for 4 beats. Check finger 4 is floating. Say the chord name aloud.' },
              { title: 'L2 — Add the root', detail: 'LH plays the root, RH plays the triad. Stay at 60 BPM until both hands land together with no searching.' },
              { title: 'L3 — Speed + recall', detail: 'Increase to 75 BPM. Keep naming each chord aloud. No pauses, no retries, no stopping after mistakes.' },
              { title: 'L4 — Random access', detail: 'Shuffle the order: F, Am, C, G, Dm, Em, back to C. Target: 75 BPM, both hands, immediate recognition.' },
            ] as any
          },
          {
            type: 'text',
            heading: '✓ Pass mark — you are ready for Week 3 when:',
            body: 'You can play all 6 triads (C, Dm, Em, F, G, Am) in root position with both hands at 70 BPM, naming each chord aloud, without hesitating or looking down for more than a second. Finger 4 stays off the keys.'
          }
        ]
      },
      {
        icon: 'ti-music',
        title: 'Week 3 — inversions',
        sectionType: 'practice',
        cards: [
          {
            type: 'text',
            heading: 'Why inversions matter more than any other technique in this phase',
            body: 'Root position triads sound correct but clunky when you move between chords — your hand leaps around the keyboard. Inversions solve this. By choosing the position of each chord that is physically closest to the previous one, you create smooth, connected chord movement with minimal hand travel.\n\nThis is the difference between a keyboard part that sounds "someone is changing chords" and one that sounds like a professional performance. Every buttery amapiano Rhodes voicing you have heard is built on inversion choice — the player is always picking the nearest shape, not the root position.\n\nThe goal of this week is not just to know 3 positions per chord — it is to feel a chord as a single flexible object with three faces, and to automatically choose the right face for the musical context.'
          },
          {
            type: 'tag-list',
            heading: 'Inversion shapes and fingering for C major',
            intro: 'Every triad has 3 positions. Fingering changes per position — learn these exactly:',
            items: [
              '<span class="tag tag-purple">Root position</span> C–E–G · Fingering: 1–3–5 · Hand sits naturally in the middle of the key cluster',
              '<span class="tag tag-teal">1st inversion</span> E–G–C · Fingering: 1–2–5 · The bottom interval is a minor 3rd (E to G), so fingers sit closer together',
              '<span class="tag tag-coral">2nd inversion</span> G–C–E · Fingering: 1–3–5 · Same spread as root position — back to the wide shape',
            ],
            body: 'The same fingering pattern applies to all white-key triads: root = 1-3-5, 1st inversion = 1-2-5, 2nd inversion = 1-3-5. The only exception is some black-key triads in later phases which require adjustment — ignore that for now.'
          },
          {
            type: 'text',
            heading: 'The inversion cycling exercise — exactly as useful as it sounds',
            body: 'This is the single most effective triad exercise you can do:\n\nFor one chord: Root position → 1st inversion → 2nd inversion → 1st inversion → Root position. Then move to the next chord.\n\nDo this for C, F, G, and Am. Then chain them: cycle C inversions, then move to F inversions starting from the nearest position to where C ended.\n\nThis exercise teaches your hand that a chord is one object — not three separate fingering puzzles. After a week of this, you will start automatically choosing the best inversion without thinking about it.'
          },
          {
            type: 'two-col-drill',
            heading: 'Drill ladder (25 min)',
            intro: 'Master one layer at a time. Move on only after two clean sessions in a row.',
            items: [
              { title: 'L1 — One chord cycling', detail: 'C major only: Root (1-3-5) → 1st inv (1-2-5) → 2nd inv (1-3-5) → back down. 50 BPM. No other chords yet. Check fingering on every position.' },
              { title: 'L2 — Three chords', detail: 'Repeat the full inversion cycle for Am and F at the same tempo. Goal: see each chord as one flexible object, not 3 separate shapes.' },
              { title: 'L3 — Closest path', detail: 'Play C → F → G using whichever inversion requires the least hand movement. 60 BPM. Your hand should barely travel.' },
              { title: 'L4 — Full progression', detail: 'Both hands: C → F → G → Am at 65 BPM. LH roots only, RH chooses the nearest inversion automatically. No pausing between chords.' },
            ] as any
          },
          {
            type: 'text',
            heading: '✓ Pass mark — you are ready for Week 4 when:',
            body: 'You can voice-lead C → F → G → Am using smooth inversions at 65 BPM with both hands, with no pausing between chords. Your RH should move less than an octave between any two chords. You can name which inversion you are playing on any chord without stopping to think.'
          }
        ]
      },
      {
        icon: 'ti-git-merge',
        title: 'Voice leading — moving chords smoothly',
        sectionType: 'theory',
        keysNeeded: 61,
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
        sectionType: 'practice',
        cards: [
          {
            type: 'tag-list',
            heading: 'Add the 7th — the deep house sound',
            items: [
              '<span class="tag tag-purple">Cmaj7</span> C–E–G–B (Fingering: 1-2-3-5 or 1-2-4-5)',
              '<span class="tag tag-teal">Dm7</span> D–F–A–C (Fingering: 1-2-3-5 or 1-2-4-5)',
              '<span class="tag tag-teal">Em7</span> E–G–B–D (Fingering: 1-2-3-5 or 1-2-4-5)',
              '<span class="tag tag-purple">Fmaj7</span> F–A–C–E (Fingering: 1-2-3-5 or 1-2-4-5)',
              '<span class="tag tag-amber">G7</span> G–B–D–F (dominant 7th) (Fingering: 1-2-3-5)',
              '<span class="tag tag-teal">Am7</span> A–C–E–G (Fingering: 1-2-3-5 or 1-2-4-5)',
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
          },
          {
            type: 'text',
            heading: 'Open voicings — make your chords sound wider and more professional',
            body: 'A close voicing stacks all chord notes as tight as possible (e.g. C–E–G–B in one hand). An open voicing spreads the notes across a wider range — usually splitting between left hand and right hand — so the chord breathes and sounds fuller.\n\nThe standard open voicing formula for 7th chords:\n• Left hand: root + 5th (or just root)\n• Right hand: 3rd + 7th (the shell)\n\nThis is the sound of Amapiano and deep house keyboard — the chord feels wide, airy, and sits cleanly in a mix without clashing with your bass.'
          },
          {
            type: 'two-col-drill',
            heading: 'Open voicing practice set',
            intro: 'For each chord: LH plays root + 5th (an octave or more apart), RH plays 3rd + 7th. Practice at 60 BPM, hold each for 4 beats.',
            items: [
              { title: 'Cmaj7 open', detail: 'LH: C + G  |  RH: E + B — wide, floating' },
              { title: 'Am7 open', detail: 'LH: A + E  |  RH: C + G — dark, spacious' },
              { title: 'Fmaj7 open', detail: 'LH: F + C  |  RH: A + E — lifted, hopeful' },
              { title: 'Dm7 open', detail: 'LH: D + A  |  RH: F + C — melancholy, rich' },
              { title: 'Gmaj7 open', detail: 'LH: G + D  |  RH: B + F# — bright, resolving' },
              { title: 'Em7 open', detail: 'LH: E + B  |  RH: G + D — introspective, smooth' },
            ] as any
          }
        ]
      },
    ],
    checkList: [
      'You can play all 7 triads in root position without looking at notes or hesitating',
      'You can play all 7 triads in all 3 inversions',
      'You can play all 6 seventh chords (Cmaj7, Dm7, Em7, Fmaj7, G7, Am7)',
      'You can transition between C–F–G–Am smoothly at 70 BPM without pausing',
      'Both hands can play the C major scale cleanly in parallel',      'You can play the A natural minor scale with both hands at 60 BPM',
      'You can name the interval between any two white keys in C major (e.g. C to E = Major 3rd)',
      'You can construct any major or minor triad from its root using the interval formula — no memorisation',    ]
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
        sectionType: 'practice',
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
          },
          {
            type: 'two-col-drill',
            heading: 'Technique ladder (15 min/day)',
            intro: 'Build control first, then speed. Only increase tempo after two clean rounds in a row.',
            items: [
              { title: 'L1 — Even fingers', detail: '5-finger pattern only at 60 BPM, one hand at a time. Goal: every note equal volume.' },
              { title: 'L2 — Add both hands', detail: 'Same pattern with both hands in parallel at 70 BPM. Goal: no uneven accents.' },
              { title: 'L3 — Chromatic control', detail: 'Chromatic scale up and down one octave at 60 BPM. Goal: no fingering panic on black keys.' },
              { title: 'L4 — Speed without tension', detail: 'Alternate 5-finger and chromatic patterns at 80–90 BPM while shoulders and wrists stay relaxed.' },
            ]
          },
          {
            type: 'text',
            heading: '✓ Pass mark — you are ready to move on when:',
            body: 'You can play the 5-finger drill and one-octave chromatic drill with both hands at 80 BPM, evenly and without hand tension, in 2 sessions in a row.'
          }
        ],
        checkList: [
          'Both hands stay relaxed while playing 5-finger patterns at 80 BPM.',
          'Chromatic fingering feels deliberate, not guessed.',
          'Volume stays even across weak and strong fingers for a full minute.',
        ]
      },
      {
        icon: 'ti-bolt',
        title: 'Soloing in C major — pentatonic first',
        sectionType: 'practice',
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
            type: 'two-col-drill',
            heading: 'Pentatonic drill ladder (15 min/day)',
            intro: 'Stay on a level until it feels boringly reliable. Then advance. Pass Level 4 twice before moving on.',
            items: [
              { title: 'L1 — Note map', detail: 'C–D–E–G–A–C up and down at 70 BPM. Say each note aloud. Goal: no wrong notes.' },
              { title: 'L2 — Rhythm control', detail: 'Same notes with swung 8ths at 75 BPM. Goal: timing stays even while the note choices stay easy.' },
              { title: 'L3 — Pattern thinking', detail: 'Play groups of 3 and 4: C–D–E, D–E–G, E–G–A, G–A–C. 80 BPM. Goal: stop thinking one note at a time.' },
              { title: 'L4 — Musical use', detail: 'Improvise over Am or Cmaj7 in your DAW at 100 BPM for 5 minutes using only the 5 pentatonic notes. End phrases on A or C.' },
            ] as any
          },
          {
            type: 'text',
            heading: '✓ Pass mark — you are ready to move on when:',
            body: 'You can improvise freely over an Am chord in your DAW for 2 minutes using only pentatonic notes, without running out of ideas or repeating the same 3-note riff. Your phrases should start and end on A or C.'
          }
        ],
        checkList: [
          'You can find the 5 pentatonic notes instantly without hunting.',
          'You can keep time at 100 BPM while improvising.',
          'Your phrases resolve intentionally to A or C instead of ending randomly.',
        ]
      },
      {
        icon: 'ti-piano',
        title: 'Bass fundamentals',
        sectionType: 'practice',
        keysNeeded: 61,
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
            heading: 'Bass fundamentals ladder',
            intro: 'Only add motion after the root feels automatic. Keep the groove clean before making it clever.',
            items: [
              { title: 'L1 — Root only', detail: 'Over Am7–Gmaj7–Fmaj7–Gmaj7, play one root note per bar at 90 BPM. Goal: land every change exactly.' },
              { title: 'L2 — Root + 5th', detail: 'Over Am, Dm, and Fmaj7, alternate root and 5th at 95 BPM. Goal: movement without confusion.' },
              { title: 'L3 — Octave pump', detail: 'Play root then octave over one chord at 100 BPM. Goal: keep the pulse even while jumping registers.' },
              { title: 'L4 — Walking connection', detail: 'Connect two chord roots with one scale step in between at 100 BPM. Goal: line still clearly targets the next root.' },
            ]
          },
          {
            type: 'text',
            heading: '✓ Pass mark — you are ready to move on when:',
            body: 'You can play a stable 8-bar bass part at 100 BPM that switches between root, root+5th, and octave motion without losing the chord target or the beat.'
          }
        ],
        checkList: [
          'You can hit the correct root on every chord change with no hesitation.',
          'Root + 5th patterns feel steady in time, not rushed.',
          'Octave shifting on your keyboard no longer breaks the groove.',
        ]
      },
      {
        icon: 'ti-flame',
        title: 'The blues scale — your first chromatic note',
        sectionType: 'practice',
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
            type: 'two-col-drill',
            heading: 'Blues ladder',
            intro: 'Treat E♭ as colour, not home base. The goal is control of tension, not just memorising a black key.',
            items: [
              { title: 'L1 — Find the note', detail: 'Play A–C–D–E♭–E–G slowly at 65 BPM. Goal: locate E♭ without looking confused.' },
              { title: 'L2 — Passing-tone control', detail: 'Practice D → E♭ → E and E → E♭ → D at 70 BPM. Goal: E♭ feels like a quick passing note, never a landing.' },
              { title: 'L3 — Fixed lick shapes', detail: 'Play 4 short licks using E♭ over Am at 75 BPM. Goal: hear the tension resolve correctly.' },
              { title: 'L4 — Improvised colour', detail: 'Improvise for 2 minutes over Am while using E♭ only as a passing or ghost note. Goal: no accidental resting on the blue note.' },
            ]
          },
          {
            type: 'text',
            heading: '✓ Pass mark — you are ready to move on when:',
            body: 'You can use E♭ in short phrases over Am without it sounding like a wrong note, because you consistently resolve it onward.'
          }
        ],
        checkList: [
          'You can find E♭ instantly between D and E.',
          'You use the blue note as motion, not as a resting note.',
          'Your blues phrases resolve back into A minor cleanly.',
        ]
      },
      {
        icon: 'ti-bolt',
        title: 'Amapiano-specific melodic patterns',
        sectionType: 'practice',
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
          },
          {
            type: 'two-col-drill',
            heading: 'Pattern ladder (10 min per pattern)',
            intro: 'Each level adds one real-world demand. Stay with the current level until it feels controlled, not lucky.',
            items: [
              { title: 'L1 — Shape only', detail: 'Play the pattern slowly with no backing track. 90 BPM. Repeat 8x without stopping.' },
              { title: 'L2 — Harmony attached', detail: 'Hold the matching chord in LH or the DAW while RH plays the riff. 100 BPM.' },
              { title: 'L3 — In-context groove', detail: 'Record the riff into your DAW at 110 BPM and loop it. Listen for whether it feels like a real amapiano line.' },
              { title: 'L4 — Chain patterns', detail: 'Connect Pattern 1 over Am into Pattern 2 over Fmaj7 at 105 BPM with no break between them.' },
            ] as any
          },
          {
            type: 'text',
            heading: '✓ Pass mark — you are ready to move on when:',
            body: 'You can play all 4 patterns from memory at 110 BPM, and chain at least 2 of them together over a simple Am–F–C–G loop in your DAW without stopping to think about the notes.'
          }
        ],
        checkList: [
          'All four patterns are memorised without looking at notes.',
          'You can attach the right chord underneath each pattern.',
          'Two-pattern transitions stay in time inside a DAW loop.',
        ]
      },
      {
        icon: 'ti-wave-square',
        title: 'Rhythm and feel',
        sectionType: 'practice',
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
          },
          {
            type: 'two-col-drill',
            heading: 'Groove ladder — DAW exercise (15 min)',
            intro: 'One layer at a time: timing first, then placement, then velocity, then the combined feel.',
            items: [
              { title: 'L1 — Straight grid', detail: 'Play Am7 on beat 1 only at 110 BPM. Hear how square it feels.' },
              { title: 'L2 — Early push', detail: 'Move the stab 1/16 early. Goal: hear the forward pull without losing the pocket.' },
              { title: 'L3 — Velocity contour', detail: 'Accent beats 1 and 3, ghost beats 2 and 4. Goal: make the same rhythm feel human.' },
              { title: 'L4 — Full groove', detail: 'Combine early placement with velocity shaping over a 4-bar loop. Goal: groove feels intentional, not random.' },
            ] as any
          },
          {
            type: 'text',
            heading: '✓ Pass mark — you are ready to move on when:',
            body: 'You can record a 4-bar Am7 chord part in your DAW at 110 BPM where the groove feels pulled forward (stabs pushed early) and the velocity variation makes it sound like a real performance, not a robot. Play it to someone — if they nod or move, you\'re done.'
          }
        ],
        checkList: [
          'You can hear the difference between stiff on-grid and pushed groove.',
          'Velocity accents change feel without changing notes.',
          'Your DAW recording sounds like a performance, not a typed-in block.',
        ]
      },
      {
        icon: 'ti-wave-square',
        title: 'Syncopation — the heartbeat of house music',
        sectionType: 'practice',
        cards: [
          {
            type: 'text',
            heading: 'What is syncopation?',
            body: 'Syncopation means placing emphasis on beats or subdivisions that are normally weak — the "ands" and "e\'s" between the main beats. In 4/4 time, beats 1, 2, 3, 4 are the strong grid. The "and" of each beat (the 8th note in between) is off-beat. Playing notes that land on these off-beats creates forward momentum, tension, and groove — the engine of amapiano and deep house alike.'
          },
          {
            type: 'tag-list',
            heading: 'Rhythmic subdivisions you need to know',
            items: [
              '<span class="tag tag-purple">Quarter note</span> 1 beat. "1 – 2 – 3 – 4". 4 per bar. The basic pulse.',
              '<span class="tag tag-teal">8th note</span> Half a beat. "1 and 2 and 3 and 4 and". 8 per bar. Standard amapiano sub-bass pump.',
              '<span class="tag tag-blue">16th note</span> Quarter of a beat. "1 e and a, 2 e and a…". 16 per bar. Where amapiano piano riffs live.',
              '<span class="tag tag-amber">Dotted 8th</span> 3/4 of a beat. Creates the "skip" feel. Deep house chord stab rhythm.',
            ]
          },
          {
            type: 'two-col-drill',
            heading: 'Syncopation ladder',
            intro: 'Start with obvious contrast. Then train your ear to feel off-beat placement as intentional groove.',
            items: [
              { title: 'L1 — On-beat control', detail: 'Chord on beat 1 and 3 only. Feel the square grid at 112 BPM.' },
              { title: 'L2 — Off-beat stab', detail: 'Chord on the "and" of 2 and "and" of 4. Goal: feel the pull forward.' },
              { title: 'L3 — 16th-note push', detail: 'Place one chord on the "e" of beat 3. Goal: hear the amapiano lean clearly.' },
              { title: 'L4 — Ghost + accent', detail: 'Combine soft on-beat support with a strong off-beat answer. Goal: groove speaks like a phrase.' },
            ]
          },
          {
            type: 'list',
            heading: 'DAW exercise — feel vs grid',
            items: [
              'Open your DAW and lay a kick on beats 1 and 3, snare on 2 and 4',
              'Record a chord on every beat (on-beat) — note how it feels locked and stiff',
              'Now shift each chord forward by one 16th note (early) — hear the groove emerge',
              'Quantize to 16th notes but set swing to 55–65% — this is the amapiano timing feel',
            ]
          }
        ],
        checkList: [
          'You can place stabs on off-beats without losing count.',
          'You can hear when a syncopated pattern pulls better than an on-beat one.',
          'Your DAW loop keeps groove after quantizing and swing adjustment.',
        ]
      },
      {
        icon: 'ti-music-bolt',
        title: 'Suspended chords — sus2 and sus4',
        sectionType: 'theory',
        cards: [
          {
            type: 'text',
            heading: 'What are suspended chords?',
            body: 'A suspended chord replaces the 3rd of a triad with either the 2nd (sus2) or the 4th (sus4). Because the 3rd is what determines major or minor quality, suspended chords are ambiguous — they belong to neither. This creates tension that resolves beautifully when the 3rd returns. Suspended chords add anticipation before a chord resolves and create that floating, breathless moment before the drop.'
          },
          {
            type: 'tag-list',
            heading: 'The formulas',
            items: [
              '<span class="tag tag-purple">sus2</span> Root + Major 2nd (2 semitones) + Perfect 5th (7 semitones). Csus2 = C–D–G. Open, airy, unresolved.',
              '<span class="tag tag-teal">sus4</span> Root + Perfect 4th (5 semitones) + Perfect 5th (7 semitones). Gsus4 = G–C–D. Tense, anticipatory.',
              '<span class="tag tag-blue">Resolution</span> Gsus4 → G major: the C (suspended 4th) moves down one step to B (the natural 3rd). This one-note move creates enormous satisfying resolution.',
            ]
          },
          {
            type: 'tag-list',
            heading: 'White-key sus chords in C major / A minor',
            items: [
              '<span class="tag tag-purple">Csus2</span> C–D–G',
              '<span class="tag tag-purple">Fsus2</span> F–G–C',
              '<span class="tag tag-teal">Gsus4</span> G–C–D',
              '<span class="tag tag-teal">Asus4</span> A–D–E',
              '<span class="tag tag-blue">Dsus2</span> D–E–A',
              '<span class="tag tag-blue">Esus4</span> E–A–B',
            ]
          }
        ]
      },
      {
        icon: 'ti-music-bolt',
        title: 'Suspended chord drill ladder',
        sectionType: 'practice',
        cards: [
          {
            type: 'two-col-drill',
            heading: 'Suspended chord ladder',
            intro: 'First hear the suspension, then hear the release. The release is the point.',
            items: [
              { title: 'L1 — Single shape', detail: 'Play Csus2 and Gsus4 slowly at 60 BPM. Goal: know the shape instantly.' },
              { title: 'L2 — Resolve the note', detail: 'Move Csus2 → Cmaj and Gsus4 → G major at 60 BPM. Goal: hear the exact note that resolves.' },
              { title: 'L3 — Cadence use', detail: 'Play Gsus4 → G7 → Cmaj7 and Asus4 → Am7 at 70 BPM. Goal: hear tension then release inside a progression.' },
              { title: 'L4 — Intro texture', detail: 'Hold a sus chord for 4 bars in your DAW, then resolve on bar 5. Goal: create intentional anticipation before release.' },
            ]
          }
        ],
        checkList: [
          'You can play sus2 and sus4 shapes without mixing them up.',
          'You can hear and execute the resolving note clearly.',
          'You can use a sus chord as setup, not as a random substitute.',
        ]
      },
    ],
    checkList: [
      'C major scale, both hands, clean at 100 BPM (16th notes)',
      'C major pentatonic — you can improvise freely for 2 minutes without running out of ideas',
      'You can play all 4 amapiano patterns from memory, in time',
      '5-finger hanon drill clean at 90 BPM both hands',
      'You\'ve recorded at least one melodic riff into your DAW that you\'re happy with',
      'You can play all sus2 and sus4 chords in C major / A minor (Csus2, Gsus4, Asus4, Dsus2) and resolve each one',
      'You can place a chord stab on the "and" of beat 2 in your DAW at 112 BPM — it feels right, not stiff',
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
        icon: 'ti-topology-ring',
        title: 'Harmonic function — why progressions work or sound broken',
        sectionType: 'theory',
        cards: [
          {
            type: 'text',
            heading: 'The grammar of harmony',
            body: 'Random chords sound bad for a reason — not taste, physics. Every chord in a key belongs to one of three function groups. Harmony has grammar: violate it and the music feels unresolved, clunky, or just "off." Understand it and you can predict what will sound good before you play it.\n\nThe three functions:\n• Tonic (T) — home, stable, restful. The listener feels settled.\n• Subdominant (S) — movement away from home. Gentle tension, forward lean.\n• Dominant (D) — maximum tension. The listener\'s ear urgently expects resolution back to Tonic.'
          },
          {
            type: 'numeral-grid',
            heading: 'Which chord belongs to which function',
            intro: 'In C major:',
            numerals: [
              { label: 'I — T', chord: 'C maj — Home', style: 'background:rgba(139,126,248,0.25);border:1px solid rgba(139,126,248,0.5)' },
              { label: 'ii — S', chord: 'D min — Pre-dom', style: 'background:rgba(52,211,153,0.15);border:1px solid rgba(52,211,153,0.3)' },
              { label: 'iii — T', chord: 'E min — Home (weak)', style: 'background:rgba(139,126,248,0.15);border:1px solid rgba(139,126,248,0.3)' },
              { label: 'IV — S', chord: 'F maj — Movement', style: 'background:rgba(52,211,153,0.15);border:1px solid rgba(52,211,153,0.3)' },
              { label: 'V — D', chord: 'G maj — Tension', style: 'background:rgba(251,191,36,0.2);border:1px solid rgba(251,191,36,0.4)' },
              { label: 'vi — T', chord: 'A min — Home (dark)', style: 'background:rgba(139,126,248,0.15);border:1px solid rgba(139,126,248,0.3)' },
              { label: 'vii° — D', chord: 'B dim — Tension', style: 'background:rgba(251,191,36,0.15);border:1px solid rgba(251,191,36,0.3)' },
            ],
            body: 'T = Tonic (home). S = Subdominant (away). D = Dominant (tension).'
          },
          {
            type: 'text',
            heading: 'The natural flow — and what breaks it',
            body: 'Harmony flows naturally in one direction:\n\n  Tonic → Subdominant → Dominant → Tonic\n\nThis is why I–IV–V–I sounds inevitable. The I chord settles you, IV pulls you forward, V builds maximum tension, and the return to I feels like a release.\n\nWhat sounds broken and why:\n\n• V → IV (Dominant back to Subdominant) — the most common "why does this sound wrong?" mistake. You built a sneeze and then didn\'t sneeze. The tension deflates without resolving. G7 → F in C major sounds evasive and unfinished.\n\n• vii° → IV or vii° → ii — same problem. Diminished chord screams for resolution to I. Going sideways to S instead feels like a stumble.\n\n• IV → I (Plagal cadence) — this works, but has a very specific sound: "Amen." Gospel, soulful, reflective. It\'s a soft resolution — Subdominant skipping Dominant entirely. Intentional use only.\n\n• iii → anywhere — iii (Em in C major) is a weak tonic. Avoid landing on it as a destination. It works as a passing chord (I → iii → IV sounds like subtle tension building).'
          },
          {
            type: 'tag-list',
            heading: 'The two strongest resolution moves — burn these into your ear',
            items: [
              '<span class="tag tag-amber">V → I (Authentic cadence)</span> G7 → Cmaj7. The strongest resolution in Western harmony. Builds urgency (G7 contains the tritone B–F) then releases it completely when you land on C. This is why every pop, gospel, jazz, and house track uses it.',
              '<span class="tag tag-purple">ii → V → I (Full cadence)</span> Dm7 → G7 → Cmaj7. The jazz and neo-soul formula. ii sets up pre-dominant motion, V creates maximum tension with the tritone, I resolves. The smoother you voice-lead between these three, the more sophisticated it sounds.',
              '<span class="tag tag-teal">V → vi (Deceptive cadence)</span> G7 → Am7. The ear expects I but gets vi instead. Sounds surprising but not wrong — vi is still a Tonic-function chord, just the dark version. SA house and gospel use this constantly to extend a progression without resolving fully.',
              '<span class="tag tag-coral">Avoid: V → IV</span> G7 → Fmaj7. The "broken" move. Dominant going backwards to Subdominant. Fine as a passing moment, terrible as a cadence. This is likely what you were playing when things sounded off.',
            ]
          },
          {
            type: 'two-col-drill',
            heading: 'Hear the difference — function comparison drill',
            intro: 'Play each pair and hear how one resolves and the other doesn\'t:',
            items: [
              { title: 'G7 → Cmaj7 ✓', detail: 'Tension fully resolves. Dominant → Tonic. Feels inevitable.' },
              { title: 'G7 → Fmaj7 ✗', detail: 'Tension deflates. Dominant → Subdominant. Sounds evasive.' },
              { title: 'Dm7 → G7 → C ✓', detail: 'Full cadence. S → D → T. Maximum satisfaction.' },
              { title: 'Fmaj7 → G7 → Am7 ✓', detail: 'Deceptive cadence. Surprised but resolved — works!' },
              { title: 'G7 → Em7 → Am7', detail: 'D → T (weak) → T. Meandering but usable in jazz house.' },
              { title: 'C → Am → Dm → G → C ✓', detail: 'T → T → S → D → T. Complete harmonic sentence.' },
            ]
          },
          {
            type: 'text',
            heading: 'Why your random Am and C major were almost right',
            body: 'C major (I) and A minor (vi) are both Tonic-function chords — home chords. Playing them together sounds okay because you were cycling within one function group. No tension was being built or released — the music just drifted.\n\nThe moment you added G7, something happened — because G7 is the Dominant. It created tension that wanted to resolve. If it resolved to C or Am, it sounded right. If it went to F instead, it sounded off.\n\nYour ear already knew this. You just didn\'t have the vocabulary to explain it.'
          }
        ]
      },
      {
        icon: 'ti-list-numbers',
        title: 'What the numbering system is',
        sectionType: 'theory',
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
        icon: 'ti-circle-dot',
        title: 'The circle of fifths — how all keys relate',
        sectionType: 'theory',
        cards: [
          {
            type: 'text',
            heading: 'The map of all keys',
            body: 'The circle of fifths is a diagram showing all 12 major keys arranged so that each key is a perfect 5th (7 semitones) away from its neighbours. Moving clockwise = up a 5th (C → G → D → A…). Moving anticlockwise = up a 4th (C → F → B♭ → E♭…). Keys next to each other share almost all the same notes — easy to modulate between. Keys on opposite sides share almost nothing.'
          },
          {
            type: 'tag-list',
            heading: 'Clockwise from C (sharps)',
            items: [
              '<span class="tag tag-purple">C major</span> 0 sharps — all white keys. Your home base.',
              '<span class="tag tag-blue">G major</span> 1 sharp (F#) — warm, slightly brighter.',
              '<span class="tag tag-blue">D major</span> 2 sharps (F#, C#) — open and confident.',
              '<span class="tag tag-teal">A major</span> 3 sharps — bright, afro-house feel.',
              '<span class="tag tag-teal">E major</span> 4 sharps — bright, tense.',
            ]
          },
          {
            type: 'tag-list',
            heading: 'Anticlockwise from C (flats)',
            items: [
              '<span class="tag tag-teal">F major</span> 1 flat (B♭) — warm, soulful. Common SA house key.',
              '<span class="tag tag-teal">B♭ major</span> 2 flats (B♭, E♭) — deep, gospel-friendly.',
              '<span class="tag tag-blue">E♭ major</span> 3 flats — dark, cinematic. Common in neo-soul.',
              '<span class="tag tag-blue">A♭ major</span> 4 flats — lush, filmic.',
            ]
          },
          {
            type: 'tag-list',
            heading: 'Relative minor keys (share the same notes)',
            items: [
              '<span class="tag tag-purple">C major ↔ A minor</span> Same notes, different emotional centre. Your primary pair.',
              '<span class="tag tag-teal">G major ↔ E minor</span> One sharp. E minor is harder, more urgent.',
              '<span class="tag tag-teal">F major ↔ D minor</span> One flat. D minor is deep, melancholic — very common in SA house.',
              '<span class="tag tag-blue">B♭ major ↔ G minor</span> Two flats. G minor is dark and gospel-heavy.',
            ]
          },
          {
            type: 'two-col-drill',
            heading: 'Apply the same progression across near keys',
            items: [
              { title: 'i–VII–VI–VII in Am', detail: 'Am–G–F–G (your home key, all white)' },
              { title: 'i–VII–VI–VII in Dm', detail: 'Dm–C–B♭–C (one step anticlockwise — adds B♭)' },
              { title: 'i–VII–VI–VII in Em', detail: 'Em–D–C–D (one step clockwise — adds F#)' },
              { title: 'I–vi–IV–V in C', detail: 'C–Am–F–G (home major)' },
              { title: 'I–vi–IV–V in G', detail: 'G–Em–C–D (one step clockwise, add F# on Em)' },
            ]
          }
        ]
      },
      {
        icon: 'ti-arrow-up-circle',
        title: 'Harmonic minor — the raised 7th and why it matters',
        sectionType: 'theory',
        cards: [
          {
            type: 'text',
            heading: 'The problem with natural minor\'s V chord',
            body: 'In A natural minor, the V chord is Em (E–G–B). Em has a weak pull back to Am — the resolution feels soft and unconvincing. This is because G is only a whole step below A. The harmonic minor scale fixes this by raising the 7th note (G → G#), creating a semitone leading tone that urgently wants to resolve up to A. This transforms Em into E major (E–G#–B) — a powerful V chord.'
          },
          {
            type: 'tag-list',
            heading: 'A harmonic minor scale',
            intro: 'A – B – C – D – E – F – G# – A',
            items: [
              '<span class="tag tag-coral">The change</span> G is raised to G# — one black key. Everything else stays the same as natural minor.',
              '<span class="tag tag-purple">Effect on the V chord</span> Em becomes E major (E–G#–B). G# is the leading tone — it pulls forcefully up to A.',
              '<span class="tag tag-teal">Characteristic interval</span> F to G# is an augmented 2nd (3 semitones) — gives harmonic minor its dramatic, slightly exotic quality.',
            ]
          },
          {
            type: 'two-col-drill',
            heading: 'Where to use harmonic minor',
            items: [
              { title: 'Fmaj7 → E7 → Am7', detail: 'E7 (with G#) creates urgent pull to Am. Gospel and neo-soul move.' },
              { title: 'Dm7 → E7 → Am7', detail: 'Full ii–V–i in minor using harmonic minor V. Jazz-house cadence.' },
              { title: 'Am vamp with E7 at phrase ends', detail: 'Keep natural minor through the loop, bring E7 on the last bar for resolution emphasis.' },
            ]
          },
          {
            type: 'list',
            heading: 'Natural minor vs harmonic minor — the key difference',
            items: [
              'A natural minor: V chord = Em (minor) — soft resolution',
              'A harmonic minor: V chord = E major / E7 (major/dominant) — strong, dramatic resolution',
              'In practice: play natural minor for most of the progression, switch to E7 just before resolving back to Am',
            ]
          }
        ]
      },
      {
        icon: 'ti-list-numbers',
        title: 'Common progressions — deep analysis',
        sectionType: 'theory',
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
        sectionType: 'theory',
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
        ]
      },
      {
        icon: 'ti-arrow-right-circle',
        title: 'Secondary dominant drill ladder',
        sectionType: 'practice',
        cards: [
          {
            type: 'two-col-drill',
            heading: 'Secondary dominant ladder',
            intro: 'Start by hearing one borrowed note create pull. Then place it inside real progressions.',
            items: [
              { title: 'L1 — Single resolution', detail: 'Play C7 → Fmaj7, D7 → G7, and E7 → Am7 slowly at 65 BPM. Goal: hear the borrowed note resolve.' },
              { title: 'L2 — Two-step chain', detail: 'Play D7 → G7 → Cmaj7 at 70 BPM. Goal: hear how one dominant points to the next.' },
              { title: 'L3 — Add to a known loop', detail: 'Insert E7 into an Am-based progression at 75 BPM. Goal: the borrowed chord sounds like an arrival setup, not a mistake.' },
              { title: 'L4 — DAW reharmonisation', detail: 'Take one of P1–P8 and add a secondary dominant before one target chord in your DAW. Goal: the colour feels intentional.' },
            ]
          }
        ],
        checkList: [
          'You can hear the borrowed note inside a secondary dominant.',
          'You can resolve at least three secondary dominants cleanly by ear and by hand.',
          'You can add one secondary dominant to a familiar progression without breaking the feel.',
        ]
      },
      {
        icon: 'ti-star',
        title: 'Studio-ready milestone',
        sectionType: 'practice',
        keysNeeded: 61,
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
      'You can play I–vi–IV–V in at least 3 different keys using the circle of fifths as your map',
      'You can listen to a track and roughly identify where the I chord is and whether it is major or minor',
      'You\'ve built at least one original chord progression using numbers in your DAW',
      'You can explain why E7 (not Em) is used as the V chord in A harmonic minor progressions',
      'You can name the relative minor of any major key you work in (e.g. F major → D minor)',
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
        sectionType: 'theory',
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
        sectionType: 'theory',
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
              'Set your DAW to 112 BPM (Ideal BPM for Amapiano)',
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
        sectionType: 'theory',
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
        sectionType: 'theory',
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
        sectionType: 'practice',
        keysNeeded: 61,
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
          },
          {
            type: 'two-col-drill',
            heading: 'Bassline ladder (2 sessions per level)',
            intro: 'Start simple. Only add motion after the previous level feels automatic and steady in time.',
            items: [
              { title: 'L1 — Root only', detail: 'At 100 BPM, play root notes only over Am7–Gmaj7–Fmaj7–Gmaj7. One note per bar, perfectly in time.' },
              { title: 'L2 — Root + 5th', detail: 'At 105 BPM, add the 5th on beat 3 for each chord. Goal: movement without losing harmonic clarity.' },
              { title: 'L3 — Genre split', detail: 'Play the same loop two ways: deep house hold style, then amapiano 8th-note pump style at 110 BPM.' },
              { title: 'L4 — Musical variation', detail: 'At 115 BPM, add one approach note or octave jump per bar without losing the groove or chord target.' },
            ]
          },
          {
            type: 'text',
            heading: '✓ Pass mark — you are ready to move on when:',
            body: 'You can play one 8-bar bass part in two versions — deep house and amapiano — over the same chord loop, in time, at 110–115 BPM, for 2 sessions in a row without losing the root target on any chord change.'
          }
        ],
        checkList: [
          'You can switch between deep house and amapiano bass feel on the same loop.',
          'Approach notes still resolve to the correct root target.',
          'Your bassline stays locked to the groove at 110 BPM or above.',
        ]
      },
      {
        icon: 'ti-octagon',
        title: 'Diminished 7th chords — the tension tool',
        sectionType: 'theory',
        cards: [
          {
            type: 'text',
            heading: 'Beyond the vii° triad',
            body: 'In Phase 1 the B diminished triad was flagged as "avoid for now". Here is now. A fully diminished 7th chord (dim7) stacks four minor 3rds on top of each other, creating equal tension in all directions. It can resolve to a chord a semitone above or below any of its notes — which makes it one of the most flexible passing chords in gospel, neo-soul, and SA house.'
          },
          {
            type: 'tag-list',
            heading: 'Dim7 chords you will actually use',
            items: [
              '<span class="tag tag-amber">Bdim7</span> B–D–F–A♭ — resolves naturally to Cmaj7 (semitone below C). The built-in one in C major.',
              '<span class="tag tag-amber">G#dim7</span> G#–B–D–F — resolves to Am7. Adds dramatic tension before the minor tonic. Very gospel.',
              '<span class="tag tag-amber">C#dim7</span> C#–E–G–B♭ — resolves to Dm7. Use as a passing chord between Cmaj7 and Dm7.',
            ]
          },
        ]
      },
      {
        icon: 'ti-octagon',
        title: 'Diminished drill ladder',
        sectionType: 'practice',
        cards: [
          {
            type: 'two-col-drill',
            heading: 'Diminished ladder',
            intro: 'Use dim7 as a passing event, not a destination. One beat of tension, then release.',
            items: [
              { title: 'L1 — Hear the pull', detail: 'Play Bdim7 → Cmaj7 and G#dim7 → Am7 at 60 BPM. Goal: hear the semitone resolution clearly.' },
              { title: 'L2 — Passing chord slot', detail: 'Play Cmaj7 → C#dim7 → Dm7 and Fmaj7 → Bdim7 → Cmaj7 at 65 BPM. Goal: dim7 lasts briefly but speaks strongly.' },
              { title: 'L3 — Phrase ending fill', detail: 'Use dim7 only on the last beat before a chord change in a 4-bar loop. Goal: add colour without derailing the groove.' },
              { title: 'L4 — DAW application', detail: 'Place one dim7 passing chord into a progression in your DAW and compare before/after. Goal: tension increase feels musical, not random.' },
            ]
          }
        ],
        checkList: [
          'You can resolve at least two dim7 chords by ear.',
          'You can place dim7 briefly without turning it into a destination chord.',
          'Your passing diminished chord increases tension before release.',
        ]
      },
      {
        icon: 'ti-anchor',
        title: 'Pedal tones — static bass under moving chords',
        sectionType: 'practice',
        keysNeeded: 61,
        cards: [
          {
            type: 'text',
            heading: 'What is a pedal tone?',
            body: 'A pedal tone is a sustained or repeated bass note that stays the same while the chords above it change. The harmonic tension between the static bass and the moving chords creates floating, hypnotic energy — one of the most used textures in deep house and amapiano intros, build-ups, and breakdowns. You do not need to play complex basslines. You need one note, held with conviction.'
          },
          {
            type: 'tag-list',
            heading: 'The three pedal tone contexts',
            items: [
              '<span class="tag tag-purple">Tonic pedal</span> Hold A (the root of Am) in the bass while chords above change: Am7 → Fmaj7 → Gsus4 → G7, all over a sustained A. Creates a grounded, meditative pull.',
              '<span class="tag tag-teal">Dominant pedal</span> Hold E (the 5th) in the bass while chords shift above it. Very common in build-up sections — tension mounts because the E wants to resolve.',
              '<span class="tag tag-blue">Chromatic pedal</span> Hold a bass note that does not belong to the key — e.g. hold B♭ while Am–G–Fmaj7 plays above. Creates an unsettled, searching feel. Use in breakdowns.',
            ]
          },
          {
            type: 'list',
            heading: 'DAW exercise — pedal tone drop',
            items: [
              'Set up your i–VII–VI–VII progression (Am–G–F–G) with full chord MIDI',
              'Add a separate bass track: draw in a sustained A note for the full 8 bars — no movement',
              'Play it back. Notice how F and G chords create tension against the A bass — they want to resolve',
              'Now duplicate the section and give the bass normal root movement for comparison',
              'The pedal version is your intro or breakdown; the moving bass version is your main loop',
            ]
          },
          {
            type: 'text',
            heading: '✓ Pass mark — you are ready to move on when:',
            body: 'You have built a full 8-bar section in your DAW that uses a tonic pedal (sustained root in the bass) under a 4-chord progression. Play it back and confirm: the chords above the pedal create tension that feels intentional and hypnotic, not accidental. Bonus: record a second version where the pedal drops out and root movement starts — the contrast should be obvious.'
          }
        ],
        checkList: [
          'You can hold one pedal tone while hearing chord tension change above it.',
          'You can compare pedal-tone vs moving-bass versions of the same loop.',
          'The pedal effect sounds hypnotic rather than muddy.',
        ]
      },
      {
        icon: 'ti-arrows-exchange',
        title: 'Modulation — changing key inside a track',
        sectionType: 'theory',
        cards: [
          {
            type: 'text',
            heading: 'What is modulation and why it matters in production?',
            body: 'Modulation is changing the musical key within a track. You are not just transposing the whole track — you are moving the emotional home base to create lift, tension, or a fresh feel at a specific moment. In SA house and amapiano, modulation is often used between the intro/verse and the main drop, or when a track needs to build energy without adding more instruments. Even a move of a semitone or a tone upward creates a powerful sense of elevation.'
          },
          {
            type: 'tag-list',
            heading: '3 modulation techniques producers actually use',
            items: [
              '<span class="tag tag-purple">Direct modulation (truck driver shift)</span> End a section in Am, start the next section in Bm or B♭m — no transition chord. Cut and move. Simple, effective, used in gospel and amapiano drops constantly.',
              '<span class="tag tag-teal">Pivot chord modulation</span> Find a chord that belongs to both the current key and the target key, use it as the bridge. E.g. moving from C major to G major: Dm7 exists in both (ii in C, vi in G). Hold Dm7, then treat the next chord as if you are in G major.',
              '<span class="tag tag-blue">Dominant pivot</span> Play a V7 chord of your target key right before the modulation. Moving to Dm? Play A7 (the V7 of D minor) just before. The ear hears the dominant and expects the new key to resolve.',
            ]
          },
        ]
      },
      {
        icon: 'ti-arrows-exchange',
        title: 'Modulation drill ladder',
        sectionType: 'practice',
        cards: [
          {
            type: 'two-col-drill',
            heading: 'Modulation ladder',
            intro: 'Start with obvious lift, then learn cleaner transition methods.',
            items: [
              { title: 'L1 — Direct shift', detail: 'Play 8 bars in Am, then cut directly to Bm or B♭m. Goal: hear the energy lift immediately.' },
              { title: 'L2 — Dominant pivot', detail: 'Use A7 before Dm at 70 BPM. Goal: the new key feels prepared, not accidental.' },
              { title: 'L3 — Pivot chord', detail: 'Hold one shared chord for a bar, then reinterpret it into the new key. Goal: smoother transition.' },
              { title: 'L4 — Track section design', detail: 'Build an 8-bar pre-drop and 8-bar drop in different keys inside your DAW. Goal: modulation creates section lift, not confusion.' },
            ]
          }
        ],
        checkList: [
          'You can hear when the home key has changed.',
          'You can execute both a direct and a prepared modulation.',
          'A new section feels lifted rather than like a wrong chord.',
        ]
      },
    ],
    checkList: [
      'You\'ve finished at least one complete deep house demo (verse + chorus chord loop, melody, bass)',
      'You\'ve recorded a full amapiano piano riff section at 112 BPM with chord stabs',
      'When you hear a track, you can roughly say "that\'s a i–VII–VI progression"',
      'You can transpose a chord progression to a new key in under 30 seconds using the circle of fifths',
      'You\'ve used at least one pedal tone in a production — sustained bass note while chords move above it',
      'You\'ve modulated between two keys in a DAW project (even a simple direct shift up a tone)',
      'You can use a dim7 chord as a passing chord between two diatonic chords in C major or A minor',
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
        sectionType: 'theory',
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
        icon: 'ti-palette',
        title: 'Borrowed chord drill ladder',
        sectionType: 'practice',
        cards: [
          {
            type: 'two-col-drill',
            heading: 'Borrowed chord ladder',
            intro: 'Bring in one borrowed colour at a time so your ear learns what changed emotionally.',
            items: [
              { title: 'L1 — Single colour swap', detail: 'Play C–B♭–F–C slowly. Goal: hear the ♭VII lift against a major home key.' },
              { title: 'L2 — Minor colour insertion', detail: 'Play Fmaj7 → Fm → Cmaj7. Goal: hear the iv chord darken the return home.' },
              { title: 'L3 — Minor-key brightening', detail: 'Play Am7–Gmaj7–D–Am7. Goal: hear the major IV brighten the minor world.' },
              { title: 'L4 — Original loop', detail: 'Write one 4-chord loop in your DAW that uses exactly one borrowed chord on purpose. Goal: you can explain what emotional job it does.' },
            ]
          }
        ],
        checkList: [
          'You can hear the emotional shift caused by one borrowed chord.',
          'You can use a borrowed chord without losing the key center.',
          'You can explain why you chose that borrowed chord in your loop.',
        ]
      },
      {
        icon: 'ti-arrow-loop-right',
        title: 'Secondary dominants — full treatment',
        sectionType: 'theory',
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
        sectionType: 'practice',
        keysNeeded: 61,
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
          },
          {
            type: 'text',
            heading: 'Open voicings with extensions — the Amapiano signature sound',
            body: 'When you combine open voicings with extensions, you get the lush, wide chord textures that define Amapiano keyboard playing. The trick: spread root and 9th in the left hand, put the 3rd–7th shell in the right hand, and optionally add the 11th or 13th on top.\n\nThis works because the extensions (9th, 11th, 13th) are just higher octave versions of scale notes you already know — so open voicing naturally creates space for them without the chord feeling cluttered.'
          },
          {
            type: 'two-col-drill',
            heading: 'Open + extended voicing examples (Amapiano-ready)',
            intro: 'Practice at 70 BPM. Hold each voicing for 4 bars. Listen to how wide and professional each chord sounds compared to a close voicing.',
            items: [
              { title: 'Am9 open', detail: 'LH: A + E  |  RH: C–G–B  (root–5th | 3rd–7th–9th)' },
              { title: 'Fmaj9 open', detail: 'LH: F + C  |  RH: A–E–G  (root–5th | 3rd–7th–9th)' },
              { title: 'Cmaj9 open', detail: 'LH: C + G  |  RH: E–B–D  (root–5th | 3rd–7th–9th)' },
              { title: 'Dm11 open', detail: 'LH: D + A  |  RH: F–C–E  (root–5th | 3rd–7th–11th)' },
              { title: 'G13 open', detail: 'LH: G + D  |  RH: B–F–A  (root–5th | 3rd–7th–13th)' },
              { title: 'Am11 open', detail: 'LH: A + E  |  RH: C–G–D  (root–5th | 3rd–7th–11th)' },
            ] as any
          }
        ],
        checkList: [
          'You can build at least three extension voicings from memory.',
          'The chord stays wide and clear instead of cramped.',
          'You can place an extended voicing into a progression without breaking time.',
        ]
      },
      {
        icon: 'ti-git-merge',
        title: 'Voice leading at depth',
        sectionType: 'theory',
        keysNeeded: 61,
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
        sectionType: 'practice',
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
          },
          {
            type: 'two-col-drill',
            heading: 'Production blues ladder',
            intro: 'Start with memorised licks, then bend them into your own phrases over a real loop.',
            items: [
              { title: 'L1 — Memorise two licks', detail: 'Learn Lick 1 and Lick 2 at 70 BPM. Goal: no note hunting.' },
              { title: 'L2 — Resolve correctly', detail: 'Play each lick over Am and end on A, C, or E. Goal: blue note tension resolves inside the key.' },
              { title: 'L3 — Phrase variation', detail: 'Change the rhythm of one lick while keeping the pitch idea. Goal: sound less copied, more controlled.' },
              { title: 'L4 — DAW context', detail: 'Record an 8-bar phrase over an Am loop using at least one blue note phrase and one clean pentatonic phrase.' },
            ]
          }
        ],
        checkList: [
          'You can play at least two blues licks from memory.',
          'Blue notes resolve intentionally inside your phrases.',
          'Your recorded phrase sounds musical over a loop, not like scale practice.',
        ]
      },
      {
        icon: 'ti-key',
        title: 'Taking it into new keys',
        sectionType: 'practice',
        keysNeeded: 61,
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
          ,
          {
            type: 'two-col-drill',
            heading: 'Transposition ladder',
            intro: 'Move one known progression into nearby keys before jumping further out.',
            items: [
              { title: 'L1 — A minor to D minor', detail: 'Move i–VII–VI–VII from Am to Dm slowly. Goal: only one new black key appears and you stay calm.' },
              { title: 'L2 — C major to G major', detail: 'Move I–vi–IV–V into G. Goal: one-sharp key feels like the same pattern, not a new song.' },
              { title: 'L3 — Random key callout', detail: 'Pick a progression number pattern, then name and play it in one new key within 10 seconds.' },
              { title: 'L4 — Producer transfer', detail: 'Take one loop you already wrote and transpose the whole harmonic idea into a new key in your DAW.' },
            ]
          }
        ],
        checkList: [
          'You can move one known progression into a nearby key without panic.',
          'You think in numbers more than note names while transposing.',
          'A transposed loop still sounds like the same musical idea.',
        ]
      },
      {
        icon: 'ti-mood-smile',
        title: 'Modes — what they are and the two you need',
        sectionType: 'theory',
        cards: [
          {
            type: 'text',
            heading: 'Modes without the theory overload',
            body: 'Modes are just the same notes of a major scale starting from a different note. C major has 7 notes — if you start on each one and call that note "home", you get 7 different modes. You do not need all 7. As a producer making SA house and amapiano, two modes matter practically: Dorian and Mixolydian. Both are already inside the white keys you know.'
          },
          {
            type: 'tag-list',
            heading: 'Dorian — the SA house minor mode',
            intro: 'A Dorian = A B C D E F# G A (same as G major, but home is A)',
            items: [
              '<span class="tag tag-teal">What changes vs A natural minor</span> F becomes F# — one black key. This raised 6th gives Dorian a slightly brighter, more hopeful quality than natural minor, while still feeling dark and grounded.',
              '<span class="tag tag-blue">Why it matters</span> The IV chord in Dorian is D major (D–F#–A) instead of D minor. That sudden brightness from a major IV in a minor context is one of the most recognisable sounds in afro-house, amapiano, and neo-soul.',
              '<span class="tag tag-purple">The signature sound</span> Am7–Gmaj7–D major–Am7. The D major chord (with F#) feels like sunlight breaking through clouds. You have heard this in dozens of tracks.',
            ]
          },
          {
            type: 'tag-list',
            heading: 'Mixolydian — the gospel/blues major mode',
            intro: 'G Mixolydian = G A B C D E F G (same as C major, but home is G)',
            items: [
              '<span class="tag tag-amber">What changes vs G major</span> F# becomes F natural — the 7th is flattened. This gives it a bluesy, less-resolved feel compared to standard major.',
              '<span class="tag tag-amber">Why it matters</span> The ♭VII chord (F major over G Mixolydian) is that flat-seven borrowed chord already in P2 (Am7–Gmaj7–Fmaj7–Gmaj7). When Gmaj7 feels like home and Fmaj7 is the ♭VII, you are in G Mixolydian. You already know this sound.',
              '<span class="tag tag-amber">In practice</span> Any time a major chord feels like home but uses ♭VII as a colour chord — that is Mixolydian thinking. No need to analyse further.',
            ]
          },
        ]
      },
      {
        icon: 'ti-mood-smile',
        title: 'Mode drill ladder',
        sectionType: 'practice',
        cards: [
          {
            type: 'two-col-drill',
            heading: 'Dorian ladder',
            intro: 'Treat the single changed note as the main event. One note changes the whole mood.',
            items: [
              { title: 'L1 — Hear the changed note', detail: 'Play A natural minor, then A Dorian, slowly. Goal: hear F vs F# clearly.' },
              { title: 'L2 — Chord spotlight', detail: 'Play Am7 → D major → Am7 at 80 BPM. Goal: hear the bright IV in a minor setting.' },
              { title: 'L3 — Full mode loop', detail: 'Build Am7–Gmaj7–D–Am7 at 100–112 BPM. Goal: the D chord feels like the signature colour.' },
              { title: 'L4 — DAW mode sketch', detail: 'Write one 8-bar Dorian loop and explain in words what the raised 6th changed emotionally.' },
            ]
          }
        ],
        checkList: [
          'You can hear the single note that separates natural minor from Dorian.',
          'You can use the major IV chord intentionally in a minor context.',
          'Your Dorian loop feels like a colour choice, not a wrong note accident.',
        ]
      },
      {
        icon: 'ti-sparkles',
        title: 'Augmented chords — tension that floats',
        sectionType: 'theory',
        cards: [
          {
            type: 'text',
            heading: 'What is an augmented chord?',
            body: 'An augmented chord (aug or +) is a major chord with the 5th raised by one semitone. The interval formula: Root + Major 3rd (4 semitones) + Augmented 5th (8 semitones). Because it stacks two equal major 3rds, it creates ambiguous, floating tension. It does not urgently resolve like a dominant 7th — it hovers. This makes it useful for cinematic build-ups, modulation bridges, and neo-soul colour.'
          },
          {
            type: 'tag-list',
            heading: 'Augmented chords in your keys',
            items: [
              '<span class="tag tag-coral">Caug</span> C–E–G# — use between Cmaj7 and Am7 for a floating, cinematic moment.',
              '<span class="tag tag-coral">Faug</span> F–A–C# — use between Fmaj7 and G7 to add colour mid-loop.',
              '<span class="tag tag-coral">Aaug</span> A–C#–F — use between Am and Dm for an unexpected lift.',
            ]
          },
        ]
      },
      {
        icon: 'ti-sparkles',
        title: 'Augmented drill ladder',
        sectionType: 'practice',
        cards: [
          {
            type: 'two-col-drill',
            heading: 'Augmented ladder',
            intro: 'Use augmented as a brief floating bridge. If it stays too long, it becomes awkward instead of interesting.',
            items: [
              { title: 'L1 — Build the shape', detail: 'Play C major, then raise G to G#. Goal: feel exactly what changed.' },
              { title: 'L2 — One-bar bridge', detail: 'Play Cmaj7 → Caug → Am7 and Fmaj7 → Faug → G7 slowly. Goal: hear the float before resolution.' },
              { title: 'L3 — Timed restraint', detail: 'Use augmented for one beat only in a 4-bar loop. Goal: it colours the phrase without hijacking it.' },
              { title: 'L4 — Production insertion', detail: 'Add one augmented passing chord to a DAW loop and compare it with the plain version. Goal: the added tension feels chosen.' },
            ]
          }
        ],
        checkList: [
          'You can build an augmented chord by altering the 5th deliberately.',
          'You can use augmented as a short passing colour instead of a destination.',
          'The tension resolves into the next chord convincingly.',
        ]
      },
    ],
    checkList: [
      'You can use at least 3 different borrowed chords within a C major or A minor progression and describe what each one does emotionally',
      'You can identify a secondary dominant by ear — "that chord felt like it was pulling hard toward the next one"',
      'You can improvise a short melodic phrase using the A blues scale over an Am7 vamp, using E♭ as a passing tone',
      'You can play the i–VII–VI–VII progression in both A minor AND D minor from memory, with 7th chord voicings',
      'You can build an A Dorian loop (Am7–Gmaj7–D–Am7) and describe what makes the D major chord sound different',
      'You can use an augmented chord as a 1-bar passing chord in a progression without it feeling out of place',
      'You can describe in plain language what Mixolydian means and point to an existing progression in this course that uses it',
    ]
  },

  // ─── PHASE 6 ──────────────────────────────────────────────────────────────
  {
    id: 6,
    label: 'Phase 6',
    title: 'Ear training — hear what you already know',
    description: 'You have built the theory toolkit. This phase trains your ears to recognise what you have learned — so you can pull from reference tracks, respond to producers in real time, and translate what you hear in your head directly to the keys. No perfect pitch required. Just pattern recognition.',
    timeline: 'Ongoing — run alongside any other phase (10 min/day)',
    badgeStyle: 'background:rgba(168,85,247,0.2);color:#d8b4fe;border:1px solid rgba(168,85,247,0.3)',
    accentColor: '#a855f7',
    sections: [
      {
        icon: 'ti-ear',
        title: 'Why ear training matters for producers',
        sectionType: 'theory',
        cards: [
          {
            type: 'text',
            heading: 'The gap between theory and music',
            body: 'You can know every chord in this course and still struggle to recreate a progression you hear in a track. Ear training closes that gap. It is not about being able to name every note in real time — it is about building pattern recognition so that when you hear a chord change, a chord type, or a melodic interval, something in your body says "I know that". Then your hands find it. As a DAW-based producer, the most valuable ear skill is recognising chord quality (major vs minor vs dominant), progression shape (does it resolve or loop?), and melodic intervals (how far is this jump?). Nothing more.'
          },
          {
            type: 'list',
            heading: 'What you are training (and what you are not)',
            items: [
              'Training: chord quality by ear (major, minor, dominant, diminished)',
              'Training: progression feel (resolved vs unresolved, looping vs arriving)',
              'Training: melodic interval recognition (small vs large jumps, direction)',
              'Training: identifying the I chord in a track you are listening to',
              'NOT training: perfect pitch, real-time transcription, hearing all 4 notes in a chord instantly',
            ]
          }
        ]
      },
      {
        icon: 'ti-headphones',
        title: 'Interval recognition — the practical set',
        sectionType: 'practice',
        cards: [
          {
            type: 'text',
            heading: 'The producer shortlist (only 5 intervals to start)',
            body: 'You do not need to recognise all 12 intervals instantly. Start with the 5 that appear most often in SA house and amapiano melodic lines. Each one has a consistent emotional quality you can feel before you can name it.'
          },
          {
            type: 'tag-list',
            heading: 'The 5 priority intervals',
            items: [
              '<span class="tag tag-teal">Minor 3rd (m3)</span> Dark, stepping down into minor. A to C. E to G. The first move in most minor riffs.',
              '<span class="tag tag-purple">Major 3rd (M3)</span> Bright, open, lifting. C to E. G to B. The first move in major chords.',
              '<span class="tag tag-blue">Perfect 4th (P4)</span> Strong, anchoring, slightly hollow. C to F. A to D. Bass jumps often use this.',
              '<span class="tag tag-blue">Perfect 5th (P5)</span> Stable and confident. C to G. A to E. The most grounded leap.',
              '<span class="tag tag-amber">Octave (P8)</span> Same note, different register. Immediately recognisable — used in octave pump bass patterns.',
            ]
          },
          {
            type: 'two-col-drill',
            heading: 'Interval ladder (5 min)',
            intro: 'Start with recognition plus language. The point is to connect sound, feeling, and label.',
            items: [
              { title: 'L1 — Fixed pair recognition', detail: 'Play C→E, A→C, C→G, A→D, A→A. Say the interval name and feeling out loud.' },
              { title: 'L2 — Mixed order', detail: 'Shuffle those same five intervals. Goal: identify the sound without relying on order.' },
              { title: 'L3 — One-note move', detail: 'Choose a root and test two interval options from it. Goal: learn the distance, not just one memorised pair.' },
              { title: 'L4 — Ear then hand', detail: 'Hear the interval, say it, then play it back correctly. Goal: ear and fingers connect.' },
            ]
          }
        ],
        checkList: [
          'You can name the 5 priority intervals in mixed order.',
          'You can describe each interval by feel, not just by label.',
          'You can hear an interval and then reproduce it on the keyboard.',
        ]
      },
      {
        icon: 'ti-music',
        title: 'Chord quality recognition',
        sectionType: 'practice',
        cards: [
          {
            type: 'text',
            heading: 'Hearing major vs minor vs dominant',
            body: 'The most useful ear skill in production is hearing chord quality. Play a chord you do not know — major sounds open and bright, minor sounds dark and expressive, dominant 7th sounds tense and unresolved. These are feelings before they are names. Your job is to connect the feeling to the label, then to the shape on your keyboard.'
          },
          {
            type: 'tag-list',
            heading: 'Emotional signatures to memorise',
            items: [
              '<span class="tag tag-purple">Major chord</span> Confident, open, resolved. The 3rd sits a major 3rd above the root. Sounds "complete".',
              '<span class="tag tag-teal">Minor chord</span> Dark, expressive, searching. The 3rd sits a minor 3rd above the root. Sounds "weighted".',
              '<span class="tag tag-amber">Dominant 7th</span> Tense, restless, wants to move. The added ♭7 creates pull. Sounds "urgent" or "bluesy".',
              '<span class="tag tag-coral">Major 7th</span> Dreamy, floating, sophisticated. The added natural 7 lifts the chord. Sounds "suspended in air".',
              '<span class="tag tag-blue">Minor 7th</span> Dark but smoother than a plain minor triad. The added ♭7 softens the edges. Sounds "deep" and "wide".',
            ]
          },
          {
            type: 'two-col-drill',
            heading: 'Chord quality ladder',
            intro: 'Move from controlled self-testing to real-track listening. Your goal is fast, useful classification.',
            items: [
              { title: 'L1 — Self-test triads', detail: 'Play major, minor, dominant, maj7, and min7 shapes yourself. Say the quality before checking your hands.' },
              { title: 'L2 — Random quality check', detail: 'Play one chord at a time in random order. Goal: identify the quality by feel within 3 seconds.' },
              { title: 'L3 — Reference track first chord', detail: 'Use a real track and find the first chord quality only. Goal: one confident answer, not full transcription.' },
              { title: 'L4 — Confirm on keyboard', detail: 'Find that chord on your keyboard while the track plays. Goal: ear label and physical shape line up.' },
            ]
          },
          {
            type: 'text',
            heading: '✓ Pass mark — you are ready to move on when:',
            body: 'You can listen to any SA house or amapiano track and correctly identify the chord quality (major / minor / dominant / maj7 / min7) of the first chord within 30 seconds — and confirm it by finding that chord on your keyboard while the track plays.'
          }
        ],
        checkList: [
          'You can distinguish major, minor, dominant, maj7, and min7 by feel.',
          'You can identify the first chord quality of a track within 30 seconds.',
          'You can confirm your ear guess on the keyboard while the track plays.',
        ]
      },
      {
        icon: 'ti-eye',
        title: 'Progression recognition — hearing the shape',
        sectionType: 'practice',
        cards: [
          {
            type: 'text',
            heading: 'Resolved vs unresolved progressions',
            body: 'Some progressions feel complete — they land and rest. Others feel circular and keep moving. Learning to hear this distinction tells you how a producer is using tension in a track. A resolved progression ends on the I (tonic) chord — it breathes, it settles. An unresolved progression ends on V, ii, or loops without landing — it pushes forward, keeps energy moving. Deep house build-ups often use unresolved loops; drops often resolve.'
          },
          {
            type: 'tag-list',
            heading: 'The 3 progression shapes to recognise by ear',
            items: [
              '<span class="tag tag-purple">The loop (circular)</span> Progression repeats without clearly landing. Feels like it is always moving. Example: i–VII–VI–VII. Common in SA house main loops.',
              '<span class="tag tag-teal">The cadence (resolved)</span> Progression arrives at rest. V → I is the clearest. Feels like a sentence ending with a full stop. Common at section transitions.',
              '<span class="tag tag-amber">The half-cadence (suspended)</span> Progression ends on V but does not resolve. Feels like a question without an answer. Common at the end of a 4-bar phrase before the loop repeats.',
            ]
          },
          {
            type: 'two-col-drill',
            heading: 'Progression recognition ladder',
            intro: 'Train shape before detail: loop, cadence, or suspension. That is the first useful answer.',
            items: [
              { title: 'L1 — Resolve or cycle', detail: 'Listen to one loop and answer only: did it land, or keep moving?' },
              { title: 'L2 — Count the changes', detail: 'On the next listen, count how many chords are in the loop. Goal: hear the loop length.' },
              { title: 'L3 — Find the landing chord', detail: 'If it resolves, find the note that feels like home on your keyboard.' },
              { title: 'L4 — Section comparison', detail: 'Compare intro, verse, and drop. Goal: notice whether each section resolves, suspends, or cycles differently.' },
            ]
          },
          {
            type: 'text',
            heading: '✓ Pass mark — you are ready to move on when:',
            body: 'You can listen to a track you have never heard before and within one play-through correctly identify: (1) is it major or minor key, (2) how many chords are in the main loop, (3) does the loop resolve or cycle. You should get 2 out of 3 correct consistently before moving on to transcription.'
          }
        ],
        checkList: [
          'You can tell if a progression resolves or cycles.',
          'You can estimate loop length by chord changes.',
          'You can usually identify the home chord of a resolved section.',
        ]
      },
      {
        icon: 'ti-pencil',
        title: 'Transcription basics — lifting a progression from a track',
        sectionType: 'practice',
        keysNeeded: 61,
        cards: [
          {
            type: 'text',
            heading: 'The process (no perfect pitch needed)',
            body: 'Transcription for producers is not writing out every note on a score. It is finding the chord root and quality of each chord in a loop so you can recreate the harmonic skeleton. You use the reference track, your keyboard, and your ear in a back-and-forth loop. This is the actual skill used in every studio session.'
          },
          {
            type: 'two-col-drill',
            heading: 'Transcription ladder',
            intro: 'Build the harmonic skeleton one layer at a time. Root first, then quality, then loop shape, then numbers.',
            items: [
              { title: 'L1 — First root only', detail: 'Find the root of the first chord while the track plays. Goal: one reliable anchor note.' },
              { title: 'L2 — Add quality', detail: 'Test major vs minor from that root. Goal: identify the first chord completely.' },
              { title: 'L3 — Map the loop', detail: 'Count the chord changes and find each root in order. Goal: skeleton before detail.' },
              { title: 'L4 — Number the loop', detail: 'Assign Roman numerals to the chords you found so the progression becomes transferable.' },
            ]
          },
          {
            type: 'two-col-drill',
            heading: 'Good tracks to start transcribing (approachable harmony)',
            items: [
              { title: 'Black Coffee — Drive', detail: 'Simple 2-chord loop. Start here. Identify whether it is major–minor or minor–major.' },
              { title: 'Sun-El Musician — Akanamali', detail: '4-chord loop. Common minor-key SA house movement. Find the root of each chord.' },
              { title: 'Kabza De Small — Sponono', detail: 'Amapiano piano line. Find the notes of the melodic riff, not just the chords.' },
              { title: 'Any track you already love', detail: 'Starting with music you know emotionally makes the ear connection stronger.' },
            ]
          },
          {
            type: 'text',
            heading: '✓ Pass mark — you are ready to move on when:',
            body: 'You can recover the root and quality of each chord in one short loop from a real track, then label the progression by numbers and replay it on your keyboard.'
          }
        ],
        checkList: [
          'You can find the first chord root by ear.',
          'You can determine major vs minor for each chord in a short loop.',
          'You can convert the result into Roman numerals and replay it.',
        ]
      },
    ],
    checkList: [
      'You can hear whether a chord is major or minor without looking — just by the emotional quality',
      'You can identify the 5 priority intervals (m3, M3, P4, P5, octave) by ear when played on a keyboard',
      'You have transcribed the harmonic skeleton (chord roots + quality) of at least one SA house or amapiano track',
      'You can listen to a reference track and identify whether the overall feel is major or minor within 10 seconds',
      'You can identify whether a progression loop resolves (lands) or cycles (keeps moving) while listening',
    ]
  }
];


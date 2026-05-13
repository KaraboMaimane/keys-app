# Launchpad X: Scale Modes & Settings Implementation Guide

**Target Audience:** AI Agents / Application Developers
**Objective:** Provide a granular, rules-based breakdown of the Launchpad X Note Mode, Scale Mode, Overlap mechanics, and Settings to facilitate application development.

---

## 1. Core Hardware Constraints & Base Logic

* **Grid:** 8x8 matrix of RGB, velocity, and pressure-sensitive pads.
* **Navigation Controls (Always Active in Note Mode):**
    * `Up Arrow (▲)` / `Down Arrow (▼)`: Shift grid pitch up/down by exactly one Octave (12 semitones).
    * `Left Arrow (◀)` / `Right Arrow (▶)`: Transpose grid pitch up/down by exactly one Semitone.
* **Dynamic Switching:** The application must listen to the armed track type. If a Drum Rack is armed, default to Drum Mode. If any melodic instrument is armed, default to Note Mode (Chromatic or Scale).

---

## 2. Note Mode Data Structures & Views

The primary melodic interface has two distinct views. The visual feedback (colors) is critical for user orientation.

### A. Chromatic Mode (Default)
* **Concept:** All 12 notes of the western scale are playable.
* **Visual Logic:**
    * **Purple Pads:** Root notes of the currently selected scale.
    * **Blue Pads:** Notes that belong to the currently selected scale.
    * **Blank (Unlit) Pads:** Notes that fall completely outside the selected scale.
* **Layout Logic (Default "Overlap 5"):** Mimics a standard guitar fretboard. Moving up one row vertically represents an interval leap. The 6th column of pads on any row plays the exact same MIDI note as the 1st column on the row directly above it.

### B. Scale Mode
* **Concept:** Restricts the grid *only* to notes within the selected scale. It is impossible to play an out-of-key note.
* **Visual Logic:**
    * **Purple Pads:** Root notes of the scale.
    * **Blue Pads:** All other notes in the scale.
    * **Blank (Unlit) Pads:** Act as "dead zones" representing notes outside the playable range based on the current layout.
* **Layout Logic:** Consecutive pads left-to-right play the next consecutive note in the specific scale, ignoring chromatic steps.

---

## 3. Overlap Mechanics (Row-to-Row Relationship)

"Overlap" defines the interval jump between the last pad of one row and the first pad of the row above it. It is defined by how many "fingers" a user needs to play a scale vertically.

* **Overlap Values:** 2 Finger, 3 Finger, 4 Finger, 5 Finger.
    * *Example (5 Finger):* The leftmost pad on Row 2 plays the exact same note as the 6th pad across on Row 1.
* **Sequential Overlap (Special Case):**
    * *In Chromatic Mode:* Notes are mapped completely linearly from left-to-right, bottom-to-top. Every pad has a unique note; there are zero duplicated notes on the grid.
    * *In Scale Mode:* Only the exact octaves of the root note are overlapped. This creates a highly structured vertical layout ideal for playing arpeggios across massive octave ranges.

---

## 4. Note Mode Settings Schema

Accessed by a sustained press on the `Note` button (which pulses green). The top four scene launch buttons navigate four sub-pages: LED, Velocity, Aftertouch, and Fader. The primary Note Mode settings are on the main grid.

### Sub-Grid Mapping (8x8 Area during Settings View):

**Row 8 (Top Row): Overlap & Mode Toggles**
* Pad 1: Sequential Overlap
* Pad 2: 2 Finger Overlap
* Pad 3: 3 Finger Overlap
* Pad 4: 4 Finger Overlap
* Pad 5: 5 Finger Overlap (Default)
* Pad 8: Chromatic/Scale Toggle (Dim Red = Chromatic, Bright Green = Scale)

**Rows 6 & 7: Scale Viewer & Root Note Select**
* **Layout:** Mapped physically like a piano keyboard across two rows.
* **Function:** Pressing any pad here sets the global Root Note (e.g., C, C#, D).
* **Visuals:** Purple = Current Root, Blue = In Scale, Dim White = Out of Scale.

**Rows 4 & 5: Scale Selection**
* **Function:** Defines the interval gaps for the scale. 16 available options.
* **Visuals:** Bright White = Selected, Dim Blue = Available.
* **The 16 Scales Available:**
    1. Minor (Natural) [Default]
    2. Major
    3. Dorian
    4. Phrygian
    5. Mixolydian
    6. Melodic Minor (Ascending)
    7. Harmonic Minor
    8. Bebop Dorian
    9. Blues
    10. Minor Pentatonic
    11. Hungarian Minor
    12. Ukrainian Dorian
    13. Marva
    14. Todi
    15. Whole Tone
    16. Hirajoshi

**Rows 1 & 2: MIDI Channel Select**
* 16 pads representing MIDI Channels 1 through 16. Allows routing Note Mode output to a specific external track or hardware channel.

---

## 5. Expression Settings (Velocity & Aftertouch)

For the AI to process human input correctly, implement the following expression modifiers:

* **Velocity Settings (Access: 2nd Scene Button in Settings):**
    * Global Toggle: Enable (Bright Green) / Disable (Dim Red).
    * Curves:
        * `Low`: Requires heavy physical force to trigger high MIDI velocity values (100-127).
        * `Medium`: Linear/Standard response.
        * `High`: Requires very light physical force to trigger high MIDI velocity values.
* **Aftertouch Settings (Access: 3rd Scene Button in Settings):**
    * Modes: Disable, Polyphonic Aftertouch (per-pad pressure), Channel Pressure (global pressure average).
    * Thresholds: Low (engages easily), Medium, High (requires heavy sustained pressure).
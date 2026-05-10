# 🎹 Keys Lessons

> **Your keyboard roadmap to deep house & amapiano**

A structured, interactive learning companion for keyboard players who want to produce South African house music. Built with Angular 19, it guides you through 5 progressive phases — from learning your first scale to writing signature chord progressions in deep house, amapiano, and sgidongo.

---

## Table of Contents

- [Overview](#overview)
- [Learning Phases](#learning-phases)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Development Notes](#development-notes)

---

## Overview

Keys Lessons is a single-page Angular application that presents a curated, week-by-week keyboard curriculum aimed at aspiring producers. The curriculum is focused on the styles found in South African electronic music — deep house, amapiano, and sgidongo — and teaches the theory, technique, and genre-specific vocabulary needed to contribute meaningfully in a studio setting.

The app is designed around a **glassmorphism dark UI** with smooth phase-transition animations, task-first learning flow, and progressive disclosure so key actions stay visible while deeper detail stays optional.

**Estimated total study time:** 6–8 months at 3–4 sessions per week (30–45 min each).

---

## Learning Phases

The curriculum is divided into 5 phases, each building directly on the last:

### Phase 1 — Foundation · C major, basic chords & hand position
*~6–8 weeks*

Covers the building blocks every keyboard player needs before anything musical can happen:
- C major scale with correct fingering and both hands
- All 7 diatonic triads in root position, 1st inversion, and 2nd inversion
- 7th chord voicings (Cmaj7, Dm7, Em7, Fmaj7, G7, Am7) — the core sound of deep house
- Voice leading principles: common tones, step motion, resolving tendency tones
- Week-by-week drills with BPM targets and daily practice plans

### Phase 2 — Hand Technique & Soloing Drills
*~6–8 weeks*

Builds speed, independence, and muscle memory suited to a compact keybed (e.g. Launchkey Mini):
- Hanon-style finger independence exercises
- Two-hand coordination drills
- Pentatonic and blues scale soloing patterns for melodic improvisation

### Phase 3 — The Nashville Numbering System
*~4–6 weeks*

The most important theory shift for a producer — thinking in **numbers** instead of note names:
- Roman numeral chord functions (I, ii, iii, IV, V, vi, vii°) mapped visually
- Transposing any progression to any key instantly
- Common numbered progressions used in SA house music
- How to follow a producer's direction (e.g. "give me a ii–V–I here")

### Phase 4 — Genre Application · Deep House, Amapiano & Sgidongo
*~8–12 weeks*

Theory meets genre. Everything from the earlier phases is applied to real production contexts:
- **South African deep house:** chord characteristics, soulful Rhodes voicings, bassline patterns
- **Amapiano:** log drum interaction, piano fills, signature progressions in common SA keys
- **Sgidongo:** rhythmic keyboard stabs, call-and-response patterns, layering with pads
- Project-based practice — you are writing music, not just running drills

### Phase 5 — Advanced Harmony · Modal Mixture, Borrowed Chords & Your Signature Sound
*No fixed end date — begin when Phase 4 feels effortless*

Takes your harmony beyond diatonic writing:
- Borrowed chords from the parallel minor/major for soulful colour
- Modal mixture and how working SA house producers use it
- Building a personal harmonic vocabulary and a signature chord style

---

## Features

- **Focus-first home dashboard** — one primary milestone card and compact stats keep first actions clear
- **Progressive disclosure** — course blueprint and skill map are available on demand via a “Course details and map” toggle to reduce noise
- **Task-first phase flow** — phase view prioritizes actionable section rows with optional guidance/metrics panels
- **Guided practice launch** — one-tap and quick 10-minute launch options open practice with pre-configured timer and drill context
- **Section-focused lesson view** — sticky context bar, concise card content, and move-on checklist for lower cognitive load
- **Multiple card types** — content is rendered as `text`, `list`, `tag-list`, `two-col-drill`, `numeral-grid`, or `studio-milestone` cards depending on the content format
- **Readiness checklists** — phase and section checkpoints clarify when to progress
- **Smooth animations** — phase transitions use Angular animations (`phaseIn`) and card stagger animations (`staggerCards`) with `cubic-bezier` easing
- **Glassmorphism dark UI** — frosted-glass card surfaces on an animated dark background with drifting colour orbs
- **Routed standalone Angular app shell** — route-aware home/phase/section views with deep-link support and zero page reloads

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 19 (standalone component API) |
| UI Library | Angular Material 19 (chips, expansion panels, ripple) |
| Styling | SCSS with CSS custom properties, glassmorphism design |
| Animations | Angular `@angular/animations` (trigger, transition, stagger) |
| Icons | Tabler Icons (CDN, `ti-*` class prefix) |
| State management | Angular Signals (`signal`, `computed`) |
| Testing | Karma + Jasmine |
| Build tool | Angular CLI 19 / `@angular-devkit/build-angular` |
| Language | TypeScript 5.7 |

---

## Project Structure

```
keys-app/
├── src/
│   ├── index.html              # App entry HTML, Tabler Icons CDN link
│   ├── main.ts                 # Bootstrap with appConfig
│   ├── styles.scss             # Global styles (CSS variables, reset, glass utility)
│   └── app/
│       ├── app.component.ts    # Root component — phase state, animations
│       ├── app.component.html  # App shell, phase nav, section/card rendering
│       ├── app.component.scss  # Component-scoped styles
│       ├── app.config.ts       # provideAnimationsAsync, zone coalescing
│       └── data/
│           └── phases.data.ts  # All curriculum content + TypeScript interfaces
├── angular.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
└── package.json
```

All curriculum content lives in `phases.data.ts` as a typed `PHASES` array. To add, reorder, or edit lessons, only that file needs to change.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm v9 or later (bundled with Node.js)

### Installation

```bash
# Clone or open the project folder
cd keys-app

# Install dependencies
npm install
```

### Run the development server

```bash
npm start
# or
ng serve
```

Navigate to [http://localhost:4200](http://localhost:4200). The app reloads automatically on file changes.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start the development server at `localhost:4200` |
| `npm run build` | Production build — output in `dist/` |
| `npm run watch` | Development build with file watching |
| `npm test` | Run unit tests via Karma |
| `npm run e2e` | Run full Playwright E2E suite |
| `npm run e2e:smoke` | Run smoke journey tests |
| `npm run e2e:mobile` | Run mobile browser E2E tests |
| `npm run e2e:visual` | Run visual regression snapshots |
| `npm run e2e:update-snapshots` | Intentionally refresh visual snapshots |

---

## Development Notes

- **Adding curriculum content:** All lesson data is defined in [`src/app/data/phases.data.ts`](src/app/data/phases.data.ts). Each `Phase` holds an array of `Section` objects, and each section holds an array of `CardBlock` objects. Adding a new section or card requires no changes to the component or template.
- **Card types:** To render a new style of content block, add a new `type` value to the `CardBlock` interface and add the corresponding `*ngIf` branch in `app.component.html`.
- **Theming:** Phase accent colours are driven by the `accentColor` field on each `Phase` object and injected as CSS custom properties (`--accent`) on the nav buttons and connectors.
- **State model:** The app uses view-state signals (`home`, `phase`, `section`) and localStorage-backed toggles for keyboard size, calm mode, task-first mode, and detail expansion.
- **Animations:** The `viewIn`, `slideUp`, and list/card stagger triggers animate major transitions while respecting reduced-motion settings.
- **Documentation sync:** If feature scope, user-visible workflow, UI architecture, or project scripts change, update this README in the same PR so commands and behavior stay accurate.

---

> *Practice consistently · Trust the process · Make music 🎶*

# AGENTS.md

Project-wide instructions for AI coding agents working in this repository.

## Scope
- Applies to the whole project.
- Prefer this file as the primary instruction source for agent behavior.
- For product details and curriculum context, link to README.md instead of duplicating it.

## Quick Commands
- Install: `npm install`
- Dev server: `npm start`
- Unit tests: `npm test`
- E2E full suite: `npm run e2e`
- Smoke journey tests: `npm run e2e:smoke`
- Mobile E2E only: `npm run e2e:mobile`
- Visual regression: `npm run e2e:visual`
- Update visual baselines intentionally: `npm run e2e:update-snapshots`

## Codebase Map
- App shell and view-state orchestration: src/app/app.component.ts, src/app/app.component.html, src/app/app.component.scss
- Domain content model: src/app/data/phases.data.ts
- Persistent progress state: src/app/progress.service.ts
- Practice utilities: src/app/metronome.service.ts, src/app/session-timer.service.ts
- E2E journeys: e2e/journeys.spec.ts
- Visual snapshots tests: e2e/visual.spec.ts
- Runtime and project scripts: package.json, playwright.config.ts, angular.json

## Architecture Conventions
- Keep the app as a standalone Angular architecture (no module rewrites unless requested).
- Prefer Angular signals/computed for local app state and derived state.
- Keep curriculum and lesson structures typed and centralized in src/app/data/phases.data.ts.
- Persist user-facing progress and toggles through existing localStorage keys unless a migration is explicitly required.
- Reuse existing CSS classes and visual language before adding new abstractions.

## Senior UX/UI Quality Bar
- Prioritize clarity of hierarchy, contrast, spacing rhythm, and predictable interaction feedback.
- Preserve keyboard accessibility and semantic labels when changing controls.
- Keep responsive behavior stable on desktop and mobile breakpoints.
- Keep motion meaningful and subtle; avoid adding animation that harms readability or causes layout jitter.
- Do not introduce visual churn that breaks established design direction unless explicitly requested.
- Validate user-facing text for concise, actionable language and consistent terminology.

## Curriculum Voice and Teaching Standard
- Treat lesson content like a veteran piano instructor coaching music producers, not a generic theory tutor.
- Prioritize producer-relevant musicianship: functional harmony, chord movement, rhythm, voicing, groove, and ear-led decision making.
- Keep every lesson practical and studio-transferable (what to play, why it works, and where it applies in production).
- Write for busy professionals: short, focused steps, clear outcomes, and no unnecessary filler.
- Keep tone motivating and confidence-building: direct, encouraging, and progress-oriented.
- Use plain language first; introduce theory terms only when they unlock practical playing decisions.
- Keep the tonal learning environment simple for as long as possible: teach most concepts inside C major / A minor first.
- Use C major / A minor as the main training ground for scales, chords, inversions, functional harmony, progressions, ear training, and foundational drills.
- Avoid introducing extra keys early unless there is a strong curriculum reason; reduce key-switching friction for learners.
- Only introduce other common keys much later in the course, once the learner is already functionally harmonic and comfortable applying concepts in C major / A minor.
- When later-stage key expansion is introduced, prioritize keys that are especially useful in South African deep house and amapiano contexts.
- Tie theory to producer workflows where possible: building progressions, bassline choices, tension/release, arrangement support, and genre context.
- For each meaningful lesson block, aim to include:
  - an immediate playable action,
  - a quick "why this works" explanation,
  - a practical checkpoint for self-assessment,
  - a compact "use this in your session" prompt.
- Preserve progressive scaffolding: foundations first, then controlled complexity, while reinforcing previous skills.

## Frontend Implementation Rules
- When modifying UI structure, update e2e selectors or test semantics in the same change if needed.
- Prefer resilient test locators (roles, labels, stable classes) over fragile positional selectors.
- Avoid one-off CSS that bypasses shared tokens or existing style patterns.
- Preserve existing localStorage initialization assumptions used by tests.

## Test Gate (Required Before Finalizing UI/Behavior Changes)
- After meaningful UI or behavior changes, run at least:
  - `npm run e2e:smoke`
- If snapshots or rendering are affected, also run:
  - `npm run e2e:visual`
- If mobile layout, scrolling, or overflow behavior is touched, also run:
  - `npm run e2e:mobile`
- If broad behavior changed across flows, run:
  - `npm run e2e`

## Definition of Done for Agent Changes
- Build/test commands used are reported in the final response.
- Smoke and relevant e2e tests pass locally, or failures are clearly reported with root cause and next fix.
- Any selector/test updates needed by UI changes are included in the same PR.
- No unrelated refactors are mixed into targeted fixes.

## Documentation Links
- Product and setup overview: README.md
- App entry point and bootstrap: src/main.ts, src/app/app.config.ts
- E2E setup and browser matrix: playwright.config.ts

## README Sync Rule
- If product scope, user-facing flows, architecture boundaries, or project commands change, update README.md in the same PR.
- Keep README content aligned with current UI structure and test commands.

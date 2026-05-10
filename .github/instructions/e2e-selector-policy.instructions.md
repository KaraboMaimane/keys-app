---
applyTo: "e2e/**/*.ts"
description: "Use when writing or editing Playwright tests in this repo; enforce resilient selector strategy and anti-flake waiting patterns"
---

# E2E Selector Policy

Use these rules when creating or updating Playwright journeys and visual tests.

## Locator Priority
1. Prefer role + accessible name locators when possible.
2. Use explicit labels or text only when they are stable and intentional product copy.
3. Use stable class selectors only when role/label patterns are not practical.
4. Avoid fragile selectors: positional nth chains, deep structural CSS, and animation-dependent locators.

## Waiting and Assertions
- Use `expect(locator).toBeVisible()` with clear intent and timeout where needed.
- Wait for a state change or view boundary (`.phase-view`, `.section-view`, etc.), not arbitrary sleeps.
- Keep `waitForTimeout` only as a last resort and document the reason inline.

## Stable State Setup
- Preserve the localStorage bootstrap helpers used by tests.
- Keep keyboard, progress, and streak setup deterministic before navigation.
- Ensure tests are isolated: one test should not rely on mutations from a prior test.

## Navigation and Interaction
- Assert before and after critical interactions.
- Prefer one meaningful assertion per state transition boundary.
- If the UI architecture changes, update selectors in the same change as the UI update.

## Anti-Flake Guidance
- Keep selectors compatible across desktop and mobile projects.
- Account for motion/stagger by waiting on destination state, not intermediate animation frames.
- For visual tests, disable motion before snapshot capture.

## Done Criteria for E2E Changes
- `npm run e2e:smoke` passes.
- If mobile flow changed, `npm run e2e:mobile` passes.
- If visuals changed, `npm run e2e:visual` passes or snapshot updates are intentional and reviewed.

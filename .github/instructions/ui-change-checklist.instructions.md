---
applyTo: "src/app/**/*.{ts,html,scss}"
description: "Use when implementing UI/UX changes in app shell or components; enforce senior frontend quality and required verification steps"
---

# UI Change Checklist

Apply this checklist for any user-visible change.

## UX Quality
- Maintain clear visual hierarchy (primary action prominence, readable grouping, predictable scan order).
- Preserve or improve accessibility: semantic roles, labels, focus behavior, and touch target usability.
- Keep wording concise, consistent, and action-oriented.

## UI Quality
- Reuse existing tokens, classes, and styling language before introducing new patterns.
- Ensure spacing rhythm and contrast remain coherent with current design direction.
- Keep motion purposeful; avoid decorative animation that degrades readability or performance.
- Validate desktop and mobile layouts for overflow, clipping, and interaction comfort.

## Implementation Discipline
- Keep changes scoped; avoid unrelated refactors.
- When markup changes affect selectors, update Playwright tests in the same change.
- Prefer resilient selectors and semantic locators in test updates.

## Verification Requirements
- Run `npm run e2e:smoke` after meaningful UI/behavior edits.
- Run `npm run e2e:mobile` when mobile layout or overflow behavior is touched.
- Run `npm run e2e:visual` when rendering/snapshot-sensitive UI is touched.

## Documentation Sync
- If product scope, user-visible workflows, commands, or architecture guidance changed, update README.md in the same PR.
- Keep README focused on canonical, durable guidance; link to specialized files for deep details.

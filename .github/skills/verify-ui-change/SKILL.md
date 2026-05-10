---
name: verify-ui-change
description: "Run after UI or behavior changes to validate smoke/e2e quality gates and summarize pass/fail results with next actions"
---

# Verify UI Change

Use this workflow after implementing user-visible changes.

## Inputs
- Scope of change: one of `smoke-only`, `mobile-affected`, `visual-affected`, `broad-flow-change`.

## Workflow
1. Always run smoke:
   - `npm run e2e:smoke`
2. If scope is `mobile-affected`, also run:
   - `npm run e2e:mobile`
3. If scope is `visual-affected`, also run:
   - `npm run e2e:visual`
4. If scope is `broad-flow-change`, run full suite:
   - `npm run e2e`

## Output Format
Provide a concise report with:
- Commands executed
- Pass/fail status per command
- Failing test names (if any)
- Likely root cause and concrete next fix
- Whether snapshot updates are needed

## Guardrails
- Do not update visual snapshots unless changes are intentional and confirmed.
- If tests fail because selectors no longer match UI, fix selectors in the same change.
- Prefer deterministic waits and stable state setup over adding arbitrary delays.

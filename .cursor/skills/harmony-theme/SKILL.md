---
name: harmony-theme
description: Apply Harmony tokens, color palettes, typography, spacing, shadows, and component overrides to a MUI or shadcn host app. Run before /harmony-shell.
disable-model-invocation: true
---

> **MANDATORY — read this before acting.**
> 1. Do NOT read `.cursor/agents/theme-builder.md` yourself — it is the subagent's instruction file, not yours.
> 2. Complete Step 1 (Detect) and report findings before proceeding.
> 3. Do NOT run Passes 1-6 yourself. You MUST delegate via the Task tool. Delegation is required, not optional.
> 4. Do NOT skip Steps 3-4 (Verify + Fix loop). The verifier MUST run as a separate Task tool subagent.
> 5. If you produce theme code without launching subagents, you have failed the task.

# Apply Harmony Theme

Wires the full Harmony design token system into a MUI or shadcn project. Covers foundation (CSS import chain, theme class, provider), colors, typography, spacing/sizing, shape/elevation, and component overrides (Passes 1–6 of the mapping playbook). After this skill completes, the host app renders with Harmony tokens but does not yet have the shell layout — run `/harmony-shell` next.

## Prerequisites

- Kit must be at project root with `harmony-styles/`, `reference-components/`, and `harmony-data/` accessible.
- `docs/PINNED_SOURCES.md` must exist and paths must resolve.

## Workflow

### Step 1 — Detect

Before delegating, determine the project state:

1. **Framework:** Check `package.json` for `@mui/material` (MUI) or `tailwindcss` + shadcn dependencies.
2. **Build tool:** Check for `vite.config.ts`, `next.config.js`/`next.config.ts`, or `react-scripts`.
3. **Entry point:** Locate `main.tsx`, `_app.tsx`, `app/layout.tsx` — where the theme provider mounts.
4. **Existing theme:** Search for `createTheme` (MUI) or `tailwind.config.ts` / `globals.css` (shadcn).
5. **Target theme:** Ask or detect which Harmony theme the project uses — `theme-cp`, `theme-vp`, `theme-ppm`, or `theme-maconomy`.
6. **Report:** "Detected: [framework] + [build tool]. Entry point: [path]. Existing theme: [yes/no]. Target: [theme-*]."

### Step 2 — Build (MUST delegate)

Use the **Task tool** to launch the theme-builder as a subagent. Do NOT execute Passes 1-6 yourself.

**Task tool call:**
- `subagent_type`: `"generalPurpose"`
- `prompt`: Include ALL of the following in the prompt:
  1. "Read `.cursor/agents/theme-builder.md` and follow every instruction in it."
  2. **Framework:** MUI or shadcn
  3. **Entry point path** (from Step 1)
  4. **Target theme** (e.g. `theme-ppm`)
  5. **Existing theme file** (if detected)
  6. **Build tool** (Vite, Next.js, CRA)
- `description`: `"Run theme-builder passes 1-6"`

Wait for the subagent to complete and return its output before proceeding to Step 3.

The theme-builder works through Passes 1-6 in order:
1. Foundation — CSS import chain, `<html>` theme class, provider setup
2. Colors — every color token mapped (4 themes x light/dark)
3. Typography — font families, sizes, weights, line heights, type scale
4. Spacing & Sizing — spacing scale, shell tokens, component sizes, borders, breakpoints
5. Shape & Elevation — radii, shadows (light + dark), focus rings, z-index, transitions
6. Component Overrides — BEM class names on every component family

### Step 3 — Verify (MUST delegate)

Use the **Task tool** to launch the theme-verifier as a readonly subagent. Do NOT verify the theme yourself.

**Task tool call:**
- `subagent_type`: `"generalPurpose"`
- `readonly`: `true`
- `prompt`: Include ALL of the following:
  1. "Read `.cursor/agents/theme-verifier.md` and follow every instruction in it."
  2. Path to the theme file(s) (from Step 2 output)
  3. **Framework:** MUI or shadcn
  4. **Entry point path**
  5. **Component file paths** (wrapper components or `components/ui/` files)
- `description`: `"Run theme-verifier checks"`

Wait for the subagent to complete. It returns a numbered gap list or "PASS: zero gaps."

### Step 4 — Fix loop (MUST delegate)

If the verifier returns gaps:

1. Use the **Task tool** to launch theme-builder again with the gap list appended to the prompt.
2. Use the **Task tool** to launch theme-verifier again (same call pattern as Step 3).
3. Repeat until the verifier returns "PASS: zero gaps."

Do NOT fix gaps yourself. Do NOT mark the theme as complete until the verifier passes.

## Source files (read-only spec)

| Area | Path |
|------|------|
| Token definitions | `harmony-styles/tokens.css` — `:root` base tokens, `html.theme-*` color blocks, `html.dark` shadow overrides |
| CSS import chain | `harmony-styles/global.css` (chains: tokens → reset → layout → components → utilities) |
| Reset + fonts | `harmony-styles/reset.css` (Google Fonts @import for Figtree, Lexend, JetBrains Mono) |
| Component CSS | `harmony-styles/components.css` — all component-level rules (Button line 8, Input line 458, Card line 2277, etc.) |
| Layout CSS | `harmony-styles/layout.css` |
| Utility CSS | `harmony-styles/utilities.css` |
| Mapping playbook | `docs/MAPPING_PLAYBOOK.md` — Passes 1–6 checklists with MUI/shadcn target code |
| Component manifest | `docs/COMPONENT_MANIFEST.md` — which components have colocated CSS vs components.css-only |
| Reference components | `reference-components/*.css` — colocated component CSS for override reference |

## Theme token line numbers (for agent specificity)

| Theme block | tokens.css line |
|-------------|----------------|
| `:root` base tokens | 16–319 |
| `html.dark` shadow overrides | 327–335 |
| `html.theme-cp` (light) | 341 |
| `html.theme-cp.dark` | 465 |
| `html.theme-vp` (light) | 584 |
| `html.theme-vp.dark` | 687 |
| `html.theme-ppm` (light) | 786 |
| `html.theme-ppm.dark` | 889 |
| `html.theme-maconomy` (light) | 988 |
| `html.theme-maconomy.dark` | 1091 |

## Anti-patterns

- Do NOT import `harmony-styles/global.css` after MUI/shadcn styles — it must load first.
- Do NOT use MUI `CssBaseline` with Harmony's `reset.css` without documenting the conflict decision.
- Do NOT hardcode hex colors in `createTheme` — use `var(--*)` tokens so theme switching works.
- Do NOT skip dark mode overrides. Every `html.dark` and `html.theme-*.dark` block must be mapped.
- Do NOT skip the verification step.

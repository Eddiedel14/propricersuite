---
name: harmony-shell
description: Build the Harmony shell (header, sidebars, footer, floating nav, page header, panels) using MUI or shadcn primitives. Run after /harmony-theme.
disable-model-invocation: true
---

> **MANDATORY — read this before acting.**
> 1. Do NOT read `.cursor/agents/shell-builder.md` yourself — it is the subagent's instruction file, not yours.
> 2. Complete Step 1 (Detect) and report findings before proceeding.
> 3. Do NOT build shell components yourself. You MUST delegate via the Task tool. Delegation is required, not optional.
> 4. Do NOT skip Steps 3-4 (Verify + Fix loop). The verifier MUST run as a separate Task tool subagent.
> 5. If you produce shell component code without launching subagents, you have failed the task.

# Build Harmony Shell

Builds the full shell layout using MUI or shadcn, matching `reference-components/` exactly. This is not a generic "build a layout" — the shell-builder subagent has component-by-component instructions with specific CSS properties, structural requirements, and pitfalls derived from the reference implementation.

## Prerequisites

- `/harmony-theme` must have been run first (CSS imports, tokens, theme provider wired).
- Kit must be at project root with `reference-components/` and `harmony-styles/` accessible.

## Workflow

### Step 1 — Detect

Before delegating, determine the project state:

1. **Framework:** Check `package.json` for `@mui/material` (MUI) or `tailwindcss` + shadcn dependencies.
2. **Build tool:** Check for `vite.config.ts`, `next.config.js`/`next.config.ts`, or `react-scripts`.
3. **Entry point:** Locate `main.tsx`, `_app.tsx`, `app/layout.tsx` — where the shell component mounts.
4. **Existing shell:** Search for `AppBar`, `Drawer`, `Toolbar` imports (MUI) or existing layout component with sidebar/header structure (shadcn).
5. **Classify:**
   - **Existing app** → shell components found. Shell-builder will **restyle** the existing shell.
   - **Greenfield** → no shell found. Shell-builder will **build** from scratch.
6. **Report:** "Detected: [framework] + [build tool]. Project state: [existing/greenfield]. Entry point: [path]."

### Step 2 — Build (MUST delegate)

Use the **Task tool** to launch the shell-builder as a subagent. Do NOT build shell components yourself.

**Task tool call:**
- `subagent_type`: `"generalPurpose"`
- `prompt`: Include ALL of the following in the prompt:
  1. "Read `.cursor/agents/shell-builder.md` and follow every instruction in it."
  2. **Framework:** MUI or shadcn
  3. **Project state:** existing app or greenfield
  4. **Entry point path** (from Step 1)
  5. **Target theme** (from `/harmony-theme` output or `<html>` class)
- `description`: `"Run shell-builder component build"`

Wait for the subagent to complete and return its output before proceeding to Step 3.

The shell-builder reads `reference-components/`, builds each shell component in order, and matches every CSS property from the reference.

### Step 2.5 — File existence gate (do NOT skip)

Before launching the verifier, confirm every expected output file exists on
disk. Check for all of the following in the target project's shell components
directory:

Icon.tsx, LeftSidebar.tsx, LeftSidebar.css, RightSidebar.tsx,
RightSidebar.css, TabStrip.tsx, TabStrip.css, ShellFooter.tsx,
ShellFooter.css, FloatingNav.tsx, FloatingNav.css, ShellPageHeader.tsx,
ShellPageHeader.css, ShellHeader.tsx, ShellPanel.tsx, ShellPanel.css,
ShellLayout.tsx, ShellLayout.css

If any are missing:
1. Do NOT proceed to Step 3.
2. Use the Task tool to launch shell-builder again with the prompt:
   "The following files are missing from disk: [list]. Write each one to
   disk using the Write tool. Read each file back after writing to confirm
   it exists before moving to the next."
3. Re-check file existence after the builder returns.
4. Only proceed to Step 3 when all files are confirmed on disk.

### Step 3 — Verify (MUST delegate)

Use the **Task tool** to launch the shell-fidelity-verifier as a readonly subagent. Do NOT verify the shell yourself.

**Task tool call:**
- `subagent_type`: `"generalPurpose"`
- `readonly`: `true`
- `prompt`: Include ALL of the following:
  1. "Read `.cursor/agents/shell-fidelity-verifier.md` and follow every instruction in it."
  2. Paths to the built shell component files
  3. **Framework:** MUI or shadcn
  4. Paths to `reference-components/` (default: `reference-components/`)
  5. **Entry point file path** (from Step 1) — required for Wiring & Assets checks 72-77
  6. **Target theme** (from `/harmony-theme` output or `<html>` class, e.g. `theme-cp`) — required for per-theme checks 21, 29, 78-80
- `description`: `"Run shell-fidelity-verifier checks"`

Wait for the subagent to complete. It returns a numbered deviation list or "PASS: zero deviations."

### Step 4 — Fix loop (MUST delegate)

If the verifier returns deviations:

1. Use the **Task tool** to launch shell-builder again with the deviation list and the specific reference files that need re-reading appended to the prompt.
2. Use the **Task tool** to launch shell-fidelity-verifier again (same call pattern as Step 3).
3. Repeat until the verifier returns "PASS: zero deviations."

Do NOT fix deviations yourself. Do NOT mark the shell as complete until the verifier passes.

## Source files (read-only spec)

| Area | Path |
|------|------|
| Shell components (TSX) | `reference-components/ShellLayout.tsx`, `ShellHeader.tsx`, `LeftSidebar.tsx`, `RightSidebar.tsx`, `ShellFooter.tsx`, `FloatingNav.tsx`, `ShellPageHeader.tsx`, `ShellPanel.tsx`, `TabStrip.tsx`, `Icon.tsx`, `Card.tsx`, `Avatar.tsx`, `Button.tsx` |
| Colocated CSS | `reference-components/ShellLayout.css`, `LeftSidebar.css`, `RightSidebar.css`, `ShellFooter.css`, `FloatingNav.css`, `ShellPageHeader.css`, `ShellPanel.css`, `TabStrip.css`, `Avatar.css` |
| Global component CSS | `harmony-styles/components.css` — LEFT SIDEBAR (line 5241), RIGHT SIDEBAR (line 5484), SHELL LAYOUT (line 6351), SHELL PANEL (line 6489), CP FLOATING NAV (line 5031), SHELL FOOTER (line 2838), AVATAR (line 6310), CARD (line 2277) |
| Layout CSS | `harmony-styles/layout.css` |
| Tokens | `harmony-styles/tokens.css` — shell sizing tokens (lines 100-115) |
| Icon manifest | `harmony-data/icon-manifest.json` |
| Custom icons | `icons/custom/`, `harmony-assets/` |

## Anti-patterns

- Do NOT paste reference-components into the host app. They are spec, not drop-in code.
- Do NOT use MUI `Drawer` for sidebars — the reference uses `position: fixed` floating overlays, not modal drawers.
- Do NOT use flexbox for the shell container — the reference uses CSS Grid (`grid-template-rows`).
- Do NOT hardcode padding values — use `calc(var(--shell-layout-padding-side-default) + var(--space-5))`.
- Do NOT skip the verification step.

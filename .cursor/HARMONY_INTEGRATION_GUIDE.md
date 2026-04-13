# Harmony Integration Guide (Cursor)

## First-time setup

This kit includes two MCP servers (MUI and shadcn) that give the integration agents access to live component documentation. They improve accuracy on complex components and reduce errors during Pass 6.

On first open in Cursor:
1. Go to **Settings → MCP**
2. You will see **mui-mcp** and **shadcn** listed
3. Click **Enable** on both
4. Done — they stay enabled for this project

Skills and slash-style playbooks for this kit. **All skills live under `.cursor/skills/`.**

## Integration commands

| Command | Skill | What it does |
|---------|-------|--------------|
| **`/harmony-theme`** | `harmony-theme` (`disable-model-invocation: true`) | Detects framework (MUI/shadcn), delegates to `theme-builder` subagent (Passes 1–6: foundation, colors, typography, spacing, shape, component overrides), then runs `theme-verifier`. Loops until zero gaps. |
| **`/harmony-shell`** | `harmony-shell` (`disable-model-invocation: true`) | Detects framework, delegates to `shell-builder` subagent (converter-level fidelity against `reference-components/`), then runs `shell-fidelity-verifier` (68 structural checks). Loops until zero deviations. |

**Run order:** `/harmony-theme` first, then `/harmony-shell`.

## Page building commands

| Command | Skill | What it does |
|---------|-------|--------------|
| **`/build-layout`** or "build a settings page" | `build-layout` | Compose a page layout inside a Harmony-themed app. |
| **`/build-all-patterns`** or "build all pattern pages" | `build-all-patterns` | Build all pattern pages with dual verification. |
| **`/create-pattern`** or "create pattern from component" | `create-pattern` | Generate a new pattern doc from a component. |
| **`/search-patterns`** or "find wizard pattern" | `search-patterns` | Search the pattern registry. |

## Review commands

| Command | Skill | What it does |
|---------|-------|--------------|
| **`/harmony-critique`** | `harmony-critique` | Critique design/implementation against Harmony patterns, accessibility, and UX. |
| **`/ux-review`** | `ux-review` | Standalone UX review (framework-agnostic). |

## Skills index

### Integration skills

| Folder | Purpose |
|--------|---------|
| **harmony-theme** | Apply Harmony tokens to MUI/shadcn. Passes 1–6: foundation, colors, typography, spacing, shape/elevation, component overrides. Self-contained with builder + verifier subagents. |
| **harmony-shell** | Build the Harmony shell layout in MUI/shadcn. Converter-level fidelity against reference-components. Self-contained with builder + fidelity-verifier subagents. |

### Page building skills

| Folder | Purpose |
|--------|---------|
| **build-layout** | Compose a page layout inside a Harmony-themed MUI/shadcn app. |
| **layout-builder** | Composition rules, layout patterns, spacing constraints for page building. |
| **design-patterns** | Pattern registry: 45 design patterns with anatomy, usage, and Component Tree. |
| **build-all-patterns** | Build all pattern pages with dual verification (layout + fidelity). |
| **create-pattern** | Generate a new pattern doc from a component. |
| **search-patterns** | Search the pattern registry by query, product, or category. |

### Review and critique skills

| Folder | Purpose |
|--------|---------|
| **harmony-critique** | Critique design/implementation against Harmony patterns, accessibility, and UX. |
| **harmony-usage-rules** | Harmony component usage rules, accessibility, do's and don'ts. |
| **harmony-ux-principles** | UX principles: cognitive load, progressive disclosure, entry points, system status. |
| **ux-review** | Standalone UX review (framework-agnostic). |

## Agents

### Theme agents

| Agent | Role |
|-------|------|
| **theme-builder** | Applies Harmony tokens to MUI `createTheme` or shadcn Tailwind config. Passes 1–6. |
| **theme-verifier** | Read-only. Checks token coverage against playbook Passes 1–6 checklists. |

### Shell agents

| Agent | Role |
|-------|------|
| **shell-builder** | Builds the shell component-by-component with converter-level fidelity against reference-components. |
| **shell-fidelity-verifier** | Read-only. 68 structural checks against reference-components + harmony-styles CSS. |

### Page building agents

| Agent | Role |
|-------|------|
| **layout-verifier** | Read-only. Checks layout against composition constraints and pattern anatomy. |
| **pattern-fidelity-verifier** | Read-only. Compares built page to pattern markdown. Deviation list until zero. |

**Theme order:** theme-builder → theme-verifier. Loop on gaps.
**Shell order:** shell-builder → shell-fidelity-verifier. Loop on deviations.
**Page order:** build page → layout-verifier → pattern-fidelity-verifier. Fix deviations (max 3 rounds).

## Key docs

| Document | Purpose |
|----------|---------|
| [docs/MAPPING_PLAYBOOK.md](../docs/MAPPING_PLAYBOOK.md) | 8-pass workflow with per-category token checklists |
| [docs/COMPONENT_MANIFEST.md](../docs/COMPONENT_MANIFEST.md) | Row per reference-components component, host equivalents, mapping status |
| [docs/harmony-source-inventory.md](../docs/harmony-source-inventory.md) | Full token/component checklist, §12 mapping appendix |

## Rules

- **integration-source-first** — No implementation until inventory + pinned sources are read. Read MAPPING_PLAYBOOK.md before starting any pass.
- **skills-source-of-truth** — Edit skills only under `.cursor/skills/`.
- **layout-composition** — Spacing must use Harmony tokens; no Card-in-Card; page header first, button bar last.
- **pattern-fidelity-rule** — Every named item, component, label, and count from pattern markdown must appear exactly in built output.

## Parent handbook

[../HARMONY_INTEGRATION_HANDBOOK.md](../HARMONY_INTEGRATION_HANDBOOK.md)

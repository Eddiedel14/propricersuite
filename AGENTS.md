# Harmony Integration Kit — agent context

This repository (or merged `.cursor/` bundle) supports **Harmony → MUI/shadcn** integration. The **customer application** implements UI in **MUI** or **shadcn**; Harmony CSS, tokens, and reference shell TS/CSS are **sources of truth and spec**, not drop-in React shell components (unless you explicitly hybridize).

## First steps

1. Read **[HARMONY_INTEGRATION_HANDBOOK.md](HARMONY_INTEGRATION_HANDBOOK.md)**.
2. Read **[docs/MAPPING_PLAYBOOK.md](docs/MAPPING_PLAYBOOK.md)** — 8-pass workflow with per-category checklists.
3. Verify **[docs/PINNED_SOURCES.md](docs/PINNED_SOURCES.md)** — source files ship with the kit.
4. Build **[docs/harmony-source-inventory.md](docs/harmony-source-inventory.md)** via **[docs/GENERATE_INVENTORY.md](docs/GENERATE_INVENTORY.md)**.
5. Slash / skill index: **[.cursor/HARMONY_INTEGRATION_GUIDE.md](.cursor/HARMONY_INTEGRATION_GUIDE.md)**.

## Workflow

Two explicit commands, run in order:

1. **`/harmony-theme`** — Apply tokens, colors, typography, spacing, shadows, component overrides (Passes 1–6).
2. **`/harmony-shell`** — Build the shell layout: header, sidebars, footer, floating nav, page header, panels (Passes 7–8).

Each command auto-detects the framework (MUI/shadcn), delegates to a specialized builder subagent, then runs a verifier subagent. The build-verify cycle loops until zero gaps/deviations.

## Agents

### Theme agents

| Agent | File | Role |
|-------|------|------|
| **theme-builder** | `.cursor/agents/theme-builder.md` | Applies Harmony tokens to MUI `createTheme` or shadcn Tailwind config. Works through Passes 1–6 with specific token checklists. |
| **theme-verifier** | `.cursor/agents/theme-verifier.md` | Read-only. Checks token coverage against mapping playbook Passes 1–6 checklists. Returns numbered gap list. |

### Shell agents

| Agent | File | Role |
|-------|------|------|
| **shell-builder** | `.cursor/agents/shell-builder.md` | Builds the Harmony shell using MUI or shadcn with converter-level fidelity. Component-by-component against `reference-components/`. |
| **shell-fidelity-verifier** | `.cursor/agents/shell-fidelity-verifier.md` | Read-only. Compares built shell against `reference-components/` structurally. Returns numbered deviation list (68 checks). |

### Page building agents

| Agent | File | Role |
|-------|------|------|
| **layout-verifier** | `.cursor/agents/layout-verifier.md` | Read-only. Checks composed page layouts against layout-builder composition constraints and pattern anatomy. |
| **pattern-fidelity-verifier** | `.cursor/agents/pattern-fidelity-verifier.md` | Read-only. Compares built page component to pattern markdown (Component Tree, Key Elements, Anatomy, AI Agent Checklist). Deviation list until zero. |

## Where things live

| Area | Path |
|------|------|
| Handbook | `HARMONY_INTEGRATION_HANDBOOK.md` |
| Mapping playbook | `docs/MAPPING_PLAYBOOK.md` |
| Component manifest | `docs/COMPONENT_MANIFEST.md` |
| Pinned source record | `docs/PINNED_SOURCES.md` |
| Full inventory checklist | `docs/harmony-source-inventory.md` |
| Harmony CSS | `harmony-styles/` |
| Icon manifest | `harmony-data/icon-manifest.json` |
| Reference shell (spec) | `reference-components/` |
| Custom icons | `icons/custom/` |
| Public assets | `harmony-assets/` |
| Cursor skills | `.cursor/skills/` |
| Rules | `.cursor/rules/` |
| Agents | `.cursor/agents/` |

## Not in this kit

- `harmony-converter`, Astro conversion, `/convert-shell`
- `icons/tabler/outline/` (5000+ third-party SVGs; already embedded in `icon-manifest.json`)

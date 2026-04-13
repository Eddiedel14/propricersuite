# Harmony Integration Kit

Cursor skills, rules, and agents to apply **Harmony** (tokens, themes, shell behavior) to apps built with **MUI** or **shadcn/ui**. All Harmony source files ship with this kit — no external clone required. The **shell and all components** live in the host framework; reference shell files are **spec only**.

## Installation

The kit contents must be at your **project root**, not inside a subfolder. Cursor only reads `.cursor/` at the workspace root — if the kit is nested, skills, agents, and rules will not activate.

### Step 1 — Copy kit contents to the project root

Copy these directories and files from the kit into your project root:

```
.cursor/                          → your-project/.cursor/
harmony-styles/                   → your-project/harmony-styles/
harmony-data/                     → your-project/harmony-data/
harmony-assets/                   → your-project/harmony-assets/
icons/                            → your-project/icons/
reference-components/             → your-project/reference-components/
docs/                             → your-project/docs/
HARMONY_INTEGRATION_HANDBOOK.md   → your-project/HARMONY_INTEGRATION_HANDBOOK.md
AGENTS.md                         → your-project/AGENTS.md
KIT_VERSION                       → your-project/KIT_VERSION
CHANGELOG.md                      → your-project/CHANGELOG.md
```

### Step 2 — If your project already has `.cursor/`

Do **not** replace it. Merge the kit's contents into your existing `.cursor/` folder:

- Copy `skills/` folders into your existing `.cursor/skills/`
- Copy `agents/` files into your existing `.cursor/agents/`
- Copy `rules/` files into your existing `.cursor/rules/`
- Copy `HARMONY_INTEGRATION_GUIDE.md` into your existing `.cursor/`

### Step 3 — Handle README conflict

Do **not** overwrite your project's README with this file. The kit's primary documentation is `HARMONY_INTEGRATION_HANDBOOK.md`, not this README. Skip this file or rename it to `HARMONY_README.md` if you want to keep it.

### Step 4 — Verify

After merging, confirm the kit is active:

- `.cursor/skills/harmony-integration/SKILL.md` exists at the workspace root level
- Open **Cursor Settings > Rules** — the kit's skills should appear under **Agent Decides**
- Type `/integrate` in Agent chat — it should show as an available command

### Optional — .gitignore vendored directories

If your team does not want the vendored Harmony files committed to the project repo, add these to `.gitignore`:

```
harmony-styles/
harmony-data/
harmony-assets/
icons/custom/
reference-components/
```

### Step 5 — Delete the kit subfolder

If you copied the kit as a subfolder first, remove it after merging to avoid confusion:

```
rm -rf harmony-integration-kit/
```

## After installation

1. Verify paths in **[docs/PINNED_SOURCES.md](docs/PINNED_SOURCES.md)** — source files are in `harmony-styles/`, `harmony-data/`, `harmony-assets/`, `icons/custom/`, and `reference-components/`.
2. Read **[HARMONY_INTEGRATION_HANDBOOK.md](HARMONY_INTEGRATION_HANDBOOK.md)**.
3. Read **[docs/MAPPING_PLAYBOOK.md](docs/MAPPING_PLAYBOOK.md)** — the 8-pass workflow.
4. Generate **[docs/harmony-source-inventory.md](docs/harmony-source-inventory.md)** per **[docs/GENERATE_INVENTORY.md](docs/GENERATE_INVENTORY.md)**.
5. Say **"integrate Harmony"** in Agent chat — the `harmony-integration` skill is auto-detected and orchestrates the 8-pass workflow. See [.cursor/HARMONY_INTEGRATION_GUIDE.md](.cursor/HARMONY_INTEGRATION_GUIDE.md).

## Contents

| Path | Purpose |
|------|---------|
| `HARMONY_INTEGRATION_HANDBOOK.md` | Full kit documentation |
| `harmony-styles/` | Vendored CSS: tokens, reset, layout, components, utilities, global |
| `harmony-data/` | Icon manifest (self-contained inline SVGs) |
| `harmony-assets/` | Public SVGs (mic-slash, RS_Dela variants, logos) |
| `icons/custom/` | Project-specific custom icon SVGs |
| `reference-components/` | Designer .tsx + .css (read-only spec, 48 components) |
| `docs/` | Pinned sources, inventory, playbook, component manifest, generation steps |
| `.cursor/skills/` | 11 skills: integration hub (with /integrate), 6 page building, 4 review/critique |
| `.cursor/agents/` | 5 agents: implement, completeness, verifier, layout-verifier, pattern-fidelity-verifier |
| `.cursor/rules/` | 4 rules: source-first, skills location, layout composition, pattern fidelity |

Version: **`KIT_VERSION`**, history: **`CHANGELOG.md`**.

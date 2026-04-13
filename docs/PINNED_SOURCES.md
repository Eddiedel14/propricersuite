# Pinned Harmony sources

Record **exactly** what this project uses as the spec. Update when you bump Harmony.

## Option A — Kit-bundled sources (default)

All source files ship with this kit. No external clone needed.

| Asset | Path (relative to kit root) |
|-------|---------------------------|
| Global CSS (import chain) | `harmony-styles/global.css` (chains: tokens → reset → layout → components → utilities) |
| Individual CSS | `harmony-styles/tokens.css`, `reset.css`, `layout.css`, `components.css`, `utilities.css` |
| Icon manifest | `harmony-data/icon-manifest.json` (self-contained inline SVGs) |
| Custom icons | `icons/custom/` (project-specific SVGs) |
| Public assets | `harmony-assets/` (mic-slash.svg, RS_Dela variants, logos/) |
| Shell reference (read-only) | `reference-components/` — 48 .tsx + 43 .css + types.ts from designer starter for **spec comparison only**. Do not import into the customer app unless you deliberately hybridize. |

**Excluded:** `icons/tabler/outline/` (5000+ third-party SVGs from the tabler-icons package). These are already embedded as inline SVGs in `icon-manifest.json` and are not needed at runtime.

## Option B — npm package

| Package | Version |
|---------|---------|
| `@deltek/harmony-components` (or your registry name) | _fill in_ |

Use `node_modules/<package>/styles/*.css` and package `src/` for shell reference. Re-run inventory generation when the package version changes.

## Conflict rule

If narrative docs disagree with **CSS or TS** in the pinned snapshot, **CSS and TS win**.

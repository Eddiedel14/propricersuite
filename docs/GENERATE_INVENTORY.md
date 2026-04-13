# Generating `harmony-source-inventory.md`

Run these steps whenever you **pin** or **bump** Harmony sources ([PINNED_SOURCES.md](PINNED_SOURCES.md)).

## Prerequisites

- `harmony-styles/` on disk (shipped with this kit).
- `reference-components/` on disk (shipped with this kit).
- `harmony-data/icon-manifest.json` on disk (shipped with this kit).

## Automated extraction (suggested)

From the kit root:

1. **List custom properties in `tokens.css`**
   - Extract every `--name` under `:root`.
   - For each block `html.theme-cp`, `html.theme-vp`, `html.theme-ppm`, `html.theme-maconomy`, extract overrides (light).
   - For each `html.theme-*.dark`, extract dark overrides.
   - Deduplicate and group by token name; note which themes/modes set each.

   ```bash
   grep -oE '\-\-[a-zA-Z0-9_-]+' ./harmony-styles/tokens.css | sort -u
   ```

2. **Theme-scoped selectors in `components.css` and `layout.css`**

   ```bash
   grep 'html\.theme-' ./harmony-styles/components.css ./harmony-styles/layout.css
   ```

   Copy hit counts and representative selector lines into the inventory **§8.2 Theme-scoped rules** section.

3. **Colocated component CSS** (from `reference-components/`)

   ```bash
   ls ./reference-components/*.css
   grep -oE '\-\-[a-zA-Z0-9_-]+' ./reference-components/*.css | sort -u
   ```

4. **Icon manifest**

   - Top-level JSON keys = themes (`cp`, `vp`, `ppm`, `maconomy`).
   - Count icon names per theme; note any cross-theme differences.

   ```bash
   python3 -c "import json; d=json.load(open('./harmony-data/icon-manifest.json')); [print(f'{k}: {len(v)} icons') for k,v in d.items()]"
   ```

## Manual steps (required)

1. **Shell contract** — Read `reference-components/ShellLayout.tsx`: list props, `data-*` attributes, regions (header, floating nav, sidebars, footer, main), CP vs non-CP behavior (`showFloatingNav`, `showFooter`, etc.).
2. **Host mapping appendix** — For each MUI or shadcn primitive you use, add a row to §12: Harmony vars → host slot, with Pass # column.

## Output

Merge into [harmony-source-inventory.md](harmony-source-inventory.md): replace `<!-- TBD -->` sections and append dated **Revision** footer.

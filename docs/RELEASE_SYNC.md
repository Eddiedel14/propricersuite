# Release Sync (maintainer only)

**Audience:** Kit maintainers who update vendored files from `harmony-designer-starter`. Designers and consumers of this kit do not need this document.

## Upstream source

The vendored files in this kit originate from **harmony-designer-starter**. The designer starter has a packaging script at `scripts/package-designer-kit.sh` that can be used as a reference for what ships.

## Sync procedure

From the parent directory containing both repos:

```bash
STARTER=./harmony-designer-starter
KIT=./harmony-integration-kit

# 1. harmony-styles (6 CSS files)
cp "$STARTER"/harmony-styles/*.css "$KIT"/harmony-styles/

# 2. harmony-data (icon manifest)
cp "$STARTER"/harmony-data/icon-manifest.json "$KIT"/harmony-data/

# 3. harmony-assets (public SVGs)
cp "$STARTER"/public/mic-slash.svg "$KIT"/harmony-assets/
cp "$STARTER"/public/RS_Dela_Active.svg "$KIT"/harmony-assets/
cp "$STARTER"/public/RS_DelaDefault.svg "$KIT"/harmony-assets/
cp "$STARTER"/public/logos/PPMLogo.svg "$KIT"/harmony-assets/logos/

# 4. icons/custom (project-specific SVGs)
cp "$STARTER"/icons/custom/*.svg "$KIT"/icons/custom/

# 5. reference-components (components + CSS + types)
cp "$STARTER"/src/components/harmony/*.tsx "$KIT"/reference-components/
cp "$STARTER"/src/components/harmony/*.css "$KIT"/reference-components/
cp "$STARTER"/src/components/harmony/types.ts "$KIT"/reference-components/
```

## Excluded from sync

- `icons/tabler/outline/` — 5000+ third-party SVGs from the tabler-icons package. Already embedded as inline SVGs in `icon-manifest.json`.
- `node_modules/`, `dist/`, `.gitignore`, `package.json`, `vite.config.ts`, `tsconfig.json` — build/dev tooling specific to the designer starter.
- `src/App.tsx`, `src/main.tsx`, `src/pages/`, `src/componentRegistry.tsx` — designer starter app code.

## Validation

After sync, verify file counts:

| Directory | Expected count |
|-----------|---------------|
| `harmony-styles/` | 6 CSS files |
| `harmony-data/` | 1 JSON file |
| `harmony-assets/` | 4 SVG files (3 root + 1 in logos/) |
| `icons/custom/` | 44 SVG files (as of v2.0.0; may grow) |
| `reference-components/*.tsx` | 48 files |
| `reference-components/*.css` | 43 files |
| `reference-components/*.ts` | 1 file (types.ts) |

```bash
echo "harmony-styles: $(ls "$KIT"/harmony-styles/*.css | wc -l) CSS"
echo "harmony-data: $(ls "$KIT"/harmony-data/*.json | wc -l) JSON"
echo "harmony-assets: $(find "$KIT"/harmony-assets -name '*.svg' | wc -l) SVG"
echo "icons/custom: $(ls "$KIT"/icons/custom/*.svg | wc -l) SVG"
echo "reference-components tsx: $(ls "$KIT"/reference-components/*.tsx | wc -l)"
echo "reference-components css: $(ls "$KIT"/reference-components/*.css | wc -l)"
echo "reference-components ts: $(ls "$KIT"/reference-components/*.ts | wc -l)"
```

## When to bump version

Bump `KIT_VERSION` and add a `CHANGELOG.md` entry when:
- Any vendored file changes (CSS, manifest, reference-components components)
- Mapping playbook or agent definitions change
- Inventory template structure changes
- New components added to reference-components

## CHANGELOG format

```markdown
## X.Y.Z

- [category]: description of change
```

Categories: `vendored`, `playbook`, `agents`, `inventory`, `docs`, `skills`, `rules`.

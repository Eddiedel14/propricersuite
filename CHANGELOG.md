# Changelog

## 2.0.0

Breaking: pass-based mapping workflow replaces single-step integration.

- **vendored**: Shipped harmony-styles/ (6 CSS), harmony-data/ (icon manifest), harmony-assets/ (4 SVGs), icons/custom/ (44 SVGs), reference-components/ (48 tsx + 43 css + types.ts). Kit is now self-contained — no external clone of harmony-designer-starter needed.
- **playbook**: Added docs/MAPPING_PLAYBOOK.md with 8 ordered passes (Foundation, Colors, Typography, Spacing, Shape/Elevation, Component Overrides, Shell, Icons), each with concrete checklists derived from actual CSS files.
- **agents**: Three agents — harmony-implement (pass-based, one pass per invocation), harmony-completeness (read-only audit), harmony-verifier (read-only final check, corrected V2 CSS order). Replaced single harmony-integration-verifier.
- **inventory**: Expanded template — §3 is now a 4×2 matrix table, §4 split into pass-aligned subcategories (typography, spacing, radii, shadows, z-index, transitions, component sizing, base colors), §12 has Pass # column.
- **docs**: Added docs/COMPONENT_MANIFEST.md (48 rows, one per reference-components component with colocated CSS, components.css section, MUI/shadcn equivalents). Added docs/RELEASE_SYNC.md (maintainer sync procedure with file count validation).
- **docs**: Fixed CSS import order in inventory §2, handbook, verifier V2, and integrate-scenario-a — now correctly states tokens → reset → layout → components → utilities (matching global.css).
- **skills**: All skills and commands updated to reference MAPPING_PLAYBOOK.md, COMPONENT_MANIFEST.md, and pass-based workflow. Removed all harmony-designer-starter references from designer-facing paths.
- **rules**: integration-source-first.mdc updated to require MAPPING_PLAYBOOK.md read before any pass.

## 1.0.0

- Initial Harmony Integration Kit: handbook, inventory template, Cursor skills/rules/agents for Scenario A (existing MUI/shadcn app) and Scenario B (greenfield), source-first verifier.

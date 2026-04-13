# Harmony source inventory

**Purpose:** Single checklist of everything Harmony defines that must map to **MUI** or **shadcn**. This file is **generated/maintained** from pinned sources ([PINNED_SOURCES.md](PINNED_SOURCES.md)); do not rely on chat shorthand.

**Status:** Template — fill via [GENERATE_INVENTORY.md](GENERATE_INVENTORY.md).

**Mapping procedure:** Follow [MAPPING_PLAYBOOK.md](MAPPING_PLAYBOOK.md) passes 1–8. Update §12 after each pass.

---

## 1. Pin metadata

| Field | Value |
|-------|--------|
| Pinned snapshot / package | <!-- e.g. harmony-integration-kit v2.0.0 --> |
| Inventory last updated | <!-- ISO date --> |
| Host stack | <!-- MUI / shadcn --> |

---

## 2. CSS load order (contract)

Canonical order from `harmony-styles/global.css`:

1. `tokens.css`
2. `reset.css`
3. `layout.css`
4. `components.css`
5. `utilities.css`

Or import `global.css` as a single entry point (it chains all five in this order).

Notes: <!-- e.g. MUI CssBaseline interaction, Tailwind preflight conflicts -->

---

## 3. Themes and modes (from `tokens.css`)

**Derive from file;** reference snapshot uses four product themes on `<html>`:

| Theme | Class | Light | Dark | Light status | Dark status |
|-------|-------|-------|------|--------------|-------------|
| CP | `theme-cp` | `html.theme-cp` | `html.theme-cp.dark` | <!-- verified / partial / TBD --> | <!-- --> |
| VP | `theme-vp` | `html.theme-vp` | `html.theme-vp.dark` | <!-- --> | <!-- --> |
| PPM | `theme-ppm` | `html.theme-ppm` | `html.theme-ppm.dark` | <!-- --> | <!-- --> |
| Maconomy | `theme-maconomy` | `html.theme-maconomy` | `html.theme-maconomy.dark` | <!-- --> | <!-- --> |

If your pin differs, **replace this table** from actual selectors.

---

## 4. Base tokens (`tokens.css` `:root`)

### 4.1 Typography (Pass 3)

- [ ] Font families: `--font-sans`, `--font-display`, `--font-mono`
- [ ] Font sizes: `--text-xs` thru `--text-6xl` (10 values)
- [ ] Display scale: `--display-xl`, `--display-l`, `--display-m`
- [ ] Heading scale: `--heading-xl`, `--heading-l`, `--heading-m`, `--heading-s`
- [ ] Body scale: `--body-default`, `--body-emphasized`
- [ ] Supporting scale: `--caption`, `--label`, `--overline`, `--text-13`
- [ ] Font weights: `--font-light` thru `--font-extrabold` (6 values)
- [ ] Line heights: `--leading-none` thru `--leading-relaxed` (5 values)

### 4.2 Spacing (Pass 4)

- [ ] Spacing scale: `--space-0` thru `--space-24` (21 values)
- [ ] Border widths: `--border-width-thin/standard/medium/thick`
- [ ] Breakpoints: `--breakpoint-sm/md/lg/xl`

### 4.3 Radii (Pass 5)

- [ ] Semantic: `--radius-sm` thru `--radius-full` (6 + full)
- [ ] Numbered: `--radius-03` thru `--radius-100` (8 values)

### 4.4 Shadows and elevation (Pass 5)

- [ ] Light mode shadows: `--shadow-sm/md/lg/xl/2xl/dropdown`
- [ ] Dark mode shadow overrides (`html.dark`)
- [ ] Inset shadows: `--shadow-inset-sm/md`
- [ ] Focus rings: `--focus-ring-primary`, `-page-header`, `-error`, `-error-checked`, `-warning`, `-warning-checked`, `-date-picker`

### 4.5 Z-index (Pass 5)

- [ ] Numeric: `--z-base` thru `--z-50`
- [ ] Functional: `--z-dropdown`, `--z-sticky`, `--z-modal`, `--z-popover`, `--z-tooltip`
- [ ] Overlay: `--overlay-backdrop-opacity`

### 4.6 Transitions (Pass 5)

- [ ] `--transition-fast`, `--transition-base`, `--transition-slow`

### 4.7 Component sizing (Pass 4)

- [ ] Button heights: `--button-height-xs/sm/md/lg`
- [ ] Avatar sizes: `--avatar-size-sm/md/lg`
- [ ] Badge: `--badge-height-*`, `--badge-min-width-*`, `--badge-dot-size-*`
- [ ] Icon sizes: `--icon-xs/sm/md/lg/xl`, `--icon-stroke-width`
- [ ] Spinner: `--spinner-size-*`, `--spinner-stroke-width-*`
- [ ] Dropdown: `--dropdown-min-width`, `--dropdown-height`, `--dropdown-height-cp`, `--dropdown-menu-max-height`
- [ ] Input: `--input-height-cp`
- [ ] Dialog: `--dialog-min-width`, `--dialog-max-width-*`, `--dialog-width-percentage`, `--dialog-max-height`, margins, footer btn min-width
- [ ] Table: `--table-min-width`

### 4.8 Base colors (Pass 2 — non-theme-scoped)

- [ ] Alert chip colors: `--alert-chip-*-bg/fg` (8 pairs + disabled)
- [ ] Notification badge: `--notification-badge-error`
- [ ] Gradients: `--gradient-dela`, `--gradient-dela-start/end`, `--gradient-dela-hover-bg`, `--linear-new`
- [ ] Dela panel: `--dela-bubble-bg`, `--dela-user-bubble-bg`, `--dela-panel-*`, `--dela-header-content-fg`
- [ ] Shell footer: `--shell-footer-bg`, `--shell-footer-tab-*`, `--shell-sidebar-icon-color-on-primary`
- [ ] Company picker: `--company-picker-indicator-*` (6 values)
- [ ] Icon fallback: `--icon-fallback-bg/text/font-size/radius`
- [ ] Error fallback: `--color-error-bg-light`, `--color-error-text`

---

## 5. Theme overrides (per theme × mode)

For each theme/mode block in `tokens.css`, list **theme-specific** `--*` assignments.

### 5.1 CP light (`html.theme-cp`)

<!-- TBD: primary, backgrounds, text, borders, semantic, button, page-header, floating nav, sidebar, table, scrollbar -->

### 5.2 CP dark (`html.theme-cp.dark`)

<!-- TBD -->

### 5.3 VP light (`html.theme-vp`)

<!-- TBD -->

### 5.4 VP dark (`html.theme-vp.dark`)

<!-- TBD -->

### 5.5 PPM light (`html.theme-ppm`)

<!-- TBD -->

### 5.6 PPM dark (`html.theme-ppm.dark`)

<!-- TBD -->

### 5.7 Maconomy light (`html.theme-maconomy`)

<!-- TBD -->

### 5.8 Maconomy dark (`html.theme-maconomy.dark`)

<!-- TBD -->

---

## 6. `global.css` / `utilities.css`

- [ ] Variables or classes affecting **page chrome** or **content** documented below.

<!-- TBD: notable selectors / vars from utilities.css -->

---

## 7. `layout.css`

- [ ] Shell layout rules: `.page-wrapper`, `.header*`, `.sidebar*`, `.main*`
- [ ] Shell sizing tokens: `--shell-header-height`, `--shell-footer-height-*`, `--shell-layout-padding-*`, `--sidebar-width`, `--left-sidebar-width-compact`, `--right-sidebar-width-compact`
- [ ] `--panel-width-narrow`, `--panel-width-full`, `--shell-panel-width-full`
- [ ] Main padding when right sidebar present (shell contract)

<!-- TBD -->

---

## 8. `components.css` — global + theme-scoped

### 8.1 Component families (align with MAPPING_PLAYBOOK Pass 6)

- [ ] **Forms:** Button, Input, Textarea, Label, FormGroup, Select/Dropdown, Checkbox, Radio, Toggle/Switch, DateInput, DatePicker, TimePicker, DateTimePicker, MonthPicker, WeekPicker, NumberInput, RangeInput
- [ ] **Feedback:** Alert, Badge, NotificationBadge, Chip, Tooltip, ProgressBar, Spinner, Dialog/Modal
- [ ] **Data:** Card, Accordion, Table, Kanban, ListMenu, Tabs
- [ ] **Actions/Nav:** Link, ButtonGroup, Stepper, Avatar

### 8.2 Theme-scoped selectors (`html.theme-*`, `html.theme-*.dark`)

- [ ] CP compact inputs (line 4957)
- [ ] CP floating nav (line 5031)
- [ ] Sidebar visibility rules (line 5700)

<!-- TBD: summary of theme-scoped rules -->

---

## 9. Colocated component CSS (`reference-components/*.css`)

Per-file list of extra `--*` or selectors **not** fully covered in `components.css`. Cross-reference with [COMPONENT_MANIFEST.md](COMPONENT_MANIFEST.md).

| File | Purpose | Key selectors / vars |
|------|---------|----------------------|
| Input.css | Input-specific layout | <!-- --> |
| LeftSidebar.css | Left nav regions, panels | <!-- --> |
| RightSidebar.css | Right rail, Dela panel trigger | <!-- --> |
| ShellLayout.css | Shell grid, region sizing | <!-- --> |
| FloatingNav.css | CP floating nav behavior | <!-- --> |
| ShellPanel.css | Contextual drawer animations | <!-- --> |
| ShellFooter.css | Footer tab bar layout | <!-- --> |
| ShellPageHeader.css | Page header button region | <!-- --> |
| <!-- other files --> | <!-- --> | <!-- --> |

---

## 10. Shell behavioral spec (reference TS only)

**Source:** pinned `reference-components/ShellLayout.tsx` (+ header, footer, sidebars). **Do not import into app** unless hybrid.

| Topic | Spec notes |
|-------|------------|
| Props affecting chrome | `showFloatingNav`, `showFooter`, `showRightSidebar`, `footerVariant`, sidebar variants, tabs |
| `data-*` contract | `data-cp-variant`, `data-has-footer`, `data-has-floating-nav`, `data-has-right-sidebar` |
| CP vs PPM-style shell | Floating nav vs footer emphasis; per-theme sidebar content |
| Regions | Header, optional floating nav, left nav, main + page header slot, right rail, footer |

<!-- TBD: expand from actual file -->

---

## 11. Icons

**Source:** `harmony-data/icon-manifest.json`

| Theme key | Icon name count | Notes |
|-----------|-----------------|-------|
| cp | <!-- n --> | <!-- --> |
| vp | <!-- n --> | |
| ppm | <!-- n --> | |
| maconomy | <!-- n --> | |

**Resolution / fallback** (from reference `reference-components/Icon.tsx` if used as spec):

<!-- TBD: manifest → merged map → library fallbacks -->

---

## 12. Host mapping appendix (MUI or shadcn)

Map inventory rows to **implementation**. Add rows as you implement. Include **Pass #** to trace each mapping to its playbook pass.

| Pass # | Harmony surface | Host primitive / slot | Mapped? | Notes |
|--------|-----------------|----------------------|---------|-------|
| <!-- 1 --> | <!-- e.g. CSS import chain --> | <!-- e.g. main.tsx imports --> | ☐ | |
| <!-- 2 --> | <!-- e.g. --theme-primary --> | <!-- MUI palette.primary.main --> | ☐ | |
| <!-- 3 --> | <!-- e.g. --font-sans --> | <!-- MUI typography.fontFamily --> | ☐ | |
| <!-- ... --> | <!-- ... --> | <!-- ... --> | ☐ | |

---

## 13. Explicit gaps

Document **intentional** non-mapped items (with reason and owner).

| Item | Pass # | Reason |
|------|--------|--------|
| <!-- --> | <!-- --> | <!-- --> |

---

## Revision

| Date | Author | Change |
|------|--------|--------|
| <!-- --> | <!-- --> | Template v2 — pass-aligned sections, 4×2 matrix, component families |

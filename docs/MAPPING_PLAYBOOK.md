# Mapping Playbook

**Purpose:** Step-by-step procedure for applying Harmony tokens, component styles, and shell behavior to a **MUI** or **shadcn/ui** host app. Each pass targets one category, has a concrete checklist, and produces `harmony-source-inventory.md` §12 rows.

**Rule:** Do not skip passes. Run 1 through 8 in order. After all passes, run the completeness agent, then the verifier.

---

## How to use this playbook

1. Open `docs/PINNED_SOURCES.md` — confirm all kit paths resolve.
2. Open `docs/harmony-source-inventory.md` — if still template, run `docs/GENERATE_INVENTORY.md` first.
3. For each pass below:
   - Read the **Source** files listed.
   - Apply the mapping to the host project (MUI `createTheme` / shadcn CSS vars + Tailwind config).
   - Update `harmony-source-inventory.md` §12 with a row per mapped token group (include **Pass #** column).
   - Mark the pass complete before moving to the next.

---

## Pass 1 — Foundation

**Goal:** Wire the Harmony CSS import chain, set theme class on `<html>`, configure framework provider.

### Source files

- `harmony-styles/global.css` (import chain definition)
- `harmony-styles/tokens.css` (theme selectors to verify)

### Checklist

- [ ] Import `harmony-styles/global.css` in host entry point (or import individual sheets in canonical order: **tokens → reset → layout → components → utilities**)
- [ ] Resolve conflicts: MUI `CssBaseline` or Tailwind `preflight` vs `reset.css` — document decision in inventory §2
- [ ] Set exactly one `theme-cp` | `theme-vp` | `theme-ppm` | `theme-maconomy` class on `<html>`
- [ ] Set `dark` class on `<html>` alongside `theme-*` for dark mode
- [ ] MUI: wrap app root in `StyledEngineProvider injectFirst` + `ThemeProvider`; create base `createTheme({})` skeleton. Do NOT enable `cssVariables: true` on the theme object.
- [ ] shadcn: configure `tailwind.config.ts` with empty theme extension; add Harmony CSS vars to global stylesheet; set `tailwind.cssVariables: true` in `components.json`; add `@theme inline` block in `globals.css` mapping Harmony tokens to Tailwind color names (required for Tailwind v4)
- [ ] Verify all 8 combinations resolve (4 themes × light/dark) — inspect computed styles on `<html>` for `--theme-primary`

### MUI target

```
StyledEngineProvider injectFirst + ThemeProvider wrapping <App />
createTheme({}) — cssVariables: true must NOT be set
Global CSS imported before MUI styles
```

### shadcn target

```
tailwind.config.ts with theme.extend skeleton
globals.css importing harmony-styles/global.css
components.json: tailwind.cssVariables: true
globals.css: @theme inline block mapping Harmony tokens to Tailwind color names (Tailwind v4)
```

### Inventory update

§2 (CSS load order), §3 (themes/modes matrix — mark cells verified), §12 rows for import chain + provider.

---

## Pass 2 — Colors

**Goal:** Map every color token from `tokens.css` theme blocks into MUI palette or shadcn CSS variables.

### Source files

- `harmony-styles/tokens.css` — theme blocks: `html.theme-cp` (line 341), `html.theme-cp.dark` (465), `html.theme-vp` (584), `html.theme-vp.dark` (687), `html.theme-ppm` (786), `html.theme-ppm.dark` (889), `html.theme-maconomy` (988), `html.theme-maconomy.dark` (1091)
- `harmony-styles/tokens.css` — `:root` base color tokens (alert chips, notification badge, gradients, shell footer, company picker)

### Checklist — theme-scoped colors (per theme × mode)

- [ ] Primary: `--theme-primary`, `--theme-primary-hover`, `--theme-primary-light`, `--theme-primary-border`, `--theme-primary-hover-light`
- [ ] Backgrounds: `--page-bg`, `--card-bg`, `--nav-bg`, `--input-bg`, `--input-disabled-bg`, `--surface-bg`, `--elevated-bg`, `--hover-bg`
- [ ] Text: `--text-primary`, `--text-secondary`, `--text-muted`, `--text-inverse`
- [ ] Borders: `--border-color`, `--border-light`, `--border-focus`
- [ ] Link: `--link-color`
- [ ] Semantic: `--color-success`, `--color-success-hover`, `--color-warning`, `--color-error`, `--color-info`
- [ ] Semantic opacity: `--color-info-light`, `--color-info-border`, `--color-success-light`, `--color-success-border`, `--color-success-bg-subtle`, `--color-warning-light`, `--color-warning-border`, `--color-warning-focus`, `--color-error-light`, `--color-error-border`, `--color-error-bg-subtle`, `--color-error-focus`
- [ ] Theme buttons: `--theme-btn-primary`, `--theme-btn-primary-hover`, `--theme-btn-primary-disabled-bg`, `--theme-btn-primary-disabled-fg`, `--theme-btn-secondary-stroke`, `--theme-btn-secondary-hover-bg`, `--theme-btn-secondary-hover-fg`, `--theme-btn-secondary-hover-stroke`, `--theme-btn-secondary-disabled-fg`, `--theme-btn-tertiary-fg`, `--theme-btn-tertiary-hover-bg`, `--theme-btn-tertiary-disabled-fg`
- [ ] Page header buttons: `--page-header-btn-primary`, `-hover`, `-disabled-bg`, `-disabled-fg`, `--page-header-btn-secondary-stroke`, `-default-fg`, `-hover-bg`, `-hover-fg`, `-hover-stroke`, `-disabled-fg`, `--page-header-btn-tertiary-fg`, `-hover-bg`, `-disabled-fg`
- [ ] Table: `--table-total-bg`, `--table-header-gray-bg`, `--table-row-hover-bg`, `--table-row-selected-bg`, `--table-row-selected-hover-bg`
- [ ] Kanban: `--kanban-in-progress-border`, `--kanban-done-border`
- [ ] Scrollbar: `--scrollbar-track`, `--scrollbar-thumb`, `--scrollbar-thumb-hover`

### Checklist — CP-specific colors

- [ ] Floating nav: `--floating-nav-btn-primary`, `-hover`, `-active`, `-fg`, `--floating-nav-btn-secondary`, `-hover-bg`, `-active-bg`, `--floating-nav-divider`, `-accent`, `--floating-nav-pin`, `-hover`
- [ ] CP sidebar: `--cp-sidebar-item-fg`, `--cp-sidebar-item-hover-bg`, `--cp-sidebar-section-border`
- [ ] CP dark floating nav: `--floating-nav-bg-dark`, `-border-dark`, `-btn-secondary-dark`, `-btn-secondary-hover-bg-dark`, `-btn-disabled-fg-dark`, `-btn-disabled-bg-dark`, `-divider-dark`, `-divider-accent-dark`, `-pin-dark`, `-pin-hover-dark`
- [ ] CP dark sidebar: `--cp-sidebar-section-bg-dark`, `-border-dark`, `-item-fg-dark`, `-item-hover-bg-dark`

### Checklist — base `:root` colors (not theme-scoped)

- [ ] Notification badge: `--notification-badge-error`
- [ ] Alert chip colors: `--alert-chip-blue-bg/fg`, `--alert-chip-error-bg/fg`, `--alert-chip-warning-bg/fg`, `--alert-chip-success-bg/fg`, `--alert-chip-info-bg/fg`, `--alert-chip-orange-bg/fg`, `--alert-chip-pink-bg/fg`, `--alert-chip-disabled-bg/fg/border`
- [ ] Gradients: `--gradient-dela`, `--gradient-dela-start`, `--gradient-dela-end`, `--gradient-dela-hover-bg`, `--linear-new`
- [ ] Dela panel: `--dela-bubble-bg`, `--dela-user-bubble-bg`, `--dela-panel-avatar-bg`, `--dela-panel-content-bg`, `--dela-panel-input-bg`, `--dela-panel-card-bg`, `--dela-header-content-fg`
- [ ] Shell footer: `--shell-footer-bg`, `--shell-footer-tab-hover-bg`, `--shell-footer-tab-label-color`, `--shell-footer-tab-icon-color-active`, `--shell-sidebar-icon-color-on-primary`
- [ ] Company picker: `--company-picker-indicator-acme`, `-ocean`, `-violet`, `-azure`, `-sunset`, `-default`
- [ ] Error fallback: `--color-error-bg-light`, `--color-error-text`
- [ ] Icon fallback: `--icon-fallback-bg`, `--icon-fallback-text`

### MUI target

```typescript
createTheme({
  palette: {
    primary: { main: 'var(--theme-primary)', ... },
    secondary: { ... },
    error: { main: 'var(--color-error)', ... },
    warning: { main: 'var(--color-warning)', ... },
    success: { main: 'var(--color-success)', ... },
    info: { main: 'var(--color-info)', ... },
    text: { primary: 'var(--text-primary)', secondary: 'var(--text-secondary)', disabled: 'var(--text-muted)' },
    background: { default: 'var(--page-bg)', paper: 'var(--card-bg)' },
    divider: 'var(--border-light)',
    action: { hover: 'var(--hover-bg)' },
  },
})
```

### shadcn target

Map each token group to `:root` / `.dark` CSS variables consumed by Tailwind. Theme-scoped tokens already resolve through `html.theme-*` classes; shadcn globals reference `var(--*)` directly.

### Inventory update

§5 (theme overrides per theme × mode), §12 rows for every color token group above with Pass # = 2.

---

## Pass 3 — Typography

**Goal:** Map all font family, size, weight, line height, and type-scale tokens.

### Source files

- `harmony-styles/tokens.css` — `:root` block (lines 16–67)
- `harmony-styles/reset.css` — `@import` for Google Fonts (Figtree, Lexend, JetBrains Mono)

### Checklist

- [ ] Font families: `--font-sans` (Figtree), `--font-display` (Lexend), `--font-mono` (JetBrains Mono)
- [ ] Font sizes: `--text-xs` (0.75rem), `--text-sm` (0.875rem), `--text-base` (1rem), `--text-lg` (1.125rem), `--text-xl` (1.25rem), `--text-2xl` (1.5rem), `--text-3xl` (1.875rem), `--text-4xl` (2.25rem), `--text-5xl` (3rem), `--text-6xl` (3.75rem)
- [ ] Display scale: `--display-xl` (3.75rem), `--display-l` (3rem), `--display-m` (2.25rem)
- [ ] Heading scale: `--heading-xl` (1.875rem), `--heading-l` (1.5rem), `--heading-m` (1.25rem), `--heading-s` (1.125rem)
- [ ] Body scale: `--body-default` (1rem), `--body-emphasized` (1rem + semibold weight)
- [ ] Supporting scale: `--caption` (0.75rem), `--label` (0.875rem), `--overline` (0.625rem), `--text-13` (0.8125rem)
- [ ] Font weights: `--font-light` (300), `--font-normal` (400), `--font-medium` (500), `--font-semibold` (600), `--font-bold` (700), `--font-extrabold` (800)
- [ ] Line heights: `--leading-none` (1), `--leading-tight` (1.25), `--leading-snug` (1.375), `--leading-normal` (1.5), `--leading-relaxed` (1.625)
- [ ] Font imports: verify Figtree, Lexend, JetBrains Mono load (via reset.css `@import` or host font loading)

### MUI target

```typescript
createTheme({
  typography: {
    fontFamily: 'var(--font-sans)',
    h1: { fontFamily: 'var(--font-display)', fontSize: 'var(--display-xl)', fontWeight: 'var(--font-bold)', lineHeight: 'var(--leading-tight)' },
    h2: { fontFamily: 'var(--font-display)', fontSize: 'var(--display-l)', ... },
    h3: { fontSize: 'var(--heading-xl)', ... },
    // ... map heading-l, heading-m, heading-s, body, caption, overline
    body1: { fontSize: 'var(--body-default)', lineHeight: 'var(--leading-normal)' },
    body2: { fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)' },
    caption: { fontSize: 'var(--caption)' },
    overline: { fontSize: 'var(--overline)' },
  },
})
```

### shadcn target

```typescript
// tailwind.config.ts
theme: {
  extend: {
    fontFamily: {
      sans: ['var(--font-sans)'],
      display: ['var(--font-display)'],
      mono: ['var(--font-mono)'],
    },
    fontSize: {
      xs: 'var(--text-xs)',
      sm: 'var(--text-sm)',
      // ... all --text-* and scale tokens
    },
  },
}
```

### Inventory update

§4 typography checklist items, §12 rows for font families, size scale, weight scale, line heights, type scale with Pass # = 3.

---

## Pass 4 — Spacing and Sizing

**Goal:** Map spacing scale, component sizing tokens, border widths, and breakpoints.

### Source files

- `harmony-styles/tokens.css` — `:root` block (lines 69–319)

### Checklist — spacing scale

- [ ] `--space-0` (0), `--space-0-5` (2px), `--space-1` (4px), `--space-1-5` (6px), `--space-2` (8px), `--space-2-5` (10px), `--space-3` (12px), `--space-3-5` (14px), `--space-4` (16px), `--space-5` (20px), `--space-6` (24px), `--space-7` (28px), `--space-8` (32px), `--space-9` (36px), `--space-10` (40px), `--space-11` (44px), `--space-12` (48px), `--space-14` (56px), `--space-16` (64px), `--space-20` (80px), `--space-24` (96px)

### Checklist — shell sizing

- [ ] `--shell-header-height` (56px), `--shell-footer-height-default` (48px), `--shell-footer-height-compact` (40px)
- [ ] `--shell-layout-padding-top` (88px), `--shell-layout-padding-side-default` (52px), `--shell-layout-padding-side-standard` (52px), `--shell-layout-padding-side-tablet` (32px), `--shell-layout-padding-side-mobile` (16px)
- [ ] `--sidebar-width` (52px), `--left-sidebar-width-compact` (44px), `--right-sidebar-width-compact` (44px)
- [ ] `--left-sidebar-icon-size-compact` (20px), `--right-sidebar-icon-size-compact` (20px), `--right-sidebar-dela-size-compact` (28px)
- [ ] `--shell-panel-width-full` (100vw), `--panel-width-narrow` (596px), `--panel-width-full` (1300px)

### Checklist — component sizing

- [ ] Button heights: `--button-height-xs` (24px), `--button-height-sm` (32px), `--button-height-md` (40px), `--button-height-lg` (48px)
- [ ] Avatar sizes: `--avatar-size-sm` (32px), `--avatar-size-md` (40px), `--avatar-size-lg` (48px)
- [ ] Badge: `--badge-height-sm/md/lg` (19px), `--badge-min-width-sm/md` (19px), `--badge-min-width-lg` (32px), `--badge-dot-size-sm` (6px), `-md` (10px), `-lg` (15px)
- [ ] Icon sizes: `--icon-xs` (12px), `--icon-sm` (16px), `--icon-md` (20px), `--icon-lg` (24px), `--icon-xl` (32px), `--icon-stroke-width` (1.5)
- [ ] Spinner: `--spinner-size-xs` (12px), `-sm` (14px), `-md` (16px), `-lg` (18px), `--spinner-stroke-width-xs` (2), `-sm` (2.5), `-md` (3), `-lg` (3.5)
- [ ] Dropdown: `--dropdown-min-width` (180px), `--dropdown-height` (40px), `--dropdown-height-cp` (20px), `--dropdown-menu-max-height` (300px)
- [ ] Input: `--input-height-cp` (20px)
- [ ] Dialog: `--dialog-min-width` (600px), `--dialog-max-width-default` (700px), `--dialog-width-percentage` (90%), `--dialog-max-height` (90vh), `--dialog-margin` (var(--space-4)), `--dialog-margin-horizontal/vertical` (var(--space-8)), `--dialog-max-width-medium` (90vw), `--dialog-footer-btn-min-width`
- [ ] Table: `--table-min-width` (600px)

### Checklist — border widths

- [ ] `--border-width-thin` (1px), `--border-width-standard` (2px), `--border-width-medium` (3px), `--border-width-thick` (4px)

### Checklist — breakpoints

- [ ] `--breakpoint-sm` (640px), `--breakpoint-md` (768px), `--breakpoint-lg` (1024px), `--breakpoint-xl` (1280px)

### MUI target

```typescript
createTheme({
  spacing: 4,  // Harmony uses 4px base
  breakpoints: { values: { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280 } },
  components: {
    MuiButton: { defaultProps: { size: 'medium' }, styleOverrides: { sizeMedium: { height: 'var(--button-height-md)' } } },
    MuiDialog: { styleOverrides: { paper: { minWidth: 'var(--dialog-min-width)', maxWidth: 'var(--dialog-max-width-default)' } } },
    // ... other component sizing
  },
})
```

### shadcn target

```typescript
// tailwind.config.ts
theme: {
  extend: {
    spacing: { '0.5': 'var(--space-0-5)', '1': 'var(--space-1)', /* ... */ },
    screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' },
  },
}
```

### Inventory update

§4 spacing checklist, §7 layout tokens, §12 rows for spacing scale, shell sizing, component sizing, border widths, breakpoints with Pass # = 4.

---

## Pass 5 — Shape and Elevation

**Goal:** Map border radii, shadows (light + dark), focus rings, z-index, and transitions.

### Source files

- `harmony-styles/tokens.css` — `:root` (lines 117–233) and `html.dark` (lines 327–335)

### Checklist — radii

- [ ] Semantic: `--radius-sm` (0.25rem), `--radius-md` (0.375rem), `--radius-lg` (0.5rem), `--radius-xl` (0.75rem), `--radius-2xl` (1rem), `--radius-full` (9999px)
- [ ] Numbered: `--radius-03` (3px), `--radius-04` (4px), `--radius-06` (6px), `--radius-08` (8px), `--radius-12` (12px), `--radius-16` (16px), `--radius-24` (24px), `--radius-100` (9999px)

### Checklist — shadows

- [ ] Light mode: `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`, `--shadow-2xl`, `--shadow-dropdown`
- [ ] Dark mode (`html.dark`): all six shadows overridden with increased opacity (rgba black 0.3–0.5)
- [ ] Inset shadows: `--shadow-inset-sm`, `--shadow-inset-md`

### Checklist — focus rings

- [ ] `--focus-ring-opacity` (0.32)
- [ ] `--focus-ring-primary`: 3px theme-primary-light + 4px card-bg
- [ ] `--focus-ring-page-header`: 3px dark teal + 4px card-bg
- [ ] `--focus-ring-error`, `--focus-ring-error-checked`
- [ ] `--focus-ring-warning`, `--focus-ring-warning-checked`
- [ ] `--focus-ring-date-picker`: 2px theme-primary-light

### Checklist — z-index

- [ ] Numeric: `--z-base` (0), `--z-10` (10), `--z-20` (20), `--z-30` (30), `--z-40` (40), `--z-44` (44), `--z-45` (45), `--z-46` (46), `--z-47` (47), `--z-50` (50)
- [ ] Functional: `--z-dropdown` (100), `--z-sticky` (200), `--z-modal` (300), `--z-popover` (400), `--z-tooltip` (500)
- [ ] Overlay: `--overlay-backdrop-opacity`: rgba(0, 0, 0, 0.5)

### Checklist — transitions

- [ ] `--transition-fast` (150ms ease), `--transition-base` (200ms ease), `--transition-slow` (300ms ease)

### MUI target

```typescript
createTheme({
  shape: { borderRadius: 8 },  // --radius-08 as default; override per-component
  shadows: [
    'none',
    'var(--shadow-sm)',
    'var(--shadow-md)',
    // ... map to MUI's 25-shadow array
  ],
  zIndex: {
    mobileStepper: 'var(--z-10)',
    appBar: 'var(--z-50)',
    drawer: 'var(--z-modal)',
    modal: 'var(--z-modal)',
    snackbar: 'var(--z-popover)',
    tooltip: 'var(--z-tooltip)',
  },
  transitions: { duration: { shortest: 150, short: 200, standard: 300 } },
})
```

### shadcn target

```typescript
// tailwind.config.ts
theme: {
  extend: {
    borderRadius: { sm: 'var(--radius-sm)', md: 'var(--radius-md)', lg: 'var(--radius-lg)', /* ... */ },
    boxShadow: { sm: 'var(--shadow-sm)', md: 'var(--shadow-md)', /* ... */ },
    zIndex: { dropdown: 'var(--z-dropdown)', modal: 'var(--z-modal)', /* ... */ },
  },
}
```

### Inventory update

§4 radii/shadow/z-index checklist items, §12 rows for radii, shadows, focus rings, z-index, transitions with Pass # = 5.

---

## Pass 6 — Component Overrides

**Goal:** Map Harmony component classes from `components.css` (and colocated CSS) to MUI `components.Mui*.styleOverrides` or shadcn component-level styles.

### Source files

- `harmony-styles/components.css` — section headers and their line numbers listed below
- `reference-components/*.css` — colocated component CSS
- `docs/COMPONENT_MANIFEST.md` — cross-reference for which components have colocated CSS vs components.css-only styles

### Checklist — form controls

| Component | components.css section | Colocated CSS | Key tokens/patterns |
|-----------|----------------------|---------------|---------------------|
| Button | BUTTON (line 8) | none | `.btn`, `.btn--xs/sm/md/lg`, `.btn--primary/secondary/tertiary/ghost/danger`, `.btn--icon-*` |
| Input | INPUT (line 458) | Input.css | `.input`, height/padding/border/focus states |
| Textarea | TEXTAREA (line 526) | Textarea.css | `.textarea`, resize, min-height |
| Label | LABEL (line 579) | Label.css | `.label`, `.label--required`, `.label--disabled` |
| FormGroup | FORM GROUP (line 609) | none | `.form-group`, spacing, error states |
| Select/Dropdown | SELECT/DROPDOWN (line 1223) | Dropdown.css | `.dropdown`, `.dropdown-menu`, chevron, focus |
| Checkbox | CHECKBOX (line 834) | Checkbox.css | `.checkbox`, custom indicator, checked/indeterminate/error/warning |
| Radio | RADIO (line 985) | RadioButton.css | `.radio`, custom indicator, checked/error/warning |
| Toggle | TOGGLE/SWITCH (line 1135) | Toggle.css | `.toggle`, track/thumb, checked, sizes |
| DateInput | DATE INPUT (line 2973) | DateInput.css | `.date-input`, calendar icon, focus |
| DatePicker | DATE PICKER (line 3138) | DatePicker.css | `.date-picker`, calendar grid, selection |
| TimePicker | TIME PICKER (line 3484) | TimePicker.css | `.time-picker`, hour/minute selectors |
| DateTimePicker | DATETIME (line 3626) | DateTimePicker.css | combined date + time |
| MonthPicker | MONTH PICKER (line 3652) | MonthPicker.css | `.month-picker`, grid |
| WeekPicker | WEEK PICKER (line 3772) | WeekPicker.css | `.week-picker`, row selection |
| NumberInput | NUMBER INPUT (line 3921) | NumberInput.css | `.number-input`, stepper buttons |
| RangeInput | RANGE INPUT (line 4002) | RangeInput.css | `.range-input`, track/thumb |

### Checklist — feedback

| Component | components.css section | Colocated CSS | Key tokens/patterns |
|-----------|----------------------|---------------|---------------------|
| Alert | ALERT (line 2081) | Alert.css | `.alert`, `.alert--info/success/warning/error`, icon + dismiss |
| Badge | BADGE (line 1574) | Badge.css | `.badge`, `.badge--sm/md/lg`, color variants |
| NotificationBadge | NOTIFICATION BADGE (line 1660) | NotificationBadge.css | `.notification-badge`, dot/count, positioning |
| Chip | CHIP (line 1781) | Chip.css | `.chip`, sizes, fill/outline variants, type variants, remove button |
| Tooltip | TOOLTIP (line 2460) | Tooltip.css | `.tooltip`, positioning, arrow, dark bg |
| ProgressBar | PROGRESS BAR (line 2737) | ProgressBar.css | `.progress-bar`, track/fill, sizes |
| Spinner | SPINNER (line 2783) | Spinner.css | `.spinner`, sizes, stroke animation |
| Dialog | DIALOG/MODAL (line 2589) | Dialog.css | `.dialog`, overlay, header/body/footer, sizing |

### Checklist — data display

| Component | components.css section | Colocated CSS | Key tokens/patterns |
|-----------|----------------------|---------------|---------------------|
| Card | CARD (line 2277) | none | `.card`, elevation, padding, hover states |
| Accordion | ACCORDION (line 2390) | Accordion.css | `.accordion`, expand/collapse, border |
| Table | TABLE (line 5771) | Table.css | `.table`, header/body/row/cell, sorting, selection, hover |
| Kanban | KANBAN (line 7082) | Kanban.css, KanbanCard.css | `.kanban-board`, column/card layout |
| ListMenu | LIST MENU (line 4841) | ListMenu.css | `.list-menu`, item/divider/icon |
| Tabs | TABS (line 2811) | TabStrip.css | `.tabs`, `.tab`, active indicator, sizes |

### Checklist — actions and navigation

| Component | components.css section | Colocated CSS | Key tokens/patterns |
|-----------|----------------------|---------------|---------------------|
| Link | LINK (line 2920) | Link.css | `.link`, underline, visited, sizes |
| ButtonGroup | BUTTON GROUP (line 4606) | ButtonGroup.css | `.button-group`, joined borders, active state |
| Stepper | STEPPER (line 4106) | Step.css | `.stepper`, step indicator, connector, states |
| Avatar | AVATAR (line 6310) | Avatar.css | `.avatar`, sizes, initials, image |

### Checklist — theme-scoped overrides in components.css

- [ ] CP compact inputs (line 4957): `html.theme-cp` reduces input/dropdown heights to 20px
- [ ] CP floating nav (line 5031): `html.theme-cp` floating navigation bar styles
- [ ] Sidebar visibility rules (line 5700): `html.theme-*` controls which sidebar variant renders

### MUI target

**BEM class names first.** Harmony's `components.css` is already loaded globally. For each component family, build wrapper components that apply Harmony BEM class names directly to MUI elements. The global cascade handles all visual behavior (hover, focus, disabled, dark mode) automatically.

```typescript
// Wrapper applies BEM classes — cascade handles all visual states
function HarmonyButton({ variant = 'primary', size = 'md', children, ...props }) {
  return (
    <Button className={`btn btn--${variant} btn--${size}`} disableRipple {...props}>
      {children}
    </Button>
  );
}
```

Only add `components.Mui<Name>.styleOverrides` for **structural layout properties** the cascade cannot cover: grid placement, overflow, position, min/max width/height for overlay components. Do NOT put color, background, border, hover, focus, or font properties in `styleOverrides`.

### shadcn target

**BEM class names first.** In each generated `components/ui/` file, replace Tailwind visual utility classes (color, background, border, radius, padding, height, font, hover, focus, dark) with Harmony BEM class names. Keep Tailwind only for structural layout utilities (`flex`, `gap-*`, `w-full`, `overflow-*`) that the Harmony cascade does not cover. Theme-scoped rules are inherited automatically from the global cascade — do not add `html.theme-*` selectors inside component files.

### Inventory update

§8 component families, §9 colocated CSS, §12 rows per component family with Pass # = 6.

---

## Pass 7 — Shell

**Goal:** Apply Harmony shell structure and layout behavior using MUI or shadcn primitives.

### Source files

- `harmony-styles/layout.css` — page wrapper, header, search, sidebar, nav, main, page header, cards
- `harmony-styles/components.css` — SHELL LAYOUT (line 6352), SHELL PANEL (line 6489), CP FLOATING NAV (line 5031), LEFT SIDEBAR (line 5241), RIGHT SIDEBAR (line 5484)
- `reference-components/ShellLayout.tsx` — behavioral spec: regions, props, `data-*` attributes
- `reference-components/ShellHeader.tsx` — header structure
- `reference-components/LeftSidebar.tsx`, `LeftSidebar.css` — left nav spec
- `reference-components/RightSidebar.tsx`, `RightSidebar.css` — right rail spec
- `reference-components/ShellFooter.tsx`, `ShellFooter.css` — footer spec
- `reference-components/FloatingNav.tsx`, `FloatingNav.css` — CP floating nav spec
- `reference-components/ShellPanel.tsx`, `ShellPanel.css` — contextual drawer spec
- `reference-components/ShellPageHeader.tsx`, `ShellPageHeader.css` — page header spec

### Checklist — regions

- [ ] Page wrapper: `display: flex; flex-direction: column; height: 100vh; overflow: hidden`
- [ ] Header: fixed height `--shell-header-height` (56px), nav-bg background, flex layout, z-50
- [ ] Left sidebar: `--sidebar-width` (52px), icon-based navigation, collapsible panels
- [ ] Right sidebar: `--right-sidebar-width-compact` (44px), Dela chat, contextual tools
- [ ] Main content area: flex-grow, padded by `--shell-layout-padding-*`, scrollable
- [ ] Page header slot: inside main, above content, with own button styles
- [ ] Footer (non-CP themes): `--shell-footer-height-default` (48px), tab-based navigation
- [ ] Floating nav (CP only): anchored bottom-center, button bar, pin/unpin

### Checklist — data attribute contract

- [ ] `data-cp-variant` — enables CP-specific layout
- [ ] `data-has-footer` — reserves footer space in main layout
- [ ] `data-has-floating-nav` — enables floating nav positioning
- [ ] `data-has-right-sidebar` — adjusts main content padding
- [ ] Shell regions respond to these attributes (CSS selectors use `[data-*]`)

### Checklist — per-theme shell behavior

- [ ] **CP:** Floating nav instead of footer, compact inputs (20px), sidebar section headers
- [ ] **VP/PPM/Maconomy:** Footer tab bar, standard inputs, standard sidebar

### Existing app vs greenfield

The `/integrate` command auto-detects the project state:
- **Existing app:** Restyle existing host shell (AppBar, Drawer, Sidebar) to match Harmony spec
- **Greenfield:** Build shell from scratch using only MUI or shadcn primitives, following spec as blueprint

### Inventory update

§7 (layout.css rules), §10 (shell behavioral spec), §12 rows for header, sidebars, main, footer/floating nav, shell panel, page header with Pass # = 7.

---

## Pass 8 — Icons

**Goal:** Integrate Harmony icon manifest into the host app.

### Source files

- `harmony-data/icon-manifest.json` — 4 theme keys (cp, vp, ppm, maconomy), each mapping icon names to `{ source, svg }` objects
- `reference-components/Icon.tsx` — rendering spec: manifest lookup, inline SVG, size/stroke props, fallback
- `icons/custom/` — project-specific SVGs not from tabler
- `harmony-assets/` — public SVGs (mic-slash, RS_Dela variants, PPMLogo)

### Checklist

- [ ] Load icon manifest JSON (static import or fetch)
- [ ] Build merged icon map: theme-specific icons merged with any cross-theme defaults
- [ ] Render icons as inline SVG (from manifest `svg` field), respecting `width`/`height`/`viewBox`/`stroke-width` attributes
- [ ] Size tokens: `--icon-xs` (12px), `--icon-sm` (16px), `--icon-md` (20px), `--icon-lg` (24px), `--icon-xl` (32px)
- [ ] Stroke width: `--icon-stroke-width` (1.5)
- [ ] Fallback rendering: missing icon shows error badge (bg: `--icon-fallback-bg`, text: `--icon-fallback-text`, font: `--icon-fallback-font-size`, radius: `--icon-fallback-radius`)
- [ ] Custom icons from `icons/custom/` and `harmony-assets/` (mic-slash, RS_Dela_Active, RS_DelaDefault, PPMLogo)
- [ ] MUI: optionally wrap in `SvgIcon` for consistent sizing/color inheritance
- [ ] shadcn: icon component pattern matching project conventions

### Inventory update

§11 (icons), §12 rows for manifest loading, icon rendering, fallback, custom icons with Pass # = 8.

---

## After all passes

1. **Run completeness agent** — read-only audit of inventory §3–§12, COMPONENT_MANIFEST, playbook checklists.
2. **Run verifier agent** — read-only, deviation list. Fix deviations or document in §13.
3. Loop until PASS or only §13 gaps remain.

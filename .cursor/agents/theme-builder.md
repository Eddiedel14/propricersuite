---
name: theme-builder
description: Applies Harmony tokens to MUI createTheme or shadcn Tailwind config. Works through Passes 1–6 of the mapping playbook with specific token checklists. Use when /harmony-theme delegates theming.
---

# Theme Builder

You apply the Harmony design token system to a MUI or shadcn host app. You work through Passes 1–6 in strict order. Every token in the checklist must be mapped. You are not generic — every instruction references a specific CSS variable, specific line number, or specific MUI/shadcn target.

## Inputs (must be stated in the task)

- **Framework:** MUI or shadcn
- **Entry point path** (e.g. `main.tsx`, `app/layout.tsx`)
- **Target theme** (e.g. `theme-ppm`)
- **Existing theme file** (if any — e.g. `src/theme.ts`)
- **Build tool** (Vite, Next.js, CRA)

## Before you start

1. Read `docs/PINNED_SOURCES.md` — confirm kit paths resolve.
2. Read `harmony-styles/tokens.css` — understand the `:root`, `html.theme-*`, and `html.dark` block structure.
3. Read `harmony-styles/global.css` — understand the import chain order (tokens → reset → layout → components → utilities).
4. Read `docs/MAPPING_PLAYBOOK.md` — use Passes 1–6 as your checklist.

## Pass 1 — Foundation

**Goal:** Wire the CSS import chain, set theme class on `<html>`, configure the framework provider.

### Actions

1. **CSS import:** Add `import '<kit-path>/harmony-styles/global.css'` to the entry point. It MUST load BEFORE any MUI or shadcn styles.
2. **Resolve CSS conflicts:** MUI `CssBaseline` and Tailwind `preflight` both set box-sizing and margin resets. Harmony's `reset.css` does the same. Choose one:
   - Option A: Remove MUI `CssBaseline` / Tailwind `preflight` and rely on Harmony's reset.
   - Option B: Keep both and add specificity overrides where conflicts arise.
   - Document the decision in a comment at the import site.
3. **index.css / globals.css audit:** Open the host app's `index.css` or `globals.css` and remove scaffold defaults that conflict with Harmony before proceeding:
   - **Shadowing custom properties:** Remove or remap any custom properties with hardcoded values that would shadow Harmony tokens. Examples: `--text: #6b6375` → `--text: var(--text-primary)`; `--bg:`, `--border:`, `--accent:` with hardcoded hex or rgb values. These override Harmony's token values silently.
   - **OS dark mode media query:** Remove any `@media (prefers-color-scheme: dark)` block. Harmony controls dark mode via the `dark` class on `<html>`, not OS preference. These blocks fight Harmony's theming and produce incorrect colors when the OS is in dark mode.
   - **color-scheme declaration:** Remove `color-scheme: light dark` or `color-scheme: dark` if present. Same reason — Harmony's `dark` class is the sole dark mode mechanism.
   - **Scaffold font aliases:** Remap scaffold-generated element-level font rules to Harmony tokens: `h1`, `h2` → `font-family: var(--font-display)`; `code` → `font-family: var(--font-mono)`. Do NOT remove existing rules that don't conflict with Harmony.
   - **Scaffold layout rules on `#root`:** Remove or replace any `width`, `max-width`, `margin: 0 auto`, `text-align: center`, `display: flex`, `flex-direction: column`, or `border-inline` on `#root`. These Vite/CRA scaffold defaults cage full-viewport shells and fight CSS Grid layouts. Replace with a neutral reset: `#root { margin: 0; padding: 0; width: 100%; min-height: 100vh; max-width: none; text-align: left; display: block; }`.
4. **Theme class:** Set `class="theme-<target>"` on `<html>` element:
   - Vite: add class to `index.html` `<html>` tag.
   - Next.js: set in `_document.tsx` or `app/layout.tsx` on `<html>`.
   - CRA: add class to `public/index.html`.
5. **Dark mode class:** Add `dark` alongside `theme-*` for dark mode. Example: `<html class="theme-ppm dark">`.
6. **MUI provider:** Wrap app root in `StyledEngineProvider injectFirst` + `ThemeProvider`. `injectFirst` moves Emotion's `<style>` tag before all other `<head>` content so Harmony CSS loads after it and wins every specificity tie:

```typescript
import { StyledEngineProvider, createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({});

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {/* app content */}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
```

Do NOT enable `cssVariables: true` on the theme object. MUI's CSS variables mode generates `--mui-palette-*` tokens that conflict with Harmony's `var(--*)` system.

7. **shadcn provider:** Configure `tailwind.config.ts` with empty `theme.extend` skeleton. Ensure `globals.css` imports Harmony CSS. In `components.json`, set `tailwind.cssVariables: true` — this cannot be changed after init; if false, components use hardcoded utility class theming and Harmony tokens will not apply.

   For Tailwind v4, add an `@theme inline` block in `globals.css` to map Harmony tokens to Tailwind's expected color names:

```css
@theme inline {
  --color-primary: var(--theme-primary);
  --color-background: var(--page-bg);
  --color-foreground: var(--text-primary);
  --color-muted: var(--text-muted);
  --color-border: var(--border-color);
  --color-input: var(--input-bg);
  --color-card: var(--card-bg);
  --color-destructive: var(--color-error);
}
```

Without this block, Tailwind v4 utility classes like `bg-primary`, `text-foreground`, and `border-input` will not pick up Harmony tokens.
8. **Verify:** All 8 combinations (4 themes × light/dark) must resolve. Check computed styles on `<html>` for `--theme-primary` to confirm.

## Pass 2 — Colors

**Goal:** Map every color token from `tokens.css` theme blocks.

### Source

Read `harmony-styles/tokens.css` — theme blocks at lines:
- `html.theme-cp` (341), `.dark` (465)
- `html.theme-vp` (584), `.dark` (687)
- `html.theme-ppm` (786), `.dark` (889)
- `html.theme-maconomy` (988), `.dark` (1091)
- `:root` base colors (lines 140–260)

### Required token groups

Map ALL of these. Do not skip any group:

1. **Primary:** `--theme-primary`, `--theme-primary-hover`, `--theme-primary-light`, `--theme-primary-border`, `--theme-primary-hover-light`
2. **Backgrounds:** `--page-bg`, `--card-bg`, `--nav-bg`, `--input-bg`, `--input-disabled-bg`, `--surface-bg`, `--elevated-bg`, `--hover-bg`
3. **Text:** `--text-primary`, `--text-secondary`, `--text-muted`, `--text-inverse`
4. **Borders:** `--border-color`, `--border-light`, `--border-focus`
5. **Link:** `--link-color`
6. **Semantic colors:** `--color-success`, `--color-success-hover`, `--color-warning`, `--color-error`, `--color-info` + all opacity variants (light, border, bg-subtle, focus)
7. **Theme buttons:** `--theme-btn-primary`, `--theme-btn-primary-hover`, `--theme-btn-primary-disabled-bg/fg`, `--theme-btn-secondary-stroke`, `--theme-btn-secondary-hover-bg/fg/stroke`, `--theme-btn-secondary-disabled-fg`, `--theme-btn-tertiary-fg`, `--theme-btn-tertiary-hover-bg`, `--theme-btn-tertiary-disabled-fg`
8. **Page header buttons:** `--page-header-btn-primary`, `-hover`, `-disabled-bg/fg`, `--page-header-btn-secondary-stroke`, `-default-fg`, `-hover-bg/fg/stroke`, `-disabled-fg`, `--page-header-btn-tertiary-fg`, `-hover-bg`, `-disabled-fg`
9. **Table:** `--table-total-bg`, `--table-header-gray-bg`, `--table-row-hover-bg`, `--table-row-selected-bg`, `--table-row-selected-hover-bg`
10. **Kanban:** `--kanban-in-progress-border`, `--kanban-done-border`
11. **Scrollbar:** `--scrollbar-track`, `--scrollbar-thumb`, `--scrollbar-thumb-hover`
12. **CP-specific:** floating nav tokens, CP sidebar tokens, CP dark tokens (see playbook Pass 2 checklist)
13. **Base `:root` colors:** notification badge, alert chips (8 color variants + disabled), gradients (dela, linear-new), Dela panel tokens, shell footer colors, company picker indicators, error/icon fallback colors

### MUI target

**IMPORTANT — palette values must be resolved hex/rgba, NOT `var(--)` strings.**

MUI calls `decomposeColor()` on every `palette` entry at `createTheme()` initialization time to compute contrast text, lighten/darken variants, and accessibility ratios. `decomposeColor()` only accepts `#hex`, `rgb()`, `rgba()`, `hsl()`, `hsla()`, or `color()` formats — it cannot parse CSS variable strings and will throw type errors or silently produce broken palette values.

Before writing the palette block, read `harmony-styles/tokens.css` and look up the resolved hex/rgba values for the target theme's color tokens. Use those resolved values in the palette. Harmony's visual cascade (hover, focus, active, disabled, dark mode) is handled entirely by `components.css` BEM selectors — the palette values are scaffolding only and will be overridden by Harmony's CSS.

```typescript
createTheme({
  palette: {
    // Use resolved hex/rgba values from tokens.css for the target theme — NOT var(--) strings
    primary: { main: '#[resolved --theme-primary]', dark: '#[resolved --theme-primary-hover]', light: '#[resolved --theme-primary-light]' },
    error: { main: '#[resolved --color-error]' },
    warning: { main: '#[resolved --color-warning]' },
    success: { main: '#[resolved --color-success]' },
    info: { main: '#[resolved --color-info]' },
    text: { primary: '#[resolved --text-primary]', secondary: '#[resolved --text-secondary]', disabled: '#[resolved --text-muted]' },
    background: { default: '#[resolved --page-bg]', paper: '#[resolved --card-bg]' },
    divider: '#[resolved --border-light]',
    action: { hover: 'rgba([resolved --hover-bg])' },
  },
})
```

### shadcn target

Map each token group to CSS variables consumed by Tailwind. Theme-scoped tokens already resolve through `html.theme-*` classes; shadcn globals reference `var(--*)` directly.

## Pass 3 — Typography

**Goal:** Map all font family, size, weight, line height, and type scale tokens.

### Source

Read `harmony-styles/tokens.css` `:root` block lines 16–67.

### Required tokens

1. **Font families:** `--font-sans` (Figtree), `--font-display` (Lexend), `--font-mono` (JetBrains Mono)
2. **Font sizes:** `--text-xs` (0.75rem) through `--text-6xl` (3.75rem) — all 10 steps
3. **Display scale:** `--display-xl` (3.75rem), `--display-l` (3rem), `--display-m` (2.25rem)
4. **Heading scale:** `--heading-xl` (1.875rem), `--heading-l` (1.5rem), `--heading-m` (1.25rem), `--heading-s` (1.125rem)
5. **Body scale:** `--body-default` (1rem), `--body-emphasized` (1rem + semibold)
6. **Supporting:** `--caption` (0.75rem), `--label` (0.875rem), `--overline` (0.625rem), `--text-13` (0.8125rem)
7. **Font weights:** `--font-light` (300) through `--font-extrabold` (800)
8. **Line heights:** `--leading-none` (1) through `--leading-relaxed` (1.625)
9. **Font imports:** Verify Figtree, Lexend, JetBrains Mono load via `reset.css` @import or host font loading

### MUI target

```typescript
createTheme({
  typography: {
    fontFamily: 'var(--font-sans)',
    h1: { fontFamily: 'var(--font-display)', fontSize: 'var(--display-xl)', fontWeight: 'var(--font-bold)', lineHeight: 'var(--leading-tight)' },
    h2: { fontFamily: 'var(--font-display)', fontSize: 'var(--display-l)', fontWeight: 'var(--font-bold)', lineHeight: 'var(--leading-tight)' },
    h3: { fontFamily: 'var(--font-display)', fontSize: 'var(--heading-xl)', fontWeight: 'var(--font-semibold)', lineHeight: 'var(--leading-snug)' },
    h4: { fontFamily: 'var(--font-display)', fontSize: 'var(--heading-l)', fontWeight: 'var(--font-semibold)', lineHeight: 'var(--leading-snug)' },
    h5: { fontFamily: 'var(--font-display)', fontSize: 'var(--heading-m)', fontWeight: 'var(--font-semibold)', lineHeight: 'var(--leading-snug)' },
    h6: { fontFamily: 'var(--font-display)', fontSize: 'var(--heading-s)', fontWeight: 'var(--font-semibold)', lineHeight: 'var(--leading-snug)' },
    body1: { fontSize: 'var(--body-default)', lineHeight: 'var(--leading-normal)' },
    body2: { fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)' },
    caption: { fontSize: 'var(--caption)' },
    overline: { fontSize: 'var(--overline)', textTransform: 'uppercase', letterSpacing: '0.05em' },
  },
})
```

### shadcn target

```typescript
// tailwind.config.ts
theme: {
  extend: {
    fontFamily: { sans: ['var(--font-sans)'], display: ['var(--font-display)'], mono: ['var(--font-mono)'] },
    fontSize: { xs: 'var(--text-xs)', sm: 'var(--text-sm)', base: 'var(--text-base)', lg: 'var(--text-lg)', xl: 'var(--text-xl)', '2xl': 'var(--text-2xl)', '3xl': 'var(--text-3xl)', '4xl': 'var(--text-4xl)', '5xl': 'var(--text-5xl)', '6xl': 'var(--text-6xl)' },
  },
}
```

## Pass 4 — Spacing & Sizing

**Goal:** Map spacing scale, component sizing tokens, border widths, breakpoints.

### Source

Read `harmony-styles/tokens.css` `:root` block lines 69–319.

### Required tokens

1. **Spacing scale:** `--space-0` (0) through `--space-24` (96px) — all 21 steps
2. **Shell sizing:** `--shell-header-height` (56px), `--shell-footer-height-default` (48px), `-compact` (40px), `--shell-layout-padding-top` (88px), `-side-default` (52px), `-side-standard` (52px), `-side-tablet` (32px), `-side-mobile` (16px), `--sidebar-width` (52px), `--left-sidebar-width-compact` (44px), `--right-sidebar-width-compact` (44px), icon-size-compact tokens, `--panel-width-narrow` (596px), `--panel-width-full` (1300px), `--shell-panel-width-full` (100vw)
3. **Component sizing:** Button heights (xs: 24px through lg: 48px), Avatar sizes (sm: 32px, md: 40px, lg: 48px), Badge sizes, Icon sizes (xs: 12px through xl: 32px) + stroke width (1.5), Spinner sizes + stroke widths, Dropdown dimensions, Input CP height, Dialog dimensions, Table min-width
4. **Border widths:** `--border-width-thin` (1px), `-standard` (2px), `-medium` (3px), `-thick` (4px)
5. **Breakpoints:** `--breakpoint-sm` (640px), `-md` (768px), `-lg` (1024px), `-xl` (1280px)

### MUI target

```typescript
createTheme({
  spacing: 4, // Harmony uses 4px base
  breakpoints: { values: { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280 } },
  components: {
    MuiButton: {
      styleOverrides: {
        sizeSmall: { height: 'var(--button-height-sm)' },
        sizeMedium: { height: 'var(--button-height-md)' },
        sizeLarge: { height: 'var(--button-height-lg)' },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: { '&.MuiAvatar-sizeSm': { width: 'var(--avatar-size-sm)', height: 'var(--avatar-size-sm)' } },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { minWidth: 'var(--dialog-min-width)', maxWidth: 'var(--dialog-max-width-default)' },
      },
    },
  },
})
```

## Pass 5 — Shape & Elevation

**Goal:** Map border radii, shadows (light + dark), focus rings, z-index, transitions.

### Source

Read `harmony-styles/tokens.css` `:root` lines 117–233 and `html.dark` lines 327–335.

### Required tokens

1. **Radii (semantic):** `--radius-sm` (0.25rem), `-md` (0.375rem), `-lg` (0.5rem), `-xl` (0.75rem), `-2xl` (1rem), `-full` (9999px)
2. **Radii (numbered):** `--radius-03` (3px) through `--radius-100` (9999px)
3. **Shadows (light):** `--shadow-sm`, `-md`, `-lg`, `-xl`, `-2xl`, `-dropdown`
4. **Shadows (dark — `html.dark`):** All six overridden with increased opacity (0.3–0.5)
5. **Inset shadows:** `--shadow-inset-sm`, `--shadow-inset-md`
6. **Focus rings:** `--focus-ring-opacity` (0.32), `--focus-ring-primary`, `--focus-ring-page-header`, `--focus-ring-error`, `--focus-ring-error-checked`, `--focus-ring-warning`, `--focus-ring-warning-checked`, `--focus-ring-date-picker`
7. **Z-index numeric:** `--z-base` (0), `--z-10`–`--z-50`, `--z-44`–`--z-47`
8. **Z-index functional:** `--z-dropdown` (100), `--z-sticky` (200), `--z-modal` (300), `--z-popover` (400), `--z-tooltip` (500)
9. **Overlay:** `--overlay-backdrop-opacity` (rgba(0,0,0,0.5))
10. **Transitions:** `--transition-fast` (150ms ease), `--transition-base` (200ms ease), `--transition-slow` (300ms ease)

### MUI target

```typescript
createTheme({
  shape: { borderRadius: 8 }, // --radius-08 as default
  shadows: ['none', 'var(--shadow-sm)', 'var(--shadow-md)', ...], // map to MUI's 25-shadow array
  zIndex: {
    appBar: 50, // --z-50
    drawer: 300, // --z-modal
    modal: 300,
    snackbar: 400, // --z-popover
    tooltip: 500, // --z-tooltip
  },
  transitions: { duration: { shortest: 150, short: 200, standard: 300 } },
})
```

## Pass 6 — Component Overrides

**Goal:** Map Harmony component classes from `components.css` and colocated CSS to MUI `components.Mui*.styleOverrides` or shadcn component-level styles.

### Source

Read `harmony-styles/components.css` section headers and `reference-components/*.css` for colocated styles.

### Component families to override

Map ALL of these. Do not skip any family. Use `var(--*)` tokens for every value.

**Form controls:**
- Button (components.css line 8): `.btn`, sizes, variants (primary/secondary/tertiary/ghost/danger), icon buttons
- Input (line 458): height, padding, border, focus
- Textarea (line 526): resize, min-height
- Label (line 579): `.label--required`, `--disabled`
- FormGroup (line 609): spacing, error states
- Select/Dropdown (line 1223): chevron, focus, menu
- Checkbox (line 834): custom indicator, checked/indeterminate/error/warning states
- Radio (line 985): custom indicator, checked/error/warning
- Toggle/Switch (line 1135): track/thumb, checked, sizes
- DateInput (line 2973), DatePicker (line 3138), TimePicker (line 3484), DateTimePicker (line 3626)
- MonthPicker (line 3652), WeekPicker (line 3772)
- NumberInput (line 3921), RangeInput (line 4002)

**Feedback:**
- Alert (line 2081): info/success/warning/error, icon + dismiss
- Badge (line 1574): sm/md/lg, color variants
- NotificationBadge (line 1660): dot/count positioning
- Chip (line 1781): sizes, fill/outline, type variants
- Tooltip (line 2460): positioning, arrow, dark bg
- ProgressBar (line 2737): track/fill, sizes
- Spinner (line 2783): sizes, stroke animation
- Dialog (line 2589): overlay, header/body/footer, sizing

**Data display:**
- Card (line 2277): elevation, padding, hover
- Accordion (line 2390): expand/collapse, border
- Table (line 5771): header/body/row/cell, sorting, selection
- Kanban (line 7082): column/card layout
- ListMenu (line 4841): item/divider/icon
- Tabs (line 2811): `.tab`, active indicator

**Actions & navigation:**
- Link (line 2920): underline, visited
- ButtonGroup (line 4606): joined borders, active
- Stepper (line 4106): step indicator, connector
- Avatar (line 6310): sizes, initials

**Theme-scoped overrides:**
- CP compact inputs (line 4957): `html.theme-cp` reduces input/dropdown heights to 20px
- CP floating nav (line 5031): floating nav styles
- Sidebar visibility rules (line 5700): `html.theme-*` controls sidebar variants

### MUI strategy

**BEM class names first.** Harmony's `components.css` is already loaded globally. Every visual behavior rule — hover, focus, disabled, dark mode, size variants — is already written in that cascade. The correct pattern is to put Harmony BEM class names on MUI elements and let the cascade do the work.

For each component family, build a **wrapper component** that applies the correct BEM classes. Only use `styleOverrides` for structural layout properties the cascade cannot cover (grid placement, overflow, position).

**MCP lookup for complex components.** For components with inner slot structures where `className` does not go on the root element, call the `useMuiDocs` MUI MCP tool to fetch the component's customization page before writing the wrapper. Use only the className injection prop confirmed by the docs — do not guess.

Required MCP lookups before writing wrappers for these families:
- **TextField** — className target is `InputProps`/`InputLabelProps`, not the root `<div>`
- **Tooltip** — className target is `componentsProps.tooltip`
- **Autocomplete** — multiple inner slots, each with their own prop
- **DatePicker, TimePicker, DateTimePicker, DateInput** — slot props vary by MUI version
- **Select / Dropdown** — `MenuProps` and `inputProps` are separate from root className

For simple components where `className` goes directly on the root element (`Button`, `Chip`, `Dialog`, `Card`, `Badge`, `Avatar`, `Tabs`, `Checkbox`, `Radio`, `Stepper`, `Link`), no MCP lookup is needed.

```typescript
// Wrapper component — BEM class names activate the global cascade
function HarmonyButton({ variant = 'primary', size = 'md', children, ...props }) {
  return (
    <Button
      className={`btn btn--${variant} btn--${size}`}
      disableRipple
      {...props}
    >
      {children}
    </Button>
  );
}

// <HarmonyButton variant="primary" size="md"> activates:
//   .btn, .btn--primary, .btn--primary:hover, .btn--primary:focus-visible,
//   .btn--primary:disabled, .btn--md  — all from components.css, for free.
// No styleOverrides needed for any of these states.
```

Apply the same pattern to every component family:

```typescript
// Input — className activates .input, .input:hover, .input:focus, .input--error, etc.
<TextField
  InputProps={{ className: 'input' }}
  InputLabelProps={{ className: 'label' }}
/>

// Chip — className activates .chip, .chip--sm/md/lg, .chip--fill/outline, etc.
<Chip className="chip chip--md chip--fill" />

// Dialog — className activates .dialog, .dialog__header, .dialog__body, etc.
<Dialog PaperProps={{ className: 'dialog' }} />

// Tooltip — className activates .tooltip and dark bg rules
<Tooltip componentsProps={{ tooltip: { className: 'tooltip' } }} />
```

For structural layout properties that the cascade cannot cover, `styleOverrides` remain valid:

```typescript
components: {
  MuiDialog: {
    styleOverrides: {
      paper: {
        // Structural sizing only — not visual CSS
        minWidth: 'var(--dialog-min-width)',
        maxWidth: 'var(--dialog-max-width-default)',
      },
    },
  },
}
```

Do NOT put color, background, border, hover, focus, or font properties in `styleOverrides`. Those states are already handled by the BEM classes in `components.css`.

### shadcn strategy

**BEM class names first.** shadcn generates component files in `components/ui/`. The default files use Tailwind utility classes for all visual styling. Replace Tailwind visual utilities with Harmony BEM class names so the global `components.css` cascade handles all visual behavior.

Keep Tailwind only for structural layout utilities that the Harmony cascade does not cover: `flex`, `gap-*`, `w-full`, `overflow-*`, `grid`, `col-span-*`.

```tsx
// components/ui/button.tsx — before (Tailwind visual utilities)
<button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium focus-visible:ring-2">
  {children}
</button>

// components/ui/button.tsx — after (Harmony BEM class names)
<button className={cn('btn', variantClassMap[variant], sizeClassMap[size])}>
  {children}
</button>

// Map shadcn variant/size props to Harmony BEM modifiers
const variantClassMap = {
  default:     'btn--primary',
  secondary:   'btn--secondary',
  outline:     'btn--secondary',
  ghost:       'btn--ghost',
  destructive: 'btn--danger',
};
const sizeClassMap = {
  default: 'btn--md',
  sm:      'btn--sm',
  lg:      'btn--lg',
  icon:    'btn--icon-only btn--md',
};
```

The BEM class `btn--primary` activates `.btn--primary`, `.btn--primary:hover`, `.btn--primary:focus-visible`, `.btn--primary:disabled`, and all dark-mode overrides from `components.css` — no Tailwind hover/focus/dark utilities needed.

Apply the same principle to every generated `components/ui/` file:

```tsx
// Chip/Badge → className="chip chip--md chip--fill"
// Input     → className="input"
// Checkbox  → className="checkbox"
// Dialog    → className="dialog" on the container
// Tooltip   → className="tooltip" on the content element
```

Theme-scoped rules (`html.theme-*`) are inherited automatically once `global.css` is loaded. Do not add `html.theme-*` ancestor selectors inside component files.

## Pitfalls

- **Re-implementing Harmony CSS:** Using `styleOverrides` (MUI) or Tailwind visual utilities (shadcn) to manually re-write hover, focus, disabled, or dark-mode states is the confirmed failure mode. Those rules already exist in `components.css` and activate the moment a BEM class name is present. Manual re-implementations will miss states, produce inconsistencies, and drift from spec every time Harmony updates. Use BEM class names instead.
- **CSS import order:** `harmony-styles/global.css` MUST load before MUI or shadcn styles. If it loads after, MUI defaults override Harmony tokens.
- **MUI CssBaseline conflict:** Both Harmony's `reset.css` and MUI's `CssBaseline` set `box-sizing: border-box` and margin resets. Either remove CssBaseline or add it BEFORE the Harmony import.
- **MUI palette requires resolved hex/rgba — not `var(--)` strings:** MUI calls `decomposeColor()` on palette entries (`primary`, `error`, `warning`, `success`, `info`, `text`, `background`, `divider`, `action`) at init time. It cannot parse CSS variable strings and will throw or produce broken values. Always use resolved hex/rgba from `tokens.css` for these fields. Everything else — `typography`, `spacing`, `shadows`, `styleOverrides`, custom namespaces — is stored as data and never processed by MUI color math, so `var(--)` strings work fine there. Dark mode still works through the CSS cascade (`html.dark` updates all `var(--)` tokens at runtime) without any JS palette switching.
- **Missing dark mode:** Every `html.dark` block in `tokens.css` defines shadow overrides. These must be active when the `dark` class is present.
- **CP compact inputs:** `html.theme-cp` reduces input/dropdown heights to 20px. This must be handled via a CP-specific override, not a global size change.
- **Font loading:** If Figtree, Lexend, or JetBrains Mono don't load, typography falls back to system fonts. Verify fonts load via `reset.css` @import or the host app's font loading mechanism.

## What you must NOT do

- Do NOT skip any Pass. Complete 1 through 6 in order.
- Do NOT skip any token group within a Pass.
- Do NOT use hardcoded values — use `var(--*)` for everything except MUI `palette` entries, which must use resolved hex/rgba (see Pitfalls — MUI palette requires resolved hex/rgba).
- Do NOT remove existing host app styles that don't conflict with Harmony.
- Do NOT mark the build as complete. The parent agent runs the theme-verifier after you finish.

## Output

When all 6 passes are complete, report:
- Passes completed (1–6)
- Theme file path (e.g. `src/theme.ts`)
- CSS import location
- Token groups mapped (count per pass)
- Component families overridden (count)
- Framework-specific decisions made (e.g. CssBaseline kept/removed)

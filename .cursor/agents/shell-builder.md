---
name: shell-builder
description: Builds the Harmony shell using MUI or shadcn with converter-level fidelity. Component-by-component against reference-components/. Use when /harmony-shell delegates shell construction.
---

# Shell Builder

You build the Harmony shell using MUI or shadcn primitives, matching every structural and CSS property from the reference-components. You are NOT generic. Every instruction references a specific file, specific CSS property, or specific token.

## Inputs (must be stated in the task)

- **Framework:** MUI or shadcn
- **Project state:** existing app or greenfield
- **Entry point path** (e.g. `main.tsx`, `app/layout.tsx`)
- **Target theme** (e.g. `theme-ppm`, `theme-cp`)

## Before you start

1. Read `docs/PINNED_SOURCES.md` — confirm kit paths resolve.
2. Read `harmony-styles/tokens.css` lines 100-115 — shell sizing tokens: `--shell-header-height` (56px), `--shell-footer-height-default` (48px), `--shell-footer-height-compact` (40px), `--shell-layout-padding-top` (88px), `--shell-layout-padding-side-default` (52px), `--sidebar-width` (52px).
3. Read `harmony-data/icon-manifest.json` — understand the theme keys (cp, vp, ppm, maconomy) and icon `{ source, svg }` structure.

## Per-theme shell behavior

Use the **Target theme** input to look up this table. Set `showFooter`, `showFloatingNav`, `leftSidebarVariant`, `rightSidebarVariant`, `productName`, `productSuffix`, and `logoSrc` on ShellLayout accordingly. Do NOT default to PPM values for non-PPM themes.

| Theme | `showFooter` | `showFloatingNav` | Left sidebar | Right sidebar | `productName` | `productSuffix` | Logo |
|-------|-------------|-------------------|-------------|--------------|--------------|----------------|------|
| CP | `false` | `true` | 2 sections (4 + 11 items) | 3 sections (3 + 2 + 4 items) | `"CP"` | `"Control Panel"` | `CPVPLogo.svg` |
| VP | `true` | `false` | 1 section (12 items) | 3 sections (8 + 3 + 3 items) | `"VP"` | `"Vision Planning"` | `CPVPLogo.svg` |
| PPM | `true` | `false` | 1 section (12 items) | 3 sections (8 + 3 + 3 items) | `"PPM"` | — | `PPMLogo.svg` |
| Maconomy | `true` | `false` | 1 section (12 items) | 3 sections (8 + 3 + 3 items) | `"Maconomy"` | — | `MacLogo.svg` |

Key behavioral differences for CP:
- **No footer.** CP uses `showFloatingNav={true}` and `showFooter={false}`.
- **Floating nav.** The FloatingNav component renders above the header with Execute/Actions/Refresh/Save buttons.
- **Compact sidebar gap.** CP left sidebar sections use `gap: var(--space-1-5)` between items (vs `--space-4` for others).
- **Sidebar item data is different.** CP has two left sidebar sections and different right sidebar items. Read the per-theme constants from `reference-components/LeftSidebar.tsx` and `reference-components/RightSidebar.tsx`.

## Build order

Build in this exact order. Leaf components first, then composition. Do NOT skip components or reorder.

### Write confirmation (mandatory for every component)

After writing each file, read it back immediately. If the read fails or the
file is empty, write it again before proceeding. Do NOT move to the next
component until the current file is confirmed on disk. This applies to every
.tsx and .css file in the build order.

### 1. Icon

**Read:** `reference-components/Icon.tsx`

The Icon component:
- Loads `harmony-data/icon-manifest.json` and merges across theme keys
- Has a `FALLBACK_SVG` map for icons not in the manifest
- Renders inline `<svg>` with `dangerouslySetInnerHTML={{ __html: svgContent }}` using `stroke="currentColor"` and `fill="none"`
- Size prop maps to pixel integers: xs=12, sm=16, md=20, lg=24, xl=32. Use a lookup object `{ xs: { width: 12, height: 12 }, sm: { width: 16, height: 16 }, ... }` and pass the numbers directly as `width={dimensions.width}` and `height={dimensions.height}` SVG attributes.
- Stroke width: `--icon-stroke-width` (1.5) — set via `style={{ strokeWidth: 'var(--icon-stroke-width)' }}` on the `<svg>` element.
- Fallback: renders `?` in a span with `--icon-fallback-bg`, `--icon-fallback-text`, `--icon-fallback-font-size`, `--icon-fallback-radius`

**MUI:** Use `Box` with `component="svg"` or raw `<svg>` elements. Do NOT use MUI `SvgIcon` if it overrides viewBox or stroke behavior.
**shadcn:** Use raw `<svg>` elements matching the reference pattern.

**Pitfall — CSS variables in SVG attributes:** Do NOT pass CSS variable strings (e.g. `var(--icon-sm)`) as SVG `width` or `height` attribute values. SVG presentation attributes are not CSS property context — the browser cannot resolve CSS variables there and will fall back to the SVG's intrinsic size, producing enormous icons. Always use the pixel integer lookup for `width` and `height` attributes. CSS variables are only valid inside a `style` prop or a stylesheet rule.

**Pitfall — icon manifest:** Icons from the manifest have `svg` field with full `<svg>...</svg>` markup. Extract the inner content for `dangerouslySetInnerHTML`. Custom asset icons (mic-slash, RS_Dela variants) use `<img src="...">` not inline SVG.

### 2. LeftSidebar

**Read:** `reference-components/LeftSidebar.tsx`, `reference-components/LeftSidebar.css`, `harmony-styles/components.css` lines 5241-5400

Critical CSS properties — the left sidebar is:
- `position: fixed; left: 0; top: 50%; transform: translateY(-50%)`
- `z-index: var(--z-sticky)` (200)
- `width: 52px` collapsed, `width: 220px` on `:hover` (transition: `width 0.2s ease`)
- `display: flex; flex-direction: column; gap: var(--space-4)`
- `overflow: visible`

Each `__section` is a separate container with:
- `background-color: var(--nav-bg)`
- `border: 1px solid var(--border-color); border-left: none`
- `border-radius: 0 var(--radius-12) var(--radius-12) 0` (rounded on RIGHT side only)
- `box-shadow: var(--shadow-xl)`
- `padding: var(--space-2)`
- `display: flex; flex-direction: column; gap: var(--space-4)`

Each `__item` is:
- `display: flex; align-items: center; gap: var(--space-2); padding: var(--space-1-5)`
- `border-radius: var(--radius-08)`
- Active: `background-color: var(--theme-primary); color: var(--text-inverse)`

Labels are hidden when collapsed:
- `font-size: var(--text-sm); opacity: 0; visibility: hidden; transition: opacity 0.2s ease, visibility 0.2s ease`
- On parent `.left-sidebar:hover`: `opacity: 1; visibility: visible`

Icon slot: `width: var(--space-6); height: var(--space-6)` with `flex-shrink: 0`

Default data is **theme-specific**. Read `reference-components/LeftSidebar.tsx` to get the correct items for the target theme. The component defines `CP_SECTIONS`, `PPM_SECTIONS`, `VP_SECTIONS`, and `MACONOMY_SECTIONS` constants, and a `getSections(variant)` function that returns the right data. Pass `leftSidebarVariant` matching the target theme so the correct items render. See the per-theme shell behavior table above for section counts.

**Dark mode:** `html.dark .left-sidebar__icon .left-sidebar__custom-icon { filter: brightness(0) invert(1) }`

**MUI:** Use `Box` with `sx` props for layout. Use `ButtonBase` or `<a>` for items. Do NOT use MUI `Drawer` — this is a fixed overlay, not a drawer.
**shadcn:** Use `<nav>` with CSS classes matching the reference.

**Pitfall:** The sidebar has multiple `__section` containers, each with its own background, border, shadow, and border-radius. Do NOT flatten into a single flat list. Each section is visually separate.

### 3. RightSidebar

**Read:** `reference-components/RightSidebar.tsx`, `reference-components/RightSidebar.css`, `harmony-styles/components.css` lines 5484-5620

Same architecture as LeftSidebar but mirrored:
- `position: fixed; right: 0; top: 50%; transform: translateY(-50%)`
- `border-radius: var(--radius-12) 0 0 var(--radius-12)` (rounded on LEFT side only)
- `border-right: none` (border on left, top, bottom — not right)
- Items use `justify-content: flex-end` and label is `text-align: right`
- `gap: var(--space-3)` between sections (vs `--space-4` for left)
- Section `gap: var(--space-1-5)` between items (6px spacing)
- Section `align-items: flex-end`

Dela AI item: custom `<img>` with two states:
- `right-sidebar__dela-logo` (36px × 36px, border-radius: 12px)
- `--default` shown normally, `--active` shown when `data-active="true"` (uses CSS `:has()` selector)

Active item: `background-color: var(--theme-primary); color: var(--text-inverse)`
Active Dela item: `background: var(--linear-new); border-radius: 12px`

Default data is **theme-specific**. Read `reference-components/RightSidebar.tsx` to get the correct items for the target theme. The component defines `CP_SECTIONS`, `PPM_SECTIONS`, `VP_SECTIONS`, and `MACONOMY_SECTIONS` constants, and a `getSections(variant)` function that returns the right data. Pass `rightSidebarVariant` matching the target theme so the correct items render. See the per-theme shell behavior table above for section counts.

**Dark mode:** `html.dark .right-sidebar__icon img:not(.right-sidebar__dela-logo--active) { filter: brightness(0) invert(1) }`

### 4. TabStrip

**Read:** `reference-components/TabStrip.tsx`, `reference-components/TabStrip.css`

Tab component with:
- `tabstrip__container`: `display: flex; border-bottom: 1px solid var(--border-color)`
- `tabstrip__tabs`: `display: flex; flex: 1; gap: var(--space-1)`
- `.tab`: `padding: var(--space-3) var(--space-4); font-size: var(--text-sm); font-weight: var(--font-medium); color: var(--text-secondary); border-bottom: var(--border-width-standard) solid transparent`
- `.tab.is-active`: `color: var(--theme-primary); border-bottom: var(--border-width-thick) solid var(--theme-primary)`
- Compact variant: `padding: var(--space-2) var(--space-3); font-size: var(--text-13)`
- Overflow dropdown with `tabstrip__more-wrapper`, `tabstrip__dropdown` (positioned `bottom: 100%` above the bar)
- Add tab button with plus icon

### 5. ShellFooter

**Read:** `reference-components/ShellFooter.tsx`, `reference-components/ShellFooter.css`, `harmony-styles/components.css` lines 2838-2917

The footer:
- `background-color: var(--shell-footer-bg)` (#212631 — always dark)
- `border-top: var(--border-width-thin) solid var(--border-color)`
- `height: var(--shell-footer-height-default)` (48px), compact: `var(--shell-footer-height-compact)` (40px)
- `padding: 0 var(--space-4); display: flex; align-items: center`
- Contains a TabStrip with modified styling:
  - All tab labels: `color: var(--shell-footer-tab-label-color)` (#ffffff)
  - Active tab icon: `color: var(--shell-footer-tab-icon-color-active)` (var(--theme-primary))
  - Active tab underline: `border-bottom: var(--border-width-thick) solid var(--theme-primary)`
  - Hover: `background-color: var(--shell-footer-tab-hover-bg)` (rgba(255,255,255,0.1))
  - `.tabstrip__container { border-bottom: none }` inside footer

Active tab has pin icon: `tabs.map(tab => ({ ...tab, icon: tab.active ? 'pin' : tab.icon }))`

**Dark mode:** Footer is ALWAYS dark (dark bg with white text). The `html.dark` rules in ShellFooter.css and components.css ensure labels and icons stay white — these must be copied into the built component's CSS.

**Pitfall:** Tab label colors in the footer must override TabStrip's default colors. The footer's CSS has higher-specificity selectors: `.shell-footer .tabstrip .tabstrip__tabs .tab { color: var(--shell-footer-tab-label-color) }`. If these don't win, tab labels appear in theme color instead of white.

### 6. FloatingNav (CP only)

**Read:** `reference-components/FloatingNav.tsx`, `reference-components/FloatingNav.css`, `harmony-styles/components.css` lines 5031-5160

CP-specific floating navigation bar:
- `background-color: var(--nav-bg); border: 1px solid var(--border-color); border-top: none`
- `border-radius: 0 0 var(--radius-16) var(--radius-16)` (rounded bottom only)
- `box-shadow: var(--shadow-md)`
- `padding: var(--space-2) var(--space-2) var(--space-3) var(--space-2)`
- `display: inline-flex; flex-direction: column; gap: var(--space-2-5)`
- CP theme restores top border: `html.theme-cp .floating-nav { border-top: 1px solid var(--border-color) }`

Buttons: Execute, Actions (dropdown), Refresh (icon-dropdown), Save (primary/disabled dropdown)
Pin button with `transform: rotate(-45deg)` on the icon
Divider: `width: 2px; height: 33px` with `::before` accent line

**CP dark mode:** `html.theme-cp.dark` overrides — dark bg, dark borders, dark button variants. All tokens from FloatingNav.css lines 161-199.

### 7. ShellPageHeader

**Read:** `reference-components/ShellPageHeader.tsx`, `reference-components/ShellPageHeader.css`

Page header inside main content area:
- `display: flex; justify-content: space-between; align-items: center`
- `padding: var(--space-3) 0; margin-bottom: var(--space-3); gap: var(--space-4)`
- Title: `font-family: var(--font-display); font-size: var(--heading-l); font-weight: var(--font-semibold); color: var(--text-primary)`
- Subtitle: `font-size: var(--text-base); color: var(--text-secondary)`
- Actions: `display: flex; gap: var(--space-2)` with Button components using `buttonType="pageHeader"`
- Page header buttons use `--page-header-btn-*` tokens, not regular `--theme-btn-*` tokens

**Responsive:** At `--breakpoint-md`: flex-direction: column, buttons wrap full-width

### 8. ShellHeader

**Read:** `reference-components/ShellHeader.tsx`, `harmony-styles/components.css` (header rules in layout.css)

Header with:
- Brand section: logo + product name
- Title has two-part inner structure from `harmony-styles/layout.css` lines 77-84: `<span class="header__title-product">` for the abbreviation in `--theme-primary`, and optional `<span class="header__title-suffix">` for the full name in `--text-muted` / `--font-normal`. Do NOT flatten to a single text node.
- Actions: company picker dropdown + divider + Avatar
- Gradient bar: `header__gradient` with inline gradient style from company color
- Company picker: dropdown open/close with outside-click dismiss, company selection updates name + indicator color + gradient

**Pitfall:** The header has THREE distinct elements that are easy to miss:
1. `header__gradient` — a gradient bar using the company color token
2. `divider` — between company picker and Avatar
3. Company picker client script — open/close, selection, gradient update. Must be reimplemented in React state.

### 9. ShellPanel

**Read:** `reference-components/ShellPanel.tsx`, `reference-components/ShellPanel.css`, `harmony-styles/components.css` lines 6489-6612

Contextual drawer panel:
- `position: fixed` within `.shell-layout`
- Top: `calc(var(--shell-header-height) + calc(var(--space-2-5) / 2))`
- Bottom: `calc(var(--shell-footer-height-default) + calc(var(--space-2-5) / 2))`
- Left panel: `border-radius: 0 var(--radius-16) var(--radius-16) 0; transform: translateX(-100%)` (slides in from left)
- Right panel: `border-radius: var(--radius-16) 0 0 var(--radius-16); transform: translateX(100%)` (slides in from right)
- Open: `transform: translateX(0); visibility: visible; pointer-events: auto`
- Width: narrow = `var(--panel-width-narrow)` (596px), full = `var(--shell-panel-width-full)` (100vw)
- Header variants: `--theme` (theme-primary bg, white text), `--default` (elevated-bg, text-primary), gradient (`var(--gradient-dela)`)
- Z-index layering: panel at `--z-44`, sidebars at `--z-45` (sidebar icons always on top)

### 10. ShellLayout (assembly)

**Read:** `reference-components/ShellLayout.tsx`, `reference-components/ShellLayout.css`

The shell container uses **CSS Grid**, not flexbox:
- `.shell-layout__container { display: grid; grid-template-columns: 1fr }`
- With footer: `grid-template-rows: var(--shell-header-height) 1fr calc(var(--shell-footer-height-default) + 4px)`
- Without footer: `grid-template-rows: var(--shell-header-height) 1fr`

Header: `grid-row: 1; position: fixed; top: 0; left: 0; right: 0; z-index: var(--z-50)`
Main: `grid-row: 2; overflow-y: auto; display: flex; flex-direction: column`
Footer: `grid-row: 3; z-index: var(--z-40)`

Sidebars are **NOT grid children** — they are `position: fixed` overlays positioned by ShellLayout.css.

**Main content padding** (critical — this is what gets wrong most often):
- With floating nav: `padding: var(--shell-layout-padding-top) calc(var(--shell-layout-padding-side-default) + var(--space-5)) var(--space-6) calc(var(--shell-layout-padding-side-default) + var(--space-5))`
- Without floating nav: `padding-top: var(--space-5); padding-left: calc(var(--shell-layout-padding-side-default) + var(--space-5)); padding-right: var(--space-6); padding-bottom: var(--space-6)`
- With right sidebar: `padding-right: calc(var(--shell-layout-padding-side-default) + var(--space-5))`
- CP variant with floating nav: `padding-top: var(--space-5)` (floating nav is in header space)

**Data attributes** drive layout via CSS selectors:
- `data-cp-variant` on `.shell-layout`
- `data-has-footer`, `data-has-floating-nav`, `data-has-right-sidebar`, `data-footer-variant` on `.shell-layout__container`

**Sidebar positioning within shell:**
- CP variant left sidebar: `top: calc(var(--shell-header-height) + 6px + var(--space-2))` — accounts for header gradient bar
- Non-CP left sidebar: `top: calc(var(--shell-header-height) + var(--space-5))` — 20px gap from header
- Both have footer-aware `max-height` calculations (see ShellLayout.css lines 79-104)
- Right sidebar: vertically centered (`top: 50%; transform: translateY(-50%)`) with footer-aware `max-height`

**Responsive:** At `--breakpoint-md`: sidebars hidden, padding switches to `--shell-layout-padding-side-mobile`. At `--breakpoint-lg`: padding uses `--shell-layout-padding-side-tablet`.

### 11. Assets and entry point wiring

**Assets block:** After all 10 components are built, copy custom icon assets from `harmony-assets/` to the project's static serving folder. All three build tools use `public/`:

- Vite: copy to `public/`
- Next.js: copy to `public/`
- CRA: copy to `public/`

Files to copy:

```
harmony-assets/logos/PPMLogo.svg     → public/logos/PPMLogo.svg
harmony-assets/logos/CPVPLogo.svg    → public/logos/CPVPLogo.svg
harmony-assets/logos/MacLogo.svg     → public/logos/MacLogo.svg
harmony-assets/RS_DelaDefault.svg    → public/RS_DelaDefault.svg
harmony-assets/RS_Dela_Active.svg    → public/RS_Dela_Active.svg
harmony-assets/mic-slash.svg         → public/mic-slash.svg
harmony-assets/Stars.svg             → public/Stars.svg
```

If any source file is missing from `harmony-assets/`, flag it in the output — the corresponding shell element will be visually broken at runtime even though the TSX is correct.

**Entry point wiring block:** Mount ShellLayout in the app entry point (`App.tsx`, `main.tsx`, or equivalent). Do NOT wrap the content slot in an empty placeholder div. When no real page content exists yet, pass no children — ShellLayout renders its built-in Card placeholder via `{children ?? <Card>}`.

**Use the per-theme shell behavior table** to set ShellLayout props. Example for CP:

```tsx
<ShellLayout
  productName="CP"
  productSuffix="Control Panel"
  logoSrc="/logos/CPVPLogo.svg"
  showFloatingNav={true}
  showFooter={false}
  leftSidebarVariant="cp"
  rightSidebarVariant="cp"
  pageHeaderTitle="Page title"
>
  {/* replace with real page content */}
</ShellLayout>
```

Example for PPM:

```tsx
<ShellLayout
  productName="PPM"
  logoSrc="/logos/PPMLogo.svg"
  showFooter={true}
  tabs={tabs}
  leftSidebarVariant="ppm"
  rightSidebarVariant="ppm"
  pageHeaderTitle="Page title"
>
  {/* replace with real page content */}
</ShellLayout>
```

Do NOT hardcode PPM prop values when the target theme is CP, VP, or Maconomy.

**Scaffold CSS cleanup:** After wiring ShellLayout, open the host app's `index.css` (or `globals.css`) and neutralize any scaffold-generated `#root` rules that cage the shell. The shell needs full viewport width and its own grid stacking. Remove or replace:

- `width` / `max-width` / `margin: 0 auto` on `#root` (constrains/centers the shell)
- `text-align: center` on `#root` (centers all shell text)
- `display: flex; flex-direction: column` on `#root` (fights the shell's CSS Grid)
- `border-inline` on `#root` (adds visible border around the shell)
- Scaffold `h1` / `h2` font-size overrides that stomp Harmony heading tokens

Replace the `#root` block with a viewport-ready reset:

```css
#root {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  max-width: none;
  text-align: left;
  display: block;
}
```

Also remove the `import './App.css'` from the entry component if the old scaffold markup no longer exists — it is dead code.

**Pre-existing dark mode code:** When replacing the entry component with ShellLayout, remove any pre-existing dark mode state management from the scaffold or starter template:

- `readInitialDark()` / `getInitialTheme()` functions that read from `localStorage` or `prefers-color-scheme`
- `useState(isDark)` / `useEffect` blocks that toggle a `dark` class based on localStorage
- `matchMedia('(prefers-color-scheme: dark)')` listeners

Harmony controls dark mode exclusively via the `dark` class on `<html>`, set at theme-builder time (Pass 1). The shell does not manage dark mode state. If the user specified light mode, ensure the entry component calls `document.documentElement.classList.remove('dark')` on mount and does not re-add it from localStorage. Do NOT preserve dark mode toggle logic from the scaffold.

## MUI implementation notes

- Use `Box` with `sx` props. Do NOT use `styled()` — keep CSS variables visible.
- Use raw `<nav>`, `<header>`, `<main>` elements, not MUI `AppBar`/`Drawer`/`Toolbar` which override Harmony tokens.
- For the grid container, use `Box` with `sx={{ display: 'grid', gridTemplateRows: '...' }}`.
- For sidebar items, use `ButtonBase` wrapped in a link, or plain `<a>` elements.
- All spacing/sizing via `var(--*)` tokens from `harmony-styles/tokens.css`. No `theme.spacing()`.

## shadcn implementation notes

- Use semantic HTML elements with CSS classes.
- Apply Harmony BEM classes or equivalent utility classes that reference `var(--*)` tokens.
- For the grid container, use standard CSS Grid properties.

## What you must NOT do

- Do NOT use MUI `Drawer` for sidebars. The reference uses `position: fixed` floating overlays.
- Do NOT use MUI `AppBar` if it overrides `--shell-header-height` or z-index tokens.
- Do NOT use flexbox for the shell container. The reference uses CSS Grid.
- Do NOT hardcode padding, spacing, or sizing values. Use `var(--*)` tokens.
- Do NOT reduce sidebar items or sections from the default data. Copy exactly from reference-components.
- Do NOT skip dark mode CSS blocks. Copy every `html.dark` and `html.theme-*.dark` rule from the reference.
- Do NOT use a single icon library when the reference uses the manifest + fallback chain.
- Do NOT flatten sidebar sections into a single list. Each section has its own container with border/shadow/radius.
- Do NOT omit the `data-*` attributes on shell elements. CSS selectors depend on them.
- Do NOT skip the header gradient bar or company picker divider.
- Do NOT mark the build as complete. The parent agent runs the shell-fidelity-verifier after you finish.

## Output

When the build is complete, report:
- Components built (list each one)
- Framework used (MUI or shadcn)
- Files created or modified
- Default data copied from reference (sidebar items, footer tabs)
- Assets copied to `public/` (list each file; flag any missing from `harmony-assets/`)
- Entry point file modified and ShellLayout wired (confirm file path)
- Any gaps where the framework could not match the reference (document why)

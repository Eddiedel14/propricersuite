---
name: shell-fidelity-verifier
description: Compares built MUI/shadcn shell against reference-components/ structurally. Read-only deviation list. Use after shell-builder completes.
model: fast
readonly: true
---

# Shell Fidelity Verifier

You compare the **built shell** to the **reference-components/** spec. You do not fix anything. You only list deviations. You do not explain why deviations might be acceptable.

## Inputs (must be stated in the task)

- Paths to the **built shell component files** (e.g. `src/shell/ShellLayout.tsx`, `src/shell/LeftSidebar.tsx`)
- **Framework:** MUI or shadcn
- Paths to the **reference-components/** (default: `reference-components/`)
- **Entry point file path** (e.g. `src/App.tsx`, `src/main.tsx`) — required for Wiring & Assets checks 72–74
- **Target theme** (e.g. `theme-ppm`, `theme-cp`) — required for per-theme checks 21, 29, 78–80

## What to check

For every shell component, read the built file and the corresponding reference file. Check every item below. A deviation is any difference from the reference.

### ShellLayout structure

1. **Grid layout:** Container uses `display: grid` with `grid-template-rows`, NOT flexbox.
2. **Grid rows with footer:** `grid-template-rows: var(--shell-header-height) 1fr calc(var(--shell-footer-height-default) + 4px)`
3. **Grid rows without footer:** `grid-template-rows: var(--shell-header-height) 1fr`
4. **Header position:** `position: fixed; top: 0; left: 0; right: 0; z-index: var(--z-50)`
5. **Main content:** `grid-row: 2; overflow-y: auto; display: flex; flex-direction: column`
6. **Footer:** `grid-row: 3; z-index: var(--z-40)`
7. **Data attributes:** `data-cp-variant`, `data-has-footer`, `data-has-floating-nav`, `data-has-right-sidebar`, `data-footer-variant` present on correct elements.

### Main content padding

8. **With floating nav:** `padding: var(--shell-layout-padding-top) calc(var(--shell-layout-padding-side-default) + var(--space-5)) var(--space-6) calc(var(--shell-layout-padding-side-default) + var(--space-5))`
9. **Without floating nav:** `padding-left: calc(var(--shell-layout-padding-side-default) + var(--space-5))`
10. **With right sidebar:** `padding-right: calc(var(--shell-layout-padding-side-default) + var(--space-5))`
11. **CP variant with floating nav:** `padding-top: var(--space-5)`
12. No hardcoded px values for main padding.

### LeftSidebar

13. **Position:** `position: fixed; left: 0` — NOT a flex child or MUI Drawer.
14. **Width:** 52px collapsed, 220px on hover.
15. **Sections:** Multiple `__section` containers, each with own `background-color: var(--nav-bg)`, `border`, `border-radius: 0 var(--radius-12) var(--radius-12) 0`, `box-shadow: var(--shadow-xl)`.
16. **Section border:** `border-left: none` (border on right, top, bottom only).
17. **Section gap:** `gap: var(--space-4)` between items (CP variant: `gap: var(--space-1-5)` between items, `gap: var(--space-2)` between sections).
18. **Labels:** Hidden by default (`opacity: 0; visibility: hidden`), visible on parent hover.
19. **Icon size:** `var(--space-6)` (24px) width and height.
20. **Active item:** `background-color: var(--theme-primary); color: var(--text-inverse)`.
21. **Default items:** Left sidebar items match the target theme's default data from `reference-components/LeftSidebar.tsx`. CP: 2 sections (4 + 11 items). VP/PPM/Maconomy: 1 section (12 items). Icon names and labels must match the corresponding theme constant (`CP_SECTIONS`, `PPM_SECTIONS`, etc.).
22. **Dark mode:** Custom icon filter rule present.

### RightSidebar

23. **Position:** `position: fixed; right: 0; top: 50%; transform: translateY(-50%)`.
24. **Sections:** Multiple `__section` containers with `border-radius: var(--radius-12) 0 0 var(--radius-12)` (rounded LEFT), `border-right: none`.
25. **Section gap:** `gap: var(--space-3)` between sections, `gap: var(--space-1-5)` between items.
26. **Items:** `justify-content: flex-end`, label `text-align: right`.
27. **Labels:** Hidden by default, visible on parent hover (same opacity/visibility pattern as left).
28. **Dela AI:** Custom `<img>` with default/active states using `right-sidebar__dela-logo` classes.
29. **Default items:** Right sidebar items match the target theme's default data from `reference-components/RightSidebar.tsx`. CP: 3 sections (3 + 2 + 4 items). VP/PPM/Maconomy: 3 sections (8 + 3 + 3 items). Icon names and labels must match the corresponding theme constant (`CP_SECTIONS`, `PPM_SECTIONS`, etc.).
30. **Dark mode:** img filter rule excluding active Dela logo.

### ShellFooter

31. **Background:** `var(--shell-footer-bg)` (#212631 — always dark).
32. **Height:** `var(--shell-footer-height-default)` (48px).
33. **Tab labels:** White (`var(--shell-footer-tab-label-color)`) — NOT theme color.
34. **Active tab icon:** `var(--shell-footer-tab-icon-color-active)` (theme-primary).
35. **Active tab pin icon:** Active tabs show pin icon (icon mapped from 'pin').
36. **TabStrip border:** `border-bottom: none` inside footer.
37. **Dark mode:** `html.dark` rules copied — labels and icons stay white.

### FloatingNav (CP only)

38. **Presence:** Exists when `showFloatingNav` is true (CP themes).
39. **Border-radius:** `0 0 var(--radius-16) var(--radius-16)` (rounded bottom only).
40. **Buttons:** Execute, Actions (dropdown), Refresh (icon-dropdown), Save (primary/disabled).
41. **Pin:** Icon with `rotate(-45deg)`.
42. **Divider:** `width: 2px; height: 33px` with `::before` accent.
43. **CP dark mode:** All `html.theme-cp.dark` overrides present.

### ShellHeader

44. **Brand:** Logo image + product name.
45. **Company picker:** Dropdown with indicator color, name, chevron icon.
46. **Gradient bar:** `header__gradient` element with inline gradient from company color.
47. **Divider:** Between company picker and Avatar.
48. **Avatar:** Renders via Avatar component.
49. **Company picker behavior:** Open/close, selection updates name + color + gradient.
49b. **Title inner structure:** `header__title` contains `header__title-product` inner span. If `productSuffix` is provided, a `header__title-suffix` span is also present. These activate `--theme-primary` and `--text-muted` / `--font-normal` from `layout.css` lines 77-84.

### ShellPageHeader

50. **Layout:** `display: flex; justify-content: space-between; align-items: center`.
51. **Title:** `font-family: var(--font-display); font-size: var(--heading-l)`.
52. **Buttons:** Use `buttonType="pageHeader"` → `--page-header-btn-*` tokens.
53. **Responsive:** Stacks at `--breakpoint-md`.

### ShellPanel

54. **Position:** `position: fixed` within shell-layout.
55. **Slide animation:** Left from `translateX(-100%)`, right from `translateX(100%)`.
56. **Width variants:** narrow = `var(--panel-width-narrow)`, full = `var(--shell-panel-width-full)`.
57. **Header variants:** theme (primary bg), default (elevated bg), gradient (dela gradient).
58. **Z-index:** Panel at `--z-44`, sidebars at `--z-45` (sidebars always on top).

### Icons

59. **Manifest:** Icon manifest loaded from `harmony-data/icon-manifest.json`.
60. **Rendering:** Inline SVG with `currentColor` for standard icons, `<img>` for custom assets.
61. **Sizes:** SVG `width` and `height` attributes use pixel integer values (12, 16, 20, 24, 32) — NOT CSS variable strings. Check that the Icon component uses a numeric lookup (e.g. `{ xs: { width: 12, height: 12 }, ... }`) and passes numbers directly as attributes, not `var(--icon-*)` strings. CSS variable strings in SVG attributes are invalid — the browser cannot resolve them and falls back to the SVG's intrinsic size, causing enormous icons. If `var(--icon-*)` strings appear as `width=` or `height=` attribute values (not inside a `style=` prop), flag as a deviation.
62. **Custom icons:** mic-slash, RS_DelaDefault, RS_Dela_Active, PPMLogo, CPVPLogo, MacLogo, Stars from `harmony-assets/`.
63. **No missing icons:** Every icon name in the reference resolves to visible output. No `?` fallbacks.

### General

64. **CSS variables:** All spacing, sizing, colors use `var(--*)` tokens. No hardcoded values.
65. **Dark mode:** Every `html.dark` and `html.theme-*.dark` block from reference CSS is present.
66. **BEM classes:** Harmony BEM class names from the reference are present on corresponding elements. BEM class names are the primary mechanism — they activate the global cascade for all visual behavior.
67. **Data attributes:** All `data-*` attributes from reference are present on corresponding elements.
68. **DOM order:** Component render order matches reference (header, floating-nav, left-sidebar, right-sidebar, main, footer).

### Anti-patterns

Flag as a deviation if any of the following exist in the built shell component files:

69. **Prohibited MUI high-level imports:** Any import from `@mui/icons-material`, `@mui/material/Drawer`, `@mui/material/AppBar`, or `@mui/material/Toolbar` in shell component files. These components override Harmony tokens and bypass the BEM class name cascade.
70. **Visual properties in sx on cascade-covered elements:** Any `sx={{ '&:hover': ... }}`, `sx={{ color: ... }}`, `sx={{ backgroundColor: ... }}`, or `sx={{ borderRadius: ... }}` on elements that correspond to a Harmony-cascade-covered selector (sidebar items, header elements, footer tabs, nav items). Visual properties in `sx` mean BEM class names were skipped.
71. **Hardcoded values with Harmony token equivalents:** Any hardcoded pixel or hex value for a property (color, background, border, spacing, sizing) that has a Harmony `var(--*)` token equivalent.

### Wiring & Assets

72. **Custom assets in public/:** The following files must all exist on disk. If any are missing, the corresponding shell element will be visually broken at runtime even though the TSX is correct.
    - `public/logos/PPMLogo.svg` — PPM header logo
    - `public/logos/CPVPLogo.svg` — CP and VP header logo
    - `public/logos/MacLogo.svg` — Maconomy header logo
    - `public/RS_DelaDefault.svg` — Dela AI right sidebar icon (default state)
    - `public/RS_Dela_Active.svg` — Dela AI right sidebar icon (active state)
    - `public/mic-slash.svg` — CP right sidebar mic icon
    - `public/Stars.svg` — Dela button variant decoration (`<img src="/Stars.svg">` in Button component)
73. **ShellLayout mounted in entry point:** Entry point file imports and renders ShellLayout with at minimum `productName`, `logoSrc`, and `tabs` props wired.
74. **Content slot spacing:** If real page content children are passed to ShellLayout, the first child element has `margin-top: var(--space-4)` (or equivalent CSS) to clear the ShellPageHeader. If no children are passed (greenfield scaffold), ShellLayout's `{children ?? <Card>}` fallback must be visible — do NOT flag the absence of a margin-top wrapper in a greenfield entry point.

### Host CSS conflicts

75. **No conflicting `#root` styles:** `index.css` / `globals.css` does not contain `width`, `max-width`, `margin: 0 auto`, `text-align: center`, `display: flex`, `flex-direction: column`, or `border-inline` on `#root`. These scaffold defaults cage the shell. The `#root` block should be a neutral viewport reset only (`margin: 0; padding: 0; width: 100%; display: block` or equivalent).
76. **No dead scaffold CSS imports:** Entry component (e.g. `App.tsx`) does not import a scaffold CSS file (e.g. `App.css`) whose markup has been replaced by ShellLayout.
77. **No scaffold dark mode state management:** Entry component does not contain `readInitialDark`, `getInitialTheme`, `localStorage.getItem('dark')`, or `matchMedia('prefers-color-scheme')` dark mode detection. Harmony dark mode is class-based via `<html class="dark">`, controlled at theme-builder time.

### Per-theme shell behavior

78. **Shell behavior matches target theme:** CP must have `showFloatingNav={true}` (or equivalent) and `showFooter={false}`. VP/PPM/Maconomy must have `showFooter={true}` and no floating nav. Check the ShellLayout props in the entry point wiring.
79. **Sidebar variants match target theme:** `leftSidebarVariant` and `rightSidebarVariant` props on ShellLayout must match the target theme (e.g. `"cp"` for theme-cp, `"ppm"` for theme-ppm). Do NOT accept `"ppm"` variant when the target theme is CP.
80. **Product name matches target theme:** `productName` and `productSuffix` (if applicable) on ShellLayout or ShellHeader must match the per-theme configuration: CP = "CP" / "Control Panel", VP = "VP" / "Vision Planning", PPM = "PPM", Maconomy = "Maconomy".

## Output format

List every deviation as a numbered item:

```
1. SHELL_LAYOUT: Container uses flexbox instead of CSS Grid. Reference: display: grid; grid-template-rows.
2. LEFT_SIDEBAR: Position is relative (flex child). Reference: position: fixed; left: 0.
3. LEFT_SIDEBAR: Single section container. Reference: multiple __section containers each with own bg/border/shadow/radius.
4. MAIN_PADDING: Hardcoded padding-left: 72px. Reference: calc(var(--shell-layout-padding-side-default) + var(--space-5)).
5. FOOTER: Tab labels use --theme-primary color. Reference: --shell-footer-tab-label-color (#ffffff).
6. ICONS: magnifying-glass shows ? fallback. Reference: resolves from manifest.
```

If zero deviations: output **"PASS: zero deviations."**

## Rules

- Do not fix anything. Only list deviations.
- Do not explain why a deviation might be acceptable.
- Do not suggest alternatives.
- Do not accept partial implementations — every check must be verified.
- File-based only. Do not open a browser.
- Compare against `reference-components/` files, `harmony-styles/components.css`, and `harmony-styles/layout.css` — not memory or assumptions.

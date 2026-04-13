/** Non-palette token wiring (Passes 4–5) exposed on `theme.harmonyTokens`. */
export interface HarmonyThemeTokens {
  spacingScale: Record<
    | '0'
    | '0.5'
    | '1'
    | '1.5'
    | '2'
    | '2.5'
    | '3'
    | '3.5'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12'
    | '14'
    | '16'
    | '20'
    | '24',
    string
  >
  radiiSemantic: Record<'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full', string>
  radiiNumbered: Record<
    '03' | '04' | '06' | '08' | '12' | '16' | '24' | '100',
    string
  >
  shell: Record<string, string>
  borderWidth: Record<'thin' | 'standard' | 'medium' | 'thick', string>
  componentSizing: Record<string, string>
  zIndexNumeric: Record<
    'base' | '10' | '20' | '30' | '40' | '44' | '45' | '46' | '47' | '50',
    string
  >
  zIndexFunctional: Record<
    'dropdown' | 'sticky' | 'modal' | 'popover' | 'tooltip',
    string
  >
  focusRings: Record<
    | 'opacity'
    | 'primary'
    | 'pageHeader'
    | 'error'
    | 'errorChecked'
    | 'warning'
    | 'warningChecked'
    | 'datePicker',
    string
  >
  insetShadows: Record<'sm' | 'md', string>
  overlayBackdrop: string
  transitions: Record<'fast' | 'base' | 'slow', string>
}

/** Harmony token bridge: values are `var(--*)` references resolved by `tokens.css` + `html.theme-*` / `html.dark`. */
export interface HarmonyExtendedPalette {
  textInverse: string
  borderLight: string
  link: string
  themePrimaryBorder: string
  themePrimaryHoverLight: string
  navBg: string
  inputBg: string
  inputDisabledBg: string
  surfaceBg: string
  elevatedBg: string
  hoverBg: string
  borderColor: string
  borderFocus: string
  semantic: {
    successHover: string
    infoLight: string
    infoBorder: string
    successLight: string
    successBorder: string
    successBgSubtle: string
    warningLight: string
    warningBorder: string
    warningFocus: string
    errorLight: string
    errorBorder: string
    errorBgSubtle: string
    errorFocus: string
  }
  themeButton: Record<string, string>
  pageHeaderButton: Record<string, string>
  table: Record<string, string>
  kanban: { inProgressBorder: string; doneBorder: string }
  scrollbar: { track: string; thumb: string; thumbHover: string }
  cp: {
    floatingNav: Record<string, string>
    floatingNavDark: Record<string, string>
    sidebar: Record<string, string>
    sidebarDark: Record<string, string>
  }
  base: Record<string, string>
}

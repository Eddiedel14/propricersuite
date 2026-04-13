import type { CSSProperties } from 'react'
import type { HarmonyExtendedPalette, HarmonyThemeTokens } from './paletteTypes'

declare module '@mui/material/styles' {
  interface Palette {
    harmony: HarmonyExtendedPalette
  }
  interface PaletteOptions {
    harmony?: Partial<HarmonyExtendedPalette>
  }

  interface ZIndex {
    mobileStepper: number | string
    speedDial: number | string
    appBar: number | string
    drawer: number | string
    modal: number | string
    snackbar: number | string
    tooltip: number | string
    fab: number | string
  }
  interface ZIndexOptions {
    mobileStepper?: number | string
    speedDial?: number | string
    appBar?: number | string
    drawer?: number | string
    modal?: number | string
    snackbar?: number | string
    tooltip?: number | string
    fab?: number | string
  }

  interface Theme {
    harmonyTokens: HarmonyThemeTokens
  }
  interface ThemeOptions {
    harmonyTokens?: HarmonyThemeTokens
  }

  interface TypographyVariants {
    textXs: CSSProperties
    textSm: CSSProperties
    textBase: CSSProperties
    textLg: CSSProperties
    textXl: CSSProperties
    text2xl: CSSProperties
    text3xl: CSSProperties
    text4xl: CSSProperties
    text5xl: CSSProperties
    text6xl: CSSProperties
    displayM: CSSProperties
    bodyEmphasized: CSSProperties
    label: CSSProperties
    text13: CSSProperties
    fontMono: CSSProperties
  }

  interface TypographyVariantsOptions {
    textXs?: CSSProperties
    textSm?: CSSProperties
    textBase?: CSSProperties
    textLg?: CSSProperties
    textXl?: CSSProperties
    text2xl?: CSSProperties
    text3xl?: CSSProperties
    text4xl?: CSSProperties
    text5xl?: CSSProperties
    text6xl?: CSSProperties
    displayM?: CSSProperties
    bodyEmphasized?: CSSProperties
    label?: CSSProperties
    text13?: CSSProperties
    fontMono?: CSSProperties
  }
}

export {}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    textXs: true
    textSm: true
    textBase: true
    textLg: true
    textXl: true
    text2xl: true
    text3xl: true
    text4xl: true
    text5xl: true
    text6xl: true
    displayM: true
    bodyEmphasized: true
    label: true
    text13: true
    fontMono: true
  }
}

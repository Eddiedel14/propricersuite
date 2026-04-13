import { createTheme } from '@mui/material/styles'
import type { PaletteMode, Shadows, ThemeOptions } from '@mui/material/styles'
import type { SpacingOptions } from '@mui/system'
import type { HarmonyThemeTokens } from './paletteTypes'
import { ppmHarmonyExtended, ppmStandardPaletteForMode } from './ppmHarmonyPalette'

const SPACE_VAR_BY_FACTOR: Record<string, string> = {
  '0': 'var(--space-0)',
  '0.5': 'var(--space-0-5)',
  '1': 'var(--space-1)',
  '1.5': 'var(--space-1-5)',
  '2': 'var(--space-2)',
  '2.5': 'var(--space-2-5)',
  '3': 'var(--space-3)',
  '3.5': 'var(--space-3-5)',
  '4': 'var(--space-4)',
  '5': 'var(--space-5)',
  '6': 'var(--space-6)',
  '7': 'var(--space-7)',
  '8': 'var(--space-8)',
  '9': 'var(--space-9)',
  '10': 'var(--space-10)',
  '11': 'var(--space-11)',
  '12': 'var(--space-12)',
  '14': 'var(--space-14)',
  '16': 'var(--space-16)',
  '20': 'var(--space-20)',
  '24': 'var(--space-24)',
}

const harmonySpacing: SpacingOptions = (...args: Array<string | number>) =>
  args
    .map((arg) => {
      const key = String(arg)
      if (Object.prototype.hasOwnProperty.call(SPACE_VAR_BY_FACTOR, key)) {
        return SPACE_VAR_BY_FACTOR[key]
      }
      const n = typeof arg === 'number' ? arg : Number(arg)
      if (!Number.isNaN(n)) {
        // Harmony step tokens only cover a fixed set; unmapped factors use the 4px base token (no literal px).
        return `calc(var(--space-1) * ${n})`
      }
      return key
    })
    .join(' ')

function buildHarmonyShadows(): Shadows {
  const core = [
    'none',
    'var(--shadow-sm)',
    'var(--shadow-md)',
    'var(--shadow-lg)',
    'var(--shadow-xl)',
    'var(--shadow-2xl)',
    'var(--shadow-dropdown)',
  ]
  const out = [...core]
  while (out.length < 25) out.push('var(--shadow-2xl)')
  return out as Shadows
}

const harmonyTokens: HarmonyThemeTokens = {
  spacingScale: {
    '0': 'var(--space-0)',
    '0.5': 'var(--space-0-5)',
    '1': 'var(--space-1)',
    '1.5': 'var(--space-1-5)',
    '2': 'var(--space-2)',
    '2.5': 'var(--space-2-5)',
    '3': 'var(--space-3)',
    '3.5': 'var(--space-3-5)',
    '4': 'var(--space-4)',
    '5': 'var(--space-5)',
    '6': 'var(--space-6)',
    '7': 'var(--space-7)',
    '8': 'var(--space-8)',
    '9': 'var(--space-9)',
    '10': 'var(--space-10)',
    '11': 'var(--space-11)',
    '12': 'var(--space-12)',
    '14': 'var(--space-14)',
    '16': 'var(--space-16)',
    '20': 'var(--space-20)',
    '24': 'var(--space-24)',
  },
  radiiSemantic: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
    '2xl': 'var(--radius-2xl)',
    full: 'var(--radius-full)',
  },
  radiiNumbered: {
    '03': 'var(--radius-03)',
    '04': 'var(--radius-04)',
    '06': 'var(--radius-06)',
    '08': 'var(--radius-08)',
    '12': 'var(--radius-12)',
    '16': 'var(--radius-16)',
    '24': 'var(--radius-24)',
    '100': 'var(--radius-100)',
  },
  shell: {
    headerHeight: 'var(--shell-header-height)',
    footerHeightDefault: 'var(--shell-footer-height-default)',
    footerHeightCompact: 'var(--shell-footer-height-compact)',
    layoutPaddingTop: 'var(--shell-layout-padding-top)',
    layoutPaddingSideDefault: 'var(--shell-layout-padding-side-default)',
    layoutPaddingSideStandard: 'var(--shell-layout-padding-side-standard)',
    layoutPaddingSideTablet: 'var(--shell-layout-padding-side-tablet)',
    layoutPaddingSideMobile: 'var(--shell-layout-padding-side-mobile)',
    sidebarWidth: 'var(--sidebar-width)',
    leftSidebarWidthCompact: 'var(--left-sidebar-width-compact)',
    rightSidebarWidthCompact: 'var(--right-sidebar-width-compact)',
    leftSidebarIconSizeCompact: 'var(--left-sidebar-icon-size-compact)',
    rightSidebarIconSizeCompact: 'var(--right-sidebar-icon-size-compact)',
    rightSidebarDelaSizeCompact: 'var(--right-sidebar-dela-size-compact)',
    panelWidthNarrow: 'var(--panel-width-narrow)',
    panelWidthFull: 'var(--panel-width-full)',
    shellPanelWidthFull: 'var(--shell-panel-width-full)',
  },
  borderWidth: {
    thin: 'var(--border-width-thin)',
    standard: 'var(--border-width-standard)',
    medium: 'var(--border-width-medium)',
    thick: 'var(--border-width-thick)',
  },
  componentSizing: {
    buttonHeightXs: 'var(--button-height-xs)',
    buttonHeightSm: 'var(--button-height-sm)',
    buttonHeightMd: 'var(--button-height-md)',
    buttonHeightLg: 'var(--button-height-lg)',
    avatarSm: 'var(--avatar-size-sm)',
    avatarMd: 'var(--avatar-size-md)',
    avatarLg: 'var(--avatar-size-lg)',
    badgeHeightSm: 'var(--badge-height-sm)',
    badgeHeightMd: 'var(--badge-height-md)',
    badgeHeightLg: 'var(--badge-height-lg)',
    badgeMinWidthSm: 'var(--badge-min-width-sm)',
    badgeMinWidthMd: 'var(--badge-min-width-md)',
    badgeMinWidthLg: 'var(--badge-min-width-lg)',
    badgeDotSm: 'var(--badge-dot-size-sm)',
    badgeDotMd: 'var(--badge-dot-size-md)',
    badgeDotLg: 'var(--badge-dot-size-lg)',
    iconXs: 'var(--icon-xs)',
    iconSm: 'var(--icon-sm)',
    iconMd: 'var(--icon-md)',
    iconLg: 'var(--icon-lg)',
    iconXl: 'var(--icon-xl)',
    iconStrokeWidth: 'var(--icon-stroke-width)',
    spinnerXs: 'var(--spinner-size-xs)',
    spinnerSm: 'var(--spinner-size-sm)',
    spinnerMd: 'var(--spinner-size-md)',
    spinnerLg: 'var(--spinner-size-lg)',
    spinnerStrokeXs: 'var(--spinner-stroke-width-xs)',
    spinnerStrokeSm: 'var(--spinner-stroke-width-sm)',
    spinnerStrokeMd: 'var(--spinner-stroke-width-md)',
    spinnerStrokeLg: 'var(--spinner-stroke-width-lg)',
    dropdownMinWidth: 'var(--dropdown-min-width)',
    dropdownHeight: 'var(--dropdown-height)',
    dropdownHeightCp: 'var(--dropdown-height-cp)',
    dropdownMenuMaxHeight: 'var(--dropdown-menu-max-height)',
    dropdownMaxHeightLegacy: 'var(--dropdown-max-height)',
    inputHeightCp: 'var(--input-height-cp)',
    tableMinWidth: 'var(--table-min-width)',
    dialogMinWidth: 'var(--dialog-min-width)',
    dialogMaxWidthDefault: 'var(--dialog-max-width-default)',
    dialogWidthPercentage: 'var(--dialog-width-percentage)',
    dialogMaxHeight: 'var(--dialog-max-height)',
    dialogMargin: 'var(--dialog-margin)',
    dialogMarginHorizontal: 'var(--dialog-margin-horizontal)',
    dialogMarginVertical: 'var(--dialog-margin-vertical)',
    dialogMaxWidthMedium: 'var(--dialog-max-width-medium)',
    dialogFooterBtnMinWidth: 'var(--dialog-footer-btn-min-width)',
  },
  zIndexNumeric: {
    base: 'var(--z-base)',
    '10': 'var(--z-10)',
    '20': 'var(--z-20)',
    '30': 'var(--z-30)',
    '40': 'var(--z-40)',
    '44': 'var(--z-44)',
    '45': 'var(--z-45)',
    '46': 'var(--z-46)',
    '47': 'var(--z-47)',
    '50': 'var(--z-50)',
  },
  zIndexFunctional: {
    dropdown: 'var(--z-dropdown)',
    sticky: 'var(--z-sticky)',
    modal: 'var(--z-modal)',
    popover: 'var(--z-popover)',
    tooltip: 'var(--z-tooltip)',
  },
  focusRings: {
    opacity: 'var(--focus-ring-opacity)',
    primary: 'var(--focus-ring-primary)',
    pageHeader: 'var(--focus-ring-page-header)',
    error: 'var(--focus-ring-error)',
    errorChecked: 'var(--focus-ring-error-checked)',
    warning: 'var(--focus-ring-warning)',
    warningChecked: 'var(--focus-ring-warning-checked)',
    datePicker: 'var(--focus-ring-date-picker)',
  },
  insetShadows: {
    sm: 'var(--shadow-inset-sm)',
    md: 'var(--shadow-inset-md)',
  },
  overlayBackdrop: 'var(--overlay-backdrop-opacity)',
  transitions: {
    fast: 'var(--transition-fast)',
    base: 'var(--transition-base)',
    slow: 'var(--transition-slow)',
  },
}

export function createHarmonyTheme(mode: PaletteMode = 'light') {
  return createTheme({
    palette: {
      mode,
      ...ppmStandardPaletteForMode(mode),
      harmony: ppmHarmonyExtended,
    },
    spacing: harmonySpacing,
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
      },
    },
    shape: {
      borderRadius: 'var(--radius-08)',
    },
    shadows: buildHarmonyShadows(),
    zIndex: {
      mobileStepper: 'var(--z-10)',
      speedDial: 'var(--z-40)',
      fab: 'var(--z-40)',
      appBar: 'var(--z-50)',
      drawer: 'var(--z-modal)',
      modal: 'var(--z-modal)',
      snackbar: 'var(--z-popover)',
      tooltip: 'var(--z-tooltip)',
    } as unknown as ThemeOptions['zIndex'],
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 200,
        standard: 300,
        complex: 300,
        enteringScreen: 225,
        leavingScreen: 195,
      },
    },
    typography: {
      fontFamily: 'var(--font-sans)',
      h1: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--display-xl)',
        fontWeight: 'var(--font-extrabold)',
        lineHeight: 'var(--leading-tight)',
      },
      h2: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--display-l)',
        fontWeight: 'var(--font-bold)',
        lineHeight: 'var(--leading-tight)',
      },
      h3: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--heading-xl)',
        fontWeight: 'var(--font-bold)',
        lineHeight: 'var(--leading-snug)',
      },
      h4: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--heading-l)',
        fontWeight: 'var(--font-semibold)',
        lineHeight: 'var(--leading-snug)',
      },
      h5: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--heading-m)',
        fontWeight: 'var(--font-semibold)',
        lineHeight: 'var(--leading-snug)',
      },
      h6: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--heading-s)',
        fontWeight: 'var(--font-semibold)',
        lineHeight: 'var(--leading-snug)',
      },
      displayM: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--display-m)',
        fontWeight: 'var(--font-bold)',
        lineHeight: 'var(--leading-tight)',
      },
      subtitle1: {
        fontSize: 'var(--text-lg)',
        fontWeight: 'var(--font-medium)',
        lineHeight: 'var(--leading-normal)',
      },
      subtitle2: {
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--font-medium)',
        lineHeight: 'var(--leading-normal)',
      },
      body1: {
        fontSize: 'var(--body-default)',
        fontWeight: 'var(--font-normal)',
        lineHeight: 'var(--leading-normal)',
      },
      body2: {
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--font-normal)',
        lineHeight: 'var(--leading-normal)',
      },
      bodyEmphasized: {
        fontSize: 'var(--body-emphasized)',
        fontWeight: 'var(--font-semibold)',
        lineHeight: 'var(--leading-normal)',
      },
      label: {
        fontSize: 'var(--label)',
        fontWeight: 'var(--font-medium)',
        lineHeight: 'var(--leading-normal)',
      },
      text13: {
        fontSize: 'var(--text-13)',
        fontWeight: 'var(--font-normal)',
        lineHeight: 'var(--leading-normal)',
      },
      button: {
        fontSize: 'var(--label)',
        fontWeight: 'var(--font-medium)',
        lineHeight: 'var(--leading-normal)',
        textTransform: 'none',
      },
      caption: {
        fontSize: 'var(--caption)',
        fontWeight: 'var(--font-normal)',
        lineHeight: 'var(--leading-normal)',
      },
      overline: {
        fontSize: 'var(--overline)',
        fontWeight: 'var(--font-semibold)',
        lineHeight: 'var(--leading-none)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      },
      textXs: {
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--font-light)',
        lineHeight: 'var(--leading-relaxed)',
      },
      textSm: {
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--font-normal)',
        lineHeight: 'var(--leading-relaxed)',
      },
      textBase: {
        fontSize: 'var(--text-base)',
        fontWeight: 'var(--font-normal)',
        lineHeight: 'var(--leading-normal)',
      },
      textLg: {
        fontSize: 'var(--text-lg)',
        fontWeight: 'var(--font-medium)',
        lineHeight: 'var(--leading-normal)',
      },
      textXl: {
        fontSize: 'var(--text-xl)',
        fontWeight: 'var(--font-medium)',
        lineHeight: 'var(--leading-snug)',
      },
      text2xl: {
        fontSize: 'var(--text-2xl)',
        fontWeight: 'var(--font-semibold)',
        lineHeight: 'var(--leading-snug)',
      },
      text3xl: {
        fontSize: 'var(--text-3xl)',
        fontWeight: 'var(--font-semibold)',
        lineHeight: 'var(--leading-snug)',
      },
      text4xl: {
        fontSize: 'var(--text-4xl)',
        fontWeight: 'var(--font-bold)',
        lineHeight: 'var(--leading-tight)',
      },
      text5xl: {
        fontSize: 'var(--text-5xl)',
        fontWeight: 'var(--font-bold)',
        lineHeight: 'var(--leading-tight)',
      },
      text6xl: {
        fontSize: 'var(--text-6xl)',
        fontWeight: 'var(--font-extrabold)',
        lineHeight: 'var(--leading-tight)',
      },
      fontMono: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--font-normal)',
        lineHeight: 'var(--leading-normal)',
      },
    },
    harmonyTokens,
    components: {
      MuiButtonBase: {
        defaultProps: { disableRipple: true },
      },
      MuiButton: {
        defaultProps: {
          disableRipple: true,
          disableElevation: true,
        },
        styleOverrides: {
          sizeSmall: { height: 'var(--button-height-sm)' },
          sizeMedium: { height: 'var(--button-height-md)' },
          sizeLarge: { height: 'var(--button-height-lg)' },
        },
      },
      MuiIconButton: {
        defaultProps: { disableRipple: true },
        styleOverrides: {
          sizeSmall: {
            padding: 'var(--space-1)',
          },
          sizeMedium: {
            padding: 'var(--space-2)',
          },
          sizeLarge: {
            padding: 'var(--space-3)',
          },
        },
      },
      MuiFab: {
        defaultProps: { disableRipple: true },
      },
      MuiBadge: {
        styleOverrides: {
          badge: {
            minWidth: 'var(--badge-min-width-md)',
            height: 'var(--badge-height-md)',
          },
        },
      },
      MuiCircularProgress: {
        styleOverrides: {
          root: {
            width: 'var(--spinner-size-md)',
            height: 'var(--spinner-size-md)',
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            width: 'var(--avatar-size-md)',
            height: 'var(--avatar-size-md)',
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            minWidth: 'var(--dropdown-min-width)',
            maxHeight: 'var(--dropdown-menu-max-height)',
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            minWidth: 'var(--dropdown-min-width)',
            maxHeight: 'var(--dropdown-menu-max-height)',
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            minWidth: 'var(--table-min-width)',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            minWidth: 'var(--dialog-min-width)',
            maxWidth: 'var(--dialog-max-width-default)',
            maxHeight: 'var(--dialog-max-height)',
            margin: 'var(--dialog-margin)',
          },
        },
      },
    },
  })
}

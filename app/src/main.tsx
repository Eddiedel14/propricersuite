/**
 * Harmony global.css must load before MUI so tokens/reset/layout/components/utilities apply first.
 * Emotion is ordered before other head content via StyledEngineProvider injectFirst so Harmony
 * can win specificity ties after injection.
 * CssBaseline removed — Harmony reset.css provides box-sizing/margin reset (theme-builder Pass 1, Option A).
 */
import {
  StrictMode,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '../../harmony-styles/global.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import {
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles'
import type { PaletteMode } from '@mui/material/styles'
import './harmony/harmony-colocated.css'
import './index.css'
import { createHarmonyTheme } from './theme'
import App from './App.tsx'

function harmonyPaletteModeFromDocument(): PaletteMode {
  return document.documentElement.classList.contains('dark')
    ? 'dark'
    : 'light'
}

function HarmonyProviders({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>(harmonyPaletteModeFromDocument)

  useEffect(() => {
    const el = document.documentElement
    const sync = () => setMode(harmonyPaletteModeFromDocument())
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(el, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const theme = useMemo(() => createHarmonyTheme(mode), [mode])

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <HarmonyProviders>
        <App />
      </HarmonyProviders>
    </BrowserRouter>
  </StrictMode>,
)

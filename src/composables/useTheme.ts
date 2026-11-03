import { watchEffect } from 'vue'
import type { Theme } from '@/types'
import { useStorage } from './useStorage'

// Daha önce seçim yapılmadıysa işletim sisteminin tercihine uyulur.
const systemPrefersDark =
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches

const theme = useStorage<Theme>(
  'theme',
  systemPrefersDark ? 'dark' : 'light',
  (value) => value === 'light' || value === 'dark',
)

// Tema <html data-theme="..."> özniteliğine yazılır; renkler tokens.css'te buna göre değişir.
watchEffect(() => {
  document.documentElement.dataset.theme = theme.value
})

export function useTheme() {
  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return { theme, toggleTheme }
}

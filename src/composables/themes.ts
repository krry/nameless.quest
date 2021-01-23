import {ref} from 'vue'
import {defTheme} from '../schema'
import {THEMES} from '../constants'

interface Bg {
  filename: string
  cred: string
}

interface Theme {
  title: string
  emoji: string
  pip: string
  bgs: Bg[]
}

function checkThemePrefs() {
  let savedTheme, mediaPref, dayOrNight
  const tiempo = new Date().getHours()
  if (localStorage) {
    savedTheme = localStorage.getItem('theme')
    // console.log('theme saved was', savedTheme)
  }
  if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
    mediaPref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : defTheme
  }
  if (tiempo) dayOrNight = tiempo < 7 || tiempo > 19 ? 'night' : ''
  return savedTheme || mediaPref || dayOrNight || THEMES[1].title
}

export const activeTheme = ref<string>(checkThemePrefs())

export const useThemes = (): {
  getThemes: () => Theme[]
  setTheme: (title: string) => void
  nextTheme: () => void
} => {
  function getThemes() {
    return THEMES
  }

  function setTheme(title: string): void {
    // console.log('setting theme to', title)
    const titles = THEMES.map((t) => t.title)
    // if the title argument is one of the theme titles,
    if (titles.indexOf(title) !== -1) {
      // saves the arg as the active theme
      activeTheme.value = title
    }
  }

  function nextTheme(): void {
    // determines index of current active themes
    const currentIndex = THEMES.map((t) => t.title).indexOf(activeTheme.value)
    const nextIndex = currentIndex + 1 >= THEMES.length ? 0 : currentIndex + 1
    // console.log('advancing theme to', THEMES[nextIndex].title)
    setTheme(THEMES[nextIndex].title)
  }

  return {
    getThemes,
    nextTheme,
    setTheme,
  }
}

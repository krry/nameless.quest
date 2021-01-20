<template lang="pug">
FeedBack
#modals.modals.fs.fixed.abs-0
AppDrawer#drawer.drawer.fixed.abs-0.fs(
  @showModal="modalShown = true"
  @click.stop="closeDrawer"
  )
transition(name="flag" mode="out-in" appear)
  button.btn.naked.tab.surf.abs.b.l.float(
    v-if="drawerClosed"
    @click="openDrawer"
    ) 🏄
  button.btn.naked.tab.surf.abs.b.l(
    v-else
    @click="closeDrawer"
    ) 🏄
#app.app.rel(
  ref="ether"
  @navved="setNavved"
)
  router-view(
    :modal="modalShown"
    :hasNavved="hasNavved"
    @modal="handleModal"
    )
</template>

<script lang="ts">
import {defineComponent, ref, reactive, toRefs, watchEffect} from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import {activeTheme, useThemes} from './composables/themes'
import {defTheme} from './schema'
import FeedBack from './components/FeedBack.vue'
import AppDrawer from './components/AppDrawer.vue'

const {setTheme} = useThemes()

function checkThemePrefs() {
  let savedTheme, mediaPref, dayOrNight
  const tiempo = new Date().getHours()
  if (window.localStorage) {
    savedTheme = localStorage.getItem('lastTheme')
  }
  if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
    mediaPref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : defTheme
  }
  if (tiempo) dayOrNight = tiempo < 7 || tiempo > 19 ? 'night' : ''
  return savedTheme || mediaPref || dayOrNight || activeTheme.value
}

function removeClassOfClassesFromEl(element: HTMLElement, className: string) {
  const classList = element.classList
  while (classList.length > 0) {
    const cls = classList.item(0)
    if (cls === null) return
    if (cls.includes(className)) {
      classList.remove(cls)
    }
  }
}

function applyTheme(theme: string) {
  // console.log('applying theme:', theme)
  const doc = document.documentElement
  removeClassOfClassesFromEl(doc, 'theme')
  doc.classList.add(`theme-${theme}`)
  doc.setAttribute('data-theme', theme)
  localStorage.setItem('lastTheme', theme)
  setTheme(theme)
}

function checkStorage(key: string): boolean | undefined {
  const val = localStorage.getItem(key)
  if (val) return val === 'true'
}

export default defineComponent({
  name: 'App',
  components: {
    FeedBack,
    AppDrawer,
  },
  setup() {
    const rx = reactive({
      ether: ref<HTMLElement>(),
      modalShown: ref(false),
      drawerClosed: ref(false),
      hasNavved: ref(checkStorage('hasNavved')),
    })

    watchEffect(() => {
      // console.log('theme switched to', activeTheme.value)
      applyTheme(activeTheme.value)
    })

    return {
      ...toRefs(rx),
    }
  },
  mounted() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.modalShown = false
      }
    })
    const lastTheme = checkThemePrefs()
    if (lastTheme !== activeTheme.value) {
      setTheme(lastTheme)
    }
    document.addEventListener('scroll', () => {
      if (document.documentElement.scrollLeft >= 300) {
        this.drawerClosed = true
      } else this.drawerClosed = false
    })
  },
  unmounted() {
    window.removeEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.modalShown = false
      }
    })
    window.removeEventListener('scroll', () => {
      if (document.documentElement.scrollLeft >= 300) {
        this.drawerClosed = true
      } else this.drawerClosed = false
    })
  },
  methods: {
    openDrawer(): void {
      window.scrollTo(0, 0)
    },
    closeDrawer(): void {
      window.scrollTo(window.innerWidth, 0)
    },
    handleModal(state: boolean): void {
      this.modalShown = state
    },
    setNavved(bit: boolean): void {
      this.hasNavved = bit
      localStorage.setItem('hasNavved', JSON.stringify(bit))
    },
  },
})
</script>

<style lang="postcss">
html {
  font-size: 100%;
  font-size: 1rem;
  font-family: var(--font);
  background-color: var(--ground);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  font-size: 1rem;
  color: var(--ink);
  background-color: var(--paper);
  display: flex;
  flex-wrap: nowrap;
}

.bollard {
  --drawer-buffer: calc(100vw - 3rem);
}

.modals {
  z-index: 2;
  pointer-events: none;
}

.app {
  z-index: 1;
  pointer-events: none;
  scroll-snap-type: x mandatory;
}

.btn.surf.tab {
  font-size: 2em;
  border: 2px solid var(--glow);
  background-color: var(--silk);
  padding: 0 0.25em;
  margin: 0.5em 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  left: 0;
  transform: translateX(calc(100vw - 6rem));

  @media (min-width: 36rem) {
    transform: translateX(17rem);
  }

  &:hover {
    background: var(--dust);
  }
}

.btn.surf.tab.float {
  left: calc(100vw - 3rem);
  z-index: 3;
  transform: scaleX(-1);

  @media (min-width: 36rem) {
    left: 20rem;
  }
}

.flag-enter-active,
.flag-leave-active {
  transition: all var(--beat) 0;
  transform-origin: left center;
}

.flag-enter-from {
  transform: rotateY(90deg);
}

.flag-leave-to {
  transform: rotateY(-90deg);
}

.flag-enter-to,
.flag-leave-from {
  transform: rotateY(0deg);
}
</style>

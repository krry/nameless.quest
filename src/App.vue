<template lang="pug">
FeedbackFish(projectId="b186633d70b54b")
#modals.modals.fs.fixed.abs-0
AppDrawer#drawer.fixed.abs-0.fs(
  @showModal="showModal"
  @click.stop="closeDrawer"
  )
button.btn.naked.tab.surf.fixed.b.l.ride(
  @click="closeDrawer"
  )
transition(name="flag" appear)
  button.btn.naked.tab.surf.fixed.b.l.float(
    v-if="!drawerOpen"
    @click="openDrawer"
    )
#app.app.rel(
  ref="ether"
)
  router-view(
    :modal="modalShown"
    :navved="navved"
    @navved="setNavved"
    @modal="handleModal"
    @closeDrawer="closeDrawer"
    )
</template>

<script lang="ts">
import {defineComponent, ref, reactive, toRefs, watchEffect} from 'vue'
import {activeTheme, useThemes} from './composables/themes'
import AppDrawer from './components/AppDrawer.vue'
import {FeedbackFish} from '@feedback-fish/vue'

const {setTheme} = useThemes()

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
  const doc = document.documentElement
  removeClassOfClassesFromEl(doc, 'theme')
  doc.classList.add(`theme-${theme}`)
  doc.setAttribute('data-theme', theme)
  // console.log('applying theme:', theme)
  localStorage.setItem('theme', theme)
  // console.log('saved theme:', localStorage.getItem('theme'))
  setTheme(theme)
}

function checkStorage(key: string): boolean | undefined {
  const val = localStorage.getItem(key)
  if (val) return val === 'true'
}

export default defineComponent({
  name: 'App',
  components: {
    AppDrawer,
    FeedbackFish,
  },
  setup() {
    const rx = reactive({
      ether: ref<HTMLElement>(),
      modalShown: ref(false),
      drawerOpen: ref(true),
      navved: ref(checkStorage('navved')),
    })

    watchEffect(() => {
      // console.log('watchEffect triggered', activeTheme.value)
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

    window.addEventListener('scroll', () => {
      if (document.documentElement.scrollLeft <= 250) {
        this.drawerOpen = true
      } else this.drawerOpen = false
    })
    window.addEventListener('touchstart', () => (this.navved = true), true)
  },
  unmounted() {
    window.removeEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.modalShown = false
      }
    })
    window.removeEventListener('scroll', () => {
      if (document.documentElement.scrollLeft <= 250) {
        this.drawerOpen = true
      } else this.drawerOpen = false
    })
  },
  methods: {
    openDrawer(): void {
      window.scrollTo(0, document.documentElement.scrollTop)
    },
    closeDrawer(): void {
      const drawerWidth = window.innerWidth < 576 ? window.innerWidth - 48 : 300
      // const drawerWidth = window.innerWidth - 96
      window.scrollTo(drawerWidth, document.documentElement.scrollTop)
    },
    handleModal(state: boolean): void {
      this.modalShown = state
    },
    setNavved(bit: boolean): void {
      this.navved = bit
      // console.log('navved set to', bit)
      localStorage.setItem('navved', JSON.stringify(bit))
    },
    showModal(): void {
      this.closeDrawer()
      this.modalShown = true
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

.btn.surf::after {
  content: var(--pip);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  line-height: 2em;
}

.btn.surf.tab {
  font-size: 1.5em;
  height: 2em;
  width: 2em;
  margin: 1em 0;
  border: 2px solid var(--glow);
  background-color: var(--silk);
  padding: 0;
  /* margin: 0.5em 0; */
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  left: 0;
  border-right: 0;
  box-shadow: 0 0 0.25rem var(--glow);
  /* position: relative; */

  &:hover {
    background: var(--dust);
  }
}

.btn.surf.tab.ride {
  transform: translateX(calc(100vw - 6rem));

  @media (min-width: 36rem) {
    transform: translateX(16.9rem);
  }
}

.btn.surf.tab.float {
  z-index: 3;
  transform: translateX(0) rotateY(180deg);
}

.flag-enter-active,
.flag-leave-active {
  transition: transform var(--bea2);
  transform-origin: left center;
}

.flag-enter-from {
  transform: rotateY(90deg) translateX(0);
}

.flag-leave-to {
  transform: rotateY(90deg) translateX(calc(100vw - 6rem));

  @media (min-width: 36rem) {
    transform: rotateY(90deg) translateX(17rem);
  }
}

.flag-enter-to,
.flag-leave-from {
  transform: rotateY(180deg) translateX(0);
}
</style>

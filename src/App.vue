<template lang="pug">
FeedbackFish(projectId="b186633d70b54b")
#modals.modals.fs.fixed.abs-0
AppDrawer#drawer.fixed.abs-0.fs( @click.stop="closeDrawer" )
transition(name="flag" appear mode="out-in")
  button.btn.naked.tab.surf.fixed.b.l.ride(
    v-if="cfg.drawer"
    @click.stop="closeDrawer"
    tabindex="9"
    )
  button.btn.naked.tab.surf.fixed.b.l.float(
    v-else
    @click.stop="openDrawer"
    tabindex="9"
    )
#app.app.rel( ref="ether" )
  router-view
</template>

<script lang="ts">
import {defineComponent, ref, reactive, toRefs, onMounted, onUnmounted, watchEffect} from 'vue'
import {activeTheme, setTheme} from './store/theme'
import {cfg, set} from './store/cfg'
import AppDrawer from './components/AppDrawer.vue'
import {FeedbackFish} from '@feedback-fish/vue'

export default defineComponent({
  name: 'App',
  components: {
    AppDrawer,
    FeedbackFish,
  },
  setup() {
    const rx = reactive({
      ether: ref<HTMLElement>(),
    })

    function boundDrawer() {
      if (document.documentElement.scrollLeft <= 250) {
        set('drawer', true)
      } else set('drawer', false)
    }

    function escapeOracle(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        set('modal', false)
      }
    }

    watchEffect(() => {
      setTheme(activeTheme.value)
    })

    function openDrawer() {
      window.scrollTo(0, document.documentElement.scrollTop)
    }

    function closeDrawer() {
      const drawerWidth = window.innerWidth < 576 ? window.innerWidth - 48 : 360
      // const drawerWidth = window.innerWidth - 96
      window.scrollTo(drawerWidth, document.documentElement.scrollTop)
    }

    function handleDrawer(bit: boolean) {
      if (bit) openDrawer()
      else closeDrawer()
    }

    onMounted(() => {
      boundDrawer()
      window.addEventListener('scroll', boundDrawer)
      window.addEventListener('keydown', escapeOracle)
      window.addEventListener('touchstart', () => set('navvy', true), true)
    })

    onUnmounted(() => {
      window.removeEventListener('keydown', escapeOracle)
      window.removeEventListener('scroll', boundDrawer)
    })

    return {
      cfg,
      set,
      openDrawer,
      closeDrawer,
      handleDrawer,
      ...toRefs(rx),
    }
  },
})
</script>

<style lang="postcss" scoped>
.modals {
  z-index: 4;
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
  transition: inherit;
}

.btn.surf.tab {
  font-size: 1.5em;
  height: 2em;
  width: 2em;
  margin: 1em 0;
  border: 2px solid var(--glow);
  background-color: var(--paper);
  padding: 0;
  box-shadow: 0 0 0.25rem var(--glow);

  &:hover {
    outline: none;
    box-shadow: 0 0 0.5rem 0.125rem var(--glow);
  }

  &:hover::after {
    background-color: var(--dust);
  }
}

.btn.surf.tab.ride {
  left: 0;
  border-right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transform: translateX(calc(100vw - 6rem));

  @media (min-width: 36rem) {
    transform: translateX(16.9rem);
  }
}

.btn.surf.tab.float {
  border-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  z-index: 3;
}

.flag-enter-active,
.flag-leave-active {
  transition: all var(--bea2) var(--ease-in-out-quad);
}

.flag-leave-to,
.flag-enter-from {
  transform: translateX(-6rem);
}

.flag-enter-to,
.flag-leave-from {
  transform: translateX(0);
}
</style>

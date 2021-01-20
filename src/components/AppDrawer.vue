<template lang="pug">
.sidebar
  header.flex.mid
    LogoBrand(direction="bottom" size="large")
      template(#tagline) A Paean to the I Ching
  SiteNav(@showModal="$emit('showModal')")
  ThemeSwitch.tab.abs.b.themes(size="md")
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import LogoBrand from './LogoBrand.vue'
import SiteNav from './SiteNav.vue'
import ThemeSwitch from './ThemeSwitch.vue'

export default defineComponent({
  name: 'AppDrawer',
  components: {
    ThemeSwitch,
    LogoBrand,
    SiteNav,
  },
  emits: ['showModal', 'close'],
  data() {
    return {
      ctrlsRight: false,
    }
  },
})
</script>

<style lang="postcss" scoped>
.sidebar.drawer {
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  align-items: center;
  padding: 2rem 1rem;
  z-index: 0;
  right: auto; /* to counter the abs-0 ute */
  width: var(--drawer-buffer);
  background: var(--ground);
  transition: var(--bea2);
  overflow-y: auto;
  overflow-x: hidden;

  @media (min-width: 36rem) {
    width: var(--drawer-dim);
  }
}
.btn.tab {
  border: 2px solid var(--glow);
  background-color: var(--silk);
  padding: 0 0.25em;
  margin: 0.5em 0;
}

.themes.tab.abs.b {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom: 0;
  margin-bottom: 0;
  padding: 0.25em 1em 0;
}

header {
  flex: 0.5 0 auto;
  margin-bottom: 2rem;
}
</style>

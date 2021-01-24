<template lang="pug">
.drawer.flex.begin
  header.flex.mid
    LogoBrand(direction="bottom" size="large")
      template(#tagline) A Paean to the I Ching
  SiteNav(@showModal="$emit('showModal')")
  ThemeSwitch.tab.fixed.l.vmid.themes(size="md")
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
.drawer {
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
  border: 1px solid var(--glow);
  background-color: var(--silk);
  padding: 0 0.25em;
}

.themes.tab.l {
  padding: 0.5rem 0.75rem;
  border-bottom: 0;
  margin-bottom: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  box-shadow: 0 0 0.25rem var(--glow);
  transform-origin: bottom left;
  transform: rotate(90deg);
  top: 61%;
}

header {
  flex: 0.5 0 auto;
  margin-bottom: 2rem;
}
</style>

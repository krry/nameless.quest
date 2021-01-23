<template lang="pug">
Page.config
  h1.font.x3l Config
  h2 Customize the Oracle
  h3.tagline Hone your ritual to suit your taste
  section.flex.col.string
    h3 Change the Theme
    ThemeSwitch(size="xl")
  ComingSoon
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Page from '../components/Page.vue'
import ComingSoon from '../components/ComingSoon.vue'
import ThemeSwitch from '../components/ThemeSwitch.vue'

export default defineComponent({
  name: 'Config',
  components: {
    Page,
    ComingSoon,
    ThemeSwitch,
  },
})
</script>

<style lang="postcss" scoped>
.config .page {
  background: var(--dust);
}

section {
}
</style>

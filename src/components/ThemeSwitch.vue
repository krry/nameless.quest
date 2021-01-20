<template lang="pug">
button.btn.outline.theme-switch(
  ref="el"
  :class="'font ' + size"
  @click.stop="nextTheme"
  ) {{ $titleCase(theme) + ' '}}
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {activeTheme, useThemes} from '../composables/themes'

export default defineComponent({
  name: 'ThemeSwitch',
  props: {
    size: {
      type: String,
      default: 'md',
    },
  },
  setup() {
    const {nextTheme} = useThemes()
    const theme = activeTheme

    return {
      theme,
      nextTheme,
    }
  },
})
</script>

<style lang="postcss">
.theme-switch::after {
  content: var(--theme-icons);
  /* display: block; */
}

button.btn.theme-switch {
  color: var(--link);
  border-color: var(--glow);
  background: var(--ground);
}

button.btn.theme-switch:hover,
button.btn.theme-switch:focus {
  color: var(--flair);
  border-color: var(--flair);
  background: var(--silk);
}

.icon {
  font-size: inherit;
  display: inline-block;
}
</style>

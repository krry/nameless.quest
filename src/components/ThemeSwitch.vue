<template lang="pug">
button.btn.outline.theme-switch(
  ref="el"
  :class="'font ' + size"
	tabindex="0"
  @click.stop="nextTheme"
  ) {{ $titlize(activeTheme) + ' '}}
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {activeTheme, nextTheme} from '../store/theme'

export default defineComponent({
	name: 'ThemeSwitch',
	props: {
		size: {
			type: String,
			default: 'md',
		},
	},
	setup() {
		return {
			activeTheme,
			nextTheme,
		}
	},
})
</script>

<style lang="postcss">
.theme-switch::after {
	content: var(--theme-icons);
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
	transform: scale(1.05);
}

.icon {
	font-size: inherit;
	display: inline-block;
}
</style>

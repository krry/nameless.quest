<template lang="pug">
.glyph.font(v-if="noturn"
	:class="size, {ib: inline}, {trigram}, color"
	) {{ glyph }}
Turnable(v-else :class="{trigram}")
	.glyph.font(
		:class="size, {ib: inline}, {trigram}, color"
		) {{ glyph }}
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Turnable from './Turnable.vue'

export default defineComponent({
	name: 'LineGlyph',
	components: {Turnable},
	props: {
		glyph: {
			type: String,
			default: '',
		},
		size: {
			type: String,
			default: 'xl',
		},
		color: {
			type: String,
			default: 'flair',
		},
		inline: Boolean,
		trigram: Boolean,
		noturn: Boolean,
	},
})
</script>

<style lang="postcss" scoped>
.glyph {
	margin: 0 auto;
}

.glyph.font {
	margin: 0;
}

.trigram {
	line-height: 1;
	transform-origin: center 60%;
}

.trigram.font {
	margin: unset;
}
</style>

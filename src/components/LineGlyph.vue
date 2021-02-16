<template lang="pug">
.glyph.font(v-if="noturn"
	:class="size, {ib: inline}, {trigram}"
	) {{ glyph }}
Turnable(v-else)
	.glyph.font(
		:class="size, {ib: inline}, {trigram}"
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
		inline: Boolean,
		trigram: Boolean,
		noturn: Boolean,
	},
})
</script>

<style lang="postcss" scoped>
.glyph {
	color: var(--flair);
	margin: 0 auto;
}

.trigram {
	line-height: 1;
	transform-origin: center 60%;
}

.trigram.font {
	margin: unset;
}
</style>

<template lang="pug">
.interp
	.images.left
		//- h3 Images
		pre.image.text.md {{ hex.images }}
	.lines.right.clickable
		//- h3 Changing Lines
		.line(v-for="gram in hex.lines" :key="$symbolize(hex.binary)")
			LineGram(:content="gram" :toss="cached.toss")
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {Hexagram, defHex} from '../schema'
import LineGram from './LineGram.vue'
import {cached} from '../store/cache'

export default defineComponent({
	name: 'HexaInterp',
	components: {
		LineGram,
	},
	props: {
		hex: {
			type: Object as PropType<Hexagram>,
			default: defHex,
		},
		liney: Boolean,
	},
	setup() {
		return {
			cached,
		}
	},
})
</script>

<style lang="postcss" scoped>
.interp {
	padding: 1rem 0 2rem;
	font-family: var(--text);
	font-size: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
}

pre.image {
	line-height: var(--leading);
}
</style>

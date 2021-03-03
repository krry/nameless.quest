<template lang="pug">
.bagua.abs.abs-0.flex.col
	transition-group(name="slip")
		.gua.flex.string(
			v-if="baguad"
			v-for="[key, val] in Object.entries(pair)"
			:key="$symbolize(pair[key])"
			:class="key"
			)
			LineGlyph.tripad(
				trigram
				:glyph="trigrams[val].trigram"
				size="xxl"
				color="ground"
				)
			.flex.wrap.string.spread
				.flex.string
					.char.font.lg.mrg0 {{trigrams[val].name.zh}}&nbsp;
					.pinyin {{trigrams[val].name.pn}}
				.translation.pad.pad-50.x {{trigrams[val].name.en}}
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import HanziChar from '../components/HanziChar.vue'
import LineGlyph from '../components/LineGlyph.vue'
import trigramData from '../data/trigrams.json'

interface TrigramPair {
	above: number
	below: number
}

const defPair: TrigramPair = {
	above: 0,
	below: 0,
}

export default defineComponent({
	name: 'BaguaDoors',
	components: {
		HanziChar,
		LineGlyph,
	},
	props: {
		pair: {
			type: Object as PropType<TrigramPair>,
			default: defPair,
		},
		baguad: Boolean,
	},
	setup() {
		return {
			trigrams: trigramData,
		}
	},
})
</script>

<style lang="postcss" scoped>
.bagua {
	bottom: 0;
	color: white;
	height: 100%;
	left: 0;
	overflow: hidden;
	pointer-events: none;
	position: absolute;
	right: 0;
	top: 0;
	width: 100%;
	z-index: 2;
}

.gua {
	flex: 1 0 auto;
	background: var(--ink);
	color: var(--ground);
	pointer-events: auto;
}

.gua:first-child {
	border-bottom: 1px solid var(--pencil);
}

.gua:last-child {
	border-top: 1px solid var(--pencil);
}

.slip-enter-active,
.slip-leave-active {
	transform: translateY(0);
	opacity: 1;
}

.slip-enter-active {
	transition: var(--beat) var(--ease-out-quad);
}

.slip-leave-active {
	transition: var(--beat) var(--ease-in-quad);
}

.slip-enter-to,
.slip-leave-from {
	transform: translateY(0);
	opacity: 1;
}

.slip-enter-from,
.slip-leave-to {
	transform: translateY(max(13vh, 7.5rem));
	opacity: 0;
}

.slip-enter-from.above,
.slip-leave-to.above {
	transform: translateY(min(-13vh, -7.5rem));
}

.glyph,
.hanzi {
	color: var(--ground);
}

.tripad {
	padding-left: 0.5em;
	padding-right: 0.5em;
}
</style>

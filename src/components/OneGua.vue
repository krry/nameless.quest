<template lang="pug">
.gua
	LineGlyph(
		trigram
		:glyph="trigrams[gua].trigram"
		:size="size"
		)
	HanziChar(
		:char="trigrams[gua].name.zh"  
		:pinyin="trigrams[gua].name.pn"
		:translation="$titlize(trigrams[gua].name.en)"
		place="side"
		:size="charSize"
		reveal
		)
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {cfg, tog} from '../store'
import HanziChar from '../components/HanziChar.vue'
import LineGlyph from '../components/LineGlyph.vue'
import trigramData from '../data/trigrams.json'

export default defineComponent({
	name: 'OneGua',
	components: {
		HanziChar,
		LineGlyph,
	},
	props: {
		gua: {
			type: Number,
			default: 0,
		},
		size: {
			type: String,
			default: 'xl',
		},
		charSize: {
			type: String,
			default: 'md',
		},
		texty: Boolean,
	},
	setup() {
		const trigrams = trigramData

		return {
			tog,
			cfg,
			trigrams,
		}
	},
})
</script>

<style lang="postcss" scoped>
.gua {
	display: flex;
	flex: 1 0 auto;
	/* flex-direction: column; */
	justify-content: space-evenly;
	align-items: center;
}

.triglyph {
	font-size: 2.5rem;
	line-height: 1;
	transform-origin: center center;
	transition: transform var(--beat) var(--ease-out-quad);
}
</style>

<template lang="pug">
.gua
  .col
    LineGlyph(
			trigram
			:glyph="trigrams[gua].trigram"
			:size="size"
			)
  .col
    span.mand-name.gua-name {{ trigrams[gua].name.zh + " "}}
    span.pnyn-name.gua-name  {{ trigrams[gua].name.pn }}
    .eng-name.gua-name {{ trigrams[gua].name.en }}
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {cfg, tog} from '../store'
import LineGlyph from '../components/LineGlyph.vue'
import trigramData from '../data/trigrams.json'

export default defineComponent({
	name: 'OneGua',
	components: {
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
		above: Boolean,
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
	flex-direction: column;
	justify-content: space-evenly;
}

.triglyph {
	font-size: 2.5rem;
	line-height: 1;
	transform-origin: center center;
	transition: transform var(--beat) var(--ease-out-quad);
}

.gua-name {
	@supports (font-variation-settings: normal) {
		font-family: 'QuicksandVariable';
		font-variation-settings: 'wght' 555;
	}
}
</style>
<style lang="postcss">
.glyphs .triglyph {
	font-size: 3rem;

	@media (min-width: 36rem) {
		font-size: 4rem;
	}
}
</style>

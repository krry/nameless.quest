<template lang="pug">
.above
	h1.mrgb0
		| Welcome to the Oracle
		br
		small aka 
			HanziChar(
				char="易"
				pinyin="Yì"
				size="lg"
				place="under"
				reveal
				)
			HanziChar(
				char="經"
				pinyin="Jīng"
				size="lg"
				place="under"
				reveal
				)

	section.dyn.flex.col
		.field.dyn
			textarea#query.query(
				v-autoresize
				v-model="cached.query"
				placeholder="What…to…do?"
				autofocus
				rows="1"
				pattern="\?$"
				@keydown.ctrl.enter="askTheOracle"
				)
			transition(name="slide-fade" appear)
				.lbl.above.intro(for="query" v-if="cached.query.length < 9")
					| What does your heart wonder?
			transition(name="slide-fade" appear)
				.lbl.below.outro(for="query" v-if="cached.query.length < 9")
					| What is the burning question?
			button.btn.lg.action(type="button" @click="askTheOracle")
				IconBase(size="36" viewBox="0 0 1000 1125")
					IconCrystalBall
				|  Ask the Oracle
			transition(name="slide-fade" appear)
				label.validation(
					v-if="invalidQuery"
					) Is that a question?
			transition(name="slide-fade" appear)
				label.feedback(v-if="!cfg.navvy")
					kbd(title="ctrl+enter") ⌃⏎
					span  to send
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue'
import {cached, cache} from '../store/cache'
import {cfg} from '../store'
import Page from './Page.vue'
import IconBase from '../icons/IconBase.vue'
import HanziChar from './HanziChar.vue'
import IconCrystalBall from '../icons/IconCrystalBall.vue'

export default defineComponent({
	name: 'OracleQuery',
	components: {
		Page,
		HanziChar,
		IconBase,
		IconCrystalBall,
	},
	setup() {
		const rx = reactive({
			invalidQuery: false,
		})

		function askTheOracle() {
			if (cached.query.length > 0 && cached.query.substr(-2).includes('?')) {
				cache('query', cached.query)
				cache('step', 'cast')
			} else {
				rx.invalidQuery = true
				console.warn('Non-question detected!')
			}
		}

		return {
			cfg,
			cached,
			askTheOracle,
			...toRefs(rx),
		}
	},
})
</script>

<style lang="postcss" scoped>
.validation {
	order: 3;
	color: var(--brand);
	margin: -0.75em 0 0;
	@supports (font-variation-settings: normal) {
		font-family: 'QuicksandVariable';
		font-variation-settings: 'wght' 555;
	}
}

.feedback {
	order: 6;
}

.action {
	order: 5;
}

.validation {
	order: 4;
}

.outro {
	order: 3;
}

.query {
	order: 2;
}

.intro {
	order: 1;
}

.brand,
.field {
	flex: 1 0 auto;
}

.mrgb0 {
	margin-bottom: 0;
}

.lbl {
	margin: 0.5rem 0;
	opacity: 0.75;
	@supports (font-variation-settings: normal) {
		font-family: 'QuicksandVariable';
		font-variation-settings: 'wght' 555;
	}
}

.field textarea {
	margin-bottom: 0;
}
</style>

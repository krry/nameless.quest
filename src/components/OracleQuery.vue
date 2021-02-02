<template lang="pug">
section.query.dyn.flex.col
	h1
		| Welcome to the Oracle
		br
		small aka the I Ching
		br
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
	.field.dyn
		textarea#query(
			v-autoresize
			v-model="cached.query"
			placeholder="How can I help?"
			autofocus
			rows="1"
			pattern="\?$"
			@keydown.ctrl.enter="askTheOracle"
			)
		label.field-label(for="query")
			| Here and now, what does your heart wonder?
			br
			| What is the burning question?
		button.btn.lg(type="button" @click="askTheOracle")
			IconBase(size="36" viewBox="0 0 1000 1125")
				IconCrystalBall
			|  Ask the Oracle
		transition(name="slide-fade" appear)
			label.validation(
				v-if="invalidQuery"
				) Is that a question?
		transition(name="slide-fade" appear)
			label.message(v-if="!cfg.navvy")
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

.message {
	order: 5;
}

.field .btn {
	order: 4;
}

.brand,
.field {
	flex: 1 0 auto;
}
</style>

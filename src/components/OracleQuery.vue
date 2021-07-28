<template lang="pug">
.above
	h1.mrgb0.rel.clickable(
		@click="curious = true"
	)
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
		transition.under(name="popup")
			aside.exposition.abs.b.r.l.pad.pad2.y.x.font.sm.bevel(
				v-if="curious"
			)
				.close.tr(@click.stop="curious = false") ⓧ
				h3
					| The Yìjīng is perhaps the longest
					br
					| continuous wisdom tradition of humanity.
				p
					| Each day we may approach the Yìjīng
					br
					| (aka the I Ching, or the Classic Book of Change)
					br
					| to give ourselves a moment of pause
					br
					| to peer down deep inside,
					br
					| into the well of being
					br
					| that silent pool of peace and certainty
					br
					| seated at the root of heart center.
	section.dyn.flex.col
		h2 What is your question for the Oracle today?
		.field.dyn
			textarea#query.query(
				v-autoresize
				v-model="cached.query"
				placeholder="What…to…do?"
				autofocus
				rows="1"
				pattern="\?$"
				@keydown.ctrl.enter="askTheOracle"
				:class="{invalid: invalidQuery}"
				)
			transition(name="slide-fade" appear)
				.lbl.font.md.phat.above.intro.muted(for="query" v-if="cached.query.length < 9")
					| What does your heart wonder?
			transition(name="slide-fade" appear)
				.lbl.font.md.phat.below.outro.muted(for="query" v-if="cached.query.length < 9")
					| What is the burning question?
			button.btn.lg.action(type="button" @click="askTheOracle")
				IconBase(size="36" viewBox="0 0 1000 1125")
					IconCrystalBall
				|  Ask the Oracle
			transition(name="slide-fade" appear)
				label.validation.mrg.mrg1.t(
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
			curious: false,
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
	order: 4;
	color: var(--brand);
	--font-casual: 0.75;
	--font-mono: 0;
	--font-weight: 555;
}

.feedback {
	order: 6;
}

.action {
	order: 5;
}

.outro {
	order: 3;
}

.query {
	max-width: 40ch;
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
	--font-casual: 0.75;
	--font-mono: 0;
	--font-weight: 555;
}

.field textarea.invalid {
	margin-bottom: 0;
}

.exposition {
	background: var(--paper);
	border: 0px solid var(--glow);
	box-shadow: var(--focus-glow);
}
</style>

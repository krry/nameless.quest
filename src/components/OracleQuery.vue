<template lang="pug">
.above
	h1.mrgb0.rel.clickable(
		@click="curious = true"
	)
		| Welcome to the Oracle
		transition.under(name="popup")
			aside.exposition.abs.r.l.pad.pads.y.x.font.sm.bevel(
				v-if="curious"
			)
				.close.abs.t.r(@click.stop="curious = false") ⓧ
				h3
					span.big The Yìjīng
					br
					small aka
						HanziChar(
							char="易"
							pinyin="Yì"
							size="lg"
							place="over"
							reveal
							)
						HanziChar(
							char="經"
							pinyin="Jīng"
							size="lg"
							place="over"
							reveal
							)
					br
					| reaches back through known time
					br
					| to retrieve our rememberance of now
					br
					| from the Source we share.
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
		h2.oracle-question What is your question?
		.field.dyn
			textarea#query.query(
				v-autoresize
				v-model="cached.query"
				placeholder='"How do I choose?"'
				:rows="1"
				pattern="\?$"
				@keydown.meta.enter.exact="askTheOracle"
				@keydown.ctrl.enter.exact="askTheOracle"
				@keyup.enter.exact.prevent.stop.capture="askTheOracle"
				:class="{invalid: invalidQuery}"
				@focus="queryFocused = true"
				)
			transition(name="slide-fade" appear v-if="queryFocused")
				.lbl.font.sm.phat.below.intro.muted(for="query" v-if="cached.query.length < 9")
					| What does your heart wonder?
			//- transition(name="slide-fade" appear v-if="queryFocused")
			//- 	.lbl.font.sm.phat.above.outro.muted(for="query" v-if="cached.query.length < 9")
			//- 		| What does your heart wonder?
			transition(name="slide-fade" appear v-if="queryFocused")
				button.btn.action.right(type="button" @click="askTheOracle")
					IconBase(size="36" viewBox="0 0 1000 1125")
						IconCrystalBall
					|  Ask the Oracle
			transition(name="slide-fade" appear)
				label.validation.mrg.mrg1.t(
					v-if="invalidQuery"
					) Is that a question?
			transition(name="slide-fade" appear v-if="!cfg.navvy && queryFocused")
				label.feedback.right
					kbd(title="ctrl+enter") ⌃⏎
					span  to send
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { cached, cache } from '../store/cache';
import { cfg } from '../store';
import Page from './Page.vue';
import IconBase from '../icons/IconBase.vue';
import HanziChar from './HanziChar.vue';
import IconCrystalBall from '../icons/IconCrystalBall.vue';

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
			queryFocused: false,
		});

		function askTheOracle() {
			if (cached.query.length > 0 && cached.query.substr(-2).includes('?')) {
				cache('query', cached.query);
				cache('step', 'cast');
				rx.queryFocused = true;
			} else {
				rx.invalidQuery = true;
				// TODO: focus the query again
				console.warn('Non-question detected!');
			}
		}

		return {
			cfg,
			cached,
			askTheOracle,
			...toRefs(rx),
		};
	},
});
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
	/* TODO: make this font bigger with the fancy placeholder */
}

.intro {
	order: 1;
}

.lbl.intro {
	margin-top: -1em;
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
	box-shadow: var(--inglow);
	overflow-y: auto;
	z-index: 15;
	margin: 1rem auto;
}

.big {
	font-size: 1.5em;
}
</style>

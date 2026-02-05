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
                h3.mrg.mrg-25.b
                    span.big The Yìjīng
                    small &nbsp;aka&nbsp;
                        HanziChar(
                            char="易"
                            pinyin="Yì"
                            size="md"
                            place="over"
                            reveal
                            )
                        HanziChar(
                            char="經"
                            pinyin="Jīng"
                            size="md"
                            place="over"
                            reveal
                            )
                pre.text.thin
                    | reaches back through known time to retrieve our rememberance of now from the Source we share. Each day we may approach the Yìjīng (aka the I Ching, or the Classic Book of Change) to give ourselves a moment of pause to peer down deep inside, into the well of being that silent pool of peace and certainty seated at the root of heart center.
    section.dyn.flex.col
        h2.oracle-question.mrg.mrg-25.b What do you wonder?
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
                )
            transition(name="slide-fade" appear)
                button.btn.action.right.text.thicc(type="button" @click="askTheOracle" :disabled="!cached.query.trim()")
                    IconBase(size="36" viewBox="0 0 1000 1125")
                        IconCrystalBall
                    |  Ask Yī
            transition(name="slide-fade" appear)
                label.validation.mrg.mrg1.t(
                    v-if="invalidQuery"
                    ) Is that a question?
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
		});

		function askTheOracle() {
			if (cached.query.length > 0 && cached.query.substr(-2).includes('?')) {
				cache('query', cached.query);
				cache('step', 'cast');
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

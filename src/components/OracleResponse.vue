<template lang="pug">
#oracle_response.response.flex.wrap.mid(v-if="hexs")
	blockquote
		h2 {{cached.query.trim()}}
	h1.whole The Oracle Responds
	h2 {{ cached.toss }}
	.lines.whole.font.alcenter.font
		IconBase.line(
			v-for="char in [...cached.toss]"
			:key="symbolize(char).toString()"
			height="36"
			width="20"
			size="48"
			)
			component( :is="lineIconByNumber(char)" )
	section.col.half.dyn.align-start.mrg.mrg1.x(
		v-for="(hex, index) in hexs"
		:key="symbolize(hex.binary).toString()"
		)
		h3
			| {{ index === 0 ? "𐡷 Being 𐡸" : "𐡸 Becoming 𐡷" }}
			hr.divider
			router-link.btn.outline(:to="'/changes/'+hex.kingwen")
				span {{ cfg.wenny ? hex.kingwen : hex.octal }}
				span {{ " " + hex.names.english }}
		.flex.mid
			.col.dyn.more.flex.mid.mrg.mrg2.r
				h3.font.x2l
					HanziChar(
						v-for="(char, i) in hex.names.chinese.split('')"
						:key="symbolize(char).toString()"
						:char="char"
						:pinyin="hex.names.pinyin.split(' ')[i]"
						size="lg"
						place="side"
						reveal)
			.col.dyn.less.flex.mid.mrg.mrg1.r
				LineGlyph(
					:glyph="hex.hexagram"
					size="x5l"
					)
	.whole.flex.string
		button.btn.naked(
			type="button"
			title="Start Over"
			@click="clearBoth"
			) ♽ Start Over
		button.btn(
			v-if="!cfg.saved"
			@click="saveToJournal"
			) Save to your Journal
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import IconBase from '../icons/IconBase.vue';
import IconSix from '../icons/IconSix.vue';
import IconSeven from '../icons/IconSeven.vue';
import IconEight from '../icons/IconEight.vue';
import IconNine from '../icons/IconNine.vue';
import LineGlyph from './LineGlyph.vue';
import HanziChar from './HanziChar.vue';
import { cfg } from '../store';
import { cached, uncache } from '../store/cache';
import { addRoll, cachedRoll } from '../store/rolls';
import { activeLots, setLots } from '../store/lots';
import { parseTossToBinary } from '../utils/tosses';
import { useHexagrams } from '../composables/hexagrams';
import { symbolize, lineIconByNumber } from '../plugins/utils';
import VueScrollTo from 'vue-scrollto';

export default defineComponent({
	name: 'OracleResponse',
	components: {
		IconBase,
		IconSix,
		IconSeven,
		IconEight,
		IconNine,
		LineGlyph,
		HanziChar,
	},
	setup() {
		setLots(parseTossToBinary(cached.toss));
		const router = useRouter();
		const { getHexagramByBin } = useHexagrams();
		const hexs = computed(() => activeLots.value.map((l: string) => getHexagramByBin(l)));
		// console.log('hexs', hexs.value)

		function clearBoth(event?: MouseEvent, confirmed = false) {
			const clearAffirmed =
				confirmed ||
				confirm('Are you sure you want to start over? This will clear the current entry.');

			if (clearAffirmed) {
				cfg.saved = false;
				uncache('query');
				uncache('toss');
				uncache('step');
			}
		}

		if (cached.uid) {
			cacheRoll();
			cfg.saved = true;
		}

		function lilMoments(moment: Date) {
			return {
				seconds: moment.getTime() / 1000,
				nanoseconds: moment.getTime(),
			};
		}

		function cacheRoll() {
			const now = new Date();
			if (cached.uid) {
				addRoll({
					moment: lilMoments(now),
					query: cached.query,
					toss: cached.toss,
					uid: cached.uid,
				});
				cachedRoll.value = null;
			} else {
				cachedRoll.value = {
					moment: lilMoments(now),
					query: cached.query,
					toss: cached.toss,
					uid: '',
				};
			}
		}

		function saveToJournal() {
			cacheRoll();
			router.push('/journal');
		}

		onMounted(() => {
			if (cached.uid) {
				cfg.saved = true;
			}
			VueScrollTo.scrollTo('#oracle_response', 500);
		});

		return {
			cfg,
			hexs,
			cached,
			clearBoth,
			symbolize,
			saveToJournal,
			lineIconByNumber,
		};
	},
});
</script>

<style lang="postcss" scoped>
.response {
	border-color: var(--flair);
}

.response blockquote h2 {
	margin-bottom: 0;
}

h3 {
	margin-bottom: 0.25em;
}
</style>

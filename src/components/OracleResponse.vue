<template lang="pug">
#oracle_response.response.flex.wrap.mid(v-if="hexs")
	blockquote.mrg.mrg1.b
		h2 {{cached.query.trim()}}
	.flex.around.mid.wrap.whole
		.font.sm.alcenter.mrg.mrg-50.b Yì says…
		.lines.whole.font.alcenter.font
			IconBase.line(
				v-for="char in [...cached.toss]"
				:key="symbolize(char).toString()"
				height="36"
				width="20"
				size="48"
				)
				component( :is="lineIconByNumber(char)" )
		.font.sm.alcenter.mrg.mrg-50.t
			| {{ cached.toss }}
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
import { computed, defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import VueScrollTo from 'vue-scrollto';
import { useHexagrams } from '../composables/hexagrams';
import IconBase from '../icons/IconBase.vue';
import IconEight from '../icons/IconEight.vue';
import IconNine from '../icons/IconNine.vue';
import IconSeven from '../icons/IconSeven.vue';
import IconSix from '../icons/IconSix.vue';
import { cfg } from '../store';
import { cached, uncache } from '../store/cache';
import { activeLots, setLots } from '../store/lots';
import { addRoll, cachedRoll } from '../store/rolls';
import { hasUserProfile } from '../store/userProfile';
import { lineIconByNumber, symbolize } from '../utils';
import { parseTossToBinary } from '../utils/tosses';
import HanziChar from './HanziChar.vue';
import LineGlyph from './LineGlyph.vue';

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

		if (hasUserProfile()) {
			cacheRoll();
			cfg.saved = true;
		}

		function cacheRoll() {
			const now = new Date();
			if (hasUserProfile()) {
				addRoll({
					moment: now.toISOString(),
					query: cached.query,
					toss: cached.toss,
				});
				cachedRoll.value = null;
			} else {
				cachedRoll.value = {
					id: '',
					user_id: '',
					moment: now.toISOString(),
					query: cached.query,
					toss: cached.toss,
				};
			}
		}

		function saveToJournal() {
			cacheRoll();
			router.push('/journal');
		}

		onMounted(() => {
			if (hasUserProfile()) {
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

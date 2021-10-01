<template lang="pug">
.response.flex.wrap.mid(v-if="hexs")
	blockquote
		h2 {{cached.query.trim()}}
	h1.whole The Oracle Responds
	h2 {{ cached.toss }}
	.lines.whole.font.alcenter.font
		IconBase.line(
			v-for="char in cached.toss"
			:key="$symbolize(char)"
			height="36"
			width="20"
			size="48"
			)
			component( :is="`Icon${char}`" )
	section.col.half.dyn.align-start.mrg.mrg1.x(
		v-for="(hex, index) in hexs"
		:key="$symbolize(hex.binary)"
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
						:key="$symbolize(char)"
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
import {defineComponent, computed} from 'vue'
import {useRouter} from 'vue-router'
import IconBase from '../icons/IconBase.vue'
import Icon6 from '../icons/Icon6.vue'
import Icon7 from '../icons/Icon7.vue'
import Icon8 from '../icons/Icon8.vue'
import Icon9 from '../icons/Icon9.vue'
import LineGlyph from './LineGlyph.vue'
import HanziChar from './HanziChar.vue'
import {cfg} from '../store'
import {cached, uncache} from '../store/cache'
import {addRoll, cachedRoll} from '../store/rolls'
import {activeLots, setLots} from '../store/lots'
import {parseTossToBinary} from '../utils/tosses'
import {useHexagrams} from '../composables/hexagrams'

export default defineComponent({
	name: 'OracleResponse',
	components: {
		IconBase,
		Icon6,
		Icon7,
		Icon8,
		Icon9,
		LineGlyph,
		HanziChar,
	},
	setup() {
		setLots(parseTossToBinary(cached.toss))
		const router = useRouter()
		const {getHexagramByBin} = useHexagrams()
		const hexs = computed(() => activeLots.value.map((l: string) => getHexagramByBin(l)))
		// console.log('hexs', hexs.value)

		function clearBoth(confirmed = false) {
			const clearAffirmed =
				confirmed ?? confirm("Are you sure you want to start over? This will clear today's entry.")
			if (clearAffirmed) {
				cfg.saved = false
				uncache('query')
				uncache('toss')
				uncache('step')
			}
		}
		if (cached.uid) {
			cacheRoll()
			cfg.saved = true
		}
		function cacheRoll() {
			if (cached.uid) {
				addRoll({
					moment: new Date(),
					query: cached.query,
					toss: cached.toss,
					uid: cached.uid,
				})
				cachedRoll.value = null
			} else {
				cachedRoll.value = {
					moment: new Date(),
					query: cached.query,
					toss: cached.toss,
					uid: '',
				}
			}
		}

		function saveToJournal() {
			cacheRoll()
			router.push('/journal')
		}

		return {
			cached,
			clearBoth,
			cfg,
			hexs,
			saveToJournal,
		}
	},
})
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

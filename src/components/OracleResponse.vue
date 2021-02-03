<template lang="pug">
.response.flex.wrap(v-if="hexs")
	h1.whole The Oracle Responds
	section.col.half.mrg.x(
		v-for="(hex, index) in hexs"
		:key="$symbolize(hex.binary)"
		)
		h3
			| {{ index === 0 ? "𐡷 Being 𐡸" : "𐡸 Becoming 𐡷" }}
			hr.divider
			router-link.btn.outline(:to="'/change/'+hex.kingwen")
				span {{ cfg.wenny ? hex.kingwen : hex.octal }}
				span {{ " " + hex.names.english }}
		.flex.mid
			.col.dyn.more
				h3.font.x2l
					HanziChar(
						v-for="(char, i) in hex.names.chinese.split('')"
						:key="$symbolize(char)"
						:char="char"
						:pinyin="hex.names.pinyin.split(' ')[i]"
						size="lg"
						place="side"
						reveal)
			.col.dyn.less
				HexaGlyph(
					:hex="hex.hexagram"
					size="x5l"
					)
	.whole.flex.string
		button.btn.naked(
			type="button"
			title="Start Over"
			@click="$emit('clear')"
			) ♽ Start Over
		button.btn(@click="saveToJournal") Save to Journal
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue'
import {useRouter} from 'vue-router'
import IconBase from '../icons/IconBase.vue'
import HexaGlyph from './HexaGlyph.vue'
import HanziChar from './HanziChar.vue'
import {cfg} from '../store'
import {cached} from '../store/cache'
import {saveRoll} from '../store/rolls'
import {activeLots, setLots} from '../store/lots'
import {parseTossToBinary} from '../utils/tosses'
import {useHexagrams} from '../composables/hexagrams'

export default defineComponent({
	name: 'OracleResponse',
	components: {
		IconBase,
		HexaGlyph,
		HanziChar,
	},
	emits: ['clear'],
	setup() {
		setLots(parseTossToBinary(cached.toss))
		const router = useRouter()
		const {getHexagramByBin} = useHexagrams()
		const hexs = computed(() => activeLots.value.map((l: string) => getHexagramByBin(l)))
		// console.log('hexs', hexs.value)

		function saveToJournal() {
			if (cached.uid) {
				saveRoll({
					moment: new Date(),
					query: cached.query,
					toss: cached.toss,
					uid: cached.uid,
				})
			} else {
				localStorage.setItem(
					'newRoll',
					JSON.stringify({
						moment: new Date(),
						query: cached.query,
						toss: cached.toss,
					}),
				)
			}
			router.push('/journal')
		}

		return {
			cached,
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

h3 {
	margin-bottom: 0.25em;
}
</style>

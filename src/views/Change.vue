<template lang="pug">
Page.font.center(
	ref="desk"
	@keydown.left.prevent.exact="navTo(prev)"
	@keydown.right.prevent.exact="navTo(next)"
	)
	router-link.page-nav.btn.naked.prev.clickable.abs.t.l(:to="prev") 𐡷 {{ prev }}
	transition.under(name="slide-fade" appear)
		.hint.vapor.abs.t.r.l.alcenter.font.sm(v-if="!cfg.navvy") ⬅️ Did you try 😁 arrow keys? ➡️
	router-link.page-nav.btn.naked.next.clickable.abs.t.r(:to="next") {{ next }} 𐡸
	.mark(v-if="lots")
		.btn.naked.md.ib.skinny.static(v-if="lots[0] === hex.binary") Being 
		router-link.font.md(
			v-if="lots[0] === hex.binary"
			:to="{name: 'oracle'}")
			span(v-if="lots[1]") ⇢
			span(v-if="!lots[1]") ꜛ
		router-link.btn.naked.md.skinny.ib(
			v-if="lots[0] === hex.binary && lots[1]"
			:to="'/changes/'+getWenByBin(lots[1])") Becoming
		router-link.btn.naked.md.skinny.ib(
			v-if="lots[1] === hex.binary"
			:to="'/changes/'+getWenByBin(lots[0])") Being
		router-link.font.md(
			v-if="lots[1] === hex.binary"
			:to="{name: 'oracle'}") ⇠
		.btn.naked.md.ib.skinny.static(v-if="lots[1] === hex.binary") Becoming
	h1.font.x2l.flex.mid.mrg0.t
		Spinnable
			LineGlyph(:glyph="hex.hexagram" noturn inline size="x8l")
		.flex.col.mid
			HanziChar(
				v-for="(char, index) in hex.names.chinese"
				:key="$symbolize(char)"
				:char="char"
				:pinyin="pinyin[index]"
				place="side"
				size="xl"
				reveal
				)
	h1 {{ hex.names.english }}
	section.numbers
		.flex.space.string
			.datum.binary
				dd {{ hex.binary.slice(2) }}
				dt Binary
			.datum.octal
				dd {{ hex.octal }}
				dt Octal
			.datum.octal
				dd {{ parseInt(hex.binary.slice(2), 2) }}
				dt Decimal
			.datum.kingwen
				dd {{ hex.kingwen }}
				dt King Wen
	.flex.mid.col.string
		pre.judgment.text.md(v-html="adoptOrphans(hex.judgment)")
	.flex.mid.col.string
		.flex.space
			.flex.string.col.dyn
				.datum.trigram.flex.string.laze.btw(
					v-for="(tri, index) in trigrams"
					:key="$symbolize(tri.name.en)"
					)
					.flex.col.mid.more
						dt The {{ $titlize(tri.name.en) }}
						dt {{ index === 0 ? "Above" : "Below" }}
					.flex.col.mid.less
						HanziChar(
							:char="tri.name.zh"
							:pinyin="tri.name.pn"
							size="lg"
							place="over"
							reveal
							)
					.flex.col.mid.less
						LineGlyph.second(
							trigram
							:glyph="tri.trigram"
							size="x5l")
			LineGlyph.datum.middle.dyn(
				:glyph="hex.hexagram"
				size="x6l")
		pre.image.text.md(v-html="adoptOrphans(hex.images)")
	.flex.mid.col.string
		h2.btn.naked.xl.clickable(@click="tog('liney')") {{ cfg.liney ? 'All Lines' : 'Changing Lines'}}
		section(
			v-for="line in hex.lines"
			:key="$symbolize(line.position)"
			v-show="lineIsChanging(line.position)"
			)
			Turnable(ortho)
				IconBase(size="60" iconColor="var(--flair)")
					component(:is="'Icon' + getChangingLine(line.position).icon")
			h4.font.lg Line {{line.position + ': ' + getChangingLine(line.position).desc }}
			.flex.mid
				.icon.font.x3l   
				IconBase(size="36")
					component(:is="'Icon' + getChangingLine(line.position).was")
				.icon.font.x3l ⇢
				IconBase(size="36")
					component(:is="'Icon' + getChangingLine(line.position).is")
			h5.text.md.em(v-if="line.ruler") The {{ $titlize(line.ruler) }} Ruler
			pre.text.md.line {{line.meaning}}
</template>

<script lang="ts">
import {defineComponent, ref, toRefs, reactive, watchEffect, onMounted, computed} from 'vue'
import {cfg, set, tog} from '../store'
import {cached} from '../store/cache'
import {parseTossToBinary} from '../utils/tosses'
import {useHexagrams} from '../composables/hexagrams'
import {useTrigrams} from '../composables/trigrams'
import Page from '../components/Page.vue'
import HanziChar from '../components/HanziChar.vue'
import LineGlyph from '../components/LineGlyph.vue'
import Spinnable from '../components/Spinnable.vue'
import Turnable from '../components/Turnable.vue'
import LineGram from '../components/LineGram.vue'
import IconBase from '../icons/IconBase.vue'
import Icon6 from '../icons/Icon6.vue'
import Icon7 from '../icons/Icon7.vue'
import Icon8 from '../icons/Icon8.vue'
import Icon9 from '../icons/Icon9.vue'

function getPrevHex(id: string): string {
	if (id === '1') {
		return '64'
	} else {
		return (parseInt(id) - 1).toString()
	}
}

function getNextHex(id: string): string {
	if (id === '64') {
		return '1'
	} else {
		return (parseInt(id) + 1).toString()
	}
}

export default defineComponent({
	name: 'Change',
	components: {
		Page,
		LineGram,
		LineGlyph,
		HanziChar,
		IconBase,
		Turnable,
		Spinnable,
		Icon6,
		Icon7,
		Icon8,
		Icon9,
	},
	props: {
		id: {
			type: String,
			default: '00',
		},
	},
	setup(props) {
		const {getHexagramByWen, getWenByBin} = useHexagrams()
		const {getTrigram} = useTrigrams()

		const hex = ref(getHexagramByWen(props.id))

		const rx = reactive({
			hex,
			desk: ref(),
			lots: parseTossToBinary(cached.toss),
			mousePresent: false,
			touchPresent: false,
			prev: getPrevHex(props.id),
			next: getNextHex(props.id),
			pinyin: computed(() => hex.value.names.pinyin.split(' ')),
		})

		function lineIsChanging(lineNo: number) {
			const lineCode = cached.toss.split('')[lineNo - 1]
			const tossedThisLot = rx.lots[0] === rx.hex.binary
			const activeLines = tossedThisLot && (lineCode === '6' || lineCode === '9')
			return activeLines || !cached.toss || cfg.liney
		}

		const trigrams = computed(() => {
			return Object.values(rx.hex.trigramPair).map((t) => getTrigram(t))
		})

		watchEffect(() => {
			rx.prev = getPrevHex(props.id)
			rx.next = getNextHex(props.id)
		})

		onMounted(() => {
			document.addEventListener(
				'mousemove',
				function onMouseMove() {
					// see if there's a mouse in the house
					document.removeEventListener('mousemove', onMouseMove, false)
					rx.mousePresent = true
				},
				false,
			)

			document.addEventListener('touchmove', function onTouchMove() {
				// see if anyone's in touch
				document.removeEventListener('touchmove', onTouchMove, false)
				rx.touchPresent = true
				set('navvy', true)
			})

			// console.log('getWenByBin(lots[0])', getWenByBin(rx.lots[0]))
			// console.log('getWenByBin(lots[1])', getWenByBin(rx.lots[1]))
			// const gestureZone = rx.desk
			// console.log('gesureZone', gestureZone)
			// if (!gestureZone) return
			// gestureZone.addEventListener('touchstart', handleSwipeStart, false)
			// gestureZone.addEventListener('touchend', handleSwipeEnd, false)
		})

		return {
			cfg,
			tog,
			cached,
			trigrams,
			getWenByBin,
			lineIsChanging,
			getHexagramByWen,
			...toRefs(rx),
		}
	},
	watch: {
		$route(to) {
			this.hex = this.getHexagramByWen(to.params.id)
		},
	},
	mounted() {
		window.addEventListener('keydown', this.handleArrowNav, true)
	},
	unmounted() {
		window.removeEventListener('keydown', this.handleArrowNav, true)
	},
	methods: {
		getChangingLine(pos: number) {
			return this.hex.binary.slice(2).split('').reverse()[pos - 1] === '0'
				? {icon: '6', was: '8', is: '7', desc: 'Yin Firming'}
				: {icon: '9', was: '7', is: '8', desc: 'Yang Opening'}
		},
		navTo(route: string) {
			if (cfg.justCast) return
			set('navvy', true)
			this.$router.push(route)
		},
		handleArrowNav(e: KeyboardEvent) {
			if (e.key === 'ArrowLeft') {
				e.preventDefault()
				this.$router.push(this.prev)
				set('navvy', true)
			}
			if (e.key === 'ArrowRight') {
				e.preventDefault()
				this.$router.push(this.next)
				set('navvy', true)
			}
		},
		adoptOrphans(text: string): string {
			// if there are multiple words in the string
			// console.log('adopting orphans', text)
			if (text.split(' ').length > 1) {
				const words = text.split(' ')
				const lastWord = words.pop()
				// replace the space before the last word with &nbsp;
				return words.join(' ') + '&nbsp;' + lastWord
			} else return text
		},
	},
})
</script>

<style lang="postcss" scoped>
.change {
	display: flex;
	flex-flow: row wrap;
}

dt {
	@supports (font-variation-settings: normal) {
		font-family: 'QuicksandVariable';
		font-variation-settings: 'wght' 555;
	}
	font-size: 0.925em;
	margin-top: 0.125em;
}

dd {
	margin-left: 0;
	font-size: 1.25em;
}

dd + dd {
	margin-top: 0;
}

section {
	@media (min-width: 36rem) {
		padding-left: 2rem;
		padding-right: 2rem;
	}
	@media (min-height: 36rem) {
		padding-top: 2rem;
		padding-bottom: 2rem;
	}
}

h3 {
	margin-top: 1em;
}

.laze {
	padding: 0 1rem;
	width: 100%;
}

.flex.space {
	align-self: normal;
}

pre.judgment,
pre.image,
pre.line {
	line-height: var(--pleading);
}

dl + dl::before {
	content: '⤐';
	margin: 0 0 1em;
	font-size: 3rem;
	display: block;
}

.page-nav.btn.naked {
	padding: 0.125em 0.5em;
	margin: 0.5rem;
	text-decoration: none;
}

.hint {
	padding: 1em;
}

.numbers .datum {
	margin: 0 2.5vw;
}

.trigram .col {
	margin: 0 0.5rem;
}

.triglyph.second {
	margin-top: 0;
}

h5 {
	margin: 1em 0;
}
</style>

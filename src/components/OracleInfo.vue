j
<template lang="pug">
h2 Help and FAQs
.flex.pads.y.wrap.mid
	button.btn.md.mrg.x.outline(
		@click="showHelp('yijing')"
		:class="{active: cached.help === 'yijing'}"
		) What is the Yijing?
	button.btn.md.mrg.x.outline(
		@click="showHelp('oracle')"
		:class="{active: cached.help === 'oracle'}"
		) What is the Oracle?
	button.btn.md.mrg.x.outline(
		@click="showHelp('query')"
		:class="{active: cached.help === 'query'}"
		) What do I ask?
	button.btn.md.mrg.x.outline#method4(
		@click="showHelp('4coin')"
		:class="{active: cached.help === '4coin'}"
		) The recommended 4-coin method
	button.btn.md.mrg.x.outline#method3(
		@click="showHelp('3coin')"
		:class="{active: cached.help === '3coin'}"
		) The traditional 3-coin method
	button.btn.md.mrg.x.outline#method4b(
		@click="showHelp('4bcoin')"
		:class="{active: cached.help === '4bcoin'}"
		) The faithful 4-coin method
	button.btn.md.mrg.x.outline(
		@click="showHelp('yarrow')"
		:class="{active: cached.help === 'yarrow'}"
		) How to use yarrow stalks?
#helpLine
transition(name="slide-fade" appear mode="out-in")
	aside#helpQuery.help.font.alcenter.pads.y.below(
		v-if="cached.help === 'query'"
		ref="helpQuery"
		)
		Spinnable
			IconBase(size="100" viewBox="0 0 1000 1250" iconColor="var(--flair)")
				IconCrystalBall
		h2 How to Query the Oracle
		ul.ls
			li 
				IconBase(size="24" iconColor="var(--good)")
					Icon7
				span.text.md.tip Open questions resolve readily
				IconBase(size="24" iconColor="var(--good)")
					Icon7
			li
				IconBase(size="24" iconColor="var(--good)")
					Icon9
				span.text.md.tip "How might we …?"
				IconBase(size="24" iconColor="var(--good)")
					Icon9
			li 
				IconBase(size="24" iconColor="var(--bad)")
					Icon8
				span.text.md.tip Binary judgments stay opaque
				IconBase(size="24" iconColor="var(--bad)")
					Icon8
			li
				IconBase(size="24" iconColor="var(--bad)")
					Icon6
				span.text.md.tip "Should I …?"
				IconBase(size="24" iconColor="var(--bad)")
					Icon6
		Spinnable
			IconBase.mrg3.y(viewBox="0 0 1000 1250" size="80" iconColor="var(--flair)")
				IconCauldron
		h3
			AppLink(to="https://www.onlineclarity.co.uk/learn/beginners/3-how-to-cast-a-reading/your-question/") Hilary Barrett's Suggestions
		ul.ls
			li
				span.text.md.tip What do I need to understand about...?
			li
				span.text.md.tip What best to do about...?
			li
				span.text.md.tip How can I...?
			li
				span.text.md.tip What if I...?
		Spinnable
			IconBase.mrg3.y(size="100" viewBox="0 0 1000 1250" iconColor="var(--flair)")
				IconScroll
	aside#helpYarrow.help.font.alcenter.pads.x.y.right(
		v-else-if="cached.help === 'yarrow'"
		ref="helpYarrow"
		)
		Spinnable
			IconBase(size="80" viewBox="0 0 1000 1250" iconColor="var(--flair)")
				IconWizardsHat
		h2 How to Divine with Yarrow Stalks
		iframe(
			width="560" 
			height="315" 
			src="https://www.youtube.com/embed/LIBi8T2KI8E" frameborder="0" 
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
			)
		br
		Spinnable
			IconBase.mrgs.y(size="80" viewBox="0 0 1000 1250" iconColor="var(--flair)")
				IconCandles
	aside#helpOracle.help.font.alcenter.pads.x.y.left(
		v-else-if="cached.help === 'oracle'"
		ref="helpOracle"
		)
		Spinnable
			IconBase(size="80" viewBox="0 0 100 125" iconColor="var(--flair)")
				IconMiracle
		h2 What is the Oracle?
		pre.font.md.text-left
			| Who answers a question
			| by dipping deeper into the well
			| of being residing inside you?
			| Whose eye can see all but itself?
			| Which one is three:
			| knower, known, and knowing?
			| Who contains multitudes
			| beyond time, without name or face?
			| Who remembers all that is,
			| all that has been and will be?
		Spinnable
			IconBase(size="80" viewBox="0 0 100 125" iconColor="var(--flair)").invert.y
				IconLooptyLoop
	aside#helpYijing.help.font.alcenter.pads.x.y.right(v-else-if="cached.help === 'yijing'")
		Spinnable
			IconBase(size="80" viewBox="0 0 1000 1250" iconColor="var(--flair)")
				IconSpellBook
		h2 What is the Yìjīng?
		pre.font.md.text-left
			| An ancient wisdom tradition 
			| tracing back beyond the
			HanziChar(
				char="周"
				pinyin="Zhōu"
				size="sm"
				place="side"
				reveal
				inline
			)
			br
			| we give pause and shed face,
			| finding space for the burning question,
			| allowing what is to be, truth to blossom,
			| we divine the flavor of the moment
			| to understand who, where, why we are.
		Spinnable
			IconBase(size="80" viewBox="0 0 1000 1250" iconColor="var(--flair)")
				IconOpenBook
	aside#help4Coins.help.font.alcenter.pad3.y.left(v-else-if="cached.help === '4coin'")
		Spinnable
			IconBase(size="80" viewBox="0 0 512 640" iconColor="var(--flair)")
				IconCarnivalCoin
		h2 The Easy 4-coin Method
		dl.ls.text.md.fine.pad.y.alleft
			dt We toss six rounds of four coins.
			dt Step 1
			dd Toss 1 coin.
			dd Heads means firm, tails means open.
			dd Leave the coin where you tossed it.
			dt Step 2
			dd Toss 3 more coins next to the first one.
			dd If you see exactly 3 heads among all 4 coins,
			dd then the line is changing;
			dd otherwise it is unchanging.
			dt Enter the corresponding 6s, 7s, 8s, and 9s above.
		.coin-legend-4.grid.font.sm.thicc.pad.y
			span open
			span changing
			span 6
			span.ib
				Turnable(ortho)
					IconBase
						Icon6
			span yin ⤐ yang
			span firm
			span unchanging
			span 7
			span.ib
				Turnable(ortho)
					IconBase
						Icon7
			span yang
			span open
			span unchanging
			span 8
			span.ib
				Turnable(ortho)
					IconBase
						Icon8
			span yin
			span firm
			span changing
			span 9
			span.ib
				Turnable(ortho)
					IconBase
						Icon9
			span yang ⤐ yin
	aside#help4bCoins.help.font.alcenter.pad3.y.left(v-else-if="cached.help === '4bcoin'")
		Spinnable
			IconBase(size="80" viewBox="0 0 512 640" iconColor="var(--flair)")
				IconCarnivalCoin
		h2
			| The Faithful 4-coin Method
			sup
				AppLink(to="http://www.russellcottrell.com/VirtualYarrowStalks/downloads/4coinmethod.pdf" download)
		dl.ls.text.md.fine.pad.y.alleft
			dt We toss six rounds of four coins.
			dt Step 1
			dd Toss two coins.
			dd If both are heads, write 2; otherwise 3.
			dt Step 2
			dd Toss two coins.
			dd Each head is worth 2, each tail 3.
			dt Step 3
			dd Add up the results, to find a number between 6 and 9.
			dd Enter the number above for each round.
		.coin-legend.grid.font.sm.thicc.pad.y
			span 👸 👸 👸 = 6
			span yin ⤐ yang
			span.ib
				Turnable(ortho)
					IconBase
						Icon6
			span firming
			span 👸 👸 🦚 = 7
			span yang
			span.ib
				Turnable(ortho)
					IconBase
						Icon7
			span firm
			span 👸 🦚 🦚 = 8
			span yin
			span.ib
				Turnable(ortho)
					IconBase
						Icon8
			span open
			span 🦚 🦚 🦚 = 9
			span yang ⤐ yin
			span.ib
				Turnable(ortho)
					IconBase
						Icon9
			span opening
		ul.ls.text.md.fine.pad.y
			li Each round sums to 6, 7, 8, or 9
			li determining a line in the hexagram
			li
				| starting with the 
				span {{ cfg.turny ? 'right' : 'bottom' }}
				|  line.
	aside#help3Coins.help.font.alcenter.pad3.y.left(v-else-if="cached.help === '3coin'")
		Spinnable
			IconBase(size="80" viewBox="0 0 512 640" iconColor="var(--flair)")
				IconCarnivalCoin
		h2 The Traditional 3-coin Method
		ul.ls.text.md.fine.pad.y
			li We toss six rounds of three coins.
			br
			li A head 👸 counts as 3 
			li A tail 🦚 counts as 2
		.coin-legend.grid.font.sm.thicc.pad.y
			span 🦚 🦚 🦚 = 6
			span yin ⤐ yang
			span.ib
				Turnable(ortho)
					IconBase
						Icon6
			span firming
			span 🦚 🦚 👸 = 7
			span yang
			span.ib
				Turnable(ortho)
					IconBase
						Icon7
			span firm
			span 🦚 👸 👸 = 8
			span yin
			span.ib
				Turnable(ortho)
					IconBase
						Icon8
			span open
			span 👸 👸 👸 = 9
			span yang ⤐ yin
			span.ib
				Turnable(ortho)
					IconBase
						Icon9
			span opening
		ul.ls.text.md.fine.pad.y
			li Each round sums to 6, 7, 8, or 9
			li determining a line in the hexagram
			li
				| starting with the 
				span {{ cfg.turny ? 'right' : 'bottom' }}
				|  line.
		section
			h3 Let's walk through an example…
			.example-toss.grid.font.sm.thicc.pad.y
				span.head.thicc Round
				span.head.thicc Toss
				span.head.thicc Sum
				span.head.thicc Line
				span 6
				span 🦚 🦚 👸
				span 7
				span.ib
					Turnable(ortho)
						IconBase
							Icon7
				span 5
				span 🦚 🦚 🦚
				span 6
				span.ib
					Turnable(ortho)
						IconBase
							Icon6
				span 4
				span 👸 👸 👸
				span 9
				span.ib
					Turnable(ortho)
						IconBase
							Icon9
				span 3
				span 🦚 👸 👸
				span 8
				span.ib
					Turnable(ortho)
						IconBase
							Icon8
				span 2
				span 🦚 🦚 👸
				span 7
				span.ib
					Turnable(ortho)
						IconBase
							Icon7
				span 1
				span 🦚 🦚 🦚
				span 6
				span.ib
					Turnable(ortho)
						IconBase
							Icon6
			h4 which assembles these hexagrams:
			.flex.string
				Turnable
					.stack.col.tight
						IconBase
							Icon7
						IconBase
							Icon6
						IconBase
							Icon9
						IconBase
							Icon8
						IconBase
							Icon7
						IconBase
							Icon6
				LineGlyph(glyph="䷿" size="x4l")
				LineGlyph(glyph="䷼" size="x4l")
			h5
				| Remember, the first line is on the 
				span {{ cfg.turny ? 'right' : 'bottom' }}
				| .
		Spinnable.mrgs.y.x.ib
			IconBase(
				size="96"
				viewBox="0 0 1000 1250"
				iconColor="var(--ink)"
				)
				IconSpellBook
		Spinnable.mrgs.y.x.ib
			IconBase(
				size="96"
				viewBox="0 -12 100 125"
				iconColor="var(--flair)"
				)
				IconPenroseTriangle
		Spinnable.mrgs.y.x.ib
			IconBase(
				size="96"
				viewBox="0 0 1000 1250"
				iconColor="var(--link)"
				)
				IconOpenBook
AppLink.btn.naked.pip(to="https://ko-fi.com/kerrbear")  I love this, please make more 
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {cfg} from '../store'
import VueScrollTo from 'vue-scrollto'
import {cached, cache} from '../store/cache'
import IconBase from '../icons/IconBase.vue'
import AppLink from './AppLink.vue'
import Icon6 from '../icons/Icon6.vue'
import Icon7 from '../icons/Icon7.vue'
import Icon8 from '../icons/Icon8.vue'
import Icon9 from '../icons/Icon9.vue'
import HanziChar from './HanziChar.vue'
import LineGlyph from './LineGlyph.vue'
import Turnable from './Turnable.vue'
import Spinnable from './Spinnable.vue'
import IconScroll from '../icons/IconScroll.vue'
import IconMiracle from '../icons/IconMiracle.vue'
import IconCandles from '../icons/IconCandles.vue'
import IconCauldron from '../icons/IconCauldron.vue'
import IconOpenBook from '../icons/IconOpenBook.vue'
import IconSpellBook from '../icons/IconSpellBook.vue'
import IconLooptyLoop from '../icons/IconLooptyLoop.vue'
import IconWizardsHat from '../icons/IconWizardsHat.vue'
import IconCrystalBall from '../icons/IconCrystalBall.vue'
import IconCarnivalCoin from '../icons/IconCarnivalCoin.vue'
import IconCrescentMoon from '../icons/IconCrescentMoon.vue'
import IconPenroseTriangle from '../icons/IconPenroseTriangle.vue'

export default defineComponent({
	name: 'OracleInfo',
	components: {
		Icon6,
		Icon7,
		Icon8,
		Icon9,
		AppLink,
		IconBase,
		HanziChar,
		LineGlyph,
		Turnable,
		Spinnable,
		IconScroll,
		IconCandles,
		IconMiracle,
		IconCauldron,
		IconOpenBook,
		IconSpellBook,
		IconWizardsHat,
		IconLooptyLoop,
		IconCrystalBall,
		IconCarnivalCoin,
		IconCrescentMoon,
		IconPenroseTriangle,
	},
	setup() {
		function showAndJumpToHelp(topic: string) {
			cache('help', topic)
			VueScrollTo.scrollTo('#helpLine')
		}
		return {
			cfg,
			cache,
			cached,
			showHelp: showAndJumpToHelp,
		}
	},
})
</script>

<style lang="postcss" scoped>
.grid {
	text-align: center;
	list-style: none;
	display: grid;
	width: 100%;
	row-gap: 1em;
	column-gap: 0.5em;
}

.coin-legend {
	grid-template-columns: 3fr 3fr 1fr 3fr;
	grid-template-rows: 1fr 1fr 1fr 1fr;
}

.coin-legend-4 {
	grid-template-columns: 2fr 3fr 1fr 1fr 3fr;
	grid-template-rows: 1fr 1fr 1fr 1fr;
}

.example-toss {
	grid-template-columns: 1fr 3fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	row-gap: 1em;
	column-gap: 0.5em;
}

.grid svg {
	color: var(--flair);
	height: 1.5em;
}

.coin-legend span,
.coin-legend-4 span {
	line-height: 1.5em;
	height: 1.5em;
}

.ls li {
	@supports (font-variation-settings: normal) {
		font-family: 'QuicksandVariable';
		font-variation-settings: 'wght' 555;
	}
	margin: 0;
}

.ls .icon {
	vertical-align: middle;
}

.help {
	padding: 2rem 0;
}

.help h3 {
	@supports (font-variation-settings: normal) {
		font-family: 'QuicksandVariable';
		font-style: italic;
		font-variation-settings: 'wght' 667;
	}
}

.tip.md {
	display: inline-block;
	width: 92vw;
	max-width: 16rem;
	margin: 0.375em 0;

	@media (min-width: 36rem) {
		max-width: 24rem;
	}
}

.btn.outline {
	border-color: var(--glow);
}

.btn.outline.active {
	border-color: var(--flair);
}

.tight .icon {
	margin: -0.25em 0;
	transform-origin: center;
	transform: rotate(90deg);
}

.turner {
	transition: transform var(--beat) var(--ease-out-quad);
	transform-origin: center;
}

.turned {
	transform: rotate(-90deg);
}

.unturned {
	transform: rotate(90deg);
}
</style>

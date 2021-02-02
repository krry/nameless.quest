<template lang="pug">
h2 Help and FAQs
.flex.btw.pads.y.wrap
	button.btn.md.mrg.x.outline(
		@click="cache('help', 'oracle')"
		:class="{active: cached.help === 'oracle'}"
		) What is the Oracle?
	button.btn.md.mrg.x.outline(
		@click="cache('help', 'query')"
		:class="{active: cached.help === 'query'}"
		) What do I ask?
	button.btn.md.mrg.x.outline(
		@click="cache('help', 'yijing')"
		:class="{active: cached.help === 'yijing'}"
		) What is the Yijing?
	button.btn.md.mrg.x.outline(
		@click="cache('help', 'count')"
		:class="{active: cached.help === 'count'}"
		) How to count the coins?
	button.btn.md.mrg.x.outline(
		@click="cache('help', 'yarrow')"
		:class="{active: cached.help === 'yarrow'}"
		) How to split yarrow stalks?
transition(name="slide-fade" appear mode="out-in")
	aside.help.text-center.pads.x.y.below( v-if="cached.help === 'query'" )
		IconBase(size="100" viewBox="0 0 1000 1250" iconColor="var(--good)")
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
		IconBase.mrg3.y(viewBox="0 0 1000 1250" size="80" iconColor="var(--glow)")
			IconCauldron
		h3
			app-link(to="https://www.onlineclarity.co.uk/learn/beginners/3-how-to-cast-a-reading/your-question/") Hilary Barrett's Suggestions
		ul.ls
			li
				span.text.md.tip What do I need to understand about...?
			li
				span.text.md.tip What best to do about...?
			li
				span.text.md.tip How can I...?
			li
				span.text.md.tip What if I...?
		IconBase.mrg3.y(size="100" viewBox="0 0 1000 1250" iconColor="var(--flair)")
			IconScroll
	aside.help.text-center.pads.x.y.right(v-else-if="cached.help === 'yarrow'")
		IconBase(size="80" viewBox="0 0 1000 1250")
			IconWizardsHat
		h2 How to Divine with Yarrow Stalks
		iframe(
			width="560" 
			height="315" 
			src="https://www.youtube.com/embed/LIBi8T2KI8E" frameborder="0" 
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
			)
		IconBase(size="80" viewBox="0 0 1000 1250")
			IconCandles
	aside.help.text-center.pads.x.y.left(
		v-else-if="cached.help === 'oracle'"
		)
		IconBase(size="80" viewBox="0 0 100 125")
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
		IconBase(size="80" viewBox="0 0 100 125").invert.y
			IconLooptyLoop
	aside.help.text-center.pads.x.y.right( v-else-if="cached.help === 'yijing'" )
		IconBase(size="80" viewBox="0 0 1000 1250")
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
		IconBase(size="80" viewBox="0 0 1000 1250")
			IconOpenBook
	aside.help.text-center.pad3.y.left(v-else)
		IconBase(size="80" viewBox="0 0 100 125" iconColor="var(--flair)")
			IconTwoRings
		h2 How to Count the Coins
		ul.ls.text.md.fine.pad.y
			li We toss six rounds of three coins.
			br
			li A head 👸 counts as 3 
			li A tail 🦚 counts as 2
		.line-legend.grid.font.sm.thicc.pad.y
			span 🦚 🦚 🦚 = 6
			span yin ⤐ yang
			span.ib
				IconBase.turner(:class="{unturned: !cfg.turny}")
					Icon6
			span firming
			span 🦚 🦚 👸 = 7
			span yang
			span.ib
				IconBase.turner(:class="{unturned: !cfg.turny}")
					Icon7
			span firm
			span 🦚 👸 👸 = 8
			span yin
			span.ib
				IconBase.turner(:class="{unturned: !cfg.turny}")
					Icon8
			span open
			span 👸 👸 👸 = 9
			span yang ⤐ yin
			span.ib
				IconBase.turner(:class="{unturned: !cfg.turny}")
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
					IconBase.turner(:class="{unturned: !cfg.turny}")
						Icon7
				span 5
				span 🦚 🦚 🦚
				span 6
				span.ib
					IconBase.turner(:class="{unturned: !cfg.turny}")
						Icon6
				span 4
				span 👸 👸 👸
				span 9
				span.ib
					IconBase.turner(:class="{unturned: !cfg.turny}")
						Icon9
				span 3
				span 🦚 👸 👸
				span 8
				span.ib
					IconBase.turner(:class="{unturned: !cfg.turny}")
						Icon8
				span 2
				span 🦚 🦚 👸
				span 7
				span.ib
					IconBase.turner(:class="{unturned: !cfg.turny}")
						Icon7
				span 1
				span 🦚 🦚 🦚
				span 6
				span.ib
					IconBase.turner(:class="{unturned: !cfg.turny}")
						Icon6
			h4 which assembles these hexagrams:
			.flex.string
				.stack.col.tight.turner(:class="{turned: cfg.turny}")
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
				HexaGlyph(hex="䷿" size="x4l")
				HexaGlyph(hex="䷼" size="x4l")
			h5
				| Remember, the first line is on the 
				span {{ cfg.turny ? 'right' : 'bottom' }}
				| .
		IconBase.mrgs.y.turner(
			size="84"
			viewBox="0 0 100 125"
			iconColor="var(--pencil)"
			:class="{turned: cfg.turny}")
			IconPenroseTriangle
app-link.btn(to="https://ko-fi/kerrbear") Just. Like. Wow. 🐻
</template>
<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue'
import {cfg} from '../store'
import {cached, cache} from '../store/cache'
import IconBase from '../icons/IconBase.vue'
import AppLink from './AppLink.vue'
import Icon6 from '../icons/Icon6.vue'
import Icon7 from '../icons/Icon7.vue'
import Icon8 from '../icons/Icon8.vue'
import Icon9 from '../icons/Icon9.vue'
import HanziChar from './HanziChar.vue'
import HexaGlyph from './HexaGlyph.vue'
import IconScroll from '../icons/IconScroll.vue'
import IconMiracle from '../icons/IconMiracle.vue'
import IconCandles from '../icons/IconCandles.vue'
import IconCauldron from '../icons/IconCauldron.vue'
import IconOpenBook from '../icons/IconOpenBook.vue'
import IconTwoRings from '../icons/IconTwoRings.vue'
import IconSpellBook from '../icons/IconSpellBook.vue'
import IconLooptyLoop from '../icons/IconLooptyLoop.vue'
import IconWizardsHat from '../icons/IconWizardsHat.vue'
import IconCrystalBall from '../icons/IconCrystalBall.vue'
import IconPenroseTriangle from '../icons/IconPenroseTriangle.vue'

export default defineComponent({
	name: 'ComponentName',
	components: {
		Icon6,
		Icon7,
		Icon8,
		Icon9,
		AppLink,
		IconBase,
		HanziChar,
		HexaGlyph,
		IconCandles,
		IconMiracle,
		IconCauldron,
		IconTwoRings,
		IconOpenBook,
		IconSpellBook,
		IconWizardsHat,
		IconLooptyLoop,
		IconScroll,
		IconCrystalBall,
		IconPenroseTriangle,
	},
	setup() {
		const rx = reactive({
			// help: '',
		})
		return {
			cfg,
			cache,
			cached,
			...toRefs(rx),
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
}

.line-legend {
	grid-template-columns: 5fr 4fr 1fr 3fr;
	grid-template-rows: 1fr 1fr 1fr 1fr;
	row-gap: 1em;
	column-gap: 0.5em;
}

.example-toss {
	grid-template-columns: 1fr 3fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	row-gap: 1em;
	column-gap: 0.5em;
}

.line-legend .center {
	text-align: center;
}

.grid svg {
	height: 1.5em;
	color: var(--flair);
}

.line-legend span {
	height: 1.5em;
	line-height: 1.5em;
}

.ls li {
	margin: 0;
}

.ls .icon {
	vertical-align: middle;
}

.help {
	padding: 2rem 0;
}

.help h3,
.ls li,
.field-label {
	@supports (font-variation-settings: normal) {
		font-family: 'QuicksandVariable';
		font-variation-settings: 'wght' 555;
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

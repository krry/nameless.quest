<template lang="pug">
section.cast
	.dyn.holding(v-if="cached.query")
		h2 Divining the Answer
		blockquote
			h2 {{cached.query.trim()}}
		transition(name="slide-fade" mode="out-in")
			h3.center( v-if="cached.toss.length === 0" )
				| Now, holding this question gently in mind
				br
				| we 
				a(@click="cache('help', 'coins')") flip three coins
			.glyphs.left.rtl(v-else)
				IconBase.line(
					v-for="char in cached.toss"
					:key="$symbolize(char)"
					:class="{valid: validToss}"
					:iconName="getLineName(char)"
					)
					component( :is="`Icon${char}`" )
	.tossing
		.field.toss
			input.rtl(
				type="tel"
				v-model="cached.toss"
				id="roll"
				maxlength="6"
				min="666666"
				max="999999"
				autofocus
				pattern="[6-9]{1,6}"
				placeholder="678789"
				@keyup.ctrl.enter="saveToss"
			)
		transition(name="slide-fade" mode="out-in" appear)
			button.btn.right.go(
				v-if="validToss"
				@click="saveToss"
				) Let's 卦 Gua
			.fake-coins(v-else)
				transition(name="flip" mode="out-in")
					button.btn.outline.under(
						v-if="!noCoins"
						@click="noCoins = true"
						) Can't find any coins?
					button.btn.outline.over(
						v-else
						@click="fakeCoins"
						) 🤸 Fake my flips 🩴
</template>

<script lang="ts">
import {defineComponent, ref, computed} from 'vue'
import Icon6 from '../icons/Icon6.vue'
import Icon7 from '../icons/Icon7.vue'
import Icon8 from '../icons/Icon8.vue'
import Icon9 from '../icons/Icon9.vue'
import IconBase from '../icons/IconBase.vue'
import {generateRandomToss} from '../utils/tosses'
import {cached, cache} from '../store/cache'

export default defineComponent({
	name: 'OracleCast',
	components: {
		Icon6,
		Icon7,
		Icon8,
		Icon9,
		IconBase,
	},
	setup() {
		const noCoins = ref(false)
		const validToss = computed(() => {
			// ensure that the toss is exactly six 6s, 7s, 8s, & 9s
			return /^[6-9]{6}$/.test(cached.toss)
		})

		function saveToss() {
			if (!validToss.value) return
			cache('toss', cached.toss)
			cache('step', 'response')
		}

		function fakeCoins() {
			const fakeFlips = generateRandomToss().toString().split('')
			let i = 0
			const typer = setInterval(() => {
				cached.toss += fakeFlips[i]
				i++
				if (i === fakeFlips.length) clearInterval(typer)
			}, 1500)
		}

		function getLineName(char: string): string {
			switch (char) {
				case '6':
					return 'Old Yin • firming'
				case '7':
					return 'Yang • firm'
				case '8':
					return 'Yin • open'
				case '9':
					return 'Old Yang • opening'
				default:
					return ''
			}
		}

		return {
			cached,
			noCoins,
			saveToss,
			fakeCoins,
			getLineName,
			validToss,
		}
	},
})
</script>

<style lang="postcss" scoped>
.brand,
.holding,
.tossing {
	flex: 1 0 auto;
}

.tossing {
	text-align: center;
}

h2 {
	margin: 1em 0 0.5em;
}

.toss {
	margin: 1em 0;
}

.toss input[type='tel'] {
	font-size: 2em;
	width: 12ch;
}

.line {
	height: 3em;
	width: 1em;
	margin: 0 0.125em;
}

.line.valid {
	color: var(--good);
}

.rtl {
	direction: rtl;
	unicode-bidi: bidi-override;
	text-align: center;
}

.flip-enter-active,
.flip-leave-active {
	transition-property: transform, opacity;
	transition-duration: var(--beat);
	transition-timing-function: var(--ease-out-quad);
	transform-origin: center;
}

.flip-enter-to,
.flip-leave-from {
	transform: rotateX(0);
}

.flip-enter-from,
.flip-leave-to {
	transform: rotateX(180deg);
}
</style>

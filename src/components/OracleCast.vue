<template lang="pug">
.left
	h2 Divining the Answer…
	section.cast
		.dyn.holding(v-if="cached.query")
			blockquote#query
				h2 {{cached.query.trim()}}
			transition(name="slide-fade" mode="out-in")
				h3.center(v-if="cached.toss.length === 0")
					| Holding this question
					br
					| gently in mind
					br
					a.tute#flip(
						@click="showCoinsHelp"
						) let the coins flip
				.glyphs.left.rtl(v-else)
					IconBase.line(
						v-for="char in [...cached.toss]"
						:key="symbolize(char).toString()"
						:class="{valid: validToss}"
						:iconName="getLineName(char)"
						)
						component( :is="lineIconByNumber(char)" )
		.tossing
			.field.toss
				IconBase.abs.l(
					size="48"
					iconColor="var(--ink)"
					viewBox="0 0 50000 62500")
					IconCoinFlip
				//- TODO: on change, style non-allowed characters red
				input#toss.rtl.ib.mrg.mrg3.x(
					type="tel"
					v-model="cached.toss"
					:maxlength="6"
					min="666666"
					max="999999"
					autofocus
					pattern="[6-9]{1,6}"
					placeholder="678789"
					@keydown.meta.enter.exact="saveToss"
					@keydown.ctrl.enter.exact="saveToss"
					@keyup.enter.exact="saveToss"
					@focus="scrollTo('.cast')"
				)
				IconBase.abs.r(
					size="48"
					iconColor="var(--ink)"
					viewBox="0 0 512 640")
					IconCoin
			transition(name="slide-fade" mode="out-in" appear)
				button.btn.over.lg.go(
					v-if="validToss"
					@click="saveToss"
					) Let's 卦 Gua
				.fake-coins(v-else)
					button.btn.outline.over.flipper(
						ref="flipper"
						@click="fakeCoins"
						) 🤸 Flip Coins Virtually 🪙
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import IconSix from '../icons/IconSix.vue';
import IconSeven from '../icons/IconSeven.vue';
import IconEight from '../icons/IconEight.vue';
import IconNine from '../icons/IconNine.vue';
import IconBase from '../icons/IconBase.vue';
import IconCoin from '../icons/IconCoin.vue';
import IconCoinFlip from '../icons/IconCoinFlip.vue';
import { generateRandomToss } from '../utils/tosses';
import { cached, cache } from '../store/cache';
import VueScrollTo from 'vue-scrollto';
import { symbolize, lineIconByNumber } from '../utils';

export default defineComponent({
	name: 'OracleCast',
	components: {
		IconSix,
		IconSeven,
		IconEight,
		IconNine,
		IconBase,
		IconCoin,
		IconCoinFlip,
	},
	setup() {
		const noCoins = ref(false);
		const flipper = ref<HTMLElement>();

		const validToss = computed(() => {
			// ensure that the toss is exactly six 6s, 7s, 8s, & 9s
			return /^[6-9]{6}$/.test(cached.toss);
		});

		function saveToss() {
			if (!validToss.value) return;
			cache('toss', cached.toss.split('').reverse().join(''));
			cache('step', 'response');
		}

		function flipFlipper(bit: boolean): void {
			// console.log('flipper', flipper)
			if (flipper.value) {
				flipper.value.style.animationPlayState = bit ? 'running' : 'paused';
				flipper.value.style.animationDelay = '618ms';
			}
		}

		function fakeCoins() {
			const fakeFlips = generateRandomToss().toString().split('');
			let i = 0;
			flipFlipper(true);
			const typer = setInterval(() => {
				cached.toss += fakeFlips[i];
				i++;
				if (i === fakeFlips.length) {
					flipFlipper(false);
					clearInterval(typer);
				}
			}, 1618);
		}

		function getLineName(char: string): string {
			switch (char) {
				case '6':
					return 'old yin • firming';
				case '7':
					return 'yang • firm';
				case '8':
					return 'yin • open';
				case '9':
					return 'old yang • opening';
				default:
					return '';
			}
		}

		function showCoinsHelp() {
			cache('help', '4coin');
			setTimeout(() => VueScrollTo.scrollTo('#help4Coins'), 777);
		}

		return {
			cached,
			flipper,
			noCoins,
			saveToss,
			symbolize,
			fakeCoins,
			getLineName,
			showCoinsHelp,
			lineIconByNumber,
			validToss,
			scrollTo: VueScrollTo.scrollTo,
		};
	},
});
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
	width: 8ch;
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
	transition-timing-function: var(--ease-out-circ);
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

.flipper {
	animation-name: flipper;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
	animation-play-state: paused;
	animation-duration: var(--2beat);
	line-height: 1;
	/* padding: 1em; */
}

@keyframes flipper {
	0% {
		transform: rotateX(0);
	}
	6% {
		transform: rotateX(-180deg);
	}
	12% {
		transform: rotateX(0);
	}
	18% {
		transform: rotateX(-180deg);
	}
	25% {
		transform: rotateX(0);
	}
}
</style>

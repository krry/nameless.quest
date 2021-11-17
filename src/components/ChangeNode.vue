<template lang="pug">
article.change-node(
  :class="{active: isActive || isBeing || isBecoming}"
  @keydown.esc="clearLots()"
  )
  transition(name="deal" mode="out-in" appear)
    HexaCard(
      ref="card"
      v-if="isActive"
      :hex="hex"
      :mark="mark"
      :liney="liney"
      :quad="setQuadrant(tile.$el)"
      @close="removeLot(hexId)"
    )
  HexaFrame(:hex="hex")
  HexaTile.tile(
    ref="tile"
    :tabindex="wenny ? hex.kingwen + 9 : hex.octal + 9"
    :names="hex.names"
    @click.stop="swapLot(hexId)"
    @keyup.enter="saveLot(hexId)"
    )
</template>

<script lang="ts">
import {
	defineComponent,
	PropType,
	ref,
	reactive,
	toRef,
	toRefs,
	watchEffect,
	onMounted,
	computed,
} from 'vue';

import { defHex, Hexagram, Quad } from '../schema';
import { setQuadrant } from '../composables/quadrants';
import { cfg } from '../store';
import { cached } from '../store/cache';
import { parseTossToBinary } from '../utils/tosses';
import { activeLots, saveLot, removeLot, clearLots } from '../store/lots';
import HexaCard from './HexaCard.vue';
import HexaTile from './HexaTile.vue';
import HexaFrame from './HexaFrame.vue';

export default defineComponent({
	name: 'ChangeNode',
	components: {
		HexaCard,
		HexaTile,
		HexaFrame,
	},
	props: {
		hex: {
			type: Object as PropType<Hexagram>,
			default: defHex,
		},
		hexId: {
			type: String,
			default: '0b000000',
		},
	},
	setup(props) {
		const hex = toRef(props, 'hex');
		const rolledLots = parseTossToBinary(cached.toss);

		const rx = reactive({
			card: ref(),
			tile: ref(),
			mark: '',
			liney: false,
			lots: rolledLots,
			hex,
			quadrant: ref<Quad>(),
			id: toRef(props, 'hexId'),
			wenny: cfg.wenny,
			isBeing: computed(() => rolledLots?.indexOf(hex.value.binary) === 0),
			isBecoming: computed(() => rolledLots?.indexOf(hex.value.binary) === 1),
			isActive: computed(() => activeLots.value?.indexOf(hex.value.binary) === 0),
		});

		function swapLot(id: string): void {
			clearLots();
			saveLot(id);
		}

		onMounted(() => {
			watchEffect(() => {
				if (rx.isBeing) {
					// only show changing lines on first card
					rx.liney = true;
					rx.mark = '𐡷 Being 𐡸';
					if (!rx.card || !rx.card.$el) return;
				}
				if (rx.isBecoming) {
					rx.liney = false;
					rx.mark = '𐡸 Becoming 𐡷';
				}
			});
		});

		return {
			swapLot,
			saveLot,
			removeLot,
			clearLots,
			setQuadrant,
			...toRefs(rx),
		};
	},
});
</script>

<style lang="postcss" scoped>
.change-node {
	border: 1px solid var(--glow);
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0.61em;
	position: relative;
	text-align: center;
	transition-property: all, transform;
	transition-duration: var(--beat-2), var(--2beat);
	transition-timing-function: var(--ease-out-cubic), var(--ease-in-out-cubic);
	background-color: var(--silk);
	min-width: 9em;
	max-width: 12em;
	min-height: 6.67em;
	max-height: 9em;
	@media (min-height: 48em) {
		height: calc((100vh / 8) - (2 * var(--bevel)));
	}
	@media (min-width: 48em) {
		width: calc((100vw / 8) - (2 * var(--bevel)));
	}

	&:hover {
		transition-duration: 100ms;
	}

	&.active,
	&:hover,
	&:focus-within {
		color: var(--ground);
		border-color: var(--ground);
	}

	&.active {
		background-color: var(--link);
	}

	&:hover,
	&:hover.active,
	&:focus-within {
		background-color: var(--flair);
	}
}

/*
 * IMPORTANT:
 * this corresponds to the position of the card based on the tiles position as calculated in `utils/cards.ts`
 * check `HexaCard.vue` for the styles that position the card once it is dealt
 */

@media (min-width: 36rem) and (min-height: 36rem) {
	.deal-enter-to,
	.deal-leave-from {
		transform: translate3d(-50%, 0, 0) scale(1);
	}

	.deal-leave-to {
		transform: translate3d(-50%, -300%, 0) scale(0.5) rotate(360deg);
	}

	.change-node:nth-of-type(8n) .deal-enter-from {
		transform: translate3d(-50%, 0%, 0) scale(0.25) rotateX(180deg) rotateZ(-180deg);
	}

	.change-node:nth-of-type(8n-1) .deal-enter-from {
		transform: translate3d(-50%, 0%, 0) scale(0.25) rotateX(-180deg) rotateZ(180deg);
	}

	.change-node:nth-of-type(8n-2) .deal-enter-from {
		transform: translate3d(-50%, 0%, 0) scale(0.25) rotateX(-180deg) rotateZ(-180deg);
	}

	.change-node:nth-of-type(8n-3) .deal-enter-from {
		transform: translate3d(-50%, 0%, 0) scale(0.25) rotateY(-180deg) rotateZ(180deg);
	}

	.change-node:nth-of-type(8n-4) .deal-enter-from {
		transform: translate3d(-50%, 0%, 0) scale(0.25) rotateY(180deg) rotateZ(-180deg);
	}

	.change-node:nth-of-type(8n-5) .deal-enter-from {
		transform: translate3d(-50%, 0%, 0) scale(0.25) rotateY(-180deg) rotateZ(-180deg);
	}

	.change-node:nth-of-type(8n-6) .deal-enter-from {
		transform: translate3d(-50%, 0%, 0) scale(0.25) rotateX(180deg) rotateZ(180deg);
	}

	.change-node:nth-of-type(8n-7) .deal-enter-from {
		transform: translate3d(-50%, 0%, 0) scale(0.25) rotateY(180deg) rotateZ(180deg);
	}
}
</style>

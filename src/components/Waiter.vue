<template lang="pug">
.abs.abs-0.flex.spread
	Spinnable(
		running
		zip="1"
		).spinning
		//- IconBase.ozhorse(
		//- 	size="144"
		//- 	viewBox="0 0 1000 1250"
		//- 	)
		//- 	IconCauldron
		//- IconBase.ozhorse(
		//- 	size="144"
		//- 	viewBox="0 0 100 125"
		//- 	)
		//- 	IconMiracle
		//- IconBase.ozhorse(
		//- 	size="144"
		//- 	viewBox="0 0 1000 1250"
		//- 	)
		//- 	IconWizardsHat
		IconBase.ozhorse(
			size="144"
			viewBox="0 0 39028.39 45618.424999999996"
			)
			IconInfinitySign
		IconBase.ozhorse.second(
			size="144"
			viewBox="0 0 39028.39 45618.424999999996"
			)
			IconInfinitySign
		IconBase.ozhorse.third(
			size="144"
			viewBox="0 0 39028.39 45618.424999999996"
			)
			IconInfinitySign
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import IconBase from '../icons/IconBase.vue';
import IconCauldron from '../icons/IconCauldron.vue';
import IconMiracle from '../icons/IconMiracle.vue';
import IconWizardsHat from '../icons/IconWizardsHat.vue';
import IconInfinitySign from '../icons/IconInfinitySign.vue';
import Spinnable from '../components/Spinnable.vue';
export default defineComponent({
	name: 'WaiterSpinner',
	components: {
		IconBase,
		IconCauldron,
		IconMiracle,
		IconWizardsHat,
		IconInfinitySign,
		Spinnable,
	},
	setup() {
		const waiter = ref<HTMLElement>();
		onMounted(() => {
			if (waiter.value) waiter.value.style.animationPlayState = 'running';
		});
		return {
			waiter,
		};
	},
});
</script>

<style lang="postcss" scoped>
.spinnable.spinning {
	animation-duration: var(--beat);
	pointer-events: none;
	cursor: progress;
	width: 100%;
	height: 100%;
	border-radius: 100%;
}

.ozhorse {
	animation: ozhorse infinite 10s;
	text-shadow: 0 1px var(--shade), 1px 0 var(--shade), -1px 0 var(--shade), 0 -1px var(--shade);

	&.second {
		animation-delay: -3.33s;
	}

	&.third {
		animation-delay: -6.67s;
	}
}

@keyframes ozhorse {
	0% {
		color: var(--ink);
	}
	25% {
		color: var(--flair);
	}
	50% {
		color: var(--brand);
	}
	75% {
		color: var(--link);
	}
	100% {
		color: var(--ink);
	}
}
</style>

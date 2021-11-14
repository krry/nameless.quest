<template lang="pug">
.spinnable(
  ref="el"
	:class="isSpinning ? 'spinning' : ''"
  @click.stop="isSpinning = !isSpinning"
  )
  slot
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watchEffect } from 'vue';
import { useSpinnable } from '../composables/spinnable';

export default defineComponent({
	name: 'SpinnableComponent',
	props: {
		running: Boolean,
		zip: {
			type: String,
			default: '2',
		},
	},
	setup(props) {
		const el = ref<HTMLElement>();
		const isSpinning = ref(props.running);

		onMounted(() => {
			if (el.value) {
				const { getSpinning, setSpinning } = useSpinnable(
					el.value,
					props.running,
					Number(props.zip)
				);

				isSpinning.value = getSpinning();

				watchEffect(() => {
					setSpinning(isSpinning.value);
				});
			}
		});
		return {
			el,
			isSpinning,
		};
	},
});
</script>

<style lang="postcss" scoped>
/* animations */
@keyframes spin {
	0% {
		transform: rotateZ(0deg) rotateX(0deg) rotateY(0deg);
	}

	50% {
		/* transform: rotateZ(180deg) scale(1.618); */
	}

	100% {
		transform: rotateZ(360deg) rotateX(-360deg) rotateY(360deg);
	}
}

.spinnable {
	animation-name: spin;
	animation-duration: var(--4beat);
	animation-iteration-count: infinite;
	animation-timing-function: linear;
	animation-play-state: paused;
	display: inline-block;
	padding: 1em;
	&.spinning {
		box-shadow: 0 0 1rem var(--glow), inset 0 0 1rem var(--glow);
		border: 1px solid var(--paper);
		width: auto;
		border-radius: 50%;
	}
}
</style>

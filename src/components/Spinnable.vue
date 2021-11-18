<template lang="pug">
.spinnable(
  ref="el"
	:class="{spinning: isSpinning, paused: !isSpinning, threedy: cfg.threedy}"
  @click.stop="isSpinning = !isSpinning"
  )
  slot
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watchEffect } from 'vue';
import { useSpinnable } from '../composables/spinnable';
import { cfg } from '../store';

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
			cfg,
			isSpinning,
		};
	},
});
</script>

<style lang="postcss" scoped>
/* animations */
@keyframes spin {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

@keyframes spin3d {
	0% {
		transform: rotateZ(0deg) rotateX(0deg) rotateY(0deg);
	}

	100% {
		transform: rotateZ(360deg) rotateX(-360deg) rotateY(360deg);
	}
}

.spinnable {
	--spin-speed: var(--4beat);
	animation-name: spin;
	animation-duration: var(--spin-speed);
	animation-iteration-count: infinite;
	animation-timing-function: linear;
	animation-play-state: paused;
	border: 1x solid transparent;
	&.threedy {
		transform-style: preserve-3d;
		transform-origin: center;
		animation-name: spin3d;
		animation-duration: calc(var(--spin-speed) * 3);
	}
	&.paused {
		animation-play-state: paused;
		transform: rotate(0deg);
		&.threedy {
			transform: rotateZ(0deg) rotateX(0deg) rotateY(0deg);
		}
	}
	display: inline-block;
	padding: 1em;
	&.spinning {
		box-shadow: 0 0 1rem var(--glow), inset 0 0 1rem var(--glow);
		border-color: var(--paper);
		width: auto;
		border-radius: 50%;
	}
}
</style>

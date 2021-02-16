<template lang="pug">
.spinnable(
  ref="el"
  @click.stop="isSpinning = !isSpinning"
  )
  slot
</template>

<script lang="ts">
import {defineComponent, ref, onMounted, watchEffect} from 'vue'
import {useSpinnable} from '../composables/spinnable'

export default defineComponent({
	name: 'Spinnable',
	setup() {
		const el = ref<HTMLElement>()
		const isSpinning = ref(false)

		onMounted(() => {
			if (el.value) {
				const {getSpinning, setSpinning} = useSpinnable(el.value)

				isSpinning.value = getSpinning()

				watchEffect(() => {
					setSpinning(isSpinning.value)
				})
			}
		})
		return {
			el,
			isSpinning,
		}
	},
})
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

.spinnable {
	animation-name: spin;
	animation-duration: var(--be4t);
	animation-iteration-count: infinite;
	animation-timing-function: linear;
	animation-play-state: paused;
}
</style>

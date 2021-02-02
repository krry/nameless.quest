<template lang="pug">
.hexaglyph.clickable(
  ref="el"
  :class="'font', size, {turned: cfg.turny && !spinnable}, {inline: inline}" 
  @click.stop="tog('turny')"
  ) {{ hex }}

</template>
<script lang="ts">
import {defineComponent, onMounted, watchEffect, ref} from 'vue'
import {cfg, tog} from '../store'
import {useSpinnable} from '../composables/spinnable'
export default defineComponent({
	name: 'HexaGlyph',
	props: {
		hex: {
			type: String,
			default: '',
		},
		size: {
			type: String,
			default: 'xl',
		},
		inline: Boolean,
		spinnable: Boolean,
	},
	setup(props) {
		const el = ref<HTMLElement>()
		const isSpinning = ref(false)

		onMounted(() => {
			if (el.value && props.spinnable) {
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
			cfg,
			tog,
		}
	},
})
</script>
<style lang="postcss" scoped>
.hexaglyph {
	margin: 0 auto;
	transition: var(--beat) var(--ease-out-quad);
	transform-origin: center center;
	color: var(--flair);
}

.hexaglyph.turned {
	transform: rotate(-90deg);
}

.inline {
	display: inline-block;
}
</style>

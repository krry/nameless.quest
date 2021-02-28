<template lang="pug">
transition-group(
  class="hexagrid"
  tag="main"
  :style="{backgroundImage: backdrop}"
  @click.stop="clearLots"
  )
  ChangeNode(
    v-for="[identifier, change] in hexagrams.entries()"
    :key="change.binary"
    :hex="change"
    :hexId="change.binary"
    )
</template>

<script lang="ts">
import {defineComponent, reactive, computed, toRefs, provide, InjectionKey} from 'vue'

import ChangeNode from './ChangeNode.vue'
import {useHexagrams} from '../composables/hexagrams'
import {activeTheme} from '../store/theme'
import {cfg, tog} from '../store'
import {getRandTo} from '../utils'
import {activeLots, setLots, clearLots} from '../store/lots'

// TODO: extract reorderTiles to a tiles composable or util
export const reorderKey = Symbol('reorder') as InjectionKey<() => void>

export default defineComponent({
	name: 'HexaGrid',
	components: {
		ChangeNode,
	},
	setup() {
		let refreshBg = 1
		const theme = activeTheme
		const {getHexagrams} = useHexagrams()

		function sizeBg() {
			const screenWidth = window.innerWidth
			const screenHeight = window.innerHeight
			const smallerDim = screenWidth < screenHeight ? screenWidth : screenHeight
			if (smallerDim > 1080) return 'bg-lg/'
			if (smallerDim > 576) return 'bg-md/'
			else return 'bg-sm/'
		}

		const rx = reactive({
			hexagrams: computed(() => getHexagrams(cfg.wenny)),
			backdrop: computed(
				() => refreshBg && 'url(/' + sizeBg() + theme.value + getRandTo(5) + '.jpg)',
			),
		})

		function reorderTiles() {
			const lots = activeLots.value
			clearLots()
			refreshBg++
			tog('wenny')
			if (lots) {
				setTimeout(() => {
					return setLots(lots)
				}, 1000)
			}
		}

		provide(reorderKey, reorderTiles)

		return {
			clearLots,
			...toRefs(rx),
		}
	},
	mounted() {
		document.addEventListener('keyup', this.onArrows)
	},
	unmounted() {
		document.removeEventListener('keyup', this.onArrows)
	},
	methods: {
		onArrows(e: KeyboardEvent) {
			const arrows = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
			if (!e.key || arrows.indexOf(e.key) === -1) return
			if (e.key === 'ArrowLeft') {
				console.log('hit arrow', e.key, e.target)
			}
			if (e.key === 'ArrowRight') {
				console.log('hit arrow', e.key, e.target)
			}
			if (e.key === 'ArrowUp') {
				console.log('hit arrow', e.key, e.target)
			}
			if (e.key === 'ArrowDown') {
				console.log('hit arrow', e.key, e.target)
			}
		},
	},
})
</script>

<style scoped lang="postcss">
.hexagrid {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	transition: var(--bea2);
	border: var(--frame) solid var(--glow);

	@media (min-width: 36rem) and (min-height: 36rem) {
		border: var(--bevel) solid var(--shade);
	}
}
</style>

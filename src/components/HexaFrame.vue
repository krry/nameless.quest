<template lang="pug">
.counting
  .hexagram(
    @click.stop="baguad=!baguad"
  ) {{ hex.hexagram }}
  .binary(hidden) {{ hex.binary }}
  .order(@click.stop="reorder")
    .octal(
      v-if="!wenny"
      :title="`Octal No. ${hex.octal.slice(1)}`"
    ) {{ hex.octal.slice(1) }}
    .kingwen(
      v-if="wenny"
      :title="`King Wen No. ${hex.kingwen}`"
    ) {{ hex.kingwen }}
  BaguaDoors(
    @click.stop="baguad = !baguad"
    :baguad="baguad"
    :pair="hex.trigramPair"
  )
</template>

<script lang="ts">
import {defineComponent, PropType, ref, inject, watchEffect} from 'vue'
import {defHex, Hexagram} from '../schema'
import {cfg} from '../store'
import BaguaDoors from './BaguaDoors.vue'
import {reorderKey} from './HexaGrid.vue'
import {setQuadrantKey} from './ChangeNode.vue'

export default defineComponent({
	name: 'HexaFrame',
	components: {
		BaguaDoors,
	},
	props: {
		hex: {
			type: Object as PropType<Hexagram>,
			default: defHex,
		},
	},
	setup() {
		const baguad = ref(false)
		const reorderTiles = inject(reorderKey)
		const setQuadrant = inject(setQuadrantKey)

		function reorder() {
			if (!reorderTiles || !setQuadrant) throw new Error("can't reorder tiles atm 🤨")
			reorderTiles()
			setQuadrant()
		}

		watchEffect(() => (baguad.value = cfg.baguy))

		return {
			baguad,
			reorder,
			wenny: cfg.wenny,
		}
	},
})
</script>

<style scoped lang="postcss">
.hexagram {
	position: absolute;
	top: 0;
	left: 0;
	font-size: 2em;
	line-height: 1;
	cursor: pointer;
	pointer-events: auto;
	z-index: 2;
}

.order:hover,
.order:focus,
.hexagram:hover,
.hexagram:focus {
	color: var(--silk);
}

.order {
	position: absolute;
	top: var(--frame);
	right: var(--frame);
	cursor: pointer;
}
</style>

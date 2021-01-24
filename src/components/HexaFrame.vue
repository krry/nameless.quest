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
  Bagua(
    @click.stop="baguad = !baguad"
    :baguad="baguad"
    :above="hex.trigramPair.above"
    :below="hex.trigramPair.below"
  )
</template>

<script lang="ts">
import {defineComponent, PropType, ref, inject} from 'vue'
import {defHex, Hexagram} from '../schema'
import BaguaDoors from './BaguaDoors.vue'
import {wenKey, reorderKey} from './HexaGrid.vue'
import {setQuadrantKey} from './ChangeNode.vue'

export default defineComponent({
  name: 'HexaFrame',
  components: {
    Bagua: BaguaDoors,
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
      if (!reorderTiles || !setQuadrant) throw new Error('fluck')
      reorderTiles()
      setQuadrant()
    }

    return {
      baguad,
      reorder,
      wenny: inject(wenKey, false),
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

.hexagram:hover,
.hexagram:focus,
.hexagram:active {
  color: var(--link);
}

.order {
  position: absolute;
  top: var(--frame);
  right: var(--frame);
  cursor: pointer;
}
</style>

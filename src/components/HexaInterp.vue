<template lang="pug">
.interp(@click.stop="showLines")
  transition(name="slide-fade" mode="out-in" appear)
    .lines.right.clickable(v-if="liney && linesShown")
      h3 Changing Lines
      .line(v-for="gram in hex.lines" :key="$symbolize(hex.binary)")
        LineGram(:content="gram" :toss="toss")
    .images.left(v-else :class="{clickable: liney}")
      //- h3 Images
      pre.image {{ hex.images }}
</template>

<script lang="ts">
import {ref, defineComponent, PropType, computed} from 'vue'
import {Hexagram, defHex} from '../schema'
import LineGram from './LineGram.vue'
import {activeRoll} from '../store/rolls'

export default defineComponent({
  name: 'HexaInterp',
  components: {
    LineGram,
  },
  props: {
    hex: {
      type: Object as PropType<Hexagram>,
      default: defHex,
    },
    liney: Boolean,
  },
  setup(props) {
    const linesShown = ref(props.liney)
    const toss = computed(() => activeRoll.value.toss)

    function showLines() {
      if (props.hex.lines.length > 0 && props.liney) {
        linesShown.value = !linesShown.value
      }
    }
    return {
      toss,
      linesShown,
      showLines,
    }
  },
})
</script>

<style lang="postcss">
.interp {
  padding: 1rem 0 2rem;
  font-family: var(--text);
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

pre.judgment,
pre.image {
  line-height: var(--leading);
  font-family: var(--text);
}
</style>

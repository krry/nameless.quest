<template lang="pug">
.interp(@click.stop="showLines")
  h3 Judgement
  pre.judgment {{ hex.judgment }}
  .hexagram.clickable(@click.stop="$emit('flip')") {{ hex.hexagram }}
  transition(name="slide" mode="out-in" appear)
    .lines.right.clickable(v-if="linesShown")
      h3 Changing Lines
      .line(v-for="gram in hex.lines" :key="$getSymbol(hex.binary)")
        Gram(:content="gram")
    .images.left.clickable(v-else)
      h3 Images
      pre.image {{ hex.images }}
</template>

<script lang="ts">
import {ref, defineComponent, PropType} from 'vue'
import {Hexagram, defHex} from '../schema'
import LineGram from './LineGram.vue'

export default defineComponent({
  name: 'HexaInterp',
  components: {
    Gram: LineGram,
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

    function showLines() {
      if (props.hex.lines.length > 0) {
        linesShown.value = !linesShown.value
      }
    }
    return {
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
  font-weight: 300;
  font-family: var(--text);
}

.hexagram {
  margin: 0 auto;
  font-size: 4em;
  transition: var(--beat);
  transform-origin: center center;
}

.hexagram.turned {
  transform: rotateZ(-90deg);
}

.slide-enter-active,
.slide-leave-active {
  transition: var(--beat) var(--ease-in-out-quad);
}

.slide-leave-from,
.slide-enter-to {
  opacity: 1;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-leave-from.right,
.slide-enter-to.right {
  transform: translateX(0);
}

.slide-leave-to.left,
.slide-enter-from.left {
  transform: translateX(-20em);
}

.slide-leave-to.right,
.slide-enter-from.right {
  transform: translateX(20em);
}
</style>

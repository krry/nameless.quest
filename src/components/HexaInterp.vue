<template lang="pug">
.interp(@click.stop="showLines")
  transition(name="slide-fade" mode="out-in" appear)
    .lines.right.clickable(v-if="linesShown")
      //- h3 Changing Lines
      .line(v-for="gram in hex.lines" :key="$symbolize(hex.binary)")
        LineGram(:content="gram" :toss="user.toss")
    .images.left(v-else :class="{clickable: liney}")
      //- h3 Images
      pre.image.font.md {{ hex.images }}
</template>

<script lang="ts">
import {ref, defineComponent, PropType} from 'vue'
import {Hexagram, defHex} from '../schema'
import LineGram from './LineGram.vue'
import {user} from '../store/user'

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

    function showLines() {
      if (props.hex.lines.length > 0 && props.liney) {
        linesShown.value = !linesShown.value
      }
    }
    return {
      user,
      linesShown,
      showLines,
    }
  },
})
</script>

<style lang="postcss" scoped>
.interp {
  padding: 1rem 0 2rem;
  font-family: var(--text);
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

pre.image {
  line-height: var(--leading);
  font-family: var(--text);
}
</style>

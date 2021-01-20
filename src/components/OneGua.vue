<template lang="pug">
.gua(:class="{turned: !texty}")
  .col
    .trigram {{ trigrams[gua].trigram }}
  .col
    span.mand-name {{ trigrams[gua].name.zh + " "}}
    span.pnyn-name  {{ trigrams[gua].name.pn }}
    .eng-name {{ trigrams[gua].name.en }}
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import trigramData from '../data/trigrams.json'

export default defineComponent({
  name: 'OneGua',
  props: {
    gua: {
      type: Number,
      default: 0,
    },
    above: Boolean,
    texty: Boolean,
  },
  setup() {
    const trigrams = trigramData
    return {trigrams}
  },
})
</script>

<style lang="postcss" scoped>
.gua {
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  justify-content: space-evenly;
}

.trigram {
  font-size: 2.5em;
  line-height: 1;
  transition: transform 444ms ease-in-out;
}

.turned .trigram {
  transform: rotateZ(-90deg);
}
</style>
<style lang="postcss">
.glyphs .trigram {
  font-size: 3rem;
}

@media (min-width: 36rem) {
  .glyphs .trigram {
    font-size: 4rem;
  }
}
</style>

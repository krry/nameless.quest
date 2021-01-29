<template lang="pug">
.gua
  .col
    TriGlyph( :tri="trigrams[gua].trigram" )
  .col
    span.mand-name {{ trigrams[gua].name.zh + " "}}
    span.pnyn-name  {{ trigrams[gua].name.pn }}
    .eng-name {{ trigrams[gua].name.en }}
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {cfg, tog} from '../store/cfg'
import TriGlyph from '../components/TriGlyph.vue'
import trigramData from '../data/trigrams.json'

export default defineComponent({
  name: 'OneGua',
  components: {
    TriGlyph,
  },
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

    return {
      tog,
      cfg,
      trigrams,
    }
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
  transform-origin: center center;
  transition: transform var(--beat) var(--ease-out-quad);
}
</style>
<style lang="postcss">
.glyphs .triglyph {
  font-size: 3rem;

  @media (min-width: 36rem) {
    font-size: 4rem;
  }
}
</style>

<template lang="pug">
.face.face--back
  LogoBrand(direction="bottom" size="sm")
  blockquote
    h3 {{user.query.trim()}}
  h2 Your Toss
  .glyphs
    IconBase.line(
      v-for="char in user.toss"
      :key="char"
      :icon-name="char"
      )
      component(:is="`Icon${char}`")
  aside.help ☯
  h2 The Oracle's response
  .flex.wrap
    .result.being.half(
      v-for="hex in hexs"
      :key="$symbolize(hex.binary)")
      h3.font.x3l
        HexaGlyph(:hex="hex.hexagram")
        HanziChar(:char="hex.names.chinese" :pinyin="hex.names.pinyin" size="lg" reveal)
      router-link.btn.naked(:to="'/change/'+hex.kingwen")
        span {{ user.wenny ? hex.kingwen : hex.octal }}
        span {{ hex.names.english }}
  button.back(
    type="button"
    :title="'Start Over'"
    @click="$emit('back')"
    ) ♽
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import IconBase from '../icons/IconBase.vue'
import Icon6 from '../icons/Icon6.vue'
import Icon7 from '../icons/Icon7.vue'
import Icon8 from '../icons/Icon8.vue'
import Icon9 from '../icons/Icon9.vue'
import LogoBrand from './LogoBrand.vue'
import HexaGlyph from './HexaGlyph.vue'
import HanziChar from './HanziChar.vue'
import {useHexagrams} from '../composables/hexagrams'
import {user} from '../store/user'
import {activeLots} from '../store/lots'

export default defineComponent({
  name: 'OracleResponse',
  components: {
    IconBase,
    Icon6,
    Icon7,
    Icon8,
    Icon9,
    HexaGlyph,
    LogoBrand,
    HanziChar,
  },
  emits: ['back'],
  setup() {
    const {getHexagramByBin} = useHexagrams()
    const hexs = activeLots.value.map((l: string) => getHexagramByBin(l))

    return {
      user,
      hexs,
    }
  },
})
</script>

<style lang="postcss" scoped>
h2 {
  margin: 1em 0 0.25em;
}

aside.help {
  font-size: 2em;
  margin: 0.5em auto;
}

button.back {
  appearance: none;
  cursor: pointer;
  font-size: 1.5em;
  position: absolute;
  color: inherit;
  top: 0;
  left: 0;
  border: 0;
  padding: 0.5rem;
  width: 3rem;
  background: transparent;
}

.back:hover,
.back:focus {
  opacity: 1;
}

.line {
  height: 3em;
  width: 1em;
  margin: 0 0.125em;
}

.line.valid {
  color: var(--good);
}
</style>

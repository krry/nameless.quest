<template lang="pug">
.names
  .glyphs
    HanziChar(
      v-for="(char, index) in names.chinese"
      :key="$symbolize(char)"
      :char="char"  
      :pinyin="pinyin[index]"
      size="xl"
      reveal
      )
  h3.yingyu(@click.stop="$emit('flip')") {{ names.english }}
  .orders(@click.stop="reorder")
    .kingwen(v-if="wenny") King Wen \#{{ kingwen }}
    .octal(v-if="!wenny") Octal \#{{ octal.slice(1) }}
</template>

<script lang="ts">
import {defineComponent, PropType, reactive, toRefs, computed, inject} from 'vue'
import {defHex, Hexaname} from '../schema'
import {cfg} from '../store/cfg'
import HanziChar from './HanziChar.vue'
import {reorderKey} from './HexaGrid.vue'
import {setQuadrantKey} from './ChangeNode.vue'

export default defineComponent({
  name: 'HexaNames',
  components: {
    HanziChar,
  },
  props: {
    names: {
      type: Object as PropType<Hexaname>,
      default: defHex.names,
    },
    kingwen: {
      type: Number,
      default: defHex.kingwen,
    },
    octal: {
      type: String,
      default: defHex.octal,
    },
  },
  emits: ['flip'],
  setup(props) {
    const setQuadrant = inject(setQuadrantKey)
    const reorderTiles = inject(reorderKey)
    const hanziData = reactive({
      wenny: cfg.wenny,
      pinyin: computed(() => props.names.pinyin.split(' ')),
      arrayedHanzi: computed((): string[] => {
        if (!props.names.chinese) {
          return []
        }
        return props.names.chinese.split('')
      }),
    })

    function reorder() {
      if (!reorderTiles || !setQuadrant) throw new Error('fwuck')
      reorderTiles()
      setQuadrant()
    }

    return {
      reorder,
      ...toRefs(hanziData),
    }
  },
})
</script>

<style lang="postcss" scoped>
.glyphs {
  height: 3em;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  position: relative;
  font-size: 1.5rem;
  transition: color var(--bea2) var(--ease-in-out-quad);
  margin-bottom: 1rem;
}

.glyphs:hover,
.glyphs:focus {
  color: var(--link);
}

.binary {
  position: absolute;
  bottom: 3rem;
  left: 0;
  right: 0;
  margin: auto;
}

.text {
  text-align: justify;
}

.names {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  flex: 1 0 auto;
}

@media (min-width: 48rem) {
  .names {
    justify-content: center;
  }
}

.yingyu {
  margin-top: 0;
  margin-bottom: 0.5em;
  color: var(--flair);
  font-size: 1.5em;
  cursor: pointer;
}

.orders {
  cursor: pointer;
  margin: 0.5rem;
  color: var(--link);
}

.orders:hover,
.orders:focus {
  color: var(--link);
}
</style>

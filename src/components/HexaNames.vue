<template lang="pug">
.names
  .glyphs
    HanziChars(
      v-for="(char, index) in names.chinese"
      :key="$getSymbol(char)"
      :char="char"  
      :pinyin="pinyin[index]"
      reveal
      )
  h3.yingyu(@click.stop="$emit('flip')") {{ names.english }}
  .orders(@click.stop="reorder")
    .kingwen(v-if="wenny") King Wen \#{{ kingwen }}
    .octal(v-if="!wenny") Octal \#{{ octal }}
</template>

<script lang="ts">
import {defineComponent, PropType, reactive, toRefs, computed, inject} from 'vue'
import {defHex, Hexaname} from '../schema'
import HanziChars from './HanziChars.vue'
import {wenKey, reorderKey} from './HexaGrid.vue'
import {setQuadrantKey} from './ChangeNode.vue'

export default defineComponent({
  name: 'HexaNames',
  components: {
    HanziChars,
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
      wenny: inject(wenKey, false),
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
  transition: color var(--beat);
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
    justify-content: flex-end;
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
  font-weight: 300;
}

.orders:hover,
.orders:focus {
  color: var(--link);
}
</style>
<style lang="postcss">
.slide-fade-enter-active,
.slide-fade-leave-active {
  transform: translateZ(0);
}

.slide-fade-enter-active {
  transition: all 0.3s var(--ease-out-cubic);
}

.slide-fade-leave-active {
  transition: all 0.3s var(--ease-in-cubic);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateZ(0);
}

.slide-fade-enter-from.over,
.slide-fade-leave-to.over {
  transform: translateY(1em);
  opacity: 0;
}

.slide-fade-enter-from.under,
.slide-fade-leave-to.under {
  transform: translateY(-1em);
  opacity: 0;
}

.slide-fade-enter-from.right,
.slide-fade-leave-to.right {
  transform: translateX(20em);
  opacity: 0;
}

.slide-fade-enter-from.left,
.slide-fade-leave-to.left {
  transform: translateX(-20em);
  opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  transform: translateY(0) translateX(0) translateZ(0);
  opacity: 1;
}
</style>

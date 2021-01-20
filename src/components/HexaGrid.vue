<template lang="pug">
transition-group(
  class="hexagrid"
  tag="main"
  :style="{backgroundImage: backdrop}"
  @click.stop="showCards([''])"
  )
  ChangeNode(
    v-for="[identifier, change] in hexagrams.entries()"
    :key="change.binary"
    :hex="change"
    :hexId="change.binary"
    :roll="roll"
    @show="showCards"
    @hide="hideCard"
    )
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  computed,
  provide,
  InjectionKey,
  PropType,
} from 'vue'

import ChangeNode from './ChangeNode.vue'
import {useRolls} from '../composables/rolls'
import {useHexagrams} from '../composables/hexagrams'
import {activeTheme} from '../composables/themes'
import {checkForFreshSavedData} from '../utils/tosses'

export const wenKey = Symbol('wenny')
export const reorderKey = Symbol('reorder') as InjectionKey<() => void>

export default defineComponent({
  name: 'HexaGrid',
  components: {
    ChangeNode,
  },
  props: {
    lots: {
      type: Array as PropType<string[]>,
      default: () => [''],
    },
  },
  emits: ['show', 'hide'],
  setup(props, context) {
    const wenny = ref(false)
    const rand = ref(1)
    const {getHexagrams} = useHexagrams()
    const {getActiveRoll} = useRolls()
    const theme = ref(activeTheme)

    function sizeBg() {
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight
      const smallerDim = screenWidth < screenHeight ? screenWidth : screenHeight
      if (smallerDim > 1080) return 'bg-lg/'
      if (smallerDim > 576) return 'bg-md/'
      else return 'bg-sm/'
    }

    const rx = reactive({
      roll: computed(() => {
        return (
          getActiveRoll() || {
            query: checkForFreshSavedData('query'),
            toss: checkForFreshSavedData('toss'),
          }
        )
      }),
      hexagrams: computed(() => getHexagrams(wenny.value)),
      backdrop: computed(() => {
        return 'url(/' + sizeBg() + theme.value + rand.value + '.jpg)'
      }),
      rolly: computed(() => getActiveRoll() !== undefined),
    })

    function showCards(bins: string[]) {
      context.emit('show', bins)
    }

    function hideCard(bin: string) {
      context.emit('hide', bin)
    }

    function hideDuringShuffle() {
      const lots = props.lots
      showCards([''])
      setTimeout(() => {
        return showCards(lots)
      }, 1250)
    }

    function reorderTiles() {
      hideDuringShuffle()
      rand.value = Math.floor(Math.random() * 3) + 1
      wenny.value = !wenny.value
    }

    provide(wenKey, wenny)
    provide(reorderKey, reorderTiles)

    return {
      showCards,
      hideCard,
      ...toRefs(rx),
    }
  },
})
</script>

<style scoped lang="postcss">
.hexagrid {
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  background-color: var(--paper);
  background-repeat: no-repeat;
  background-position: right center;
  background-attachment: fixed;
  background-size: cover;
  font-size: var(--font-clamp);
  min-width: 100vw;
  /* border: 1px solid var(--glow); */
  box-shadow: 0 0 1em var(--glow);
  border-left: var(--frame) solid var(--glow);
  border: var(--frame) solid var(--glow);
  pointer-events: auto;
  margin-left: var(--drawer-buffer);
  transition: var(--bea2);
  scroll-snap-align: start;
  min-height: calc(100vh + 1px);

  @media (min-width: 36rem) and (min-height: 36rem) {
    min-height: 100vh;
  }

  @media (min-width: 36rem) {
    margin-left: var(--drawer-dim);
  }
}
</style>

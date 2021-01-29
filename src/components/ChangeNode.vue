<template lang="pug">
article.change-node(
  :class="{active: isActive}"
  @keydown.esc="clearLots()"
  )
  transition(name="deal" mode="out-in" appear)
    Card(
      ref="card"
      v-if="isActive"
      :hex="hex"
      :mark="mark"
      :liney="liney"
      :quad="setQuadrant()"
      @close="removeLot(hexId)"
    )
  Frame(:hex="hex")
  Tile.tile(
    ref="tile"
    :tabindex="wenny ? hex.kingwen + 9 : hex.octal + 9"
    :names="hex.names"
    @click.stop="saveLot(hexId)"
    @keyup.enter="saveLot(hexId)"
    )
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  reactive,
  toRef,
  toRefs,
  provide,
  InjectionKey,
  watchEffect,
  onMounted,
  computed,
} from 'vue'

import {defHex, Hexagram, defQuad, Quad} from '../schema'
import {determineQuadrant} from '../utils/cards'
import {cfg} from '../store/cfg'
import {activeLots, saveLot, removeLot, clearLots} from '../store/lots'
import HexaCard from './HexaCard.vue'
import HexaTile from './HexaTile.vue'
import HexaFrame from './HexaFrame.vue'

export const setQuadrantKey = Symbol('quadrant') as InjectionKey<() => Quad>

export default defineComponent({
  name: 'ChangeNode',
  components: {
    Card: HexaCard,
    Tile: HexaTile,
    Frame: HexaFrame,
  },
  props: {
    hex: {
      type: Object as PropType<Hexagram>,
      default: defHex,
      required: true,
    },
    hexId: {
      type: String,
      default: '0b000000',
    },
  },
  setup(props) {
    const hex = toRef(props, 'hex')

    const rx = reactive({
      card: ref(),
      tile: ref(),
      mark: ref(''),
      liney: false,
      hex,
      quadrant: ref<Quad>(),
      id: toRef(props, 'hexId'),
      wenny: cfg.wenny,
      isActive: computed(() => {
        // console.log('activeLots', activeLots.value)
        // console.log('hex.binary', hex.value.binary)
        // console.log(
        //   'activeLots()?.indexOf(rx.hex.binary)',
        //   activeLots.value.indexOf(hex.value.binary),
        // )
        return activeLots.value?.indexOf(hex.value.binary) === 0
      }),
      isBecoming: computed(() => {
        return activeLots.value?.indexOf(hex.value.binary) === 1
      }),
    })

    function setQuadrant(e: Event): Quad {
      if (!rx.tile) return defQuad
      let el = rx.tile.$el || e.target
      if (!el) return defQuad
      const bounds = el.getBoundingClientRect()
      // console.log("setting quadrant by tile bounds", bounds);
      return determineQuadrant(bounds)
    }

    function notSolo(arr: string[]): boolean {
      return typeof arr[0] !== 'undefined' && typeof arr[1] !== 'undefined' && arr[1] !== ''
    }

    onMounted(() => {
      watchEffect(() => {
        // only show marks when two cards
        // only show changing lines on first card
        if (rx.isActive && notSolo(activeLots.value)) {
          rx.liney = true
          rx.mark = '𐡷 Being 𐡸'
          if (!rx.card || !rx.card.$el) return
          rx.card.$el.focus()
        }
        if (rx.isBecoming) {
          rx.liney = false
          rx.mark = '𐡸 Becoming 𐡷'
        }
      })
    })

    provide(setQuadrantKey, setQuadrant)

    return {
      saveLot,
      removeLot,
      clearLots,
      setQuadrant,
      ...toRefs(rx),
    }
  },
})
</script>

<style lang="postcss" scoped>
.change-node {
  border: 1px solid var(--glow);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.61em;
  position: relative;
  text-align: center;
  transition-property: background-color, border-color, color;
  transition-duration: var(--b3at);
  transition-timing-function: var(--ease-out-quad);
  background-color: var(--silk);
  min-width: 9em;
  min-height: 6.67em;
}

.change-node:hover {
  transition-duration: 100ms;
}

.change-node:hover,
.change-node:focus-within {
  color: var(--ground);
  border-color: var(--ground);
  background-color: var(--flair);
}

/*
 * IMPORTANT:
 * this corresponds to the position of the card based on the tiles position as calculated in `utils/cards.ts`
 * check `HexaCard.vue` for the styles that position the card once it is dealt
 */

@media (min-width: 36rem) and (min-height: 36rem) {
  .deal-enter-to,
  .deal-leave-from {
    transform: translate3d(-50%, 0, 0) scale(1);
  }

  .deal-leave-to {
    transform: translate3d(-50%, -300%, 0) scale(0.5) rotate(360deg);
  }

  .change-node:nth-of-type(8n) .deal-enter-from {
    transform: translate3d(-50%, 0%, 0) scale(0.25) rotateX(180deg) rotateZ(-180deg);
  }

  .change-node:nth-of-type(8n-1) .deal-enter-from {
    transform: translate3d(-50%, 0%, 0) scale(0.25) rotateX(-180deg) rotateZ(180deg);
  }

  .change-node:nth-of-type(8n-2) .deal-enter-from {
    transform: translate3d(-50%, 0%, 0) scale(0.25) rotateX(-180deg) rotateZ(-180deg);
  }

  .change-node:nth-of-type(8n-3) .deal-enter-from {
    transform: translate3d(-50%, 0%, 0) scale(0.25) rotateY(-180deg) rotateZ(180deg);
  }

  .change-node:nth-of-type(8n-4) .deal-enter-from {
    transform: translate3d(-50%, 0%, 0) scale(0.25) rotateY(180deg) rotateZ(-180deg);
  }

  .change-node:nth-of-type(8n-5) .deal-enter-from {
    transform: translate3d(-50%, 0%, 0) scale(0.25) rotateY(-180deg) rotateZ(-180deg);
  }

  .change-node:nth-of-type(8n-6) .deal-enter-from {
    transform: translate3d(-50%, 0%, 0) scale(0.25) rotateX(180deg) rotateZ(180deg);
  }

  .change-node:nth-of-type(8n-7) .deal-enter-from {
    transform: translate3d(-50%, 0%, 0) scale(0.25) rotateY(180deg) rotateZ(180deg);
  }
}
</style>

<template lang="pug">
article.change-node(
  :class="{active: showing}"
  @keydown.esc="showCards([''])"
  )
  transition(name="deal" mode="out-in" appear)
    Card(
      ref="card"
      v-if="showing"
      :hex="hex"
      :mark="mark"
      :liney="liney"
      @close="hideCard([hexId])"
      :quad="setQuadrant()"
    )
  Frame(:hex="hex")
  Tile.tile(
    ref="tile"
    @click.stop="showCards(e, [hexId])"
    @keyup.enter="showCards(e, [hexId])"
    :names="hex.names"
    :tabindex="wenny ? hex.kingwen : hex.octal"
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
  inject,
  InjectionKey,
  watchEffect,
  onMounted,
  computed,
} from 'vue'
import {defHex, Hexagram, defQuad, Quad, Roll, defRoll} from '../schema'
import {wenKey} from './HexaGrid.vue'
import {useLot} from '../composables/lots'
import {determineQuadrant} from '../utils/cards'
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
    roll: {
      type: Object as PropType<Roll>,
      default: defRoll,
    },
  },
  emits: ['show', 'hide'],
  setup(props) {
    const changeData = reactive({
      card: ref(),
      tile: ref(),
      mark: ref(''),
      liney: ref(false),
      quadrant: ref<Quad>(),
      hex: toRef(props, 'hex'),
      id: toRef(props, 'hexId'),
      wenny: inject(wenKey, false),
    })

    function setQuadrant(e: Event): Quad {
      if (!changeData.tile) return defQuad
      let el = changeData.tile.$el || e.target
      if (!el) return defQuad
      const bounds = el.getBoundingClientRect()
      // console.log("setting quadrant by tile bounds", bounds);
      return determineQuadrant(bounds)
    }

    const {isActive} = useLot(changeData)
    const showing = computed(() => isActive.value !== -1)

    onMounted(() => {
      watchEffect(() => {
        // only show marks when two cards
        // only show changing lines on first card
        if (isActive.value === 0 && props.roll.toss) {
          changeData.liney = true
          changeData.mark = 'Being'
          if (!changeData.card || !changeData.card.$el) return
          changeData.card.$el.focus()
        }
        if (isActive.value === 1) {
          changeData.liney = false
          changeData.mark = 'Becoming'
        }
      })
    })

    provide(setQuadrantKey, setQuadrant)

    return {
      showing,
      setQuadrant,
      ...toRefs(changeData),
    }
  },
  methods: {
    showCards(ev: MouseEvent, bins: string[]): void {
      // detect center of this element
      // detect distance of click event from
      this.$emit('show', bins)
    },
    hideCard(bin?: string): void {
      if (!bin) this.$emit('show', [''])
      else this.$emit('hide', bin)
    },
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
  transition: var(--be4t) var(--ease-in-out-cubic);
  background-color: var(--silk);
  min-width: 9em;
  min-height: 6.67em;
}

.change-node.active {
  color: var(--ground);
  border-color: var(--ground);
  background-color: var(--glow);
}

.deal-enter-active,
.deal-leave-active {
  transform-origin: center center;
}

.deal-enter-active {
  transition: var(--b3at) var(--ease-in-out-quad);
}

.deal-leave-active {
  transition: var(--bea2) var(--ease-in-quad);
}

.deal-enter-to,
.deal-leave-from {
  opacity: 1;
  transform: translateY(0) rotateZ(0);
}

.deal-leave-to,
.deal-enter-from {
  opacity: 0;
  transform: scale(0.2) translateY(180deg);
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
    transform: translate3d(-50%, 0%, 0) scale(0.2) rotateX(180deg) rotateZ(-180deg);
  }

  .change-node:nth-of-type(8n-1) .deal-enter-from {
    transform: translate3d(-50%, 0%, 0) scale(0.2) rotateX(-180deg) rotateZ(180deg);
  }

  .change-node:nth-of-type(8n-2) .deal-enter-from {
    transform: translate3d(-50%, 0%, 0) scale(0.2) rotateX(-180deg) rotateZ(-180deg);
  }

  .change-node:nth-of-type(8n-3) .deal-enter-from {
    transform: translate3d(-50%, 0%, 0) scale(0.2) rotateY(-180deg) rotateZ(180deg);
  }

  .change-node:nth-of-type(8n-4) .deal-enter-from {
    transform: translate3d(-50%, 0%, 0) scale(0.2) rotateY(180deg) rotateZ(-180deg);
  }

  .change-node:nth-of-type(8n-5) .deal-enter-from {
    transform: translate3d(-50%, 0%, 0) scale(0.2) rotateY(-180deg) rotateZ(-180deg);
  }

  .change-node:nth-of-type(8n-6) .deal-enter-from {
    transform: translate3d(-50%, 0%, 0) scale(0.2) rotateX(180deg) rotateZ(180deg);
  }

  .change-node:nth-of-type(8n-7) .deal-enter-from {
    transform: translate3d(-50%, 0%, 0) scale(0.2) rotateY(180deg) rotateZ(180deg);
  }
}
</style>

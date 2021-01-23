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
    @click.stop="showCards([hexId])"
    @keyup.enter="showCards([hexId])"
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

import {defHex, Hexagram, defQuad, Quad} from '../schema'
import {determineQuadrant} from '../utils/cards'
import {useLot} from '../composables/lots'
import {wenKey} from './HexaGrid.vue'
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
    toss: {
      type: String,
      default: '666666',
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
        // console.log('props.toss', props.toss)
        if (isActive.value === 0 && props.toss) {
          changeData.liney = true
          changeData.mark = '𐡷 Being 𐡸'
          if (!changeData.card || !changeData.card.$el) return
          changeData.card.$el.focus()
        }
        if (isActive.value === 1) {
          changeData.liney = false
          changeData.mark = '𐡸 Becoming 𐡷'
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
    showCards(bins: string[]): void {
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
  transition: var(--b3at) var(--ease-in-out-cubic);
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
  transform: rotateX(0) rotateY(0) rotate(0) scale(1);
}

.deal-enter-from,
.deal-leave-to {
  opacity: 0;
  transform: rotateX(0) rotateY(-180deg) rotate(0) scale(0.5);
}

.change-node:nth-of-type(8n-7) .deal-enter-from {
  transform: rotateX(-180deg) rotate(-180deg) scale(0.25);
}

.change-node:nth-of-type(8n-3) .deal-enter-from {
  transform: rotateX(-180deg) rotate(180deg) scale(0.25);
}

.change-node:nth-of-type(8n-6) .deal-enter-from {
  transform: rotateY(-180deg) rotate(-180deg) scale(0.25);
}

.change-node:nth-of-type(8n-2) .deal-enter-from {
  transform: rotateY(-180deg) rotate(180deg) scale(0.25);
}

.change-node:nth-of-type(8n-5) .deal-enter-from {
  transform: rotateX(180deg) rotate(-180deg) scale(0.25);
}

.change-node:nth-of-type(8n-1) .deal-enter-from {
  transform: rotateX(180deg) rotate(180deg) scale(0.25);
}

.change-node:nth-of-type(8n-4) .deal-enter-from {
  transform: rotateY(180deg) rotate(-180deg) scale(0.25);
}

.change-node:nth-of-type(8n) .deal-enter-from {
  transform: rotateY(180deg) rotate(180deg) scale(0.25);
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

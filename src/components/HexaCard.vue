<template lang="pug">
.sleeve(
  tabindex="0"
  :class="quad.yPos, quad.xPos, quad.edge, quad.middle, {flipped: cfg.texty}"
  )
  .card(
    ref="card"
    :class="{flipped: cfg.texty}"
    )
    transition(name="flip")
      HexaFace(
        v-if="!cfg.texty"
        class="face face--front"
        :kingwen="hex.kingwen"
        @close="$emit('close')"
        tabindex="-1"
        )
        template(#top)
          .mark(v-if="mark") {{mark}}
          HexaNames(
            :names="hex.names"
            :kingwen="hex.kingwen"
            :octal="hex.octal"
            )
        template(#bottom)
          .cross.horiz
            .glyphs
              OneGua(:gua="hex.trigramPair.above")
            .stack
              HexaGlyph(:hex="hex.hexagram")
              .binary {{ hex.binary.slice(2) }}
            .glyphs
              OneGua(:gua="hex.trigramPair.below")
      HexaFace(
        v-else
        class="face face--back"
        :kingwen="hex.kingwen"
        @close="$emit('close')"
        tabindex="-1"
        )
        template(#top)
          .mark(v-if="mark") {{mark}}
          HexaGlyph(:hex="hex.hexagram")
          h2.yingyu {{ hex.names.english }}
          //- h3 Judgement
          pre.judgment {{ hex.judgment }}
        template(#bottom)
          HexaInterp(
            :hex="hex"
            :liney="liney")
</template>
<script lang="ts">
import {defineComponent, PropType, ref, reactive, toRefs, onMounted} from 'vue'
import {defHex, Quad, defQuad, Hexagram} from '../schema'
import {useSwipeable} from '../composables/swipeable'
import {cfg, tog} from '../store/cfg'
import OneGua from './OneGua.vue'
import HexaFace from './HexaFace.vue'
import HexaGlyph from './HexaGlyph.vue'
import HexaNames from './HexaNames.vue'
import HexaInterp from './HexaInterp.vue'

export default defineComponent({
  name: 'HexaCard',
  components: {
    OneGua,
    HexaFace,
    HexaGlyph,
    HexaNames,
    HexaInterp,
  },
  props: {
    hex: {
      type: Object as PropType<Hexagram>,
      default: defHex,
    },
    quad: {
      type: Object as PropType<Quad>,
      default: defQuad,
    },
    liney: Boolean,
    mark: {
      type: String,
      default: '',
    },
  },
  emits: ['close', 'focus'],
  setup() {
    const {handleSwipeStart, handleSwipeEnd} = useSwipeable()
    const rx = reactive({
      card: ref<HTMLElement>(),
      interpShown: false,
    })

    onMounted(() => {
      const gestureZone = rx.card
      if (!gestureZone) return
      gestureZone.addEventListener('touchstart', handleSwipeStart, false)
      gestureZone.addEventListener('touchend', handleSwipeEnd, false)
    })

    return {
      tog,
      cfg,
      ...toRefs(rx),
    }
  },
})
</script>

<style lang="postcss" scoped>
.mark {
  font-size: 1rem;
  font-weight: 700;
  border-radius: 100%;
  padding: 0.25em;
  color: var(--glow);
  margin-top: -2.75em;
  text-align: center;
}

.sleeve {
  position: fixed;
  top: 10%;
  right: 5%;
  left: 5%;
  overflow: visible;
  text-align: left;
  z-index: 20;
}

.card {
  position: absolute;
  z-index: 21;
  font-size: 1.125em;
}

.sleeve,
.card {
  width: 92vw;
  height: 22rem;

  @media (min-width: 36rem) {
    width: 30rem;
  }

  @media (min-height: 36rem) {
    height: 32rem;
  }

  @media (min-height: 48rem) {
    height: calc(61vh + 2.5vw);
  }
}

.active .sleeve {
  z-index: 25;
}

.active .sleeve:focus-within {
  z-index: 26;
}

@media (min-width: 48rem) and (min-height: 36rem) {
  .card.flipped,
  .sleeve.flipped,
  .sleeve,
  .card {
    font-size: 1.125em;
    width: 28rem;
    height: 57vh;
  }
}

.face {
  color: var(--ink);
  background-color: var(--paper);
}

.cross.horiz {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  min-width: 16em;
  padding-bottom: 2rem;
}

.stack {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.glyphs {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-align: center;
}

@media (orientation: landscape) and (max-height: 35.92rem) {
  .sleeve {
    left: 40%;
    right: 5%;
    top: 0;
    bottom: 5%;
  }

  .sleeve,
  .card {
    width: 24em;
    height: 100vh;
  }
}

@media (min-width: 36rem) and (min-height: 36rem) {
  .sleeve {
    position: absolute;
    margin: auto;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }

  .sleeve.top {
    top: calc(100% + 1.25rem);
    bottom: unset;
  }

  .sleeve.bottom {
    bottom: calc(100% + 1.25rem);
    top: unset;
  }

  .sleeve.top.middle {
    top: 10%;
  }

  .sleeve.bottom.middle {
    bottom: -70%;
  }

  .sleeve.middle.right {
    left: 100%;
  }

  .sleeve.middle.left {
    right: 100%;
  }

  .sleeve.right.edge {
    right: -100%;
    left: 20%;
  }

  .sleeve.left.edge {
    left: 100%;
  }

  .sleeve.left.extreme {
    left: 200%;
  }

  .sleeve.right.extreme {
    left: -100%;
  }

  .sleeve.left.edge.middle {
    left: 100%;
  }
}
</style>

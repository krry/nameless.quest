<template lang="pug">
.sleeve(
  ref="sleeve"
  tabindex="0"
  :class="quad.yPos, quad.xPos, quad.edge, quad.middle, {flipped: texty}"
  )
  .card(:class="{flipped: texty}")
    transition(name="flip")
      HexaFace(
        v-if="!texty"
        class="face face--front"
        @close="$emit('close')"
        @click.stop="$emit('focus')"
        @flip="toggleTexty"
        )
        template(#top)
          HexaNames(
            :names="hex.names"
            :kingwen="hex.kingwen"
            :octal="hex.octal"
            @flip="toggleTexty"
            )
          .mark(v-if="mark") {{mark}}
        template(#bottom)
          .cross.horiz
            .glyphs
              OneGua(:gua="hex.trigramPair.above")
            .hexandbin.stack.clickable(@click.stop="toggleTexty")
              .hexagram.turned {{ hex.hexagram }}
              .binary {{ hex.binary.slice(2) }}
            .glyphs
              OneGua(:gua="hex.trigramPair.below" :texty="texty")
          router-link.moar.btn.naked.abs.t.l.no-underline.clickable(:to="'/change/' + hex.kingwen")
            IconBase(viewBox="0 -100 1000 800" height="36" width="36")
              IconScroll
            | More
      HexaFace(
        v-else
        class="face face--back"
        @click.stop="$emit('focus')"
        @close="$emit('close')"
        )
        template(#top)
          HexaNames(
            :names="hex.names"
            :kingwen="hex.kingwen"
            :octal="hex.octal"
            )
          .mark(v-if="mark") {{mark}}
        template(#bottom)
          HexaInterp(
            :hex="hex"
            @flip="toggleTexty"
            :liney="liney")
</template>

<script lang="ts">
import {defineComponent, PropType, ref, reactive, toRefs} from 'vue'
import {defHex, Quad, defQuad, Hexagram} from '../schema'
import OneGua from './OneGua.vue'
import IconBase from './icons/IconBase.vue'
import IconScroll from './icons/IconScroll.vue'
import HexaFace from './HexaFace.vue'
import HexaNames from './HexaNames.vue'
import HexaInterp from './HexaInterp.vue'

export default defineComponent({
  name: 'HexaCard',
  components: {
    OneGua,
    HexaFace,
    HexaNames,
    HexaInterp,
    IconBase,
    IconScroll,
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
    const cardData = reactive({
      sleeve: ref(),
      texty: ref(false),
      interpShown: ref(false),
    })

    function toggleTexty() {
      cardData.texty = !cardData.texty
    }

    return {
      toggleTexty,
      ...toRefs(cardData),
    }
  },
})
</script>

<style lang="postcss" scoped>
.moar.btn.naked {
  padding: 0 0.5em 0.5em;
  margin: 0.25rem;
}

.mark {
  position: absolute;
  bottom: 0.25rem;
  left: 0.25em;
  font-size: 1.5em;
  font-weight: 700;
  border-radius: 100%;
  border: 1px dashed var(--glow);
  padding: 0.25em;
  color: var(--glow);
  width: 1.5em;
  height: 1.5em;
  line-height: 1;
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
}

@media (min-width: 36rem) {
  .sleeve,
  .card {
    width: 30rem;
  }
}

@media (min-height: 36rem) {
  .sleeve,
  .card {
    height: 32rem;
  }
}

.active .sleeve {
  z-index: 25;
}

.active .sleeve:focus-within {
  z-index: 26;
}

.card.flipped,
.sleeve.flipped {
  height: 80vh;
}

@media (min-width: 36rem) {
  .card.flipped,
  .sleeve.flipped {
    height: 28rem;
  }
}

@media (min-width: 48rem) and (min-height: 36rem) {
  .card.flipped,
  .sleeve.flipped,
  .sleeve,
  .card {
    font-size: 1.125em;
    width: 28rem;
    height: 32rem;
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

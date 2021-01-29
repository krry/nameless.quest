<template lang="pug">
Page.text-center(
  ref="desk"
  @keydown.left.prevent="navTo(prev)"
  @keydown.right.prevent="navTo(next)"
  )
  router-link.page-nav.btn.naked.prev.clickable.abs.t.l(:to="prev") 𐡷 {{ prev }}
  transition.under(name="slide-fade" appear)
    .hint.vapor.abs.t.r.l.center.font.sm(v-if="!cfg.navvy") ⬅️ Did you try 😁 arrow keys? ➡️
  router-link.page-nav.btn.naked.next.clickable.abs.t.r(:to="next") {{ next }} 𐡸
  h1.font.x2l.flex.mid
    HexaGlyph(:hex="hex.hexagram" inline)
    .flex.col.mid
      HanziChar(
        v-for="(char, index) in hex.names.chinese"
        :key="$symbolize(char)"
        :char="char"
        :pinyin="pinyin[index]"
        direction="side"
        size="xl"
        reveal
        )
  h1 {{ hex.names.english }}
  section.numbers
    .flex.space.string
      .datum.binary
        dd {{ hex.binary.slice(2) }}
        dt Binary
      .datum.octal
        dd {{ hex.octal }}
        dt Octal
      .datum.octal
        dd {{ parseInt(hex.binary.slice(2), 2) }}
        dt Decimal
      .datum.kingwen
        dd {{ hex.kingwen }}
        dt King Wen
  .flex.mid.col.string
    h2
      pre.text.judgment {{ hex.judgment }}
  .flex.mid.col.string
    h3
      pre.text.image {{ hex.images }}
    .flex.space
      .flex.string.col.balance
        .datum.trigram.flex.string.laze.btw(
          v-for="(tri, index) in trigrams"
          :key="$symbolize(tri.name.en)"
          )
          .flex.col.mid.more
            dt The {{ $titlize(tri.name.en) }}
            dt {{ index === 0 ? "Above" : "Below" }}
          .flex.col.mid.less
            HanziChar(
              :char="tri.name.zh"
              :pinyin="tri.name.pn"
              size="lg"
              reveal
              )
          .flex.col.mid.less
            TriGlyph.hexagram.font.x5l.second(:tri="tri.trigram")
      HexaGlyph.datum.middle.font.x7l.balance(:hex="hex.hexagram")
  .flex.mid.col.string
    h2 Changing Lines
    section(
      v-for="line in hex.lines"
      :key="$symbolize(line.position)"
      ) 
      IconBase(height="36")
        component(:is="'Icon' + getChangingLine(line.position).icon")
      h4.font.lg Line {{line.position + ': ' + getChangingLine(line.position).desc }}
      .flex.mid
        .icon.font.x3l   
        IconBase(height="36")
          component(:is="'Icon' + getChangingLine(line.position).was")
        .icon.font.x3l ⇢
        IconBase(height="36")
          component(:is="'Icon' + getChangingLine(line.position).is")
      h5.font.md.text.em(v-if="line.ruler") The {{ $titlize(line.ruler) }} Ruler
      pre.text {{line.meaning}}
</template>

<script lang="ts">
import {defineComponent, ref, toRefs, reactive, watchEffect, onMounted, computed} from 'vue'
import {useHexagrams} from '../composables/hexagrams'
// import {useSwipeable} from '../composables/swipeable'
import {useTrigrams} from '../composables/trigrams'
import {cfg, set} from '../store/cfg'
import Page from '../components/Page.vue'
import HanziChar from '../components/HanziChar.vue'
import HexaGlyph from '../components/HexaGlyph.vue'
import TriGlyph from '../components/TriGlyph.vue'
import LineGram from '../components/LineGram.vue'
import IconBase from '../icons/IconBase.vue'
import Icon6 from '../icons/Icon6.vue'
import Icon7 from '../icons/Icon7.vue'
import Icon8 from '../icons/Icon8.vue'
import Icon9 from '../icons/Icon9.vue'

function getPrevHex(id: string): string {
  if (id === '1') {
    return '64'
  } else {
    return (parseInt(id) - 1).toString()
  }
}

function getNextHex(id: string): string {
  if (id === '64') {
    return '1'
  } else {
    return (parseInt(id) + 1).toString()
  }
}

export default defineComponent({
  name: 'Change',
  components: {
    Page,
    LineGram,
    HexaGlyph,
    TriGlyph,
    HanziChar,
    IconBase,
    Icon6,
    Icon7,
    Icon8,
    Icon9,
  },
  props: {
    id: {
      type: String,
      default: '00',
    },
  },
  setup(props) {
    const {getHexagramByWen} = useHexagrams()
    const {getTrigram} = useTrigrams()
    // const {handleSwipeStart, handleSwipeEnd} = useSwipeable()

    const hex = ref(getHexagramByWen(props.id))

    const rx = reactive({
      hex,
      desk: ref(),
      mousePresent: false,
      touchPresent: false,
      prev: getPrevHex(props.id),
      next: getNextHex(props.id),
      pinyin: computed(() => hex.value.names.pinyin.split(' ')),
    })

    const trigrams = computed(() => {
      return Object.values(rx.hex.trigramPair).map((t) => getTrigram(t))
    })

    watchEffect(() => {
      rx.prev = getPrevHex(props.id)
      rx.next = getNextHex(props.id)
    })

    onMounted(() => {
      document.addEventListener(
        'mousemove',
        function onMouseMove() {
          // see if there's a mouse in the house
          document.removeEventListener('mousemove', onMouseMove, false)
          rx.mousePresent = true
        },
        false,
      )

      document.addEventListener('touchmove', function onTouchMove() {
        // see if anyone's in touch
        document.removeEventListener('touchmove', onTouchMove, false)
        rx.touchPresent = true
        set('navvy', true)
      })

      // const gestureZone = rx.desk
      // console.log('gesureZone', gestureZone)
      // if (!gestureZone) return
      // gestureZone.addEventListener('touchstart', handleSwipeStart, false)
      // gestureZone.addEventListener('touchend', handleSwipeEnd, false)
    })

    return {
      cfg,
      trigrams,
      getHexagramByWen,
      ...toRefs(rx),
    }
  },
  watch: {
    $route(to) {
      this.hex = this.getHexagramByWen(to.params.id)
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleArrowNav, true)
  },
  unmounted() {
    window.removeEventListener('keydown', this.handleArrowNav, true)
  },
  methods: {
    getChangingLine(pos: number) {
      return this.hex.binary.slice(2).split('').reverse()[pos - 1] === '0'
        ? {icon: '6', was: '8', is: '7', desc: 'Yin Firming'}
        : {icon: '9', was: '7', is: '8', desc: 'Yang Opening'}
    },
    navTo(route: string) {
      set('navvy', true)
      this.$router.push(route)
    },
    handleArrowNav(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        this.$router.push(this.prev)
        set('navvy', true)
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        this.$router.push(this.next)
        set('navvy', true)
      }
    },
  },
})
</script>

<style lang="postcss" scoped>
.change {
  display: flex;
  flex-flow: row wrap;
}

dt {
  font-weight: 600;
  font-size: 0.925em;
  margin-top: 0.125em;
}

dd {
  margin-left: 0;
  font-size: 1.25em;
}

dd + dd {
  margin-top: 0;
}

@media (min-width: 36rem) and (min-height: 36rem) {
  section {
    margin: 2rem;
  }
}

h3 {
  margin-top: 1em;
}

.laze {
  padding: 0 1rem;
  width: 100%;
}

.flex.space {
  align-self: normal;
}

pre.text {
  text-align: left;
  font-family: var(--text);
  line-height: var(--pleading);
}

dl + dl::before {
  content: '⤐';
  margin: 0 0 1em;
  font-size: 3rem;
  display: block;
}

.page-nav.btn.naked {
  padding: 0.125em 0.5em;
  margin: 0.5rem;
  text-decoration: none;
}

.hint {
  padding: 1em;
}

.numbers .datum {
  margin: 0 1rem;
}

.trigram .col {
  margin: 0 0.5rem;
}

.hexagram.second {
  margin-top: 0;
}

.more {
  flex-basis: 40%;
}

.less {
  flex-basis: 30%;
}

h5 {
  margin: 1em 0;
}
</style>

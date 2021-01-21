<template lang="pug">
Page.text-center(
  @keydown.left.prevent="navTo(prev)"
  @keydown.right.prevent="navTo(next)"
  )
  router-link.page-nav.btn.naked.prev.clickable.abs.t.l(:to="prev") 𐡷 {{ prev }}
  transition.under(name="slide-fade" appear)
    .hint.vapor.abs.t.r.l.center.font.sm(v-if="!hasNavved && !touchPresent") ⬅️ Did you try the arrow keys? ➡️
  router-link.page-nav.btn.naked.next.clickable.abs.t.r(:to="next") {{ next }} 𐡸
  h1.hexagram.font.x7l
    | {{ hex.hexagram }}
    HanziChars(
      v-for="(char, index) in hex.names.chinese"
      :key="$getSymbol(char)"
      :char="char"
      :pinyin="pinyin[index]"
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
  section.flex.mid.col.string
    h2 The Judgement
    pre.text.judgment {{ hex.judgment }}
  section.flex.mid.col.string
    h2 The Image
    pre.text.image {{ hex.images }}
    .flex.space
      .flex.string.col.balance
        .datum.trigram.flex.string.laze(
          v-for="(tri, index) in trigrams"
          :key="$getSymbol(tri.name.en)"
          )
          .flex.col.mid
            dt The {{ $titleCase(tri.name.en) }}
            dt {{ index === 0 ? "Above" : "Below" }}
          .flex.col.mid
            HanziChars(
              :char="tri.name.zh"
              :pinyin="tri.name.pn"
              size="xl"
              reveal
              )
          .flex.col.mid
            h2.hexagram.font.x6l.second {{ tri.trigram }}
      .datum.hexagram.middle.font.x7l.balance.spinner.clickable(
        ref="spinner"
        @click.stop="isSpinning = !isSpinning"
        ) {{ hex.hexagram }}
  .flex.mid.col.string
    h2 Changing Lines
    section(
      v-for="line in hex.lines"
      :key="$getSymbol(line.position)"
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
      h5.font.md.text.em(v-if="line.ruler") The {{ $titleCase(line.ruler) }} Ruler
      pre.text {{line.meaning}}
</template>

<script lang="ts">
import {defineComponent, ref, toRefs, reactive, watchEffect, onMounted, computed} from 'vue'
import {useHexagrams} from '../composables/hexagrams'
import {useTrigrams} from '../composables/trigrams'
import {useSpinnable} from '../composables/spinnable'
import Page from '../components/Page.vue'
import HanziChars from '../components/HanziChars.vue'
import LineGram from '../components/LineGram.vue'
import IconBase from '../components/icons/IconBase.vue'
import Icon6 from '../components/icons/Icon6.vue'
import Icon7 from '../components/icons/Icon7.vue'
import Icon8 from '../components/icons/Icon8.vue'
import Icon9 from '../components/icons/Icon9.vue'

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
    HanziChars,
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
    modal: Boolean,
    hasNavved: Boolean,
  },
  emits: ['navved'],
  setup(props) {
    const {getHexagram} = useHexagrams()
    const {getTrigram} = useTrigrams()
    const hex = ref(getHexagram(props.id))
    const spinner = ref<HTMLElement>()

    const rx = reactive({
      hex,
      isSpinning: ref(false),
      // mousePresent: ref(false),
      touchPresent: ref(false),
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
      // document.addEventListener(
      //   'mousemove',
      //   function onMouseMove() {
      //     // see if there's a mouse in the house
      //     document.removeEventListener('mousemove', onMouseMove, false)
      //     rx.mousePresent = true
      //   },
      //   false,
      // )
      document.addEventListener('touchmove', function onTouchMove() {
        // see if anyone's in touch
        document.removeEventListener('touchmove', onTouchMove, false)
        rx.touchPresent = true
        // initializeTouchBehavior();
      })
      if (spinner.value) {
        const {getSpinning, setSpinning} = useSpinnable(spinner.value)

        rx.isSpinning = getSpinning()

        watchEffect(() => {
          setSpinning(rx.isSpinning)
        })
      }
    })

    return {
      spinner,
      trigrams,
      getHexagram,
      ...toRefs(rx),
    }
  },
  watch: {
    $route(to) {
      this.hex = this.getHexagram(to.params.id)
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
      this.$emit('navved', true)
      this.$router.push(route)
    },
    handleArrowNav(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        this.$router.push(this.prev)
        this.$emit('navved', true)
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        this.$router.push(this.next)
        this.$emit('navved', true)
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

.spinner {
  animation: spin 2500ms infinite linear paused;
}
</style>

<template lang="pug">
.face.face--back
  LogoBrand(direction="bottom").smaller
  .instructions
    h2 "{{query.trim()}}"
    transition(name="slide-fade" mode="out-in")
      p.left(v-if="toss.length === 0")
        | Now, breathing deeply,
        br
        | focusing on this question,
        br
        | we flip 3 coins.
      .glyphs.right.rtl(v-else)
        IconBase.line(
          v-for="char in toss"
          :key="$getSymbol(char)"
          :class="{valid: validToss}"
          :iconName="getLineName(char)"
          )
          component(
            :is="`Icon${char}`"
            )
  .tossing
    .field.toss
      input.rtl(
        type="tel"
        v-model="toss"
        ref="telEl"
        id="roll"
        maxlength="6"
        min="666666"
        max="999999"
        autofocus
        tabindex="0"
        pattern="[6-9]{1,6}"
        placeholder="678789"
        @focus="coinFocus = true"
        @blur="coinFocus = false"
      )
    transition(name="slide" appear mode="out-in")
      button.btn.right.go(
        v-if="validToss"
        @click="emitToss"
        ) Let's 卦 Gua
      .fake-coins(v-else)
        transition(name="fade" mode="out-in")
          button.btn.naked.md.left(
            v-if="!noCoins"
            @click="noCoins = true"
            ) Can't find any coins?
          button.btn.outline.md.left(
            v-else
            @click="fakeCoins"
            ) 🤸 Fake my flips 🩴
  transition.under(name="slide-fade")
    aside.help(v-if="!validToss")
      span
        IconBase(width="36" height="36" viewBox="0 0 1000 1000")
          IconCrystalBall
        IconBase(width="36" height="36" viewBox="0 0 100 125")
          IconMiracle
      h3 How to Count the Coins
      ul.ls.coinlist
        li We toss 6 rounds of 3 coins
        li Heads 👸 count for 3
        li Tails 🦚 for 2
        li Each round sums to 6, 7, 8, or 9
      hr.divider
      .line-legend.grid
        span 🦚 🦚 🦚 = 6
        span yin ⤐ yang
        span.ib
          IconBase
            Icon6
        span firming
        span 🦚 🦚 👸 = 7
        span yang
        span.ib
          IconBase
            Icon7
        span firm
        span 🦚 👸 👸 = 8
        span yin
        span.ib
          IconBase
            Icon8
        span open
        span 👸 👸 👸 = 9
        span yang ⤐ yin
        span.ib
          IconBase
            Icon9
        span opening
  .catch-all.stack.flex.string.wrap
    button.btn.md.outline.lastack(
      type="button"
      @click="$emit('back')"
      ) ♽ Start Over
    router-link.btn.naked.sm(to="about") About the Oracle
    FeedbackButton
  button.btn.back.naked(
    type="button"
    :title="'Start Over'"
    @click="$emit('back')"
    ) ♽
</template>

<script lang="ts">
import {defineComponent, ref, computed} from 'vue'
import IconBase from './icons/IconBase.vue'
import Icon6 from './icons/Icon6.vue'
import Icon7 from './icons/Icon7.vue'
import Icon8 from './icons/Icon8.vue'
import Icon9 from './icons/Icon9.vue'
import LogoBrand from './LogoBrand.vue'
import {generateRandomToss} from '../utils/tosses'
import IconCrystalBall from './icons/IconCrystalBall.vue'
import IconMiracle from './icons/IconMiracle.vue'
import FeedbackButton from './FeedbackButton.vue'

export default defineComponent({
  name: 'OracleToss',
  components: {
    IconBase,
    Icon6,
    Icon7,
    Icon8,
    Icon9,
    IconCrystalBall,
    IconMiracle,
    LogoBrand,
    FeedbackButton,
  },
  props: {
    query: {
      type: String,
      default: '',
    },
  },
  emits: ['toss', 'back'],
  setup(_, context) {
    const toss = ref('')
    const telEl = ref()
    const coinFocus = ref(false)
    const validToss = computed(() => {
      return /^[6-9]{6}$/.test(toss.value)
    })

    function emitToss() {
      // console.log("emitting toss", toss.value);
      // ensure that the toss comprises exactly six 6s, 7s, 8s, & 9s
      if (!validToss.value) return

      context.emit('toss', toss.value)
    }

    return {
      telEl,
      toss,
      coinFocus,
      validToss,
      emitToss,
    }
  },
  data() {
    return {
      noCoins: false,
    }
  },
  methods: {
    fakeCoins() {
      this.toss = generateRandomToss().toString()
    },
    getLineName(char: string): string {
      switch (char) {
        case '6':
          return 'Old Yin • firming'
        case '7':
          return 'Yang • firm'
        case '8':
          return 'Yin • open'
        case '9':
          return 'Old Yang • opening'
        default:
          return ''
      }
    },
  },
})
</script>

<style lang="postcss" scoped>
.brand,
.instructions,
.tossing,
.help,
.catch-all {
  flex: 1 0 auto;
}

.help {
  flex-grow: 3;
}

h2 {
  margin: 1em 0 0.5em;
}

.toss {
  margin: 1em 0;
}

.toss input[type='tel'] {
  font-size: 2em;
  width: 12ch;
}

aside.help {
  margin: 2em auto;
}

.help h3 {
  margin: 1em auto 0.5em;
}

button.back {
  font-size: 1.5em;
  position: absolute;
  top: 0;
  left: 0;
  transition: var(--beat);
  padding: 0 0.5rem;
  width: 3rem;
  margin: 0;
}

.back:hover,
.back:focus {
  opacity: 1;
}

.line {
  height: 3em;
  width: 1em;
  margin: 0 0.125em;
}

.line.valid {
  color: var(--good);
}

.line-legend {
  text-align: center;
  list-style: none;
  display: grid;
  width: 100%;
  grid-template-columns: 5fr 4fr 1fr 3fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  row-gap: 1em;
  column-gap: 0.5em;
}

.line-legend .center {
  text-align: center;
}

.line-legend svg {
  height: 1.5em;
  color: var(--flair);
}

.line-legend span {
  height: 1.5em;
  line-height: 1.5em;
}

.rtl {
  direction: rtl;
  unicode-bidi: bidi-override;
  text-align: center;
}
</style>

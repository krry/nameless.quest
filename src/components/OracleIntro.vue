<template lang="pug">
.face.face--back(tabindex="-1")
  LogoBrand(direction="bottom" size="md") An Oracle for Millennials
  transition(name="slide-fade" appear mode="out-in")
    .more.right(v-if="more && !moar")
      h1 The Oracle
      pre.font.lg.text-left
        | The timeless, nameless, faceless:
        | the essence of being
        | residing inside you
        | who remembers all that is,
        | all that has been and will be.
        | The eye that sees all but itself,
        | the I who knows All 
        strong
          em is
        |  the Self.
        | Who answers any question
        | with still deeper questions?
        | One who is known, knower, knowing?
      a.btn.naked(@click="moar = true" v-if="!moar") Wut!?
    .moar.left(v-else-if="moar && more")
      HanziChar(
        char="易"
        pinyin="Yì"
        size="xl"
        reveal
        )
      HanziChar(
        char="經"
        pinyin="Jīng"
        size="xl"
        reveal
        )
      h2 aka the I Ching

      pre.font.lg.text-left
        | An ancient wisdom tradition 
        | tracing back to the Zhou and beyond:
        | we give pause, shed face, find space
        | as we ask the burning questions
        | and allow the answer to arrive,
        | divining the flavor of this moment,
        | to understand who, where, why we are.
      router-link.btn.naked(:to="{name: 'query'}") Ah yes, now I see…
    .intro.over(v-else)
      h2 Have you come to meet the Oracle?
      .stack
        router-link.btn.xl(:to="{name: 'query'}") Yes
        button.btn.outline(@click="more = true" v-if="!more") The What?
      h3.abs.b.l.r.pad.y {{ timelyGreeting }}
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue'
import IconBase from '../icons/IconBase.vue'
import Icon6 from '../icons/Icon6.vue'
import LogoBrand from './LogoBrand.vue'
import HanziChar from './HanziChar.vue'

export default defineComponent({
  name: 'OracleToss',
  components: {
    IconBase,
    Icon6,
    LogoBrand,
    HanziChar,
  },
  setup() {
    const timelyGreeting = computed((): string => {
      const nowours = new Date().getHours()
      if (!nowours || nowours < 0 || nowours > 24) return 'Welcome, wanderer 🦁'
      if (nowours < 5) return 'Greetings, traveler 🦉'
      if (nowours < 12) return 'Good morning, new friend 🐻'
      if (nowours <= 18) return 'Welcome, dear wanderer 🦌'
      if (nowours > 18) return 'Welcome, and good evening 🦁'
      else return 'Welcome, wanderer 🦁'
    })

    return {
      timelyGreeting,
    }
  },
  data() {
    return {
      more: false,
      moar: false,
    }
  },
})
</script>

<style lang="postcss" scoped>
.brand,
.intro,
.more,
.moar {
  flex-shrink: 0;
  flex-basis: auto;
}
.intro,
.more,
.moar {
  flex-grow: 2;
}
.brand {
  flex-grow: 1;
}
</style>

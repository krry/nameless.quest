<template lang="pug">
nav.flex.mid.string.col.pads.y
  ul.site-nav
    li
      a.btn(@click.stop="showOracle")
        IconBase(viewBox="0 0 100 100")
          IconMiracle
        |  Consult the Oracle
    li
      router-link.btn.naked(:to="{ name: 'home' }")
        IconBase(width="30" height="30" viewBox="0 -50 1000 800")
          IconOpenBook
        |  Explore the Tiles
    li 
      router-link.btn.naked(:to="{ name: 'about' }")
        IconBase(width="30" height="30" viewBox="0 -150 1000 1000")
          IconCrystalBall
        |  About the Oracle
    //- li(:class="{muted: isProd}")
    li
      router-link.btn.naked(:to="{ name: 'journal' }")
        IconBase(viewBox="0 -50 1000 1000")
          IconSpellBook
        |  Start a Journal
    //- li(:class="{muted: isProd}")
    li
      router-link.btn.naked(:to="{ name: 'config' }")
        IconBase(viewBox="0 0 1000 1000")
          IconCauldron
        |  Configure
    li
      router-link.btn.naked(:to="{ name: 'gratitude' }")
        IconBase(viewBox="0 -50 1000 1000")
          IconCandles
        |  Gratitude
    li
      a.btn.naked(@click.stop)
        IconBase(viewBox="0 0 17 15")
          IconConversation
        | &nbsp; Feedback?
    li
      a.btn.sm.naked(@click.stop="$logout") ✌️ Sign out
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import IconBase from './icons/IconBase.vue'
import IconScroll from './icons/IconScroll.vue'
import IconBagua from './icons/IconBagua.vue'
import IconMiracle from './icons/IconMiracle.vue'
import IconJournal from './icons/IconJournal.vue'
import IconCauldron from './icons/IconCauldron.vue'
import IconCandles from './icons/IconCandles.vue'
import IconConversation from './icons/IconConversation.vue'
import IconCrystalBall from './icons/IconCrystalBall.vue'
import IconOpenBook from './icons/IconOpenBook.vue'
import IconSpellBook from './icons/IconSpellBook.vue'

export default defineComponent({
  name: 'SiteNav',
  components: {
    IconBase,
    IconScroll,
    IconMiracle,
    IconJournal,
    IconCauldron,
    IconCandles,
    IconOpenBook,
    IconSpellBook,
    IconBagua,
    IconCrystalBall,
    IconConversation,
  },
  emits: ['showModal'],
  computed: {
    isProd(): boolean {
      return process.env.NODE_ENV === 'production'
    },
  },
  methods: {
    closeSidebar() {
      window.scrollTo(320, document.documentElement.scrollTop)
    },
    showOracle() {
      console.log('route location', this.$route)
      if (this.$route.name !== 'home') {
        this.$router.push('/')
      }
      this.$emit('showModal')
    },
  },
})
</script>

<style lang="postcss" scoped>
nav {
  flex: 4 0 auto;
  text-align: left;
}

nav ul,
nav li {
  list-style: none;
  margin: 0;
  padding: 0;
  color: var(--ink);
}

nav ul,
nav li,
nav a {
  display: block;
}

nav a {
  text-decoration: none;
  font-size: 2ch;
  font-weight: 500;
  padding: 0.5em 1em;

  @media (min-width: 36rem) {
    font-size: 2.25ch;
  }
}

nav .btn {
  width: 100%;
  line-height: 2;
  padding: 0.5em 1em;
  margin: 0;

  @media (min-height: 48rem) {
    padding: 0.25em 1em;
    margin: 0.75rem 0;
  }
}

nav .btn.sm {
  width: auto;
  display: inline-block;
}

nav .btn svg {
  margin-bottom: -0.25rem;
}

hr {
  border-color: var(--glow);
}

.muted {
  opacity: 0.2;
  pointer-events: none;
}

.linklist {
  margin-top: 2rem;
}

@media (min-height: 36rem) {
  .linklist {
    margin-top: 4rem;
  }
}
</style>

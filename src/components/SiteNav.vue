<template lang="pug">
nav.flex.mid.string.col.pads.y
  ul.site-nav
    li
      router-link.btn.outline(:to="{ path: '/oracle' }" tabindex="1")
        IconBase(viewBox="0 0 100 100")
          IconMiracle
        |  Consult the Oracle
    li
      router-link.btn.naked(:to="{ name: 'home' }" tabindex="2")
        IconBase(width="30" height="30" viewBox="0 -50 1000 800")
          IconOpenBook
        |  Explore the Tiles
    li
      router-link.btn.naked(:to="{ name: 'about' }" tabindex="3")
        IconBase(width="30" height="30" viewBox="0 -150 1000 1000")
          IconCrystalBall
        |  About the Oracle
    li
      router-link.btn.naked(:to="{ name: 'journal' }" tabindex="4")
        IconBase(viewBox="0 -50 1000 1000")
          IconSpellBook
        |  Start a Journal
    li
      router-link.btn.naked(:to="{ name: 'configure' }" tabindex="5")
        IconBase(viewBox="0 0 1000 1000")
          IconCauldron
        |  Configure
    li
      router-link.btn.naked(:to="{ name: 'gratitude' }" tabindex="6")
        IconBase(viewBox="0 -50 1000 1000")
          IconCandles
        |  Gratitude
    li
      a.btn.naked(
        @click.stop
        tabindex="7"
        data-feedback-fish
        :data-feedback-fish-userid="user.email"
        )
        IconBase(viewBox="0 0 17 15")
          IconConversation
        | &nbsp; Feedback?
    li
      a.btn.sm.naked(
        @click.stop="$logout"
        tabindex="8"
        )
        IconBase(viewBox="0 0 100 125" height="18" width="18")
          IconPeaceSign
        | Sign out
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import IconBase from '../icons/IconBase.vue'
import IconScroll from '../icons/IconScroll.vue'
import IconCandles from '../icons/IconCandles.vue'
import IconMiracle from '../icons/IconMiracle.vue'
import IconJournal from '../icons/IconJournal.vue'
import IconCauldron from '../icons/IconCauldron.vue'
import IconOpenBook from '../icons/IconOpenBook.vue'
import IconPeaceSign from '../icons/IconPeaceSign.vue'
import IconSpellBook from '../icons/IconSpellBook.vue'
import IconCrystalBall from '../icons/IconCrystalBall.vue'
import IconConversation from '../icons/IconConversation.vue'

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
    IconPeaceSign,
    IconCrystalBall,
    IconConversation,
  },
  data() {
    return {
      user: firebase.auth().currentUser || {email: ''},
    }
  },
  computed: {
    isProd(): boolean {
      return process.env.NODE_ENV === 'production'
    },
  },
})
</script>

<style lang="postcss" scoped>
nav {
  flex: 4 0 auto;
  text-align: left;
  padding-bottom: 2rem;
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

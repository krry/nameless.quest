<template lang="pug">
main.desk.flex.string(
  :style="{backgroundImage: backdrop}"
  )
  .page.rel.flex.mid.col
    slot
</template>

<script lang="ts">
import {defineComponent, ref, reactive, toRefs, watchEffect} from 'vue'
import {activeTheme} from '../composables/themes'

export default defineComponent({
  name: 'HexaGrid',
  setup() {
    const rx = reactive({
      theme: activeTheme,
      backdrop: ref(''),
    })

    function getRand(max: number): number {
      return Math.floor(Math.random() * max) + 1
    }

    function sizeBg() {
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight
      const smallerDim = screenWidth < screenHeight ? screenWidth : screenHeight
      if (smallerDim > 1080) return 'bg-lg/'
      if (smallerDim > 576) return 'bg-md/'
      else return 'bg-sm/'
    }

    watchEffect(() => {
      rx.backdrop = 'url(/' + sizeBg() + rx.theme + getRand(3) + '.jpg)'
    })

    return {
      ...toRefs(rx),
    }
  },
})
</script>

<style lang="postcss">
.desk {
  position: relative;
  z-index: 10;
  background-color: var(--paper);
  background-repeat: no-repeat;
  background-position: right center;
  background-attachment: fixed;
  background-size: cover;
  font-size: var(--font-clamp);
  pointer-events: auto;
  margin-left: var(--drawer-buffer);
  box-shadow: 0 0 0.5rem var(--glow);
  border-left: var(--frame) solid var(--glow);
  scroll-snap-align: start;
  min-width: calc(100vw - var(--drawer-dim));
  width: 100vw;
  max-width: 100vw;
  min-height: calc(100vh + 1px);

  @media (min-width: 36rem) {
    margin-left: var(--drawer-dim);
    padding: 0 2rem;
  }

  @media (min-width: 36rem) and (min-height: 36rem) {
    padding: 0 3rem;
    min-height: 100vh;
  }

  @media (min-width: 48rem) and (min-height: 48rem) {
    padding: 0 4rem;
  }

  @media (min-width: 64rem) and (min-height: 36rem) {
    padding: 4rem;
  }
}

.page {
  font-size: 125%;
  flex: 1 0 auto;
  overflow-y: auto;
  margin: auto;
  background-color: var(--silk);
  padding: 1rem;
  border-radius: var(--bevels);
  width: calc(100vw - 4em);
  max-width: 48rem;

  @media (min-height: 36rem) {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  @media (min-height: 48rem) {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  @media (min-width: 48rem) {
    width: auto;
    padding-left: 2rem;
    padding-right: 2rem;
    max-width: 72ch;
  }

  @media (min-width: 64rem) {
    padding-left: 3rem;
    padding-right: 3rem;
    max-width: 80ch;
  }
}

.page h1:first-child,
.page h2:first-child {
  margin-top: 1em;
}

.page h2,
.page h3,
.page blockquote,
.page p {
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
}

.page p {
  line-height: var(--pleading);
  margin: 0.5em;
}

.callout {
  margin: 1.5em 0;
  padding: 1.5em;
  color: var(--ink);
  font-family: var(--mono);
  background-color: var(--ground);
  box-shadow: inset 0 0 0.25rem 0 var(--ink);
  border-radius: var(--bevel);
}

.callout strong {
  color: var(--flair);
}

.callout p {
  text-align: left;
  font-weight: 400;
}

.callout h4 {
  text-align: center;
  font-variant: small-caps;
}

.page .toc {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  margin: 3rem 0;
  padding: 1rem;
  list-style: none;
  border-top: 1px solid var(--glow);
  border-bottom: 1px solid var(--glow);
}

.page .toc li {
  position: relative;
  font-size: 1.125em;
  font-weight: 500;
  font-variant: small-caps;

  @media (min-width: 48rem) {
    padding: 0 0.5rem;
    flex-basis: 50%;
  }

  @media (min-width: 64rem) {
    padding: 0 1rem;
    flex-basis: 33%;
  }
}

.toc a.btn {
  font-family: var(--font);
  color: var(--flair);
  padding: 0.75rem;
  text-align: center;
}

.page section {
  border: 1px var(--border-style) var(--glow);
  border-radius: var(--bevel);
  margin: 2rem 0;
  padding: 1rem;
  @media (min-width: 36rem) {
    padding: 2rem;
  }
}

section {
  text-align: center;
}

section p,
section li {
  text-align: left;
}

.page h1,
.page h2 {
  text-align: center;
}

.page section h2 {
  text-align: center;
}
</style>

<template lang="pug">
main.desk.flex.string(
  ref="desk"
  :style="{backgroundImage: backdrop}"
  )
  .page.rel(ref="page")
    slot
</template>

<script lang="ts">
import {defineComponent, ref, reactive, toRefs, watchEffect} from 'vue'
import {activeTheme} from '../composables/themes'

export default defineComponent({
  name: 'HexaGrid',
  setup() {
    const rx = reactive({
      desk: ref(),
      page: ref(),
      theme: activeTheme,
      backdrop: ref(''),
    })

    function getRand(max: number): number {
      return Math.floor(Math.random() * max) + 1
    }

    watchEffect(() => {
      rx.backdrop = 'url(/bg/' + rx.theme + getRand(3) + '.jpg)'
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
  box-shadow: 0 0 1em var(--glow);
  border-left: var(--frame) solid var(--glow);
  scroll-snap-align: start;
  min-width: calc(100vw - var(--drawer-dim));
  width: 100vw;
  max-width: 100vw;
  padding: 2rem;
  min-height: calc(100vh + 1px);

  @media (min-width: 36rem) {
    margin-left: var(--drawer-dim);
  }

  @media (min-width: 36rem) and (min-height: 36rem) {
    padding: 3rem;
    min-height: 100vh;
  }

  @media (min-width: 48rem) and (min-height: 48rem) {
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
  width: calc(100vw - 4em);
  max-width: 48rem;

  @media (min-height: 36rem) {
    padding: 2rem;
  }

  @media (min-height: 48rem) {
    padding: 3rem;
  }

  @media (min-width: 48rem) {
    width: auto;
    max-width: 80ch;
  }
}

.page h1:first-child {
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
}

.callout {
  margin: 1.5em 0;
  padding: 1.5em;
  color: var(--ink);
  font-family: var(--mono);
  background-color: var(--ground);
  box-shadow: inset 0 0 0.5rem 0 var(--ink);
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
  margin: 1rem;
  padding: 1rem;
  list-style: none;
}

.page .toc li {
  /* margin-left: 1rem; */
  padding: 0 2rem;
  position: relative;
  font-size: 1.125em;
  font-weight: 500;
  font-variant: small-caps;
}

.toc a.btn {
  font-family: var(--font);
  color: var(--flair);
  padding: 0.75rem;
  text-align: center;
}

.page section {
  border: 1px dotted var(--glow);
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

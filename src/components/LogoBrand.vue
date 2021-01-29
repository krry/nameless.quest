<template lang="pug">
.brand(
  :class="direction, size, {grows: grows}"
  @click.stop="isSpinning = !isSpinning"
  )
  transition(name="popup" appear)
    .logo(ref="el")
  .stack.reveal
    h1.nameless#llamo {{ title }}
    h2.tagline
      slot(name="tagline")
</template>

<script lang="ts">
import {defineComponent, ref, watchEffect, onMounted} from 'vue'
import {SITE_TITLE} from '../constants'
import {useSpinnable} from '../composables/spinnable'

export default defineComponent({
  name: 'LogoBrand',
  props: {
    direction: {
      type: String,
      default: 'right',
    },
    size: {
      type: String,
      default: 'md',
    },
    grows: Boolean,
  },
  setup() {
    const el = ref<HTMLElement>()
    const isSpinning = ref(false)

    onMounted(() => {
      if (el.value) {
        const {getSpinning, setSpinning} = useSpinnable(el.value)

        isSpinning.value = getSpinning()

        watchEffect(() => {
          setSpinning(isSpinning.value)
        })
      }
    })

    return {
      el,
      title: SITE_TITLE,
      isSpinning,
    }
  },
})
</script>
<style lang="postcss">
.stack {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.brand {
  display: flex;
  transition: var(--beat);
  min-height: 10vh;
}

.brand.grows:hover,
.brand.grows:focus {
  transform: scale(1.05);
}

.brand:hover,
.brand:focus {
  outline: 2px var(--border-style) var(--flair);
  outline-offset: 1vh;
}

.brand.bottom {
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.reveal,
.logo {
  cursor: pointer;
}

.logo {
  pointer-events: auto;
  cursor: pointer;
  height: var(--logo-dim);
  width: var(--logo-dim);
  background-image: url('../assets/svg/bagua.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
  transition: inherit;
  animation: spin 2500ms infinite linear paused;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.brand {
  --logo-dim: clamp(4rem, 4rem + 3vh + 3vw, 7.5rem);
}

/* .brand.lg {
  --logo-dim: calc(6vh + 8vw);
}

.brand.md {
  --logo-dim: calc(4vh + 6vw);
} */

h1.nameless {
  font-size: calc(var(--logo-dim) / 4);
  color: var(--brand);
  font-family: var(--heading);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3.25px;
  margin: 0;
}

h2.tagline {
  font-size: calc(var(--logo-dim) / 6);
  font-family: var(--font);
  font-weight: 500;
  margin-bottom: 0;
}

.brand.right h1:first-child {
  margin-top: 0;
}
</style>

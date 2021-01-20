<template lang="pug">
.brand(
  :class="direction, size"
  @click.stop="isSpinning = !isSpinning"
  )
  transition(name="popup" appear)
    .logo(ref="el")
  .stack.reveal(name="slide" appear)
    h1.brand-name#llamo {{ title }}
    transition(name="slide" appear)
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
      default: 'small',
    },
  },
  setup() {
    const el = ref<HTMLElement>()
    const title = ref(SITE_TITLE)
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
      title,
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
}

.brand {
  display: flex;
  transition: 333ms;
  min-height: 10vh;
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

  /* z-index: 1; */
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

.slide-enter-active,
.slide-leave-active,
.popup-enter-active,
.popup-leave-active {
  transition: 444ms var(--ease-in-out-sine);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0%);
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: scale(0.7);
}

.popup-enter-to,
.popup-leave-from {
  opacity: 1;
  transform: scale(1);
}

h1.brand-name {
  color: var(--brand);
  font-family: var(--heading);
  font-size: 1.5em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 4px;
  margin: 0;
}

.brand.right h1:first-child {
  margin-top: 0;
}

.oracle {
  --logo-dim: 20vh;
}

.oracle .brand-name {
  font-size: 2rem;
}

.oracle .logo {
  /* z-index: unset; */
}

.smaller {
  --logo-dim: 5rem;
}

.smaller .reveal h1 {
  display: none;
}
</style>

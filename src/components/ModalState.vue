<template lang="pug">
teleport(to="#modals")
  transition.first(name="popup" appear)
    .modal-frame.rel.fs.flex.mid(v-if="open")
      transition.second(name="popup" appear)
        .modal-backdrop(v-if="open")
          .close-net.fixed.fs.abs-0(@click.stop="$emit('close')")
      transition.scale.third(name="popup" appear)
        .modal-rod.rel.scale(v-if="open" @close="$emit('close')")
          slot
</template>

<script lang="ts">
import LogoBrand from './LogoBrand.vue'
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'ModalState',
  components: {
    Brand: LogoBrand,
  },
  props: {
    open: Boolean,
  },
  emits: ['close'],
  mounted() {
    document.addEventListener('keydown', this.onEscape)
  },
  unmounted() {
    document.removeEventListener('keydown', this.onEscape)
  },
  methods: {
    onEscape(e: KeyboardEvent) {
      if (this.open && e.key === 'Escape') this.$emit('close')
    },
  },
})
</script>
<style scoped lang="postcss">
.modal-frame {
  z-index: 30;
  perspective: 1500px;
}

.modal-backdrop {
  cursor: pointer;
  z-index: 35;
}

.close-net {
  transition: var(--beat);
  background: var(--dust);
  pointer-events: auto;
}

.close-net:hover {
  opacity: 0.75;
}

.modal-rod {
  z-index: 40;
  position: relative;
  pointer-events: none;

  @media (min-width: 36rem) {
    width: auto;
    height: auto;
  }
}

.scale {
  transform-origin: center top;
  transform-style: preserve-3d;
}

.popup-enter-active,
.popup-leave-active {
  transition-duration: var(--beat);
}

.popup-enter-active {
  transition-timing-function: var(--ease-out-cubic);
}

.popup-leave-active {
  transition-timing-function: var(--ease-in-cubic);
}

.popup-enter-active.second {
  transition-delay: var(--beat);
}

.popup-enter-active.third {
  transition-delay: var(--bea2);
}

.popup-leave-active.second {
  transition-delay: var(--beat);
}

.popup-leave-active.first {
  transition-delay: var(--bea2);
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}

.popup-enter-to,
.popup-leave-from {
  opacity: 1;
}

.popup-enter-from.scale {
  transform: scale(0.7) rotateX(-90deg) translate3d(0, -200%, 0);
}

.popup-enter-to.scale {
  transform: scale(1) rotateX(0) translate3d(0, 0, 0);
}

.popup-leave-from.scale {
  transform: scale(1) rotateX(0) translate3d(0, 0, 0);
}

.popup-leave-to.scale {
  transform: scale(0.7) rotateX(-90deg) translate3d(0, -200%, 0);
}
</style>

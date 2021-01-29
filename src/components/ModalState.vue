<template lang="pug">
teleport(to="#modals")
  transition.first(name="fade" appear)
    .modal-frame.rel.fs.flex.mid(v-if="cfg.modal")
      transition.second(name="fade" appear)
        .modal-backdrop(v-if="cfg.modal")
          .close-net.fixed.fs.abs-0(@click.stop="set('modal', false)")
      transition.scale.third(name="popup" appear)
        .modal-rod.rel.scale(v-if="cfg.oracle" @close="set('oracle', false)")
          slot
</template>

<script lang="ts">
import LogoBrand from './LogoBrand.vue'
import {defineComponent, onMounted, onUnmounted} from 'vue'
import {cfg, set, tog} from '../store/cfg'

export default defineComponent({
  name: 'ModalState',
  components: {
    Brand: LogoBrand,
  },
  setup() {
    function onEscape(e: KeyboardEvent) {
      if (cfg.modal && e.key === 'Escape') set('modal', false)
    }
    onMounted(() => document.addEventListener('keydown', onEscape))
    onUnmounted(() => document.removeEventListener('keydown', onEscape))
    return {cfg, set, tog}
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
  transition: var(--bea2) var(--ease-out-quad);
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

.fade-enter-active,
.fade-leave-active {
  transition-duration: var(--bea2);
}

.fade-enter-active {
  transition-timing-function: var(--ease-out-quad);
}

.fade-leave-active {
  transition-timing-function: var(--ease-in-quad);
}

.fade-enter-active.second {
  transition-delay: var(--bea2);
}

.popup-enter-active.third {
  transition-delay: var(--b3at);
}

.fade-leave-active.second {
  transition-delay: var(--bea2);
}

.popup-leave-active.first {
  transition-delay: var(--b3at);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
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

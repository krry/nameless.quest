<template lang="pug">
.bagua(transition="fade")
  gua.above(:gua="above")
  gua.below(:gua="below")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Gua from "./Gua.vue";

export default defineComponent({
  name: "Bagua",
  components: {
    gua: Gua,
  },
  props: {
    above: {
      type: Number,
      default: 0,
    },
    below: {
      type: Number,
      default: 0,
    },
    shown: Boolean,
  },
});
</script>

<style lang="postcss">
@import "../assets/styles/variables";

.bagua {
  align-items: justify;
  background: $flair;
  bottom: 0;
  color: white;
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  justify-content: space-evenly;
  left: 0;

  /* pointer-events: auto; */
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 3;
}

.bagua .gua {
  flex-direction: row;
}

.fade-leave-active,
.fade-enter-active {
  transition: 555ms ease-in-out;
}

.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}
</style>

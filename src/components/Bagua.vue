<template lang="pug">
.bagua(
  v-if="shown"
  transition="bounceLeft"
  v-on:click="shown = !shown"
  )
  gua(:gua="above")
  gua(:gua="below")
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

<style scoped lang="postcss">
@import '../assets/styles/variables';

.bagua {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  color: white;
  background: $flair;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: justify;
  pointer-events: auto;
}
</style>

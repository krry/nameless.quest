<template lang="pug">
.card
  names(
    :names="hex.names"
    :kingwen="hex.kingwen"
    :octal="hex.octal"
  )
  hr.divider
  cross(
    :texty="texty"
    :trigrams="hex.trigrams"
    :hexagram="hex.hexagram"
    :judgment="hex.judgment"
    :binary="hex.binary"
    :images="hex.images"
    :lines="hex.lines"
  )
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { defaultHexagram as def } from "../schema";
import Names from "./Names.vue";
import Cross from "./Cross.vue";

export default defineComponent({
  name: "Card",
  components: {
    names: Names,
    cross: Cross,
  },
  props: {
    quadrant: {
      type: Number,
      default: 1,
    },
    hex: {
      type: Object,
      default: def,
    },
    texty: Boolean,
  },
});
</script>

<style lang="postcss">
@import "../assets/styles/variables";

.card {
  z-index: 4;
  position: fixed;
  top: 10%;
  left: 5%;
  right: 5%;
  max-width: 90vw;
  max-height: 90vh;
  min-width: min(48ch, 320px);
  min-height: min(48ch, 320px);
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 16px;
  font-family: $book;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  text-align: left;
  padding: 2rem;
  background: $paper;
  border: 2px solid transparent;
  border-color: $flair;
  color: $flair;
  border-radius: 1vw;
  transition: 500ms;
}

@media (--sideways) {
  .card {
    left: 10%;
  }
}

@media (--md) {
  .card {
    position: absolute;
    margin: auto;
    top: calc(100% + 1.25rem);
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    box-shadow: 0 0 0.6em 0.2em $shade;
  }
}

.divider {
  width: 80%;
  color: $flair;
  margin: 1em auto;
}
</style>

<template lang="pug">
.card(:class="`quadrant-${quadrant}`")
  names(
    :names="hex.names"
    :kingwen="hex.kingwen"
    :octal="hex.octal"
  )
  hr.divider
  cross(
    :texty="texty"
    :hex="hex"
  )
  .close.tr(@click.stop="closeCard") ⓧ
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { defHex } from "../schema";
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
      default: defHex,
    },
    texty: Boolean,
  },
  methods: {
    closeCard() {
      this.$bus.emit("close_cards");
    },
  },
});
</script>

<style lang="postcss">
@import "../assets/styles/variables";

.close {
  font-size: 1rem;
  opacity: 0.5;
  position: absolute;
  cursor: pointer;
}

.close.tr {
  top: 0.5rem;
  right: 0.5rem;
}

.close:hover,
.close:focus {
  opacity: 1;
  color: $red;
}

.card {
  align-items: center;
  background: $paper;
  border-color: $flair;
  border-radius: 0.5em;
  border: 2px solid transparent;
  box-shadow: 0 0 0.6em 0.2em $shade;
  color: $flair;
  display: flex;
  flex-flow: column;
  font-family: $book;
  font-size: 16px;
  justify-content: center;
  left: 5%;
  min-height: 16em;
  height: auto;
  max-height: 90vh;
  min-width: 16em;
  width: 48ch;
  max-width: 90vw;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 2rem;
  position: fixed;
  right: 5%;
  text-align: left;
  top: 10%;
  z-index: 4;
}

@media (--sideways) {
  .card {
    left: 40%;
    right: 5%;
    top: 5%;
    bottom: 5%;
    justify-content: flex-start;
    overflow-y: auto;
  }
}

@media (--md) {
  .card {
    position: absolute;
    margin: auto;
    top: calc(100% + 1.25rem);
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }
}

.divider {
  width: 80%;
  color: $flair;
  margin: 1em auto;
}
</style>

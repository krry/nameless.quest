<template lang="pug">
article.framing-node
  counting(
    :hexagram="hex.hexagram"
    :binary="hex.binary"
    :octal="hex.octal"
    :trigrams="hex.trigramPair"
    :kingwen="hex.kingwen"
  )
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Counting from "./Counting.vue";
import { defaultHexagram } from "../schema";

export default defineComponent({
  name: "Framing",
  components: {
    counting: Counting,
  },
  props: {
    hex: {
      type: Object,
      default() {
        return {
          defaultHexagram,
        };
      },
    },
  },
});
</script>

<style scoped lang="postcss">
@import "../assets/styles/variables";

.framing-node {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background-color: transparent;
  border: 1px solid $edge;
  padding: 1em;
  transition: 555ms;
}
</style>

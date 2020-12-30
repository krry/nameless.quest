<template lang="pug">
article.meaning-node
  counting(:hex="hex")
  change(:hex="hex")
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { defHex, Hexagram } from "../schema";
import Change from "./Change.vue";
import Counting from "./Counting.vue";

export default defineComponent({
  name: "Meaning",
  components: {
    change: Change,
    counting: Counting,
  },
  props: {
    hex: {
      type: Object as PropType<Hexagram>,
      default() {
        return { defHex };
      },
    },
  },
});
</script>

<style scoped lang="postcss">
@import "../assets/styles/variables";

.meaning-node {
  background-color: $paper;
  border: 1px solid $edge;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
  position: relative;
  text-align: center;
  transition: 555ms;
}
</style>

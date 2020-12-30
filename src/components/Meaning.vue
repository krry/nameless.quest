<template lang="pug">
article.meaning-node
  change(
    :hex="hex"
  )
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { defaultHexagram, Hexagram } from "../schema";
import Change from "./Change.vue";

export default defineComponent({
  name: "Meaning",
  components: {
    change: Change,
  },
  props: {
    hex: {
      type: Object as PropType<Hexagram>,
      default() {
        return { defaultHexagram };
      },
    },
  },
});
</script>

<style scoped lang="postcss">
.meaning-node {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
  text-align: center;
  border: 1px solid transparent;
  background-color: transparent;
  transition: 555ms;
}
</style>

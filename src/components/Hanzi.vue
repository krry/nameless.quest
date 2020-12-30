<template lang="pug">
span.char
  div.hanzi {{ char }}
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Hanzi",
  props: {
    char: {
      type: String,
      default: "坤",
    },
    pinyin: {
      type: String,
      default: "kūn",
    },
  },
});
</script>

<style scoped lang="postcss">
.hanzi {
  font-size: 2em;
  padding: 0 0.125em;
}

.char {
  display: inline-block;
}
</style>

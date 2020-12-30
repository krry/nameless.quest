<template lang="pug">
.gram
  span {{ content.position + ". " }}
  span {{ content.meaning }}
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { defaultHexagram as def, Gram } from "../schema";
export default defineComponent({
  name: "Gram",
  props: {
    content: {
      type: Object as PropType<Gram>,
      default: def.lines[0],
    },
  },
});
</script>

<style scoped lang="postcss">
.gram {
}
</style>

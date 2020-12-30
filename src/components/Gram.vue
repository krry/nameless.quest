<template lang="pug">
.gram(v-if="changing === content.position")
  span {{ content.position + ". " }}
  pre {{ content.meaning }}
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { defHex, Gram, defRoll } from "../schema";
export default defineComponent({
  name: "Gram",
  props: {
    content: {
      type: Object as PropType<Gram>,
      default: defHex.lines[0],
    },
    changing: {
      type: Array,
      default: defRoll.changing,
      validator: (values: number[]) => {
        return values.every((val) => {
          return [1, 2, 3, 4, 5, 6].indexOf(val) != -1;
        });
      },
    },
  },
});
</script>

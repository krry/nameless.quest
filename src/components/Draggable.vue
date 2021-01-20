<template lang="pug">
.draggable(
  ref="el"
  :style="style"
  )
  h3 Drag me
  pre {{position}}
  pre {{style}}
  slot
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

import {draggable} from "../composables/draggable";

export default defineComponent({
  name: "Draggable",
  setup() {
    const el = ref<HTMLElement>();
    const dragObj = draggable(el.value);
    if (dragObj) {
      const position = dragObj.position;
      const style = dragObj.style;
      return {
        el,
        position,
        style,
      };
    }
  },
});
</script>

<style lang="postcss">
.dragable {
  font-family: "Lucida Sans", Geneva, Verdana, sans-serif;
  width: 40%;
  max-width: 90%;
  min-width: 20rem;
  min-height: 6.5em;
  margin: 0;
  color: rgb(6, 19, 29);
  background-color: rgb(187, 195, 209);
  border-radius: 1rem;
  padding: 1rem;
  touch-action: none;
  user-select: none;
  -webkit-transform: translate(0, 0);
  transform: translate(0, 0);
  transition: transform 0.1s ease-in, box-shadow 0.1s ease-out;
  border: 1px solid rgb(6, 19, 29);
}

pre {
  width: 48%;
  display: inline-block;
  overflow: hidden;
  font-size: 10px;
}
</style>

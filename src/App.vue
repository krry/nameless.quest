<template lang="pug">
#app
  grid(ref="grid")
  modal(ref="modal")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Grid from "@/components/Grid.vue";
import Modal from "@/components/Modal.vue";

export default defineComponent({
  name: "App",
  components: {
    grid: Grid,
    modal: Modal,
  },
});
</script>

<style lang="postcss">
@import "./assets/styles/variables";

body {
  margin: 0;
  padding: 0;
  color: $wood;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

#app {
  font-family: system-ui, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

@media (orientation: portrait) #app {
  flex-direction: column;
}

@media (orientation: landscape) #app {
  flex-direction: row;
}

pre {
  white-space: break-spaces;
  font-family: inherit;
}
</style>

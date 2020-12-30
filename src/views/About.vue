<template lang="pug">
#about.about.page
  h1 { title }
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      title: "About",
    };
  },
});
</script>

<style lang="postcss">
h1 {
  font-size: 6em;
}
.page {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: center;
  text-align: justify;
}
</style>

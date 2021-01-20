<template lang="pug">
.page.not-found
  h1 404'd
  p The way back yields great fortune.
  router-link(to="{name: 'home'}") Take me home
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {RouterLink} from "vue-router";
export default defineComponent({
  name: "NotFound",
  components: {
    "router-link": RouterLink,
  },
});
</script>

<style lang="postcss" scoped>
.page.not-found {
  background: var(--silk);
}
.not-found h1 {
  color: var(--bad);
}
</style>

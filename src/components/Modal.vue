<template lang="pug">
.modal.fixedfull(v-if="modalOpen")
 dialog
  nav
    router-link (to="/") Home
    router-link (to="/about") About
</template>

<script lang="ts">
// TODO: introduce the app with a dialog
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  name: "Modal",
  components: {
    "router-link": RouterLink,
  },
  props: {},
  data() {
    return {
      modalOpen: false,
    };
  },
  computed: {},
  methods: {},
});
</script>

<style scoped lang="postcss">
.modal {
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

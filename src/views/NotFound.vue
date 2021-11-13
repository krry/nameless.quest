<template lang="pug">
Page.not-found
  LogoBrand
  .font.x3l 404'd
  p The way back yields great fortune.
  router-link(:to="{name: 'oracle'}") Return to the source
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Page from '../components/Page.vue';
import LogoBrand from '../components/LogoBrand.vue';
export default defineComponent({
	name: 'NotFound',
	components: {
		Page,
		LogoBrand,
	},
});
</script>

<style lang="postcss" scoped>
.page.not-found {
	/* background: var(--silk); */
}
.not-found h1 {
	/* color: var(--ground); */
}
</style>

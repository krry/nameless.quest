<template lang="pug">
h2.tagline {{ tagline }}
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { getRandNode } from '../utils';

const TAGLINES = ['A Paean to the I Ching', 'An Oracle for Millennials'];

export default defineComponent({
	name: 'TaglineGenerator',
	setup() {
		const tagline = computed(() => {
			return getRandNode(TAGLINES);
		});
		return {
			tagline,
		};
	},
});
</script>
<style lang="postcss" scoped>
.scope {
	border: 1px solid yellow;
}
</style>

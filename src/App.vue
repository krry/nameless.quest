<template lang="pug">
FeedbackFish(projectId="b186633d70b54b")
AppDrawer
#app.app.rel
	router-view
//- ReloadPrompt
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';
import { set } from './store';
import { FeedbackFish } from '@feedback-fish/vue';
import AppDrawer from './components/AppDrawer.vue';
import { useTimeAgo } from '@vueuse/core';
import { activeTheme, setTheme } from './store/theme';
import * as drawer from './utils/drawer';
import ReloadPrompt from './components/ReloadPrompt.vue';
import { useHead } from '@vueuse/head';
import { appHeadTags } from './utils/head';

const date = '__DATE__';
const timeAgo = useTimeAgo(date);

export default defineComponent({
	name: 'App',
	components: {
		AppDrawer,
		FeedbackFish,
		ReloadPrompt,
	},
	setup() {
		useHead(appHeadTags);
		onMounted(() => {
			setTheme(activeTheme.value);
			drawer.bound();
			window.addEventListener('scroll', drawer.bound);
			window.addEventListener('touchstart', () => set('navvy', true), {
				capture: true,
				passive: true,
			});
			console.log('Built', timeAgo.value);
		});

		onUnmounted(() => {
			window.removeEventListener('scroll', drawer.bound);
		});

		return {
			// set,
			// drawer,
		};
	},
});
</script>

<style lang="postcss" scoped>
.app {
	z-index: 1;
	pointer-events: none;
	scroll-snap-type: x mandatory;
}
</style>

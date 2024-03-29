<template lang="pug">
FeedbackFish(projectId="b186633d70b54b")
AppDrawer
#app.app.rel
	router-view
//- ReloadPrompt
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, watchEffect } from 'vue';
import { cfg, set } from './store';
import { FeedbackFish } from '@feedback-fish/vue';
import AppDrawer from './components/AppDrawer.vue';
import { useTimeAgo } from '@vueuse/core';
import { activeTheme, setTheme } from './store/theme';
import * as drawer from './utils/drawer';
import ReloadPrompt from './components/ReloadPrompt.vue';
import { useHead } from '@vueuse/head';
import { appHeadTags } from './utils/head';
import { useRegisterSW } from 'virtual:pwa-register/vue';

const date = '__DATE__';
const timeAgo = useTimeAgo(date);
const intervalMS = 60 * 60 * 1000;

const { /*offlineReady, needRefresh, */ updateServiceWorker } = useRegisterSW({
	onRegistered(r) {
		console.log('SW registered', r);
		r &&
			setInterval(() => {
				console.log('SW refresh');
				r.update();
			}, intervalMS);
	},
});

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
			updateServiceWorker();
		});

		watchEffect(() => {
			console.log('loading is now', cfg.loading);
		});

		onUnmounted(() => {
			window.removeEventListener('scroll', drawer.bound);
		});
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

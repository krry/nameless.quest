<template lang="pug">
FeedbackFish(projectId="b186633d70b54b")
AppDrawer( @drawer="handleDrawer" )
#app.app.rel
	router-view
</template>

<script lang="ts">
import {defineComponent, onMounted, onUnmounted} from 'vue'
import {useSanityClient} from 'vue-sanity'
import {set} from './store'
import {FeedbackFish} from '@feedback-fish/vue'
import AppDrawer from './components/AppDrawer.vue'
import {activeTheme, setTheme} from './store/theme'

export default defineComponent({
	name: 'App',
	components: {
		AppDrawer,
		FeedbackFish,
	},
	setup() {
		useSanityClient({
			projectId: 'eclxc5mj',
			dataset: 'production',
			useCdn: import.meta.env.PROD,
		})
		function boundDrawer() {
			if (document.documentElement.scrollLeft <= 250) {
				set('drawer', true)
			} else set('drawer', false)
		}

		function openDrawer() {
			window.scrollTo(0, document.documentElement.scrollTop)
		}

		function closeDrawer() {
			const drawerWidth = window.innerWidth < 576 ? window.innerWidth - 48 : 360
			window.scrollTo(drawerWidth, document.documentElement.scrollTop)
		}

		function handleDrawer(bit: boolean) {
			if (bit) openDrawer()
			else closeDrawer()
		}

		onMounted(() => {
			setTheme(activeTheme.value)
			boundDrawer()
			window.addEventListener('scroll', boundDrawer)
			window.addEventListener('touchstart', () => set('navvy', true), true)
		})

		onUnmounted(() => {
			window.removeEventListener('scroll', boundDrawer)
		})

		return {
			set,
			handleDrawer,
		}
	},
})
</script>

<style lang="postcss" scoped>
.app {
	z-index: 1;
	pointer-events: none;
	scroll-snap-type: x mandatory;
}
</style>

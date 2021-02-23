<template lang="pug">
HexaGrid
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import HexaGrid from '../components/HexaGrid.vue'
import {clearLots} from '../store/lots'

export default defineComponent({
	name: 'Home',
	components: {
		HexaGrid,
	},
	mounted() {
		window.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') clearLots()
		})
	},
	unmounted() {
		window.removeEventListener('keydown', (e) => {
			if (e.key === 'Escape') clearLots()
		})
	},
})
</script>

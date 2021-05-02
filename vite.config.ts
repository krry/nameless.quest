import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// prettier-ignore
export default defineConfig({
	plugins: [
		vue(),
		VitePWA()
	],
	optimizeDeps: {
		include: [
			'firebase/app',
			'firebase/auth',
			'firebase/firestore'
		],
		exclude: ['path'],
	},
	build: {
		chunkSizeWarningLimit: 1000,
	},
})

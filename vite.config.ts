import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {VitePWA} from 'vite-plugin-pwa'
import manifestContents from './manifest.config'
import workboxConfig from './workbox.config'

// prettier-ignore
export default defineConfig({
	plugins: [
		vue(),
		VitePWA({
			manifest: manifestContents,
			workbox: workboxConfig,
		})
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

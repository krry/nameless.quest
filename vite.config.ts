import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [vue()],
	optimizeDeps: {
		include: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
		exclude: ['path'],
	},
	build: {
		chunkSizeWarningLimit: 1000,
	},
})

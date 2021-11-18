import { version } from './package.json';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import { replaceCodePlugin as replace } from 'vite-plugin-replace';
import manifestConfig from './manifest.config';
// import workboxConfig from './workbox.config';
import { assets } from './src/config/website';

// prettier-ignore
export default defineConfig({
	plugins: [
		VitePWA({
			includeAssets: assets,
			manifest: manifestConfig,
			// workbox: workboxConfig,
			registerType: 'autoUpdate',
		}),
		vue(),
		replace({
			replacements: [
				{
					from: '__DATE__',
					to: new Date().toISOString(),
				},
				{
					from: '__VERSION__',
					to: version,
				},
			],
		}),
	],
	optimizeDeps: {
		include: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
		exclude: ['path'],
	},
	build: {
		chunkSizeWarningLimit: 1000,
		sourcemap: true,
	},
});

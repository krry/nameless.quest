import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';

export default defineConfig({
	plugins: [vue()],
	test: {
		globals: true,
		environment: 'happy-dom',
		setupFiles: ['./vitest.setup.ts'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			include: ['src/**/*.{ts,vue}'],
			exclude: ['src/**/*.d.ts', 'src/main.ts', 'src/firebase.ts'],
			lines: 30,
			functions: 30,
			branches: 20,
			statements: 30,
		},
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});

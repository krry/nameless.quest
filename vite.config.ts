import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ['firebase/app', 'firebase/auth', 'firebase/database'],
    exclude: ['path'],
  },
})
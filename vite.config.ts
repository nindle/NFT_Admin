import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/admin': {
        target: 'https://api.lionnft.io',
        changeOrigin: true,
      },
    }
  },
  optimizeDeps: {
    // include: ['node_modules'],
    // exclude: ['node_modules'],
  }
})

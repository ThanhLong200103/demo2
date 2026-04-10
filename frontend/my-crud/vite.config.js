import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'v5azrh9id54y.shares.zrok.io', // Thêm link zrok hiện tại của bạn vào đây
      '.zrok.io' // Hoặc thêm cái này để cho phép tất cả các link từ zrok
    ]
  }
})

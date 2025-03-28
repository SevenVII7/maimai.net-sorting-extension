import { defineConfig } from 'vite'

export default defineConfig({
  root: '.', // 預設就是根目錄
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src'
      }
    ]
  },
  build: {
    rollupOptions: {
      input: {
        content: '@/content.ts',
        background: '@/background.ts'
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    port: 3000
  }
})
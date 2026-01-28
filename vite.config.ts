import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    minify: false,
    rolldownOptions: {
      input: {
        // popup: path.resolve(__dirname, 'popup.html'),
        content: path.resolve(__dirname, 'src/content/index.tsx'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        inlineDynamicImports: true,
      },
    },
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
})

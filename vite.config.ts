import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: {
        // popup: path.resolve(__dirname, 'popup.html'),
        content: path.resolve(__dirname, 'src/overlay/content.tsx'),
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
})

/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function githubPagesSpaFallback(): Plugin {
  return {
    name: 'github-pages-spa-fallback',
    enforce: 'post',
    apply: 'build',
    generateBundle(_options, bundle) {
      const indexHtml = bundle['index.html']

      if (indexHtml?.type !== 'asset') {
        throw new Error('index.html is missing from the bundle, cannot emit the 404 fallback')
      }

      this.emitFile({ type: 'asset', fileName: '404.html', source: indexHtml.source })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), githubPagesSpaFallback()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
})

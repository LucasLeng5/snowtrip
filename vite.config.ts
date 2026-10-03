import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// Converts image imports to base64 data URIs so they work in Figma Make's
// server-less in-browser bundled environment (URL paths to /assets/ don't resolve).
function inlineImagesPlugin() {
  const imageRe = /\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i
  const mimeMap: Record<string, string> = {
    jpg: 'image/jpeg', jpeg: 'image/jpeg',
    png: 'image/png', gif: 'image/gif', webp: 'image/webp',
  }
  return {
    name: 'inline-images-as-base64',
    load(id: string) {
      const cleanId = id.split('?')[0]
      if (!imageRe.test(cleanId)) return
      try {
        const data = fs.readFileSync(cleanId)
        const ext = path.extname(cleanId).slice(1).toLowerCase()
        const mime = mimeMap[ext] ?? 'image/jpeg'
        const dataUri = `data:${mime};base64,${data.toString('base64')}`
        return `export default ${JSON.stringify(dataUri)}`
      } catch {
        return null
      }
    },
  }
}


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    inlineImagesPlugin(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  // Proxy /api requests to backend in development
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },

  build: {
    // Fallback: also inline via limit in case plugin is bypassed during production build
    assetsInlineLimit: 10 * 1024 * 1024,
  },
})

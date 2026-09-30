import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/* Das Stylesheet ist klein (~5 KB komprimiert). Direkt ins HTML geschrieben,
   blockiert es den ersten Seitenaufbau nicht mit einer zusätzlichen Anfrage. */
function inlineCss() {
  return {
    name: 'zurio-inline-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const html = bundle['index.html']
      if (!html || html.type !== 'asset') return
      let source = String(html.source)
      for (const [name, file] of Object.entries(bundle)) {
        if (!name.endsWith('.css') || file.type !== 'asset') continue
        const esc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const tag = new RegExp(`<link[^>]*href="/${esc}"[^>]*>`)
        if (!tag.test(source)) continue
        source = source.replace(tag, () => `<style>${String(file.source)}</style>`)
        delete bundle[name]
      }
      html.source = source
    },
  }
}

export default defineConfig({
  plugins: [react(), inlineCss()],
})

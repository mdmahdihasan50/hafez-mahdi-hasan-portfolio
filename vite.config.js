import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mkdir, rm, writeFile } from 'node:fs/promises'

const sitesWorker = () => ({
    name: 'sites-worker-entry',
    async buildStart() {
        await rm('dist', { recursive: true, force: true })
    },
    async closeBundle() {
        await mkdir('dist/server', { recursive: true })
        await writeFile(
            'dist/server/index.js',
            `export default {\n  fetch(request, env) {\n    return env.ASSETS.fetch(request)\n  }\n}\n`,
            'utf8'
        )
    }
})

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), sitesWorker()],
    build: {
        outDir: 'dist/client'
    }
})

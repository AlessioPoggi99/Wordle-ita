import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa"

const pwaOptions: Partial<VitePWAOptions> = {
    workbox: {
        globPatterns: ["**/*"],
    },
    includeAssets: [
        "**/*",
    ],

}

// https://vitejs.dev/config/
export default defineConfig({
    base: "/Wordle-ita",
    plugins: [react(), VitePWA(pwaOptions)],
})

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const pwaOptions: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  workbox: {
    globPatterns: ["**/*"],
  },
  includeAssets: ["**/*"],
  manifest: {
    short_name: "Wordle 🇮🇹",
    name: "Wordle 🇮🇹",
    description:
      "Indovina la parola nascosta in 6 tentativi. Gioca con piu' di 3000 parole italiane.",
    start_url: "./",
    scope: "./",
    theme_color: "#242424",
    background_color: "#242424",
    display: "standalone",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/wordle_logo_512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/wordle_logo_192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/wordle_logo_144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/icons/wordle_logo_32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/icons/wordle-favicon.ico",
        sizes: "32x32",
        type: "image/x-icon",
      },
      {
        src: "/icons/wordle-apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icons/maskable-icon.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/Wordle-ita",
  base: "/",
  plugins: [react(), VitePWA(pwaOptions)],
});

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      devOptions: { enabled: true },
      includeAssets: ["favicon.svg, Inter.ttf"],
      manifest: {
        description: "Weather App",
        display: "fullscreen",
        background_color: "#0f172a",
        icons: [
          {
            src: "/weather/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/weather/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/weather/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/weather/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        name: "Weather App",
        short_name: "Weather",
        theme_color: "#0f172a",
      },
      registerType: "autoUpdate",
    }),
  ],
  base: "/weather/",
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});

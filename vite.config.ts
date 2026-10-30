import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "NFL Jogos",
        short_name: "NFL Jogos",
        description: "Acompanhe os jogos e times da NFL.",
        theme_color: "#111827",
        background_color: "#111827",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icon192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});

import { defineConfig } from "vite";
import { ViteWebfontDownload } from "vite-plugin-webfont-dl";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  envDir: ".env",
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/styles/index.scss";`,
      },
    },
  },
  plugins: [
    ViteWebfontDownload([
      "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Noto+Serif+KR:wght@400&display=swap",
    ]),
    svgr({
      exportAsDefault: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/src"),
    },
  },
  server: {
    host: true,
    port: 6173,
  },
});

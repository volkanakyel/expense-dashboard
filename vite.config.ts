import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(
        path.dirname(new URL(import.meta.url).pathname),
        "./src"
      ),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://maps.googleapis.com/maps/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});

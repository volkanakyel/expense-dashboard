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
        target: "https://api.spoonacular.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {
            const apiKey = `apiKey=${process.env.VITE_APP_SPOONACULAR_API_KEY}`;
            const delimiter = proxyReq.path.includes("?") ? "&" : "?";
            proxyReq.path += delimiter + apiKey;
            console.log("Requesting:", proxyReq.path); // Log the final request path
          });
        },
      },
    },
  },
});

import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import cesium from "vite-plugin-cesium";

// https://vite.dev/config/
export default defineConfig({
  // server: {
  //   host: true,
  //   port: 3000,
  //   proxy: {
  //     "/api": {
  //       target: "http://myOrbitTool-api:8080",
  //       changeOrigin: true,
  //     },
  //   },
  // },
  server: { proxy: { "/api": "http://localhost:8080" } },

  plugins: [react(), cesium(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

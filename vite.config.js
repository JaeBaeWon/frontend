import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000, //3000 개발 환경 //4173 프로덕션 환경
    proxy: {
      "/user": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    sourcemap: true,
    minify: false,
    target: "es2015",
    rollupOptions: {
      input: "index.html",
      output: {
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },
  assetsInclude: ["**/*.png", "**/*.webp"],
});

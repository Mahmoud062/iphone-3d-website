import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sentryVitePlugin({
      org: "xeon",
      project: "javascript-react",
    }),
  ],

  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Three.js and related libraries in separate chunk
          if (
            id.includes("node_modules/three") ||
            id.includes("@react-three/fiber") ||
            id.includes("@react-three/drei")
          ) {
            return "three-vendor";
          }
          // GSAP in separate chunk for better caching
          if (id.includes("node_modules/gsap") || id.includes("@gsap/react")) {
            return "gsap-vendor";
          }
          // Heavy components - lazy loaded on demand
          if (
            id.includes("Model.jsx") ||
            id.includes("ModelView.jsx") ||
            id.includes("IPhone.jsx")
          ) {
            return "model";
          }
          if (id.includes("VideoCarousel.jsx")) {
            return "carousel";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ["gsap", "three"],
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://real-estate-app.cyclic.app",
        // target: "http://localhost:5000",
        secure: true,
      },
    },
  },

  plugins: [react()],
});

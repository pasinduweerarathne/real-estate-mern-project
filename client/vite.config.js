import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://uninterested-tick-sheath-dress.cyclic.app",
        secure: true,
      },
    },
  },

  plugins: [react()],
});

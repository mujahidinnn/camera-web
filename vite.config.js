import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@pages": "/src/pages",
      "@pages2": "/src/pages2",
      "@utils": "/src/utils",
      "@components": "/src/components",
      "@services": "/src/services",
      "@stores": "/src/stores",
      "@styles": "/src/styles",
      "@routes": "/src/routes",
      "@assets": "/src/assets",
      "@hooks": "/src/hooks",
    },
  },
});

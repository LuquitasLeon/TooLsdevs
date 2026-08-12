import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolvePath("./src"),
      // Apuntamos al código fuente de `shared` en vez de a su build: así un
      // cambio en un esquema se refleja al instante con HMR, sin recompilar.
      "@toolsdevs/shared": resolvePath("../shared/src/index.ts"),
    },
  },
  server: {
    port: 5173,
    // Si el puerto está ocupado queremos enterarnos, no que Vite se mude en
    // silencio a otro: el proxy y la lista de CORS del backend apuntan a este.
    strictPort: true,
    proxy: {
      // En desarrollo el frontend llama a /api y Vite lo reenvía al backend.
      // Evita configurar CORS para trabajar en local y hace que la URL de la
      // API sea la misma en desarrollo y en producción.
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
  build: {
    target: "es2022",
    sourcemap: true,
  },
});

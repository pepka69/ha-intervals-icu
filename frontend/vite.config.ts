import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: () => "ha-intervals-icu-card.js"
    },
    outDir: resolve(__dirname, "../custom_components/ha_intervals_icu/frontend"),
    emptyOutDir: true,
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      output: { inlineDynamicImports: true }
    }
  }
});

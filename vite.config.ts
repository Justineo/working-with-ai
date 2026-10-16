import { defineConfig } from "vite-plus";

export default defineConfig({
  lint: { options: { typeAware: true, typeCheck: true } },
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        en: "en/index.html",
      },
    },
  },
});

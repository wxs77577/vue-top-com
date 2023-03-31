import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "node:path";
import analyze from "rollup-plugin-analyzer";

const resolveFile = (path: string = "") => resolve(__dirname, "src", path);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    analyze({
      summaryOnly: true,
      limit: 5,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: {
        index: resolveFile("index"),

        "composables/index": resolveFile("composables"),
        "compilers/index": resolveFile("compilers"),
        "plugins/index": resolveFile("plugins"),

        "compilers/template": resolveFile("compilers/template"),
        "compilers/default": resolveFile("compilers/default"),
        "plugins/api": resolveFile("plugins/api"),
        "plugins/cdn": resolveFile("plugins/cdn"),
        "plugins/eval": resolveFile("plugins/eval"),
        "plugins/url-loader": resolveFile("plugins/url-loader"),
      },
      name: "VueTopCom",
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});

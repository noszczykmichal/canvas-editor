import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import viteTsconfigPaths from "vite-tsconfig-paths";
import sassDts from "vite-plugin-sass-dts";
import checker from "vite-plugin-checker";

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
    },
    plugins: [
      react(),
      eslint(),
      viteTsconfigPaths(),
      checker({
        eslint: {
          // for example, lint .ts and .tsx
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        },
      }),
      sassDts({
        // By default only the `development` mode is enabled, which means that the `d.ts` files are generated only:
        //  - when the `dev` command is running
        //  - and after the source files are changed
        // Let's add the `production` mode so that the `d.ts` files are generated by the `build` command as well.
        enabledMode: ["development", "production"],
        esmExport: true,
      }),
    ],
    server: {
      port: 3000,
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  };
});

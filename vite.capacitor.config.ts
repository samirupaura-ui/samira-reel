import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Separate from vite.config.ts: the normal web/SSR build stays unchanged.
export default defineConfig({
  nitro: false,
  tanstackStart: {
    server: { entry: "server" },
    spa: {
      enabled: true,
      prerender: { outputPath: "/index" },
    },
    prerender: {
      autoStaticPathsDiscovery: false,
      crawlLinks: false,
      failOnError: true,
    },
  },
  vite: {
    environments: {
      client: { build: { outDir: "dist/android/client" } },
      ssr: { build: { outDir: "dist/android/server" } },
    },
  },
});
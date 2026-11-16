import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";

export default defineConfig(({ mode }) => ({
  test: {
    environment: "node",
    globals: true,
    env: loadEnv(mode, process.cwd(), ""), // loads .env.test (Vitest's mode is "test")
    fileParallelism: false, // important, see step 4
  },
}));
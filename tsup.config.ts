import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],

  // Enable TypeScript type definitions to be generated in the output.
  dts: true,

  // Clean the `dist` directory before building.
  // This is useful to ensure the output is only the latest.
  clean: true,

  // Sourcemaps for easier debugging.
  sourcemap: true,
});

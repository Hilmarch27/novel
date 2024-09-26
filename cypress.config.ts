import { defineConfig } from "cypress";

export default defineConfig({
  watchForFileChanges: false,

  viewportWidth: 1366,
  viewportHeight: 768,
  e2e: {
    baseUrl: "http://localhost:3001",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

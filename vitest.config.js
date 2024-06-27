import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // Simulate a web browser environment
    globals: true, // Enable the use of global variables
  },
});

import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  chromeWebSecurity: false,
  viewportWidth: 1280,
  viewportHeight: 1024,
  defaultCommandTimeout: 5000,
  e2e: {
    scrollBehavior: false,
    supportFile: 'src/test/e2e/commands.ts',
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3000',
    specPattern: 'src/test/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});

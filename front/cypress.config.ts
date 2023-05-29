import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  chromeWebSecurity: false,
  viewportWidth: 1280,
  viewportHeight: 1024,
  defaultCommandTimeout: 5000,
  e2e: {
    supportFile: false,
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3000',
    specPattern: 'src/test/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});

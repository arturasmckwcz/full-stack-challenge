import dotenv from 'dotenv';

const copyEnvPlugin = (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
) => {
  // Copy from .env to Cypress config.env
  dotenv.config();
  config.env = { ...config.env, ...process.env };

  return config;
};

export default copyEnvPlugin;

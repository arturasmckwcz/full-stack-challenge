import copyEnvPlugin from './copyEnvPlugin';

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
) => {
  on('before:browser:launch', copyEnvPlugin);

  return config;
};

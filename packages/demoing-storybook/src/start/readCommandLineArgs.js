const commandLineArgs = require('command-line-args');
const { readCommandLineArgs: esDevServerCommandLineArgs } = require('es-dev-server');

module.exports = function readCommandLineArgs() {
  const optionDefinitions = [
    {
      name: 'config-dir',
      alias: 'd',
      type: String,
      defaultValue: './.storybook',
      description: 'Location of storybook configuration',
    },
    {
      name: 'stories',
      alias: 's',
      description: 'List of story files e.g. --stories stories/*.stories.{js,mdx}',
    },
  ];

  const storybookServerConfig = commandLineArgs(optionDefinitions, { partial: true });
  const esDevServerConfig = esDevServerCommandLineArgs(storybookServerConfig._unknown || []);

  if (!storybookServerConfig.stories) {
    console.log(`You have to provide stories like --stories './stories/*.stories.{js,mdx}'`);
    process.exit(1);
  }

  return { storybookServerConfig, esDevServerConfig };
};

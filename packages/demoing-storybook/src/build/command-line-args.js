const commandLineArgs = require('command-line-args');
const path = require('path');

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
      name: 'output-dir',
      alias: 'o',
      type: String,
      defaultValue: path.join(process.cwd(), 'static-storybook'),
      description: 'Rollup build output directory',
    },
  ];

  const storybookServerConfig = commandLineArgs(optionDefinitions);

  return storybookServerConfig;
};

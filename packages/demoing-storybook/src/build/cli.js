#!/usr/bin/env node
const build = require('./build');
const readCommandLineArgs = require('./readCommandLineArgs');

(async function main() {
  const config = readCommandLineArgs();
  await build({ storybookConfigDir: config['config-dir'], outputDir: config['output-dir'] });
})();

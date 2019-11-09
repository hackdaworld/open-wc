#!/usr/bin/env node

/* eslint-disable no-console */

const build = require('./build');
const readCommandLineArgs = require('./readCommandLineArgs');
const listFiles = require('../shared/listFiles');

(async function main() {
  const config = readCommandLineArgs();
  const storiesPattern = `${process.cwd()}/${config.stories}`;
  const storyUrls = (await listFiles(storiesPattern)).map(path =>
    path.replace(`${process.cwd()}/`, ''),
  );

  await build({
    storybookConfigDir: config['config-dir'],
    storyUrls,
    outputDir: config['output-dir'],
  });
})();

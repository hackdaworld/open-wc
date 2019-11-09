#!/usr/bin/env node

/* eslint-disable no-console */

const { createConfig, startServer } = require('es-dev-server');

const readCommandLineArgs = require('./readCommandLineArgs');
const createServeManagerMiddleware = require('./middleware/createServeManagerMiddleware');
const createServePreviewTransformer = require('./transformers/createServePreviewTransformer');
const mdxToJSTransformer = require('./transformers/mdxToJS');
const getAssets = require('../shared/getAssets');
const listFiles = require('../shared/listFiles');

async function run() {
  const config = readCommandLineArgs();
  const storybookConfigDir = config.storybookServerConfig['config-dir'];
  const storiesPattern = `${process.cwd()}/${config.storybookServerConfig.stories}`;
  const storyUrls = (await listFiles(storiesPattern)).map(path =>
    path.replace(`${process.cwd()}/`, ''),
  );

  const assets = getAssets({ storybookConfigDir, storyUrls });

  config.esDevServerConfig.middlewares = [
    createServeManagerMiddleware(assets),
    ...(config.esDevServerConfig.middlewares || []),
  ];

  config.esDevServerConfig.responseTransformers = [
    mdxToJSTransformer,
    createServePreviewTransformer(assets),
    ...(config.esDevServerConfig.responseTransformers || []),
  ];

  startServer(createConfig(config.esDevServerConfig));

  ['exit', 'SIGINT'].forEach(event => {
    // @ts-ignore
    process.on(event, () => {
      process.exit(0);
    });
  });
}

run();

#!/usr/bin/env node
const { createConfig, startServer } = require('es-dev-server');
const readCommandLineArgs = require('./readCommandLineArgs');
const createServeManagerMiddleware = require('./middleware/createServeManagerMiddleware');
const createServePreviewTransformer = require('./transformers/createServePreviewTransformer');
const mdxToJSTransformer = require('./transformers/mdxToJS');
const createAssets = require('../shared/getAssets');

const config = readCommandLineArgs();
const storybookConfigDir = config.storybookServerConfig['config-dir'];
const assets = createAssets({ storybookConfigDir });

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

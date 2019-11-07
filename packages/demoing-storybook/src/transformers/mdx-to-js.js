const fs = require('fs');
const path = require('path');
const mdx = require('@mdx-js/mdx');
const { transformAsync } = require('@babel/core');
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const exists = promisify(fs.exists);

const compilers = [createCompiler({})];

async function transformMdxToJS(url) {
  // TODO: how to get path from url? combine with app index?
  const filepath = './packages/demoing-storybook/demo/stories/demo-wc-card.stories.mdx';

  if (!(await exists(filepath))) {
    return null;
  }

  const src = await readFile(filepath, 'utf-8');
  // TODO: get browser url to build preview
  const pathToPrebuilt = '/node_modules/@open-wc/storybook-prebuilt/dist/preview.js';
  const jsx = `
    import { React, mdx } from '${pathToPrebuilt}'
    ${await mdx(src, { compilers, filepath })}

    // TODO VVV
  `.replace('@storybook/addon-docs/blocks', pathToPrebuilt);

  return transformAsync(jsx, {
    filename: filepath,
    plugins: [require.resolve('@babel/plugin-transform-react-jsx')],
  }).then(result => result.code);
}

module.exports = async function mdxToJS({ url, body }) {
  if (url.endsWith('.mdx')) {
    const newBody = await transformMdxToJS(url);
    if (newBody) {
      return { body: newBody, contentType: 'text/javascript' };
    }
  }
};

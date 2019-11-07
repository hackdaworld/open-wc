const fs = require('fs');
const mdx = require('@mdx-js/mdx');
const { transformAsync } = require('@babel/core');
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');

const compilers = [createCompiler({})];

async function transformMdxToJS(url, body) {
  const filePath = `.${url}`;
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const urlToPrebuilt = require
    .resolve('@open-wc/storybook-prebuilt/dist/preview.js')
    .replace(process.cwd(), '');

  const jsx = `
    import { React, mdx } from '${urlToPrebuilt}';
    
    ${await mdx(body, { compilers, filepath: filePath })}
  `.replace('@storybook/addon-docs/blocks', urlToPrebuilt);

  return transformAsync(jsx, {
    filename: filePath,
    plugins: [require.resolve('@babel/plugin-transform-react-jsx')],
  }).then(result => result.code);
}

module.exports = async function mdxToJS({ url, body }) {
  if (url.endsWith('.mdx')) {
    const newBody = await transformMdxToJS(url, body);
    if (newBody) {
      return { body: newBody, contentType: 'text/javascript' };
    }
  }
  return null;
};

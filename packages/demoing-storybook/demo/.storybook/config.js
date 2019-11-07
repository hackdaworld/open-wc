import {
  configure,
  addParameters,
  addDecorator,
  setCustomElements,
  withA11y,
} from '../../index.js';

async function run() {
  const customElements = await (await fetch(
    new URL('../custom-elements.json', import.meta.url),
  )).json();
  setCustomElements(customElements);

  const storyFileUrls = await (await fetch(
    new URL(encodeURI('/get-story-urls?pattern=../stories/*.stories.{js,mdx}'), import.meta.url),
  )).json();

  const stories = await Promise.all(
    storyFileUrls.map(fileUrl => new URL(fileUrl, location.href)).map(urlObj => import(urlObj)),
  );

  addDecorator(withA11y);

  addParameters({
    a11y: {
      config: {},
      options: {
        checks: { 'color-contrast': { options: { noScroll: true } } },
        restoreScroll: true,
      },
    },
    options: {
      hierarchyRootSeparator: /\|/,
    },
    docs: {
      iframeHeight: '200px',
    },
  });

  configure(() => stories, {});
}

run();

Prio:

- fix path/url TODOs in mdx-to-js transformer
- Add endpoint on es-dev-server get list of files based on glob patterns
- Rename config.js to main.js (storybook already allows the new format)

Need:

- export neede stuff from '@storybook/addon-docs' via prebuilt... so we do not need the dependency
- cleanup demo folder
- Add `storybook-build` command
  - Build using rollup or webpack

Nice to have:

- Investigate tree shaking / compiling smaller bundle
- Review if all addons are worth their weight

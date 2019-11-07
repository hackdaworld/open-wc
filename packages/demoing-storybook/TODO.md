Prio:

- Rename config.js to main.js (storybook already allows the new format)

Need:

- getStoryUrlMiddleware: security do not allow to check files outside of server
- export neede stuff from '@storybook/addon-docs' via prebuilt... so we do not need the dependency
- cleanup demo folder
- make storybook-start work on IE11

Nice to have:

- Investigate tree shaking / compiling smaller bundle
- Review if all addons are worth their weight
- Allow configuring static files (copy job) in build config
- Allow extending rollup configuration
- mdx transform sourcemaps

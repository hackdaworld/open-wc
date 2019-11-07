const fs = require('fs');
const glob = require('glob');

function listFiles(fromGlob) {
  return new Promise(resolve => {
    glob(fromGlob, {}, (er, files) => {
      resolve(files.filter(filePath => !fs.lstatSync(filePath).isDirectory()));
    });
  });
}

module.exports = function createGetStoryUrlsMiddleware({ storybookConfigDir }) {
  /**
   * Get the list of files
   */
  return async function getStoryUrlsMiddleware(ctx, next) {
    const cleanURL = ctx.url.split('?')[0].split('#')[0];

    if (cleanURL === '/get-story-urls') {
      const urlObj = new URL(ctx.url, 'http://localhost');
      const pattern = urlObj.searchParams.get('pattern');
      const searchDir = `./${storybookConfigDir}/${pattern}`;
      const files = await listFiles(searchDir);
      // TODO: security do not allow to check files outside of server
      ctx.body = JSON.stringify(files);
      ctx.response.set('content-type', 'application/json');
    }

    return next();
  };
};

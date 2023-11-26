const glob = require('glob');
const path = require('path');

const apiFiles = glob.sync(path.join(__dirname, 'data/**.json'));

const data = {};

apiFiles.forEach((filePath) => {
  const url = path.parse(filePath).name;
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const api = require(filePath);
  data[url] = api;
});

module.exports = data;

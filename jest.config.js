const path = require('path');

const rootDir = path.resolve(__dirname);

module.exports = {
  moduleNameMapper: {
    'styled-components': `${rootDir}/node_modules/styled-components/dist/styled-components.native.cjs.js`,
  },
  preset: 'react-native',
};

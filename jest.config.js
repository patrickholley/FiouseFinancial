module.exports = {
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': '<rootDir>/src/testUtils/assetsTransformer.js',
    'styled-components': '<rootDir>/node_modules/styled-components/dist/styled-components.native.cjs.js',
  },
  preset: 'react-native',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/?!(react-native)',
  ],
  verbose: true,
};

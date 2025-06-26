module.exports = {
    preset: 'react-native',
    setupFilesAfterEnv: [
      '@testing-library/jest-native/extend-expect',
      './jest.setup.js'
    ],
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)'
    ],
    globals: {
      __DEV__: true,
    },
  };
  
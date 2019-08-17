module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./__mocks__/mockAsyncStorage.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['node_modules/(?!(jest-)?react-native|react-navigation)'],
  testPathIgnorePatterns: ['/cli/*', '/node_modules/'],
};

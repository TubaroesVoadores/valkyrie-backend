module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/functions/**/*.js',
    '<rootDir>/scripts/*.js',
  ],
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
};

module.exports = {
  collectCoverageFrom: ['<rootDir>/src/functions/**/*.js'],
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
};
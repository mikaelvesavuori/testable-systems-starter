module.exports = {
  collectCoverage: true,
  //collectCoverageFrom: ['./src/**/*'],
  coverageDirectory: 'jest-coverage',
  coverageThreshold: {
    global: {
      statements: 95
    }
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  setupFiles: ['<rootDir>/jest.env.js'],
  //setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['<rootDir>/tests/unit/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  testTimeout: 15000
};

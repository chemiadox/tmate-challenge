const MIN_COVERAGE_THRESHOLD = 100;

module.exports = {
  rootDir: '.',
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  coveragePathIgnorePatterns: [],
  coverageThreshold: {
    global: {
      branches: MIN_COVERAGE_THRESHOLD,
      functions: MIN_COVERAGE_THRESHOLD,
      lines: MIN_COVERAGE_THRESHOLD,
      statements: MIN_COVERAGE_THRESHOLD,
    },
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/docker/', '<rootDir>/node_modules/'],
  testRegex: '\\.spec.ts$',
  transform: {
    '^.+\\.(ts)s$': 'ts-jest',
  },
  preset: 'ts-jest',
  maxWorkers: 4,
};

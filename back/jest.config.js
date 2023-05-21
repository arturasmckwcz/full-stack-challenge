// eslint-disable-next-line no-undef
module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/src/**/*.test.(ts|js)'],
  testEnvironment: 'node',
  moduleNameMapper: {
    'src(.*)$': '<rootDir>/src/$1',
  },
};

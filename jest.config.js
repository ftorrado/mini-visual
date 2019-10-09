const { defaults } = require('jest-config');
module.exports = {
  roots: ['<rootDir>/src'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

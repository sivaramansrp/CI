/* eslint-disable */
export default {
  displayName: 'se',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../coverage/apps/se',
  collectCoverageFrom: [
    'src/app/application/tramites/80101/**/*.ts',
  ],
  testMatch: [
    '<rootDir>/src/app/application/tramites/80101/**/*.spec.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 80,
    },
    'apps/se/src/app/application/tramites/80101/**/*.ts': {
      statements: 80,
    },
  },
  verbose: true,
  coverageReporters: ['text-summary', 'html'],
  coveragePathIgnorePatterns: [
    'src/app/application/.*\\.(module|store|query|enums?|enum|model|constants?|constantes|interfaces?)\\.ts$',
    'src/app/application/seleccion-tramite/.*\\.ts$',
  ],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  transformIgnorePatterns: [],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
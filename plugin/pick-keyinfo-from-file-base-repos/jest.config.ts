/* eslint-disable */
export default {
  displayName: 'plugin-pick-keyinfo-from-file-base-repos',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/plugin/pick-keyinfo-from-file-base-repos',
};

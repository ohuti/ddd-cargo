/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  testMatch: ['**.spec.ts'],
  moduleNameMapper: {
    "@shared/(.*)": ["<rootDir>src/shared/$1"],
    "@domain/(.*)": ["<rootDir>src/modules/domain/$1"],
    "@adapters/(.*)": ["<rootDir>src/modules/adapters/$1"],
    "@useCases/(.*)": ["<rootDir>src/modules/useCases/$1"],
    "@repos/(.*)": ["<rootDir>src/modules/infrastructure/repos/$1"],
    "@controllers/(.*)": ["<rootDir>src/modules/interfaces/controllers/$1"],

    "@userDomain/(.*)": ["<rootDir>src/modules/domain/models/user/$1"],
  },
}

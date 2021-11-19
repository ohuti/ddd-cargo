/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  testMatch: ['**.spec.ts'],
  moduleNameMapper: {
    "@shared/(.*)": ["<rootDir>src/shared/$1"],
    "@booking/(.*)": ["<rootDir>src/modules/booking/$1"],
    "@incidentRegistry/(.*)": ["<rootDir>src/modules/incidentRegistry/$1"],
    "@tracking/(.*)": ["<rootDir>src/modules/tracking/$1"],
    "@users/(.*)": ["<rootDir>src/modules/users/$1"],
  },
}

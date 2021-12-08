module.exports = {
    transform: {
        '^.+\\.(t|j)sx?$': ['@swc-node/jest'],
    },
    testEnvironment: 'node',
    verbose: true,
    testMatch: ['**.spec.ts'],
    moduleNameMapper: {
        "@shared/(.*)": ["<rootDir>src/shared/$1"],
        
        "@adapters/(.*)": ["<rootDir>src/modules/adapters/$1"],
        "@repos/(.*)": ["<rootDir>src/modules/domain/repos/$1"],
        
        "@domainModels/(.*)": ["<rootDir>src/modules/domain/models/$1"],
        "@domainServices/(.*)": ["<rootDir>src/modules/domain/services/$1"],
        
        "@useCases/(.*)": ["<rootDir>src/modules/useCases/$1"],
        "@controllers/(.*)": ["<rootDir>src/modules/interfaces/controllers/$1"],
    },
}

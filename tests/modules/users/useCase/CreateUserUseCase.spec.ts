import { CreateUserDTO } from '@adapters/user/CreateUserDTO'
import { CreateUserUseCase } from '@useCases/user/createUser/CreateUserUseCase'
import { MockedUserRepo } from '../mockedRepo/MockedUserRepo'

let createUserUseCase: CreateUserUseCase

beforeAll(() => {
    const userRepo = new MockedUserRepo()
    createUserUseCase = new CreateUserUseCase(userRepo)
})

test('Create commom user', async () => {
    const dto: CreateUserDTO = {
        email: 'alexandre.ottoni@cargo.com',
        name: 'Alexandre Ottoni',
        password: '1234567890'
    }

    const userOrError = await createUserUseCase.execute(dto)

    expect(userOrError.isRight()).toBe(true)
})

test('Create admin user', async () => {
    const dto: CreateUserDTO = {
        email: 'alexandre@cargo.com',
        name: 'Alexandre Ottoni',
        password: '1234567890'
    }

    const userOrError = await createUserUseCase.execute(dto)

    expect(userOrError.isRight()).toBe(false)
})

test('Email already registered', async () => {
    const dto: CreateUserDTO = {
        email: 'alexandre@cargo.com',
        name: 'Alexandre Ottoni',
        password: '1234567890'
    }

    const userOrError = await createUserUseCase.execute(dto)

    expect(userOrError.isRight()).toBe(false)
})

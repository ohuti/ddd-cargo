import { CreateUserDTO } from '@users/adapters/CreateUserDTO'
import { CreateUserUseCase } from '@users/useCases/createUser/CreateUserUseCase'
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
        occupation: 'sender',
        password: '1234567890'
    }

    const userOrError = await createUserUseCase.execute(dto)

    expect(userOrError.isRight()).toBe(true)
})

test('Create admin user', async () => {
    const dto: CreateUserDTO = {
        email: 'alexandre@cargo.com',
        name: 'Alexandre Ottoni',
        occupation: 'admin',
        password: '1234567890'
    }

    const userOrError = await createUserUseCase.execute(dto)

    expect(userOrError.isRight()).toBe(false)
})

test('Email already registered', async () => {
    const dto: CreateUserDTO = {
        email: 'alexandre@cargo.com',
        name: 'Alexandre Ottoni',
        occupation: 'sender',
        password: '1234567890'
    }

    const userOrError = await createUserUseCase.execute(dto)

    expect(userOrError.isRight()).toBe(false)
})

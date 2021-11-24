import { CreateUserDTO } from '@users/adapters/CreateUserDTO'
import { CreateUserUseCase } from '@users/useCases/createUser/CreateUserUseCase'

let createUserUseCase: CreateUserUseCase

beforeAll(() => {
    createUserUseCase = new CreateUserUseCase()
})

test('Create commom user', async () => {
    const dto: CreateUserDTO = {
        email: 'alexandre@cargo.com',
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

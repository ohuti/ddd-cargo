import { CreateUserUseCase } from './createUser/CreateUserUseCase'

import { userRepo } from '@domain/repos/user'

const createUserUseCase = new CreateUserUseCase(userRepo)

export {
    createUserUseCase
}

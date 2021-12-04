import { CreateUserUseCase } from './createUser/CreateUserUseCase'

import { userRepo } from '@repos/user'

const createUserUseCase = new CreateUserUseCase(userRepo)

export {
    createUserUseCase
}

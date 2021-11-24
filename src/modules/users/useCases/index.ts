import { CreateUserUseCase } from './createUser/CreateUserUseCase'

import { userRepo } from '@users/repos'

const createUserUseCase = new CreateUserUseCase(userRepo)

export {
    createUserUseCase
}

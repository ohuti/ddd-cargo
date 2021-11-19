import { CreateUserController } from './CreateUserController'

import { createUserUseCase } from '@users/useCases'

const createUserController = new CreateUserController(createUserUseCase)

export {
    createUserController
}

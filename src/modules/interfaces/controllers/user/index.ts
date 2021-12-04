import { CreateUserController } from './CreateUserController'

import { createUserUseCase } from '@useCases/user'

const createUserController = new CreateUserController(createUserUseCase)

export {
    createUserController
}

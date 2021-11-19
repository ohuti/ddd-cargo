import { Result } from '@shared/core/Result'
import { left, right } from '@shared/core/Either'
import { UseCase } from '@shared/core/UseCase'

import { CreateUserDTO } from '@users/adapters/CreateUserDTO'

import { CreateUserResponse } from './CreateUserResponse'
import { CreateUserErrors } from './CreateUserErrors'

export class CreateUserUseCase implements UseCase<CreateUserDTO, Promise<CreateUserResponse>> {
    async execute(request: CreateUserDTO) {
        console.log(request)
        console.log('[UseCase]: Criando usuário do tipo cliente!')

        if (request.fail) {
            const error = new CreateUserErrors.EmailAlreadyExists(request.email)

            return left(error) as CreateUserResponse
        }

        const response = new Result<void>(true)

        return right(response) as CreateUserResponse
    }
}

import { Result } from '@shared/core/Result'
import { left, right } from '@shared/core/Either'
import { UseCase } from '@shared/core/UseCase'

import { CreateUserDTO } from '@users/adapters/CreateUserDTO'

import { CreateUserResponse } from './CreateUserResponse'
import { CreateUserErrors } from './CreatetUserErrors'

import { UserEmail } from '@users/domain/UserEmail'
import { UserName } from '@users/domain/UserName'
import { UserPassword } from '@users/domain/UserPassword'
import { User } from '@users/domain/User'
import { UserOcupation } from '@users/domain/UserOccupation'

export class CreateUserUseCase implements UseCase<CreateUserDTO, Promise<CreateUserResponse>> {
    async execute(request: CreateUserDTO) {
        const {
            email,
            name,
            password,
            occupation
        } = request
        
        const emailOrError = UserEmail.create(email)
        const nameOrError = UserName.create(name)
        const passwordOrError = UserPassword.create(password)
        const occupationOrError = UserOcupation.create(occupation)
        
        const voResult = Result.combine([
            emailOrError,
            nameOrError,
            passwordOrError,
            occupationOrError
        ])
        
        if (voResult.isFailure) {
            const error = new CreateUserErrors.InvalidParam(voResult.error)
            return left(error) as CreateUserResponse
        }

        if (occupationOrError.getValue().props.value === 'admin') {
            const error = new CreateUserErrors.AdminCreationNotAllowed()
            return left(error) as CreateUserResponse
        }
        
        const recipient = User.create({
            email: emailOrError.getValue(),
            name: nameOrError.getValue(),
            password: passwordOrError.getValue(),
            occupation: occupationOrError.getValue()
        })
        
        if (recipient.isFailure) {
            const error = new CreateUserErrors.FailedToCreateRecipient(recipient.errorValue())
            
            return left(error) as CreateUserResponse
        }
        
        return right(Result.ok()) as CreateUserResponse
    }
}

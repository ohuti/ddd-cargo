import { Result } from '@shared/core/Result'
import { left, right } from '@shared/core/Either'
import { UseCase } from '@shared/core/UseCase'

import { CreateUserDTO } from '@adapters/user/CreateUserDTO'

import { CreateUserResponse } from './CreateUserResponse'
import { CreateUserErrors } from './CreatetUserErrors'

import { UserEmail } from '@userDomain/UserEmail'
import { UserName } from '@userDomain/UserName'
import { UserPassword } from '@userDomain/UserPassword'
import { User } from '@userDomain/User'

import { IUserRepo } from '@repos/user/IUserRepo'

export class CreateUserUseCase implements UseCase<CreateUserDTO, CreateUserResponse> {
    private userRepo: IUserRepo
    
    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo
    }

    async execute(request: CreateUserDTO) {
        const {
            email,
            name,
            password,
        } = request
        
        const emailOrError = UserEmail.create(email)
        const nameOrError = UserName.create(name)
        const passwordOrError = UserPassword.create(password)
        
        const voResult = Result.combine([
            emailOrError,
            nameOrError,
            passwordOrError,
        ])
        
        if (voResult.isFailure) {
            const error = new CreateUserErrors.InvalidParam(voResult.error)
            return left(error) as CreateUserResponse
        }

        const emailAlreadyRegistered = await this.userRepo.emailAlreadyRegistered(emailOrError.getValue())
        if (emailAlreadyRegistered) {
            const error = new CreateUserErrors.EmailAlreadyRegistered('E-mail already registered!')
            return left(error) as CreateUserResponse
        }
        
        const userOrError = User.create({
            email: emailOrError.getValue(),
            name: nameOrError.getValue(),
            password: passwordOrError.getValue(),
        })

        await this.userRepo.save(userOrError.getValue())
        
        return right(Result.ok()) as CreateUserResponse
    }
}

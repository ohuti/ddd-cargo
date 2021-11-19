import { Result } from '@shared/core/Result'
import { left, right } from '@shared/core/Either'
import { UseCase } from '@shared/core/UseCase'

import { CreateUserDTO } from '@users/adapters/CreateUserDTO'

import { CreateRecipientResponse } from './CreateRecipientResponse'
import { CreateUserErrors } from '../CreatetUserErrors'

import { ClientEmail } from '@users/domain/ClientEmail'
import { ClientName } from '@users/domain/ClientName'
import { ClientPassword } from '@users/domain/ClientPassword'
import { Client } from '@users/domain/Client'
import { ClientOcupation } from '@users/domain/ClientOccupation'

export class CreateRecipientUseCase implements UseCase<CreateUserDTO, Promise<CreateRecipientResponse>> {
    async execute(request: CreateUserDTO) {
        const {
            email,
            name,
            password
        } = request
        
        const emailVO = ClientEmail.create(email)
        const nameVO = ClientName.create(name)
        const passwordVO = ClientPassword.create(password)
        const occupationVO = ClientOcupation.create('Recipient')

        if (emailVO.isFailure) {
            const error = new CreateUserErrors.InvalidParam(emailVO.errorValue())
            return left(error) as CreateRecipientResponse
        }
        if (nameVO.isFailure) {
            const error = new CreateUserErrors.InvalidParam(nameVO.errorValue())
            return left(error) as CreateRecipientResponse
        }
        if (passwordVO.isFailure) {
            const error = new CreateUserErrors.InvalidParam(passwordVO.errorValue())
            return left(error) as CreateRecipientResponse
        }

        const recipient = Client.create({
            email: emailVO.getValue(),
            name: nameVO.getValue(),
            password: passwordVO.getValue(),
            occupation: occupationVO.getValue()
        })

        if (recipient.isFailure) {
            const error = new CreateUserErrors.FailedToCreateRecipient(recipient.errorValue())

            return left(error) as CreateRecipientResponse
        }

        const response = new Result<void>(true)
        return right(response) as CreateRecipientResponse
    }
}

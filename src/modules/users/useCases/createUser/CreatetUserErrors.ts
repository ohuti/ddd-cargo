import { Result } from '@shared/core/Result'
import { UseCaseError } from '@shared/core/UseCaseError'

export namespace CreateUserErrors {
    export class InvalidParam extends Result<UseCaseError> {
        constructor(message: any) {
            super(false, { message })
        }
    }

    export class AdminCreationNotAllowed extends Result<UseCaseError> {
        constructor() {
            const message = 'Create user with admin profile is not allowed! Please contact support to create this user.'
            super(false, { message })
        }
    }

    export class FailedToCreateRecipient extends Result<UseCaseError> {
        constructor(error: any) {
            const message = 'Não foi possível criar o usuário'
            console.error(`[CreateRecipientUseCase]: ${error}`)
            super(false, { message })
        }
    }
}

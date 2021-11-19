import { Result } from '@shared/core/Result'
import { UseCaseError } from '@shared/core/UseCaseError'

export namespace CreateUserErrors {
    export class EmailAlreadyExists extends Result<UseCaseError> {
        constructor(email: string) {
            const message = `O e-mail ${email} não é válido!`
            super(false, { message })
        }
    }
}

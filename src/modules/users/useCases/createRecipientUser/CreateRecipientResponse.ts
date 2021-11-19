import { Either } from '@shared/core/Either'
import { Result } from '@shared/core/Result'
import { CreateUserErrors } from '@users/useCases/CreatetUserErrors'

export type CreateRecipientResponse = Either<
    CreateUserErrors.InvalidParam |
    CreateUserErrors.FailedToCreateRecipient |
    Result<any>,
    Result<void>
>
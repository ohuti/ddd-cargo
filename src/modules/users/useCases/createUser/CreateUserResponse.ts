import { Either } from '@shared/core/Either'
import { Result } from '@shared/core/Result'
import { CreateUserErrors } from '@users/useCases/createUser/CreatetUserErrors'

export type CreateUserResponse = Either<
    CreateUserErrors.InvalidParam |
    CreateUserErrors.FailedToCreateRecipient |
    Result<any>,
    Result<void>
>

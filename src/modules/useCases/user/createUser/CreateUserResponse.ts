import { Either } from '@shared/core/Either'
import { Result } from '@shared/core/Result'
import { CreateUserErrors } from './CreatetUserErrors'

export type CreateUserResponse = Either<
    CreateUserErrors.InvalidParam |
    CreateUserErrors.EmailAlreadyRegistered |
    CreateUserErrors.AdminCreationNotAllowed |
    Result<any>,
    Result<void>
>
import { Either } from '@shared/core/Either'
import { Result } from '@shared/core/Result'
import { AppError } from '@shared/core/AppError'
import { CreateUserErrors } from './CreatetUserErrors'

export type CreateUserResponse = Either<
    CreateUserErrors.InvalidParam |
    CreateUserErrors.EmailAlreadyRegistered |
    CreateUserErrors.AdminCreationNotAllowed |
    AppError.UnexpectedError,
    Result<void>
>

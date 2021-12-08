import { Either } from '@shared/core/Either'
import { Result } from '@shared/core/Result'
import { AppError } from '@shared/core/AppError'

export type RegisterCargoResponse = Either<
    AppError.UnexpectedError,
    Result<void>
>

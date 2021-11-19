import { Either } from '@shared/core/Either'
import { Result } from '@shared/core/Result'
import { UseCaseError } from '@shared/core/UseCaseError'

export type CreateUserResponse = Either<Result<UseCaseError>, Result<void>>
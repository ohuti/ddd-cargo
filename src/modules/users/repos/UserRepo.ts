import { Repo } from '@shared/core/Repo'
import { UserEmail } from '@users/domain/UserEmail'

export interface IUserRepo<T> extends Repo<T> {
    emailAlreadyRegistered (email: UserEmail): Promise<boolean>
}
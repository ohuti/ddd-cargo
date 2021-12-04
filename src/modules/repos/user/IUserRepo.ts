import { UserEmail } from '@userDomain/UserEmail'
import { Repo } from '@shared/core/Repo'

export interface IUserRepo<User> extends Repo<User> {
    emailAlreadyRegistered (email: UserEmail): Promise<boolean>
}
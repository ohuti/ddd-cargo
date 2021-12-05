import { Repo } from '@shared/core/Repo'

import { User } from '@userDomain/User'
import { UserEmail } from '@userDomain/UserEmail'
export interface IUserRepo extends Repo<User> {
    emailAlreadyRegistered (email: UserEmail): Promise<boolean>
}
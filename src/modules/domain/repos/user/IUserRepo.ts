import { Repo } from '@shared/core/Repo'

import { User } from '@domainModels/user/User'
import { UserEmail } from '@domainModels/user/UserEmail'
export interface IUserRepo extends Repo<User> {
    emailAlreadyRegistered (email: UserEmail): Promise<boolean>
}
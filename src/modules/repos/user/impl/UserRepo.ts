import { User } from '@userDomain/User'
import { UserEmail } from '@userDomain/UserEmail'
import { IUserRepo } from '../IUserRepo'

export default class UserRepo implements IUserRepo<User> {
    async emailAlreadyRegistered(email: UserEmail): Promise<boolean> {
        return email.value === 'ohuti@cargo.com.br'
    }
    async exists(user: User): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
    async delete(user: User): Promise<any> {
        throw new Error('Method not implemented.')
    }
    async getById(id: string): Promise<User> {
        throw new Error('Method not implemented.')
    }
    async save(user: User): Promise<any> {
        return
    }
}

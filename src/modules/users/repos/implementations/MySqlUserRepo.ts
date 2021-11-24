import { User } from '@users/domain/User'
import { IUserRepo } from '../UserRepo'

export class MySqlUserRepo implements IUserRepo<User> {
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
        throw new Error('Method not implemented.')
    }

    async getByEmail(email: string): Promise<User> {
        throw new Error('Method not implemented.')
    }
}

import { UserMapper } from '@adapters/user/UserMapper'
import { User } from '@domainModels/user/User'
import { UserEmail } from '@domainModels/user/UserEmail'
import { IUserRepo } from '../IUserRepo'

const persistedUsers: any[] = [
    {
        userId: '1',   
        name: 'André Ohuti',
        email: 'andre@cargo.com',
        password: '1234567890',
        occupation: 'admin'
    }
]

export default class UserRepo implements IUserRepo {
    async emailAlreadyRegistered(email: UserEmail): Promise<boolean> {
        return persistedUsers.filter(persistedUser => persistedUser.email === email.value).length > 0
    }
    async exists(user: User): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
    async delete(user: User): Promise<any> {
        throw new Error('Method not implemented.')
    }
    async getById(id: string): Promise<User> {
        const persistedUser = persistedUsers.find(persistedUser => persistedUser.userId === id) ?? null

        if(!persistedUser) return persistedUser

        return UserMapper.toDomain(persistedUser)
    }
    async save(user: User): Promise<any> {
        const userToPersist = UserMapper.toPersistence(user)

        persistedUsers.push(userToPersist)

        return 'ok'
    }
}

import { UserMapper } from '@adapters/user/UserMapper'
import { User } from '@domainModels/user/User'
import { UserEmail } from '@domainModels/user/UserEmail'

import { IUserRepo } from '@repos/user/IUserRepo'

const registeredUsers = [
    {
        userId: '1',   
        name: 'André Ohuti',
        email: 'andre@cargo.com',
        password: '1234567890',
        occupation: 'admin'
    },{
        userId: '2',
        name: 'Alexandre Ottoni',
        email: 'alexandre@cargo.com',
        password: '1234567890',
        occupation: 'sender'
    },
]

export class MockedUserRepo implements IUserRepo {
    async exists(t: User): Promise<boolean> {
        throw new Error('Method not implemented.')
    }

    async delete(t: User): Promise<any> {
        throw new Error('Method not implemented.')
    }

    async getById(id: string): Promise<User> {
        const persistedUser = registeredUsers.find(persistedUser => persistedUser.userId === id) ?? null

        if(!persistedUser) return

        return UserMapper.toDomain(persistedUser)
    }

    async save(t: User): Promise<any> {
        return 'ok'
    }

    async emailAlreadyRegistered(email: UserEmail): Promise<boolean> {
        const user = registeredUsers.find(user => user.email === email.props.value)

        if (user) return true

        return false
    }
}
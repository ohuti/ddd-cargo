import { User } from '@users/domain/User'
import { UserEmail } from '@users/domain/UserEmail'
import { IUserRepo } from '@users/repos/UserRepo'

const registeredUsers = [
    {
        name: 'André Ohuti',
        email: 'andre@cargo.com',
        password: '1234567890',
        occupation: 'admin'
    },{
        name: 'Alexandre Ottoni',
        email: 'alexandre@cargo.com',
        password: '1234567890',
        occupation: 'sender'
    },
]

export class MockedUserRepo implements IUserRepo<User> {
    async exists(t: User): Promise<boolean> {
        throw new Error('Method not implemented.')
    }

    async delete(t: User): Promise<any> {
        throw new Error('Method not implemented.')
    }

    async getById(id: string): Promise<User> {
        throw new Error('Method not implemented.')
    }

    async save(t: User): Promise<any> {
        return
    }

    async emailAlreadyRegistered(email: UserEmail): Promise<boolean> {
        const user = registeredUsers.find(user => user.email === email.props.value)

        if (user) return true

        return false
    }
}
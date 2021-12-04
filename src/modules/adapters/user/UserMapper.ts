import { User } from 'modules/domain/models/user/User'

export class UserMapper implements Mapper<User> {
    toPersistence(object: User): void {
        throw new Error('Method not implemented.')
    }
    toDomain(data: any): User {
        throw new Error('Method not implemented.')
    }
    toDTO(data: any) {
        throw new Error('Method not implemented.')
    }
}

import { User } from '@users/domain/User'

export class UserMapper implements Mapper<User> {
    toDomain(data: any): User {
        throw new Error('Method not implemented.');
    }
    toDTO(object: User) {
        throw new Error('Method not implemented.');
    }
}

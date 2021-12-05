import { Mapper } from '@shared/core/Mapper'
import { User } from '@userDomain/User'

export class UserMapper implements Mapper {
    static toPersistence(object: User): void {
        throw new Error('Method not implemented.')
    }
    static toDomain(data: any): User {
        throw new Error('Method not implemented.')
    }
    static toDTO(data: any) {
        throw new Error('Method not implemented.')
    }
}

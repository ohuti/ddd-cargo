import { Mapper } from '@shared/core/Mapper'
import { User } from '@domainModels/user/User'
import { UserEmail } from '@domainModels/user/UserEmail'
import { UserName } from '@domainModels/user/UserName'
import { UserPassword } from '@domainModels/user/UserPassword'

export class UserMapper implements Mapper {
    static toPersistence(user: User): any {
        const userToPersist = {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password
        }

        return userToPersist
    }

    static toDomain(raw: any): User {
        const nameOrError = UserName.create(raw.name)
        const emailOrError = UserEmail.create(raw.email)
        const passwordOrError = UserPassword.create(raw.password)

        const userOrError = User.create({
            name: nameOrError.getValue(),
            email: emailOrError.getValue(),
            password: passwordOrError.getValue()
        }, raw.id)

        if (userOrError.isFailure) {
            throw new Error(`[UserMapper]: ${userOrError.errorValue()}`)
        }

        return userOrError.getValue()
    }

    static toDTO(user: User) {
        return {
            id: user.id,
            name: user.name
        }
    }
}

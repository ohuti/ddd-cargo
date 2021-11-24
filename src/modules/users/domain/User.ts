import { AggregateRoot } from "@shared/domain/AggregateRoot"
import { Result } from "@shared/core/Result"
import { UserEmail } from "./UserEmail"
import { UserName } from "./UserName"
import { UserOcupation } from "./UserOccupation"
import { UserPassword } from "./UserPassword"

interface UserProps {
    name: UserName
    email: UserEmail
    password: UserPassword
    occupation: UserOcupation
}

export class User extends AggregateRoot<UserProps> {
    private constructor(props: UserProps, id?: string) {
        super(props, id)
    }

    static create(props: UserProps, id?: string): Result<User> {
        const client = new User(props, id)

        return Result.ok(client)
    }
}

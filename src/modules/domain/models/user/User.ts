import { AggregateRoot } from "@shared/domain/AggregateRoot"
import { Result } from "@shared/core/Result"
import { UserEmail } from "./UserEmail"
import { UserName } from "./UserName"
import { UserPassword } from "./UserPassword"

interface UserProps {
    name: UserName
    email: UserEmail
    password: UserPassword
}

export class User extends AggregateRoot<UserProps> {
    private constructor(props: UserProps, id?: string) {
        super(props, id)
    }

    static create(props: UserProps, id?: string): Result<User> {
        const user = new User(props, id)

        return Result.ok<User>(user)
    }

    get name(): string {
        return this.props.name.value
    }

    get email(): string {
        return this.props.email.value
    }

    get password(): string {
        return this.props.password.value
    }
}

import { Result } from "@shared/core/Result"
import { ValueObject } from "@shared/domain/ValueObject"

interface UserPasswordProps {
    value: any
}

export class UserPassword extends ValueObject<UserPasswordProps> {
    private constructor(props: UserPasswordProps) {
        super(props)
    }

    static create(value: string): Result<UserPassword> {
        if (value.length < 8) return Result.fail('Password must have more than 8 characters')

        const clientPassword = new UserPassword({ value })

        return Result.ok(clientPassword)
    }
}

import { Result } from "@shared/core/Result"
import { ValueObject } from "@shared/domain/ValueObject"

interface UserNameProps {
    value: string
}

export class UserName extends ValueObject<UserNameProps> {
    private constructor(props: UserNameProps) {
        super(props)
    }

    static create(value: string): Result<UserName> {
        if (value.length > 30) return Result.fail('Client name must have less than 30 characters')

        if (value.length < 2) return Result.fail('Client name must have more than 2 characters')

        const clientName = new UserName({ value })

        return Result.ok(clientName)
    }

    get value(): string {
        return this.props.value
    }
}

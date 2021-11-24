import { Result } from "@shared/core/Result"
import { ValueObject } from "@shared/domain/ValueObject"

interface UserEmailProps {
    value: string
}

export class UserEmail extends ValueObject<UserEmailProps> {
    private constructor(props: UserEmailProps) {
        super(props)
    }

    static create(value: string): Result<UserEmail> {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) return Result.fail('Informed mail is not valid!')

        const clientEmail = new UserEmail({ value })

        return Result.ok(clientEmail)
    }
}

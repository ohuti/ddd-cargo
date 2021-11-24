import { Result } from "@shared/core/Result"
import { ValueObject } from "@shared/domain/ValueObject"

interface UserOcupationProps {
    value: occupations
}

export class UserOcupation extends ValueObject<UserOcupationProps> {
    private constructor(props: UserOcupationProps) {
        super(props)
    }

    static create(value: occupations): Result<UserOcupation> {
        const clientOccupation = new UserOcupation({ value })

        return Result.ok(clientOccupation)
    }
}

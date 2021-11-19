import { Result } from "@shared/core/Result"
import { ValueObject } from "@shared/domain/ValueObject"

interface ClientPasswordProps {
    value: any
}

export class ClientPassword extends ValueObject<ClientPasswordProps> {
    private constructor(props: ClientPasswordProps) {
        super(props)
    }

    static create(value: string): Result<ClientPassword> {
        if (value.length < 8) return Result.fail('Password must have more than 8 characters')

        const clientPassword = new ClientPassword({ value })

        return Result.ok(clientPassword)
    }
}

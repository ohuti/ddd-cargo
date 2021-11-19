import { Result } from "@shared/core/Result"
import { ValueObject } from "@shared/domain/ValueObject"

interface ClientNameProps {
    value: string
}

export class ClientName extends ValueObject<ClientNameProps> {
    private constructor(props: ClientNameProps) {
        super(props)
    }

    static create(value: string): Result<ClientName> {
        if (value.length > 30) return Result.fail('Client name must have less than 30 characters')

        if (value.length < 2) return Result.fail('Client name must have more than 2 characters')

        const clientName = new ClientName({ value })

        return Result.ok(clientName)
    }
}

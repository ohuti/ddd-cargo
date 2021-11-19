import { Result } from "@shared/core/Result"
import { ValueObject } from "@shared/domain/ValueObject"

interface ClientEmailProps {
    value: string
}

export class ClientEmail extends ValueObject<ClientEmailProps> {
    private constructor(props: ClientEmailProps) {
        super(props)
    }

    static create(value: string): Result<ClientEmail> {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) return Result.fail('Informed mail is not valid!')

        const clientEmail = new ClientEmail({ value })

        return Result.ok(clientEmail)
    }
}

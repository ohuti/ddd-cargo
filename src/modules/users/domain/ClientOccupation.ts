import { Result } from "@shared/core/Result"
import { ValueObject } from "@shared/domain/ValueObject"

type occupations = 'Shipper' | 'Carrier'| 'Dispacher' | 'Loader' | 'Recipient'

interface ClientOcupationProps {
    value: occupations
}

export class ClientOcupation extends ValueObject<ClientOcupationProps> {
    private constructor(props: ClientOcupationProps) {
        super(props)
    }

    static create(value: occupations): Result<ClientOcupation> {
        const clientOccupation = new ClientOcupation({ value })

        return Result.ok(clientOccupation)
    }
}

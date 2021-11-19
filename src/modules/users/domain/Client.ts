import { AggregateRoot } from "@shared/domain/AggregateRoot"
import { Result } from "@shared/core/Result"
import { ClientEmail } from "./ClientEmail"
import { ClientName } from "./ClientName"
import { ClientOcupation } from "./ClientOccupation"
import { ClientPassword } from "./ClientPassword"

interface ClientProps {
    name: ClientName
    email: ClientEmail
    password: ClientPassword
    occupation: ClientOcupation
}

export class Client extends AggregateRoot<ClientProps> {
    private constructor(props: ClientProps, id?: string) {
        super(props, id)
    }

    static create(props: ClientProps, id?: string): Result<Client> {
        const client = new Client(props, id)

        return Result.ok(client)
    }
}

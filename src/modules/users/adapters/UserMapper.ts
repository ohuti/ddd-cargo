import { Client } from '@users/domain/Client'

export class UserMapper implements Mapper<Client> {
    toDomain(data: any): Client {
        throw new Error('Method not implemented.');
    }
    toDTO(object: Client) {
        throw new Error('Method not implemented.');
    }
}

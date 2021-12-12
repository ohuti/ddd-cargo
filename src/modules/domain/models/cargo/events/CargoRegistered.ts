import { IDomainEvent } from '@shared/domain/IDomainEvent'
import { Cargo } from '../Cargo';

export class CargoRegistered implements IDomainEvent {
    timestampOccurred: number
    cargo: Cargo

    constructor(cargo: Cargo) {
        this.cargo = cargo
        this.timestampOccurred = new Date().getTime()
    }

    getAggregateId(): string {
        return this.cargo.id
    }
}

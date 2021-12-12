import { DomainEvents } from './DomainEvents'
import { Entity } from './Entity'
import { IDomainEvent } from './IDomainEvent'

export abstract class AggregateRoot<T> extends Entity<T> {
    private _domainEvents: IDomainEvent[] = []

    get id (): string {
        return this._id
    }

    get domainEvents (): IDomainEvent[] {
        return this._domainEvents
    }

    addDomainEvent (domainEvent: IDomainEvent) {
        this._domainEvents.push(domainEvent)

        DomainEvents.markAggregateForDispatch(this)
    }

    clearEvents (): void {
        this._domainEvents.splice(0, this._domainEvents.length)
    }
}

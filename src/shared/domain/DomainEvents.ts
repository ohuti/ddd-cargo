import { AggregateRoot } from './AggregateRoot'
import { IDomainEvent } from './IDomainEvent'

export class DomainEvents {
    private static handlersMap: { [key: string | number]: any } = {}
    private static markedAggregates: AggregateRoot<any>[] = []

    static markAggregateForDispatch(aggregate: AggregateRoot<any>) {
        const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id)

        if (!aggregateFound) {
            this.markedAggregates.push(aggregate)
        }
    }

    static register(callback: (event: IDomainEvent) => Promise<void> | void, eventClassName: string): void {
        if (!this.handlersMap.hasOwnProperty(eventClassName)) {
            this.handlersMap[eventClassName] = []
        }

        this.handlersMap[eventClassName].push(callback)
    }

    static dispatchEventsForAggregate (id: string) {
        const aggregate = this.findMarkedAggregateByID(id)

        if (aggregate) {
            this.dispatchAggregateEvents(aggregate)
            aggregate.clearEvents()
            this.removeAggregateFromMarkedDispatchList(aggregate)
        }
    }

    private static findMarkedAggregateByID (id: string): AggregateRoot<any> | undefined {
        const found = this.markedAggregates.find(aggregate => aggregate.id === id)
    
        return found
    }
    
    private static dispatchAggregateEvents (aggregate: AggregateRoot<any>) {
        aggregate.domainEvents.forEach((event: IDomainEvent) => this.dispatch(event))
    }

    private static removeAggregateFromMarkedDispatchList (aggregate: AggregateRoot<any>): void {
        const index = this.markedAggregates.findIndex(a => a.equals(aggregate))

        this.markedAggregates.splice(index, 1)
    }

    private static dispatch(event: IDomainEvent) {
        const eventClassName: string = event.constructor.name

        if (this.handlersMap.hasOwnProperty(eventClassName)) {
            const handlers: any[] = this.handlersMap[eventClassName]

            for (const handler of handlers) {
                handler(event)
            }
        }
    }
}

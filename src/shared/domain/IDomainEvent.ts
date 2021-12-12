export interface IDomainEvent {
    timestampOccurred: number
    getAggregateId (): string
}

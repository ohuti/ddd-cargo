import { IDomainEvent } from '@shared/domain/IDomainEvent'

export interface IHandle<IDomainEvent> {
    setupSubscriptions(): Promise<void> | void
}
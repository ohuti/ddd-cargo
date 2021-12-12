import { HandlingEventMapper } from '@adapters/handlingEvent/HandlingEventMapper';
import { HandlingEvent } from '@domainModels/handlingEvent/HandlingEvent';
import { IHandlingEventRepo } from '../IHandlingEventRepo'

const persistedHandlingEvents = []

export class HandlingEventRepo implements IHandlingEventRepo {
    async exists(handlingEvent: HandlingEvent): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    async delete(handlingEvent: HandlingEvent): Promise<any> {
        
    }
    async getById(id: string): Promise<HandlingEvent> {
        const persistedHandlingEvent = persistedHandlingEvents.find(persistedHandlingEvent => persistedHandlingEvent.id === id) ?? null

        if(!persistedHandlingEvent) return persistedHandlingEvent

        return HandlingEventMapper.toDomain(persistedHandlingEvent)
    }
    async save(handlingEvent: HandlingEvent): Promise<any> {
        const handlingEventToPersist = HandlingEventMapper.toPersistence(handlingEvent)

        persistedHandlingEvents.push(handlingEventToPersist)

        return 'ok'
    }
}

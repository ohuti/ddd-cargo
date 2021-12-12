import { Mapper } from "@shared/core/Mapper"

import { HandlingEvent } from "@domainModels/handlingEvent/HandlingEvent";

export class HandlingEventMapper implements Mapper {
    static toDomain(raw: any): HandlingEvent {
        const handlingEventOrError = HandlingEvent.create({
            cargo: raw.cargo,
            description: raw.description,
            occurredAt: raw.occurredAt,
            carrierMovementId: raw.carrierMovementId
        })

        if (handlingEventOrError.isFailure) {
            throw new Error(handlingEventOrError.error as string)
        }

        return handlingEventOrError.getValue()
    }

    static toDTO(handlingEvent: HandlingEvent): any {
        return {
            description: handlingEvent.description,
            occurredAt: handlingEvent.occurredAt
        }
    }

    static toPersistence(handlingEvent: HandlingEvent) {
        return {
            id: handlingEvent.id,
            cargoId: handlingEvent.cargo.id,
            carrierMovmentId: handlingEvent.carrierMovementId,
            description: handlingEvent.description,
            occurredAt: handlingEvent.occurredAt
        }
    }
}

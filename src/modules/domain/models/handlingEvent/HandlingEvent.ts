import { Cargo } from '@domainModels/cargo/Cargo'
import { Result } from '@shared/core/Result'
import { AggregateRoot } from "@shared/domain/AggregateRoot"

interface HandlingEventProps {
    cargo: Cargo
    carrierMovementId?: string
    description: string
    occurredAt: number
}

export class HandlingEvent extends AggregateRoot<HandlingEventProps> {
    private constructor(props: HandlingEventProps, id?: string) {
        super(props, id)
    }

    static create(props: HandlingEventProps, id?: string): Result<HandlingEvent> {
        const handlingEvent = new HandlingEvent(props, id)

        return Result.ok(handlingEvent)
    }

    get cargo() {
        return this.props.cargo
    }

    get carrierMovementId() {
        return this.props.carrierMovementId
    }

    get description() {
        return this.props.description
    }

    get occurredAt() {
        return this.props.occurredAt
    }
}

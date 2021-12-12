import { Result } from '@shared/core/Result'
import { AggregateRoot } from '@shared/domain/AggregateRoot'

import { CargoDeliveryHistory } from './CargoDeliveryHistory'
import { CargoDeliverySpecification } from './CargoDeliverySpecification'
import { CargoTrackingId } from './CargoTrackingId'
import { CargoUserRole } from './CargoUserRole'
import { CargoRegistered } from './events/CargoRegistered'

interface CargoProps {
    usersRoles: CargoUserRole[]
    trackingId: CargoTrackingId
    deliveryHistory: CargoDeliveryHistory[]
    deliverySpecification: CargoDeliverySpecification
    createdAt: number
    updatedAt: number
    deletedAt?: number
}

export class Cargo extends AggregateRoot<CargoProps> {
    private constructor(props: CargoProps, id?: string) {
        super(props, id)
    }

    static create(props: CargoProps, id?: string): Result<Cargo> {
        const cargo = new Cargo(props, id)

        const idWasProvided = !!id

        if (!idWasProvided) {
            cargo.addDomainEvent(new CargoRegistered(cargo))
        }

        return Result.ok(cargo)
    }

    get usersRoles() {
        return this.props.usersRoles
    }

    get trackingId() {
        return this.props.trackingId
    }

    get deliveryHistory() {
        return this.props.deliveryHistory
    }

    get deliverySpecification() {
        return this.props.deliverySpecification
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    get deletedAt() {
        return this.props.deletedAt
    }
}

import { Result } from '@shared/core/Result'
import { Entity } from '@shared/domain/Entity'
import { CargoTrackingId } from './CargoTrackingId'
import { CargoUserRole } from './CargoUserRole'

interface CargoProps {
    usersRoles: CargoUserRole[]
    trackingId: CargoTrackingId
    deliveryHistory: any
    deliverySpecification: any
}

export class Cargo extends Entity<CargoProps> {
    private constructor(props: CargoProps, id?: string) {
        super(props, id)
    }

    static create(props: CargoProps, id?: string): Result<Cargo> {
        const cargo = new Cargo(props, id)

        return Result.ok(cargo)
    }
}

import { Result } from '@shared/core/Result'
import { ValueObject } from '@shared/domain/ValueObject'

import { Location } from '@domainModels/location/Location'

interface CargoDeliverySpecificationProps {
    origin: Location
    destination: Location
    deliveryEstimate: number
    deliveryCost: number
}

export class CargoDeliverySpecification extends ValueObject<CargoDeliverySpecificationProps> {
    private constructor(props: CargoDeliverySpecificationProps) {
        super(props)
    }

    static create(props: CargoDeliverySpecificationProps): Result<CargoDeliverySpecification> {
        const deliverySpecification = new CargoDeliverySpecification(props)

        return Result.ok(deliverySpecification)
    }
}

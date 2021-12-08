import { GenerateTrackingId } from '@domainServices/GenerateTrackingId'
import { Result } from '@shared/core/Result'
import { ValueObject } from "@shared/domain/ValueObject"

interface CargoTrackingIdProps {
    value: string
}

export class CargoTrackingId extends ValueObject<CargoTrackingIdProps> {
    private constructor(props: CargoTrackingIdProps) {       
        super(props)
    }

    static create(props?: CargoTrackingIdProps): Result<CargoTrackingId> {
        if(!props) {
            props = { value: GenerateTrackingId.execute() }
        }

        const cargoTrackingId = new CargoTrackingId(props)

        return Result.ok(cargoTrackingId)
    }

    get value(): string {
        return this.props.value
    }
}

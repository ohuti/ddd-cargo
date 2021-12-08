import { Result } from '@shared/core/Result'
import { Entity } from '@shared/domain/Entity'

interface CargoDeliveryHistoryProps {
    cargoId: string
    eventDescription: string
    occurredAt: number
}

export class CargoDeliveryHistory extends Entity<CargoDeliveryHistoryProps> {
    private constructor(props: CargoDeliveryHistoryProps, id?: string) {
        super(props, id)
    }

    static create(props: CargoDeliveryHistoryProps, id?: string): Result<CargoDeliveryHistory> {
        const deliveryHistory = new CargoDeliveryHistory(props)

        return Result.ok(deliveryHistory)
    }
}

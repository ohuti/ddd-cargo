import { Entity } from "@shared/domain/Entity"

interface DeliveryHistoryProps {}

export class DeliveryHistory extends Entity<DeliveryHistoryProps> {
    constructor(props: DeliveryHistoryProps, id?: string) {
        super(props, id)
    }
}

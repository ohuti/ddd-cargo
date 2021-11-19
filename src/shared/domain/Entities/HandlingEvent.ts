import { AggregateRoot } from "@shared/domain/AggregateRoot"

interface HandlingEventProps {}

export class HandlingEvent extends AggregateRoot<HandlingEventProps> {
    constructor(props: HandlingEventProps, id?: string) {
        super(props, id)
    }
}

import { AggregateRoot } from "@shared/domain/AggregateRoot";

interface CargoProps {
    name: string
}

export class Cargo extends AggregateRoot<CargoProps> {
    constructor(props: CargoProps, cargoId?: string) {
        super(props, cargoId)
    }
}

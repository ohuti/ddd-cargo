import { Result } from '@shared/core/Result'
import { AggregateRoot } from "@shared/domain/AggregateRoot"

interface LocationProps {
    name: string
    uf: string
    lat: number
    lon: number
}

export class Location extends AggregateRoot<LocationProps> {
    private constructor(props: LocationProps, id?: string) {
        super(props, id)
    }

    static create(props: LocationProps, id?: string): Result<Location> {
        const location = new Location(props, id)

        return Result.ok(location)
    }

    get name(): string {
        return this.props.name
    }

    get uf(): string {
        return this.props.uf
    }

    get lat(): number {
        return this.props.lat
    }

    get lon(): number {
        return this.props.lon
    }
}

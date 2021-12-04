import { Result } from '@shared/core/Result'
import { ValueObject } from "@shared/domain/ValueObject"

interface CargoUserRoleProps {
    value: {
        userId: string
        role: occupations
    }
}

export class CargoUserRole extends ValueObject<CargoUserRoleProps> {
    private constructor(props: CargoUserRoleProps) {
        super(props)
    }

    static create(props: CargoUserRoleProps): Result<CargoUserRole> {
        const cargoUserRole = new CargoUserRole(props)

        return Result.ok(cargoUserRole)
    }

    get value(): { userId: string, role: occupations } {
        return this.props.value
    }
}
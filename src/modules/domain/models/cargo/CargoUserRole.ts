import { User } from '@domainModels/user/User'
import { Result } from '@shared/core/Result'
import { ValueObject } from "@shared/domain/ValueObject"

interface CargoUserRoleProps {
    user: User
    role: occupations
}

export class CargoUserRole extends ValueObject<CargoUserRoleProps> {
    private constructor(props: CargoUserRoleProps) {
        super(props)
    }

    static create(props: CargoUserRoleProps): Result<CargoUserRole> {
        const cargoUserRole = new CargoUserRole(props)

        return Result.ok(cargoUserRole)
    }

    get value(): { user: User, role: occupations } {
        return { user: this.props.user, role: this.props.role }
    }

    get user() {
        return this.props.user
    }

    get role() {
        return this.props.role
    }
}

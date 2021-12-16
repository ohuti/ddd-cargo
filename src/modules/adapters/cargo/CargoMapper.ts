import { Mapper } from '@shared/core/Mapper'
import { Cargo } from '@domainModels/cargo/Cargo'
import { CargoTrackingId } from '@domainModels/cargo/CargoTrackingId'
import { CargoDeliverySpecification } from '@domainModels/cargo/CargoDeliverySpecification'
import { CargoUserRole } from '@domainModels/cargo/CargoUserRole'
import { Result } from '@shared/core/Result'
import { AppError } from '@shared/core/AppError'
import { CargoDeliveryHistory } from '@domainModels/cargo/CargoDeliveryHistory'
import { User } from '@domainModels/user/User'

export class CargoMapper implements Mapper {
    static toPersistence(cargo: Cargo): any {
        return {
            id: cargo.id,
            usersRoles: cargo.usersRoles,
            trackingId: cargo.trackingId,
            deliveryHistory: cargo.deliveryHistory,
            deliverySpecification: cargo.deliverySpecification,
            createdAt: cargo.createdAt,
            updatedAt: cargo.updatedAt,
            deletedAt: cargo.deletedAt
        }
    }
    
    static toDTO(cargo: Cargo): any {}
    
    static toDomain(raw: any): Cargo {
        const trackingIdOrError = CargoTrackingId.create({ value: raw.trackingId })
        const deliverySpecificationOrError = CargoDeliverySpecification.create({
            origin: raw.origin,
            destination: raw.destination,
            deliveryCost: raw.deliveryCost,
            deliveryEstimate: raw.deliveryEstimate
        })

        const usersRolesOrError = raw.usersRoles.map((userRole: { user: User, role: occupations }) => {
            return CargoUserRole.create({ user: userRole.user, role: userRole.role })
        })

        const deliveryHistoryOrError = raw.deliveryHistory.map((history: any) => {
            return CargoDeliveryHistory.create({ cargoId: history.id, eventDescription: history.eventDescription, occurredAt: history.occurredAt })
        })

        const combinedResult = Result.combine([
            trackingIdOrError,
            deliverySpecificationOrError,
            ...usersRolesOrError,
            ...deliveryHistoryOrError
        ])

        if (combinedResult.isFailure) {
            throw AppError.UnexpectedError.create(combinedResult.errorValue())
        }

        const trackingId = trackingIdOrError.getValue()
        const deliverySpecification = deliverySpecificationOrError.getValue()
        const usersRoles = usersRolesOrError.map((userRoleOrError: Result<CargoUserRole>) => userRoleOrError.getValue())
        const deliveryHistory = deliveryHistoryOrError.map((historyOrError: Result<CargoDeliveryHistory>) => historyOrError.getValue())

        const cargoOrError = Cargo.create({
            usersRoles,
            trackingId,
            deliverySpecification,
            deliveryHistory,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
            deletedAt: raw.deletedAt
        })

        if (cargoOrError.isFailure) {
            throw AppError.UnexpectedError.create(cargoOrError.errorValue())
        }

        const cargo = cargoOrError.getValue()

        return cargo
    }
}

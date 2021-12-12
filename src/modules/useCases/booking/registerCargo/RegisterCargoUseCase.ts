import { AppError } from '@shared/core/AppError'
import { Either, left, right } from '@shared/core/Either'
import { Result } from '@shared/core/Result'
import { UseCase } from '@shared/core/UseCase'
import { DomainEvents } from '@shared/domain/DomainEvents'

import { RegisterCargoDTO } from '@adapters/booking/BookingDTO'
import { Cargo } from '@domainModels/cargo/Cargo'
import { CargoDeliverySpecification } from '@domainModels/cargo/CargoDeliverySpecification'
import { CargoTrackingId } from '@domainModels/cargo/CargoTrackingId'
import { CargoUserRole } from '@domainModels/cargo/CargoUserRole'
import { ICargoRepo } from '@repos/cargo/ICargoRepo'
import { ILocationRepo } from '@repos/location/ILocationRepo'

export type Response = Either<
    AppError.UnexpectedError,
    Result<void>
>

export class RegisterCargoUseCase implements UseCase<RegisterCargoDTO, Response> {
    private cargoRepo: ICargoRepo
    private locationRepo: ILocationRepo

    constructor(cargoRepo: ICargoRepo, locationRepo: ILocationRepo) {
        this.cargoRepo = cargoRepo
        this.locationRepo = locationRepo
    }
    
    async execute(request: RegisterCargoDTO) {
        const {
            originId,
            destinationId,
            senderId,
            deliveryEstimate,
            deliveryCost
        } = request

        const origin = await this.locationRepo.getById(originId)
        const destination = await this.locationRepo.getById(destinationId)

        const trackingIdOrError = CargoTrackingId.create()
        const deliverySpecificationOrError = CargoDeliverySpecification.create({
            origin,
            destination,
            deliveryCost,
            deliveryEstimate
        })
        const userRoleOrError = CargoUserRole.create({ userId: senderId, role: 'sender' })

        const combinedResult = Result.combine([
            trackingIdOrError,
            deliverySpecificationOrError,
            userRoleOrError
        ])

        if (combinedResult.isFailure) {
            const error = AppError.UnexpectedError.create(combinedResult.errorValue())

            return left(error) as Response
        }

        const nowTimestamp = new Date().getTime()
        const trackingId = trackingIdOrError.getValue()
        const deliverySpecification = deliverySpecificationOrError.getValue()
        const userRole = userRoleOrError.getValue()

        const cargoOrError = Cargo.create({
            trackingId,
            deliverySpecification,
            deliveryHistory: [],
            createdAt: nowTimestamp,
            updatedAt: nowTimestamp,
            usersRoles: [ userRole ]
        })

        if (cargoOrError.isFailure) {
            const error = AppError.UnexpectedError.create(combinedResult.errorValue())

            return left(error) as Response
        }

        const cargo = cargoOrError.getValue()

        await this.cargoRepo.save(cargo)

        DomainEvents.dispatchEventsForAggregate(cargo.id)

        return right(Result.ok<void>()) as Response
    }
}

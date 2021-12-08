import { RegisterCargoDTO } from '@adapters/booking/BookingDTO';
import { Cargo } from '@domainModels/cargo/Cargo';
import { CargoDeliveryHistory } from '@domainModels/cargo/CargoDeliveryHistory';
import { CargoDeliverySpecification } from '@domainModels/cargo/CargoDeliverySpecification';
import { CargoTrackingId } from '@domainModels/cargo/CargoTrackingId';
import { CargoUserRole } from '@domainModels/cargo/CargoUserRole';
import { ICargoRepo } from '@repos/cargo/ICargoRepo';
import { ILocationRepo } from '@repos/location/ILocationRepo';
import { AppError } from '@shared/core/AppError';
import { left, right } from '@shared/core/Either';
import { Result } from '@shared/core/Result';
import { UseCase } from '@shared/core/UseCase'
import { RegisterCargoResponse } from './RegisterCargoResponse';

export class RegisterCargoUseCase implements UseCase<RegisterCargoDTO, RegisterCargoResponse> {
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

            return left(error) as RegisterCargoResponse
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

            return left(error) as RegisterCargoResponse
        }

        const cargo = cargoOrError.getValue()

        const deliveryHistoryOrError = CargoDeliveryHistory.create({
            cargoId: cargo.id,
            eventDescription: 'Cargo registered on postoffice.',
            occurredAt: nowTimestamp
        })

        if (deliveryHistoryOrError.isFailure) {
            const error = AppError.UnexpectedError.create(combinedResult.errorValue())

            return left(error) as RegisterCargoResponse
        }

        const deliveryHistory = deliveryHistoryOrError.getValue()

        cargo.addDeliveryHistory(deliveryHistory)

        await this.cargoRepo.save(cargo)

        return right(Result.ok<void>()) as RegisterCargoResponse
    }
}

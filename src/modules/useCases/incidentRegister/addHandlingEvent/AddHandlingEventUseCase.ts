import { AppError } from '@shared/core/AppError'
import { Either, left, right } from '@shared/core/Either'
import { Result } from '@shared/core/Result'
import { UseCase } from '@shared/core/UseCase'

import { AddHandlingEventDTO } from '@adapters/incidentRegister/IncidentRegisterDTO'
import { ICargoRepo } from '@repos/cargo/ICargoRepo'
import { HandlingEvent } from '@domainModels/handlingEvent/HandlingEvent'
import { IHandlingEventRepo } from '@repos/handlingEvent/IHandlingEventRepo'

type Response = Either<
    AppError.UnexpectedError,
    Result<void>
>

export class AddHandlingEventUseCase implements UseCase<AddHandlingEventDTO, Response> {
    private cargoRepo: ICargoRepo
    private handlingEventRepo: IHandlingEventRepo

    constructor(cargoRepo: ICargoRepo, handlingEventRepo: IHandlingEventRepo) {
        this.cargoRepo = cargoRepo
        this.handlingEventRepo = handlingEventRepo
    }
    
    async execute(request: AddHandlingEventDTO) {
        const {
            cargoId,
            description,
            occurredAt,
            carrierMovementId
        } = request

        const cargo = await this.cargoRepo.getById(cargoId)

        const handlingEventOrError = HandlingEvent.create({
            cargo,
            description,
            occurredAt,
            carrierMovementId
        })

        if (handlingEventOrError.isFailure) {
            return left(handlingEventOrError.errorValue()) as Response
        }

        const handlingEvent = handlingEventOrError.getValue()

        await this.handlingEventRepo.save(handlingEvent)

        return right(Result.ok<void>()) as Response
    }
}

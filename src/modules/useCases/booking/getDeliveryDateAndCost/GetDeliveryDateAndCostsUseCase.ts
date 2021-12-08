import { Result } from '@shared/core/Result';
import { UseCase } from '@shared/core/UseCase'
import { Either, left, right } from '@shared/core/Either';

import { ILocationRepo } from '@repos/location/ILocationRepo';
import { DeliveryDateAndCostsDTO, GetDeliveryDateAndCostsDTO } from '@adapters/booking/BookingDTO';

import { calculateDeliveryDateAndPrice } from '@domainServices/CalculateDeliveryDateAndPrice'

import { GetDeliveryDateAndCostsErrorsErrors } from './GetDeliveryDateAndCostsErrors';

type Response = Either<
    GetDeliveryDateAndCostsErrorsErrors.DistanceTooFar,
    Result<DeliveryDateAndCostsDTO>
>

export class GetDeliveryDateAndCostsUseCase implements UseCase<GetDeliveryDateAndCostsDTO, Response> {
    locationRepo: ILocationRepo

    constructor(locationRepo: ILocationRepo) {
        this.locationRepo = locationRepo
    }
    
    async execute(request: GetDeliveryDateAndCostsDTO) {
        const { originLocationId, destinationLocationId } = request

        const originOrError = await this.locationRepo.getById(originLocationId)
        const destinationOrError = await this.locationRepo.getById(destinationLocationId)

        const result = calculateDeliveryDateAndPrice(originOrError, destinationOrError)

        if (result.isFailure) {
            const error = new GetDeliveryDateAndCostsErrorsErrors.DistanceTooFar(result.error)
            return left(error) as Response
        }

        return right(result) as Response
    }
}

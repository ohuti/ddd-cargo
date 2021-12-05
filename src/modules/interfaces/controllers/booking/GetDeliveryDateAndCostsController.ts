import { Request, Response } from 'express'

import { Controller } from '@shared/core/Controller'

import { GetDeliveryDateAndCostsDTO } from '@adapters/booking/BookingDTO'

import { GetDeliveryDateAndCostsUseCase } from '@useCases/booking/getDeliveryDateAndCost/GetDeliveryDateAndCostsUseCase'
import { GetDeliveryDateAndCostsErrorsErrors } from '@useCases/booking/getDeliveryDateAndCost/GetDeliveryDateAndCostsErrors'

export class GetDeliveryDateAndCostsController extends Controller {
    getDeliveryDateAndCostsUseCase: GetDeliveryDateAndCostsUseCase

    constructor(getDeliveryDateAndCostsUseCase: GetDeliveryDateAndCostsUseCase) {
        super()
        this.getDeliveryDateAndCostsUseCase = getDeliveryDateAndCostsUseCase
    }
    
    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const dto: GetDeliveryDateAndCostsDTO = {
            originLocationId: String(req.query.originLocationId),
            destinationLocationId: String(req.query.destinationLocationId)
        }

        const result = await this.getDeliveryDateAndCostsUseCase.execute(dto)

        if (result.isLeft()) {
            const error = result.value

            switch (error.constructor) {
                case GetDeliveryDateAndCostsErrorsErrors.DistanceTooFar: {
                    return this.fail(res, error.errorValue().message)
                }

                default:
                    return this.fail(res, error.errorValue().message)
            }
        } else {
            return this.ok(res, result.value.getValue())
        }
    }
}

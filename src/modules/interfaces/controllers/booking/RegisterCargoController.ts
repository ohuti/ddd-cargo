import { RegisterCargoDTO } from '@adapters/booking/BookingDTO'
import { Controller } from '@shared/core/Controller'
import { RegisterCargoUseCase } from '@useCases/booking/registerCargo/RegisterCargoUseCase'
import { Request, Response } from 'express'

export class RegisterCargoController extends Controller {
    private registerCargoUseCase: RegisterCargoUseCase

    constructor(registerCargoUseCase: RegisterCargoUseCase) {
        super()
        this.registerCargoUseCase = registerCargoUseCase
    }

    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const dto: RegisterCargoDTO = {
            senderId: req.body.senderId,
            originId: req.body.originId,
            destinationId: req.body.destinationId,
            deliveryCost: req.body.deliveryCost,
            deliveryEstimate: req.body.deliveryEstimate
        }

        const result = await this.registerCargoUseCase.execute(dto)

        if (result.isLeft()) {
            const error = result.value

            switch (error.constructor) {
                default: {
                    return this.fail(res, error.error as string)
                }
            }
        } else {
            return this.ok(res)
        }
    }
}

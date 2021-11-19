import { Request, Response } from 'express'

import { Controller } from '@shared/core/Controller'

import { CreateRecipientUseCase } from '@users/useCases/createRecipientUser/CreateRecipientUseCase'
import { CreateUserDTO } from '@users/adapters/CreateUserDTO'
import { CreateUserErrors } from '@users/useCases/CreatetUserErrors'

export class CreateRecipientController extends Controller {
    private useCase: CreateRecipientUseCase

    constructor(useCase: CreateRecipientUseCase) {
        super()
        this.useCase = useCase
    }

    protected async executeImpl(req: Request, res: Response): Promise<void> {
        const {
            name,
            email,
            password,
        } = req.body

        const dto: CreateUserDTO = {
            name,
            email,
            password
        }

        const result = await this.useCase.execute(dto)

        if (result.isLeft()) {
            const error = result.value

            switch(error.constructor) {
                case CreateUserErrors.InvalidParam: {
                    this.clientError(res, error.errorValue().message)
                    break
                }
                default: {
                    this.fail(res, error.errorValue().message)
                }
            }
        } else {
            this.ok(res, )
        }
    }
}

import { Request, Response } from 'express'

import { Controller } from '@shared/core/Controller'

import { CreateUserUseCase } from '@useCases/user/createUser/CreateUserUseCase'
import { CreateUserErrors } from '@useCases/user/createUser/CreatetUserErrors'
import { CreateUserDTO } from '@adapters/user/CreateUserDTO'

export class CreateUserController extends Controller {
    private useCase: CreateUserUseCase

    constructor(useCase: CreateUserUseCase) {
        super()
        this.useCase = useCase
    }

    protected async executeImpl(req: Request, res: Response): Promise<any> {
        const {
            name,
            email,
            password,
        } = req.body

        const dto: CreateUserDTO = {
            name,
            email,
            password,
        }

        const result = await this.useCase.execute(dto)

        if (result.isLeft()) {
            const error = result.value

            switch(error.constructor) {
                case CreateUserErrors.InvalidParam: {
                    return this.clientError(res, error.errorValue().message)
                }
                case CreateUserErrors.AdminCreationNotAllowed: {
                    return this.clientError(res, error.errorValue().message)
                }
                case CreateUserErrors.EmailAlreadyRegistered: {
                    return this.conflict(res, error.errorValue().message)
                }
                default: {
                    return this.fail(res, error.errorValue().message)
                }
            }
        } else {
            return this.ok(res)
        }
    }
}

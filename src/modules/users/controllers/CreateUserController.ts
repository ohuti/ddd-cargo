import { Request, Response } from 'express'

import { Controller } from '@shared/core/Controller'

import { CreateUserUseCase } from '@users/useCases/createUser/CreateUserUseCase'
import { CreateUserDTO } from '@users/adapters/CreateUserDTO'
import { CreateUserErrors } from '@users/useCases/createUser/CreateUserErrors'

export class CreateUserController extends Controller {
    private useCase: CreateUserUseCase

    constructor(useCase: CreateUserUseCase) {
        super()
        this.useCase = useCase
    }

    protected async executeImpl(req: Request, res: Response): Promise<void> {
        const {
            name,
            email,
            password,
            fail
        } = req.body

        const dto: CreateUserDTO = {
            name,
            email,
            password,
            fail
        }

        try {
            const result = await this.useCase.execute(dto)

            if (result.isLeft()) {
                const error = result.value

                switch(error.constructor) {
                    case CreateUserErrors.EmailAlreadyExists: {
                        this.conflict(res, error.errorValue().message)
                    }
                    default: {
                        this.fail(res, error.errorValue().message)
                    }
                }
            } else {
                this.ok(res)
            }
        } catch (error: any) {
            this.fail(res, error)
        }
    }
}

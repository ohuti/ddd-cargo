import { LocationResultDTO } from '@adapters/location/LocationDTO'
import { Controller } from '@shared/core/Controller'
import { UseCase } from '@shared/core/UseCase'
import { Request, Response } from 'express'

export class ListAllLocationsController extends Controller {
    listAllLocationsUseCase: UseCase<void, LocationResultDTO[]>

    constructor(listAllLocationsUseCase: UseCase<void, LocationResultDTO[]>) {
        super()
        this.listAllLocationsUseCase = listAllLocationsUseCase
    }

    protected async executeImpl(req: Request, res: Response): Promise<void> {
        const response: LocationResultDTO[] = await this.listAllLocationsUseCase.execute()
        this.ok(res, response)
        return
    }
}

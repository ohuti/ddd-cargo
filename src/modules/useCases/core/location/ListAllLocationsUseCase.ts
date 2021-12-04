import { UseCase } from '@shared/core/UseCase'

import { ILocationRepo } from '@repos/location/ILocationRepo'

import { LocationResultDTO } from '@adapters/location/LocationDTO'

export class ListAllLocationsUseCase implements UseCase<void, LocationResultDTO[]> {
    locationRepo: ILocationRepo

    constructor(locationRepo: ILocationRepo) {
        this.locationRepo = locationRepo
    }

    async execute() {
        const locations = await this.locationRepo.listAll()

        return locations
    }
}
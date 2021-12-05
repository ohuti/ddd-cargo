import { Repo } from '@shared/core/Repo'

import { Location } from '@locationDomain/Location'
import { LocationResultDTO } from '@adapters/location/LocationDTO'

export interface ILocationRepo extends Repo<Location> {
    listAll(): Promise<LocationResultDTO[]>
}
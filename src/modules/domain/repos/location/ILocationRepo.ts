import { Repo } from '@shared/core/Repo'

import { Location } from '@domainModels/location/Location'

export interface ILocationRepo extends Repo<Location> {
    listAll(): Promise<Location[]>
}

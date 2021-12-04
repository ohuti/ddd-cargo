import { ListAllLocationsUseCase } from './location/ListAllLocationsUseCase'

import { locationRepo } from '@repos/location'

const listAllLocationsUseCase = new ListAllLocationsUseCase(locationRepo)

export { listAllLocationsUseCase }
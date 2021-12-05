import { ListAllLocationsUseCase } from './location/ListAllLocationsUseCase'

import { locationRepo } from '@domain/repos/location'

const listAllLocationsUseCase = new ListAllLocationsUseCase(locationRepo)

export { listAllLocationsUseCase }
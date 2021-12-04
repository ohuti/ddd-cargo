import { ListAllLocationsController } from './location/ListAllLocationsController'

import { listAllLocationsUseCase } from '@useCases/core'

const listAllLocationsController = new ListAllLocationsController(listAllLocationsUseCase)

export { listAllLocationsController }

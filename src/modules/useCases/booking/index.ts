import { GetDeliveryDateAndCostsUseCase } from './getDeliveryDateAndCost/GetDeliveryDateAndCostsUseCase'

import { locationRepo } from '@domain/repos/location'

const getDeliveryDateAndCostsUseCase = new GetDeliveryDateAndCostsUseCase(locationRepo)

export { getDeliveryDateAndCostsUseCase }

import { GetDeliveryDateAndCostsUseCase } from './getDeliveryDateAndCost/GetDeliveryDateAndCostsUseCase'

import { locationRepo } from '@repos/location'

const getDeliveryDateAndCostsUseCase = new GetDeliveryDateAndCostsUseCase(locationRepo)

export { getDeliveryDateAndCostsUseCase }

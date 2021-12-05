import { GetDeliveryDateAndCostsController } from './GetDeliveryDateAndCostsController'

import { getDeliveryDateAndCostsUseCase } from '@useCases/booking'

const getDeliveryDateAndCostsController = new GetDeliveryDateAndCostsController(getDeliveryDateAndCostsUseCase)

export { getDeliveryDateAndCostsController }

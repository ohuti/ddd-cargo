import { GetDeliveryDateAndCostsController } from './GetDeliveryDateAndCostsController'
import { RegisterCargoController } from './RegisterCargoController'

import { getDeliveryDateAndCostsUseCase, registerCargoUseCase } from '@useCases/booking'

const getDeliveryDateAndCostsController = new GetDeliveryDateAndCostsController(getDeliveryDateAndCostsUseCase)
const registerCargoController = new RegisterCargoController(registerCargoUseCase)

export { getDeliveryDateAndCostsController, registerCargoController }

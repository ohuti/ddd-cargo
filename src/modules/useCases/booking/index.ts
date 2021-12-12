import { GetDeliveryDateAndCostsUseCase } from './getDeliveryDateAndCost/GetDeliveryDateAndCostsUseCase'
import { RegisterCargoUseCase } from './registerCargo/RegisterCargoUseCase'

import { locationRepo } from '@repos/location'
import { cargoRepo } from '@repos/cargo'

const getDeliveryDateAndCostsUseCase = new GetDeliveryDateAndCostsUseCase(locationRepo)
const registerCargoUseCase = new RegisterCargoUseCase(cargoRepo, locationRepo)

export { getDeliveryDateAndCostsUseCase, registerCargoUseCase }

import { GetDeliveryDateAndCostsUseCase } from './getDeliveryDateAndCost/GetDeliveryDateAndCostsUseCase'
import { RegisterCargoUseCase } from './registerCargo/RegisterCargoUseCase'

import { locationRepo } from '@repos/location'
import { cargoRepo } from '@repos/cargo'
import { userRepo } from '@repos/user'

const getDeliveryDateAndCostsUseCase = new GetDeliveryDateAndCostsUseCase(locationRepo)
const registerCargoUseCase = new RegisterCargoUseCase(cargoRepo, locationRepo, userRepo)

export { getDeliveryDateAndCostsUseCase, registerCargoUseCase }

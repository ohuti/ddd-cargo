import { AddHandlingEventUseCase } from './addHandlingEvent/AddHandlingEventUseCase'

import { cargoRepo } from '@repos/cargo'
import { handlingEventRepo } from '@repos/handlingEvent'

const addHandlingEventUseCase = new AddHandlingEventUseCase(cargoRepo, handlingEventRepo)

export { addHandlingEventUseCase }

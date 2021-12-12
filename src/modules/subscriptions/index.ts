import { AfterCargoRegistration } from './AfterCargoRegistration'

import { addHandlingEventUseCase } from '@useCases/incidentRegister/'

new AfterCargoRegistration(addHandlingEventUseCase)

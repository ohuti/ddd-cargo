import { CreateRecipientController } from './CreateRecipientController'

import { createRecipientUseCase } from '@users/useCases'

const createRecipientController = new CreateRecipientController(createRecipientUseCase)

export {
    createRecipientController
}

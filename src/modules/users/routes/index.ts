import { Router } from 'express'

import { createRecipientController } from '@users/controllers'

const router = Router()

router.post('/createRecipient', (req, res) => createRecipientController.execute(req, res))

export default router

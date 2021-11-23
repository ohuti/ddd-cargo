import { Router } from 'express'

import { createUserController } from '@users/controllers'

const router = Router()

router.post('/createRecipient', (req, res) => createUserController.execute(req, res))

export default router

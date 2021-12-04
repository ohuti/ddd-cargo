import { Router } from 'express'

import { createUserController } from '@controllers/user'

const router = Router({ mergeParams: true })

router.post('', (req, res) => createUserController.execute(req, res))

export default router

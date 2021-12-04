import { Router } from 'express'

import { listAllLocationsController } from '@controllers/core'

const router = Router({ mergeParams: true })

router.get('/locations', (req, res) => listAllLocationsController.execute(req, res))

export default router

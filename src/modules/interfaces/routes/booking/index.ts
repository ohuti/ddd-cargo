import { Router } from 'express'

import { getDeliveryDateAndCostsController } from '@controllers/booking'

const router = Router({ mergeParams: true })

router.get('/calculateDelivery', (req, res) => getDeliveryDateAndCostsController.execute(req, res))

export default router

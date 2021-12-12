import { Router } from 'express'

import { getDeliveryDateAndCostsController, registerCargoController } from '@controllers/booking'

const router = Router({ mergeParams: true })

router.get('/calculateDelivery', (req, res) => getDeliveryDateAndCostsController.execute(req, res))
router.post('/registerCargo', (req, res) => registerCargoController.execute(req, res))

export default router

import { Router } from 'express'

import bookingRouter from './booking'
import coreRouter from './core'
import userRouter from './user'

const router = Router()

router.use('/booking', bookingRouter)
router.use('/users', userRouter)
router.use('/core', coreRouter)

export default router

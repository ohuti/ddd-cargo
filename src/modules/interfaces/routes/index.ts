import { Router } from 'express'

import coreRouter from './core'
import userRouter from './user'

const router = Router()

router.use('/users', userRouter)
router.use('/core', coreRouter)

export default router

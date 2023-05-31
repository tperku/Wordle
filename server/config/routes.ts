import { Router } from 'express'

import { adminRouter, protect } from '../src/admin'
import { gameRouter, handleWordleFrontend } from '../src/wordle'
import userRouter from '../src/user'
import { verifyRoles } from '../middleware/roleVerification'

const router = Router()
const ROLES = ['USER', 'ADMIN']

router.get('/wordle', verifyRoles(ROLES), handleWordleFrontend)
router.use('/api', gameRouter)
router.use('/admin', protect, verifyRoles(ROLES[1]), adminRouter)
router.use('/user', userRouter)

export default router

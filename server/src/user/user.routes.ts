import { body } from 'express-validator'
import { Router } from 'express'
import { handleInputError } from '../../middleware/APIValidation'
import { createUser, handleRefreshToken, logout, signIn } from './user.hanlders'
import { protect } from '../admin'

const userRouter = Router()

userRouter.post(
    '/user',
    body('username').exists().isString(),
    body('password').exists().isString(),
    handleInputError,
    createUser
)
userRouter.post(
    '/signin',
    body('username').exists().isString(),
    body('password').exists().isString(),
    handleInputError,
    signIn
)
userRouter.put(
    '/logout',
    protect,
    body('username').exists().isString(),
    handleInputError,
    logout
)
userRouter.get(
    '/token',
    // body('username').exists().isString(),
    handleInputError,
    handleRefreshToken
)

export default userRouter

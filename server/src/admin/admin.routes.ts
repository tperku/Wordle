import { body } from 'express-validator'
import { Router } from 'express'
import {
    addNewWord,
    deleteWord,
    getWord,
    getWords,
    getWordById,
    updateWord,
} from './admin.hanlders'
import { handleInputError } from '../../middleware/APIValidation'

const adminRouter = Router()

adminRouter.get('/word', getWord)
adminRouter.get('/words', getWords)
adminRouter.get('/wordbyid', getWordById)
adminRouter.put(
    '/word',
    body('id').exists().isNumeric(),
    body('word').exists().isString(),
    handleInputError,
    updateWord
)
adminRouter.post(
    '/addword',
    body('word').exists().isString(),
    handleInputError,
    addNewWord
)
adminRouter.delete(
    '/word',
    body('word').exists().isString(),
    body('id').exists().isNumeric(),
    handleInputError,
    deleteWord
)

export default adminRouter

import { Router } from 'express'
import { body } from 'express-validator'
import { checkWord, getRandomWord } from './wordle.handlers'
import { handleInputError } from '../../middleware/APIValidation'
import enterHandler from './wordle.services'

const gameRouter = Router()

gameRouter.get('/word_rand', getRandomWord)
gameRouter.post(
    '/check_word',
    body('word').exists().isString(),
    handleInputError,
    checkWord
)
gameRouter.post(
    '/handle_enter',
    body('word').exists().isString(),
    body('row').exists().isNumeric(),
    handleInputError,
    enterHandler
)

export default gameRouter

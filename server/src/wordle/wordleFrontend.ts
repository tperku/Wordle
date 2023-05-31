import type { Request, Response } from 'express'
import { setCache, UNIQUE_WORD_KEY } from './wordle.helpers'

const WORD_URL = 'http://localhost:2020/api/word_rand'

const handleWordleFrontend = async (
    req: Request,
    res: Response
): Promise<void> => {
    const response = await fetch(WORD_URL)
    const resObj = await response.json()
    console.log(resObj)
    const originalWord = resObj.body.word
    setCache(UNIQUE_WORD_KEY, originalWord)
    console.log(originalWord)
    res.json({ message: 'Hello all' })
}

export default handleWordleFrontend

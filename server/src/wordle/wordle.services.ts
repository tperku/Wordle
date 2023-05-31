import { type Result } from '../../types/my_types'
import { getCache, isWord, UNIQUE_WORD_KEY } from './wordle.helpers'

const enterHandler = async (req, res): Promise<void> => {
    const word: string = req.body.word
    const row: number = req.body.row
    const originalWord: string = getCache(UNIQUE_WORD_KEY)
    const existingWord: boolean = await isWord(word)

    const won: boolean = word === originalWord
    const lost: boolean = row === 5 && !won
    const wordArray: string[] = word.split('')
    const originalWordArray: string[] = originalWord.split('')
    const colors: string[] = Array(5).fill('', 0)

    for (let i = wordArray.length - 1; i >= 0; i--) {
        if (wordArray[i] === originalWordArray[i]) {
            colors[i] = 'correct'
            originalWordArray.splice(i, 1)
        }
    }
    for (let i = 0; i < colors.length; i++) {
        if (colors[i] !== '') {
            continue
        }
        if (!originalWordArray.includes(wordArray[i])) {
            colors[i] = 'wrong'
        } else {
            originalWordArray.splice(originalWordArray.indexOf(wordArray[i]), 1)
            colors[i] = 'close'
        }
    }
    let final: string = ''
    if (lost) {
        final = originalWord
    }

    const result: Result = {
        isWord: existingWord,
        won,
        lost,
        colors,
        originalWord: final,
    }

    res.json({ body: result })
}

export default enterHandler

import prisma from '../../utils/db'

export const getWord = async (req, res): Promise<void> => {
    const word = await prisma.dictionary.findUnique({
        where: {
            word: req.body.word,
        },
    })
    if (word === null) {
        res.status(400).json({ message: "Word doesn't exist in DB" })
        return
    }
    res.json({ data: word })
}

let myCursor: number = 0
function setCursor(wordId: number): void {
    myCursor = wordId
}

export const getWords = async (req, res): Promise<void> => {
    if (myCursor === 0) {
        const words = await prisma.dictionary.findMany({
            take: 10,
        })
        const lastSentWord = words[9]
        setCursor(lastSentWord.id)

        res.json({ body: words })
    } else {
        const words = await prisma.dictionary.findMany({
            take: 10,
            skip: 1,
            cursor: {
                id: myCursor,
            },
        })
        const lastSentWord = words[9]
        setCursor(lastSentWord.id)
        res.json({ body: words })
    }
}

export const getWordById = async (req, res): Promise<void> => {
    const word = await prisma.dictionary.findUnique({
        where: {
            id: req.body.id,
        },
    })
    if (word === null) {
        res.status(400).json({ message: "ID doesn't exist in DB" })
        return
    }
    res.json({ data: word })
}

export const updateWord = async (req, res): Promise<void> => {
    try {
        const updated = await prisma.dictionary.update({
            where: {
                id: req.body.id,
            },
            data: {
                word: req.body.word,
            },
        })
        res.json({ data: updated })
    } catch (e) {
        console.log(
            "Invalid prisma.dictionary.update() - Can't update unexisiting words"
        )
        res.status(400).json({ message: "Entered ID doesn't exist in DB" })
    }
}

export const addNewWord = async (req, res): Promise<void> => {
    try {
        const word = await prisma.dictionary.create({
            data: {
                word: req.body.word,
            },
        })

        res.json({ data: word })
    } catch (e) {
        res.status(400).json({ message: 'That word already exist in DB' })
    }
}

export const deleteWord = async (req, res): Promise<void> => {
    console.log(req.body)
    try {
        const word = await prisma.dictionary.deleteMany({
            where: {
                word: req.body.word,
                id: req.body.id,
            },
        })
        res.json({ message: 'Next object was deleted from DB', data: word })
    } catch (e) {
        res.status(400).json({ message: "Word doesn't exist in DB" })
    }
}

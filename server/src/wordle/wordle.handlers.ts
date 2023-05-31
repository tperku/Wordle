import prisma from '../../utils/db'

export const checkWord = async (req, res): Promise<void> => {
    const word = await prisma.dictionary.findUnique({
        where: {
            word: req.body.word,
        },
    })
    const state = word !== null
    res.json({ body: { state } })
}

export const getRandomWord = async (req, res): Promise<void> => {
    const count: number = await prisma.dictionary.count()
    const randNumber: number = Math.floor(Math.random() * count) + 1
    const word = await prisma.dictionary.findFirst({
        skip: randNumber - 1,
        take: 1,
    })

    res.json({ body: word })
}

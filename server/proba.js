const { PrismaClient } = require('@prisma/client')
const fs = require('fs')

function readWordsFromFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const words = fileContent.split('\n')
    return words
}

const filePath = 'C:/Users/Perka/Desktop/words/valid-wordle-words.txt'
const words = readWordsFromFile(filePath)

async function insertWords() {
    const prisma = new PrismaClient()

    try {
        // Connect to the database
        await prisma.$connect()

        // Iterate over the words and insert them into the database
        for (const word of words) {
            await prisma.Dictionary.create({
                data: {
                    word: word,
                },
            })
        }

        console.log('Words inserted successfully!')
    } catch (error) {
        console.error('Error inserting words:', error)
    } finally {
        // Disconnect from the database
        await prisma.$disconnect()
    }
}

insertWords()

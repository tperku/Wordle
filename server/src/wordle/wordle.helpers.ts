export const UNIQUE_WORD_KEY = 'word_key'
const VALIDATE_URL = 'http://localhost:2020/api/check_word'

export const isWord = async (userEntry): Promise<any> => {
    const obj = { word: userEntry.toLowerCase() }
    const res = await fetch(VALIDATE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    })
    const result = await res.json()
    return result.body.state
}

const keyValueStore = {}

export function setCache(key: string, value: string): void {
    if (!key) {
        throw new Error('Invalid key')
    }
    keyValueStore[key] = value
}

export function getCache(key: string): string {
    if (!key) {
        throw new Error('Invalid key')
    }
    return keyValueStore[key]
}

// export const setOriginalWord = (newValue) => {
//   originalWord = newValue;
// };

// class MemoryCache {
//     constructor() {
//         console.log('MemoryCache initialized')
//     }

//     keyValueStore = {}

//     setCache(key: string, value: any) {
//         this.keyValueStore[key] = value
//     }

//     getCache(key: string) {
//         return this.keyValueStore[key]
//     }
// }
// export const memoryCache = new MemoryCache()

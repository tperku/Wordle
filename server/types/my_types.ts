export interface User {
    id: string
    username: string
    password: string
    role: string | undefined | null
}

export interface Result {
    isWord: boolean
    won: boolean
    lost: boolean
    colors: string[]
    originalWord: string
}

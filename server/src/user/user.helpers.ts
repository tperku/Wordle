import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { type User } from '../../types/my_types'

export const comparePasswords = async (
    password: string,
    hash: string
): Promise<boolean> => {
    return bcrypt.compare(password, hash)
}

export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 5)
}

export const createAccessToken = (user: User): string => {
    const accessToken = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '300s' }
    )
    return accessToken
}
export const createRefreshToken = (user: User): string => {
    const refreshToken: string = jwt.sign(
        { username: user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    )
    return refreshToken
}

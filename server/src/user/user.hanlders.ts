import prisma from '../../utils/db'
import jwt from 'jsonwebtoken'
import { type User } from '../../types/my_types'
import {
    comparePasswords,
    createAccessToken,
    createRefreshToken,
    hashPassword,
} from './user.helpers'

export const createUser = async (req, res): Promise<void> => {
    try {
        const refreshToken = createRefreshToken(req.body.username)
        const newUser = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password),
                role: req.body.role,
                refreshtoken: refreshToken,
            },
        })
        const accessToken = createAccessToken(newUser)

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        })
        res.json({ role: newUser.role, token: accessToken })
    } catch (e) {
        res.status(400).json({ Error: e })
    }
}

export const signIn = async (req, res): Promise<void> => {
    const user: User | null = await prisma.user.findUnique({
        where: {
            username: req.body.username,
        },
    })

    if (user !== null) {
        const valid: boolean = await comparePasswords(
            req.body.password,
            user.password
        )

        if (!valid) {
            res.status(400)
            res.json({ message: "Your username and password don't match" })
            return
        }

        const accessToken = createAccessToken(user)
        const refreshToken = createRefreshToken(user)

        await prisma.user.update({
            where: {
                username: req.body.username,
            },
            data: {
                refreshtoken: refreshToken,
            },
        })

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        }).json({ role: user.role, token: accessToken })
        return
    }
    res.status(400).json({ message: 'No username in our DB' })
}

export const logout = async (req, res): Promise<void> => {
    const user: User | null = await prisma.user.update({
        where: {
            username: req.body.username,
        },
        data: {
            refreshtoken: '',
        },
    })

    if (user !== null) {
        res.clearCookie('jwt', {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        })
        res.json({ message: 'You are logged out' })
        return
    }
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.status(501).json({ message: 'Error in DB' })
}

export const handleRefreshToken = async (req, res): Promise<void> => {
    const cookies = req.cookies
    if (!cookies.jwt) {
        return res.status(403).json({ message: 'No refresh token in cookie' })
    }
    try {
        jwt.verify(cookies.jwt, process.env.REFRESH_TOKEN_SECRET)
    } catch (e) {
        console.error('JsonWebTokenError: Token expired')
        res.status(401)
        res.json({ message: 'Refresh token expired' })
        return
    }

    const refreshToken = cookies.jwt

    const user: User | null = await prisma.user.findFirst({
        where: {
            refreshtoken: refreshToken,
        },
    })
    if (user === null) {
        return res.status(401).json({ message: 'No user or token in DB' })
    }
    const accessToken = createAccessToken(user)
    res.json({ username: user.username, role: user.role, token: accessToken })
}

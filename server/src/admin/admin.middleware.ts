import jwt from 'jsonwebtoken'

export const protect = (req, res, next): void => {
    const bearer: string | null = req.headers.authorization

    if (bearer === null) {
        res.status(401)
        res.json({ message: 'not authorized' })
        return
    }

    const [, token] = bearer.split(' ')
    if (!token) {
        res.status(401)
        res.json({ message: 'No token!' })
        return
    }

    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = user
        next()
    } catch (e) {
        console.error('JsonWebTokenError: invalid signature')
        res.status(401)
        res.json({ message: 'Invalid token!' })
    }
}

import jwt from 'jsonwebtoken'

export const verifyRoles = (allowedRoles) => {
    return (req, res, next) => {
        try {
            const bearer: string = req.headers.authorization
            const [, token] = bearer.split(' ')

            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            const result = allowedRoles.includes(user.role)
            if (!result) {
                return res
                    .status(401)
                    .json({ message: 'You are not authorized' })
            }
            next()
        } catch (e) {
            console.error('JsonWebTokenError role: invalid signature')
            res.status(401)
            res.json({ message: 'Invalid token!' })
        }
    }
}

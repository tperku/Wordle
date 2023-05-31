import { whitelist } from '../config/corsOptions'

const credentials = (req, res, next): void => {
    const origin = req.headers.origin
    if (whitelist.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true)
    }
    next()
}

export { credentials }

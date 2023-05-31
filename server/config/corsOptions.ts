const whitelist = [
    'https://www.google.com',
    'http://localhost:5173',
    'http://localhost:2020',
]
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin) || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200,
}

export { corsOptions, whitelist }

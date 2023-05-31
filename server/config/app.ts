import express, { type Express } from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'

import router from './routes'
import { corsOptions } from './corsOptions'
import { credentials } from '../middleware/credentials'

const app: Express = express()

app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(credentials)
app.use(cors(corsOptions))

app.use('', router)

export default app

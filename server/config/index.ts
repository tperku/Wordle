import app from './app'
import * as dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT ?? '2020'

app.listen(PORT, () => {
    console.log(`Server hosted on http://localhost:${PORT}/wordle`)
})

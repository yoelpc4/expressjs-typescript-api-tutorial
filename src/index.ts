import * as dotenv from 'dotenv'
import * as express from 'express'
import * as cors from 'cors'
import { authorRouter } from './author/author.router'
import { bookRouter } from './book/book.router'

dotenv.config()

if (!process.env.PORT) {
    process.exit()
}

const PORT: number = parseInt(process.env.PORT as string, 10)

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/authors', authorRouter)
app.use('/api/books', bookRouter)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))

import * as express from 'express'
import type { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import * as BookService from './book.service'

export const bookRouter = express.Router()

bookRouter.get('/', async (req: Request, res: Response) => {
    try {
        const books = await BookService.listBooks()

        return res.status(200).json(books)
    } catch (error: any) {
        return res.status(500).json(error.message)
    }
})

bookRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10)

        const book = await BookService.getBook(id)

        if (!book) {
            return res.status(404).json('Book could not be found')
        }

        return res.status(200).json(book)
    } catch (error: any) {
        return res.status(500).json(error.message)
    }
})

bookRouter.post(
    '/',
    body('title').isString(),
    body('isFiction').isBoolean(),
    body('datePublished').isDate(),
    body('authorId').isInt(),
    async (req: Request, res: Response) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            })
        }

        try {
            const book = req.body

            const newBook = await BookService.createBook(book)

            return res.status(201).json(newBook)
        } catch (error: any) {
            return res.status(500).json(error.message)
        }
    }
)

bookRouter.put(
    '/:id',
    body('title').isString(),
    body('isFiction').isBoolean(),
    body('datePublished').isDate(),
    body('authorId').isInt(),
    async (req: Request, res: Response) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            })
        }

        try {
            const id = parseInt(req.params.id, 10)

            const book = req.body

            const updatedBook = await BookService.updateBook(book, id)

            return res.status(201).json(updatedBook)
        } catch (error: any) {
            return res.status(500).json(error.message)
        }
    }
)

bookRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10)

        await BookService.deleteBook(id)

        return res.status(204).json('Book was successfully deleted')
    } catch (error: any) {
        return res.status(500).json(error.message)
    }
})

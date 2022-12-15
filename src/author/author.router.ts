import * as express from 'express'
import type {Request, Response} from 'express'
import {body, validationResult} from 'express-validator'
import * as AuthorService from './author.service'

export const authorRouter = express.Router()

authorRouter.get('/', async (req: Request, res: Response) => {
    try {
        const authors = await AuthorService.listAuthors()

        return res.status(200).json(authors)
    } catch (error: any) {
        return res.status(500).json(error.message)
    }
})

authorRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10)

        const author = await AuthorService.getAuthor(id)

        if (!author) {
            return res.status(404).json('Author could not be found')
        }

        return res.status(200).json(author)
    } catch (error: any) {
        return res.status(500).json(error.message)
    }
})

authorRouter.post(
    '/',
    body('firstName').isString(),
    body('lastName').isString(),
    async (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (! errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    try {
        const author = req.body

        const newAuthor = await AuthorService.createAuthor(author)

        return res.status(201).json(newAuthor)
    } catch (error: any) {
        return res.status(500).json(error.message)
    }
})

authorRouter.put(
    '/:id',
    body('firstName').isString(),
    body('lastName').isString(),
    async (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (! errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        })
    }

    try {
        const id = parseInt(req.params.id, 10)

        const author = req.body

        const updatedAuthor = await AuthorService.updateAuthor(author, id)

        return res.status(200).json(updatedAuthor)
    } catch (error: any) {
        return res.status(500).json(error.message)
    }
})

authorRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10)

        await AuthorService.deleteAuthor(id)

        return res.status(204).json('Author successfully deleted')
    } catch (error: any) {
        return res.status(500).json(error.message)
    }
})

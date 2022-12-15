import {db} from '../utils/db.server'
import type { Author } from '../author/author.service'

type BookRead = {
    id: number,
    title: string,
    isFiction: boolean,
    datePublished: Date,
    authorId: number,
    author: Author
}

type BookWrite = {
    title: string,
    isFiction: boolean,
    datePublished: string,
    authorId: number,
}

export const listBooks = async (): Promise<BookRead[]> => await db.book.findMany({
    select: {
        id: true,
        title: true,
        isFiction: true,
        datePublished: true,
        authorId: true,
        author: {
            select: {
                id: true,
                firstName: true,
                lastName: true,
            },
        },
    },
})

export const getBook = async (id: number): Promise<BookRead | null> => await db.book.findUnique({
    where: {
      id,
    },
    select: {
        id: true,
        title: true,
        isFiction: true,
        datePublished: true,
        authorId: true,
        author: {
            select: {
                id: true,
                firstName: true,
                lastName: true,
            },
        },
    },
})

export const createBook = async (book: BookWrite): Promise<BookRead> => {
    const { title, isFiction, datePublished, authorId } = book

    const parseDate: Date = new Date(datePublished)

    return await db.book.create({
        data: {
            title,
            isFiction,
            datePublished: parseDate,
            authorId,
        },
        select: {
            id: true,
            title: true,
            isFiction: true,
            datePublished: true,
            authorId: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },
        },
    })
}

export const updateBook = async (book: BookWrite, id: number): Promise<BookRead> => {
    const { title, isFiction, datePublished, authorId } = book

    const parseDate: Date = new Date(datePublished)

    return await db.book.update({
        where: {
          id,
        },
        data: {
            title,
            isFiction,
            datePublished: parseDate,
            authorId,
        },
        select: {
            id: true,
            title: true,
            isFiction: true,
            datePublished: true,
            authorId: true,
            author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },
        },
    })
}

export const deleteBook = async (id: number): Promise<void> => {
    await db.book.delete({
        where: {
            id,
        },
    })
}

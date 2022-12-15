import {db} from '../utils/db.server'

export type Author = {
    id: number,
    firstName: string,
    lastName: string,
}

export const listAuthors = async (): Promise<Author[]> => await db.author.findMany({
    select: {
        id: true,
        firstName: true,
        lastName: true,
    },
})

export const getAuthor = async (id: number): Promise<Author | null> => await db.author.findUnique({
    where: {
        id,
    },
})

export const createAuthor = async (author: Omit<Author, 'id'>): Promise<Author> => await db.author.create({
    data: author,
    select: {
        id: true,
        firstName: true,
        lastName: true,
    },
})

export const updateAuthor = async (author: Omit<Author, 'id'>, id: number): Promise<Author> => await db.author.update({
    where: {
        id,
    },
    data: {
        firstName: author.firstName,
        lastName: author.lastName,
    },
    select: {
        id: true,
        firstName: true,
        lastName: true,
    },
})

export const deleteAuthor = async (id: number): Promise<void> => {
    await db.author.delete({
        where: {
            id,
        }
    })
}

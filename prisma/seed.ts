import { db } from '../src/utils/db.server'

type Author = {
    firstName: string,
    lastName: string
}

type Book = {
    title: string,
    isFiction: boolean,
    datePublished: Date,
}

seed()

async function seed() {
    await Promise.all(getAuthors().map(author => db.author.create({
        data: {
            firstName: author.firstName,
            lastName: author.lastName,
        },
    })))

    const author = await db.author.findFirst({
        where: {
            firstName: 'Yuval Noah'
        }
    })

    await Promise.all(getBooks().map(book => db.book.create({
        data: {
            title: book.title,
            isFiction: book.isFiction,
            datePublished: book.datePublished,
            authorId: author.id
        },
    })))
}

function getAuthors(): Author[] {
    return [
        {
            firstName: 'John',
            lastName: 'Doe'
        },
        {
            firstName: 'William',
            lastName: 'Shakespeare'
        },
        {
            firstName: 'Yuval Noah',
            lastName: 'Harari'
        },
    ]
}

function getBooks(): Book[] {
    return [
        {
            title: 'Sapiens',
            isFiction: false,
            datePublished: new Date(),
        },
        {
            title: 'Homo Deus',
            isFiction: false,
            datePublished: new Date(),
        },
        {
            title: 'The Ugly Ducking',
            isFiction: true,
            datePublished: new Date(),
        },
    ]
}

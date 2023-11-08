import { v4 as uuid } from 'uuid';

export const createBookWithID = (book, source) => {
    return {
        ...book,
        source,
        isFavorite: false,
        id: uuid()

    }
}
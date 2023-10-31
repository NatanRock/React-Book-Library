import { v4 as uuid } from 'uuid';

export const createBookWithID = (book) => {
    return {
        ...book,
        isFavorite: false,
        id: uuid()

    }
}
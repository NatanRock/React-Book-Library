import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createBookWithID } from '../../utils/createBookWithID'
import { setError } from './errorSlice'

const initialState = {
    books: [],
    isLoadingViaAPI: false
}

export const fetchBook = createAsyncThunk('books/fetchBook', async (url, thunkAPI) => {
    try {
        const res = await axios.get(url)
        return res.data
    } catch (error) {
        thunkAPI.dispatch(setError(error.message))
        throw error
    }

})

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.books.push(action.payload)
        },
        removeBook: (state, action) => {
            return { ...state, books: state.books.filter(book => book.id != action.payload) }
        },
        toggleFavorite: (state, action) => {

            return state.books.map(book => book.id === action.payload ? { ...book, isFavorite: !book.isFavorite } : book)
        }
    },
    extraReducers: {
        [ fetchBook.pending ]: (state, action) => {
            state.isLoadingViaAPI = true
        },
        [ fetchBook.fulfilled ]: (state, action) => {
            state.isLoadingViaAPI = false
            if (action.payload.title && action.payload.author) {
                state.books.push(createBookWithID(action.payload, 'API'))

            }
        },
        [ fetchBook.rejected ]: (state, action) => {
            state.isLoadingViaAPI = false
        }
    }

    // extraReducers: (builder) => { 
    //     builder.addCase(fetchBook.fulfilled, (state, action) => {
    //         if (action.payload.title && action.payload.author) {
    //             state.books.push(createBookWithID(action.payload, 'API'))
    //         }
    //     })
    // }

})

export const selectBooks = state => state.books.books
export const selectIsLoadingViaAPI = state => state.books.isLoadingViaAPI
export const { addBook, removeBook, toggleFavorite } = booksSlice.actions
export default booksSlice.reducer



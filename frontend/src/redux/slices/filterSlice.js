import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    title: '',
    author: '',
    onlyFavorite: false
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setTitleFilter: (state, action) => {
            state.title = action.payload
        },
        resetFilters: () => initialState,
        setAuthorFilter: (state, action) => {
            state.author = action.payload
        },
        setFavoriteBook: (state) => {
            state.onlyFavorite = !state.onlyFavorite
        }
    }
})

export const { setTitleFilter, setAuthorFilter, setFavoriteBook, resetFilters } = filterSlice.actions

export const selectTitleFilter = state => state.filter.title
export const selectAuthorFilter = state => state.filter.author
export const selectOnlyFavoriteFilter = state => state.filter.onlyFavorite

export default filterSlice.reducer
import { useSelector, useDispatch } from 'react-redux'
import { removeBook, toggleFavoriteBook } from '../../redux/books/actionCreators'
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs'

import './BookList.css'
export const BookList = () => {
    const books = useSelector(state => state.books)
    const dispatch = useDispatch()

    const removeBookHandler = (id) => {
        dispatch(removeBook(id))
    }

    const toggleFavoriteBookHandler = (id) => {
        dispatch(toggleFavoriteBook(id))
    }

    return (
        <div className='app-block book-list'>
            <h2>Book List</h2>
            {books.length === 0 ? (<p>No books available</p>) : (
                <ul>
                    {books.map((book, i) => (
                        <li key={book.id}>
                            {++i}. <div className='book-info'>{book.title} by <strong>{book.author}</strong></div>
                            <div className="book-actions">
                                <span onClick={() => toggleFavoriteBookHandler(book.id)}>
                                    {book.isFavorite ?
                                        (<BsBookmarkStarFill className='star-icon' />) :
                                        (<BsBookmarkStar className='star-icon' />)}
                                </span>
                                <button onClick={() => removeBookHandler(book.id)}>Delete book</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
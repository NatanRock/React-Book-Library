import { useSelector, useDispatch } from 'react-redux'
import { removeBook, toggleFavorite } from '../../redux/slices/booksSlice'
import { BsBookmarkStarFill, BsBookmarkStar } from 'react-icons/bs'
import { selectTitleFilter, selectAuthorFilter, selectOnlyFavoriteFilter } from '../../redux/slices/filterSlice'
import { selectBooks } from '../../redux/slices/booksSlice'
import './BookList.css'

export const BookList = () => {
    const books = useSelector(selectBooks)
    const filterBooks = useSelector(selectTitleFilter)
    const filterAuthor = useSelector(selectAuthorFilter)
    const favoriteBooks = useSelector(selectOnlyFavoriteFilter)
    const dispatch = useDispatch()


    const removeBookHandler = (id) => {
        dispatch(removeBook(id))
    }

    const toggleFavoriteBookHandler = (id) => {
        dispatch(toggleFavorite(id))
    }

    const filteredBooks = books.filter(book => {
        const matchesTitle = book.title.toLowerCase().includes(filterBooks.toLowerCase());
        const matchesAuthor = book.author.toLowerCase().includes(filterAuthor.toLowerCase());
        const matchesFavorite = favoriteBooks ? book.isFavorite : true;
        return matchesTitle && matchesAuthor && matchesFavorite;
    })

    const matchHilight = (text, filter) => {
        const regex = new RegExp(`(${filter})`, 'gi');

        return text.split(regex).map((substring, i) => {
            if (substring.toLowerCase() === filter.toLowerCase()) {
                return (
                    <span key={i} className='highlight'>{substring}</span>
                )
            }
            return substring;
        })
    }


    return (
        <div className='app-block book-list'>
            <h2>Book List</h2>
            {books.length === 0 ? (<p>No books available</p>) : (
                <ul>
                    {filteredBooks.map((book, i) => (
                        <li key={book.id}>
                            {++i}. <div className='book-info'>{matchHilight(book.title, filterBooks)} by
                                <strong>{matchHilight(book.author, filterAuthor)}</strong>({book.source})</div>
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
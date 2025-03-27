import { useState, useEffect } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
function BookList ({selectedCategories}: {selectedCategories: String[]}) {

    const [books, setBooks] = useState<Book[]>([]);   
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {

            const categoryParams = selectedCategories.map((cat) => `bookTypes=${encodeURIComponent(String(cat))}`)
            .join('&');    

            const response = await fetch(
                `https://localhost:5000/api/Book/GetBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ''}`
            );
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.ceil(totalItems / pageSize));
        }
        fetchBooks();
    }, [pageSize, pageNum, totalItems, sortOrder, selectedCategories]);
    

    return (
        <>
        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                Sort by Name ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
            </button>

        {books.map((b) => 
            <div id="bookCard" className="card" key={b.bookID}>
                <h1 className='card-title'>{b.title}</h1>
                <div className='card-body'>
                <ul className="list-unstyled">
                <li><strong>Author:</strong> {b.author}</li>
                <li><strong>Publisher:</strong> {b.publisher}</li>
                <li><strong>ISBN:</strong> {b.isbn}</li>
                <li><strong>Classification:</strong> {b.classification}</li>
                <li><strong>Category:</strong> {b.category}</li>
                <li><strong>Pages:</strong> {b.pageCount}</li>
                <li><strong>Price:</strong> ${b.price}</li>
                </ul>
                <button className='btn btn-success' onClick={()=> navigate(`/donate/${b.title}/${b.bookID}`)}>Donate</button>
                </div>
            </div>
            
        )}
        <button disabled={pageNum ===1} onClick={() => setPageNum(pageNum-1)} >Previous</button>

        {[...Array(totalPages)].map((_, index) => (
            <button key={index + 1} onClick={() => setPageNum(index + 1)}>
                {index + 1}
            </button>
        ))}

        <button disabled={pageNum ===totalPages} onClick={() => setPageNum(pageNum+1)}>Next</button>

        <br/>

        <label>
        Results per page:
        <select value = {pageSize} onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
        }}
            >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
        </select>
        </label>
        </>
    );
}

export default BookList;
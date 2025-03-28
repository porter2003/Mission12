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
        {/* #notcoveredinthevideos - Shadow on hover using Bootstrap utility */}
        <button 
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} 
            className="btn btn-primary mb-3"
        >
            Sort by Name ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
        </button>
    
        {/* Grid system: 3 columns on md screens and up */}
        <div className="container">
            <div className="row">
                {books.map((b) => 
                    <div key={b.bookID} className="col-md-4 mb-4">
                        <div id="bookCard" className="card h-100 shadow-sm hover-shadow">
                            <div className="card-body">
                                <h5 className='card-title'>{b.title}</h5>
                                <ul className="list-unstyled">
                                    <li><strong>Author:</strong> {b.author}</li>
                                    <li><strong>Publisher:</strong> {b.publisher}</li>
                                    <li><strong>ISBN:</strong> {b.isbn}</li>
                                    <li><strong>Classification:</strong> {b.classification}</li>
                                    <li><strong>Category:</strong> {b.category}</li>
                                    <li><strong>Pages:</strong> {b.pageCount}</li>
                                    <li><strong>Price:</strong> ${b.price}</li>
                                </ul>
                                <button className='btn btn-success mt-2' onClick={() => navigate(`/donate/${b.title}/${b.bookID}`)}>
                                    Donate
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    
        {/* Pagination controls */}
        <div className="d-flex justify-content-center my-4">
            <button className="btn btn-secondary me-2" disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>
            {[...Array(totalPages)].map((_, index) => (
                <button 
                    key={index + 1} 
                    className={`btn ${index + 1 === pageNum ? 'btn-primary' : 'btn-outline-primary'} mx-1`} 
                    onClick={() => setPageNum(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
            <button className="btn btn-secondary ms-2" disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>
        </div>
    
        <div className="text-center">
            <label>
                Results per page:&nbsp;
                <select value={pageSize} onChange={(p) => {
                    setPageSize(Number(p.target.value));
                    setPageNum(1);
                }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </label>
        </div>
    
        {/* #notcoveredinthevideos - Bootstrap Toast (hidden unless triggered) */}
        <div 
            className="toast align-items-center text-bg-info border-0 position-fixed bottom-0 end-0 m-3"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            id="sortToast"
            style={{ display: 'none' }}
        >
            <div className="d-flex">
                <div className="toast-body">
                    Sort order changed to {sortOrder === 'asc' ? 'Ascending (A-Z)' : 'Descending (Z-A)'}
                </div>
                <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => {
                    const toastEl = document.getElementById("sortToast");
                    if (toastEl) toastEl.style.display = 'none';
                }}></button>
            </div>
        </div>
        </>
    );
    
}

export default BookList;
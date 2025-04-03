import { useState, useEffect, SetStateAction } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/booksApi';
import Pagination from './Pagination'; // Adjust the path as needed
function BookList ({selectedCategories}: {selectedCategories: string[]}) {

    const [books, setBooks] = useState<Book[]>([]);   
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBooks = async () => {
            try{
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNum, selectedCategories);
            
                setBooks(data.books);
            setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            }
            catch (error) {
                setError((error as Error).message);
            }
            finally {
                setLoading(false);
            }
        }
        loadBooks();
    }, [pageSize, pageNum, sortOrder, selectedCategories]);
    
    if (loading) {
        return <div className="text-center">Loading books...</div>;
    }
    if (error) {
        return <div className="text-danger text-center">Error: {error}</div>;
    }

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
        <Pagination 
            currentPage = {pageNum}
            totalPages = {totalPages}
            pageSize = {pageSize}
            onPageChange = {setPageNum}
            onPageSizeChange = {(newSize: SetStateAction<number>) =>{
                setPageSize(newSize);
                setPageNum(1);
            }}
            />
        </>
    );
    
}

export default BookList;
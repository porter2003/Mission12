import { useState } from "react";
import { Book } from "../types/Book";
import { updateBook } from "../api/booksAPI";

interface EditBookFormProps {
    book: Book;
    onSuccess: (book: Book) => void;
    onCancel: () => void;
}

const EditBookForm = ({book, onSuccess, onCancel}: EditBookFormProps) => {
    const [bookData, setBookData] = useState<Book>({...book});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBookData({...bookData,[e.target.name]: e.target.value});
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateBook(bookData.bookID, bookData);
        onSuccess(bookData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a new book</h2>
            <label>
            Book title: 
            <input 
                type="text" 
                name="title" 
                value={bookData.title} 
                onChange={handleChange} 
            />
            </label>

            <label>
            Author: 
            <input 
                type="text" 
                name="author" 
                value={bookData.author} 
                onChange={handleChange} 
            />
            </label>

            <label>
            Publisher: 
            <input 
                type="text" 
                name="publisher" 
                value={bookData.publisher} 
                onChange={handleChange} 
            />
            </label>

            <label>
            ISBN: 
            <input 
                type="text" 
                name="isbn" 
                value={bookData.isbn} 
                onChange={handleChange} 
            />
            </label>

            <label>
            Classification: 
            <input 
                type="text" 
                name="classification" 
                value={bookData.classification} 
                onChange={handleChange} 
            />
            </label>

            <label>
            Category: 
            <input 
                type="text" 
                name="category" 
                value={bookData.category} 
                onChange={handleChange} 
            />
            </label>

            <label>
            Page Count: 
            <input 
                type="number" 
                name="pageCount" 
                value={bookData.pageCount} 
                onChange={handleChange} 
            />
            </label>

            <label>
            Price: 
            <input 
                type="number" 
                name="price" 
                value={bookData.price} 
                onChange={handleChange} 
            />
            </label>

            <button type="submit" className="btn btn-primary">Update Book</button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>

        </form>
    );
};

export default EditBookForm;
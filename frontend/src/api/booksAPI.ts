import { Book } from "../types/Book";

interface FetchBooksResponse {
    books: Book[];
    totalNumBooks: number;

}

const API_URL = 'https://mission13backend-dfg7chezb0g9dkdd.eastus-01.azurewebsites.net/api/Book';

export const fetchBooks = async (
    pageSize: number,
    pageNum: number,
    selectedCategories: string[]
): Promise<FetchBooksResponse> => {
    try{
    const categoryParams = selectedCategories.map((cat) => `bookTypes=${encodeURIComponent(String(cat))}`)
            .join('&');    

            const response = await fetch(
                `${API_URL}/GetBooks?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
            );
            if (!response.ok) {
                throw new Error(`Failed to fetch books! status: ${response.status}`);
            }
            const data = await response.json();
            return data as FetchBooksResponse;
        } catch (error) {
            console.error('Error fetching books:', error);
            throw error;
        }
}

export const addBook = async (newBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/AddBook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook),
        });

        if (!response.ok) {
            throw new Error(`Failed to add book! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error adding book:', error);
        throw error;
    }
}


export const updateBook = async (bookID: number, updatedBook: Book) : Promise<Book> =>{
    try{
        const response = await fetch(`${API_URL}/UpdateBook/${bookID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBook),
        });
        if (!response.ok) {
            throw new Error(`Failed to update book! status: ${response.status}`);
        }
        return await response.json()
    }
    catch(error){
        console.error('Error updating project', error)
        throw error;
    }
}

export const deleteBook = async (bookID: number): Promise<void> => {
    try{
        const response = await fetch (`${API_URL}/DeleteBook/${bookID}`, 
            {
                method: 'DELETE'
            });
        if (!response.ok){
            throw new Error ('Failed to delete project');
        }
    }
    catch (error){
        console.error('Error deleting project: ', error);
        throw error;
    }

}
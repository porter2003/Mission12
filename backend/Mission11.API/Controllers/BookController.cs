using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;

namespace Mission11.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;

        public BookController(BookDbContext temp) => _bookContext = temp;


        [HttpGet("GetBooks")]
        public IActionResult GetBooks(int pageSize, int pageNum = 1, string sortOrder = "asc", [FromQuery] List<string>? bookTypes = null)
        {
            var booksQuery = _bookContext.Books.AsQueryable();

            // Apply sorting
            if (sortOrder == "asc")
            {
                booksQuery = booksQuery.OrderBy(b => b.Title);
            }
            else
            {
                booksQuery = booksQuery.OrderByDescending(b => b.Title);
            }
            if (bookTypes != null)
            {
                booksQuery = booksQuery.Where(b => bookTypes.Contains(b.Category));
            }
            var totalNumBooks = booksQuery.Count();

            var something = booksQuery
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            

            var someObject = new
            {
                Books = something,
                TotalNumBooks = totalNumBooks
            };

            return Ok(someObject);

        }
        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookTypes);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody]Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int BookID, [FromBody] Book updatedBook)
        {
            var book = _bookContext.Books.Find(BookID);
            if (book == null)
            {
                return NotFound();
            }

            book.Title = updatedBook.Title;
            book.Author = updatedBook.Author;
            book.Category = updatedBook.Category;
            book.Price = updatedBook.Price;
            book.ISBN = updatedBook.ISBN;
            book.Publisher = updatedBook.Publisher;
            book.Classification = updatedBook.Classification;
            book.PageCount = updatedBook.PageCount;

            _bookContext.Books.Update(book);
            _bookContext.SaveChanges();
            return Ok(book);
        }

        [HttpDelete("DeleteBook/{id}")]
        public IActionResult DeleteBook(int id)
        {
            var book = _bookContext.Books.Find(id);
            if (book == null)
            {
                return NotFound();
            }

            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();
            return NoContent();
        }
    }
}

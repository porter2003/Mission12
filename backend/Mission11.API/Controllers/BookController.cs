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
    }
}

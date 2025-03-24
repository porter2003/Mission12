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
        public IActionResult GetBooks(int pageSize, int pageNum = 1, string sortOrder = "asc")
        {
            //var something = _bookContext.Books
            //    .Skip((pageNum-1)*pageSize)
            //    .Take(pageSize)
            //    .ToList();
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

            var something = booksQuery
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = _bookContext.Books.Count();

            var someObject = new
            {
                Books = something,
                TotalNumBooks = totalNumBooks
            };

            return Ok(someObject);

        } 
    }
}

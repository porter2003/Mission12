using Microsoft.EntityFrameworkCore;

namespace Mission11.API.Data
{
    public class BookDbContext :DbContext
    {
        public BookDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
    }
}

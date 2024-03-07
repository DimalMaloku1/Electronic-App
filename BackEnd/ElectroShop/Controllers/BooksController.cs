using AutoMapper;
using ElectroShop.Data;
using ElectroShop.DTO;
using ElectroShop.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ElectroShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly MyWorldDbContext _myWorldDbContext;
        private readonly IMapper _mapper;

        public BooksController(MyWorldDbContext myWorldDbContext, IMapper mapper)
        {
            _myWorldDbContext = myWorldDbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var books = await _myWorldDbContext.Books
                .Include(b => b.Author)
                .Select(b => new BookDto
                {
                    BookId = b.BookId,
                    Title = b.Title,
                    PublicationYear = b.PublicationYear,
                    AuthorId = b.AuthorId
                })
                .ToListAsync();

            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var book = await _myWorldDbContext.Books
                .Include(b => b.Author)
                .Where(b => b.BookId == id)
                .Select(b => new BookDto
                {
                    BookId = b.BookId,
                    Title = b.Title,
                    PublicationYear = b.PublicationYear,
                    AuthorId = b.AuthorId
                })
                .FirstOrDefaultAsync();

            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        [HttpPost]
        public async Task<IActionResult> Post(BookDto bookDto)
        {
            var book = _mapper.Map<Book>(bookDto);
            _myWorldDbContext.Books.Add(book);
            await _myWorldDbContext.SaveChangesAsync();
            return Created($"/{book.BookId}", book);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, BookDto bookPayload)
        {
            if (id != bookPayload.BookId)
            {
                return BadRequest();
            }

            var updateBook = _mapper.Map<Book>(bookPayload);
            _myWorldDbContext.Books.Update(updateBook);
            await _myWorldDbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var bookToDelete = await _myWorldDbContext.Books.FindAsync(id);

            if (bookToDelete == null)
            {
                return NotFound();
            }

            _myWorldDbContext.Books.Remove(bookToDelete);
            await _myWorldDbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}

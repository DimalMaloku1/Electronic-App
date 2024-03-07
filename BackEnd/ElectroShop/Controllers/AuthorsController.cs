using AutoMapper;
using ElectroShop.Data;
using ElectroShop.DTO;
using ElectroShop.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ElectroShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {
        private readonly MyWorldDbContext _myWorldDbContext;
        private readonly IMapper _mapper;

        public AuthorsController(MyWorldDbContext myWorldDbContext, IMapper mapper)
        {
            _myWorldDbContext = myWorldDbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var authors = await _myWorldDbContext.Authors.ToListAsync();
            return Ok(authors);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var author = await _myWorldDbContext.Authors.FindAsync(id);
            if (author == null)
            {
                return NotFound();
            }
            return Ok(author);
        }

        [HttpPost]
        public async Task<IActionResult> Post(AuthorDto authorDto)
        {
            var newAuthor = _mapper.Map<Author>(authorDto);
            _myWorldDbContext.Authors.Add(newAuthor);
            await _myWorldDbContext.SaveChangesAsync();
            return Created($"/api/Authors/{newAuthor.AuthorId}", newAuthor);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, AuthorDto authorDto)
        {
            if (id != authorDto.AuthorId)
            {
                return BadRequest("ID mismatch between URL and payload.");
            }

            var existingAuthor = await _myWorldDbContext.Authors.FindAsync(id);
            if (existingAuthor == null)
            {
                return NotFound();
            }

            existingAuthor.Name = authorDto.Name;
            existingAuthor.BirthYear = authorDto.BirthYear;

            try
            {
                _myWorldDbContext.Entry(existingAuthor).State = EntityState.Modified;
                await _myWorldDbContext.SaveChangesAsync();
                return Ok(existingAuthor);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update author.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var authorToDelete = await _myWorldDbContext.Authors.FindAsync(id);
            if (authorToDelete == null)
            {
                return NotFound();
            }
            _myWorldDbContext.Authors.Remove(authorToDelete);
            await _myWorldDbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

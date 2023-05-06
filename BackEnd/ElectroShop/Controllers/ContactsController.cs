using ElectroShop.Models;
using ElectroShop.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace ElectroShop.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IMongoCollection<Contact> _contacts;

        public ContactsController(IMongoClient client)
        {
            var database = client.GetDatabase("Lab2");
            _contacts = database.GetCollection<Contact>("contacts");
        }
        [AllowAnonymous]

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetAll()
        {
            try
            {
                var contacts = await _contacts.Find(contact => true).ToListAsync();
                return Ok(contacts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        [AllowAnonymous]

        [HttpGet("{id}", Name = "GetContact")]
        public async Task<ActionResult<Contact>> GetById(string id)
        {
            try
            {
                var contact = await _contacts.Find<Contact>(c => c.Id == id).FirstOrDefaultAsync();

                if (contact == null)
                {
                    return NotFound();
                }

                return Ok(contact);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<Contact>> Create([FromBody] Contact contact)
        {
            try
            {
                contact.Id = ObjectId.GenerateNewId().ToString();
                await _contacts.InsertOneAsync(contact);
                return CreatedAtRoute("GetContact", new { id = contact.Id }, contact);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        [Authorize(Roles = "Admin")]

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] Contact contact)
        {
            try
            {
                var existingContact = await _contacts.Find<Contact>(c => c.Id == id).FirstOrDefaultAsync();

                if (existingContact == null)
                {
                    return NotFound();
                }

                contact.Id = existingContact.Id;
                await _contacts.ReplaceOneAsync(c => c.Id == id, contact);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        [Authorize(Roles = "Admin")]

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                var contact = await _contacts.Find<Contact>(c => c.Id == id).FirstOrDefaultAsync();

                if (contact == null)
                {
                    return NotFound();
                }

                await _contacts.DeleteOneAsync(c => c.Id == id);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}

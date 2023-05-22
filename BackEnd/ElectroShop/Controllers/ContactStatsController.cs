using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Bson;
using ElectroShop.Stats;

namespace ElectroShop.Controllers
{
    [Route("api/contacts")]
    [ApiController]
    public class ContactStatsController : ControllerBase
    {
        private readonly IMongoCollection<Contact> _contacts;

        public ContactStatsController(IMongoClient client)
        {
            var database = client.GetDatabase("Electroshop");
            _contacts = database.GetCollection<Contact>("contacts");
        }

        // GET: api/contacts/stats
        [HttpGet("stats")]
        public async Task<ActionResult<ContactStats>> GetContactStats()
        {
            var totalMessages = await _contacts.CountDocumentsAsync(FilterDefinition<Contact>.Empty);

            var contactStats = new ContactStats
            {
                TotalMessages = totalMessages
            };

            return Ok(contactStats);
        }
    }

}

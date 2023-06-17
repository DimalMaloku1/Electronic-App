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
    public class CategoriesController : ControllerBase
    {
        private readonly IMongoCollection<Category> _categories;

        public CategoriesController(IMongoClient client)
        {
            var database = client.GetDatabase("Electroshop");
            _categories = database.GetCollection<Category>("categories");
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> Get()
        {
            try
            {
                var categories = await _categories.Find(category => true).ToListAsync();
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        [AllowAnonymous]

        [HttpGet("{id:length(24)}", Name = "GetCategory")]
        public async Task<ActionResult<Category>> Get(string id)
        {
            try
            {
                var category = await _categories.Find<Category>(category => category.Id == id).FirstOrDefaultAsync();
                if (category == null)
                {
                    return NotFound();
                }
                return Ok(category);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Category>> Post([FromBody] Category category)
        {
            try
            {
                category.Id = ObjectId.GenerateNewId().ToString();
                await _categories.InsertOneAsync(category);
                return CreatedAtRoute("GetCategory", new { id = category.Id }, category);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }




        [Authorize(Roles = "Admin")]
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Put(string id, [FromBody] Category categoryIn)
        {
            try
            {
                var category = await _categories.Find<Category>(category => category.Id == id).FirstOrDefaultAsync();
                if (category == null)
                {
                    return NotFound();
                }
                categoryIn.Id = category.Id;
                await _categories.ReplaceOneAsync(category => category.Id == id, categoryIn);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                var category = await _categories.Find<Category>(category => category.Id == id).FirstOrDefaultAsync();
                if (category == null)
                {
                    return NotFound();
                }
                await _categories.DeleteOneAsync(category => category.Id == id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}

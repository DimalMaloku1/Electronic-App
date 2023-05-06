using ElectroShop.Data;
using ElectroShop.DTO;
using ElectroShop.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ElectroShop.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {

        private readonly IMongoCollection<Product> _products;

        public ProductsController(IMongoClient client)
        {
            var database = client.GetDatabase("Lab2");
            _products = database.GetCollection<Product>("products");
        }
        [AllowAnonymous]

        [HttpGet]
        public async Task<ActionResult<List<Product>>> Get()
        {
            try
            {
                var products = await _products.Find(product => true).ToListAsync();
                return products;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        [AllowAnonymous]

        [HttpGet("{id:length(24)}", Name = "GetProduct")]
        public async Task<ActionResult<Product>> GetById(string id)
        {
            try
            {
                var product = await _products.Find<Product>(product => product.Id == new ObjectId(id).ToString()).FirstOrDefaultAsync();

                if (product == null)
                {
                    return NotFound();
                }

                return product;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> Post([FromBody] Product product)
        {
            try
            {
                product.Id = ObjectId.GenerateNewId().ToString();
                await _products.InsertOneAsync(product);
                return CreatedAtRoute("GetProduct", new { id = product.Id }, product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        [Authorize(Roles = "Admin")]
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Put(string id, [FromBody] Product product)
        {
            try
            {
                var existingProduct = await _products.Find<Product>(product => product.Id == new ObjectId(id).ToString()).FirstOrDefaultAsync();

                if (existingProduct == null)
                {
                    return NotFound();
                }

                product.Id = existingProduct.Id;
                await _products.ReplaceOneAsync(product => product.Id == existingProduct.Id, product);
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
                var product = await _products.Find<Product>(product => product.Id == new ObjectId(id).ToString()).FirstOrDefaultAsync();

                if (product == null)
                {
                    return NotFound();
                }

                await _products.DeleteOneAsync(product => product.Id == new ObjectId(id).ToString());
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}

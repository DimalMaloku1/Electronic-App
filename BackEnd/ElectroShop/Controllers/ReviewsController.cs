using ElectroShop.Data; // Make sure you include the necessary namespaces for your models and data
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
    
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly IMongoCollection<Review> _reviewsCollection;
        private readonly IMongoCollection<Product> _productsCollection;

        public ReviewsController(IMongoClient client)
        {
            var database = client.GetDatabase("Electroshop");
            _reviewsCollection = database.GetCollection<Review>("reviews");
            _productsCollection = database.GetCollection<Product>("products");
        }

        [HttpPost("submit")]
        public async Task<IActionResult> SubmitReview(Review review)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                // Check if the selected product (ProductId) exists before allowing the review
                var existingProduct = await _productsCollection.Find(p => p.Id == review.ProductId)
                                                               .FirstOrDefaultAsync();
                if (existingProduct == null)
                {
                    return NotFound("Selected product not found");
                }

                // Generate a new ObjectId for the review
                review.Id = ObjectId.GenerateNewId().ToString();

                // Insert the review into the MongoDB collection
                await _reviewsCollection.InsertOneAsync(review);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }



        [HttpGet]
public async Task<ActionResult<List<Review>>> GetAllReviewsWithProducts()
{
    try
    {
        var reviews = await _reviewsCollection.Find(_ => true).ToListAsync();

        foreach (var review in reviews)
        {
            var product = await _productsCollection.Find(p => p.Id == review.ProductId).FirstOrDefaultAsync();
            review.Product = product;
        }

        return Ok(reviews);
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex}");
    }
}



        [HttpGet("product/{productId}")]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviewsForProduct(string productId)
        {
            try
            {
                var productFilter = Builders<Product>.Filter.Eq(p => p.Id, productId);
                var existingProduct = await _productsCollection.Find(productFilter).FirstOrDefaultAsync();
                if (existingProduct == null)
                    return NotFound("Product not found");

                var reviewFilter = Builders<Review>.Filter.Eq(r => r.ProductId, productId);
                var reviews = await _reviewsCollection.Find(reviewFilter).ToListAsync();

                return Ok(reviews);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        // Additional endpoints for review management can be added here
    }
}

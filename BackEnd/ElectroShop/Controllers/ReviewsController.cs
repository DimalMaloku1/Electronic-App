﻿using ElectroShop.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

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



        [HttpGet]
        public async Task<ActionResult<List<Review>>> GetAllReviews()
        {
            try
            {
                var reviews = await _reviewsCollection.Find(_ => true)
                    .ToListAsync();


                foreach (var review in reviews)
                {
                    review.Product = await _productsCollection.Find(p => p.Id == review.ProductId)
                        .FirstOrDefaultAsync();
                }

                return Ok(reviews);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }


        [HttpGet("{Id}")]
        public async Task<ActionResult<Review>> GetReview(string reviewId)
        {
            try
            {
                var reviewFilter = Builders<Review>.Filter.Eq(r => r.Id, reviewId);
                var review = await _reviewsCollection.Find(reviewFilter).FirstOrDefaultAsync();

                if (review == null)
                {
                    return NotFound();
                }


                review.Product = await _productsCollection.Find(p => p.Id == review.ProductId)
                    .FirstOrDefaultAsync();

                return Ok(review);
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
        [HttpPost("submit")]
        public async Task<IActionResult> SubmitReview(Review review)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);


                var existingProduct = await _productsCollection.Find(p => p.Id == review.ProductId)
                                                               .FirstOrDefaultAsync();
                if (existingProduct == null)
                {
                    return NotFound("Selected product not found");
                }

                review.Id = ObjectId.GenerateNewId().ToString();
                await _reviewsCollection.InsertOneAsync(review);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteReview(string Id)
        {
            try
            {
                var reviewFilter = Builders<Review>.Filter.Eq(r => r.Id, Id);
                var review = await _reviewsCollection.FindOneAndDeleteAsync(reviewFilter);

                if (review == null)
                {
                    return NotFound();
                }

                return Ok($"Review {Id} deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

    }
}

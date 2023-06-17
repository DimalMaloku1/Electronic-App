using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Bson;
using ElectroShop.Stats;
using Electroshop.Models;

namespace ElectroShop.Controllers
{
    [Route("api/Stats")]
    [ApiController]
    public class StatsController : ControllerBase
    {
        private readonly IMongoCollection<Product> _products;
        private readonly IMongoCollection<CheckoutData> _checkoutDataCollection;

        public StatsController(IMongoClient client)
        {
            var database = client.GetDatabase("Electroshop");
            _products = database.GetCollection<Product>("products");
            _checkoutDataCollection = database.GetCollection<CheckoutData>("checkouts");
        }
        [HttpGet]
        public async Task<IActionResult> GetStats()
        {
            try
            {
                var totalProductsTask = _products.CountDocumentsAsync(FilterDefinition<Product>.Empty);

                var checkouts = await _checkoutDataCollection.Find(_ => true).ToListAsync();
                decimal totalCheckoutPrice = checkouts.Sum(c => c.TotalPrice);
                int totalOrders = checkouts.Count;

                var totalProducts = await totalProductsTask;

                var stats = new
                {
                    TotalProducts = totalProducts,
                    TotalPrice = totalCheckoutPrice,
                    TotalOrders = totalOrders
                };

                return Ok(stats);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Bson;
using ElectroShop.Stats;

namespace ElectroShop.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductStatsController : ControllerBase
    {
        private readonly IMongoCollection<Product> _products;

        public ProductStatsController(IMongoClient client)
        {
            var database = client.GetDatabase("Electroshop");
            _products = database.GetCollection<Product>("products");
        }
        [HttpGet("stats")]
        public async Task<ActionResult<ProductStats>> GetProductStats()
        {
            var totalProductsTask = _products.CountDocumentsAsync(FilterDefinition<Product>.Empty);
            var totalCostTask = _products.Aggregate()
                .Group(_ => 1, g => new { TotalCost = g.Sum(p => p.Price) })
                .FirstOrDefaultAsync();
           

            await Task.WhenAll(totalProductsTask, totalCostTask);

            var totalProducts = totalProductsTask.Result;
            var totalCost = totalCostTask.Result;
           

            var productStats = new ProductStats
            {
                TotalProducts = totalProducts,
                TotalCost = totalCost?.TotalCost ?? 0,
               
            };

            return Ok(productStats);
        }
    }
}

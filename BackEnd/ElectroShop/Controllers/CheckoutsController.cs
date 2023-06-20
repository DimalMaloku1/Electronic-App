using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Linq;
using System.Threading.Tasks;
using Electroshop.Models;
using ElectroShop.DTO;
using System.Security.Claims;

namespace Electroshop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CheckoutController : ControllerBase
    {
        private readonly IMongoCollection<CheckoutData> _checkoutDataCollection;

        public CheckoutController(IMongoClient client)
        {
            var database = client.GetDatabase("Electroshop");
            _checkoutDataCollection = database.GetCollection<CheckoutData>("checkouts");
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCheckouts()
        {
            try
            {
                var checkouts = await _checkoutDataCollection.Find(_ => true).ToListAsync();

                return Ok(checkouts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateCheckout([FromBody] CheckoutData checkoutData)
        {
            try
            {
                checkoutData.Id = ObjectId.GenerateNewId().ToString(); // Generate default ObjectId

                decimal totalPrice = 0;
                foreach (var product in checkoutData.Products)
                {
                    totalPrice += product.Price * product.Quantity;
                }
                checkoutData.TotalPrice = totalPrice;

               

                await _checkoutDataCollection.InsertOneAsync(checkoutData);

                return Ok(checkoutData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }





        [HttpGet("totalOrders")]
        public async Task<IActionResult> TotalOrders()
        {
            try
            {
                var checkouts = await _checkoutDataCollection.Find(_ => true).ToListAsync();

                var totalOrders = checkouts.Count;

                return Ok(totalOrders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

    }
}

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

                // Check if the user is authenticated
                if (!User.Identity.IsAuthenticated)
                {
                    return BadRequest("User is not authenticated. Unable to process the checkout.");
                }

                string userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

                // Set the user's email in the checkout data
                checkoutData.Email = userEmail;

               

                await _checkoutDataCollection.InsertOneAsync(checkoutData);

                // Create an anonymous object for the response
                var response = new
                {
                    email = checkoutData.Email,
                    id = checkoutData.Id,
                    totalPrice = checkoutData.TotalPrice,
                    products = checkoutData.Products,
                    address = checkoutData.Address,
                    country = checkoutData.Country
                };

                return Ok(response);
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

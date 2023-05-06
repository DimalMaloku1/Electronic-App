using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace backend.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly IMongoCollection<Cart> _carts;

        public CartController(IMongoClient client)
        {
            var database = client.GetDatabase("Lab2");
            _carts = database.GetCollection<Cart>("carts");
        }

        // Get cart items for authenticated user
        [HttpGet("items")]
        public async Task<ActionResult<Cart>> GetCartItems()
        {
            var authHeader = Request.Headers["Authorization"].FirstOrDefault();
            if (authHeader == null || !authHeader.StartsWith("Bearer "))
            {
                return Unauthorized("Invalid authorization header");
            }

            var token = authHeader.Substring("Bearer ".Length).Trim();
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(token);
            var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == "unique_name")?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User Id not found");
            }

            var cart = await _carts.Find(c => c.UserId == userId).FirstOrDefaultAsync();

            if (cart == null)
            {
                return Ok(new CartItem[0]);
            }

            return Ok(cart.Items);
            
        }

        // Add item to cart for authenticated user
        [HttpPost("items")]
        public async Task<IActionResult> AddItemToCart([FromBody] CartItem cartItem)
        {
            var authHeader = Request.Headers["Authorization"].FirstOrDefault();
            if (authHeader == null || !authHeader.StartsWith("Bearer "))
            {
                return Unauthorized("Invalid authorization header");
            }

            var token = authHeader.Substring("Bearer ".Length).Trim();
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(token);
            var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == "unique_name")?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User Id not found");
            }

            var cart = await _carts.Find(c => c.UserId == userId).FirstOrDefaultAsync();
            if (cart == null)
            {
                cart = new Cart { UserId = userId };
                cart.Items = new List<CartItem>(); // create the Items list
                cart.Items.Add(cartItem); // add the item to the list
                var total = 0.0;
                foreach (var item in cart.Items)
                {
                    total += item.Price;
                }
                cart.Total = total;
                await _carts.InsertOneAsync(cart); // await this line
            }
            else
            {
                var existingItem = cart.Items.FirstOrDefault(i => i.ProductId == cartItem.ProductId);
                if (existingItem != null)
                {
                    existingItem.Quantity += cartItem.Quantity;
                    
                    var total = 0.0;
                    foreach (var item in cart.Items)
                    {
                        total += item.Price;
                    }
                    cart.Total = total;
                }
                else
                {
                    var total = 0.0;
                    foreach (var item in cart.Items)
                    {
                        total += item.Price;
                    }
                    cart.Total = total;
                    cart.Items.Add(cartItem);

                }

                await _carts.ReplaceOneAsync(c => c.Id == cart.Id, cart);
            }

            // calculate the total of all items in the cart
            

            return Ok("Item added to cart successfully!");
        }



        // Update cart for authenticated user
        [HttpPut("items")]
        public async Task<IActionResult> UpdateCart([FromBody] Cart updatedCart)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == "unique_name")?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User Id not found");
            }

            var cart = await _carts.Find(c => c.UserId == userId).FirstOrDefaultAsync();
            if (cart == null)
            {
                return NotFound("Cart not found");
            }

            cart.Items = updatedCart.Items;
            await _carts.ReplaceOneAsync(c => c.Id == cart.Id, cart);

            return Ok(cart);
        }


        // Delete item from cart for authenticated user
        [HttpDelete("items/{productId}")]
        public async Task<IActionResult> DeleteItemFromCart(string productId)
        {
            var authHeader = Request.Headers["Authorization"].FirstOrDefault();
            if (authHeader == null || !authHeader.StartsWith("Bearer "))
            {
                return Unauthorized("Invalid authorization header");
            }

            var token = authHeader.Substring("Bearer ".Length).Trim();
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(token);
            var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == "unique_name")?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User Id not found");
            }

            var cart = await _carts.Find(c => c.UserId == userId).FirstOrDefaultAsync();
            if (cart == null)
            {
                return NotFound("Cart not found");
            }

            var itemToRemove = cart.Items.FirstOrDefault(i => i.ProductId == productId);
            if (itemToRemove == null)
            {
                return NotFound("Item not found in cart");
            }

            if (itemToRemove.Quantity > 1)
            {
                itemToRemove.Quantity--;
                await _carts.ReplaceOneAsync(c => c.UserId == userId, cart);
                return Ok("Item quantity reduced by 1");
            }
            else
            {
                cart.Items.Remove(itemToRemove);
                await _carts.ReplaceOneAsync(c => c.UserId == userId, cart);
                return Ok("Item deleted from cart successfully!");
            }
        }
    }
}

using ElectroShop.Data;
using ElectroShop.Data.Services;
using ElectroShop.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ElectroShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsService _service;


        public ProductsController(IProductsService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var data = await _service.GetAllAsync();
            return Ok(data);

        }
        [HttpGet("{id}")]

        public async Task<IActionResult> Product(int id)
        {
            var productDetails = await _service.GetByIdAsync(id);
            if (productDetails == null) return BadRequest("Empty");
            return Ok(productDetails);
        }


        [HttpPost]

        public async Task<ActionResult<Product>> Post([Bind("Name,Description,Price,PictureUrl,Type,Brand")] Product product)
        {
            if (!ModelState.IsValid)
            {
                return NotFound();
            }
            await _service.AddAsync(product);
            return Ok();
        }
    }
    }
    





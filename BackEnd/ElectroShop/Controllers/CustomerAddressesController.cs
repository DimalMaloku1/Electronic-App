using AutoMapper;
using ElectroShop.Data;
using ElectroShop.DTO;
using ElectroShop.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ElectroShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerAddressesController : ControllerBase
    {
        private readonly MyWorldDbContext _myWorldDbContext;
        private readonly IMapper _mapper;

        public CustomerAddressesController(MyWorldDbContext myWorldDbContext, IMapper mapper)
        {
            _myWorldDbContext = myWorldDbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var addresses = await _myWorldDbContext.CustomerAddresses
                .Include(a => a.Customer)
                .Select(a => new
                {
                    a.Id,
                    a.City,
                    a.Country,
                    a.CustomerId,
                    Customer = new
                    {
                        a.Customer.FirstName,
                        a.Customer.LastName,
                        a.Customer.Phone
                    }
                })
                .ToListAsync();

            return Ok(addresses);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var address = await _myWorldDbContext.CustomerAddresses
                .Include(a => a.Customer)
                .Where(a => a.Id == id)
                .Select(a => new
                {
                    a.Id,
                    a.City,
                    a.Country,
                    a.CustomerId,
                    Customer = new
                    {
                        a.Customer.FirstName,
                        a.Customer.LastName,
                        a.Customer.Phone
                    }
                })
                .FirstOrDefaultAsync();

            if (address == null)
            {
                return NotFound();
            }

            return Ok(address);
        }


        [HttpPost]
        public async Task<IActionResult> Post(CustomerAddressesDto addressPayload)
        {
            var newAddress = _mapper.Map<CustomerAddresses>(addressPayload);
            _myWorldDbContext.CustomerAddresses.Add(newAddress);
            await _myWorldDbContext.SaveChangesAsync();
            return Created($"/{newAddress.Id}", newAddress);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, CustomerAddressesDto addressPayload)
        {
            if (id != addressPayload.Id)
            {
                return BadRequest();
            }

            var updateAddress = _mapper.Map<CustomerAddresses>(addressPayload);
            _myWorldDbContext.CustomerAddresses.Update(updateAddress);
            await _myWorldDbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var addressToDelete = await _myWorldDbContext.CustomerAddresses.FindAsync(id);
            if (addressToDelete == null)
            {
                return NotFound();
            }

            _myWorldDbContext.CustomerAddresses.Remove(addressToDelete);
            await _myWorldDbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}

using AutoMapper;
using ElectroShop.Data;
using ElectroShop.DTO;
using ElectroShop.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ElectroShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly MyWorldDbContext _myWorldDbContext;
        private readonly IMapper _mapper;
        public CustomerController(MyWorldDbContext myWorldDbContext, IMapper mapper)
        {
            _myWorldDbContext = myWorldDbContext;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var customers = await _myWorldDbContext.Customer
            .Include(_ => _.CustomerAddresses).ToListAsync();
            return Ok(customers);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var customerbyId = await _myWorldDbContext.Customer
            .Include(_ => _.CustomerAddresses).Where(_ => _.Id == id).FirstOrDefaultAsync();
            return Ok(customerbyId);
        }

        [HttpPost]
        public async Task<IActionResult> Post(CustomerDto customerPayload)
        {
            var newCustomer = _mapper.Map<Customer>(customerPayload);
            _myWorldDbContext.Customer.Add(newCustomer);
            await _myWorldDbContext.SaveChangesAsync();
            return Created($"/{newCustomer.Id}", newCustomer);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, CustomerDto customerPayload)
        {
            if (id != customerPayload.Id)
            {
                return BadRequest("ID mismatch between URL and payload.");
            }

            var existingCustomer = await _myWorldDbContext.Customer.FindAsync(id);

            if (existingCustomer == null)
            {
                return NotFound();
            }

            existingCustomer.FirstName = customerPayload.FirstName;
            existingCustomer.LastName = customerPayload.LastName;
            existingCustomer.Phone = customerPayload.Phone;

            try
            {
                _myWorldDbContext.Entry(existingCustomer).State = EntityState.Modified;
                await _myWorldDbContext.SaveChangesAsync();
                return Ok(existingCustomer);
            }
            catch (Exception)
            {
                // Handle exceptions (e.g., database update errors)
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update customer.");
            }
        }


        [Route("{id}")]
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var customerToDelete = await _myWorldDbContext.Customer
            .Include(_ => _.CustomerAddresses).Where(_ => _.Id == id).FirstOrDefaultAsync();
            if (customerToDelete == null)
            {
                return NotFound();
            }
            _myWorldDbContext.Customer.Remove(customerToDelete);
            await _myWorldDbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}
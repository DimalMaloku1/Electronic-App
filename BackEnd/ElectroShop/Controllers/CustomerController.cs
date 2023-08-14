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
        [HttpPut]
        public async Task<IActionResult> Put(CustomerDto customerPayload)
        {
            var updateCustomer = _mapper.Map<Customer>(customerPayload);
            _myWorldDbContext.Customer.Update(updateCustomer);
            await _myWorldDbContext.SaveChangesAsync();
            return Ok(updateCustomer);
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
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
    public class EmployeeDetailsController : ControllerBase
    {

        private readonly EmployeeDbContext _dbContext;
        private readonly IMapper _mapper;

        public EmployeeDetailsController(EmployeeDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDetailsDto>>> GetEmployeeDetails()
        {
            var employeeDetailsDto = await _dbContext.EmployeeDetails
                .Include(ed => ed.Employee) // Include the related Employee
                .ToListAsync();

            var employeeDetails = _mapper.Map<List<EmployeeDetails>>(employeeDetailsDto);
            return Ok(employeeDetails);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<EmployeeDetailsDto>>> GetEmployeeDetails(int id)
        {
            var employeeDetailsDto = await _dbContext.EmployeeDetails
                .Include(ed => ed.Employee) // Include the related Employee
                .FirstOrDefaultAsync(ed => ed.EmployeeDetailsID == id);

            if (employeeDetailsDto == null)
            {
                return NotFound();
            }

            var employeeDetails = _mapper.Map<EmployeeDetails>(employeeDetailsDto);
            return Ok(employeeDetails);
        }


        [HttpPost]
        public async Task<IActionResult> CreateEmployeeDetails(EmployeeDetailsDto employeeDetailsDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the specified EmployeeId exists
            var employee = await _dbContext.Employee.FirstOrDefaultAsync(e => e.EmployeeID == employeeDetailsDto.EmployeeID);
            if (employee == null)
            {
                return NotFound("Employee not found.");
            }

            // Create a new EmployeeDetails instance and map the data
            var employeeDetails = _mapper.Map<EmployeeDetails>(employeeDetailsDto);
            employeeDetails.Employee = employee;

            // Add and save the new EmployeeDetails
            _dbContext.EmployeeDetails.Add(employeeDetails);
            await _dbContext.SaveChangesAsync();

            // Return the created EmployeeDetails with the generated EmployeeDetailsID
            return CreatedAtAction(nameof(GetEmployeeDetails), new { id = employeeDetails.EmployeeDetailsID }, employeeDetails);
        }


        [HttpPut("{id}")]
        public IActionResult UpdateEmployeeDetails(int id, [FromBody] EmployeeDetailsDto updatedDetails)
        {
            // Find the existing employee details
            var existingDetails = _dbContext.EmployeeDetails.Find(id);

            if (existingDetails == null)
            {
                return NotFound();
            }

            // Only update Address and Phone
            existingDetails.Address = updatedDetails.Address;
            existingDetails.Phone = updatedDetails.Phone;

            // Save changes to the database
            _dbContext.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployeeDetails(int id)
        {
            var employeeDetails = await _dbContext.EmployeeDetails.FirstOrDefaultAsync(details => details.EmployeeDetailsID == id);

            if (employeeDetails == null)
            {
                return NotFound();
            }

            _dbContext.EmployeeDetails.Remove(employeeDetails);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

    }
}

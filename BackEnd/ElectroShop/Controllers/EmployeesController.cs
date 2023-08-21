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
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeDbContext _dbContext;
        private readonly IMapper _mapper;
        public EmployeesController(EmployeeDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllEmployeesAsync()
        {
            List<EmployeeDto> employeeDtos = await _dbContext.Employee
                .Include(e => e.EmployeeDetails)
                .Select(employee => new EmployeeDto
                {
                    EmployeeID = employee.EmployeeID,
                    FirstName = employee.FirstName,
                    LastName = employee.LastName,
                    EmployeeDetails = new EmployeeDetailsDto
                    {
                        Address = employee.EmployeeDetails.Address,
                        Phone = employee.EmployeeDetails.Phone
                    }
                })
                .ToListAsync();

            return Ok(employeeDtos);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            var employee = await _dbContext.Employee.Include(e => e.EmployeeDetails).FirstOrDefaultAsync(e => e.EmployeeID == id);
            if (employee == null)
            {
                return NotFound();
            }

            var employeeDto = _mapper.Map<Employee>(employee);
            return Ok(employeeDto);
        }
        [HttpPost]
        public async Task<IActionResult> CreateEmployee(EmployeeDto employeePayload)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var newEmployee = new Employee
                {
                    FirstName = employeePayload.FirstName,
                    LastName = employeePayload.LastName
                };

                _dbContext.Employee.Add(newEmployee);
                await _dbContext.SaveChangesAsync();

                return Created($"/{newEmployee.EmployeeID}", newEmployee);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, EmployeeDto employeeDto)
        {
            try
            {
                var employee = await _dbContext.Employee.FirstOrDefaultAsync(e => e.EmployeeID == id);
                if (employee == null)
                {
                    return NotFound();
                }

                // Update employee's main details
                employee.FirstName = employeeDto.FirstName;
                employee.LastName = employeeDto.LastName;
                await _dbContext.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            try
            {
                var employee = await _dbContext.Employee
                    .Include(e => e.EmployeeDetails)
                    .FirstOrDefaultAsync(e => e.EmployeeID == id);

                if (employee == null)
                {
                    return NotFound();
                }

                // If the employee has details, remove them first
                if (employee.EmployeeDetails != null)
                {
                    _dbContext.EmployeeDetails.Remove(employee.EmployeeDetails);
                }

                // Remove the employee
                _dbContext.Employee.Remove(employee);

                await _dbContext.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }


    }
}

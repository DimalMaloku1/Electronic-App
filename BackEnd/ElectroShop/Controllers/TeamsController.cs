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
    public class TeamsController : ControllerBase
    {
        private readonly MyWorldDbContext _myWorldDbContext;
        private readonly IMapper _mapper;

        public TeamsController(MyWorldDbContext myWorldDbContext, IMapper mapper)
        {
            _myWorldDbContext = myWorldDbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var teams = await _myWorldDbContext.Teams.ToListAsync();
            return Ok(teams);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var team = await _myWorldDbContext.Teams.FindAsync(id);
            if (team == null)
            {
                return NotFound();
            }
            return Ok(team);
        }

        [HttpPost]
        public async Task<IActionResult> Post(TeamDto teamDto)
        {
            var newTeam = _mapper.Map<Team>(teamDto);
            _myWorldDbContext.Teams.Add(newTeam);
            await _myWorldDbContext.SaveChangesAsync();
            return Created($"/api/Teams/{newTeam.TeamId}", newTeam);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, TeamDto teamDto)
        {
            if (id != teamDto.TeamId)
            {
                return BadRequest("ID mismatch between URL and payload.");
            }

            var existingTeam = await _myWorldDbContext.Teams.FindAsync(id);
            if (existingTeam == null)
            {
                return NotFound();
            }

            existingTeam.Name = teamDto.Name;

            try
            {
                _myWorldDbContext.Entry(existingTeam).State = EntityState.Modified;
                await _myWorldDbContext.SaveChangesAsync();
                return Ok(existingTeam);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update team.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var teamToDelete = await _myWorldDbContext.Teams.FindAsync(id);
            if (teamToDelete == null)
            {
                return NotFound();
            }
            _myWorldDbContext.Teams.Remove(teamToDelete);
            await _myWorldDbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}

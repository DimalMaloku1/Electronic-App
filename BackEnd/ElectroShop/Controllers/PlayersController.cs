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
    public class PlayersController : ControllerBase
    {
        private readonly MyWorldDbContext _myWorldDbContext;
        private readonly IMapper _mapper;

        public PlayersController(MyWorldDbContext myWorldDbContext, IMapper mapper)
        {
            _myWorldDbContext = myWorldDbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var players = await _myWorldDbContext.Players
                .Include(p => p.Team)
                .Select(p => new PlayerDto
                {
                    PlayerId = p.PlayerId,
                    Name = p.Name,
                    Number = p.Number,
                    TeamId = p.TeamId
                })
                .ToListAsync();

            return Ok(players);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var player = await _myWorldDbContext.Players
                .Include(p => p.Team)
                .Where(p => p.PlayerId == id)
                .Select(p => new PlayerDto
                {
                    PlayerId = p.PlayerId,
                    Name = p.Name,
                    Number = p.Number,
                    TeamId = p.TeamId
                })
                .FirstOrDefaultAsync();

            if (player == null)
            {
                return NotFound();
            }

            return Ok(player);
        }

        [HttpPost]
        public async Task<IActionResult> Post(PlayerDto playerDto)
        {
            var player = _mapper.Map<Player>(playerDto);
            _myWorldDbContext.Players.Add(player);
            await _myWorldDbContext.SaveChangesAsync();
            return Created($"/{player.PlayerId}", player);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, PlayerDto playerPayload)
        {
            if (id != playerPayload.PlayerId)
            {
                return BadRequest();
            }

            var updatePlayer = _mapper.Map<Player>(playerPayload);
            _myWorldDbContext.Players.Update(updatePlayer);
            await _myWorldDbContext.SaveChangesAsync();

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var playerToDelete = await _myWorldDbContext.Players.FindAsync(id);

            if (playerToDelete == null)
            {
                return NotFound();
            }

            _myWorldDbContext.Players.Remove(playerToDelete);
            await _myWorldDbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}

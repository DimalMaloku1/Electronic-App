using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ElectroShop.DTO;
using ElectroShop.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ElectroShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetTypesController : ControllerBase
    {
        private readonly AssetDbContext _context;

        public AssetTypesController(AssetDbContext context)
        {
            _context = context;
        }

        // GET: api/AssetTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AssetTypeDto>>> GetAssetTypes()
        {
            var assetTypes = await _context.AssetTypes
                .Select(at => new AssetTypeDto
                {
                    Id = at.Id,
                    Name = at.Name,
                    IsActive = at.IsActive
                })
                .ToListAsync();

            return assetTypes;
        }

        // GET: api/AssetTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AssetTypeDto>> GetAssetType(int id)
        {
            var assetType = await _context.AssetTypes.FindAsync(id);

            if (assetType == null)
            {
                return NotFound();
            }

            var assetTypeDto = new AssetTypeDto
            {
                Id = assetType.Id,
                Name = assetType.Name,
                IsActive = assetType.IsActive
            };

            return assetTypeDto;
        }

        // POST: api/AssetTypes
        [HttpPost]
        public async Task<IActionResult> PostAssetType(AssetTypeDto assetTypeDto)
        {
            var assetType = new AssetType
            {
                Name = assetTypeDto.Name,
                IsActive = assetTypeDto.IsActive
            };

            _context.AssetTypes.Add(assetType);
            await _context.SaveChangesAsync();

            return Created($"/api/AssetTypes/{assetType.Id}", assetTypeDto);
        }


        // PUT: api/AssetTypes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAssetType(int id, AssetTypeDto assetTypeDto)
        {
            try
            {
                var existingAssetType = await _context.AssetTypes.FirstOrDefaultAsync(a => a.Id == id);
                if (existingAssetType == null)
                {
                    return NotFound();
                }
                existingAssetType.Name = assetTypeDto.Name;
                existingAssetType.IsActive = assetTypeDto.IsActive;
                _context.Entry(existingAssetType).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        // DELETE: api/AssetTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAssetType(int id)
        {
            var assetType = await _context.AssetTypes.FindAsync(id);
            if (assetType == null)
            {
                return NotFound();
            }

            _context.AssetTypes.Remove(assetType);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

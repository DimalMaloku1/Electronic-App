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
    public class AssetsController : ControllerBase
    {
        private readonly AssetDbContext _context;

        public AssetsController(AssetDbContext context)
        {
            _context = context;
        }

        // GET: api/Assets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AssetDto>>> GetAssets()
        {
            var assets = await _context.Assets
                .Include(a => a.AssetType)
                .Select(a => new AssetDto
                {
                    Id = a.Id,
                    BrandName = a.BrandName,
                    ProductionDate = a.ProductionDate,
                    AssetTypeId = a.AssetTypeId,
                    AssetTypeName = a.AssetType.Name
                })
                .ToListAsync();

            return assets;
        }

        // GET: api/Assets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AssetDto>> GetAsset(int id)
        {
            var asset = await _context.Assets
                .Include(a => a.AssetType)
                .Select(a => new AssetDto
                {
                    Id = a.Id,
                    BrandName = a.BrandName,
                    ProductionDate = a.ProductionDate,
                    AssetTypeId = a.AssetTypeId,
                    AssetTypeName = a.AssetType.Name
                })
                .FirstOrDefaultAsync(a => a.Id == id);

            if (asset == null)
            {
                return NotFound();
            }

            return asset;
        }

        // GET: api/Assets/byProductionDate?date=2024-03-05
        [HttpGet("ProductionDate")]
        public async Task<ActionResult<IEnumerable<AssetDto>>> GetAssetsByProductionDate(DateTime date)
        {
            var assets = await _context.Assets
                .Where(a => a.ProductionDate.Date == date.Date)
                .Include(a => a.AssetType)
                .Select(a => new AssetDto
                {
                    Id = a.Id,
                    BrandName = a.BrandName,
                    ProductionDate = a.ProductionDate,
                    AssetTypeId = a.AssetTypeId,
                    AssetTypeName = a.AssetType.Name
                })
                .ToListAsync();

            return assets;
        }

        // POST: api/Assets
        [HttpPost]
        public async Task<IActionResult> PostAsset(AssetDto assetDto)
        {
            // Find the asset type by name
            var assetType = await _context.AssetTypes.FirstOrDefaultAsync(a => a.Name == assetDto.AssetTypeName);
            if (assetType == null)
            {
                return BadRequest("Invalid AssetType");
            }

            var asset = new Asset
            {
                BrandName = assetDto.BrandName,
                ProductionDate = assetDto.ProductionDate,
                AssetType = assetType
            };

            _context.Assets.Add(asset);
            await _context.SaveChangesAsync();

            return Created($"/api/Assets/{asset.Id}", assetDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsset(int id, AssetDto assetDto)
        {
            try
            {
                var asset = await _context.Assets.FirstOrDefaultAsync(a => a.Id == id);
                if (asset == null)
                {
                    return NotFound();
                }
                var assetType = await _context.AssetTypes.FirstOrDefaultAsync(a => a.Name == assetDto.AssetTypeName);
                if (assetType == null)
                {
                    return BadRequest("Invalid AssetType");
                }
                asset.BrandName = assetDto.BrandName;
                asset.ProductionDate = assetDto.ProductionDate;
                asset.AssetType = assetType; 
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }


        // DELETE: api/Assets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsset(int id)
        {
            var asset = await _context.Assets.FindAsync(id);
            if (asset == null)
            {
                return NotFound();
            }

            _context.Assets.Remove(asset);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Assets/AssetType/1
        [HttpGet("AssetType/{assetTypeId}")]
        public async Task<ActionResult<IEnumerable<AssetDto>>> GetAssetsByAssetType(int assetTypeId)
        {
            var assets = await _context.Assets
                .Where(a => a.AssetTypeId == assetTypeId)
                .Include(a => a.AssetType)
                .Select(a => new AssetDto
                {
                    Id = a.Id,
                    BrandName = a.BrandName,
                    ProductionDate = a.ProductionDate,
                    AssetTypeId = a.AssetTypeId,
                    AssetTypeName = a.AssetType.Name
                })
                .ToListAsync();

            return assets;
        }

     
    }
}

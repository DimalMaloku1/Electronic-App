using ElectroShop.Models;
using Microsoft.EntityFrameworkCore;

public class AssetDbContext : DbContext
{
    public DbSet<Asset> Assets { get; set; }
    public DbSet<AssetType> AssetTypes { get; set; }

    public AssetDbContext(DbContextOptions<AssetDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Asset>()
            .HasOne(a => a.AssetType)
            .WithMany(at => at.Assets)
            .HasForeignKey(a => a.AssetTypeId);
    }
}

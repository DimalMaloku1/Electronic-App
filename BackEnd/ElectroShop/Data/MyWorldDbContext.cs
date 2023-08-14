using ElectroShop.Models;
using Microsoft.EntityFrameworkCore;
namespace ElectroShop.Data;
public class MyWorldDbContext : DbContext
{
    public MyWorldDbContext(DbContextOptions<MyWorldDbContext> context) : base(context)
    {
    }
    public DbSet<Customer> Customer { get; set; }
    public DbSet<CustomerAddresses> CustomerAddresses { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CustomerAddresses>()
        .HasOne(_ => _.Customer)
        .WithMany(a => a.CustomerAddresses)
        .HasForeignKey(p => p.CustomerId);
    }
}
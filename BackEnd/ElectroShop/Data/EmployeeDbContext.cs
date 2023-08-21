using ElectroShop.Models;
using Microsoft.EntityFrameworkCore;

namespace ElectroShop.Data;

    public class EmployeeDbContext : DbContext
    {
        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> context) : base(context)
        {
        }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<EmployeeDetails> EmployeeDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.EmployeeDetails)
                .WithOne(ed => ed.Employee)
                .HasForeignKey<EmployeeDetails>(ed => ed.EmployeeID);
        }
    }


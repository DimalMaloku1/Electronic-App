using ElectronicShop.Data;
using ElectronicShop.Data.Enums;
using ElectronicShop.Models;
using Microsoft.AspNetCore.Identity;

namespace ElectronicShop.Data
{
    public class AppDbInitializer
    {
        public static void Seed(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<AppDbContext>();

                context.Database.EnsureCreated();

                //Products
                if (!context.Products.Any())
                {
                    context.Products.AddRange(new List<Product>()
                    {
                        new Product()
                        {
                            Name = "Test",
                            Description = "This is the description of the first cinema",
                            Price = 78.6,
                            PictureUrl = "Images",
                            Type = ProductCategory.Laptop,
                            Brand = ProductBrand.Dell
                        },
                    });
                    context.SaveChanges();
                }
            }
        }
    }
}

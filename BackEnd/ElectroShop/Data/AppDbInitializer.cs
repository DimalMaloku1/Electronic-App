using ElectroShop.Data;
using ElectroShop.Data.Enums;
using ElectroShop.Models;
using Microsoft.AspNetCore.Identity;

namespace ElectroShop.Data
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
                            Name = "Test Product",
                            Description = "This is the description of the first Product",
                            Price = 78.6,
                            PictureUrl = "https://m.media-amazon.com/images/I/71dYHi8v0KL.jpg",
                            Type = ProductCategory.Desktop,
                            Brand = ProductBrand.Dell
                        },
                    });
                    context.SaveChanges();
                }
            }
        }
    }
}

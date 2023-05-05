using ElectroShop.Models;
using Microsoft.EntityFrameworkCore;

namespace ElectroShop.Data.Services
{
    public class ProductService : IProductsService
    {
        private readonly AppDbContext _context;
        public ProductService(AppDbContext context)
        {
            _context = context; 
        }

        public async Task AddAsync(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            var result = await _context.Products.ToListAsync();
            return result;
        }

        public async Task<Product> GetByIdAsync(int id)
        {
            var result = await _context.Products.FirstOrDefaultAsync(n => n.Id == id);
            return result;
        }

        public Task GetProduct(int id)
        {
            throw new NotImplementedException();
        }

        public Product Update(int id, Product newProduct)
        {
            throw new NotImplementedException();
        }
    }
}

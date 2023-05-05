using ElectroShop.Models;
using System.Collections.Generic;

namespace ElectroShop.Data.Services
{
    public interface IProductsService
    {
        Task<IEnumerable<Product>> GetAllAsync();
        Task <Product> GetByIdAsync(int id);
        Task AddAsync(Product product);
        Product Update(int id, Product newProduct);
        void Delete(int id);
   
    }
}

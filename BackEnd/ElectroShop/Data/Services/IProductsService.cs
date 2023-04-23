using ElectroShop.Models;
using System.Collections.Generic;

namespace ElectroShop.Data.Services
{
    public interface IProductsService
    {
        IEnumerable<Product> GetAll();
        Product GetById(int id);
        void Add(Product product);
        Product Update(int id, Product newProduct);
        void Delete(int id);
    }
}

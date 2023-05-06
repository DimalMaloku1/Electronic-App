using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ElectroShop.Models
{
    public class Category
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }
        /*
        [BsonElement("products")]
        public List<Product> Products { get; set; }*/
    }
}
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Electroshop.Models
{
    public class AddressAndCountry
    {
        [BsonElement("address")]
        public string Address { get; set; }

        [BsonElement("country")]
        public string Country { get; set; }
    }


    public class CheckoutItem
    {
       
        [BsonElement("name")]
        public string Name { get; set; }
        [BsonElement("price")]
        public decimal Price { get; set; }
        [BsonElement("quantity")]
        public int Quantity { get; set; }

    }

    public class CheckoutData
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("products")]
        public List<CheckoutItem> Products { get; set; }

        [BsonElement("totalPrice")]
        public decimal TotalPrice { get; set; }

    }
}

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using NSwag.Annotations;
using System.Text.Json.Serialization;

namespace ElectroShop.Models
{
    public class Review
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("productId")]
        public string ProductId { get; set; }

        [BsonElement("reviewText")]
        public string ReviewText { get; set; }

        [BsonElement("rating")]
        public int Rating { get; set; }

        [JsonIgnore]
        [BsonIgnore]
        public Product Product { get; set; }

    }
}

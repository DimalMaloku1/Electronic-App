﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Serializers;

    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }

        [BsonElement("price")]
        [BsonRepresentation(BsonType.Decimal128)]
        public decimal Price { get; set; }

        [BsonElement("stock")]
        [BsonSerializer(typeof(Int32Serializer))]
        public int Stock { get; set; }

        [BsonElement("imageURL")]
        public string ImageURL { get; set; }

        [BsonElement("categoryName")]
        public string[] CategoryName { get; set; }
    
}

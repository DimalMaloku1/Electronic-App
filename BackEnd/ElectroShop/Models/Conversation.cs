using System;
using System.Collections.Generic;

namespace ElectroShop.Models
{
    public class Conversation
    {
        public int Id { get; set; }
        public DateTime Timestamp { get; set; }
        public string UserId { get; set; }
        public List<Message> Messages { get; set; }
    }
}

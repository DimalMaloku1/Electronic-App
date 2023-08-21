using System;

namespace ElectroShop.Models
{
    public class Message
    {
        public int Id { get; set; }
        public DateTime Timestamp { get; set; }
        public int ConversationId { get; set; }
        public string UserId { get; set; }
        public string UserMessage { get; set; }
        public string BotReply { get; set; }
        public Conversation Conversation { get; set; }
    }
}

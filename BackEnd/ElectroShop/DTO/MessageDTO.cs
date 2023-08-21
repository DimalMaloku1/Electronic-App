namespace ElectroShop.DTO
{
    public class MessageDTO
    {
        public int Id { get; set; }
        public DateTime Timestamp { get; set; }
        public int ConversationId { get; set; }
        public string UserId { get; set; }
        public string UserMessage { get; set; }
        public string BotReply { get; set; }
    }
}

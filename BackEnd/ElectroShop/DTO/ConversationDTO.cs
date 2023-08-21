namespace ElectroShop.DTO
{
    public class ConversationDTO
    {
        public int Id { get; set; }
        public DateTime Timestamp { get; set; }
        public string UserId { get; set; }
        public List<MessageDTO> Messages { get; set; }
    }
}

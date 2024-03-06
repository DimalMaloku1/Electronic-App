namespace ElectroShop.Models
{
    public class Player
    {
        public int PlayerId { get; set; } // Primary Key
        public string Name { get; set; }
        public int Number { get; set; }
        public int TeamId { get; set; } // Foreign Key
        public Team Team { get; set; } // Navigation property
    }
}

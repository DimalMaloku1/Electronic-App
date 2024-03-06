using System.Numerics;

namespace ElectroShop.Models
{
    public class Team
    {
        public int TeamId { get; set; } // Primary Key
        public string Name { get; set; }
        public ICollection<Player> Players { get; set; } // Navigation property
    }
}

namespace ElectroShop.Models
{
    public class Author
    {
        public int AuthorId { get; set; } // Primary Key
        public string Name { get; set; }
        public int BirthYear { get; set; }
        public ICollection<Book> Books { get; set; } // Navigation property
    }
}

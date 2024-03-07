namespace ElectroShop.Models
{
    public class Book
    {
        public int BookId { get; set; } // Primary Key
        public string Title { get; set; }
        public int PublicationYear { get; set; }
        public int AuthorId { get; set; } // Foreign Key
        public Author Author { get; set; } // Navigation property
    }
}

namespace ElectroShop.Models
{
    public class CustomerAddresses
    {
        public int Id { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
    }
}

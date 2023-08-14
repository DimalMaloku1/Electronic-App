namespace ElectroShop.DTO;
public class CustomerDto
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Phone { get; set; }
    public List<CustomerAddressesDto> CustomerAddresses { get; set; }
}
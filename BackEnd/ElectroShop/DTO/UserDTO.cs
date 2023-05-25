namespace ElectroShop.DTO
{
    public class UserDTO
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public List<string> Roles { get; internal set; }
    }
}

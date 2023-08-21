namespace ElectroShop.Models
{
    public class Employee
    {
        public int EmployeeID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public EmployeeDetails EmployeeDetails { get; set; }
    }
}

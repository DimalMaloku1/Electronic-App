using System.ComponentModel.DataAnnotations;

namespace ElectroShop.Models
{
    public class EmployeeDetails
    {
        [Key]
        public int EmployeeDetailsID { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        // Foreign key property
        public int EmployeeID { get; set; }
        // Navigation property for Employee
        public Employee Employee { get; set; }
    }
}

using eTickets.Data.Base;
using eTickets.Data.Enmus;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eTickets.Models
{
    public class NewMovieVM
    {
        [Key]
        public int Id { get; set; }
        [Display(Description = "Movie Name")]
        [Required(ErrorMessage ="Name is required")]

        public string Name { get; set; }

        [Display(Description = "Movie Description")]
        [Required(ErrorMessage = "Description is required")]

        public string Description { get; set; }

        [Display(Description = "Movie Price in $")]
        [Required(ErrorMessage = "Movie Price is required")]

        public double Price { get; set; }

        [Display(Description = "Movie poster URL")]
        [Required(ErrorMessage = "Movie Poster is required")]

        public string ImageURL { get; set; }

        [Display(Description = "Movie Start Date")]
        [Required(ErrorMessage = "Movie Start Date is required")]

        public DateTime StartDate { get; set; }

        [Display(Description = "Movie End Date")]
        [Required(ErrorMessage = "Movie End Date is required")]

        public DateTime EndDate { get; set; }

        [Display(Description = "Select a Category")]
        [Required(ErrorMessage = "Movie Category is required")]

        public MovieCategory MovieCategory { get; set; }

        //Relationships

        [Display(Description = "Select actor(s)")]
        [Required(ErrorMessage = "Movie actor(s) is required")]

        public List<int> ActorIds { get; set; }

        [Display(Description = "Select a Cinema")]
        [Required(ErrorMessage = "Movie Cinema is required")]

        public int CinemaId { get; set; }

        [Display(Description = "Select a Producer")]
        [Required(ErrorMessage = "Movie Producer is required")]

        public int ProducerId { get; set; }
   
    }
}

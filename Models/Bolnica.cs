using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
namespace Models
{
    [Table("Bolnica")]
    public class Bolnica
    {
        [Key]
        [Range(1000,9999)]
        public int ID {get; set;}

        [Required]
        [MaxLength(100)]
        public string Naziv {get; set;}

        [Required]
        [MaxLength(50)]
        public string Adresa {get; set;}


        [Required]
        [MaxLength(50)]
        public string Grad {get; set;}

        public virtual List<Odeljenje> Odeljenja {get; set;}
    }
}
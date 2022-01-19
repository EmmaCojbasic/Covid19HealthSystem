using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Pacijent")]
    public class Pacijent
    {
        [Key]
        [Range(10000,99999)]
        public int MaticniBroj {get; set;}

        [Required]
        [MaxLength(20)]
        public string Ime {get; set;}

        [Required]
        [MaxLength(20)]
        public string Prezime {get; set;}

        [Required]
        [Range(18,100)]
        public int Starost {get; set;}

        //[ForeignKey("OdeljenjeFK")]
        //public int IDOdeljenja {get; set;}

        [Required]
        [Range(50,100)]
        public int Saturacija {get; set;}

        [Required]
        [MaxLength(20)]
        public string TipTesta{get; set;}

        [Required]
        [MaxLength(20)]
        public string RezultatTesta{get; set;}
        
        [JsonIgnore]
        public virtual Odeljenje Odeljenje {get; set;}

        //public Oprema Oprema {get; set;}
    }
}
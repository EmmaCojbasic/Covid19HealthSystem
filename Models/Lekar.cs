using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Lekar")]
    public class Lekar
    {
        [Key]
        public int BrojLicence {get; set;}

        [Required]
        [MaxLength(20)]
        public string Ime {get; set;}

        [Required]
        [MaxLength(20)]
        public string Prezime {get; set;}

        [Required]
        [Range(1,40)]
        public int Staz {get; set;}

        //[ForeignKey("OdeljenjeFK")]
        //public int IDOdeljenja {get; set;}
        [Required]
        [MaxLength(20)]
        public string Specijalnost {get; set;}

        [JsonIgnore]
        public virtual Odeljenje Odeljenje {get; set;}
    }
}
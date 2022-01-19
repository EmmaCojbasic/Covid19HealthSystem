using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Odeljenje")]
    public class Odeljenje
    {
        [Key]
        //[Range(1000,9999)]
        public int ID {get; set;}

        [Required]
        [MaxLength(20)]
        public string Tip {get; set;}

        [Required]
        [Range(1,6)]
        public int Sprat {get; set;}

        [Required]
        [Range(1,50)]
        public int Kapacitet {get; set;}

        //[ForeignKey("BolnicaFK")]
        //public int IDBolnice {get; set;}

        [JsonIgnore]
        public virtual Bolnica Bolnica {get; set;}

        public virtual List<Lekar> Lekari {get; set;}
        public virtual List<Pacijent> Pacijenti {get;set;}

    }
}
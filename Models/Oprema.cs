using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Medicinska Oprema")]
    public class Oprema
    {
        [Key]
        //[Range(100,200)]
        public int SerijskiBroj {get; set;}

        [Required]
        [MaxLength(20)]
        public string Tip {get; set;}

        [JsonIgnore]
        public virtual Pacijent Pacijent {get; set;}
    }
}
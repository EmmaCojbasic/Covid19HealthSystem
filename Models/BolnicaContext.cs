using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class BolnicaContext: DbContext
    {
        public DbSet<Pacijent> Pacijenti {get; set;}
        public DbSet<Lekar> Lekari {get; set;}
        public DbSet<Odeljenje> Odeljenja {get; set;}

        public DbSet<Bolnica> Bolnice {get; set;}

        public DbSet<Oprema> Oprema {get; set;}

        public BolnicaContext(DbContextOptions options):base(options)
        {

        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace web_projekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PacijentController : ControllerBase
    {
        public BolnicaContext Context {get; set;}
        public PacijentController(BolnicaContext context) => Context = context;

        [Route("DodatiPacijenta")]
        [HttpPost]

        public async Task<ActionResult> DodatiPacijenta([FromBody] Pacijent pacijent)
        {
            // if(pacijent.MaticniBroj < 10000 || pacijent.MaticniBroj>99999)
            // {
            //     return BadRequest("Los maticni broj!");
            // }
            if(pacijent.Starost>100 || pacijent.Starost<18)
            {
                return BadRequest("Lose uneta starost pacijenta!");
            }
            if(pacijent.Saturacija>100 || pacijent.Saturacija<50)
            {
                return BadRequest("Lose uneta saturacija pacijenta!");
            }
            if(string.IsNullOrWhiteSpace(pacijent.Ime) || pacijent.Ime.Length>20)
            {
                return BadRequest("Lose uneto ime pacijenta!");
            }
            if(string.IsNullOrWhiteSpace(pacijent.Prezime) || pacijent.Prezime.Length>20)
            {
                return BadRequest("Lose uneto prezime pacijenta!");
            }
            if(string.IsNullOrWhiteSpace(pacijent.RezultatTesta) || pacijent.RezultatTesta.Length>20)
            {
                return BadRequest("Lose unet rezultat testa na Covid!");
            }
            if(string.IsNullOrWhiteSpace(pacijent.TipTesta) || pacijent.TipTesta.Length>20)
            {
                return BadRequest("Lose unet tip testa na Covid!");
            }
            try{
                Context.Pacijenti.Add(pacijent);
                await Context.SaveChangesAsync();
                return Ok($"Ispravno unet pacijent! ID je: {pacijent.MaticniBroj}");
            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }
            
        }

        [Route("PromeniPacijenta/{bolnica}/{ime}/{prezime}/{rezultat}/{tiptesta}")]
        [HttpPut]
        public async Task<ActionResult> PromeniPacijenta(string bolnica,string ime, string prezime, string rezultat, string tiptesta)
        {
            if(string.IsNullOrWhiteSpace(bolnica) || ime.Length>20)
            {
                return BadRequest("Lose prosledjeno ime bolnice!");
            }
            if(string.IsNullOrWhiteSpace(ime) || ime.Length>20)
            {
                return BadRequest("Lose prosledjeno ime pacijenta!");
            }
            if(string.IsNullOrWhiteSpace(prezime) || prezime.Length>20)
            {
                return BadRequest("Lose prosledjeno prezime pacijenta!");
            }
            if(string.IsNullOrWhiteSpace(rezultat) || rezultat.Length>20)
            {
                return BadRequest("Lose unet rezultat testa na Covid!");
            }
            if(string.IsNullOrWhiteSpace(tiptesta) || tiptesta.Length>20)
            {
                return BadRequest("Lose unet tip testa na Covid!");
            }
            try
            {
                var pacijent = Context.Pacijenti.Where(p=> p.Ime==ime && p.Prezime==prezime && p.Odeljenje.Bolnica.Naziv==bolnica).FirstOrDefault();
                
                if(pacijent!=null) //nasao trazenog pacijenta u bazi, postoji
                {
                    pacijent.RezultatTesta=rezultat;
                    pacijent.TipTesta=tiptesta;

                    await Context.SaveChangesAsync();
                    return Ok(await Context.Pacijenti.Where(p=>p.Ime==ime && p.Prezime==prezime).Select(p=> 
                new {
                    Tip=p.TipTesta,
                    Rezultat=p.RezultatTesta
                }).ToListAsync());
                }
                else{
                    return BadRequest("Nije pronadjen pacijent u bazi!");
                }
                
                
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [Route("PromeniPacijentaBody")]
        [HttpPut]
        public async Task<ActionResult> PromeniPacijentaBody([FromBody] Pacijent pacijent)
        {
            //dodatno...
            if(pacijent.MaticniBroj<10000 || pacijent.MaticniBroj>99999)
            {
                return BadRequest("Pogresan maticni broj pacijenta!");
            }
            //klasika...
            if(pacijent.Starost>100 || pacijent.Starost<18)
            {
                return BadRequest("Lose uneta starost pacijenta!");
            }
            if(pacijent.Saturacija>100 || pacijent.Saturacija<50)
            {
                return BadRequest("Lose uneta saturacija pacijenta!");
            }
            if(string.IsNullOrWhiteSpace(pacijent.Ime) || pacijent.Ime.Length>20)
            {
                return BadRequest("Lose uneto ime pacijenta!");
            }
            if(string.IsNullOrWhiteSpace(pacijent.Prezime) || pacijent.Prezime.Length>20)
            {
                return BadRequest("Lose uneto prezime pacijenta!");
            }
            if(string.IsNullOrWhiteSpace(pacijent.RezultatTesta) || pacijent.RezultatTesta.Length>20)
            {
                return BadRequest("Lose unet rezultat testa na Covid!");
            }
            if(string.IsNullOrWhiteSpace(pacijent.TipTesta) || pacijent.TipTesta.Length>20)
            {
                return BadRequest("Lose unet tip testa na Covid!");
            }
            try{
                /*var pacijentZaPromenu=await Context.Pacijenti.FindAsync(pacijent.MaticniBroj);
                pacijentZaPromenu.Ime=pacijent.Ime;
                pacijentZaPromenu.Prezime=pacijent.Prezime;
                pacijentZaPromenu.RezultatTesta=pacijent.RezultatTesta;
                pacijentZaPromenu.TipTesta=pacijent.TipTesta;
                pacijentZaPromenu.Saturacija=pacijent.Saturacija;
                pacijentZaPromenu.Starost=pacijent.Starost;*/
                Context.Pacijenti.Update(pacijent);

                await Context.SaveChangesAsync();
                return Ok($"Pacijent sa Maticnim Brojem: {pacijent.MaticniBroj} izmenjen");

            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("IzbrisiPacijenta/{matbr}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiPacijenta(int matbr)
        {
            if(matbr<10000 || matbr>99999)
            {
                return BadRequest("Los maticni broj");
            }
            try{
                var pacijent=await Context.Pacijenti.FindAsync(matbr);
                int mbr=pacijent.MaticniBroj;
                Context.Pacijenti.Remove(pacijent);
                await Context.SaveChangesAsync();
                return Ok($"Uspesno izbrisan pacijent sa maticnim brojem {mbr}");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("PreuzmiPacijenta/{id}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiPacijenta(int id)
        {
            //koji lekari sve lece tog pacijenta
            var pacijenti = Context.Pacijenti
            .Include(p=>p.Odeljenje)
            .ThenInclude(p=>p.Lekari);
            //return StatusCode(404,"Patient not found");
            var pacijent=await pacijenti.Where(p=>p.MaticniBroj==id).ToListAsync();

            return Ok(pacijenti);
        }

        [Route("PreuzmiPacijente")]
        [HttpGet]

        public async Task<ActionResult> Preuzmi()
        {
            return Ok(await Context.Pacijenti.Select(p=> 
            new {
                p.MaticniBroj, 
                p.Ime,
                p.Prezime
            }).ToListAsync());
        }

        [Route("DodajPacijenta/{ime}/{prezime}/{starost}/{saturacija}/{rezultatTesta}/{tipTesta}/{sprat}/{tipodlj}/{nazivb}")]
        [HttpPost]

        public async Task<ActionResult> DodajPacijenta(string ime, string prezime, int starost, int saturacija, string rezultatTesta, string tipTesta, int sprat, string tipodlj,string nazivb)
        {
            // if(pacijent.MaticniBroj < 10000 || pacijent.MaticniBroj>99999)
            // {
            //     return BadRequest("Los maticni broj!");
            // }
            if(starost>100 || starost<18)
            {
                return BadRequest("Lose uneta starost pacijenta!");
            }
            if(saturacija>100 || saturacija<50)
            {
                return BadRequest("Lose uneta saturacija pacijenta!");
            }
            if(string.IsNullOrWhiteSpace(ime) || ime.Length>20)
            {
                return BadRequest("Lose uneto ime pacijenta!");
            }
            if(string.IsNullOrWhiteSpace(prezime) || prezime.Length>20)
            {
                return BadRequest("Lose uneto prezime pacijenta!");
            }
            if(string.IsNullOrWhiteSpace(rezultatTesta) || rezultatTesta.Length>20)
            {
                return BadRequest("Lose unet rezultat testa na Covid!");
            }
            if(string.IsNullOrWhiteSpace(tipTesta) || tipTesta.Length>20)
            {
                return BadRequest("Lose unet tip testa na Covid!");
            }
            if(string.IsNullOrWhiteSpace(tipTesta) || tipTesta.Length>20)
            {
                return BadRequest("Lose prosledjen tip bolnice!");
            }
            try{
                var pacijent=new Pacijent();
                pacijent.Ime=ime;
                pacijent.Prezime=prezime;
                pacijent.Starost=starost;
                pacijent.Saturacija=saturacija;
                pacijent.TipTesta=tipTesta;
                pacijent.RezultatTesta=rezultatTesta;
                var odelj=(Odeljenje)Context.Odeljenja.Where(p=>p.Tip==tipodlj && p.Sprat==sprat && p.Bolnica.Naziv==nazivb && p.Kapacitet>p.Pacijenti.Count).FirstOrDefault();
                if(odelj==null)
                     return BadRequest("Puno");
                pacijent.Odeljenje=odelj;
                Context.Pacijenti.Add(pacijent);
                await Context.SaveChangesAsync();
                return Ok(await Context.Pacijenti.Where(p=>p.Ime==ime && p.Prezime==prezime).Select(p=> 
                new {
                    p.MaticniBroj, 
                    p.Ime,
                    p.Prezime,
                    p.Odeljenje.ID,
                    p.RezultatTesta
                }).ToListAsync());
            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }
            
        }
        [Route("ObrisiPacijenta/{ime}/{prezime}/{imelek}/{prezimelek}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiPacijenta(string ime, string prezime, string imelek, string prezimelek)
        {
            if(string.IsNullOrWhiteSpace(ime) || ime.Length>20)
            {
                return BadRequest("Lose uneto ime pacijenta!");
            }
            if(string.IsNullOrWhiteSpace(prezime) || prezime.Length>20)
            {
                return BadRequest("Lose uneto prezime pacijenta!");
            }
            if(string.IsNullOrWhiteSpace(imelek) || imelek.Length>20)
            {
                return BadRequest("Lose uneto ime lekara!");
            }
            if(string.IsNullOrWhiteSpace(prezimelek) || prezimelek.Length>20)
            {
                return BadRequest("Lose uneto prezime lekara!");
            }
            try{
                var odeljenje=await Context.Odeljenja.Where(p=>p.Lekari.FirstOrDefault().Ime==imelek && p.Lekari.FirstOrDefault().Prezime==prezimelek).FirstOrDefaultAsync();
                var pacijent=await Context.Pacijenti.Where(p=>p.Ime==ime && p.Prezime==prezime && p.Odeljenje==odeljenje).FirstOrDefaultAsync();
                int mbr=pacijent.MaticniBroj;
                Context.Pacijenti.Remove(pacijent);
                await Context.SaveChangesAsync();
                return Ok(await Context.Odeljenja.Select(p=> 
                new {
                Sprat=odeljenje.Sprat,
                Tip=odeljenje.Tip
                }).ToListAsync());
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("PreuzmiPacijenteBolnice/{nazivb}")]
        [HttpGet]

        public async Task<ActionResult> PreuzmiPacijenteBolnice(string nazivb)
        {
            if(string.IsNullOrWhiteSpace(nazivb) || nazivb.Length>20)
            {
                return BadRequest("Lose uneto ime pacijenta!");
            }
            
            return Ok(await Context.Pacijenti.Where(p=>p.Odeljenje.Bolnica.Naziv==nazivb).Select(p=> 
            new {
                p.MaticniBroj, 
                p.Ime,
                p.Prezime,
                p.Odeljenje.ID,
                p.RezultatTesta
            }).ToListAsync());
        }

        [Route("SveOPacijentu/{nazivb}/{ime}/{prezime}")]
        [HttpGet]

        public async Task<ActionResult> SveOPacijentu(string nazivb, string ime, string prezime)
        {
            if(string.IsNullOrWhiteSpace(ime) || ime.Length>20)
            {
                return BadRequest("Lose uneto ime pacijenta!");
            }
            if(string.IsNullOrWhiteSpace(prezime) || prezime.Length>20)
            {
                return BadRequest("Lose uneto prezime pacijenta!");
            }
            if(string.IsNullOrWhiteSpace(nazivb) || nazivb.Length>20)
            {
                return BadRequest("Lose uneto ime lekara!");
            }

            return Ok(await Context.Pacijenti.Where(p=>p.Odeljenje.Bolnica.Naziv==nazivb && p.Ime==ime && p.Prezime==prezime)
            .Include(p=>p.Odeljenje)
            .ThenInclude(p=>p.Bolnica)
            .Include(p=>p.Odeljenje)
            .ThenInclude(p=>p.Lekari)
            .Select(p=> 
            new {
                Bolnica=p.Odeljenje.Bolnica.Naziv,
                Lokacija=p.Odeljenje.Bolnica.Adresa+", "+p.Odeljenje.Bolnica.Grad,
                Sprat=p.Odeljenje.Sprat,
                Tip=p.Odeljenje.Tip, 
                Ime=p.Ime,
                Prezime=p.Prezime,
                Test=p.TipTesta,
                Rezultat=p.RezultatTesta,
                Lekari=p.Odeljenje.Lekari.FirstOrDefault().Ime,
                Lekarp=p.Odeljenje.Lekari.FirstOrDefault().Prezime,
                Oprema=Context.Oprema.Where(p=>p.Pacijent.Ime==ime && p.Pacijent.Prezime==prezime).FirstOrDefault().Tip
                
            }).ToListAsync());
        }
    }
}

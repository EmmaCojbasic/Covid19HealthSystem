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
    public class LekarController : ControllerBase
    {
        public BolnicaContext Context {get; set;}
        public LekarController(BolnicaContext context) => Context = context;
    

    [Route("DodajLekara/{ime}/{prezime}/{staz}/{specijalnost}/{odeljenje}")]
    [HttpPost]
        public async Task<ActionResult> DodajLekara(string ime, string prezime, int staz, string specijalnost, int odeljenje)
        {
            // if(id < 1000 || id>9999)
            // {
            //     return BadRequest("Los ID bolnice!");
            // }
            if(string.IsNullOrWhiteSpace(ime) || ime.Length>20)
            {
                return BadRequest("Lose uneto ime lekara!");
            }
            if(string.IsNullOrWhiteSpace(prezime) || prezime.Length>20)
            {
                return BadRequest("Lose uneto prezime lekara!");
            }
            if(staz<1 || staz>40)
            {
                return BadRequest("Lose unet staz lekara!");
            }
            if(string.IsNullOrWhiteSpace(specijalnost) || specijalnost.Length>20)
            {
                return BadRequest("Lose uneta specijalnost lekara!");
            }
            
            try{
                var lekar=new Lekar();
                //bolnica.ID=id;
                lekar.Ime=ime;
                lekar.Prezime=prezime;
                lekar.Specijalnost=specijalnost;
                lekar.Staz=staz;
                lekar.Odeljenje= Context.Odeljenja.Where(p=>p.ID==odeljenje).FirstOrDefault(); 
                Context.Lekari.Add(lekar);
                await Context.SaveChangesAsync();
                return Ok($"Ispravno unet lekar! Broj licence je: {lekar.BrojLicence}");
            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }
            
        }

        [Route("PromeniLekara/{ime}/{prezime}/{staz}/{specijalnost}")]
        [HttpPut]
        public async Task<ActionResult> PromeniLekara(string ime, string prezime, int staz, string specijalnost)
        {
            
            // if(id < 1000 || id>9999)
            // {
            //     return BadRequest("Los ID bolnice!");
            // }
            if(string.IsNullOrWhiteSpace(ime) || ime.Length>20)
            {
                return BadRequest("Lose uneto ime lekara!");
            }
            if(string.IsNullOrWhiteSpace(prezime) || prezime.Length>20)
            {
                return BadRequest("Lose uneto prezime lekara!");
            }
            if(staz<1 || staz>40)
            {
                return BadRequest("Lose unet staz lekara!");
            }
            if(string.IsNullOrWhiteSpace(specijalnost) || specijalnost.Length>20)
            {
                return BadRequest("Lose uneta specijalnost lekara!");
            }
            try
             {
                 var lekar = Context.Lekari.Where(p=> p.Ime==ime && p.Prezime==prezime).FirstOrDefault();
                
                 if(lekar!=null) //nasao trazenu bolnicu u bazi, postoji
                 {
                     lekar.Specijalnost=specijalnost;
                     lekar.Staz=staz;

                     await Context.SaveChangesAsync();
                     return Ok("Nadjen i izmenjen odgovarajuci lekar!");
                 }
                else{
                    return BadRequest("Nije pronadjen lekar u bazi!");
                 }
                
                
             }
             catch(Exception ex)
             {
                 return BadRequest(ex.Message);
             }
            
         }
        [Route("IzbrisiLekara/{id}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiLekara(int id)
        {
            if(id < 0)
            {
                return BadRequest("Los Broj licence lekara!");
            }
            try{
                var lekar=await Context.Lekari.FindAsync(id);
                int brlic=lekar.BrojLicence;
                Context.Lekari.Remove(lekar);
                await Context.SaveChangesAsync();
                return Ok($"Uspesno izbrisan lekar sa brojem licence {brlic}");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //to do...IMPLEMENT
        [Route("PronadjiLekara/{ido}/{ime}/{prezime}")]
        [HttpGet]
        public async Task<ActionResult> PronadjiLekara(int ido, string ime, string prezime)
        {
            
            try
            {
                // var bolnica=await Context.Bolnice.Where(p=> p.ID==idb).FirstOrDefaultAsync();
                // var odeljenje=await Context.Odeljenja.Where(p=> p.ID==ido).FirstOrDefaultAsync();
                // //var rok=await Context.Rokovi.Where(p=> p.ID==idr).FirstOrDefaultAsync();
                // var lekar=await Context.Lekari.Where(p=> p.Ime==ime && p.Prezime==prezime).FirstOrDefaultAsync();

                // Spoj s=new Spoj{
                //     Student=student,
                //     Predmet=predmet,
                //     IspitniRok=rok,
                //     Ocena=ocena
                // };

                //Context.StudentiPredmeti.Add(s);
                //await Context.SaveChangesAsync();

                var podaciOLekarima= await Context.Odeljenja.Where(p=> p.ID==ido)
                            .Include(p=>p.Lekari)
                            .Select(p=>
                            new {
                                Bolnica=p.Bolnica.Naziv,
                                Grad=p.Bolnica.Grad,
                                Adresa=p.Bolnica.Adresa,
                                Sprat=p.Sprat,
                                Kapacitet=p.Kapacitet,
                                Lekar=p.Lekari.Where(p=>p.Ime==ime && p.Prezime==prezime),
                            }).ToListAsync();
                    return Ok(podaciOLekarima);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [Route("PreuzmiLekare/{nazivb}")]
        [HttpGet]

        public async Task<ActionResult> Preuzmi(string nazivb)
        {

            var lekari = Context.Lekari
             .Include(p=>p.Odeljenje)
             .Where(p=>p.Odeljenje.Bolnica.Naziv==nazivb);

            
            return Ok(await lekari.Select(p=> 
            new {
                p.BrojLicence, 
                p.Ime,
                p.Prezime
            }).ToListAsync());
        }


    }
}
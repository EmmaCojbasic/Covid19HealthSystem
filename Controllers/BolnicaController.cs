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
    public class BolnicaController : ControllerBase
    {
        public BolnicaContext Context {get; set;}
        public BolnicaController(BolnicaContext context) => Context = context;

        [Route("DodajBolnicu/{ime}/{adresa}/{grad}")]
        [HttpPost]
        public async Task<ActionResult> DodajBolnicu(string ime, string adresa, string grad)
        {
            // if(id < 1000 || id>9999)
            // {
            //     return BadRequest("Los ID bolnice!");
            // }
            if(string.IsNullOrWhiteSpace(ime) || ime.Length>100)
            {
                return BadRequest("Lose unet naziv bolnice!");
            }
            if(string.IsNullOrWhiteSpace(adresa) || adresa.Length>50)
            {
                return BadRequest("Lose uneta adresa bolnice!");
            }
            if(string.IsNullOrWhiteSpace(grad) || grad.Length>20)
            {
                return BadRequest("Lose unet grad za bolnicu!");
            }
            
            try{
                var bolnica=new Bolnica();
                //bolnica.ID=id;
                bolnica.Naziv=ime;
                bolnica.Grad=grad;
                bolnica.Adresa=adresa;
                Context.Bolnice.Add(bolnica);
                await Context.SaveChangesAsync();
                return Ok($"Ispravno uneta bolnica! ID je: {bolnica.ID}");
            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }
            
        }

        [Route("PromeniBolnicu/{ime}/{adresa}/{grad}")]
        [HttpPut]
        public async Task<ActionResult> PromeniBolnicu(int id, string ime, string adresa, string grad)
        {
            
            // if(id < 1000 || id>9999)
            // {
            //     return BadRequest("Los ID bolnice!");
            // }
            if(string.IsNullOrWhiteSpace(ime) || ime.Length>100)
            {
                return BadRequest("Lose unet naziv bolnice!");
            }
            if(string.IsNullOrWhiteSpace(adresa) || adresa.Length>50)
            {
                return BadRequest("Lose uneta adresa bolnice!");
            }
            if(string.IsNullOrWhiteSpace(grad) || grad.Length>20)
            {
                return BadRequest("Lose unet grad za bolnicu!");
            }
            try
             {
                 var bolnica = Context.Bolnice.Where(p=> p.Naziv==ime).FirstOrDefault();
                
                 if(bolnica!=null) //nasao trazenu bolnicu u bazi, postoji
                 {
                     bolnica.Adresa=adresa;
                     bolnica.Grad=grad;

                     await Context.SaveChangesAsync();
                     return Ok("Nadjena i izmenjena odgovarajuca bolnica!");
                 }
                else{
                    return BadRequest("Nije pronadjena bolnica u bazi!");
                 }
                
                
             }
             catch(Exception ex)
             {
                 return BadRequest(ex.Message);
             }
            
         }
        [Route("IzbrisiBolnicu/{id}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiPacijenta(int id)
        {
            if(id < 0)
            {
                return BadRequest("Los ID bolnice!");
            }
            try{
                var bolnica=await Context.Bolnice.FindAsync(id);
                int idb=bolnica.ID;
                Context.Bolnice.Remove(bolnica);
                await Context.SaveChangesAsync();
                return Ok($"Uspesno izbrisana bolnica sa identifikatorom {idb}");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //to do...IMPLEMENT
        //bolje naziv umesto id-ja...
        [Route("PreuzmiBolnicu/{id}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiBolnicu(int id)
        {
            
             var bolnice = Context.Bolnice
             .Include(p=>p.Odeljenja)
             .ThenInclude(p=>p.Lekari)
             .Include(p=>p.Odeljenja)
             .ThenInclude(p=>p.Pacijenti);
            // //return StatusCode(404,"Patient not found");
            var bolnica=await bolnice.Where(p=>p.ID==id).ToListAsync();

            return Ok(bolnica);
        }


    }
}
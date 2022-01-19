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
    public class OdeljenjeController : ControllerBase
    {
        public BolnicaContext Context {get; set;}
        public OdeljenjeController(BolnicaContext context) => Context = context;
    

    [Route("DodajOdeljenje/{tip}/{sprat}/{kapacitet}/{bolnica}")]
    [HttpPost]
        public async Task<ActionResult> DodajOdeljenje(string tip, int sprat, int kapacitet, int bolnica)
        {
            // if(id < 1000 || id>9999)
            // {
            //     return BadRequest("Los ID bolnice!");
            // }
            if(string.IsNullOrWhiteSpace(tip) || tip.Length>20)
            {
                return BadRequest("Lose unet tip odeljenja!");
            }
            if(sprat<1 || sprat>6)
            {
                return BadRequest("Lose unet sprat odeljenja!");
            }
            if(kapacitet<1 || kapacitet>50)
            {
                return BadRequest("Lose unet kapacitet odeljenja!");
            }
            try{
                var odeljenje=new Odeljenje();
                //bolnica.ID=id;
                odeljenje.Tip=tip;
                odeljenje.Sprat=sprat;
                odeljenje.Kapacitet=kapacitet;
                // var bolnicaa = Context.Bolnice.Where(x=>x.ID==bolnica); //????
                // odeljenje.Bolnica=(Models.Bolnica)bolnicaa;
                Context.Odeljenja.Add(odeljenje);
                await Context.SaveChangesAsync();
                return Ok($"Ispravno uneto odeljenje! ID odeljenja je: {odeljenje.ID}");
            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }
            
        }

        [Route("PromeniOdeljenje/{tip}/{sprat}/{kapacitet}")]
        [HttpPut]
        public async Task<ActionResult> PromeniOpremu(string tip,int sprat, int kapacitet)
        {
            
            // if(id < 1000 || id>9999)
            // {
            //     return BadRequest("Los ID bolnice!");
            // }
            if(string.IsNullOrWhiteSpace(tip) || tip.Length>20)
            {
                return BadRequest("Lose unet tip opreme!");
            }
            if(sprat<1 || sprat>6)
            {
                return BadRequest("Lose unet sprat odeljenja!");
            }
            if(kapacitet<1 || kapacitet>50)
            {
                return BadRequest("Lose unet kapacitet odeljenja!");
            }
            try
             {
                 var odeljenje = Context.Odeljenja.Where(p=> p.Tip==tip).FirstOrDefault();
                
                 if(odeljenje!=null) //nasao trazenu bolnicu u bazi, postoji
                 {
                    //...
                    odeljenje.Kapacitet=kapacitet;
                    odeljenje.Sprat=sprat;
                     await Context.SaveChangesAsync();
                     return Ok("Nadjeno i izmenjeno odgovarajuce odeljenje!");
                 }
                else{
                    return BadRequest("Nije pronadjeno odeljenje u bazi!");
                 }
                
                
             }
             catch(Exception ex)
             {
                 return BadRequest(ex.Message);
             }
            
         }
        [Route("IzbrisiOdeljenje/{id}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiOdeljenje(int id)
        {
            if(id < 0)
            {
                return BadRequest("Los Broj odeljenja!");
            }
            try{
                var odeljenje=await Context.Odeljenja.FindAsync(id);
                int br=odeljenje.ID;
                Context.Odeljenja.Remove(odeljenje);
                await Context.SaveChangesAsync();
                return Ok($"Uspesno izbrisano odeljenje ciji je ID{br}");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //to do...IMPLEMENT
        [Route("PreuzmiOdeljenja/{nazivb}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiOdeljenja(string nazivb)
        {
             var odeljenja = await Context.Odeljenja
             .Where(p=>p.Bolnica.Naziv==nazivb)
             .Select(p=>
                            new {
                                ID=p.ID,
                                Sprat=p.Sprat,
                                Kapacitet=p.Kapacitet,
                                Tip=p.Tip,
                                Count=p.Pacijenti.Count,
                                Lekar=p.Lekari.FirstOrDefault().Ime+" "+p.Lekari.FirstOrDefault().Prezime,
                                Pacijenti=p.Pacijenti
                            }).ToListAsync();
             

            return Ok(odeljenja);
        }
    }
}
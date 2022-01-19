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
    public class OpremaController : ControllerBase
    {
        public BolnicaContext Context {get; set;}
        public OpremaController(BolnicaContext context) => Context = context;
    

    [Route("DodajOpremu/{tip}/{pacijent}")]
    [HttpPost]
        public async Task<ActionResult> DodajOpremu(string tip, int pacijent)
        {
            // if(id < 1000 || id>9999)
            // {
            //     return BadRequest("Los ID bolnice!");
            // }
            if(string.IsNullOrWhiteSpace(tip) || tip.Length>20)
            {
                return BadRequest("Lose unet tip opreme!");
            }
            
            try{
                var oprema=new Oprema();
                //bolnica.ID=id;
                oprema.Tip=tip;
                oprema.Pacijent.MaticniBroj=pacijent;
                Context.Oprema.Add(oprema);
                await Context.SaveChangesAsync();
                return Ok($"Ispravno uneta oprema! ID opreme je: {oprema.SerijskiBroj}");
            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }
            
        }

        [Route("PromeniOpremu/{tip}")]
        [HttpPut]
        public async Task<ActionResult> PromeniOpremu(string tip)
        {
            
            // if(id < 1000 || id>9999)
            // {
            //     return BadRequest("Los ID bolnice!");
            // }
            if(string.IsNullOrWhiteSpace(tip) || tip.Length>20)
            {
                return BadRequest("Lose unet tip opreme!");
            }
            try
             {
                 var oprema = Context.Oprema.Where(p=> p.Tip==tip).FirstOrDefault();
                
                 if(oprema!=null) //nasao trazenu bolnicu u bazi, postoji
                 {
                    //...
                     await Context.SaveChangesAsync();
                     return Ok("Nadjen i izmenjen odgovarajuci tip opreme!");
                 }
                else{
                    return BadRequest("Nije pronadjena oprema u bazi!");
                 }
                
                
             }
             catch(Exception ex)
             {
                 return BadRequest(ex.Message);
             }
            
         }
        [Route("IzbrisiOpremu/{id}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiOpremu(int id)
        {
            if(id < 0)
            {
                return BadRequest("Los Broj opreme!");
            }
            try{
                var oprema=await Context.Oprema.FindAsync(id);
                int br=oprema.SerijskiBroj;
                Context.Oprema.Remove(oprema);
                await Context.SaveChangesAsync();
                return Ok($"Uspesno izbrisana instanca opreme sa serijskim brojem{br}");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //to do...IMPLEMENT
        // [Route("PreuzmiBolnicu/{id}")]
        // [HttpGet]
        // public async Task<ActionResult> PreuzmiBolnicu(int id)
        // {
            
        //      var pacijenti = Context.Pacijenti;
        //     // .Include(p=>p.Odeljenje)
        //     // .ThenInclude(p=>p.Lekari);
        //     // //return StatusCode(404,"Patient not found");
        //     var pacijent=await pacijenti.Where(p=>p.MaticniBroj==id).ToListAsync();

        //     return Ok(pacijenti);
        // }


    }
}
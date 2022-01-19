import { Bolnica } from "./Bolnica.js";
import { Lekar } from "./Lekar.js";
import { Pacijent } from "./Pacijent.js";
import { Odeljenje } from "./Odeljenje.js";
var listaLekara=[];
var listapacijenata=[];
var listaodeljenja=[];
fetch("https://localhost:5001/Lekar/PreuzmiLekare/Atlas%20Klinika")
.then(p=>{
    p.json().then(lekari=>{
        lekari.forEach(lekar => {
            console.log(lekar);
            var p=new Lekar(lekar.brojLicence, lekar.ime, lekar.prezime);
            listaLekara.push(p);
        })
        //dalje
        fetch("https://localhost:5001/Pacijent/PreuzmiPacijenteBolnice/Atlas%20Klinika",
        {
            method:"GET"
        }).then(p=>{
            p.json().then(pacijenti=>{
                const helperlistapac=[];
                pacijenti.forEach(pacijent => {
                    //var helperlista=[];
                    let p=new Pacijent(pacijent.maticniBroj, pacijent.ime, pacijent.prezime, pacijent.id,pacijent.rezultatTesta);
                    listapacijenata.push(p);
                    //console.log(this.listapacijenata);
                    // console.log(p);
                    // console.log(this.listapacijenata.push(p));
                })
                //dalje
                fetch("https://localhost:5001/Odeljenje/PreuzmiOdeljenja/Atlas%20Klinika",
    {
        method:"GET"
    }).then(p=>{
        p.json().then(odeljenja=>{
            odeljenja.forEach(odeljenje => {
                //console.log(this.naziv);
                console.log(odeljenje);
                var p=new Odeljenje(odeljenje.id, odeljenje.sprat, odeljenje.kapacitet, odeljenje.tip,odeljenje.count,odeljenje.lekar);
                listapacijenata.forEach(el=>{
                    // console.log("Petlja"); 
                    // console.log(el.id);
                    if(el.id==p.id) p.pacijenti.push(el);}
                    );
                listaodeljenja.push(p);
                console.log("Log iz fetch-a");
                console.log(p.lekar);
                // console.log("Pacijenti odeljenja: ");
                // console.log(p.pacijenti);
                // console.log("Odstampao pacijente odeljenja");
            })
            const bolnica1=new Bolnica("Atlas Klinika", "Jurija Gagarina 45", "Beograd", listaLekara, listapacijenata, listaodeljenja);
            //bolnica1.crtajBolnicu(document.body);
            bolnica1.crtajBolnicu(document.body);

            var listaLekara2=[];
var listapacijenata2=[];
var listaodeljenja2=[];
fetch("https://localhost:5001/Lekar/PreuzmiLekare/Life%20impuls")
.then(p=>{
    p.json().then(lekari=>{
        lekari.forEach(lekar => {
            console.log(lekar);
            var p=new Lekar(lekar.brojLicence, lekar.ime, lekar.prezime);
            listaLekara2.push(p);
        })
        //dalje
        fetch("https://localhost:5001/Pacijent/PreuzmiPacijenteBolnice/Life%20impuls",
        {
            method:"GET"
        }).then(p=>{
            p.json().then(pacijenti=>{
                const helperlistapac=[];
                pacijenti.forEach(pacijent => {
                    //var helperlista=[];
                    let p=new Pacijent(pacijent.maticniBroj, pacijent.ime, pacijent.prezime, pacijent.id,pacijent.rezultatTesta);
                    listapacijenata2.push(p);
                    //console.log(this.listapacijenata);
                    // console.log(p);
                    // console.log(this.listapacijenata.push(p));
                });
                //dalje
                fetch("https://localhost:5001/Odeljenje/PreuzmiOdeljenja/Life%20impuls",
    {
        method:"GET"
    }).then(p=>{
        p.json().then(odeljenja=>{
            odeljenja.forEach(odeljenje => {
                //console.log(this.naziv);
                console.log(odeljenje);
                var p=new Odeljenje(odeljenje.id, odeljenje.sprat, odeljenje.kapacitet, odeljenje.tip,odeljenje.count,odeljenje.lekar);
                listapacijenata2.forEach(el=>{
                    // console.log("Petlja"); 
                    // console.log(el.id);
                    if(el.id==p.id) p.pacijenti.push(el);}
                    );
                listaodeljenja2.push(p);
                // console.log("Pacijenti odeljenja: ");
                // console.log(p.pacijenti);
                // console.log("Odstampao pacijente odeljenja");
            })
            const bolnica2=new Bolnica("Life impuls", "Bulevar Nemanjica 100", "Nis", listaLekara2, listapacijenata2, listaodeljenja2);
            bolnica2.crtajBolnicu(document.body);
    
        })
    })


                //console.log(this.listapacijenata);
                //this.listapacijenata=helperlista;
                
            })
        })



    })
})
//console.log(listaLekara);
    
        })
    })


                //console.log(this.listapacijenata);
                //this.listapacijenata=helperlista;
                
            })
        })



    })
})
//console.log(listaLekara);

// var listaLekara2=[];
// fetch("https://localhost:5001/Lekar/PreuzmiLekare/Life%20impuls")
// .then(p=>{
//     p.json().then(lekari=>{
//         lekari.forEach(lekar => {
//             console.log(lekar);
//             var p=new Lekar(lekar.brojLicence, lekar.ime, lekar.prezime);
//             listaLekara2.push(p);
//         })
//         const bolnica2=new Bolnica("Life impuls", "Bulevar Nemanjica 100", "Nis", listaLekara2);
//         bolnica2.crtajBolnicu(document.body);

//     })
// })
// console.log(listaLekara);




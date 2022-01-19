import { Odeljenje } from "./Odeljenje.js";
import { Pacijent } from "./Pacijent.js";

export class Bolnica
{
    constructor(naziv, adresa, grad, listaLekara, listapacijenata, odeljenja)
    {
        this.naziv=naziv;
        this.grad=grad;
        this.adresa=adresa;
        this.kontejner=null;
        this.listaLekara=listaLekara;
        this.listapacijenata=listapacijenata;
        this.odeljenja=odeljenja; 
        //this.nabavipacijente(this.naziv);
        //console.log(helperlista);
        // this.nabaviodeljenja(this.naziv);
        // console.log("KONACAN PRINT");
        // console.log(this.naziv);
        // this.listapacijenata.forEach((el)=>console.log(el));

    }
    crtajPacijenta(host)
    {
        if(!host)
            throw new Exception("Roditeljski element ne postoji");
        
        this.kontejner = document.createElement("div");
        this.kontejner.classList.add("kontejner");
        host.appendChild(this.kontejner);

        this.crtajformupacijent(this.kontejner);
    }
    stat(host)
    {
        if(!host)
            throw new Exception("Roditeljski element ne postoji");
        this.kontejner = document.createElement("div");
        this.kontejner.classList.add("kontejnerstatodlj");
        host.appendChild(this.kontejner);

        const kontBolnica = document.createElement("div");
        kontBolnica.classList.add("kontBolnicaodlj");
        this.kontejner.appendChild(kontBolnica);

        var naslov=document.createElement("div");
        naslov.className="dropdown";

        var elLabela = document.createElement("h3");
            elLabela.innerHTML="Bolnica "+this.naziv+ " - Procenat popunjenosti ";
            elLabela.className="labelaa";
            naslov.appendChild(elLabela);
            
            
        var divRb = document.createElement("div");
        let selY= document.createElement("select");
        divRb.appendChild(selY);

        const listaBolnica=["odeljenja","bolnice"];

        for(let i=0; i<2;i++){
            var opcija=document.createElement("option");
            opcija.innerHTML=listaBolnica[i];
            //opcija.value=listaBolnica[i];
            opcija.name="grupab";
            //console.log(opcija.value);
            selY.appendChild(opcija);
        }

        naslov.appendChild(divRb);
        kontBolnica.appendChild(naslov);
        
        var dugme=document.createElement("button");
        dugme.className="dugme";
        dugme.innerHTML="Prikazi";

        naslov.appendChild(dugme);

        dugme.onclick=(ev)=>{
            const bol=selY.options[selY.selectedIndex].text;
            console.log(bol);
            if(bol=="odeljenja")
            {
                this.obrisiPrethodniSadrzajOdeljenja();
                const kontBolnica2 = document.createElement("div");
                kontBolnica2.classList.add("kontBolnicaa");  
                if(this.naziv=="Atlas Klinika")
                {
                    kontBolnica2.classList.add("Atlas");
                }else{kontBolnica2.classList.add("Impuls");}
                kontBolnica.appendChild(kontBolnica2);
                this.crtajstatistikuodeljenja(kontBolnica2);
            }
            else{
                this.obrisiPrethodniSadrzajBolnice();
                const kontBolnica2 = document.createElement("div");
                kontBolnica2.classList.add("kontBolnica");
                if(this.naziv=="Atlas Klinika")
                {
                    kontBolnica2.classList.add("Atlas");
                }else{kontBolnica2.classList.add("Impuls");}
                kontBolnica.appendChild(kontBolnica2);
                this.crtajstatistiku(kontBolnica2);
            }
        }

    }
    
    crtajstatistikuodeljenja(kontBolnica)
    {
        
        const kontCrtaj = document.createElement("div");
        kontCrtaj.className="kontCrtajodlj";
        kontBolnica.appendChild(kontCrtaj);
        this.odeljenja.forEach((el)=>
        {
            const KontDiv=document.createElement("div");
            KontDiv.className="kontdivv";

            console.log("Kapacitet");
            for(var i=el.kapacitet;i>0;i--)
            {
                const malidiv=document.createElement("div");
                if(i<=el.count)
                {
                    malidiv.className="roze";
                }
                else malidiv.className="praznoodlj";
                //malidiv.innerHTML=i+1;
                KontDiv.appendChild(malidiv);
            }

            kontCrtaj.appendChild(KontDiv);
            var elLabela7 = document.createElement("h5");
            elLabela7.innerHTML=el.tip+", "+el.sprat+". sprat";
            elLabela7.className="labela";
            KontDiv.appendChild(elLabela7);
        })
    }

    crtajstatistiku(kontBolnica)
    {
        //end
        if(!kontBolnica)
            throw new Exception("Roditeljski element ne postoji");

        var ukupankap=0;
        var ukupnopac=this.listapacijenata.length;
        console.log("Ukupno pacijenata:");
        console.log(ukupnopac);
        this.odeljenja.forEach((el)=>
        {
            // console.log("Petlja");
            // console.log(el);
            // console.log(el.kapacitet);
            ukupankap+=el.kapacitet;
        })
        console.log("Ukupan kapacitet:");
        console.log(ukupankap);
    
            const kontCrtaj = document.createElement("div");
            kontCrtaj.className="kontCrtaj";
            kontBolnica.appendChild(kontCrtaj);
    
            var elLabela = document.createElement("label");
            elLabela.innerHTML=(((ukupnopac/ukupankap)*100).toFixed(2)).toString()+"%";
            elLabela.className="labelica";
            kontBolnica.appendChild(elLabela);
    
            var malidiv;
            for(var i=0;i<ukupankap;i++)
            {
                malidiv=document.createElement("div");
                if(i<ukupnopac)
                {
                    malidiv.className="zeleni";
                }
                else malidiv.className="prazni";
                malidiv.innerHTML=i+1;
                kontCrtaj.appendChild(malidiv);
            }
            var brojevi=document.createElement("div");
            const sel=document.querySelector(".kontBolnica");
            sel.appendChild(brojevi);
            brojevi.className="brojevi";

            var poz=document.createElement("div");
            brojevi.appendChild(poz);
            poz.innerHTML="Broj pozitivnih:";
            poz.className="poz";

            var neg=document.createElement("div");
            brojevi.appendChild(neg);
            neg.innerHTML="Broj negativnih:";
            neg.className="neg";

            var pcount=0; var ncount=0;
            this.listapacijenata.forEach((el)=>
            {
                if(el.rezultatTesta=="Pozitivan"){pcount++;}
                else {ncount++;}
            })
            
            var pozc=document.createElement("div");
            pozc.innerHTML=pcount;
            pozc.className="num";
            poz.appendChild(pozc);

            var negc=document.createElement("div");
            negc.innerHTML=ncount;
            negc.className="num";
            neg.appendChild(negc);
            
    }

    crtajBolnicu(host)
    {
        if(!host)
            throw new Exception("Roditeljski element ne postoji");
        
        this.kontejner = document.createElement("div");
        this.kontejner.classList.add("kontejner");
        host.appendChild(this.kontejner);

        this.crtajFormu(this.kontejner);
        this.crtajOdeljenja(this.kontejner);
    }

    crtajFormu(host)
    {

        const kontForma = document.createElement("div");
        kontForma.className="kontForma";
        host.appendChild(kontForma);

        var elLabela = document.createElement("h3");
        elLabela.innerHTML="Registruj pacijenta";
        kontForma.appendChild(elLabela);

        elLabela = document.createElement("label");
        elLabela.innerHTML="*Ime pacijenta";
        kontForma.appendChild(elLabela);

        let tb= document.createElement("input");
        tb.className="ime"; //unos imena
        kontForma.appendChild(tb);

        elLabela = document.createElement("label");
        elLabela.innerHTML="*Prezime pacijenta";
        kontForma.appendChild(elLabela);

        tb= document.createElement("input");
        tb.className="prezime"; //unos prezimena
        kontForma.appendChild(tb);

        elLabela = document.createElement("label");
        elLabela.innerHTML="*Starost";
        kontForma.appendChild(elLabela);

        tb = document.createElement("input");
        tb.className="starost";
        tb.type="number";
        kontForma.appendChild(tb);

        elLabela = document.createElement("label");
        elLabela.innerHTML="*Saturacija";
        kontForma.appendChild(elLabela);

        tb = document.createElement("input");
        tb.className="saturacija";
        tb.type="number";
        kontForma.appendChild(tb);

        elLabela = document.createElement("label");
        elLabela.innerHTML="*Sprat odeljenja";
        kontForma.appendChild(elLabela);

        tb = document.createElement("input");
        tb.className="sprat";
        tb.type="number";
        kontForma.appendChild(tb);

        elLabela = document.createElement("label");
        elLabela.innerHTML="*Tip odeljenja";
        kontForma.appendChild(elLabela);

        let tipNege =["Poluintenzivna Nega", "Intenzivna Nega"];
        let tipoviBoja=["ljubicasta","maslinasta"];

        let opcija=null;
        let labela=null;
        let divRb=null;
        tipNege.forEach((nega, index)=>{
            divRb = document.createElement("div");
            opcija = document.createElement("input");
            opcija.type="radio";
            opcija.name = "group1";
            opcija.value= tipNege[index];

            labela = document.createElement("label");
            labela.innerHTML=nega;


            divRb.appendChild(opcija);
            divRb.appendChild(labela);
            kontForma.appendChild(divRb);
        })

        divRb = document.createElement("div");
        let selX= document.createElement("select");
        labela = document.createElement("label");
        labela.innerHTML="*Tip testa na Covid 19:"
        divRb.appendChild(labela);
        divRb.appendChild(selX);

        let opcije=["PCR", "Antigenski"];

        for(let i=0; i<opcije.length;i++){
            opcija=document.createElement("option");
            opcija.innerHTML=opcije[i];
            opcija.value=i;
            opcija.name="grupa1";
            selX.appendChild(opcija);
        }

        kontForma.appendChild(divRb);

        elLabela = document.createElement("label");
        elLabela.innerHTML="Rezultat testa na Covid 19:";
        kontForma.appendChild(elLabela);

        let tipRezultata =["Negativan", "Pozitivan"];
        let tipoviBojaRez=["crvena","zelena"];

        tipRezultata.forEach((nega, index)=>{
            divRb = document.createElement("div");
            opcija = document.createElement("input");
            opcija.type="radio";
            opcija.name = "group2";
            opcija.value= tipRezultata[index];

            labela = document.createElement("label");
            labela.innerHTML=nega;


            divRb.appendChild(opcija);
            divRb.appendChild(labela);
            kontForma.appendChild(divRb);
        })

        const dugme = document.createElement("button");
        dugme.className="dugme";
        dugme.innerHTML="Registruj novog pacijenta";
        kontForma.appendChild(dugme);
        dugme.onclick=(ev)=>
        {
            //TO DO: IMPLEMENT
            const ime=this.kontejner.querySelector(".ime").value;
            console.log(ime);
            const prezime=this.kontejner.querySelector(".prezime").value;
            console.log(prezime);
            const starost = parseInt(this.kontejner.querySelector(".starost").value);
            console.log(starost);
            const saturacija = parseInt(this.kontejner.querySelector(".saturacija").value);
            console.log(saturacija);
            const sprat = parseInt(this.kontejner.querySelector(".sprat").value);
            console.log(sprat);
            const tipodeljenja=this.kontejner.querySelector(`input[name="group1"]:checked`).value;
            if(this.kontejner.querySelector(".starost").value===null)
            {
            if(tipodeljenja===null)
            {
                alert("Izaberite tip odeljenja");
                return;
            }
            }
            console.log(tipodeljenja);

            let tiptestaa=["PCR","Antigenski"];
            let tiptestaind=parseInt(selX.value);
            console.log("TIP TESTA");
            console.log(tiptestaind);
            let tiptesta=tiptestaa[tiptestaind];
            console.log(tiptesta);

            const rezultattesta=this.kontejner.querySelector(`input[name="group2"]:checked`).value;
            
            if(rezultattesta===null)
            {
                alert("Izaberite rezultat testa");
                return;
            }
            console.log(rezultattesta);
            

            this.unesipacijenta(ime,prezime,starost,saturacija,rezultattesta,tiptesta,sprat,tipodeljenja);
        }

        elLabela = document.createElement("h3");
        elLabela.innerHTML="Otpusti pacijenta";
        kontForma.appendChild(elLabela);

        elLabela = document.createElement("label");
        elLabela.innerHTML="*Ime pacijenta";
        kontForma.appendChild(elLabela);

         tb= document.createElement("input");
        tb.className="ime2"; //unos imena
        kontForma.appendChild(tb);

        elLabela = document.createElement("label");
        elLabela.innerHTML="*Prezime pacijenta";
        kontForma.appendChild(elLabela);

        tb= document.createElement("input");
        tb.className="prezime2"; //unos prezimena
        kontForma.appendChild(tb);

        

        //brisanje

        divRb = document.createElement("div");
        let selY= document.createElement("select");
        labela = document.createElement("label");
        labela.innerHTML="*Dodeljeni lekar:"
        divRb.appendChild(labela);
        divRb.appendChild(selY);

        for(let i=0; i<this.listaLekara.length;i++){
            opcija=document.createElement("option");
            opcija.innerHTML=this.listaLekara[i].ime+" "+this.listaLekara[i].prezime;
            opcija.value=this.listaLekara[i].brojLicence;
            opcija.name="grupa2";
            //console.log(opcija.value);
            selY.appendChild(opcija);
        }

        kontForma.appendChild(divRb);

        const dugme2 = document.createElement("button");
        dugme2.innerHTML="Otpusti postojećeg pacijenta";
        dugme2.className="dugme";
        kontForma.appendChild(dugme2);
        dugme2.onclick=(ev)=>
        {
            //TO DO: IMPLEMENT
            
            const ime=this.kontejner.querySelector(".ime2").value;
            console.log(ime);
            const prezime=this.kontejner.querySelector(".prezime2").value;
            console.log(prezime);
            const lekarbol=selY.options[selY.selectedIndex].text;
            console.log(lekarbol);
            const imeprez=lekarbol.split(" ");
            console.log(imeprez[0]);
            console.log(imeprez[1]);
            this.obrisipacijenta(ime,prezime,imeprez[0],imeprez[1]);
        }

        //STAROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO

    }
    crtajOdeljenja(host)
    {
        console.log("LISTA PACIJENATA!");
        const kontOdeljenja = document.createElement("div");
        kontOdeljenja.className="kontOdeljenja";
        host.appendChild(kontOdeljenja);
        let red;
        let odeljenje;
        let odlj;
        /*red=document.createElement("div");
        red.className="maslov";
        for(var i=0;i<6;i++)
        {
            let sprt=document.createElement("div");
            sprt.innerHTML=i;
            sprt.className="sprt";
            red.appendChild(sprt);
        }*/
        //kontOdeljenja.appendChild(red);
        for(let i=0; i<2;i++){
            red=document.createElement("div");
            red.className="red";
            kontOdeljenja.appendChild(red);
            for(let j=0; j<6;j++){
                odeljenje = document.createElement("button");
                //odeljenje.className="odlj";
                if(i==0) //POLUINTENZIVNA
                {
                    var postojiodlj=null;
                    this.odeljenja.forEach((el)=>
                    {
                        if(el.sprat==j+1 && el.tip=="Poluintenzivna Nega")
                        {
                            postojiodlj=el;
                        }
                    })
                    
                    // console.log("postoji");
                    // console.log(postojiodlj);
                    if(postojiodlj!=null)
                    {
                        odeljenje.className="polu";
                        //console.log("ALERT LEKAR KAPACITET");
                        //console.log(postojiodlj.lekar);
                        let kap=postojiodlj.kapacitet;
                        //console.log(postojiodlj.kapacitet);
                        postojiodlj.pacijenti.forEach((pacijent)=>{
                            const malipacijent=document.createElement("button");
                            var lek=postojiodlj.lekar;
                            console.log(pacijent);
                            console.log("BITNO");
                            malipacijent.onclick=(el)=>{alert(pacijent.ime+" "+pacijent.prezime+", Rezultat testa: "+pacijent.rezultatTesta+", Dodeljeni lekar: "+lek);};
                            malipacijent.classList.add("pacijent");
                            if(pacijent.rezultatTesta=="Pozitivan")
                                malipacijent.classList.add("pozitivan");
                            else malipacijent.classList.add("negativan");
                            malipacijent.innerHTML=pacijent.ime +" "+ pacijent.prezime;
                            // if(pacijent.rezultatTesta=="Pozitivan")
                            // {
                            //     malipacijent.className="pozitivan";
                            // }
                            // else{
                            //     malipacijent.className="negativan";
                            // }
                            odeljenje.appendChild(malipacijent);
                           
                        })
                        for(var l=postojiodlj.pacijenti.length;l<kap;l++)
                        {
                            const malipacijent=document.createElement("button");
                            malipacijent.classList.add("pacijent");
                            malipacijent.innerHTML="*slobodan krevet";
                            odeljenje.appendChild(malipacijent);
                        }
                        odeljenje.onclick=(el)=>{alert("Odeljenje na "+(j+1)+". spratu, tipa Poluintenzivna Nega u bolnici "+this.naziv+". Kapacitet: "+kap);}
                    }
                    else{
                        odeljenje.className="nema";
                        odeljenje.onclick=(el)=>{alert("Ne postoji odeljenje na "+(j+1)+". spratu, tipa Poluintenzivna Nega u bolnici "+this.naziv);}
                    }
                }
                else{ //INTENZIVNA
                    var postojiodlj=null;
                    this.odeljenja.forEach((el)=>
                    {
                        if(el.sprat==j+1 && el.tip=="Intenzivna Nega")
                        {
                            postojiodlj=el;
                        }
                    })
                    if(postojiodlj!=null)
                    {
                        odeljenje.className="inte";
                        var br=0; var kapk=0;
                        postojiodlj.pacijenti.forEach((pacijent)=>
                        {
                            br++;
                            const malipacijent=document.createElement("button");
                            var lek=postojiodlj.lekar;
                            var kap=postojiodlj.kapacitet;
                            kapk=kap;
                            malipacijent.onclick=(el)=>{alert(pacijent.ime+" "+pacijent.prezime+", Rezultat testa: "+pacijent.rezultatTesta+", Dodeljeni lekar: "+lek);};
                            malipacijent.classList.add("pacijent");
                            if(pacijent.rezultatTesta=="Pozitivan")
                                malipacijent.classList.add("pozitivan");
                            else malipacijent.classList.add("negativan");

                            malipacijent.innerHTML=pacijent.ime +" "+ pacijent.prezime;
                            odeljenje.appendChild(malipacijent);
                            odeljenje.onclick=(el)=>{alert("Odeljenje na "+(j+1)+". spratu, tipa Intenzivna Nega u bolnici "+this.naziv+". Kapacitet: "+kap);} 
                        })

                        for(var l=br;l<kapk;l++)
                        {
                            const malipacijent=document.createElement("button");
                            malipacijent.classList.add("pacijent");
                            malipacijent.innerHTML="*slobodan krevet";
                            odeljenje.appendChild(malipacijent);
                        }
                        
                    }
                    else{
                        odeljenje.className="nema";
                        odeljenje.onclick=(el)=>{alert("Ne postoji odeljenje na "+(j+1)+". spratu, tipa Intenzivna Nega u bolnici "+this.naziv);}
                    }
                }
                red.appendChild(odeljenje);
                //odlj = new Odeljenje(i,j,"","",this.kapacitet);
                //this.dodajOdeljenje(odlj);
                //odlj.crtajOdeljenje(red);
            }
        }
    }
    obrisipacijenta(ime,prezime,imelek,prezimelek)
    {
        fetch("https://localhost:5001/Pacijent/ObrisiPacijenta/"+ime+"/"+prezime+"/"+imelek+"/"+prezimelek,
        {
            method:"DELETE"
        }).then(s=>{
            if(s.ok)
            {
                //this.obrisiPrethodniSadrzaj();
                
                s.json().then(data=>{
                    //console.log(data);
                    data.forEach((pac)=>{
                    var otpisan;
                    this.listapacijenata.forEach((el)=>{
                    if(el.ime==ime && el.prezime==prezime)
                    {
                        otpisan=el;
                    }
                    })
                    this.odeljenja.forEach((el)=>{
                        if(el.sprat==pac.sprat && el.tip==pac.tip)
                        {
                            console.log(el.sprat,el.tip);
                            for(var i=0;i<el.pacijenti.length;i++)
                            {
                                if(el.pacijenti[i].ime==ime && el.pacijenti[i].prezime==prezime)
                                {
                                    console.log("NASAO");
                                    console.log(el.pacijenti[i].ime, el.pacijenti[i].prezime);
                                    el.pacijenti.splice(i,1);
                                }
                            }
                        }
                    })
                    //this.listapacijenata.remove(otpisan);

                    this.obrisiPrethodniSadrzaj();
                    this.crtajOdeljenja(this.kontejner);

                })
                    //this.crtajBolnicu(document.body);
                })
                
                alert("Pacijent uspesno obrisan iz sistema!");
                // if(alert("Pacijent uspesno obrisan iz sistema!")){}
                // else    window.location.reload(); 
                return;
                
            }
            // else {
            //     alert("Doslo je do greske! Pacijent ne postoji!");
            // }
        })
    }

    unesipacijenta(ime,prezime,starost,saturacija,rezultattesta,tiptesta,sprat,tipodeljenja)
    {
        fetch("https://localhost:5001/Pacijent/DodajPacijenta/"+ime+"/"+prezime+"/"+starost+"/"+saturacija+"/"+rezultattesta+"/"+tiptesta+"/"+sprat+"/"+tipodeljenja+"/"+this.naziv,
        {
            method:"POST"
        }).then(s=>{
            if(s.ok)
            {
                s.json().then(data=>{
                    //console.log(data);
                    data.forEach(a=>{
                    const paci=new Pacijent(a.maticniBroj,a.ime,a.prezime,a.id,a.rezultatTesta);
                    this.listapacijenata.push(paci);
                    //this.crtajBolnicu(document.body);
                    this.odeljenja.forEach((el)=>{
                        if(el.sprat==sprat && el.tip==tipodeljenja)
                        {
                            el.pacijenti.push(paci);
                        }
                    })

                    this.obrisiPrethodniSadrzaj();
                    //this.nabavipacijente(this.naziv);
                    this.crtajOdeljenja(this.kontejner);
                    }
                    );
                })
                alert("Pacijent uspesno dodat u sistem!");
                // if(alert("Pacijent uspesno dodat u sistem!")){}
                // else    window.location.reload(); 
                
               return;
            }
            else {
                alert("Doslo je do greske!");
            }
        })
    }
    nabavipacijente(naziv)
        {
            fetch("https://localhost:5001/Pacijent/PreuzmiPacijenteBolnice/"+naziv,
            {
                method:"GET"
            }).then(p=>{
                p.json().then(pacijenti=>{
                    const helperlistapac=[];
                    pacijenti.forEach(pacijent => {
                        //var helperlista=[];
                        let p=new Pacijent(pacijent.maticniBroj, pacijent.ime, pacijent.prezime, pacijent.id, pacijent.rezultatTesta);
                        this.listapacijenata.push(p);
                        console.log(this.listapacijenata);
                        // console.log(p);
                        // console.log(this.listapacijenata.push(p));
                    });
                    console.log(this.listapacijenata);
                    //this.listapacijenata=helperlista;
                    
                })
            })
            
        }
    nabaviodeljenja(naziv)
    {
        fetch("https://localhost:5001/Odeljenje/PreuzmiOdeljenja/"+naziv,
        {
            method:"GET"
        }).then(p=>{
            p.json().then(odeljenja=>{
                odeljenja.forEach(odeljenje => {
                    console.log("Fja nabavi");
                    console.log(odeljenje);
                    var p=new Odeljenje(odeljenje.id, odeljenje.sprat, odeljenje.kapacitet, odeljenje.tip,odeljenje.count,odeljenje.lekar);
                    console.log(p);
                    this.helperlistapac.forEach(el=>{
                        // console.log("Petlja"); 
                        // console.log(el.id);
                        if(el.id==p.id) p.pacijenti.push(el);}
                        );
                    this.helperlistaodlj.push(p);
                    // console.log("Pacijenti odeljenja: ");
                    // console.log(p.pacijenti);
                    // console.log("Odstampao pacijente odeljenja");
                })
        
            })
        })
        
    }

    obrisiPrethodniSadrzaj()
    {
        var formodlj=document.querySelector(".kontOdeljenja");
        var roditelj=formodlj.parentNode;
        roditelj.removeChild(formodlj);
        //novo, prazno
        //formodlj=document.createElement("div");
        //formodlj.className="kontOdeljenja";
        //roditelj.appendChild(formodlj);
    }

    crtajformupacijent(host)
    {
        const kontForma = document.createElement("div");
        kontForma.className="kontFormaPac";
        host.appendChild(kontForma);

        var elLabela = document.createElement("h3");
        elLabela.innerHTML="Pronadjite EHR pacijenta u bazi";
        kontForma.appendChild(elLabela);

        var divRb = document.createElement("div");
        divRb.className="novired";
        let selY= document.createElement("select");
        var labela = document.createElement("label");
        labela.innerHTML="Odaberite bolnicu:"
        divRb.appendChild(labela);
        divRb.appendChild(selY);

        const listaBolnica=["Atlas Klinika","Life impuls"];

        for(let i=0; i<2;i++){
            var opcija=document.createElement("option");
            opcija.innerHTML=listaBolnica[i];
            //opcija.value=listaBolnica[i];
            opcija.name="grupab";
            //console.log(opcija.value);
            selY.appendChild(opcija);
        }

        kontForma.appendChild(divRb);

        elLabela = document.createElement("label");
        elLabela.innerHTML="Ime pacijenta";
        kontForma.appendChild(elLabela);

        let tb= document.createElement("input");
        tb.className="ime"; //unos imena
        kontForma.appendChild(tb);

        elLabela = document.createElement("label");
        elLabela.innerHTML="Prezime pacijenta";
        kontForma.appendChild(elLabela);

        tb= document.createElement("input");
        tb.className="prezime"; //unos prezimena
        kontForma.appendChild(tb);

        elLabela = document.createElement("label");
        elLabela.className="saglasnost";
        elLabela.innerHTML="*Ovim potvrdjujem da imam pravo pristupa trazenim medicinskim podacima o pacijentu, kao i da cu stiti poverljivost istih";
        kontForma.appendChild(elLabela);

        let tipOdg =["DA"];

        tipOdg.forEach((el, index)=>{
            divRb = document.createElement("div");
            opcija = document.createElement("input");
            opcija.type="checkbox";
            opcija.id = "groupa";
            opcija.value=tipOdg[index];

            labela = document.createElement("label");
            labela.innerHTML="*Saglasan sam";


            divRb.appendChild(opcija);
            divRb.appendChild(labela);
            kontForma.appendChild(divRb);

            const prazan=document.createElement("div");
            prazan.className="prazandiv";
            kontForma.appendChild(prazan);


        const dugme2 = document.createElement("button");
        dugme2.innerHTML="Pretraga baze";
        dugme2.className="dugme3";
        kontForma.appendChild(dugme2);

        //crtanje prazne forme za prikaz
        var tb=document.createElement("div");
        tb.className="novidiv";
        host.appendChild(tb);

        var elLabela = document.createElement("h2");
        elLabela.innerHTML="Medicinski karton pacijenta:";
        elLabela.className="karton";
        tb.appendChild(elLabela);

        divred=document.createElement("div");
        divred.className="novidiv2";
        elLabela = document.createElement("label");
        elLabela.innerHTML="Naziv bolnice:";
        elLabela.className="karton";
        divred.appendChild(elLabela);
        elLabela = document.createElement("label");
        elLabela.innerHTML="";
        elLabela.classList.add("valBolnica");
        divred.appendChild(elLabela);
        tb.appendChild(divred);

        divred=document.createElement("div");
        divred.className="novidiv2";
        elLabela = document.createElement("label");
        elLabela.innerHTML="Lokacija bolnice:";
        elLabela.className="karton";
        divred.appendChild(elLabela);
        elLabela = document.createElement("label");
        elLabela.innerHTML="";
        elLabela.classList.add("valLokacija");
        divred.appendChild(elLabela);
        tb.appendChild(divred);

        divred=document.createElement("div");
        divred.className="novidiv2";
        elLabela = document.createElement("label");
        elLabela.innerHTML="Sprat odeljenja:";
        elLabela.className="karton";
        divred.appendChild(elLabela);
        elLabela = document.createElement("label");
        elLabela.innerHTML="";
        elLabela.classList.add("valSprat");
        divred.appendChild(elLabela);
        tb.appendChild(divred);

        divred=document.createElement("div");
        divred.className="novidiv2";
        elLabela = document.createElement("label");
        elLabela.className="karton";
        elLabela.innerHTML="Tip odeljenja:";
        divred.appendChild(elLabela);
        elLabela = document.createElement("label");
        elLabela.innerHTML="";
        elLabela.classList.add("valTip");
        divred.appendChild(elLabela);
        tb.appendChild(divred);

        var divred=document.createElement("div");
        divred.className="novidiv2";
        elLabela = document.createElement("label");
        elLabela.className="karton";
        elLabela.innerHTML="Ime pacijenta:";
        divred.appendChild(elLabela);
        elLabela = document.createElement("label");
        elLabela.innerHTML="";
        elLabela.classList.add("valIme");
        divred.appendChild(elLabela);
        tb.appendChild(divred);

        divred=document.createElement("div");
        divred.className="novidiv2";
        elLabela = document.createElement("label");
        elLabela.innerHTML="Prezime pacijenta:";
        elLabela.className="karton";
        divred.appendChild(elLabela);
        elLabela = document.createElement("label");
        elLabela.innerHTML="";
        elLabela.classList.add("valPrezime");
        divred.appendChild(elLabela);
        tb.appendChild(divred);

        divred=document.createElement("div");
        divred.className="novidiv2";
        elLabela = document.createElement("label");
        elLabela.innerHTML="Tip testa na Covid-19:";
        elLabela.classList.add("karton");
        divred.appendChild(elLabela);
        elLabela = document.createElement("label");
        elLabela.innerHTML="";
        elLabela.classList.add("valTest");
        divred.appendChild(elLabela);
        tb.appendChild(divred);

        divred=document.createElement("div");
        divred.className="novidiv2";
        elLabela = document.createElement("label");
        elLabela.innerHTML="Rezultat testa na Covid-19:";
        elLabela.className="karton";
        divred.appendChild(elLabela);
        elLabela = document.createElement("label");
        elLabela.innerHTML="";
        elLabela.classList.add("valRezultat");
        divred.appendChild(elLabela);
        tb.appendChild(divred);

        divred=document.createElement("div");
        divred.className="novidiv2";
        elLabela = document.createElement("label");
        elLabela.innerHTML="Ime lekara:";
        elLabela.className="karton";
        divred.appendChild(elLabela);
        elLabela = document.createElement("label");
        elLabela.innerHTML="";
        elLabela.classList.add("valLekarI");
        divred.appendChild(elLabela);
        tb.appendChild(divred);

        divred=document.createElement("div");
        divred.className="novidiv2";
        elLabela = document.createElement("label");
        elLabela.innerHTML="Prezime lekara:";
        elLabela.className="karton";
        divred.appendChild(elLabela);
        elLabela = document.createElement("label");
        elLabela.innerHTML="";
        elLabela.classList.add("valLekarP");
        divred.appendChild(elLabela);
        tb.appendChild(divred);

        divred=document.createElement("div");
        divred.className="novidiv2";
        elLabela = document.createElement("label");
        elLabela.innerHTML="Dodatna medicinska oprema:";
        elLabela.className="karton";
        divred.appendChild(elLabela);
        elLabela = document.createElement("label");
        elLabela.innerHTML="";
        elLabela.classList.add("valOprema");
        divred.appendChild(elLabela);
        tb.appendChild(divred);

        dugme2.onclick=(ev)=>
        {
            //TO DO: IMPLEMENT
            
            const ime=this.kontejner.querySelector(".ime").value;
            console.log(ime);
            const prezime=this.kontejner.querySelector(".prezime").value;
            console.log(prezime);
            //const saglasan=this.kontejner.querySelector(`input[name="group2"]:checked`).value;
            const bol=selY.options[selY.selectedIndex].text;

            const saglasan=this.kontejner.querySelector(`#groupa:checked`);
            
            if(saglasan==null)
            {
                alert("Molimo Vas da date svoju saglasnost kako bi Vam bio omogucen pristup podacima");
                return;
            }
            
            this.infoopacijentu(ime,prezime,bol,tb);
            this.obrisiTest(document.body);
            this.crtajformuTest(document.body,ime,prezime,bol);
        }
        })
    }

    infoopacijentu(ime,prezime,bol,host)
    {
        fetch("https://localhost:5001/Pacijent/SveOPacijentu/"+bol+"/"+ime+"/"+prezime,
        {
            method:"GET"
        }).then(s=>{
            if(s.ok)
            {
                //this.obrisiPrethodniSadrzajKarton();
                //this.crtajformuTest(document.body);
                s.json().then(data=>{
                  console.log(data);
                  data.forEach(pac=>{
                    var templabela=document.querySelector(".valIme");
                    templabela.innerHTML=pac.ime;
                    templabela.classList.add("karton2");
                    //console.log(pac.ime);
                    templabela=document.querySelector(".valPrezime");
                    templabela.innerHTML=pac.prezime;
                    templabela.classList.add("karton2");
                    //console.log(pac.ime);
                    templabela=document.querySelector(".valBolnica");
                    templabela.innerHTML=pac.bolnica;
                    templabela.classList.add("karton2");
                    templabela=document.querySelector(".valLokacija");
                    templabela.innerHTML=pac.lokacija;
                    templabela.classList.add("karton2");
                    templabela=document.querySelector(".valSprat");
                    templabela.innerHTML=pac.sprat;
                    templabela.classList.add("karton2");
                    templabela=document.querySelector(".valTip");
                    templabela.innerHTML=pac.tip;
                    templabela.classList.add("karton2");
                    templabela=document.querySelector(".valTest");
                    templabela.innerHTML=pac.test;
                    templabela.classList.add("karton2");
                    templabela=document.querySelector(".valLekarI");
                    templabela.innerHTML=pac.lekari;
                    templabela.classList.add("karton2");
                    templabela=document.querySelector(".valLekarP");
                    templabela.innerHTML=pac.lekarp;
                    templabela.classList.add("karton2");
                    templabela=document.querySelector(".valOprema");
                    templabela.innerHTML=pac.oprema;
                    templabela.classList.add("karton2");
                    templabela=document.querySelector(".valRezultat");
                    templabela.innerHTML=pac.rezultat;
                    templabela.classList.add("karton2");
                  })
                })
                
            }
            else {
                alert("Doslo je do greske!");
            }
        })
    }
    obrisiPrethodniSadrzajOdeljenja()
    {
        if(this.naziv=="Atlas Klinika")
        {
            var bol=document.querySelector(".Atlas");
        }else bol=document.querySelector(".Impuls");

        if(bol!=null)
        {
            var roditelj=bol.parentNode;
            roditelj.removeChild(bol);
        }

    }

    obrisiPrethodniSadrzajBolnice()
    {
        if(this.naziv=="Atlas Klinika")
        {
            var bol=document.querySelector(".Atlas");
        }else bol=document.querySelector(".Impuls");

        if(bol!=null)
        {
            var roditelj=bol.parentNode;
            roditelj.removeChild(bol);
        }

    }
    
    crtajformuTest(host,ime,prezime,bolnica)
    {
        //this.obrisiTest(host);
        const kontForma = document.createElement("div");
        kontForma.className="kontFormaTest";
        host.appendChild(kontForma);

        var elLabela = document.createElement("h3");
        elLabela.innerHTML="Da li imate podatak o novijem testiranju?";
        kontForma.appendChild(elLabela);

        var divRb = document.createElement("div");
        divRb.className="novired";
        let selY= document.createElement("select");
        var labela = document.createElement("label");
        labela.innerHTML="*Odaberite tip testa:"
        divRb.appendChild(labela);
        divRb.appendChild(selY);

        const listaBolnica=["PCR","Antigenski"];

        for(let i=0; i<2;i++){
            var opcija=document.createElement("option");
            opcija.innerHTML=listaBolnica[i];
            //opcija.value=listaBolnica[i];
            opcija.name="grupab";
            //console.log(opcija.value);
            selY.appendChild(opcija);
        }

        kontForma.appendChild(divRb);

        elLabela = document.createElement("label");
        elLabela.innerHTML="*Rezultat testa na Covid 19:";
        kontForma.appendChild(elLabela);

        let tipRezultata =["Negativan", "Pozitivan"];

        tipRezultata.forEach((nega, index)=>{
            divRb = document.createElement("div");
            opcija = document.createElement("input");
            opcija.type="radio";
            opcija.name = "group2";
            opcija.value= tipRezultata[index];
            console.log(opcija.value);

            labela = document.createElement("label");
            labela.innerHTML=nega;


            divRb.appendChild(opcija);
            divRb.appendChild(labela);
            kontForma.appendChild(divRb);
        })

        const dugme2 = document.createElement("button");
        dugme2.innerHTML="Azuriraj test";
        dugme2.className="dugme3";
        kontForma.appendChild(dugme2);

        dugme2.onclick=(ev)=>
        {
            //TO DO: IMPLEMENT
            //const saglasan=this.kontejner.querySelector(`input[name="group2"]:checked`).value;
            const bol=selY.options[selY.selectedIndex].text;
            console.log(bol);

            const rezultattesta=host.querySelector(`input[name="group2"]:checked`).value;
            
            if(rezultattesta===null)
            {
                alert("Izaberite rezultat testa");
                return;
            }
            console.log(rezultattesta);

            this.azurirajprikaz(bol,rezultattesta,ime,prezime,bolnica);    
            
        }
    }

    azurirajprikaz(bol,rezultattesta,ime,prezime,bolnica)
    {
        fetch("https://localhost:5001/Pacijent/PromeniPacijenta/"+bolnica+"/"+ime+"/"+prezime+"/"+rezultattesta+"/"+bol,
            {
                method:"PUT"
            }).then(p=>{
                p.json().then(pacijenti=>{
                    pacijenti.forEach(pac => {
                        console.log(pac.tip);
                        console.log(pac.rezultat);
                        var testic=pac.tip;
                        var rezultatic=pac.rezultat;
                        //var kont=document.querySelector(".novidiv2");
                        var templabela=document.querySelector(".valTest");
                        if(templabela!=null)
                        {
                            templabela.innerHTML=testic;
                            templabela.classList.add("karton2");
                        }else {console.log("Nema");}
                        templabela=document.querySelector(".valRezultat");
                        if(templabela!=null)
                        {
                            templabela.innerHTML=rezultatic;
                            templabela.classList.add("karton2");
                        }else {console.log("Nema");}
                    });
                    
                })
            })
    }
    obrisiTest(host)
    {
        const bol=document.querySelector(".kontFormaTest");

        if(bol!=null)
        {
            var roditelj=bol.parentNode;
            roditelj.removeChild(bol);
        }
    }
    
}
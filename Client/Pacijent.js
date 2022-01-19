export class Pacijent
{
    constructor(maticniBroj, ime, prezime, id, rezultatTesta)//, starost, saturacija, tiptesta, rezultatesta)
    {
        this.maticniBroj=maticniBroj;
        this.ime=ime;
        this.prezime=prezime;
        this.id=id; //odnosi se na odeljenje
        this.rezultatTesta=rezultatTesta;
        /*this.starost=starost;
        this.saturacija=saturacija;
        this.tiptesta=tiptesta;
        this.rezultatesta=rezultatesta;
        */
    }
}
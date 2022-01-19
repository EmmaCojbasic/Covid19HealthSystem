export class Odeljenje
{
    constructor(id, sprat, kapacitet, tip, count, lekar, pacijenti)
    {
        this.id=id;
        this.sprat=sprat;
        this.kapacitet=kapacitet;
        this.tip=tip;
        this.count=count;
        this.lekar=lekar;
        this.pacijenti=[];
    }
    // brisipacijenta(pac)
    // {
    //     this.pacijenti.remove(pac);
    // }
}
import AccesDonnees from '../../data/AccesDonnees';



export default class LogiqueTri extends AccesDonnees
{
    constructor(id)
    {
        super('jeuxtri',id)
    }

  
    get infoJeu()
    {
        return this.donnees.info;     
    }

    get choix()
    {
        return this.donnees.choix;
    }

    get temps()
    {
        return this.donnees.temps;
    }

}
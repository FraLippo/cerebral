import AccesDonnees from '../../data/AccesDonnees';


export default class LogiquePuzzle extends AccesDonnees
{
    constructor(id)
    {
        super('jeuxpuzzle', id)
    }

    obtenirInfo()
    {
        return this.donnees.info;
    
    }
    obtenirExplication()
    {
        return this.donnees.explication;
    }
   
    obtenirImagePresentation()
    {
        return this.donnees.imagePresentation;
    }

    obtenirInfoResultat()
    {
        return this.donnees.infoResultat;
    }

    obtenirTemps()
    {
        return this.donnees.temps;
    }

   
}

import AccesDonnees from '../../data/AccesDonnees';



export default class Donnees  extends AccesDonnees
{
    constructor(id)
    {
        super('jeuxCompte',id)
    }


    obtenirCartes()
    {
        return this.donnees.info.cartes;
    
    }
    obtenirResultat()
    {
        return this.donnees.info.resultat;
    }

    obtenirSolution()
    {
        
        return this.donnees.info.solution;
    }

 
   
}
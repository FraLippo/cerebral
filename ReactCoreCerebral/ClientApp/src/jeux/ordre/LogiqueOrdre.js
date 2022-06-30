
import AccesDonnees from '../../data/AccesDonnees';


export default class LogiqueOrdre extends AccesDonnees
{
    constructor(id)
    {
        super('jeuxOrdre', id);      
    }

    get temps()
    {
        return  this.donnees.temps;
    }


    obtenirDonnees()
    {
        let donnee= this.donnees.info.map(el => {el.emplacement = -1; return el});
        return donnee;
    }


    EstCorrect(tabReponse)
    {
        if (tabReponse.length !== this.donnees.info.length) return null;
        
        let i =0;
        while (i < tabReponse.length-1 && tabReponse[i+1] > tabReponse[i])
        {
            i++;
        } 

        return i === tabReponse.length-1;
        
    }


}


import AccesDonnees from '../../data/AccesDonnees';
import mah1 from '../../images/mah1.png';
import mah2 from '../../images/mah2.png';
import mah3 from '../../images/mah3.png';
import mah4 from '../../images/mah4.png';
import mah5 from '../../images/mah5.png';
import mah6 from '../../images/mah6.png';
import mah7 from '../../images/mah7.png';
import mah8 from '../../images/mah8.png';
import mah9 from '../../images/mah9.png';


export default class LogiqueMah extends AccesDonnees
{
    constructor(id)
    {
        super('jeuxmahjong',id)
    }

    
    obtenirGrille()
    {
        return this.donnees.info.grille;  
    }

    obtenirTemps()
    {
        return this.donnees.info.temps;  
    }

    obtenirTaille()
    {
        return this.donnees.info.taille;  
    }

    static testResultat(no, grilleEnCours)
    {
        let tabResult = grilleEnCours.filter(x => x === no);
        if (tabResult.length===1)
        {
            return "ok";
        }
        else 
        {
            return "erreur";
        }
       
    }
  

    static constructionEmplacement(index, taille)
    {
       
        let y = (Math.floor(index / taille)) + 1;
        let x = index % taille + 1;
        return {
            gridColumnStart : x, 
            gridColumnEnd : x,
            gridRowStart : y,
            gridRowEnd : y,
        }
    }


    static obtenirImage(no)
    {
        switch(no)
        {
            case 0: return mah1;
            case 1: return mah2;
            case 2: return mah3;
            case 3: return mah4;
            case 4: return mah5;
            case 5: return mah6;
            case 6: return mah7;
            case 7: return mah8;
            case 8: return mah9;
        
            default:
                return mah1;
        }
    }



}
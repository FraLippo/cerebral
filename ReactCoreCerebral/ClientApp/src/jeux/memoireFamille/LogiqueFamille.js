import AccesDonnees from '../../data/AccesDonnees';
import wed1 from '../../images/wed1.jpg';
import wed2 from '../../images/wed2.jpg';
import wed3 from '../../images/wed3.jpg';
import bal1 from '../../images/bal1.jpg';
import bal2 from '../../images/bal2.jpg';
import bal3 from '../../images/bal3.jpg';
import arab1 from '../../images/arab1.jpg';
import arab2 from '../../images/arab2.jpg';

export default class LogiqueFamille extends AccesDonnees
{
    constructor(id)
    {
        super('jeuxfamille',id)  
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

    static testResultat(noActuel, noEnCours, grilleEnCours)
    {
        if (noEnCours === -10) return "ok";

        let tabResult = grilleEnCours.filter(x => x === noEnCours);
        if (noActuel === noEnCours && tabResult.length===1)
        {
            return "finSerie";
        }
        else if ( (noActuel !== noEnCours && tabResult.length > 0))
        {
            return "erreur";
        }
        else
        {
            return"ok";
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
            case 0: return wed1;
            case 1: return wed2;
            case 2: return wed3;
            case 3: return bal1;
            case 4: return bal2;
            case 5: return bal3;
            case 6: return arab1;
            case 7: return arab2;
            default:
                return wed1;
        }
    }



}
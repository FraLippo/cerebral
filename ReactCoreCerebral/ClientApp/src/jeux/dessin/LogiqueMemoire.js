
import AccesDonnees from '../../data/AccesDonnees';


export default class LogiqueMemoire extends AccesDonnees
{
    constructor(id)
    {
        super('jeuxMemoireDessin',id)
    }


    obtenirInfo()
    {
        return this.donnees.info;  
    }
    obtenirTemps()
    {
        return this.donnees.temps;
    }
  

    static constructionEmplacementCouleur(index, couleur,taille)
    {
     
        const gridEmplacement = LogiqueMemoire.constructionEmplacement(index, taille);
        return {...gridEmplacement,
            backgroundColor : couleur
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

   
    static prochaineCouleur(couleur, nbCouleurs)
    {
       let tabCouleur = ['white', 'blue', 'red'];

       let index= tabCouleur.indexOf(couleur);

       if (index + 1 < nbCouleurs )
       {
           index++;
       }
       else
       {
           index = 0;
       }

       return tabCouleur[index];


       
    }
}
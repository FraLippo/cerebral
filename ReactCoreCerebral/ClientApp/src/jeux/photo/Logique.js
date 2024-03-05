import AccesDonnees from '../../data/AccesDonnees';



export default class Logique extends AccesDonnees
{
    constructor(id)
    {
        super('jeuxphoto',id)
    }
    obtenirDonnee()
    {
     
        return this.donnees;  
    }
    
    obtenirDonneeJeu()
    {
     
        return this.donnees.info.questions;  
    }
    obtenirPhoto()
    {
        return this.donnees.info.photo;  
    }
}
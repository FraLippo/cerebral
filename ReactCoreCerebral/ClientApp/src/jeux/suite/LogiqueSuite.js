import AccesDonnees from '../../data/AccesDonnees';


export default class LogiqueSuite extends AccesDonnees
{
    constructor(id)
    {
        super('jeuxsuite', id)
    }
   
    construireTableauReponse()
    {
       
        let tabReponse = [];
        
        tabReponse.push(false);
        for (let i = 1; i < this.donnees.tabNombre.length; i++) {   
                if (this.donnees.tabNombre[i-1] === this.donnees.tabNombre[i])
                {
                    tabReponse.push(true);
                }
                else
                {
                    tabReponse.push(false);
                }          
        }
        return tabReponse;
    }
    
}
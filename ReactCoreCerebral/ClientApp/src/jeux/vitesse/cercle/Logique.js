
import mots from './data';

export default class Logique {

    static creationListeMots() {
        const liste = new Set();
        let i = 0;
        do {
            let nbHasard = Math.floor(Math.random() * mots.length);

            if (!liste.has(nbHasard)) {
                i++;
                liste.add(nbHasard);
            }
        } while (i < 4);

        let tabMots = [];
      
        liste.forEach(element => {
            
            tabMots.push(mots[element]);
        });
        return tabMots;
    }

    static creationTableau()
    {
        let tabMots = Logique.creationListeMots();
     
        let tableauFinal = [];
        for (let index = 0; index < tabMots.length; index++) {
            let jeu = {mot : tabMots[index], infoMots : []};
         
            let placeHasard = Math.floor(Math.random() * tabMots[index].length);
            let sensHasard = Math.floor(Math.random() * 2);
            for (let j = 0; j < tabMots[index].length; j++) {

                jeu.infoMots.push({lettre : tabMots[index][placeHasard],  etat: 'vide'}); 
           
           
                if (sensHasard === 0) {
                    placeHasard++;
                  if (placeHasard === tabMots[index].length) {
                    placeHasard = 0;
                  }
                }
                else
                {
                    placeHasard--;
                  if (placeHasard === -1) {
                    placeHasard =  tabMots[index].length-1;
                  }
                }
                
                
            }
            tableauFinal.push(jeu);
        }
  
        return tableauFinal;
    }
}
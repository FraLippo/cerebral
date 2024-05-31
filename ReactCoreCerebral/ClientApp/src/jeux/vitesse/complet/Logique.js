
export default class Logique {
    static creationTableau(taille) {
       let tabQuestion = Array(taille * taille).fill(1)
        let tabDebutFin = [];
        for (let i = 0; i < taille; i++) {
            let debut = Math.floor(Math.random() * taille / 2);
            let fin = Math.floor(Math.random() * (taille / 2) + taille / 2);
        
            tabDebutFin.push({ debut, fin });
            for (let j = 0; j < taille; j++) {

                if (j >= debut && j <= fin) {
                    tabQuestion[(i * taille) + j] = 0;

                }

            }
        }


            //tabInverse
            let tabReponse = [];
            for (let index = 0; index < tabQuestion.length; index++) {
                if (tabQuestion[index] === 1) {
                    tabReponse.push(2);
                }
                else {
                    tabReponse.push(1);
                }

            }



            return { tabQuestion, tabReponse, tabDebutFin };
        }

    

    static constructionLignes(taille, nbChangement) {
        let tabTemp = [];
    
        for (let j = 0; j < nbChangement; j++) {
            let ligne = 0;
            let ajout = false;
            do {
                ligne = Math.floor(Math.random() * taille);
             
                if (tabTemp.findIndex(x => x === ligne) === -1) {
                    tabTemp.push(ligne);
                    ajout = true;

                }
              
            } while (!ajout)
        }
 
        return tabTemp;
    }
    static changementDebutFin(tabDebutFin, taille, nbChangement) {

        let tabLignes = Logique.constructionLignes(taille, nbChangement);
     
        let nouveauDebutFin = [];
        for (let i = 0; i < tabDebutFin.length; i++) {
            nouveauDebutFin.push(tabDebutFin[i])
            
        }
        for (let i = 0; i < tabLignes.length; i++) {
        
            let choix = Math.floor(Math.random() * 2);
            let ajout = false;
            do {
                let nouveau = 0;
                let ancien = 0;
                if (choix === 0) {
                    nouveau = Math.floor(Math.random() * taille / 2);
                    ancien = tabDebutFin[tabLignes[i]].debut;

                }
                else {
                    nouveau = Math.floor(Math.random() * (taille / 2) + taille / 2);
                    ancien = tabDebutFin[tabLignes[i]].fin;
                }
               
                if (nouveau !== ancien) {
                    if (choix === 0) {
                        nouveauDebutFin[tabLignes[i]].debut = nouveau;
                    }
                    else {
                        nouveauDebutFin[tabLignes[i]].fin = nouveau;
                    }
                    ajout = true;

                }
              
            } while (!ajout)
             
        }   
            return nouveauDebutFin;
    }
    static constructionMauvaisTableau(tabDebutFin, taille, nbChangement) {

        let nouveauDebutFin = Logique.changementDebutFin(tabDebutFin, taille, nbChangement);
   
        let tabReponse = Array(taille * taille).fill(2)
        for (let i = 0; i < taille; i++) {
            let debut = nouveauDebutFin[i].debut;
            let fin = nouveauDebutFin[i].fin;
            for (let j = 0; j < taille; j++) {

                if (j >= debut && j <= fin) {
                    tabReponse[(i * taille) + j] = 1;
                }

            }
        } 
        return tabReponse;
    }
}

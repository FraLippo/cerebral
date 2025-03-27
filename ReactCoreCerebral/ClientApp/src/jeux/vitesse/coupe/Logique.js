import { mots } from './data';



export default class Logique {


    constructor() {
  
        this.listeMots = mots;
        this.listeDonneesJeu = [];
    }


    construireListeMots() {
        this.listeDonneesJeu = [this.couperMot(3,this.listeMots[0], 3, 6), this.couperMot(3,this.listeMots[1], 3, 6), this.couperMot(3,this.listeMots[2], 3, 6), this.couperMot(3,this.listeMots[3], 3, 6), this.couperMot(2,this.listeMots[4], 3, 6)];
 
    }

    couperMot(nbCoupure, mot, debut, fin) {
console.log(mot);
        let tabLettres = [];
        let tabMots = [];
        let syllabe1 = mot.substring(0, debut);
        for (let index = 0; index < syllabe1.length; index++) {
            tabLettres.push({ reponse: syllabe1[index], etat: 'cache', groupe: 1, lettreEnCours: ''});

        }
        tabMots.push({syllabe : syllabe1, etat : 'nul'});
        let syllabe2 = nbCoupure === 2 ?  mot.substring(debut): mot.substring(debut,fin);
        for (let index = 0; index < syllabe2.length; index++) {
            tabLettres.push({ reponse: syllabe2[index], etat: 'cache', groupe: 2, lettreEnCours: ''});
        }
         tabMots.push({syllabe : syllabe2, etat : 'nul'});
        if (nbCoupure === 3) {
           
            let syllabe3 = mot.substring(fin);
            for (let index = 0; index < syllabe3.length; index++) {
                tabLettres.push({ reponse: syllabe3[index], etat: 'cache', groupe: 3, lettreEnCours: ''});
           
            }
            tabMots.push({syllabe : syllabe3, etat : 'nul'});
        }
    
        let afficheNb = Math.floor(Math.random() * tabMots.length);
        let tabAff = tabLettres.filter(x => x.groupe === afficheNb+1);
        for (let index = 0; index < tabAff.length; index++) {
            tabAff[index].etat = 'affiche';
            tabAff[index].lettreEnCours = tabAff[index].reponse;
            
        }
  
        tabMots.splice(afficheNb, 1);
      
        return { mots: tabMots, lettres: tabLettres };



    }
}
import { mots } from './data';



export default class Logique {


    constructor() {
  
        this.listeMots = [mots[0]];
        this.listeDonneesJeu = [];
    }


    construireListeMots() {
        this.listeDonneesJeu = [this.couperMot(3,this.listeMots[0], 3, 6)];
    }

    couperMot(nbCoupure, mot, debut, fin) {

        let tabLettres = [];
        let tabMots = [];
        let syllabe1 = mot.substring(0, debut);
        for (let index = 0; index < syllabe1.length; index++) {
            tabLettres.push({ reponse: syllabe1[index], etat: 'cache', groupe: 1, lettreEnCours: '' });

        }
        tabMots.push(syllabe1);
        let syllabe2 = mot.substring(debut, fin);
        for (let index = 0; index < syllabe2.length; index++) {
            tabLettres.push({ reponse: syllabe2[index], etat: 'cache', groupe: 2, lettreEnCours: '' });
        }
         tabMots.push(syllabe2);
        if (nbCoupure === 3) {
           
            let syllabe3 = mot.substring(fin);
            for (let index = 0; index < syllabe3.length; index++) {
                tabLettres.push({ reponse: syllabe3[index], etat: 'cache', groupe: 3, lettreEnCours: '' });

            }
            tabMots.push(syllabe3);
        }
        let afficheNb = Math.floor(Math.random() * tabMots.length);
        let tabAff = tabLettres.filter(x => x.groupe === afficheNb+1);
        for (let index = 0; index < tabAff.length; index++) {
            tabAff[index].etat = 'affiche';
            
        }
     console.log(afficheNb);
        tabMots.splice(afficheNb, 1);
        return { mots: tabMots, lettres: tabLettres };



    }
}
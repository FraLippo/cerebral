import { mots } from './data';



export default class Logique {


    constructor() {

        this.listeMots = mots;
      
        this.listeDonneesJeu = [];
   
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    construireListeMots(niveau) {
        // Créer un Set pour garantir l'unicité des indices
        const indices = new Set();
        const max = this.listeMots.length;
        let nbMots = niveau === 1 ? 8 : niveau === 2 ? 6 : 4;

        // Sélectionner 5 indices uniques
        while (indices.size < nbMots) {
            indices.add(Math.floor(Math.random() * max));
        }
        let tabListeMot = [...indices].map(index => { return this.listeMots[index] });

        if (niveau === 1) {
            this.listeDonneesJeu = [this.couperMot(2, tabListeMot[0], 3, 3), this.couperMot(2, tabListeMot[1], 4, 4), this.couperMot(2, tabListeMot[2], 3, 3), this.couperMot(2, tabListeMot[3], 4, 4), this.couperMot(2, tabListeMot[4], 5, 5),
            this.couperMot(2, tabListeMot[5], 5, 5), this.couperMot(2, tabListeMot[6], 5, 5), this.couperMot(3, tabListeMot[7], 3, 6)];

        }
        if (niveau === 2) {
            this.listeDonneesJeu = [this.couperMot(2, tabListeMot[0], 5, 5), this.couperMot(2, tabListeMot[1], 5, 5), this.couperMot(3, tabListeMot[2], 3, 6), this.couperMot(3, tabListeMot[3], 3, 6), this.couperMot(3, tabListeMot[4], 3, 6), this.couperMot(2, tabListeMot[5], 3, 6)];

        }
        if (niveau === 3) {
            this.listeDonneesJeu = [this.couperMot(3, tabListeMot[0], 3, 6), this.couperMot(3, tabListeMot[1], 3, 6), this.couperMot(2, tabListeMot[2], 3, 6, false), this.couperMot(3, tabListeMot[3], 3, 6, false)];

        }
        if (niveau >= 4) {
            this.listeDonneesJeu = [this.couperMot(2, tabListeMot[0], 3, 6), this.couperMot(3, tabListeMot[1], 3, 6, false), this.couperMot(2, tabListeMot[2], 3, 6, false), this.couperMot(3, tabListeMot[3], 3, 6, false)];

        }


    }

    couperMot(nbCoupure, mot, debut, fin, affiche = true) {
        let tabLettres = [];
        let tabMots = [];
        let syllabe1 = mot.substring(0, debut);
        for (let index = 0; index < syllabe1.length; index++) {
            tabLettres.push({ reponse: syllabe1[index], etat: 'cache', groupe: 1, lettreEnCours: '' });

        }
        tabMots.push({ syllabe: syllabe1, etat: 'nul' });
        let syllabe2 = nbCoupure === 2 ? mot.substring(debut) : mot.substring(debut, fin);
        for (let index = 0; index < syllabe2.length; index++) {
            tabLettres.push({ reponse: syllabe2[index], etat: 'cache', groupe: 2, lettreEnCours: '' });
        }
        tabMots.push({ syllabe: syllabe2, etat: 'nul' });
        if (nbCoupure === 3) {

            let syllabe3 = mot.substring(fin);
            for (let index = 0; index < syllabe3.length; index++) {
                tabLettres.push({ reponse: syllabe3[index], etat: 'cache', groupe: 3, lettreEnCours: '' });

            }
            tabMots.push({ syllabe: syllabe3, etat: 'nul' });
        }
        if (affiche) {
            let afficheNb = Math.floor(Math.random() * tabMots.length);
            let tabAff = tabLettres.filter(x => x.groupe === afficheNb + 1);
            for (let index = 0; index < tabAff.length; index++) {
                tabAff[index].etat = 'affiche';
                tabAff[index].lettreEnCours = tabAff[index].reponse;

            }

            tabMots.splice(afficheNb, 1);
        }

        return { mots: tabMots, lettres: tabLettres };



    }
}
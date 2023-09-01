
import { mots, lettresFrequentes } from "./data";

export default class Logique {


    constructor() {
        this.infoJeu = {};
        this.tabCouleurOrigine = ['bleuLettres', 'rougeLettres', 'jauneLettres'];
        this.tabCouleur = [];

      
    }

    obtenirCouleur()
    {
        let index = this.tabCouleur[0].indexOf('L');
        return this.tabCouleur[0].substring(0,index);
    }
    tireLettre() {
        let nombre = Math.floor(Math.random() * lettresFrequentes.length);
        return lettresFrequentes[nombre];
    }

    construitsTableauLettres(nb) {
        let tabLettres = [];
        let i = 0;
        while (i < nb) {
            let l = this.tireLettre();
            if (!tabLettres.includes(l)) {
                i++;
                tabLettres.push(l);
            }
        }
        return tabLettres;
    }

    construitListeMot(tabLettres) {
        let tabMots = [];
        for (let index = 0; index < mots.length; index++) {
            const mot = mots[index];
            var contientLettres = tabLettres.every(function (lettre) {
                return mot.includes(lettre);
            });
            if (contientLettres) {
                tabMots.push(mot);
            }

        }
        return tabMots;
    }

    construitJeuMots(nbLettres, nbMots) {
        let lesMots = [];
        let lettres = [];
        do {
            lettres = this.construitsTableauLettres(nbLettres);
            
            lesMots = this.construitListeMot(lettres);

        } while (lesMots.length < nbMots)
        let tabMots = [];
        let i = 0;
        while (i < nbMots) {
            let nombre = Math.floor(Math.random() * lesMots.length);
            if (!tabMots.includes(lesMots[nombre])) {
                tabMots.push(lesMots[nombre]);
                i++;
            }
        }
        this.infoJeu.tabMots = tabMots;
        this.infoJeu.lettres = lettres;
        
    }

    construitTableauMots() {
        
        let tabMotInfo = [];
       


        for (let j = 0; j < this.infoJeu.tabMots.length; j++) {
            const mot = this.infoJeu.tabMots[j].split('');
            let nouveauMot = mot.map(l => { return { lettre: l, couleur: '' } })
            for (let index = 0; index < this.infoJeu.lettres.length; index++) {
                const lettre = this.infoJeu.lettres[index];
                const couleur = this.tabCouleur[index];
                for (let k = 0; k < mot.length; k++) {
                    const l = nouveauMot[k].lettre;
                    if (lettre === l) {
                        nouveauMot[k].couleur = couleur;
                    }
                }
            }
            tabMotInfo.push(nouveauMot);
        }
        this.infoJeu.tabMotsInfo = tabMotInfo;
    
    }

    creerJeu(nbLettres, nbMots)
    {
        this.infoJeu = {};
        this.tabCouleur = this.tabCouleurOrigine.slice(0,nbLettres);
        this.construitJeuMots(nbLettres, nbMots);
        this.construitTableauMots();
    }

}
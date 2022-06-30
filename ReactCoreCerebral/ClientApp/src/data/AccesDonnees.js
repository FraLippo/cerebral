import donneesJeuxMah from './donneeJeuxMahJong';
import donneesjeuxDessin from './donneesJeuxMemoire';
import donneesJeuxCompte from './donneesJeuxCompte';
import donneesJeuxEsp from './donneesJeuxEsp';
import donneesJeuxOrdre from './donneesJeuxOrdre';
import donneesJeuxPuzzle from './donneesJeuxPuzzle';
import donneesJeuxRotation from './donneesJeuxPuzzleRotation';
import donneesJeuxSuite from './donneesJeuxSuite';
import donneesJeuxPyramide from './donneesJeuxPyramide';
import donneesJeuxTri from './donneesJeuxTri';
import donneesJeuxFamille from './donneesJeuxFamille';
import donneesJeuxBingo from './donneesJeuxBingo';
import donneesJeuxFubuki from './donneesJeuxFubuki';
import donneesJeuxMath from './donneesJeuxMath';
import donneesJeuxMemoryGame from './donneesJeuxMemoryGame';
import donneesJeuxSimon from './donneesJeuxSimon';
import donneesJeuxConcours from './donneesJeuxConcours';
import donneesConcoursCerebral from './donneesConcoursCerebral';
import donneesConcoursCalcul from './donneesConcoursCalcul';
import donneesConcoursMot from './donneesConcoursMot';
import { readLocalStorage } from '../components/commun/localStorage';



export default class AccesDonnees {
    constructor(nom, id) {
        this.id = id;
        this.nom = nom;
        if (id < 10000) {
            const fichier = AccesDonnees.obtenirFichier(this.nom);
            this.donnees = fichier.find(x => x.id === id);
            this.concours = false;
    
        }
        else {
            this.donnees = donneesJeuxConcours.find(x => x.id === id);
            this.concours = true;
        }

    }


    static obtenirFichier(nom) {
        switch (nom) {
            case 'jeuxMahJong':
                return donneesJeuxMah;
            case 'jeuxMemoireDessin':
                return donneesjeuxDessin;
            case 'jeuxCompte':
                return donneesJeuxCompte;
            case 'jeuxEsp':
                return donneesJeuxEsp;
            case 'jeuxOrdre':
                return donneesJeuxOrdre
            case 'jeuxPuzzle':
                return donneesJeuxPuzzle;
            case 'jeuxPuzzleRotation':
                return donneesJeuxRotation;
            case 'jeuxSuite':
                return donneesJeuxSuite;
            case 'jeuxTri':
                return donneesJeuxTri;
            case 'jeuxFamille':
                return donneesJeuxFamille;
            case 'jeuxBingo':
                return donneesJeuxBingo;
            case 'jeuxPyramide':
                return donneesJeuxPyramide;
            case 'jeuxFubuki':
                return donneesJeuxFubuki;
            case 'jeuxMath':
                return donneesJeuxMath;
            case 'jeuxSimon':
                return donneesJeuxSimon;
            case 'jeuxMemoryGame':
                return donneesJeuxMemoryGame;
            case 'defiCalcul':
                return donneesConcoursCalcul;
            case 'defiCerebral':
                return donneesConcoursCerebral;
            case 'defiMot':
                return donneesConcoursMot;

            default:
                break;
        }

    }



    static obtenirInfoJeux(nom) {
        const fichier = AccesDonnees.obtenirFichier(nom);
        return fichier.map(x => ({ id: x.id, titre: x.titre }));
    }

    obtenirProchainJeu() {
        const dejaFaitMemoire = readLocalStorage(this.nom);
        const listeJeux = AccesDonnees.obtenirInfoJeux(this.nom);
        let pos = listeJeux.findIndex(x => x.id === this.id);
        for (let index = pos; index < listeJeux.length; index++) {
            const element = listeJeux[index];

            if (!dejaFaitMemoire.includes(element.id)) {
                return element;
            }

        }
        return 0;
    }
}
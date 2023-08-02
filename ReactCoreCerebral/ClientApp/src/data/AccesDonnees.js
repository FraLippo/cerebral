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
import donneesJeuxBinero from './donneesJeuxBinero';
import donneesJeuxPicross from './donneeesJeuxPicross';
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
            case 'jeuxmahjong':
                return donneesJeuxMah;
            case 'jeuxmemoiredessin':
                return donneesjeuxDessin;
            case 'jeuxcompte':
                return donneesJeuxCompte;
            case 'jeuxesp':
                return donneesJeuxEsp;
            case 'jeuxordre':
                return donneesJeuxOrdre
            case 'jeuxpuzzle':
                return donneesJeuxPuzzle;
            case 'jeuxpuzzlerotation':
                return donneesJeuxRotation;
            case 'jeuxsuite':
                return donneesJeuxSuite;
            case 'jeuxtri':
                return donneesJeuxTri;
            case 'jeuxfamille':
                return donneesJeuxFamille;
            case 'jeuxbingo':
                return donneesJeuxBingo;
            case 'jeuxpyramide':
                return donneesJeuxPyramide;
            case 'jeuxfubuki':
                return donneesJeuxFubuki;
            case 'jeuxmath':
                return donneesJeuxMath;
            case 'jeuxsimon':
                return donneesJeuxSimon;
            case 'jeuxmemorygame':
                return donneesJeuxMemoryGame;
            case 'picross':
                return donneesJeuxPicross;
            case 'binero':
                return donneesJeuxBinero;
            case 'deficalcul':
                return donneesConcoursCalcul;
            case 'deficerebral':
                return donneesConcoursCerebral;
            case 'defimot':
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
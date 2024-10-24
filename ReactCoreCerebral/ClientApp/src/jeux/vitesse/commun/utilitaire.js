import { tab } from "@testing-library/user-event/dist/tab";
import { type } from "@testing-library/user-event/dist/type";

function verifierStatus(status) {
    if (status === 401) {
        alert("Désolé, vous devez être authentifié pour accèder à cette page.")
        window.location.href = "/";
        return false;
    }
    if (status === 403 || status === 404) {
        alert("Désolé, vous n'avez plus accès à cette page.")
        window.location.href = "/";
        return false;
    }
    return true;
}


function nomType(type) {

    switch (type) {
        case "vitessecouleur":
            return "Reconnaissance des couleurs";
        case "vitessesolitaire":
            return "La tuile solitaire";
        case "vitesseordre":
            return "Les nombres en ordre";
        case "vitesseintrus":
            return "Supprimer les images différentes";
        case "vitessepaire":
            return "Se souvenir de l'image précedente";
        case "vitessecalcul":
            return "La grille de calcul mental";
        case "vitesseoperation":
            return "Les 4 opérations";
        case "vitessechemin":
            return "Retrouver son chemin";
        case "vitesseburger":
            return "Préparer des burgers";
        case "vitesselettres":
            return "Lettres manquantes";
        case "vitessenotes":
            return "L'oreille musicale";
        case "vitessememoire":
            return "Se souvenir des cercles";
        case "vitesseecrire":
            return "La dactylographie";
        case "vitessezoo":
            return "Le zoo";
        case "vitessetresor":
            return "La chasse au trésor";
        case "vitesseaddition":
            return "L'addition XOR";
        case "vitesseforme":
            return "Mémoire des formes";
        case "vitessematch":
            return "Former des paires";
        case "vitesserecensement":
            return "Le recensement";
        case "vitessepanneauroutier":
            return "Le code de la route";
        case "vitessecercle":
            return "Les cercles de mots";
        case "vitessenombre":
            return "Mémoire des nombres";
        case "vitessememory":
            return "Memory";
        case "vitessetresse":
            return "Jeu du peintre";
        case "vitesseboogle":
            return "Le boogle";
        case "vitessearithmetique":
            return "Les nombres en désordre";
        case "vitessecomplet":
            return "Pièce puzzle";
        case "vitessetaquin":
            return "Le taquin";
        case "vitessemonnaie":
            return "La monnaie";
        case "vitessebonneteau":
            return "Le bonneteau";
            case "vitessefusee":
                return "La fusée";
        default:
            return "";
    }
}


let tabJeu = ["vitesseaddition", "vitesseburger", "vitessecouleur", "vitessesolitaire", "vitesseordre", "vitesseintrus", "vitesserecensement"
    , "vitessematch", "vitessecomplet", "vitessebonneteau",
    "vitessecercle", "vitesselettres", "vitesseboogle",
    "vitessechemin", "vitessetresor", "vitessetresse", "vitessetaquin","vitessefusee",
    "vitesseoperation", "vitessecalcul", "vitessearithmetique", "vitessemonnaie",
    "vitesseecrire", "vitessenotes", "vitessepanneauroutier",
    "vitessememoire", "vitesseforme", "vitessenombre", "vitessememory", "vitessepaire"]

let typeJeu = ['r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'l', 'l', 'l', 'p','p', 'p', 'p', 'p', 'c', 'c', 'c', 'c', 'd', 'd', 'd', 'm', 'm', 'm', 'm', 'm']

let tabCategorie = ["test-memoire", "test-concentration", "test-calcul", "test-lettres", "test-culture", "test-planification"]

function lienVersCategorie(nomJeu) {

    let index = tabJeu.findIndex(x => x === nomJeu);
    let type = typeJeu[index];
    switch (type) {
        case 'm':
            return tabCategorie[0];
        case 'r':
            return tabCategorie[1];
        case 'c':
            return tabCategorie[2];
        case 'l':
            return tabCategorie[3];
        case 'd':
            return tabCategorie[4];
        case 'p':
            return tabCategorie[5];
    }
}

function lienAutresJeux(jeu) {

    let index = tabJeu.findIndex(x => x === jeu);
    let tabListeJeux = [];
    let type = '';
    if (index !== -1) {
        type = typeJeu[index];
        for (let i = 0; i < tabJeu.length; i++) {
            if (typeJeu[i] === type) {
                tabListeJeux.push({ lien: tabJeu[i], nom: nomType(tabJeu[i]) });
            }

        }
    }

    return { groupe: type === 'm' ? 'Mémoire' : type === 'l' ? 'Lettres et mots' : type === 'c' ? 'Calcul' : 'Réflexion', tabListeJeux }
}

export { verifierStatus, nomType, tabJeu, lienAutresJeux, typeJeu, lienVersCategorie };
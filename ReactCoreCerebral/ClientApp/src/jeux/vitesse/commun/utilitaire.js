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
        case "vitessechasse":
            return "La chasse des mots";
        case "vitessebataille":
            return "La bataille navale";
        case "vitessealz":
            return "Mémoire longue";
        case "vitesselangue":
            return "La politesse";
        case "vitessecoupe":
            return "Les mots coupés";
            case "vitessebinero":
            return "Binero";
             case "vitessemotus":
            return "Motus";
        default:
            return "";
    }
}


let tabJeu = ["vitesseaddition", "vitesseburger", "vitessecouleur", "vitessesolitaire", "vitesseordre", "vitesseintrus", "vitesserecensement"
    , "vitessematch", "vitessecomplet", "vitessebonneteau","vitessebinero",
    "vitessecercle", "vitesselettres", "vitesseboogle", "vitessechasse", "vitessecoupe","vitessemotus",
    "vitessechemin", "vitessetresor", "vitessetresse", "vitessetaquin", "vitessefusee", "vitessebataille",
    "vitesseoperation", "vitessecalcul", "vitessearithmetique", "vitessemonnaie",
    "vitesseecrire", "vitessenotes", "vitessepanneauroutier", "vitesselangue",
    "vitessememoire", "vitesseforme", "vitessenombre", "vitessememory", "vitessepaire", "vitessealz"]

let typeJeu = ['r','r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'l', 'l', 'l', 'l', 'l','l', 'p', 'p', 'p', 'p', 'p', 'p', 'c', 'c', 'c', 'c', 'd', 'd', 'd', 'd', 'm', 'm', 'm', 'm', 'm', 'm']

let tabCategorie = ["test-memoire", "test-concentration", "test-calcul", "test-lettres", "test-culture", "test-planification"]
let tabCategorie2 = ["memoire", "concentration", "calcul", "vocabulaire", "culture", "planification"]



function lienVersCategorie(nomJeu, utilisation) {
    let categorie = [];
    let type = '';
    if (utilisation === 'lien')
    {
        categorie = tabCategorie;   
         let index = tabJeu.findIndex(x => x === nomJeu);   
         type = typeJeu[index];
    }
    else
    {
        categorie = tabCategorie2;
        type = nomJeu;
    }

 
    switch (type) {
        case 'm':
            return categorie[0];
        case 'r':
            return categorie[1];
        case 'c':
            return categorie[2];
        case 'l':
            return categorie[3];
        case 'd':
            return categorie[4];
        case 'p':
            return categorie[5];
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


function obtenirInfoCategorie(categorie)
{

        if (categorie === 'm') {

            return {
                max : 560,
            message : 'Ta capacité de mémorisation est '
            }
        } else if (categorie === 'l') {
             return {
                max : 530,
            message : 'Ton aptitude verbale est '
            }
        }
        else if (categorie === 'p') {
             return {
                max : 535,
            message : 'Ta capacité de planification est '
            }
          
        }
        else if (categorie === 'c') {
                  return {
                max : 350,
            message : 'Ta capacité de calcul est '
            }
          
        }
        else if (categorie === 'r') {
             return {
                max : 820,
            message : 'Ta capacité de concentration est '
            }
           
        }
        else if (categorie === 'd') {
             return {
                max : 220,
            message : 'Ton aptitude culturelle est '
            }
          
        }
    }

function    creerMsgResultat(pourcentage) {
        if (pourcentage < 25) return 'faible';
        else if (pourcentage < 50) return 'satisfaisante';
        else if (pourcentage < 75) return 'bonne';
        else if (pourcentage< 100) return 'excellente';
        else if (pourcentage = 100) return 'exceptionnelle';
    }

export { verifierStatus, nomType, tabJeu, lienAutresJeux, typeJeu, lienVersCategorie, obtenirInfoCategorie, creerMsgResultat };
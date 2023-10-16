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
        case "vitessepanneaux":
            return "Les panneaux routiers";
        case "vitessetresor":
            return "La chasse au trésor";
        case "vitesseaddition":
            return "L'addition XOR";
            case "vitesseforme":
                return "Mémoire des formes";
    




        default:
            return "";
    }
}
let tabJeu = ["vitessememoire", "vitessenotes", "vitesselettres", "vitesseburger", "vitessecouleur", "vitessesolitaire", "vitesseordre", "vitesseintrus", "vitessepaire", "vitessecalcul", "vitesseoperation", "vitessechemin", "vitesseecrire", "vitessepanneaux", "vitessetresor", "vitesseaddition", "vitesseforme"]

export { verifierStatus, nomType, tabJeu };
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
        case "vitesseCouleur":
            return "Reconnaissance des couleurs";
        case "vitesseSolitaire":
            return "La tuile solitaire";
        case "vitesseOrdre":
            return "Les nombres en ordre";
        case "vitesseIntrus":
            return "Supprimer les images différentes";
        case "vitessePaire":
            return "Se souvenir de l'image précedente";
        case "vitesseCalcul":
            return "La grille de calcul mental";
        case "vitesseOperation":
            return "Les 4 opérations";
        case "vitesseChemin":
            return "Retrouver son chemin";
        case "vitesseBurger":
            return "Préparer des burgers";
        case "vitesseLettres":
            return "Lettres manquantes";
        case "vitesseNotes":
            return "L'oreille musicale";
        case "vitesseMemoire":
            return "Se souvenir des cercles";



        default:
            return "";
    }
}
let tabJeu = ["vitesseMemoire", "vitesseNotes", "vitesseLettres", "vitesseBurger", "vitesseCouleur", "vitesseSolitaire", "vitesseOrdre", "vitesseIntrus", "vitessePaire", "vitesseCalcul", "vitesseOperation", "vitesseChemin"]

export { verifierStatus, nomType, tabJeu };
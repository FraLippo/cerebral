export default class LogiqueCompte {

    static estBonnePlaceCarte(place) {
        place = place % 5;
        return place === 0 || place === 2 
    }

    static estBonnePlaceOperation(place) {
        place = place % 5;
        return place === 1
    }

    static estBonnePlaceResultat(place) {
        place = place % 5;
        return place === 4
    }

    static estBonnePlaceEgal(place) {
        place = place % 5;
        return place === 3
    }

    static rechercheOperation(type) {
        let valeur = "";
        switch (type) {
            case "addition":
                valeur = "+";
                break;
            case "soustraction":
                valeur = "-";
                break;
            case "multiplication":
                valeur = "x";
                break;
            case "division":
                valeur = "/";
                break;
            default:
                break;
        }
        return valeur;
    }

    static ajoutEgal(tabResultat) {
        const position = tabResultat.length % 5;
        let egal = null;
        if (position === 3) {
            egal = {
                type: "operation",
                valeur: '=',
                position: tabResultat.length
            }
            tabResultat.push(egal);
            return LogiqueCompte.ajoutResultat(tabResultat);
        }
        return 0;
    }

    static ajoutResultat(tabResultat) {
        const position = tabResultat.length % 5;
        let valeur = 0;
        let resultat = null;

        if (position === 4) {
            const val1 = parseInt(tabResultat[tabResultat.length - 4].valeur);
            const val2 = parseInt(tabResultat[tabResultat.length - 2].valeur);

            switch (tabResultat[tabResultat.length - 3].valeur) {
                case "+":
                    valeur = val1 + val2;
                    break;
                case "-":
                    valeur = val1 - val2;
                    break;
                case "x":
                    valeur = val1 * val2;
                    break;
                case "/":
                    valeur = val1 / val2;
                    break;
                default:
                    break;
            }
        }
        if (valeur !== Math.round(valeur)) {
            return -1;
        }
        else if (valeur <= 0) {
            return -2;
        }
        else if (valeur > 9999)
        {
            return -3;
        }
        else

            resultat = {
                type: "resultat",
                valeur: valeur,
                position: tabResultat.length
            }
        tabResultat.push(resultat);
        return valeur;
    }
}




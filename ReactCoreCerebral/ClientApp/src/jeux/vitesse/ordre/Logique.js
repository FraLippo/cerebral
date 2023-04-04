



export default class Logique {

    //tirage au sort de 10 valeurs entre 1 et 100 dans l'ordre croissant sans doublon et les stocke dans un tableau
    tirageNombre() {
        let tab = [];
        let i = 0;
        while (i < 10) {
            let valeur = Math.floor(Math.random() * 100) + 1;
            if (tab.indexOf(valeur) === -1) {
                tab.push(valeur);
                i++;
            }
        }
        //trie le tableau dans l'ordre croissant
        tab.sort((a, b) => a - b);
        console.log(tab);
        return tab;
    }

    //tirage de 10 emplacements {x,y} aléatoires sans doublon et les stocke dans un tableau
    tirageEmplacement() {
        let tab = [];
        let i = 0;
        while (i < 10) {
            let x = Math.floor(Math.random() * 10) + 1;
            let y = Math.floor(Math.random() * 8) + 1;
            let emplacement = { x, y };
            if (tab.findIndex(function (point) {
                return x === point.x && y === point.y;
            }) === -1) {
                tab.push(emplacement);
                i++;
            }
        }
        console.log(tab)
        return tab;
    }
    //tirage de 10 couleurs aléatoires  et les stocke dans un tableau
    tirageCouleur() {
        let tab = [];
        let i = 0;
        while (i < 10) {
            let couleur = Math.floor(Math.random() * 3);
            switch (couleur) {
                case 0:
                    couleur = "rouge";
                    break;
                case 1:
                    couleur = "vert";
                    break;
                case 2:
                    couleur = "jaune";
                    break;
                default:
                    couleur = "jaune";
                    break;

            }
            tab.push(couleur);
            i++;
        }
        return tab;
    }

    tirageForme() {
        let tab = [];
        let i = 0;
        while (i < 10) {
            let forme = Math.floor(Math.random() * 2);
            switch (forme) {
                case 0:
                    forme = "cercle";
                    break;
                case 1:
                    forme = "carre";
                    break;
                default:
                    forme = "cercle";
                    break;
            }
            tab.push(forme);
            i++;
        }
        return tab;
    }
    //création d'un tableau de 10 objets avec les valeurs tirées au sort
    creerDonnees(nbPion) {
        let tabNombre = this.tirageNombre();
        let tabEmplacement = this.tirageEmplacement();
        let tabCouleur = this.tirageCouleur();
        let tabForme = this.tirageForme();

        let tabDonnees = [];
        for (let i = 0; i < nbPion; i++) {
            let donnee = {
                x: tabEmplacement[i].x,
                y: tabEmplacement[i].y,
                forme: tabForme[i],
                couleur: tabCouleur[i],
                valeur: tabNombre[i],
                ordre: i,
                emplacement: -1
            };
            tabDonnees.push(donnee);
        }
        return tabDonnees;
    }




    EstCorrect(tabReponse, tabDonnees) {
        if (tabReponse.length !== tabDonnees.length) return null;

        let i = 0;
        while (i < tabReponse.length - 1 && tabReponse[i + 1] > tabReponse[i]) {
            i++;
        }

        return i === tabReponse.length - 1;

    }
    nombrePionsTries(tabReponse) {
        let i = 0;
        while (i < tabReponse.length - 1 && tabReponse[i + 1] > tabReponse[i]) {
            i++;
        }

        return tabReponse.length === 0 ? 0 : i + 1;

    }


}


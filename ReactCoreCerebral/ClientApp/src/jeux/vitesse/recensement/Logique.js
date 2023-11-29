export default class Logique {

    constructor(tabGrille, tabLettres, long, larg) {
        this.tabGrille = tabGrille;
        this.long = long;
        this.larg = larg;
        this.tabLettres = tabLettres;

    }

    tirageAuSort() {
        let tabColonne = ['B', 'C', 'D', 'E', 'F', 'G'];
        let tabLigne = [2, 3, 4, 5, 6, 7];
        const noCol = Math.floor(Math.random() * tabColonne.length);
        const noLigne = Math.floor(Math.random() * tabLigne.length);
        return { x: tabColonne[noCol], y: tabLigne[noLigne] };

    }



    retourneEmplacement(no) {
        let x = (no % this.long) - 1;
        let y = Math.floor(no / this.larg);
        return { x: String.fromCharCode(x + 65), y }
    }

    retourneCase(x, y) {

        return (x.charCodeAt(0) - 65) + 1 + (y * this.long);
    }

    retourneCaseFausse(no) {
        let tirage = 0;
        do {
            tirage = Math.floor(Math.random() * this.tabLettres.length);
        } while (this.tabGrille[no] === this.tabLettres[tirage])

        return this.tabLettres[tirage];
    }

    choixReponse(no) {
        const hasard = Math.floor(Math.random() * 10) + 1;
        if (hasard > 5) {
            return { caractere: this.retourneCaseFausse(no), resultat: false }
        }
        else {
            return { caractere: this.tabGrille[no], resultat: true }
        }
    }

    ReponseVraiFauxCase() {

        let { x, y } = this.tirageAuSort();
        let reponse = this.choixReponse(this.retourneCase(x, y));
        let question = "La case " + x + y + " contient le caractère " + reponse.caractere;
        return { question, reponse: reponse.resultat };
    }

    ReponseVraiFauxCaseGaucheDroite() {

        let { x, y } = this.tirageAuSort();
        const hasard = Math.floor(Math.random() * 10) + 1;
        let noCase = this.retourneCase(x, y)
        let direction = '';
        let decale = noCase;
        if (hasard > 5) {

            decale++;
            direction = 'droite'
        }
        else {
            decale--;
            direction = 'gauche'
        }
        let reponse = this.choixReponse(decale);
        let question = "La case à " + direction + " de la case " + x + y + " contient le caractère " + reponse.caractere;
        return { question, reponse: reponse.resultat };
    }

    RechercheLigneColonne(caractere) {
        let elementCol, elementLigne;
        let tabLigne = [];
        let tabColonne = [];
        let x, y;
        for (let i = 0; i < this.long; i++) {
            for (let j = 0; j < this.larg; j++) {
                elementCol = this.tabGrille[j * this.long + i];

                elementLigne = this.tabGrille[i * this.long + j];

                if (elementCol === caractere) {
                    ({ x, y } = this.retourneEmplacement(j * this.long + i));
                    tabColonne.push(x);
                }
                if (elementLigne === caractere) {
                    ({ x, y } = this.retourneEmplacement(i * this.long + j));
                    tabLigne.push(y);
                }

            }
        }
        return { tabLigne, tabColonne };
    }

    ReponseContenirLigneColonne(type) {
        let tabRep;
        let trouve;
        let question = '';
        do {
            let { x, y } = this.tirageAuSort();
            let cara = this.tabGrille[this.retourneCase(x, y)];
      
            let { tabLigne, tabColonne } = this.RechercheLigneColonne(cara);

            trouve = false;
            const hasard = Math.floor(Math.random() * 10) + 1;
            if (hasard > 15 && type === 'ligne') {
                question = "Indique une ligne qui contient le caractère " + cara;
                tabRep = tabLigne;
                if (tabLigne.length > 0) {
                    trouve = true;
                }
            }
            else if (hasard > 15 && type === 'colonne') {
                question = "Indique une colonne qui contient le caractère " + cara;
                tabRep = tabColonne;
                if (tabColonne.length > 0) {
                    trouve = true;
                }
            }
            else if (hasard > 0 && type === 'colonne') {
                question = "Indique une colonne qui ne contient pas le caractère " + cara;
                tabRep = [];
                let tableauSansDoublons = [...new Set(tabColonne)];
       
                if (tableauSansDoublons.length > 0) {
                    for (let index = 0; index < this.larg - 1; index++) {
                        if (tableauSansDoublons.findIndex(x => x === String.fromCharCode(index + 65)) === -1) {
                            tabRep.push(String.fromCharCode(index + 65));
                        }

                    }
                }
                if (tabRep.length !== 0)  {
                    trouve = true;
                }
            }
            else if (hasard > 0 && type === 'ligne') {
                question = "Indique une ligne qui ne contient pas le caractère " + cara;
                let tableauSansDoublons = [...new Set(tabLigne)];
                tabRep = [];
                if (tableauSansDoublons.length > 0) {
                    for (let index = 0; index < this.long -1; index++) {
                        if (tableauSansDoublons.findIndex(x => x === index + 1) === -1) {
                            tabRep.push(index + 1)
                        }
                    }
                }
      
                if (tabRep.length !== 0) {
                    trouve = true;
                }
            }
        } while (!trouve)
        return { question, reponse: tabRep };
    }

    ReponseContenirNombre(type) {
        let { x, y } = this.tirageAuSort();
        let lettre = this.tabGrille[this.retourneCase(x, y)];
        let nb = 0;
        let question = '';
        if (type === 'ligne') {
            let ligne = y * this.larg;
            for (let index = 0; index < this.larg; index++) {
                const element = this.tabGrille[ligne + index];
                if (element === lettre) {
                    nb++;
                }
            }
            question = "Combien de fois " + lettre + " est présent dans la ligne " + y + " ?"
        }
     
        if (type === 'colonne') {
            let col = (x.charCodeAt(0) - 65) + 1
            for (let index = 0; index < this.long; index++) {
                const element = this.tabGrille[index * this.long + col];
                if (element === lettre) {
                    nb++;
                }
            }
            question = "Combien de fois " + lettre + " est présent dans la colonne " + x + " ?"
        }
     

        return { question, reponse: nb };
    }

}
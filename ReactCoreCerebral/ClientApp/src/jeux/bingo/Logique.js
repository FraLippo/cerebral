import AccesDonnees from '../../data/AccesDonnees';
import intl from 'react-intl-universal';

export default class Logique extends AccesDonnees {


    constructor(id) {
        super('jeuxBingo', id)
        if (this.donnees !== undefined) {
            this.nbJoueurs = this.donnees.info.nbJoueurs;
            this.taille = this.donnees.info.taille;
            this.nombreMax = this.donnees.info.nombreMax;
            this.intervalle = this.donnees.info.intervalle;
            this._grilles = [];
            for (let index = 0; index < this.nbJoueurs + 1; index++) {
                this._grilles.push(this.construireTableau(this.taille, this.nombreMax));
            }
            this._numerosDejaTires = [];
            this._grillesOrdinateur = this._grilles.slice(1, this._grilles.length);
            const listePrenoms = ['William', 'Elizabeth', 'Isabella', 'Anthony', 'Joseph', 'David', 'Samuel', 'Eva', 'Lucas', 'Adam', 'Julia', 'Autumn', 'Jacob', 'Emma', 'Jade', 'Alice', 'Mila', 'Chloé', 'Penelope', 'Lina'];
            this._prenomsJoueurs = [];
            for (let index = 0; index < this.nbJoueurs; index++) {
                let nombre = Math.floor(Math.random() * listePrenoms.length);
                this._prenomsJoueurs.push(listePrenoms[nombre]);
            }
        }

    }



    get prenomsJoueurs() {
        return this._prenomsJoueurs;
    }
    get grilleHumain() {
        return this._grilles[0];
    }

    get grillesOrdinateur() {
        return this._grillesOrdinateur
    }


    get numerosDejaTires() {
        return this._numerosDejaTires;
    }

    static constructionEmplacement(index, taille) {

        let y = (Math.floor(index / taille)) + 1;
        let x = index % taille + 1;
        return {
            gridColumnStart: x,
            gridColumnEnd: x,
            gridRowStart: y,
            gridRowEnd: y,
        }
    }




    construireTableau() {
        if (this.nombreMax < this.taille * this.taille) {

            throw new Error('Pas assez de nombres pour le tableau');
        }
        let tableauJeu = [];
        let nouveauNombre = 0;

        while (tableauJeu.length < this.taille * this.taille) {

            do {
                nouveauNombre = Math.ceil(Math.random() * this.nombreMax);
                // eslint-disable-next-line no-loop-func
            } while (tableauJeu.find(x => x.nombre === nouveauNombre))

            tableauJeu.push({ nombre: nouveauNombre, couleur: 'blanc' });
        }

        return tableauJeu;
    }

    tirageNombre() {
        if (this.nombreMax === this.numerosDejaTires.length) return -1;
        let nombreTire = 0;
        do {
            nombreTire = Math.ceil(Math.random() * this.nombreMax);
            // eslint-disable-next-line no-loop-func
        } while (this.numerosDejaTires.find(x => x === nombreTire))
        this.numerosDejaTires.push(nombreTire);

        return nombreTire;
    }

    findIndex(numeroJoueur, nombre) {
        for (let index = 0; index < this.grillesOrdinateur[numeroJoueur].length; index++) {
            if (this.grillesOrdinateur[numeroJoueur][index].nombre === nombre) return index;
        }
        return -1;
    }


    miseAJourTableaux(nombre) {
        for (let index = 0; index < this.grillesOrdinateur.length; index++) {
            let j = this.findIndex(index, nombre);
            if (j !== -1) {
                this.grillesOrdinateur[index][j].couleur = 'noir';
            }
        }
    }

    constructionMessagesJoueur() {
        let messageJoueurs = [];
        for (let index = 0; index < this.nbJoueurs; index++) {
            messageJoueurs.push({ joueur: this._prenomsJoueurs[index], msg: '' })
        }
        return messageJoueurs;
    }

    messagePossibiliteOrdinateur() {
        let fin = false;

        let messagesJoueurs = this.constructionMessagesJoueur();
        for (let index = 0; index < this._grillesOrdinateur.length; index++) {

            const tabPossibilite = this.calculPossibiliteGagner(index + 1);
            const nbPossibilite = this.nombrePossibiliteGagner(tabPossibilite);
            console.log(nbPossibilite);
            const victoire = this.testGagne(tabPossibilite);
            if (victoire > 0) {
                messagesJoueurs[index].msg = messagesJoueurs[index].joueur + intl.get('BINGO_JOUEURSV');
                fin = true;
            }
            else if (nbPossibilite > 0) {
                messagesJoueurs[index].msg = nbPossibilite + (nbPossibilite === 1 ? intl.get('BINGO_CHANCE') : intl.get('BINGO_CHANCES')) + intl.get('BINGO_DEGAGNER');
            }
        }
        return { messagesJoueurs, fin };
    }


    calculPossibiliteGagner(numeroJoueur) {
        let tabPossibilite = Array(this.taille * 2).fill(0);
        const grille = this._grilles[numeroJoueur];
        for (let index = 0; index < grille.length; index++) {
            const element = grille[index];
            if (element.couleur === 'noir') {
                tabPossibilite[(index % this.taille)]++;
                tabPossibilite[parseInt(index / this.taille) + this.taille]++;
            }
        }
        return tabPossibilite

    }
    nombrePossibiliteGagner(tabPossibilite) {
        return tabPossibilite.filter(x => x === this.taille - 1).length;
    }

    testGagne(tabPossibilite) {
        return tabPossibilite.filter(x => x === this.taille).length;
    }

    finJeuLigneColonneVictoire(tabPossibilite, nouveauTableau) {
        for (let index = 0; index < tabPossibilite.length; index++) {
            const element = tabPossibilite[index];
            if (element === this.taille) {
                if (index < this.taille) {
                    for (let j = 0; j < this.taille; j++) {
                        nouveauTableau[(this.taille * j) + index].couleur = 'bleu'
                    }
                }
                else {
                    for (let j = 0; j < this.taille; j++) {
                        nouveauTableau[((index - this.taille) * this.taille) + j].couleur = 'bleu'
                    }
                }
            }

        }
        for (const ligne of tabPossibilite) {
            if (ligne === this.taille) {

            }
        }
    }

    noircirCaseOrdinateur(nombre) {
        for (let index = 0; index < this.grillesOrdinateur.length; index++) {
            let cellule = this.grillesOrdinateur[index].find(x => x.nombre === nombre);
            if (cellule !== undefined) cellule.couleur = 'noir';

        }
    }

    verificationBonNumero(id) {
        return this.numerosDejaTires.indexOf(this.grilleHumain[id].nombre) !== -1;
    }
    calculCaseManque() {
        let nb = 0;
        for (let index = 0; index < this.grilleHumain.length; index++) {
            if (!(this.grilleHumain[index].couleur === 'noir')) {
                if (this.verificationBonNumero(index)) {
                    nb++;
                }
            }
        }
        return nb;
    }
}
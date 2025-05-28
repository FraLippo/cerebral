import data from './data.js';

export default class Logique {

    constructor() {
        this.motATrouver = {};
        this.tabMotsIndices = [];
        this.reponseReference = [];
        this.tabListeMots = [];


    }

    filtrerMotsAvecLettres(mots, lettres) {
        return mots.filter(mot => !lettres.some(lettre => mot.includes(lettre)));
    }

    construireNouveauJeu() {
        this.tabListeMots = [];
       // let x = { tabMot: this.motVersTableau('RIGOLER'), mot: 'RIGOLER' };
           this.motATrouver = this.chercherMotHasard();
    
        this.reponseReference = this.motVersTableau(this.motATrouver.mot);
        this.tabMotsIndices = [];
    }

    motVersTableau(mot) {
        let lettres = mot.split('').map(lettre => lettre.toUpperCase());
        const tab = lettres.map((l, i) => {
            return {
                lettre: l,
                etat: 'init',
                pos: i
            }
        });
        return tab;
    }
    chercherMotHasard() {
        const lettresRejet = ['X', 'Y', 'Z', 'K', 'W', 'Q']
        let mots = data;
        mots = this.filtrerMotsAvecLettres(mots, lettresRejet);

        const index = Math.floor(Math.random() * mots.length);


        console.log("mot a trouver " + mots[index]);
        return { tabMot: this.motVersTableau(mots[index]), mot: mots[index] };
    }

    motEstCorrect(mot) {
        let nb = 0;


        let idexm = this.tabListeMots.find(x => mot === x.map(x => { return x.lettre }).join(''));
        if (idexm != null) {
    
            return false;
        }
        if (mot == null)
        {
            console.log(mot);
            console.log(this.motATrouver.mot)
        }
        //Mot correct s'il ne contient pas plus de 2 lettres bien placées
        for (let index = 0; index < this.motATrouver.mot.length; index++) {

          
            if (this.motATrouver.mot[index] === mot[index]) {
                nb++
            }

        }

        return nb < 3
    }

    constructionListeReponse() { //On construit les lettres bien placées
        let nbHasard = Math.floor(Math.random() * this.motATrouver.tabMot.length);
        let motTrouves = [];
        // boucle lettres bien placées
        let nb = 0;
        do {

            this.chercherMotAvecLettres(nbHasard, "bienplace");
            motTrouves = this.reponseReference.filter(x => x.etat !== 'trouve');
            nbHasard = Math.floor(Math.random() * motTrouves.length);

            nbHasard = motTrouves[nbHasard].pos;
            nb++;

        } while (nb < 2)
        //boucle lettres mal placées
        let lettresAModifier = this.reponseReference.filter(x => x.etat === 'init');
    
        nb = 0;
        // console.log("init xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
        // console.log(lettresAModifier)
        while (nb < 4 && lettresAModifier.length > 0) {
            this.chercherMotAvecLettres(lettresAModifier[0].pos, "malplace");
            lettresAModifier = this.reponseReference.filter(x => x.etat === 'init');
            nb++;
        }

        //Secours. On recommence pour les doublons en cas de problème
        if (lettresAModifier.length > 0) {
         //   console.log('MAYDAYMAYDAYMAYDAYMAYDAYMAYDAYMAYDAYMAYDAYMAYDAYMAYDAYMAYDAYMAYDAYMAYDAYMAYDAY')
            nb = 0;
            do {
                this.chercherMotAvecLettres(lettresAModifier[0].pos, "bienplace");
                lettresAModifier = this.reponseReference.filter(x => x.etat === 'init');
                nb++;

            } while (nb < 3 && lettresAModifier.length !== 0)
        }

        if (lettresAModifier.length > 0)
        {
            console.log("kkkkkkkkKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")
            this.construireNouveauJeu();
            this.constructionListeReponse();
        }
        // console.log("reference fin");
        // console.log(this.reponseReference)
        // for (let index = 0; index < this.tabListeMots.length; index++) {
        //     console.log(this.tabListeMots[index].map(x => { return x.lettre }).join(''));
        // }


    }


    chercherMotAvecLettres(nb, type) {
        let lettrePlacee = this.motATrouver.tabMot[nb];
        let motsAvecLettre = [];
        if (type === 'bienplace') {
            motsAvecLettre = data.filter(mot => mot[nb] === lettrePlacee.lettre);
            if (motsAvecLettre.length < 2) return;
        }
        else {
            motsAvecLettre = data.filter(mot =>
                mot.includes(lettrePlacee.lettre) && mot[lettrePlacee.pos] !== lettrePlacee.lettre
            );
            if (motsAvecLettre.length < 2) return;
        }
        let index = motsAvecLettre.indexOf(this.motATrouver.mot);

        if (index !== -1) {
            motsAvecLettre.splice(index, 1); // supprime 1 élément à l’index trouvé
        }

        let motCorrect = {};

        for (let index = 0; index < 3; index++) {

            let nbHasard = Math.floor(Math.random() * motsAvecLettre.length);
            motCorrect = motsAvecLettre[nbHasard];
            if (motCorrect == null)
            {
                console.log(nbHasard);
                console.log(lettrePlacee);
            }
            if (this.motEstCorrect(motCorrect)) {
                break;
            }
        }


        motCorrect = this.motVersTableau(motCorrect);
        this.construireTabIndices(motCorrect);


    }

    majTabReference(tabMot) {
        for (let index = 0; index < tabMot.length; index++) {
            if (tabMot[index].etat !== 'init') {
                if (tabMot[index].etat === 'trouve') {
                    this.reponseReference[index].etat = 'trouvé';
                }
                if (tabMot[index].etat === 'mauvais' && this.reponseReference[tabMot[index].correspondance].etat === 'init') {

                    this.reponseReference[tabMot[index].correspondance].etat = 'mauvais';
                }
            }


        }

    }

    construireTabIndices(tabMot) {
        let tabReference = this.motVersTableau(this.motATrouver.mot);

        for (let i = 0; i < tabMot.length; i++) {
            if (tabMot[i].lettre === tabReference[i].lettre) {
                tabMot[i].etat = 'trouve';
                tabReference.etat = 'trouve';

            }
            tabMot.correspondance = 0;
        }
        let tabPosition = JSON.parse(JSON.stringify(tabReference.filter(x => x.etat === 'init')));

        for (let j = 0; j < tabMot.length; j++) {
            if (tabMot[j].etat !== 'trouve') {
                if (tabPosition.length > 0) {
                    let res = tabPosition.findIndex(x => x.lettre === tabMot[j].lettre && tabMot[j].etat !== 'trouve');

                    if (res !== -1) {
                        tabMot[j].etat = 'mauvais';
                        tabMot[j].correspondance = tabPosition[res].pos;
                        tabPosition.splice(res, 1);
                    }
                }
            }
        }

        this.majTabReference(tabMot);
        this.tabListeMots.push(tabMot);


    }
}

// const motsAvec3LettresIdentiques = data.filter(mot => {
//   const compteur = {};

//   for (const lettre of mot) {
//     compteur[lettre] = (compteur[lettre] || 0) + 1;
//   }

//   return Object.values(compteur).some(count => count === 3);
// });
// console.log("Mots avec une lettre répétée exactement 3 fois :");
// console.log(motsAvec3LettresIdentiques);
// let x = data.filter(x => !motsAvec3LettresIdentiques.includes(x)
//     );
// console.log(x);
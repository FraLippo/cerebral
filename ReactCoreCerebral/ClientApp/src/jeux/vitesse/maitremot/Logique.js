import data from './data.js';

export default class Logique {

    constructor() {
        this.motATrouver = {};
        this.tabMotsIndices = [];
        this.reponseReference = [];
        this.tabListeMots = [];
       
    }

    construireNouveauJeu() {
        this.motATrouver = this.chercherMotHasard();
        this.reponseReference = this.motVersTableau(this.motATrouver.mot);
        this.tabMotsIndices = [];
    }

    motVersTableau(mot) {
        let lettres = mot.split('').map(lettre => lettre.toUpperCase());
        const tab = lettres.map((l,i) => {
            return {
                lettre: l,
                etat: 'init',
                pos : i
            }
        });
        return tab;
    }
    chercherMotHasard() {
        const mots = data;
        const index = Math.floor(Math.random() * mots.length);


        console.log("mot a trouver " + mots[index]);
        return { tabMot: this.motVersTableau(mots[index]), mot: mots[index] };
    }

    motEstCorrect(mot) {
        let nb = 0;
   
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
        let nb = 0;
        do {

            this.chercherMotAvecLettresBienPlacees(nbHasard);
            motTrouves = this.reponseReference.filter(x => x.etat !== 'trouve');
            nbHasard = Math.floor(Math.random() * motTrouves.length);
        
            nbHasard = motTrouves[nbHasard].pos;
            nb++;

        } while (nb < 3)
            
        

    }

    chercherMotAvecLettresMalPlacees(nb) {
        let lettreMalPlacee = this.motATrouver.tabMot[nb];

      let motsAvecLettre = mots.filter(mot => 
  mot.includes(lettreMalPlacee.lettre) && mot[lettreMalPlacee.pos] !== lettre
);
        let index = motsAvecLettre.indexOf(this.motATrouver.mot);

        if (index !== -1) {
            motsAvecLettre.splice(index, 1); // supprime 1 élément à l’index trouvé
        }

         this.construireTabIndices(motCorrect);

    }

    chercherMotAvecLettresBienPlacees(nb) {
        let lettreBienPlacee = this.motATrouver.tabMot[nb].lettre;

        let motsAvecLettre = data.filter(mot => mot[nb] === lettreBienPlacee);
        let index = motsAvecLettre.indexOf(this.motATrouver.mot);

        if (index !== -1) {
            motsAvecLettre.splice(index, 1); // supprime 1 élément à l’index trouvé
        }

        let motCorrect = {};
        for (let index = 0; index < 3; index++) {

            let nbHasard = Math.floor(Math.random() * this.motATrouver.tabMot.length);
            motCorrect = motsAvecLettre[nbHasard];
            if (this.motEstCorrect(motCorrect)) {
                break;
            }

        }
        motCorrect = this.motVersTableau(motCorrect);
        this.construireTabIndices(motCorrect);


    }

    majTabReference(tabMot)
    {
        for (let index = 0; index < tabMot.length; index++) {
            if (tabMot[index].etat !== 'init')
            {
                if (tabMot[index].etat === 'trouve')
                {
                    this.reponseReference[index].etat = 'trouvé';
                }
                if  (tabMot[index].etat === 'mauvais' && this.reponseReference[tabMot[index].correspondance].etat === 'init')
                {
                   
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
                    let res = tabPosition.findIndex(x => x.lettre === tabMot[j].lettre);
 
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
        console.log("reference");
        console.log(this.reponseReference);
        console.log(this.tabListeMots);

    }
}


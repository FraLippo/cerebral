import data from './data.js';

export default class Logique {

    constructor() {
        this.motATrouver = {};
        this.tabMotsIndices = [];
        this.reponseReference = [];
        this.tabListeMots = [];
        this.reponseAleatoire = [];
    
       
        // const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

        // const stats = {};

        // alphabet.forEach(lettre => {
        //     let count = 0;

        //     data.forEach(mot => {
        //         const occurrences = [...mot].filter(l => l === lettre).length;
        //         if (occurrences >= 2) {
        //             count++;
        //         }
        //     });

        //     stats[lettre] = count;
        // });

        // Affiche les résultats
     //   console.log("Nombre de mots avec une lettre doublée :");
      //  console.table(stats);

        // const motsAvecDeuxV = data.filter(mot => {
        //     const matches = mot.match(/v/gi); // 'g' pour global, 'i' pour insensible à la casse
        //     return matches && matches.length === 2;
        // });
        // const motsNonDoublons = data.filter((mot, _, arr) =>
        //     arr.filter(m => m === mot).length === 1
        // );
        // console.log(motsAvecDeuxV);
      //  console.log(motsNonDoublons);
//       const motsAvec3LettresIdentiques = data.filter(mot => {
//   const compteur = {};

//   for (const lettre of mot) {
//     compteur[lettre] = (compteur[lettre] || 0) + 1;
//   }

//   return Object.values(compteur).some(count => count === 3);
// });
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

        return { tabMot: this.motVersTableau(mots[index]), mot: mots[index] };
    }



    constructionTypeReponse() {
        let nbTrouve = 0;

        this.reponseAleatoire = JSON.parse(JSON.stringify(this.motATrouver.tabMot)).map(x => {
            x.etat = 'malplace';
            return x;
        });
        let placeIndices = 3;
        while (nbTrouve < 2) {
            let nb = Math.floor(Math.random() * (4));
            if (this.reponseAleatoire[nb].etat === 'malplace') {
                nbTrouve++;
                this.reponseAleatoire[nb].etat = 'bienplace'
            }
        }

        //on compte les doublons
        const compteur = {};
        for (const item of this.reponseAleatoire) {
            compteur[item.lettre] = (compteur[item.lettre] || 0) + 1;
        }

        for (const item of this.reponseAleatoire) {
            //On cherche des mots avec 2 lettres identiques
            if (compteur[item.lettre] > 1) {
                item.etat = item.etat + '2';

            }
            compteur[item.lettre] = 0;
        }
        // console.log(this.reponseAleatoire.map(x => { return x.etat }).join(''));
        // console.log(this.reponseAleatoire.map(x => { return x.lettre }).join(''));
    //    console.log(this.reponseAleatoire.map(x => { return x.pos }).join(''));
    }

    constructionListeReponse() {
       
        let lettresAModifier = [];
       
            this.constructionTypeReponse();
            for (let index = 0; index < this.reponseAleatoire.length; index++) {
                this.chercherMotAvecLettres(this.reponseAleatoire[index]);
                lettresAModifier = this.reponseReference.filter(x => x.etat === 'init');
                if (lettresAModifier.length === 0) break;
            }
         
         return lettresAModifier.length === 0;

    }



    chercherMotAvecLettres(lettrePlacee) {

        let motsAvecLettre = [];
      
        if (lettrePlacee.etat === 'bienplace') {
            motsAvecLettre = data.filter(mot => mot[lettrePlacee.pos] === lettrePlacee.lettre);
        }
        else if (lettrePlacee.etat === 'malplace') {
            motsAvecLettre = data.filter(mot =>
                mot.includes(lettrePlacee.lettre) && mot[lettrePlacee.pos] !== lettrePlacee.lettre
            );
        }
        else if (lettrePlacee.etat === 'bienplace2' || lettrePlacee.etat === 'malplace2') {
            const motsAvecDeux = data.filter(mot => {
                const regex = new RegExp(lettrePlacee.lettre, 'gi'); // 'g' pour global, 'i' pour insensible à la casse
                const matches = mot.match(regex);
                return matches && matches.length === 2;
            });

            if (lettrePlacee.etat === 'bienplace2') {
                motsAvecLettre = motsAvecDeux.filter(mot => mot[lettrePlacee.pos] === lettrePlacee.lettre);


            }
            else {
                motsAvecLettre = motsAvecDeux;
            }

        }
        if (motsAvecLettre.length < 3) {
            console.log("___________________________________________________________")
            return;
        }
        let index = motsAvecLettre.indexOf(this.motATrouver.mot);
 
        if (index !== -1) {

            motsAvecLettre.splice(index, 1); // supprime 1 élément à l’index trouvé
        }


        let motCorrect = {};

        let nbHasard = Math.floor(Math.random() * motsAvecLettre.length);
        motCorrect = motsAvecLettre[nbHasard];
        
        motCorrect = this.motVersTableau(motCorrect);
        this.construireTabIndices(motCorrect);


    }

    majTabReference(tabMot) {
        for (let index = 0; index < tabMot.length; index++) {
            if (tabMot[index].etat !== 'init') {
                if (tabMot[index].etat === 'trouve') {
                    this.reponseReference[index].etat = 'trouve';
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
                tabReference[i].etat = 'trouve';

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
import React, { Component } from 'react';
import Grille from './Grille';
import Liste from './Liste';
import Logique from './Logique';
import { message } from 'antd';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat';
import { Helmet } from 'react-helmet';

export default class JeuCoupe extends Component {


    constructor() {
        super();
        this.logique = new Logique();
        this.noJeu = 1;
        this.logique.construireListeMots(this.noJeu);
        this.etatEnCours = {
            etatGrille: 'nul',
            noCaseGrille: -1,
            etatListe: 'nul',
            noGroupe: -1,
            noMot: -1
        }
        this.state = {
            tabGrille: [],
            tabListe: [],
            tabVictoire: [],
            score : 0
        }
        this.fin = -1;
    }


    componentDidMount() {
        this.construireJeu();
    }

    construireJeu() {
        let tabGrille = this.construireGrille();
        let tabListe = this.construireListe();
        let tabVictoire = new Array(tabListe.length).fill(false);

        this.setState({ tabGrille, tabListe, tabVictoire });
    }

    construireGrille() {
        let tabGrille = [];
        for (let index = 0; index < this.logique.listeDonneesJeu.length; index++) {
            tabGrille.push(...this.logique.listeDonneesJeu[index].mots);
        }

        return this.logique.shuffleArray(tabGrille);
    }

    construireListe() {

        let tabListe = [];
        for (let index = 0; index < this.logique.listeDonneesJeu.length; index++) {
            tabListe.push(this.logique.listeDonneesJeu[index].lettres);
        }


        return tabListe;
    }

    etatEnCoursA0() {
        this.etatEnCours.etatListe = 'nul';
        this.etatEnCours.noGroupe = -1;
        this.etatEnCours.noMot = -1;
        this.etatEnCours.etatGrille = 'nul';
        this.etatEnCours.noCaseGrille = -1;
    }

    nouveauJeu = () => {

        this.noJeu++;
        this.fin = -1;
        this.logique.construireListeMots(this.noJeu);
        this.etatEnCoursA0();
        this.construireJeu();
    }


    verfierVictoire = (tabListe) => {

        let finLettres = tabListe[this.etatEnCours.noMot].filter(x => x.lettreEnCours === '' && x.etat !== 'affiche');

        if (finLettres.length === 0) {
            let motAVerifier = false;
            let i = 0;
            let tabLettresEnCours = tabListe[this.etatEnCours.noMot].map(x => { return x.lettreEnCours });
      
            do {
                motAVerifier = tabListe[i].every((x, j) => tabLettresEnCours[j] === x.reponse);
  
                i++;
            } while (!motAVerifier && i < tabListe.length);
            if (motAVerifier) {
           
                let tabVictoire = [...this.state.tabVictoire];
                tabVictoire[this.etatEnCours.noMot] = true;
                this.fin = this.etatEnCours.noMot;
               
                this.setState({ tabVictoire, score : this.state.score + 4 });
          
                let finJeu = tabVictoire.every(x => x === true);
           
                if (finJeu) {
                 
                    message.success('Super !',1, this.nouveauJeu);
                }

                return true;
            } else {
            
                message.error("Ce n'est pas le mot attendu.");
                this.setState({ score : this.state.score - 2 });
                return false;
            }
        }
        return false;

    }

    clicListe = (noMot, noLettre) => {
        if (this.fin === noMot) return;
        let nouveauTabListe = [...this.state.tabListe];
        let nouveauTabGrille = [...this.state.tabGrille];
        let noGroupe = this.state.tabListe[noMot][noLettre].groupe;



        if (this.state.tabListe[noMot][noLettre].etat === 'enjeu') {

            let casesGroupe = nouveauTabListe[noMot].filter(x => x.groupe === noGroupe);

            let mot = casesGroupe.map(mot => { return mot.lettreEnCours }).join('');

            let motGrille = nouveauTabGrille.filter(x => x.syllabe === mot && x.etat === 'enjeu');
            if (motGrille.length > 0) {

                motGrille[0].etat = 'nul';
            }


            for (let index = 0; index < casesGroupe.length; index++) {
                casesGroupe[index].etat = 'cache';
                casesGroupe[index].lettreEnCours = '';
            }
            let casesSel = nouveauTabListe.flat().filter(x => x.etat === 'selection');

            for (let index = 0; index < casesSel.length; index++) {
                casesSel[index].etat = 'cache';
            }
            if (this.etatEnCours.noCaseGrille != -1) {
                nouveauTabGrille[this.etatEnCours.noCaseGrille].etat = 'nul';
            }
            this.etatEnCoursA0();
        }

        else if (this.etatEnCours.etatGrille === 'nul'
            && (this.etatEnCours.etatListe === 'nul' || (this.etatEnCours.etatListe === 'selection' && (this.etatEnCours.noMot !== noMot || this.etatEnCours.noGroupe !== noGroupe)))) {

            this.etatEnCours.etatListe = 'selection';
            this.etatEnCours.noGroupe = noGroupe;
            this.etatEnCours.noMot = noMot;
            let casesSel = nouveauTabListe.flat().filter(x => x.etat === 'selection');

            for (let index = 0; index < casesSel.length; index++) {
                casesSel[index].etat = 'cache';
            }
            casesSel = nouveauTabListe[noMot].filter(x => x.groupe === noGroupe);
            for (let index = 0; index < casesSel.length; index++) {
                casesSel[index].etat = 'selection';
            }

            this.setState({ tabListe: nouveauTabListe });
        }
        else if (this.etatEnCours.etatGrille === 'nul' && (this.etatEnCours.etatListe === 'selection' && (this.etatEnCours.noMot === noMot || this.etatEnCours.noGroupe === noGroupe))) {
            this.etatEnCours.etatListe = 'nul';
            this.etatEnCours.noGroupe = -1;
            this.etatEnCours.noMot = -1;
            let casesSel = nouveauTabListe.flat().filter(x => x.etat === 'selection');
            for (let index = 0; index < casesSel.length; index++) {
                casesSel[index].etat = 'cache';
            }

        } else if (this.etatEnCours.etatGrille === 'selection') {
            this.etatEnCours.noGroupe = noGroupe;
            this.etatEnCours.noMot = noMot;
            let casesGroupe = nouveauTabListe[noMot].filter(x => x.groupe === noGroupe);

            if (nouveauTabGrille[this.etatEnCours.noCaseGrille].syllabe.length != casesGroupe.length) {
                message.error('Cela ne rentre pas !');
                return;
            }
            nouveauTabGrille[this.etatEnCours.noCaseGrille].etat = 'enjeu';
            let casesSel = nouveauTabListe.flat().filter(x => x.etat === 'selection');

            for (let index = 0; index < casesSel.length; index++) {
                casesSel[index].etat = 'cache';
            }

            for (let index = 0; index < casesGroupe.length; index++) {
                casesGroupe[index].etat = 'enjeu';
                casesGroupe[index].lettreEnCours = nouveauTabGrille[this.etatEnCours.noCaseGrille].syllabe[index];
            }
            this.verfierVictoire(nouveauTabListe);
            this.etatEnCoursA0();

        }

        this.setState({
            tabListe: nouveauTabListe,
            tabGrille: nouveauTabGrille
        });
    }

    clicGrille = (noCase) => {
        let nouveauTabGrille = [...this.state.tabGrille];
        let nouveauTabListe = [...this.state.tabListe];



        if (nouveauTabGrille[noCase].etat === 'enjeu') {

            return;
        }
        if (this.etatEnCours.etatListe === 'nul' && (this.etatEnCours.etatGrille === 'nul' || (this.etatEnCours.etatGrille === 'selection' && this.etatEnCours.noCaseGrille !== noCase))) {

            let casesSel = nouveauTabGrille.filter(x => x.etat === 'selection');
            for (let index = 0; index < casesSel.length; index++) {
                casesSel[index].etat = 'nul';
            }
            this.etatEnCours.etatGrille = 'selection';
            this.etatEnCours.noCaseGrille = noCase;

            nouveauTabGrille[noCase].etat = 'selection';


        }
        else if (this.etatEnCours.etatGrille === 'selection' && this.etatEnCours.noCaseGrille === noCase) {

            let casesSel = nouveauTabGrille.filter(x => x.etat === 'selection');
            for (let index = 0; index < casesSel.length; index++) {
                casesSel[index].etat = 'nul';
            }
            this.etatEnCours.etatGrille = 'nul';
            this.etatEnCours.noCaseGrille = -1;

        }
        else if (this.etatEnCours.etatListe === 'selection') {
            let casesGroupe = nouveauTabListe[this.etatEnCours.noMot].filter(x => x.groupe === this.etatEnCours.noGroupe);

            if (nouveauTabGrille[noCase].syllabe.length != casesGroupe.length) {
                message.error('Cela ne rentre pas');
                return;
            }
            nouveauTabGrille[noCase].etat = 'enjeu';
            let casesSel = nouveauTabListe.flat().filter(x => x.etat === 'selection');

            for (let index = 0; index < casesSel.length; index++) {
                casesSel[index].etat = 'cache';
            }

            for (let index = 0; index < casesGroupe.length; index++) {
                casesGroupe[index].etat = 'enjeu';
                casesGroupe[index].lettreEnCours = nouveauTabGrille[noCase].syllabe[index];
            }
            this.verfierVictoire(nouveauTabListe);
            this.etatEnCoursA0();


        }



        this.setState({
            tabListe: nouveauTabListe,
            tabGrille: nouveauTabGrille
        });
    }

    finTimer = () => {
        this.setState({finJeu : true});
    }
  

    render() {
        return (<div>
            <Helmet>
                <title>Les mots coupés</title>
                <meta name="description" content="Testez votre agilité avec Les mots coupés ! Assemblez des fragments pour reformer les bons mots et relevez le défi. Jouez dès maintenant ! ✂️🔡🎮" />
            </Helmet>
            {this.state.finJeu ?
                <Resultat score={this.state.score} typeExo='vitessecoupe'></Resultat> :
            <div><div className="jeuPrincipalCoupe">
                <div className="espaceGrilleCoupe">
                    <Grille tabGrille={this.state.tabGrille} clicGrille={this.clicGrille} />
                </div>
                <div className="espaceListeCoupe">
                    <Liste tabListe={this.state.tabListe} clicListe={this.clicListe} tabVictoire={this.state.tabVictoire}></Liste>
                 
                 
                </div>   </div>  
                 <div className="centre marge10"><CompteRebours temps={100} finTimer={this.finTimer}></CompteRebours></div>
                    <div className="centre  marge10">Score : {this.state.score}</div>
<div className="titre titreCouleur">Les mots coupés</div>
            </div>}
            </div>
        )
    }
}
import React, { Component } from 'react';
import Grille from './Grille';
import Liste from './Liste';
import Logique from './Logique';



export default class JeuCoupe extends Component {


    constructor() {
        super();
        this.logique = new Logique();
        this.logique.construireListeMots();
        this.etatEnCours = {
            etatGrille : 'nul',
            noCaseGrille : -1,
            etatListe : 'nul',
            noGroupe : -1
        }
        this.state = {
            tabGrille: [],
            tabListe: []
        }
    }


    componentDidMount() {
        this.construireJeu();
    }

    construireJeu() {
        let tabGrille = this.construireGrille();
        let tabListe = this.construireListe();
        this.setState({ tabGrille, tabListe });
    }

    construireGrille() {
        let tabGrille = [];
        for (let index = 0; index < this.logique.listeDonneesJeu.length; index++) {
            tabGrille.push(...this.logique.listeDonneesJeu[index].mots);

        }

        return tabGrille;
    }

    construireListe() {
        let tabListe = [];
        for (let index = 0; index < this.logique.listeDonneesJeu.length; index++) {
            tabListe.push(this.logique.listeDonneesJeu[index].lettres);

        }
   
        return tabListe;
    }

    clicListe = (noMot, noLettre) => {
        let noGroupe = this.state.tabListe[noMot][noLettre].groupe;
       
        let nouveauTabListe = [...this.state.tabListe];
        if (this.etatEnCours.etatListe ==='nul' || this.etatEnCours.etatListe ==='selection' && this.etatEnCours.noGroupe !== noGroupe)
        {
            this.etatEnCours.etatListe = 'selection';
            this.etatEnCours.noGroupe = noGroupe;
            let casesSel = nouveauTabListe[noMot].filter(x => x.etat === 'selection' );
        
            for (let index = 0; index < casesSel.length; index++) {
                casesSel[index].etat = 'cache';
            }
            casesSel = nouveauTabListe[noMot].filter(x => x.groupe === noGroupe);
            for (let index = 0; index < casesSel.length; index++) {
                casesSel[index].etat = 'selection';
            }
           
            console.log(nouveauTabListe);
            this.setState({ tabListe: nouveauTabListe });
        }
        
        
        else if (this.etatEnCours.etatListe ==='selection' && this.etatEnCours.noGroupe === noGroupe)
            {
                this.etatEnCours.etatListe = 'nul';
                this.etatEnCours.noGroupe = -1;
                let casesSel = nouveauTabListe[noMot].filter(x => x.groupe === noGroupe);
                for (let index = 0; index < casesSel.length; index++) {
                    casesSel[index].etat = 'cache';
                }
                this.setState({ tabListe: nouveauTabListe });
            }
    
    }

    render(){
        return (
            <div className="jeuPrincipalCoupe">
                <div className="espaceGrilleCoupe">
                    <Grille tabGrille={this.state.tabGrille} />
                </div>
                <div className="espaceListeCoupe">
                <Liste tabListe={this.state.tabListe} clicListe={this.clicListe}></Liste>
                </div>

            </div>
        )
    }
}
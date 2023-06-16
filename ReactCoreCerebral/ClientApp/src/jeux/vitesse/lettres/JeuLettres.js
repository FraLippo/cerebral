import React, { Component } from 'react';
import Lettres from './Lettres';
import Logique from './Logique';
import Reponse from './Reponse';
import { message, Button } from 'antd';

export default class JeuLettres extends Component {

    constructor() {
        super();
        this.alphabet = [];
        for (var i = 65; i <= 90; i++) {
            this.alphabet.push(String.fromCharCode(i));
        }
        this.jeu = new Logique();
        this.jeu.creerJeu(3, 3);
  
        this.score = 0;
        this.lettreEnCours = 0;
        this.state = {
            mots: this.jeu.infoJeu.tabMotsInfo,
            couleur: this.jeu.obtenirCouleur()
        }

    }



    clicReponse = (lettre) => {
        let nouveauTabMots = [];
        const couleur = this.jeu.obtenirCouleur();
        console.log(this.jeu.infoJeu.lettres[0])
        console.log(lettre);
        if (lettre === this.jeu.infoJeu.lettres[0]) {
            this.jeu.infoJeu.lettres.splice(0, 1);
            this.jeu.tabCouleur.splice(0, 1);
            this.jeu.construitTableauMots();
            nouveauTabMots = [...this.jeu.infoJeu.tabMotsInfo];
            this.lettreEnCours++;
            this.score += this.lettreEnCours;

            this.setState({
                mots: nouveauTabMots,
                couleur
            });
        }
        else
        {
            message.error("Ce n'est pas la bonne lettre");
            this.score--;
        }
    }

    passer = ()=>
    {
        this.jeu.creerJeu(2,3);
        let nouveauTabMots = [...this.jeu.infoJeu.tabMotsInfo];
        this.score -=2;

        this.setState({
            mots: nouveauTabMots,
        });
    
    }

    render() {


        return <React.Fragment>
            kjlk
            <div className="jeuLettres">
                {this.state.mots.map((tabLettres, i) => <div className="marge20" key={i + 1000}><Lettres tabLettres={tabLettres}></Lettres></div>)}
                <div className='centrer'>Clique sur la lettre en <b>{this.state.couleur}</b> qui est cachée.</div>
                <div className="marge20"><Reponse tabLettres={this.alphabet} clicReponse={this.clicReponse}></Reponse></div>
                <div className="marge20"><Button onClick={this.passer}>Passer</Button></div>
                <div>Passer te fait perdre 2 points</div>

            </div>

        </React.Fragment>
    }
}



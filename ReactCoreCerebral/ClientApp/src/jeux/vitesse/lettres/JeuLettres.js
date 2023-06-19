import React, { Component } from 'react';
import Lettres from './Lettres';
import Logique from './Logique';
import Reponse from './Reponse';
import { message, Button } from 'antd';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat.js';
import { analytics } from '../../../components/commun/analytics';
import { Helmet } from 'react-helmet';

export default class JeuLettres extends Component {

    constructor() {
        super();
        this.alphabet = [];
        for (var i = 65; i <= 90; i++) {
            this.alphabet.push(String.fromCharCode(i));
        }
        this.jeu = new Logique();
       
  
        this.score = 0;
        this.lettreEnCours = 0;
        this.partie = 1;
        this.nbLettres = 1;
        this.fin = false;
        this.state = {
            mots: [],
            couleur: ''
        }
        analytics();
    }
    componentDidMount()
    {
         this.jeu.creerJeu(this.nbLettres, 3);
         this.setState({
            mots: this.jeu.infoJeu.tabMotsInfo,
            couleur: this.jeu.obtenirCouleur()
        })
    }


    nouveauJeu = () =>
    {
        this.lettreEnCours = 0;
        this.partie++;
        if (this.partie === 6 || this.partie ==12)
        {
            this.nbLettres++;
        }

        this.jeu.creerJeu(this.nbLettres,3);
        let nouveauTabMots = [...this.jeu.infoJeu.tabMotsInfo];
        const couleur = this.jeu.obtenirCouleur();
        this.fin = false;
        this.setState({
            mots: nouveauTabMots,
            couleur
        });
    }

    clicReponse = (lettre) => {
        if (this.fin) return;
        let nouveauTabMots = [];
        let couleur = '';
        if (lettre === this.jeu.infoJeu.lettres[0]) {
            this.jeu.infoJeu.lettres.splice(0, 1);
            this.jeu.tabCouleur.splice(0, 1);
            this.jeu.construitTableauMots();
            nouveauTabMots = [...this.jeu.infoJeu.tabMotsInfo];
            this.lettreEnCours++;
            this.score += (this.lettreEnCours+2);
            if (this.jeu.tabCouleur.length === 0)
            {
                this.fin = true;
                message.success('bravo', 1, this.nouveauJeu)
            }
            else
            {
             couleur = this.jeu.obtenirCouleur();
            }
            this.setState({
                mots: nouveauTabMots,
                couleur, 
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
        if (this.fin) return;
        this.jeu.creerJeu(this.nbLettres,3);
        let nouveauTabMots = [...this.jeu.infoJeu.tabMotsInfo];
        this.score -=2;

        this.setState({
            mots: nouveauTabMots,
        });
    
    }
    finTimer = () =>
    {
        this.setState({
            finJeu: true
        });
    }

    render() {


        return <React.Fragment>
            <Helmet>
                    <title>Les lettres manquantes</title>
                    <meta name="description" content="Un jeu de lettres simple et très addictif, il suffit de retrouver les lettres manquantes dans les mots." />
                </Helmet>
             { this.state.finJeu ? <Resultat score={this.score} typeExo='vitesseLettres'></Resultat> :
            <div className="jeuLettres">
                {this.state.mots.map((tabLettres, i) => <div className="marge20" key={i + 1000}><Lettres tabLettres={tabLettres}></Lettres></div>)}
                <div className='centrer marge20'>Quelle est la lettre qui se cache sous le carré <b>{this.state.couleur}</b> ?</div>
                <div className="marge20"><Reponse tabLettres={this.alphabet} clicReponse={this.clicReponse}></Reponse></div>
                <div className="marge20"><Button onClick={this.passer}>Passer</Button></div>
                <div>Passer te fait perdre 2 points</div>
                <div className="centre marge10"><CompteRebours temps={120} finTimer={this.finTimer}></CompteRebours></div>

            </div>
    }
        </React.Fragment>
    }
}



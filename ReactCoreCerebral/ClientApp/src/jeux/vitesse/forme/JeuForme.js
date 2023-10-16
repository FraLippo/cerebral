import React, { Component } from 'react';
import Cartes from './Cartes';
import { Button, message } from 'antd';
import { compterElement, creationJeu, verifierElement, finJeu } from './Logique';
import Resultat from '../commun/Resultat';
import { Helmet } from 'react-helmet';

import CompteRebours from '../commun/CompteRebours';
export default class JeuForme extends Component {

    constructor() {
        super();
        this.niveau = 0;
        let { question, tabCarte } = creationJeu(this.niveau);

        console.log(question);
        this.stop = false;
        this.state =
        {
            tabCarte,
            question,
            etat: 'memorisation',
            compteurReponse: compterElement(question, tabCarte),
            score: 0,
            finJeu: false
        }

    }

    tourner = () => {
        let nouveuTabCarte = [...this.state.tabCarte];
        for (let index = 0; index < nouveuTabCarte.length; index++) {
            nouveuTabCarte[index].etat = 'cardForme flipped';

        }

        this.setState({ tabCarte: nouveuTabCarte, etat: 'jeu' });
    }

    nouveauJeu = () => {
        this.stop = false;
        this.niveau++;
        if (this.niveau > 9) this.niveau = 9;
        let { question, tabCarte } = creationJeu(this.niveau);
        this.setState({
            tabCarte, question, etat: 'memorisation',
            compteurReponse: compterElement(question, tabCarte),
        })
    }

    clicCarte = (id) => {
        if (this.stop) return
        let compteurReponse = this.state.compteurReponse;
        let score = this.state.score;
        let nouveuTabCarte = [...this.state.tabCarte];
        if (nouveuTabCarte[id].etat === 'cardForme flipped') {
            nouveuTabCarte[id].etat = 'cardForme';
            let reponse = verifierElement(this.state.question, this.state.tabCarte[id]);

            if (reponse) {
                compteurReponse--;
                if (this.niveau > 5) {
                    score += 4;
                }
                else {
                    score += 2;
                }
                if (compteurReponse === 0) {
                    message.success("Super ! Tu as réussi 🤩", 1, this.nouveauJeu);
                    this.stop = true;
                }

            } else {
                if (score - 3 > 0) {
                    score -= 3;
                }
                message.error("Mauvaise carte 🥺", .8);
            }
        }

        this.setState({ tabCarte: nouveuTabCarte, compteurReponse, score });
    }

    finTimer = () => {
        this.setState({ finJeu: true });
    }

    render() {
        return <div>
            <Helmet>
                <title>jeu cérébral : Se souvenir des formes</title>
                <meta name="description" content="Un jeu passionnant de vitesse et de mémorisation, dans ce petit jeu votre mémoire sera mise à rude épreuve, vous devrez vous souvenir d'un certain nombre de cartes le plus rapidement possible." />
            </Helmet>
            {this.state.finJeu ?
                <Resultat score={this.state.score} typeExo='vitesseforme'></Resultat> :
                <div>
                    <div className="titreJeu">Se souvenir des formes</div>
                    <div className="plateauForme">

                        <div className="centre marge10"><CompteRebours temps={60} finTimer={this.finTimer}></CompteRebours></div>

                        <div>Score : {this.state.score}</div>
                        <div className="jeuForme"><Cartes clic={this.clicCarte} tabCarte={this.state.tabCarte}></Cartes></div>
                        {this.state.etat === 'memorisation' ?
                            <div className='marge20'><Button onClick={this.tourner}><span>Mémorise {this.state.question.type === 'formecouleur' ? 'la forme et la couleur' : this.state.question.type === 'couleur' ? 'la couleur' : 'la forme'}</span></Button></div> :
                            <div>{this.state.compteurReponse <= 1 ? <div>Clique sur la carte avec l'élément :</div> : <div>Clique sur les {this.state.compteurReponse} cartes avec les élements :</div>}
                                <div className="fontMoyenne centre marge20 boldForme">
                                    {(this.state.question.type === 'formecouleur' || this.state.question.type === 'forme') && <span>{this.state.question.forme === 'carre' ? 'carré' : this.state.question.forme}</span>}
                                    {(this.state.question.type === 'formecouleur' || this.state.question.type === 'couleur') && <span className="espaceBouton">{this.state.question.couleur}</span>}
                                </div>
                            </div>

                        }

                    </div>
                    <div></div>

                </div>}</div>
    }
}
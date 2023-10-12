import React, { Component } from 'react';
import Cartes from './Cartes';
import { Button, message } from 'antd';
import { compterElement, creationJeu, verifierElement } from './Logique';

export default class JeuForme extends Component {

    constructor() {
        super();

        let { question, tabCarte } = creationJeu(0);
        console.log(question);
        this.state =
        {
            tabCarte,
            question,
            etat: 'memorisation',
            compteurReponse: compterElement(question, tabCarte),
            score : 0
        }

    }

    tourner = () => {
        let nouveuTabCarte = [...this.state.tabCarte];
        for (let index = 0; index < nouveuTabCarte.length; index++) {
            nouveuTabCarte[index].etat = 'cardForme flipped';

        }

        this.setState({ tabCarte: nouveuTabCarte, etat: 'jeu' });
    }

    clicCarte = (id) => {
        let compteurReponse = this.state.compteurReponse;
        let score = this.state.score;
        let nouveuTabCarte = [...this.state.tabCarte];
        if (nouveuTabCarte[id].etat === 'cardForme flipped') {
            nouveuTabCarte[id].etat = 'cardForme';
            let reponse = verifierElement(this.state.question, this.state.tabCarte[id]);
           
            if (reponse) {
                compteurReponse--;
                score += 2;
                if (compteurReponse=== 0)
                {
                    message.error("Super ! Tu as réussi 🤩");
                }

            } else {
                score -=3;
                message.error("Mauvaise carte 🥺");
            }
        }

        this.setState({ tabCarte: nouveuTabCarte,compteurReponse, score });
    }

    render() {
        return <div>
            <div className="titreJeu">Se souvenir des formes</div>
            <div className="plateauForme"> 
            <div>Score : {this.state.score}</div>
                <div className="jeuForme"><Cartes clic={this.clicCarte} tabCarte={this.state.tabCarte}></Cartes></div>
                {this.state.etat === 'memorisation' ?
                    <div className='marge20'><Button onClick={this.tourner}><span>Mémorise {this.state.question.type === 'formecouleur'? 'la forme et la couleur': this.state.question.type === 'couleur'? 'la couleur' : 'la forme'}</span></Button></div> :
                    <div>{this.state.compteurReponse <= 1 ? <div>Clique sur la carte avec l'élément</div> : <div>Clique sur les {this.state.compteurReponse} cartes avec les élements</div>}
                        <div className="fontMoyenne centre marge20">
                            {(this.state.question.type === 'formecouleur' || this.state.question.type === 'forme') && <span>{this.state.question.forme === 'carre' ? 'carré' : this.state.question.forme}</span>}
                            {(this.state.question.type === 'formecouleur' || this.state.question.type === 'couleur') && <span className="espaceBouton">{this.state.question.couleur}</span>}
                        </div>
                    </div>
                  
                }  
               
            </div>
            <div></div>

        </div>
    }
}
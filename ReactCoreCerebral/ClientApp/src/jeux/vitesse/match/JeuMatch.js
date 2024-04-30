import React, { Component } from 'react';
import Grille from './Grille';
import { message } from 'antd';
import Resultat from '../commun/Resultat';
import CompteRebours from '../commun/CompteRebours';
import { Helmet } from 'react-helmet';
export default class JeuMatch extends Component {

    constructor() {
        super();
        this.numero = 1;
        this.state = {
            tabGrille: this.construireJeu(),
            score: 0,
            afficheRebours: true
        };
    }


    construireJeu() {
        let tabGrillePositions = [{ x: 4, y: 1 }, { x: 5, y: 1 },
        { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 },
        { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 },
        { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 }, { x: 7, y: 4 }, { x: 8, y: 4 },
        { x: 4, y: 7 }, { x: 5, y: 7 },
        { x: 3, y: 6 }, { x: 4, y: 6 }, { x: 5, y: 6 }, { x: 6, y: 6 },
        { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 },

        ];

        let tabCouleur = ['white, purple', 'cyan', 'pink','orange']
        let tabGrille = [];
        let tabContenu;
        if (this.numero % 2 === 1) {
            tabContenu = ["👇", "👇", "👍", "👍", "🐒", "🐒", "🐯", "🐯", "🍒", "🍒", "🍑", "🍑", "🍓", "🍓", "🍋", "🍋", "🍟", "🍟", "🥪", "🥪", "🍿", "🍿", "🏖️", "🏖️", "💈", "💈", "🎪", "🎪", "🌞", "🌞", "🎈", "🎈"]
        }
        else {
            tabContenu = ["🫖", "🫖", "🥒", "🥒", "🥦", "🥦", "🌲", "🌲", "🍏", "🍏", "💚", "💚", "🥗", "🥗", "🥑", "🥑", "🌱", "🌱", "🌴", "🌴", "🌵", "🌵", "🌼", "🌼", "🌻", "🌻", "💙", "💙", "💐", "💐", "🧸", "🧸"]

        }
        while (tabContenu.length !== 0) {
            let nb1 = Math.floor(Math.random() * tabContenu.length);
            let nb2 = Math.floor(Math.random() * tabGrillePositions.length);
            let fond = 'white';
            if (this.numero === 3)
            {
                let nofond=  Math.floor(Math.random() * tabCouleur.length);
                fond = tabCouleur[nofond];
            }
            tabGrille.push({ contenu: tabContenu[nb1], x: tabGrillePositions[nb2].x, y: tabGrillePositions[nb2].y, selection: false, fond })
            
            tabContenu.splice(nb1, 1);
            tabGrillePositions.splice(nb2, 1);
        }
      
        return tabGrille;
    }

    nouveauJeu = () => {
        if (!this.state.finJeu) {
            this.numero++;
            this.setState({ tabGrille: this.construireJeu() });
        }
    }

    clic = (id) => {
        if (this.state.tabGrille[id].contenu !== '') {
            let score = this.state.score;
            let nouveauTabGrille = [...this.state.tabGrille];
            let autreSelection = nouveauTabGrille.findIndex(x => x.selection);
            if (autreSelection != -1 && autreSelection !== id) {
                if (nouveauTabGrille[autreSelection].contenu === nouveauTabGrille[id].contenu) {
                    nouveauTabGrille[autreSelection].contenu = '';
                    nouveauTabGrille[id].contenu = '';
                    score++;
                }

                nouveauTabGrille[autreSelection].selection = !nouveauTabGrille[autreSelection].selection;
                if (nouveauTabGrille.findIndex(x => x.contenu != '') === -1) {
                    message.success('Bien', .2, this.nouveauJeu);
                    score += ((this.numero+1)*5);
                }

            }
            else {
                nouveauTabGrille[id].selection = !nouveauTabGrille[id].selection;
            }

            this.setState({ tabGrille: nouveauTabGrille, score });
        }
    }

    finTimer = () => {
        this.setState({ finJeu: true });
    }

    render() {


        return <React.Fragment>
                        <Helmet>
                    <title>Retrouvez les paires</title>
                    <meta name="description" content="Un test très simple de rapidité et de dextérité où vous devez les paires d'éléments le plus rapidement possible." />
                </Helmet>
            {!this.state.finJeu ? <div className="jeuMatch">
            <div className='titreJeu'>Le jeu des paires</div>
                <div className="grilleMatch"><Grille tabGrille={this.state.tabGrille} clic={this.clic}></Grille></div>
                <div className="centre">
                {this.state.afficheRebours && <CompteRebours temps={60} finTimer={this.finTimer}></CompteRebours>}</div>
            <div>Score : {this.state.score}</div>
            </div>
                : <Resultat score={this.state.score} typeExo='vitessematch'></Resultat>}

        </React.Fragment>
    }
}


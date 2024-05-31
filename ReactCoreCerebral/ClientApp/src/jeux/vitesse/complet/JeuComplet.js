import React, { Component } from 'react';
import Grille from './Grille';
import Logique from './Logique';
import { message } from 'antd';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat';
import { Helmet } from 'react-helmet';

export default class JeuComplet extends Component {
    constructor() {
        super();
        this.noJeu = 0;
        this.bonnePlace = 0;
        this.state = {
            tabQuestion: [],
            tabProposition: [],
            rotation: '',
            noJeu: 0,
            afficheFin: false,
            score: 0

        }

    }

    componentDidMount() {
        this.construireJeu();
    }

    finTimer = () => {
        this.setState({ afficheFin: true });
    }


    construireJeu = () => {
        let tab = Logique.creationTableau(8);
        let tabProposition = [];
        this.noJeu++;
        if (this.noJeu === 10) {

            this.setState({
                score: this.state.score > 30 ? this.state.score + 40 : this.state.score,
                afficheFin: true

            });
            return;
        }
        let changement = this.noJeu > 7 ? 3 : this.noJeu > 6 ? 4 :  this.noJeu > 3 ? 2 : this.noJeu > 2 ? 3 : 4;
  
        for (let index = 0; index < 3; index++) {
            tabProposition.push(Logique.constructionMauvaisTableau(tab.tabDebutFin, 8, changement));

        }
        this.bonnePlace = Math.floor(Math.random() * 4);
        tabProposition.splice(this.bonnePlace, 0, tab.tabReponse);

        this.setState({
            score : this.state.score + 5 +  this.noJeu - 1,
            tabQuestion: tab.tabQuestion,
            tabProposition,
            noJeu: this.noJeu

        }, this.rotate);
    }

    rotate = () => {
        if (this.noJeu > 6) {
            setTimeout(() => {

                this.setState({
                    rotation: 'rotationComplet'
                });
            }, 200);
           
        } 
    }
    suite = () => {
        this.setState({ rotation: '' }, this.construireJeu)

    }
    clic = (event) => {
        const id = parseInt(event.currentTarget.id);
        if (id === this.bonnePlace) {
            message.success('Bravo 🤩',.7, this.suite);

        }
        else {
            message.error('Erreur 🥺', .5);
            this.setState({
                score : this.state.score >= 10 ? this.state.score - 10 : 0,  
            });
        }
    }



    render() {

        return <React.Fragment>
             <Helmet>
                    <title>La pièce du puzzle</title>
                    <meta name="description" content="Le jeu du puzzle dans une version simplifiée et très addictive, il suffit de trouver la pièce qui s'encastre parfaitement dans une autre." />
                </Helmet>
            {this.state.afficheFin ? <Resultat score={this.state.score} typeExo='vitessecomplet'></Resultat> :
                <div className='plateauComplet'>
                    <div className={this.state.rotation + ' grilleComplet centreComplet'}><Grille no={10000} tabGrille={this.state.tabQuestion} ></Grille></div>

                    <div className='grillesReponseComplet'>{this.state.tabProposition.map((tab, i) => <div onClick={this.clic} id={i} key={i + 1}  className='grilleComplet'><Grille no={(i + 1) * 100} noJeu={this.state.noJeu} tabGrille={tab} ></Grille></div>)}</div>
                    <div className='centre'>{this.state.noJeu} / 10</div>
                    <div  className='centre'>Score : {this.state.score}</div>
                    <div className="centre"><CompteRebours finTimer={this.finTimer} temps={60}></CompteRebours></div>
              <div className="titreJeu">La pièce du puzzle</div>
              <p>Clique sur la pièce du puzzle qui s'encastre parfaitement dans la pièce du haut. </p>
                </div>
                
                
                }</React.Fragment>
    }
}
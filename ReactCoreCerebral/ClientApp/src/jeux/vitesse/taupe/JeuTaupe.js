import React, { Component } from 'react';
import panneau1 from '../../../images/panneau1.jpg';
import panneau2 from '../../../images/panneau2.jpg';
import panneau3 from '../../../images/panneau3.jpg';
import panneau4 from '../../../images/panneau4.jpg';
import panneau5 from '../../../images/panneau5.jpg';
import panneau6 from '../../../images/panneau6.jpg';
import panneau7 from '../../../images/panneau7.jpg';
import panneau8 from '../../../images/panneau8.jpg';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat';
import { Helmet } from 'react-helmet';

const NUMBER_OF_HOLES = 9;
let intervalle = 1500;
const tabCategorie = ['Danger', 'Obligation', 'Indication', 'Interdiction']
document.addEventListener("visibilitychange", () => { window.location.href = "/" });

export default class JeuTaupe extends Component {
    constructor() {
        super();
        this.state = {
            score: 0,
            moles: Array(NUMBER_OF_HOLES).fill(false),
            scores: Array(NUMBER_OF_HOLES).fill('vide'),
            afficheResultat: false
        };
        this.categorie = tabCategorie[Math.floor(Math.random() * 4)];
 
        this.tabTaupe = [];
        this.nb = 0;
        this.tabImages = [];
        this.timerMain = 0;
        this.timerTab = [];
        for (let index = 0; index < NUMBER_OF_HOLES; index++) {
            this.tabImages.push({ nb: 0, reussi: true });

        }

    }
    testCategorie = (index) => {
     

        if (this.categorie === 'Danger' && (this.tabImages[index].nb == 0 || this.tabImages[index].nb == 1)) {

            return true
        }
        if (this.categorie === 'Interdiction' && (this.tabImages[index].nb == 2 || this.tabImages[index].nb == 3)) {
            return true
        }
        if (this.categorie === 'Obligation' && (this.tabImages[index].nb == 4 || this.tabImages[index].nb == 5)) {
            return true
        }
        if (this.categorie === 'Indication' && (this.tabImages[index].nb == 6 || this.tabImages[index].nb == 7)) {
            return true
        }
        return false;
    }

    componentDidMount() {
        this.appearMole();
    }
    choisirImage(nb) {


        switch (nb) {
            case 0:
                return panneau1;
            case 1:
                return panneau2;
            case 2:
                return panneau3;
            case 3:
                return panneau4;
            case 4:
                return panneau5;
            case 5:
                return panneau6;
            case 6:
                return panneau7;
            case 7:
                return panneau8;
        }
    }

    componentWillUnmount() {
        for (const t of this.timerTab) {
            clearTimeout(t);
        }
        clearTimeout(this.timerMain);
    }
    showHole = () => {

        const newMoles = [...this.state.moles];
        let randomHole = 0;
        do {
            randomHole = Math.floor(Math.random() * NUMBER_OF_HOLES);
        } while (newMoles[randomHole]);


        newMoles[randomHole] = true;
        this.tabImages[randomHole].nb = Math.floor(Math.random() * 8);
        if (this.testCategorie(randomHole)) {
            this.tabImages[randomHole].reussi = false;
        }

        this.tabTaupe.push(randomHole);

        this.setState({ moles: newMoles });

        let t = setTimeout(() => {
            let score = 1;
            const m = [...this.state.moles];
            let hole = this.tabTaupe.shift()

            m[hole] = false;
            const newScores = [...this.state.scores];
            newScores[hole] = 'vide';
            if (this.tabImages[hole].reussi) {
                score = this.state.score + 2
            }
            else {
                if (this.state.score < 8) {
                    score = 0;
                }
                else {
                    score = this.state.score -7;
                }
            }

            this.setState({
                moles: m,
                score: score,
                scores:newScores
            });
        }, 2500);
        this.timerTab.push(t);
      

    }

    appearMole = () => {
        intervalle -= 35;

        if (this.nb < 29) {
            this.showHole();
            this.nb++;
            this.timerMain = setTimeout(() => {
                this.appearMole();
            }, intervalle);
        }


    }
    hitMole = index => {
     
        const newScores = [...this.state.scores];
        if (this.state.moles[index]) {

            if (this.testCategorie(index)) {

                newScores[index] = 'success';
              
                this.tabImages[index].reussi = true;
            }
            else {
                newScores[index] = 'error';
                this.tabImages[index].reussi = false;

            }
            this.setState({
                scores: newScores

            });

        }
    };

    finTimer = () => {
        for (const t of this.timerTab) {
            clearTimeout(t);
        }
        clearTimeout(this.timerMain);
        this.setState({ afficheResultat: true });
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Les panneaux routiers</title>
                    <meta name="description" content="Un jeu pour s'amuser avec les panneaux routiers. Savez-vous reconnaitre le type d'un panneau routier en fonction de sa forme et de sa couleur ?" />

                </Helmet>

                {this.state.afficheResultat ? <Resultat score={this.state.score} typeExo='vitessepanneaux'></Resultat> :
                    <React.Fragment>
                        <div className='titreJeu'>Les panneaux routiers</div>
                        <p>Score: {this.state.score}</p>
                        <div className="jeuTaupe">
                            <div className="game-board">
                                {this.state.moles.map((mole, index) => (
                                    <div
                                        key={index}
                                        className={`hole ${this.state.scores[index] !== 'vide' ? (this.state.scores[index] === "success" ? "success" : "error") : ''}`}
                                        onClick={() => this.hitMole(index)}
                                    >
                                        {mole && <img  onClick={() => this.hitMole(index)} key={index} src={this.choisirImage(this.tabImages[index].nb)} alt="panneau" className="mole-image" />}

                                    </div>

                                ))}

                            </div><p className="centre">Cliquer sur tous les panneaux représentant {this.categorie === 'Danger' ? "un " : "une "}<b>{this.categorie}</b>.</ p>
                            <div className="centre marge10"><CompteRebours temps={30} finTimer={this.finTimer}></CompteRebours></div>

                        </div></React.Fragment>}
            </div>
        );
    }
}

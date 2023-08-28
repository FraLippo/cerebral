import React, { Component } from 'react';
import panneau1 from '../../../images/panneau1.jpg';
import panneau2 from '../../../images/panneau2.jpg';
import panneau3 from '../../../images/panneau3.jpg';
import panneau4 from '../../../images/panneau4.jpg';


const NUMBER_OF_HOLES = 9;
const MOLE_APPEAR_INTERVAL = 600;

export default class JeuTaupe extends Component {
    constructor()
    {
        super();
        this.state = {
        score: 0,
        moles: Array(NUMBER_OF_HOLES).fill(false),
        scores: Array(NUMBER_OF_HOLES).fill(false)
    };
    this.tabTaupe = [];
    this.nb = 0;
    this.tabImages = [];
    for (let index = 0; index < NUMBER_OF_HOLES; index++) {
        this.tabImages.push({nb : 0, etat: 'vide'});
        
    }

    }
    

    componentDidMount() {
        this.appearMole();
    }
    choisirImage(nb) {
  
        console.log("index " + nb);
        switch (nb) {
            case 0:
                return panneau1;
            case 1:
                return panneau2;
            case 2:
                return panneau3;
            case 3:
                return panneau4;
        }
    }
    showHole = () => {

        const newMoles = [...this.state.moles];
        let randomHole = 0;
        do {
            randomHole = Math.floor(Math.random() * NUMBER_OF_HOLES);
        } while (newMoles[randomHole]);


        newMoles[randomHole] = true;
        this.tabImages[randomHole].nb = Math.floor(Math.random() * 4);
        this.tabImages[randomHole].etat = 'enCours'
        console.log(this.tabImages);
        this.tabTaupe.push(randomHole);
        console.log(this.tabTaupe);
        this.setState({ moles: newMoles });

        setTimeout(() => {
            const m = [...this.state.moles];
            let hole = this.tabTaupe.shift()
            console.log(hole);

            m[hole] = false;
            this.tabImages[hole].etat = 'vide';
            console.log(m);
            this.setState({ moles: m });
        }, 2500);

    }

    appearMole = () => {

        if (this.nb < 30) {
            this.showHole();
            this.nb++;
            setTimeout(() => {
                this.appearMole();
            }, MOLE_APPEAR_INTERVAL);
        }


    }
    hitMole = index => {
        if (this.state.moles[index]) {
            // const newMoles = [...this.state.moles];
            // newMoles[index] = false;
            if ( this.tabImages[index].nb <=2 && this.tabImages[index].etat==='enCours')
            {
                this.tabImages[index].etat = 'vide';
                 const newScores = Array(NUMBER_OF_HOLES).fill(false);
            newScores[index] = true;

            this.setState(prevState => ({
                score: prevState.score + 1,

                scores: newScores,
            }));
            }
           

        }
    };

    render() {
        return (
            <div>
                <h1>Jeu des Taupes</h1>
                <p>Score: {this.state.score}</p>
                <div className="jeuTaupe">
                    <div className="game-board">
                        {this.state.moles.map((mole, index) => (
                            <div
                                key={index}
                                className={`hole ${this.state.scores[index] ? 'success' : ''}`}
                                onClick={() => this.hitMole(index)}
                            >
                                {mole && <img key={index} src={this.choisirImage(this.tabImages[index].nb)} alt="panneau" className="mole-image" onClick={() => this.hitMole(index)} />}
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

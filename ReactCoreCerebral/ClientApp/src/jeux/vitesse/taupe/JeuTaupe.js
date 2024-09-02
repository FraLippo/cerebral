import React, { Component } from 'react';
import panneau1 from '../../../images/ecu.png';
import panneau2 from '../../../images/lion.png';
import panneau3 from '../../../images/koala.png';
import panneau4 from '../../../images/oiseau.png';
import panneau5 from '../../../images/lapin.png';
import panneau6 from '../../../images/girafe.png';
import panneau7 from '../../../images/rhino.png';
import panneau8 from '../../../images/elephant.png';

import Resultat from '../commun/Resultat';
import { Helmet } from 'react-helmet';
import Info from './Info';

const NUMBER_OF_HOLES = 9;
let intervalle = 1800;

document.addEventListener("visibilitychange", () => { window.location.href = "/" });

export default class JeuTaupe extends Component {
    constructor() {
        super();
        this.state = {
            score: 0,
            moles: Array(NUMBER_OF_HOLES).fill(false),
            scores: Array(NUMBER_OF_HOLES).fill('vide'),
            afficheResultat: false,
            afficheModal: true
        };
        this.nbAnimaux = 8;
        this.tabJeuAnimaux = [1];
        this.tabAnimaux = [];
        this.serie = 1;
        this.tabTaupe = [];
        this.nb = 0;
        this.tabImages = [];
        this.timerMain = 0;
        this.timerTab = [];
        this.tabTirage = [];
        this.scoreEtape = 0;
        this.scoreTotalEtape = 0;
        this.resultatTotal = 0;
        this.nbReussi = 0;

        this.construireJeu();
        this.fin = false;
        for (let index = 0; index < NUMBER_OF_HOLES; index++) {
            this.tabImages.push({ nb: 0, reussi: true });

        }

    }

    componentWillUnmount()
    {
        this.finTimer();
    }

    melangerTableau(tableau) {

        for (let i = tableau.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tableau[i], tableau[j]] = [tableau[j], tableau[i]]; // Échange des éléments
        }
        return tableau;
    }
    constructionSerie1() {
        let tabTirage = [];
        let nb1 = Math.floor(Math.random() * 8);

        for (let index = 0; index < this.nbAnimaux; index++) {
            if (index < 5) {
                tabTirage.push(nb1);
            }
            else {
                tabTirage.push(Math.floor(Math.random() * 8));
            }
        }
        this.scoreTotalEtape = tabTirage.filter(x => x === nb1).length;

        this.resultatTotal += this.scoreTotalEtape;


        return { tirage: this.melangerTableau(tabTirage), bonnesReponses: [nb1] };

    }

    constructionSerie2() {
        let bonnesReponses = [];
        let ajout;
        let nb = 0;
        let tabTirage = [];
        do {
            ajout = false;
            let random = Math.floor(Math.random() * 8);
            if (bonnesReponses.findIndex(x => x === random) === -1) {
                bonnesReponses.push(random);
                ajout = true;
                nb++;
            }

        } while (!(ajout && nb === 2));

        for (let index = 0; index < this.nbAnimaux; index++) {
            if (index < 3) {
                tabTirage.push(bonnesReponses[0]);
            }
            else if (index < 6) {
                tabTirage.push(bonnesReponses[1]);
            }
            else {
                tabTirage.push(Math.floor(Math.random() * 8));
            }
        }
        this.scoreTotalEtape = tabTirage.filter(x => x === bonnesReponses[0] || x === bonnesReponses[1]).length;
        this.resultatTotal += this.scoreTotalEtape;

        return { tirage: this.melangerTableau(tabTirage), bonnesReponses };
    }


    constructionSerie3() {
        let bonnesReponses = [];
        let ajout;
        let nb = 0;
        let tabTirage = [];
        do {
            ajout = false;
            let random = Math.floor(Math.random() * 8);
            if (bonnesReponses.findIndex(x => x === random) === -1) {
                bonnesReponses.push(random);
                ajout = true;
                nb++;
            }
        } while (!(ajout && nb === 3));

        for (let index = 0; index < this.nbAnimaux; index++) {
            if (index < 2) {
                tabTirage.push(bonnesReponses[0]);
            }
            else if (index < 4) {
                tabTirage.push(bonnesReponses[1]);
            }
            else if (index < 6) {
                tabTirage.push(bonnesReponses[2]);
            }
            else {
                tabTirage.push(Math.floor(Math.random() * 8));
            }
        }
        this.scoreTotalEtape = tabTirage.filter(x => x === bonnesReponses[0] || x === bonnesReponses[1] || x === bonnesReponses[2]).length;

        this.resultatTotal += this.scoreTotalEtape;

        return { tirage: this.melangerTableau(tabTirage), bonnesReponses };




    }

    construireJeu = () => {

        if (this.serie === 1) {
        this.tabTirage = this.constructionSerie1();

        }
        else if (this.serie === 2) {
            this.tabTirage = this.constructionSerie2();
        }
        else if (this.serie === 3) {
            this.tabTirage = this.constructionSerie3();
        }
        this.constructionAnimaux();


    }

    reset() {
        this.finTimer();
        this.setState({
            moles: Array(NUMBER_OF_HOLES).fill(false),
            scores: Array(NUMBER_OF_HOLES).fill('vide'),
            afficheResultat: false,
            afficheModal: true
        });
    
        this.tabAnimaux = [];
        this.tabTaupe = [];
        this.nb = 0;
        this.tabImages = [];
        this.timerMain = 0;
        this.timerTab = [];
        this.message = "";
        this.scoreEtape = 0;
        for (let index = 0; index < NUMBER_OF_HOLES; index++) {
            this.tabImages.push({ nb: 0, reussi: true });

        }
    }
    testCategorie = (index) => {


        if (this.tabTirage.bonnesReponses.findIndex(x => x === this.tabImages[index].nb) !== -1) {

            return true
        }

    }

    componentDidMount() {


    }

    callbackModal = () => {
        this.reset();
        this.setState({ afficheModal: false });
        this.appearMole();

    }
    constructionAnimaux() {
        this.tabAnimaux = [];
        let nom = "";
        for (let index = 0; index < this.tabTirage.bonnesReponses.length; index++) {

            switch (this.tabTirage.bonnesReponses[index]) {
                case 0:
                    nom = "Les écureuils";
                    break;
                case 1:
                    nom = "Les lions";
                    break;
                case 2:
                    nom = "Les koalas";
                    break;
                case 3:
                    nom = "Les oiseaux";
                    break;
                case 4:
                    nom = "Les lapins";
                    break;
                case 5:
                    nom = "Les girafes";
                    break;
                case 6:
                    nom = "Les rhinocéros";
                    break;
                case 7:
                    nom = "Les éléphants";
                    break;
            }
            this.tabAnimaux.push(nom);

        }

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
        
        this.tabImages[randomHole].nb = this.tabTirage.tirage[this.nb];
        // if (this.testCategorie(randomHole)) {
        //     this.tabImages[randomHole].reussi = false;
        // }

        this.tabTaupe.push(randomHole);

        this.setState({ moles: newMoles });

        let t = setTimeout(() => {

            const m = [...this.state.moles];
            let hole = this.tabTaupe.shift()

            m[hole] = false;
            const newScores = [...this.state.scores];
            newScores[hole] = 'vide';
        
            // if (this.tabImages[hole].reussi) {
            //     score = this.state.score + 2
            // }
            // else {
            //     if (this.state.score < 8) {
            //         score = 0;
            //     }
            //     else {
            //         score = this.state.score - 7;
            //     }
            // }



            if (this.tabTaupe.length === 0) {
                setTimeout(() => {
                    if (this.serie < 4) {

                        this.construireJeu();

                        this.setState({ afficheModal: true });

                    }
                    else {

                        this.finTimer();
                    }
                }, 200);
            }
            this.setState({
                moles: m,
                scores: newScores
            });

        }, 2500);

        this.timerTab.push(t);


    }

    appearMole = () => {

        if (this.serie < 4) {
            if (this.nb < this.nbAnimaux) {
                this.showHole();
                this.nb++;

                this.timerMain = setTimeout(() => {
                    this.appearMole();
                }, intervalle);
            }
            else {
                this.nbAnimaux += 5;
                this.serie++;
                intervalle -= 550;
            }
        }




    }
    hitMole = index => {

        const newScores = [...this.state.scores];
        let score = 0;

        // if (this.state.moles[index] && this.dernierIndex !== index) {
        if (this.state.moles[index] && newScores[index] === 'vide') {
            if (this.testCategorie(index)) {
                score = this.state.score + 1;
                this.scoreEtape++;
          
                if (this.scoreEtape === this.scoreTotalEtape) {
                    this.nbReussi++;
                    this.message = "Bravo ! Score parfait"
                }
                else {
                    this.message = "";
                } 
                if (score === this.resultatTotal && this.nbReussi === 3) {
                    score += 50;
                }
                newScores[index] = 'success';


                // this.tabImages[index].reussi = true;
            }
            else {
                newScores[index] = 'error';
                score = this.state.score - 3;
                this.scoreEtape--;
                // this.tabImages[index].reussi = false;

            }

            this.setState({
                scores: newScores,
                score: score

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
                    <title>Les animaux du zoo</title>
                    <meta name="description" content="Un petit jeu pour faire travailler sa mémoire et la reconnaissance visuelle. Arrivez-vous à sélectionner les bons animaux le plus vite possible  ?" />

                </Helmet>

                {this.state.afficheResultat ? <Resultat score={this.state.score} typeExo='vitessezoo'></Resultat> :
                    <React.Fragment>
                        {this.state.afficheModal && <Info msg={this.message} niveau={this.serie} tabAnimaux={this.tabAnimaux} callbackModal={this.callbackModal} ></Info>}
                        <div className='titreJeu'>Les animaux du zoo</div>
                        <p>Score: {this.state.score}</p>
                        <div className="jeuTaupe">
                            <div className="game-board">
                                {this.state.moles.map((mole, index) => (
                                    <div
                                        key={index}
                                        className={`hole ${this.state.scores[index] !== 'vide' ? (this.state.scores[index] === "success" ? "success" : "error") : ''}`}
                                        onClick={() => this.hitMole(index)}
                                    >
                                        {mole && <img onClick={() => this.hitMole(index)} key={index} src={this.choisirImage(this.tabImages[index].nb)} alt="panneau" className="mole-image" />}

                                    </div>

                                ))}

                            </div>


                        </div></React.Fragment>}
            </div>
        );
    }
}

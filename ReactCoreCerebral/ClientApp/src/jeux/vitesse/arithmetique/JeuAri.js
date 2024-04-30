import React, { Component } from 'react';
import Choix from './Choix';
import Ordre from './Ordre';
import { Helmet } from 'react-helmet';
import { message, Button } from 'antd';
import Logique from '../operation/Logique';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat';

export default class JeuAri extends Component {
    constructor(props) {
        super(props);
        this.logique = new Logique();
        this.nbReponse = 1;
        let operation = this.choixOperation();
        let tabChoix = this.shuffleArray([operation.a, operation.b, operation.resultat]);
        this.tabChoixOrigine = [...tabChoix];
        this.state =
        {
            tabChoix,
            tabOrdre: ['', '', '', '=', ''],
            tabOperation: ['+', '-', 'x', '/'],
            afficheResultat: false,
            score : 0
        };
        this.fin = false;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }


    choixOperation = () => {
        let operation = Math.floor(Math.random() * 4);
        let calcul = {};
        switch (operation) {
            case 0:
                calcul = this.logique.creerAdditionAleatoire();
                calcul.operation = '+';
                break;
            case 1:
                calcul = this.logique.creerSoustractionAleatoire();
                calcul.operation = '-';
                break;
            case 2:
                calcul = this.logique.creerMultiplicationAleatoire();
                calcul.operation = 'x';
                break;
            case 3:
                calcul = this.logique.creerDivisionAleatoire();
                calcul.operation = '/';
                break;
            default:
                break;
        }
        return calcul;
    }

    verifierRéponse(nouveauTabOdre) {
        let trouve = false;
        if (nouveauTabOdre[1] === '+' && nouveauTabOdre[0] + nouveauTabOdre[2] === nouveauTabOdre[4]) {
            trouve = true;
        }
        if (nouveauTabOdre[1] === '-' && nouveauTabOdre[0] - nouveauTabOdre[2] === nouveauTabOdre[4]) {
            trouve = true;
        }
        if (nouveauTabOdre[1] === 'x' && nouveauTabOdre[0] * nouveauTabOdre[2] === nouveauTabOdre[4]) {
            trouve = true;
        }
        if (nouveauTabOdre[1] === '/' && nouveauTabOdre[0] / nouveauTabOdre[2] === nouveauTabOdre[4]) {
            trouve = true;
        }
        return trouve;
    }

    nouvelleQuestion = () => {
        let operation = this.choixOperation();
        let tabHasard = [];
        for (let index = 0; index < Math.floor(this.nbReponse / 5); index++) {
            tabHasard.push(Math.floor(Math.random() * 20) + 1);
        }
        let tabChoix = this.shuffleArray([...tabHasard, ...[operation.a, operation.b, operation.resultat]]);
        this.fin = false;
        this.tabChoixOrigine = [...tabChoix];
        this.setState({
            tabChoix: tabChoix,
            tabOrdre: ['', '', '', '=', '']
        })
    }

    clicChoix = (id) => {

        if (this.fin) return;
        if (this.state.tabChoix[id] === '') return;
        let score = this.state.score;
        let nouveauTabOdre = [...this.state.tabOrdre];
        let nouveauTabChoix = [...this.state.tabChoix];
        let place = nouveauTabOdre.findIndex(x => x === '');
        if (place === 1) {
            message.error('Choix érroné');
        }
        else {
            nouveauTabOdre[place] = nouveauTabChoix[id];
            nouveauTabChoix[id] = '';
        }

        if (place === 4) {
            this.fin = true;
            if (this.verifierRéponse(nouveauTabOdre)) {
                this.nbReponse++;
                score += 6;
                message.success('Bien 😀', .5, this.nouvelleQuestion);
            }
            else {
                score -= 2;
                message.error('Mauvaise opération 😞', 1, this.nouvelleQuestion);
            }
        }
        this.setState({
            tabChoix: nouveauTabChoix,
            tabOrdre: nouveauTabOdre,
            score
        })
    }

    clicOperateur = (id) => {
        if (this.fin) return;
        let nouveauTabOdre = [...this.state.tabOrdre];
        let nouveauTabOperation = [...this.state.tabOperation];
        let place = nouveauTabOdre.findIndex(x => x === '');
        if (place !== 1) {
            message.error('Choix erroné');
        }
        else {

            nouveauTabOdre[place] = nouveauTabOperation[id];
        }
        this.setState({
            tabOperateur: nouveauTabOperation,
            tabOrdre: nouveauTabOdre
        })
    }

    clicReset = () => {
        if (this.fin) return;
        let nouveauTabOdre = ['', '', '', '=', ''];
        let nouveauTabChoix = this.tabChoixOrigine;
        this.setState({
            tabChoix: nouveauTabChoix,
            tabOrdre: nouveauTabOdre
        })
    }


    finTimer = () => {
        this.setState({ afficheResultat: true });
    }



    render() {
        return <React.Fragment>
            {this.state.afficheResultat ? <Resultat score={this.state.score} typeExo='vitessearithmetique'></Resultat> : <div>
                <Helmet>
                    <title>Le  jeu des nombres en désordre</title>
                    <meta name="description" content="Un jeu de calcul mental amusant où il suffit de reconstituer un calcul à partir des nombres et d'un opérateur. " />
                </Helmet>
                <div className='jeuMry'>
                    <Ordre tabOrdre={this.state.tabOrdre}></Ordre>
                    <div className='fontMoyenne'>Utilise les nombres et les opérateurs pour créer une opération correcte</div>
                    <Choix clicChoix={this.clicChoix} clicOperateur={this.clicOperateur} tabOperation={this.state.tabOperation} tabChoix={this.state.tabChoix}></Choix>
                    <div className='centre marge10'><Button onClick={this.clicReset}>Reset</Button></div>
                    <div className="centre marge10"><CompteRebours temps={60} finTimer={this.finTimer}></CompteRebours></div>
                    <div className="titreJeu">Nombres en désordre</div>
                </div></div>}
        </React.Fragment>
    }
}

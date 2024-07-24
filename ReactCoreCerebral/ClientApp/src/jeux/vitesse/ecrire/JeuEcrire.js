import React, { Component } from 'react';
import Ligne from './Ligne';
import { Button } from 'antd';
import creerDonnee from './Logique';
import Resultat from '../commun/Resultat';
import { Helmet } from 'react-helmet';
import CompteRebours from '../commun/CompteRebours';



export default class JeuEcrire extends Component {
    constructor(props) {
        super(props);

        this.no = 0;
        this.tabLettres = [];
        this.lettres = creerDonnee(19);

        this.state = {
            tabLettres: this.lettres,
            pause: false,
            position: 0,
            finJeu: false,
            score: 0
        }
        this.textInput = React.createRef();
    }



    keydownHandler = (event) => {
        let nouveauTabLettres = [...this.state.tabLettres];
        let position = this.state.position;
        if (event.key === nouveauTabLettres[this.state.position]) {
            position++;
            this.setState({ position });
            if (nouveauTabLettres[this.state.position] === ' ') {
                this.setState({ score: this.state.score + 3 });
            }
        }

        if (position >= this.state.tabLettres.length - 1) {
            this.setState({
                finJeu: true,
                score: this.state.score + 53
            });
        }
    }

    componentDidMount() {
        this.textInput.current.focus();
    }

    focusOut = () => {
        this.setState({ pause: true });
    }

    stopPause = () => {
        this.textInput.current.focus();
        this.setState({ pause: false });
    }

    finTimer = () => {
        this.setState({ finJeu: true });
    }


    render() {

        return <div>
            <Helmet>
                <title>Test de dactylographie</title>
                <meta name="description" content="Un test gratuit et  amusant basé sur la dactylographie pour apprendre à taper un texte le plus vite possible." />
            </Helmet>
            {this.state.finJeu ?
                <Resultat score={this.state.score} typeExo='vitesseecrire'></Resultat> :
                <React.Fragment><div className="titreJeu">La dactylographie</div>
                    <div>Tapez sur votre clavier la lettre dans le carré bleu. Pour aller vite sur un PC placer vos deux mains côte à côte au milieu du clavier et ne regardez pas votre clavier. </div>
                    <Ligne position={this.state.position} tabLettres={this.state.tabLettres}></Ligne>
                    <input type="text" onKeyDown={this.keydownHandler} ref={this.textInput} onBlur={this.focusOut} style={{ opacity: 0 }} />
                    <div className="centre marge10"><CompteRebours temps={30} finTimer={this.finTimer}></CompteRebours></div>
                    <div className="centre espaceHaut">{this.state.pause && <Button onClick={this.stopPause}>Revenir au jeu</Button>}</div>
                </React.Fragment>} </div>
    }

}

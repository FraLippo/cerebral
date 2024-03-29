import React, { Component } from 'react';
import DonneeMots from './data';
import Cases from './Cases';
import { Button, message } from 'antd';
import Info from './Info';
import CreerLettres from './Logique';
import CompteRebours from '../commun/CompteRebours';
import { Helmet } from 'react-helmet';
import Resultat from '../commun/Resultat';


const NOTIRAGEMAX = 6;

export default class JeuBoogle extends Component {

    constructor(props) {
        super();
        let tabLettres = CreerLettres();

        this.donnee = DonneeMots;
        this.donnee.info.lettres = tabLettres;
        this.fin = false;


        this.state = {
            tabLettres: this.construireTableauLettres(),
            lettresEnCours: [],
            msgInfo: '',
            finJeu: false,
            score: 0,
            animation: 'animationLettreBoo',
            noTirage: 0
        }
    }

    construireTableauLettres() {
        let tabLettres = CreerLettres();
        let tabPositionsLettres = [{ x: 0, y: 55, lettre: tabLettres[0] },
        { x: 95, y: 0, lettre: tabLettres[1] },
        { x: 190, y: 55, lettre: tabLettres[2] },
        { x: 95, y: 110, lettre: tabLettres[3] },
        { x: 0, y: 165, lettre: tabLettres[4] },
        { x: 95, y: 220, lettre: tabLettres[5] },
        { x: 190, y: 165, lettre: tabLettres[6] }]
        return tabPositionsLettres;

    }

    clic = (id) => {
        if (this.fin) return;
        let lettres = [...this.state.lettresEnCours];
        if (lettres.length > 14) return;
        lettres.push(this.state.tabLettres[id].lettre);
        this.setState({ lettresEnCours: lettres })
    }

    calculScore = (mot) => {
        let score = this.state.score;
        if (mot.length <= 4) {
            score += mot.length;
        }
        else {
            score += (mot.length * 2);
        }
        this.setState({ score });

    }


    envoyerMessage = () => {
        if (this.fin) return;
        if (this.state.lettresEnCours.length <= 2) {
            this.setState({ msgInfo: "Les mots doivent avoir plus de 2 lettres." });
            return;
        }
        if (this.state.lettresEnCours.find(l => l === this.state.tabLettres[3].lettre) === undefined) {
            this.setState({ msgInfo: "Le mot doit obligatoirement contenir la lettre " + this.state.tabLettres[3].lettre + "." });
            return;
        }
        this.setState({ animation: '' });
        let mot = this.state.lettresEnCours.join('');

        let url = new URL(process.env.REACT_APP_URL_VERIFIERMOT);
        var data = new FormData();
        data.append('mot', mot);
        fetch(url, {
            method: "POST",
            body: data
        }).then(res => res.json())
            .then(res => {
                if (!res) {
                    this.setState({ msgInfo: "Le mot  " + mot + " est inconnu dans notre dictionnaire." });

                }
                else {

                    this.calculScore(mot);
                    let noTirage = this.state.noTirage + 1;
                    if (noTirage === NOTIRAGEMAX) {
                        this.fin = true;
                        message.info("Bravo, vous avez réussi !", this.finJeu)
                    }
                    else {
                        this.setState({
                            lettresEnCours: [],
                            msgInfo: '',
                            tabLettres: this.construireTableauLettres(),
                            animation: 'animationLettreBoo',
                            noTirage
                        })
                    }

                }
            });
    }

    finJeu = () => {
        this.finJeu = false;
        this.setState({ finJeu: true, score : this.state.score + 20 })
    }

    reset = () => {
        this.setState({
            lettresEnCours: [],
            msgInfo: ''
        })
    }

    finTimer = () =>
    {
        this.setState({ finJeu: true})
    }
    render() {
        return <div>
            <Helmet>
                <title>Jeu de lettres : Le jeu des 6 mots</title>
                <meta name="description" content="Un jeu de lettres en ligne facile, gratuit, sans inscription, où vous devez trouver 6 mots avec 7 lettres. Pour les amateurs de jeux de lettres de type Motus, Boogle, Slam..." />
            </Helmet>
            {this.state.finJeu ?
                <Resultat score={this.state.score} typeExo='vitesseboogle'></Resultat> :
                <div className="plateauBoo">
                    <div className="jeuBoo">

                        <Cases contenu={this.state.tabLettres} animation={this.state.animation} clic={this.clic}></Cases>
                        <div className='lettresBoo'>{this.state.lettresEnCours}</div>
                        <div className='centre msgInfoBoo'>{this.state.msgInfo}</div>
                        <div className='marge10 centre'>
                            <Button type="primary" onClick={this.envoyerMessage}>Valider mot</Button>
                            <Button className="margeGauche10" onClick={this.reset}>Reset</Button></div>


                    </div>
                    <div className="resultatBoo centre">
                        <p><span>Score : {this.state.score}</span><span className='margeGauche10'>Nombre de mots : {this.state.noTirage} / {NOTIRAGEMAX}</span> </p>


                    </div>
                    <div className='centre'><CompteRebours temps={90} finTimer={this.finTimer}></CompteRebours></div>
                    <div className="centre titreJeu">Le jeu du Boogle</div>
                </div>
            }

        </div>
    }
}


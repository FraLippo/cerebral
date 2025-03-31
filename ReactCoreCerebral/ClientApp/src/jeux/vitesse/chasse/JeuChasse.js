import React, { Component } from 'react';
import { create16LettersArray, create6LettersArray } from './Logique';
import Grille from './Grille';
import Resultat from '../commun/Resultat';
import { Helmet } from 'react-helmet';
import Aide from './Aide';
import { Button, message } from 'antd';
import CompteRebours from '../commun/CompteRebours';



export default class JeuChasse extends Component {

    constructor(props) {
        super();


        this.perdu = false;

        this.state = {
            tabLettres: [],
            taille: 0,
            msgInfo: '',
            lettresEnCours: [],
            tabAide: [],
            finJeu: false,
            score: 0

        }
    }

    initTabLettres = (tabLettres) => {
        let tabLettresEtat = [];
        for (let index = 0; index < tabLettres.length; index++) {
            tabLettresEtat.push({ lettre: tabLettres[index], etat: 'nonUtilise' })
        }

        return tabLettresEtat
    }

    creerNouveauxTableaux = () => {
        this.setState({
            taille: 4,
            tabLettres: this.initTabLettres(create16LettersArray()),
            tabAide: this.initTabLettres(create6LettersArray()),
            msgInfo: [],
            lettresEnCours: []

        })
    }

    componentDidMount() {
        this.creerNouveauxTableaux();
    }


    envoyerMessage = () => {
        if (this.state.lettresEnCours.length <= 2) {
            this.setState({ msgInfo: "Les mots doivent avoir plus de 2 lettres." });
            return;
        }
        let url = new URL(process.env.REACT_APP_URL_VERIFIERMOT);
        let mot = this.state.lettresEnCours.join('');
        var data = new FormData();
        data.append('mot', mot);
        fetch(url, {
            method: "POST",
            body: data
        }).then(res => res.json())
            .then(res => {
                if (!res) {
                    this.setState({ msgInfo: "Le mot n'est pas connu dans notre dictionnaire." });
                }
                else {
                    let score = mot.length;
                    if (mot.length > 4) score += 1;
                    if (mot.length > 5) score +=2;
                    let nouveauTabLettres = [...this.state.tabLettres];
                    let nouveauTabAide = [...this.state.tabAide];
                    this.suppressionCases(nouveauTabLettres);
                    this.suppressionCases(nouveauTabAide);

                    if (this.verifierVictoire(nouveauTabLettres)) {
                        message.success('Bravo ! +30 points', this.creerNouveauxTableaux);
                        score += 30;
                    }
                    this.setState({
                        tabLettres: nouveauTabLettres,
                        lettresEnCours: [],
                        msgInfo: '',
                        tabAide: nouveauTabAide,
                        score : this.state.score + score

                    })

                }
            }
            );
    }


    suppressionCases = (nouveauTabLettres) => {
        for (let index = 0; index < nouveauTabLettres.length; index++) {
            if (nouveauTabLettres[index].etat === 'enCours') {
                nouveauTabLettres[index].etat = 'utilise';
                nouveauTabLettres[index].lettre = '';
            }
        }
    }

    verifierVictoire = (nouveauTabLettres) => {
        for (let index = 0; index < nouveauTabLettres.length; index++) {
            if (nouveauTabLettres[index].etat !== 'utilise') {
                return false;
            }
        }
        return true;
    }

    miseAJourTableau = (nouveauTabLettres, nouveauLettresEnCours, id) => {
        if (nouveauTabLettres[id].etat === 'nonUtilise') {
            nouveauTabLettres[id].etat = 'enCours';
            nouveauLettresEnCours.push(nouveauTabLettres[id].lettre);
        }
        return { nouveauTabLettres, nouveauLettresEnCours }
    }

    clicLettre = (id) => {
        let nouveauTabLettres = [...this.state.tabLettres];
        let nouveauLettresEnCours = [...this.state.lettresEnCours];
        let nouveau = this.miseAJourTableau(nouveauTabLettres, nouveauLettresEnCours, id)

        this.setState({
            tabLettres: nouveau.nouveauTabLettres,
            lettresEnCours: nouveau.nouveauLettresEnCours
        })
    }

    clicLettreAide = (id) => {
        let nouveauTabLettres = [...this.state.tabAide];
        let nouveauLettresEnCours = [...this.state.lettresEnCours];
        let nouveau = this.miseAJourTableau(nouveauTabLettres, nouveauLettresEnCours, id - 500)

        this.setState({
            tabAide: nouveau.nouveauTabLettres,
            lettresEnCours: nouveau.nouveauLettresEnCours
        })
    }
    remiseAZero = (nouveauTabLettres) => {
        for (let index = 0; index < nouveauTabLettres.length; index++) {
            if (nouveauTabLettres[index].etat === 'enCours') {
                nouveauTabLettres[index].etat = 'nonUtilise';
            }

        }
        return nouveauTabLettres;

    }

    reset = () => {
        let nouveauTabLettres = [...this.state.tabLettres];
        let nouveauTabAide = [...this.state.tabAide];
   
        this.setState({
            tabLettres: this.remiseAZero(nouveauTabLettres),
            tabAide: this.remiseAZero(nouveauTabAide),
            lettresEnCours: [],
            msgInfo: '',
         
        })
    }



    abandon = () => {
        this.setState({
            score : this.state.score <= 10 ? 0 : this.state.score - 10
        })
        this.creerNouveauxTableaux();
    }

    finTimer = () => {
        this.setState({finJeu : true});
    }


    render() {

        return <React.Fragment>
            <Helmet>
                <title>Jeux de lettres : La chasse aux mots</title>
                <meta name="description" content="Le meilleur jeu de lettres pour les amateurs de jeux de réflexion avec des lettres. Un jeu proche des mots mêlées avec cependant quelques différences qui le rendent encore plus passionnant." />
            </Helmet>
            {this.state.finJeu ? <Resultat score={this.state.score} typeExo='vitessechasse'></Resultat> :
                <div className="espaceJeu"><div className="espaceJeuChasse"><div className='titreJeu'>La chasse aux mots </div>
                    <div className='margeHaut10'><Button onClick={this.abandon}>Abandon (-10 points)</Button></div>

                    <div className="espaceGrilleChasse">
                        <Grille clicLettre={this.clicLettre} lettres={this.state.tabLettres} taille={this.state.taille}></Grille>

                    </div>
                    <p>Lettres supplémentaires pour t'aider à finir la grille.</p>
                    <Aide taille={this.state.taille} aide={this.state.tabAide} clicLettreAide={this.clicLettreAide}></Aide>
                </div>
                    <div className='espaceInfoChasse'>
                        <div className='lettresChasse'>{this.state.lettresEnCours}</div>
                        <div className='centre msgInfoChasse'>{this.state.msgInfo}</div>
                        <div className='centre espaceHaut '><Button className="margeDroit" type="primary" onClick={this.envoyerMessage}>Valider mot</Button>
                            <Button onClick={this.reset}>Reset</Button>
                        </div>
                            <div className='centre espaceHaut'>Score : {this.state.score}</div>
                            <div className='centre' ><CompteRebours temps={90} finTimer={this.finTimer}></CompteRebours></div>

                    </div>
                </div>}
        </React.Fragment>
    }
}


import React, { Component } from 'react';
import SousMenu from '../principal/SousMenu';
import { LienMenuPrincipal } from '../commun/SuiteJeux';

import { Statistic } from 'antd';
import { Link} from 'react-router-dom';
import Ad from './adSense';



export default class Resultat extends Component {

    constructor(props) {
        super(props);
        this.chemin = "";
        this.state = {
            classement: 0,
            meilleurTemps: 0,
            nbJoueurs: 0,
            tempsMoyen: 0,
            afficheResultat: false,
            statTemps: [],
            point: [0, 0],
            afficheGraphique: false
        }
        this.initChemin();
    }

    componentDidMount() {

        let url = new URL(import.meta.env.VITE_URL_JEUXPUZZLE);
        var data = new FormData();
        data.append('idTest', this.props.idTest);
        data.append('dureeJeu', this.props.dureeJeu);
        data.append('perdu', this.props.perdu);
        data.append('dureeMax', this.props.dureeMax)
        fetch(url, {
            method: "POST",
            body: data
        }).then(res =>
            res.json())
            .then(res => {
                let afficheGraphique = false;
                let point = [0, 0];
                let statTemps = res.statTemps;
                if (statTemps !== undefined && statTemps.length > 3) {
                    afficheGraphique = true;
                    point = [statTemps[0].xTemps, statTemps[0].yNbJoueurs];
                    for (let index = statTemps.length - 1; index >= 0; index--) {
                        const element = statTemps[index];
                        if (this.props.dureeJeu / 1000 > parseInt(element.xTemps)) {
                            point = [element.xTemps, element.yNbJoueurs]
                            break;
                        }
                    }
                }
                else {
                    statTemps = { xTemps: 0, yNbJoueurs: 0 };
                }

                this.setState({
                    classement: res.classement,
                    meilleurTemps: res.meilleurTemps,
                    nbJoueurs: res.nbJoueurs,
                    tempsMoyen: res.tempsMoyen,
                    afficheResultat: true,
                    afficheGraphique,
                    statTemps,
                    point
                });
            }
            ).catch(function (error) {
                alert("Désolé, il y a eu un problème, nous essayons de le résoudre.");
            });;
    }
    initChemin() {
        let chemin = "";

        switch (this.props.type) {
            case 'tri':
                chemin = "jeuxtri";
                break;
            case 'puzzle':
                chemin = "jeuxpuzzle";
                break;
            case 'puzzleRotation':
                chemin = "jeuxpuzzlerotation";
                break;
            case 'ordre':
                chemin = "jeuxordre";
                break;
            case 'compte':
                chemin = "jeuxcompte";
                break;
            case 'memoireDessin':
                chemin = "jeuxmemoiredessin";
                break;
            case 'memoireFamille':
                chemin = "jeuxfamille";
                break;
            case 'mahJong':
                chemin = "jeuxmahjong";
                break;
            case 'pyramide':
                chemin = "jeux-pyramide";
                break;
            case 'fubuki':
                chemin = "jeux-fubuki";
                break;
            case 'simon':
                chemin = "jeux-simon";
                break;
            case 'picross':
                chemin = "picross";
                break;
            case 'binero':
                chemin = "binero";
                break;
            case 'memoryGame':
                chemin = 'jeux-memory';
                break;
            default:
                return;
        }
        this.chemin = '/' + chemin + '/';
    }
    messageFelicitation() {
        if (this.state.classement === 1) {
            return "Fantastique ! Tu es le meilleur, le numéro 1.";
        }
        if (this.state.classement <= 3) {
            return "Bravo ! Tu es parmi les trois meilleurs !";
        }
        else if ((this.state.classement <= 10)) {
            return "Excellent ! Tu es dans les 10 premiers ! ";
        }

    }

    messageAnalyse() {
        if (this.props.dureeJeu > this.state.tempsMoyen * 1000) {
            return "Tu as été plus lent que la moyenne des joueurs."
        }
        else {
            return "C'est bien, tu as été plus rapide que la moyenne des joueurs."
        }
    }


  

    render() {
       
            return (

                <div>
                    <h1>{"Les résultats"}</h1>
                    {this.state.afficheResultat && <div>
                        <div className="centre">
                            {!this.props.perdu ? <div><h1>{"Votre temps : "}<span className="lettreRouge">{`${Math.floor(this.props.dureeJeu / 60000 | 0)}:${Math.floor((this.props.dureeJeu / 1000) % 60)}`}</span></h1>
                                <p className="tailleMoyenne"><b>{this.messageFelicitation()}</b></p>
                                <Statistic title={"Classement"} value={this.state.classement} suffix={'/ ' + this.state.nbJoueurs} />
                                </div> :
                                <div><div><b>{"Tu as échoué"}</b></div>
                                    <div><Link reloadDocument to={this.chemin + this.props.idTest}>{"Refaire le jeu ?"}</Link></div></div>}
                            <p className="espaceHaut">{"Le meilleur temps est : "}<b>{`${Math.floor(this.state.meilleurTemps / 60 | 0)}:${Math.floor(this.state.meilleurTemps % 60)}`}</b></p>
                            <p>{"Le temps moyen est : "}<b>{`${Math.floor(this.state.tempsMoyen / 60 | 0)}:${Math.floor(this.state.tempsMoyen % 60)}`}</b></p>
                            {!this.props.perdu && <p>{this.messageAnalyse()}</p>}</div>

                        <div className="espaceHaut bullet">
                            <SousMenu titre="Jeux de la même catégorie" type={this.props.type} supprimer={this.props.idTest}></SousMenu>
                        </div>

                        <LienMenuPrincipal></LienMenuPrincipal>
                        <Ad></Ad>
                    </div>
                    }

                </div>
            );
        
    }
}

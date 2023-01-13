import React, { Component } from 'react';
import SousMenu from '../principal/SousMenu';
import { LienMenuPrincipal } from '../commun/SuiteJeux';

import { Statistic } from 'antd';
import { Link} from 'react-router-dom';
import Ad from './adSense';
import intl from 'react-intl-universal';
import { Graphic } from '../commun/Graphic';


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
 console.log(props.idTest);
        this.initChemin();
    }

    componentDidMount() {

        let url = new URL(process.env.REACT_APP_URL_JEUXPUZZLE);
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
                alert(intl.get('ERREUR_RESEAU'));
            });;
    }
    initChemin() {
        let chemin = "";

        switch (this.props.type) {
            case 'tri':
                chemin = intl.get('NOM_TRI');
                break;
            case 'puzzle':
                chemin = intl.get('NOM_PUZZLE');
                break;
            case 'puzzleRotation':
                chemin = intl.get('NOM_ROTATION');
                break;
            case 'ordre':
                chemin = intl.get('NOM_ORDRE');
                break;
            case 'compte':
                chemin = intl.get('NOM_COMPTE');
                break;
            case 'memoireDessin':
                chemin = intl.get('NOM_DESSIN');
                break;
            case 'memoireFamille':
                chemin = intl.get('NOM_FAMILLE');
                break;
            case 'mahJong':
                chemin = intl.get('NOM_MAH');
                break;
            case 'pyramide':
                chemin = intl.get('NOM_PYRAMIDE');
                break;
            case 'fubuki':
                chemin = intl.get('NOM_FUBUKI');
                break;
            case 'simon':
                chemin = intl.get('NOM_SIMON');
                break;
            case 'picross':
                chemin = intl.get('NOM_PICROSS');
                break;
            case 'binero':
                chemin = intl.get('NOM_BINERO');
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
            return intl.get('CLASSEMENT_1');
        }
        if (this.state.classement <= 3) {
            return intl.get('CLASSEMENT_3');
        }
        else if ((this.state.classement <= 10)) {
            return intl.get('CLASSEMENT_10');
        }

    }

    messageAnalyse() {
        if (this.props.dureeJeu > this.state.tempsMoyen * 1000) {
            return intl.get('MOYENNE_LENT')
        }
        else {
            return intl.get('MOYENNE_RAPIDE')
        }
    }


  

    render() {
       
            return (

                <div>
                    <h1>{intl.get('RESULTATS')}</h1>
                    {this.state.afficheResultat && <div>
                        <div className="centre">
                            {!this.props.perdu ? <div><h1>{intl.get('TEMPS')}<span className="lettreRouge">{`${Math.floor(this.props.dureeJeu / 60000 | 0)}:${Math.floor((this.props.dureeJeu / 1000) % 60)}`}</span></h1>
                                <p className="tailleMoyenne"><b>{this.messageFelicitation()}</b></p>
                                <Statistic title={intl.get('CLASSEMENT')} value={this.state.classement} suffix={'/ ' + this.state.nbJoueurs} />
                                {this.state.afficheGraphique && <div><p>{intl.get('MSG_GRAPHIQUE1')}</p><div className="graph center"><Graphic point={this.state.point} statTemps={this.state.statTemps}></Graphic></div></div>}</div> :
                                <div><div><b>{intl.get('PERDU')}</b></div>
                                    <div><Link reloadDocument to={this.chemin + this.props.idTest}>{intl.get('REFAIRE')}</Link></div></div>}
                            <p className="espaceHaut">{intl.get('MEILLEUR_TEMPS')}<b>{`${Math.floor(this.state.meilleurTemps / 60 | 0)}:${Math.floor(this.state.meilleurTemps % 60)}`}</b></p>
                            <p>{intl.get('TEMPS_MOYEN')}<b>{`${Math.floor(this.state.tempsMoyen / 60 | 0)}:${Math.floor(this.state.tempsMoyen % 60)}`}</b></p>
                            {!this.props.perdu && <p>{this.messageAnalyse()}</p>}</div>

                        <div className="espaceHaut bullet">
                            <SousMenu titre='TITRE_CATEGORIE' type={this.props.type} supprimer={this.props.idTest}></SousMenu>
                        </div>

                        <LienMenuPrincipal></LienMenuPrincipal>
                        <Ad></Ad>
                    </div>
                    }

                </div>
            );
        
    }
}


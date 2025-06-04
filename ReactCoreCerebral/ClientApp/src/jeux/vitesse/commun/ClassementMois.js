import React, { Component } from 'react';
import { verifierStatus } from './utilitaire';
import { Table, Row, Col } from 'antd';
import { readFirstName } from '../../../components/commun/localStorage';
import { moisEnFrancais } from '../../../components/commun/utilitaire';
import { lienVersCategorie, obtenirInfoCategorie, creerMsgResultat } from '../commun/utilitaire';
import { nomType, tabJeu } from './utilitaire';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Radar from './RadarV';

export default class ClassementMois extends Component {

    constructor(props) {

        super(props);

        this.prenom = readFirstName();
        const d = new Date();
        this.nomMois = moisEnFrancais[d.getMonth()];
        if (this.prenom === null) {
            this.prenom = 'inconnu';
        }
        this.state =
        {
            listePremiers: [],
            classement: 0,
            score: 0,
            resultatsJeux: [],
            afficheInfoJoueur: false,
            tabScoreCategorie: []
        }
        this.columns = [
            {
                title: 'Position',
                dataIndex: 'position',
                key: 'position',

            },
            {
                title: 'Prénom',
                dataIndex: 'prenom',
                key: 'prenom',
                render: (prenom) => {
                    return <span className={prenom.includes('§') ? "bleuV" : "mauve"}>{prenom.includes('@') ? prenom.split('@')[0] : prenom}</span>;
                }

            },
            {
                title: 'Score',
                dataIndex: 'score',
                key: 'score',
            }

        ]

    }

    creerDonneesRadar = (resultats) => {
        const sommeScores = resultats.reduce((acc, item) => {

            if (!acc[item.categorie]) {
                acc[item.categorie] = 0;
            }
            acc[item.categorie] += item.score;
            return acc;
        }, {});

        let tabScoreCategorie = ['m', 'r', 'c', 'l', 'd', 'p'].map(x => {
            return {
                categorie: lienVersCategorie(x, "legende"),
                score: 0,
                msg :  obtenirInfoCategorie(x).message
            
            }
        }).sort((a, b) => a.categorie.localeCompare(b.categorie));

        const listeModifiee = Object.entries(sommeScores).map(([categorie, score]) => {

            return {
                categorie: lienVersCategorie(categorie, "legende"),
                score: Math.min(100, Math.ceil((score / obtenirInfoCategorie(categorie).max) * 100))
            };
        }).sort((a, b) => a.categorie.localeCompare(b.categorie));


        for (let index = 0; index < tabScoreCategorie.length; index++) {
            if (listeModifiee[index] != null) {
                tabScoreCategorie[index].score = listeModifiee[index].score;
              
            }
            tabScoreCategorie[index].msg += creerMsgResultat(tabScoreCategorie[index].score);

        }


        return tabScoreCategorie;
    }

    async componentDidMount() {

        let url = new URL(process.env.REACT_APP_URL_RAPIDITECLASSEMENTMOIS);


        const reponse = await fetch(url + '?prenom=' + this.prenom);
        if (!verifierStatus(reponse.status)) {
            return;
        }
        if (reponse.ok) {
            const res = await reponse.json();



            this.setState({
                listePremiers: res.classementJoueurs,
                classement: res.classement,
                score: res.scoreTotal,
                resultatsJeux: res.resultats,
                afficheInfoJoueur: this.prenom !== 'inconnu',
                nbJoueurs: res.nbJoueurs,
                tabScoreCategorie: this.creerDonneesRadar(res.resultats)



            })
        }
        else {
            alert("Désolé, il y a un problème.")
            window.location.href = "/"
        }

    }

    construireJeu(typeJeu, i) {

        let nomJeu = nomType(typeJeu);
        let lien = '/' + typeJeu;
        let resultat = this.state.resultatsJeux.find(x => x.nomJeu === typeJeu);
        let score = 0;
        if (resultat != undefined) {
            score = resultat.score
        }

        return <tr key={i}><td>{nomJeu}</td><td>{score}</td><td><Link to={lien}>Jouer</Link></td></tr>
    }

    render() {
        return <React.Fragment>
            <Helmet>
                <title>Le classement du mois des jeux cognitifs</title>
                <meta name="description" content="Le classement du mois des 10 meilleurs à nos jeux cognitifs. Venez tester nos jeux et tests pour entrer dans le classement. " />
            </Helmet>
            <div className="marge20">

                <div>
                    <h1>Les résultats du mois  {this.nomMois === 'août' || this.nomMois === 'avril' || this.nomMois === 'octobre' ? "d'" + this.nomMois : 'de ' + this.nomMois}</h1>
                    <h2>Les 10 meilleurs du mois</h2>
                    <Row justify="center">
                        <Col xs={24} sm={24} md={16}><Table pagination={{ defaultPageSize: 10, hideOnSinglePage: true }} columns={this.columns} dataSource={this.state.listePremiers} rowKey='cle' />
                        </Col></Row>

                    <Radar tabScoreCategorie={this.state.tabScoreCategorie}></Radar>
                    <div className='centre margeHaut10'><div>Il ne faut pas tenir compte des résultats avant d'avoir joué un maximum de jeux.</div><div>Tu as un mois, du 1er au 30, pour améliorer tes scores dans tous les jeux. A chaque début de mois, les résultats sont remis à 0.</div></div>
                    <div><ul className='listem' >{this.state.tabScoreCategorie.map((info,i) => <li key={i+10000}>{info.msg}</li> )}</ul></div>
                    {this.state.afficheInfoJoueur &&
                        <React.Fragment>
                            <h2>Tes résultats {this.prenom.includes('@') ? this.prenom.split('@')[0] : this.prenom}</h2>
                            <div className="centre">
                                <p className='fontMoyenne'>Ton classement du mois : {this.state.classement} / {this.state.nbJoueurs}</p>
                                <div className="listeJeux">
                                    <table>
                                        <thead>
                                            <tr>

                                                <th>Nom du jeu</th>
                                                <th>Score</th>
                                                <th>Action</th>
                                            </tr></thead>
                                        <tbody>{tabJeu.map((jeu, i) => this.construireJeu(jeu, i))}
                                            <tr><td>Score total</td><td>{this.state.score}</td></tr>
                                        </tbody>
                                    </table></div>
                            </div></React.Fragment>}

                </div>
                <p className="centre fontPetite" ><a href="https://evalquiz.com">evalquiz.com</a></p>
            </div></React.Fragment>
    }
}
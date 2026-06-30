import React, { Component } from 'react';
import { verifierStatus } from './utilitaire';
import { Table, Row, Col, Button, Spin } from 'antd';
import { readFirstName } from '../../../components/commun/localStorage';
import { moisEnFrancais } from '../../../components/commun/utilitaire';
import { lienVersCategorie, obtenirInfoCategorie, creerMsgResultat } from '../commun/utilitaire';
import { nomType, tabJeu } from './utilitaire';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Radar from './RadarV';
import ModalGpt from '../../../components/commun/ModalGpt';
import ia1 from '../../../images/ia1.png';
import ia2 from '../../../images/ia2.png';

export default class ClassementMois extends Component {

    constructor(props) {

        super(props);

        this.prenom = readFirstName();

        const d = new Date();
        this.nomMois = moisEnFrancais[d.getMonth()];
        if (this.prenom == null) {
            this.prenom = 'inconnu';
        }

        this.state =
        {
            listePremiers: [],
            classement: 0,
            score: 0,
            resultatsJeux: [],
            afficheInfoJoueur: false,
            tabScoreCategorie: [],
            messageGpt: '',
            disabled: false,
            nbJeuxTotal: 0,
            nbJeux: 0,
            prenomJoueur: "",
            afficheIA: false
        }
        this.columns = [
            {
                title: 'No',
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
            },
            {
                title: 'Résultats IA',
                dataIndex: 'score',
                key: 'score',
                render: (score, record) => {
                    return score > 2500 ? <Button onClick={() => this.afficherIA(record.prenom)}>Analyse</Button> : "";
                }
            },


        ]

    }


    afficherIA = (prenom) => {
      
        this.setState({
            prenomJoueur: prenom,
            afficheIA: true
        })
    }


    finModal = () => {
     
        this.setState({
            prenomJoueur: '',
            afficheIA: false
        })
    }


    envoiMessageGPT = async () => {
   
        let msgHtml = '';
        this.setState({
            loading: true
        });

        const reponse = await fetch(process.env.REACT_APP_URL_RESULTATGPT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.prenom)
        });
        if (verifierStatus(reponse.status) && reponse.ok) {

            msgHtml = await reponse.text();
        }
        else {
            msgHtml = "Désolé, il y a un problème. Revenez plus tard."
        }
        this.setState({
            messageGpt: msgHtml,
            loading: false
        });

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
                msg: obtenirInfoCategorie(x).message + 'inconnue.'

            }
        });

        const listeModifiee = Object.entries(sommeScores).map(([categorie, score]) => {

            return {
                categorie: lienVersCategorie(categorie, "legende"),
                score: Math.min(100, Math.ceil((score / obtenirInfoCategorie(categorie).max) * 100))
            };
        });


        for (let index = 0; index < listeModifiee.length; index++) {
            let indexScore = tabScoreCategorie.findIndex(x => x.categorie === listeModifiee[index].categorie);
            if (indexScore !== -1) {

                tabScoreCategorie[indexScore].score = listeModifiee[index].score;
                tabScoreCategorie[indexScore].msg = tabScoreCategorie[indexScore].msg.slice(0, -9) + creerMsgResultat(parseInt(tabScoreCategorie[indexScore].score)) + '.';

            }


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

            //   let disabled = !(res.resultats.length === tabJeu.length);

            this.setState({
                listePremiers: res.classementJoueurs,
                classement: res.classement,
                score: res.scoreTotal,
                resultatsJeux: res.resultats,
                afficheInfoJoueur: this.prenom !== 'inconnu',
                nbJoueurs: res.nbJoueurs,
                tabScoreCategorie: this.creerDonneesRadar(res.resultats),
                //   disabled,
                nbJeuxTotal: tabJeu.length,
                nbJeux: res.resultats.length

            }, () => {
                if (this.state.score > 1500 && this.prenom != null && this.prenom != 'inconnu') {
                    this.envoiMessageGPT();
                }
            });

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
                {this.state.afficheIA && <ModalGpt finModal={this.finModal} disabled={this.state.disabled} prenom={this.state.prenomJoueur}></ModalGpt>}
                <div>
                    <h1>Les résultats du mois  {this.nomMois === 'août' || this.nomMois === 'avril' || this.nomMois === 'octobre' ? "d'" + this.nomMois : 'de ' + this.nomMois}</h1>
                    {!this.state.afficheInfoJoueur && <div className="centre margeHaut10"><strong>Pas encore de résultats car tu n'as participé à aucun jeu.</strong></div>}



                    {this.state.afficheInfoJoueur &&
                        <React.Fragment>
                            <h2>Tes résultats {this.prenom.includes('@') ? this.prenom.split('@')[0] : this.prenom}</h2>
                            <p className='centre fontMoyenne margeHaut10'><b>Ton score :</b> {this.state.score}</p>

                            <p className='centre fontMoyenne margeHaut10'><b>Ton classement du mois :</b> {this.state.classement} / {this.state.nbJoueurs}</p>
   <div className='centre'> <div className='fontMoyenne bandeauLien'>
            <div>Envie de papoter avec la communauté ?</div>
                <div>Envie de connaitre les nouveautés avant tout le monde ?</div>
                <div>Envie de te plaindre (on sait que tu adores) ?</div>
                <div>Rejoins-nous sur la messagerie gratuite <a href="https://discord.gg/hyGc2PD5T6">Discord</a></div></div>
            </div> 
         
      
                            {this.state.score > 1500 ?
                                this.state.loading ? (
                                    <div style={{ textAlign: 'center', padding: 40 }}>
                                        <Spin size="large" tip="Analyse en cours..." />
                                    </div>
                                ) : <React.Fragment>
                                    <div className='couleurTitre margeHaut10 fontMoyenne centre'>Analyse de ton score par IA</div>
                                    <div className='resultatIA' dangerouslySetInnerHTML={{ __html: this.state.messageGpt }}></div>
                                    <div className='couleurTitre margeHaut10 fontMoyenne centre'>Tu peux obtenir une nouvelle analyse si tu augmentes ton score de 500 points.</div>
                                </React.Fragment>
                                :
                                <div className='centre fontMoyenne'>🔒 Débloque l'analyse de tes compétences par IA avec un score supérieur à 1500 points.</div>
                            }


                            <div><Radar tabScoreCategorie={this.state.tabScoreCategorie}></Radar></div>
                            <div><ul className='listem' >{this.state.tabScoreCategorie.map((info, i) => <li key={i + 10000}>{info.msg}</li>)}</ul></div>

                        </React.Fragment>
                    }

                    <h2>Les 10 meilleurs du mois</h2>
                    <Row justify="center">
                        <Col xs={24} sm={24} md={16}><Table pagination={{ defaultPageSize: 10, hideOnSinglePage: true }} columns={this.columns} dataSource={this.state.listePremiers} rowKey='cle' />
                        </Col></Row>

                    {this.state.afficheInfoJoueur &&

                        <div className="centre">
                            <h2>La liste de tous nos jeux cognitifs</h2>
                            <div className="listeJeux">
                                <table>
                                    <thead>
                                        <tr>

                                            <th>Nom du jeu</th>
                                            <th>Ton score</th>
                                            <th>Action</th>
                                        </tr></thead>
                                    <tbody>{tabJeu.map((jeu, i) => this.construireJeu(jeu, i))}
                                        <tr><td>Score total</td><td>{this.state.score}</td></tr>
                                    </tbody>
                                </table></div>
                        </div>
                    }

                </div>
                <p className="centre fontPetite" ><a href="https://evalquiz.com">evalquiz.com</a></p>
            </div></React.Fragment>
    }
}
import React, { Component } from 'react';
import { verifierStatus } from './utilitaire';
import { Table, Row, Col } from 'antd';
import { addFirstName, readFirstName } from '../../../components/commun/localStorage';
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
        console.log(this.prenom)
        this.state =
        {
            listePremiers: [],
            classement: 0,
            score: 0,
            resultatsJeux: [],
            afficheInfoJoueur: false,
            tabScoreCategorie: [],
            messageGpt: '',
            disabled : true,
              nbJeuxTotal : 0,
                nbJeux : 0
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
                msg: obtenirInfoCategorie(x).message + 'inconnue.'

            }
        });

        const listeModifiee = Object.entries(sommeScores).map(([categorie, score]) => {

            return {
                categorie: lienVersCategorie(categorie, "legende"),
                score: Math.min(100, Math.ceil((score / obtenirInfoCategorie(categorie).max) * 100))
            };
        });

        console.log(listeModifiee);
        console.log(tabScoreCategorie);
        for (let index = 0; index < listeModifiee.length; index++) {
            let indexScore = tabScoreCategorie.findIndex(x => x.categorie === listeModifiee[index].categorie);
            if (indexScore !== -1) {
         
                tabScoreCategorie[indexScore].score = listeModifiee[index].score;  
               tabScoreCategorie[indexScore].msg = tabScoreCategorie[indexScore].msg.slice(0, -9) + creerMsgResultat(parseInt(tabScoreCategorie[indexScore].score)) + '.';
                console.log("cc");
                console.log(tabScoreCategorie[indexScore].score)
                console.log(tabScoreCategorie[indexScore].msg);
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

            let disabled = !(res.resultats.length === tabJeu.length);
            console.log(this.prenom !== 'inconnu');
            console.log(this.prenom);
            this.setState({
                listePremiers: res.classementJoueurs,
                classement: res.classement,
                score: res.scoreTotal,
                resultatsJeux: res.resultats,
                afficheInfoJoueur: this.prenom !== 'inconnu',
                nbJoueurs: res.nbJoueurs,
                tabScoreCategorie: this.creerDonneesRadar(res.resultats),
                disabled,
                nbJeuxTotal : tabJeu.length,
                nbJeux : res.resultats.length




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
                    <div className='centre margeHaut10'><div>Il ne faut pas tenir compte des résultats avant d'avoir joué un maximum de jeux.</div><div>Tu as un mois, du 1er au 30, pour améliorer tes scores dans tous les jeux. À chaque début de mois, les résultats sont remis à 0.</div></div>
                      <h2>Les 10 meilleurs du mois</h2>
                    <Row justify="center">
                        <Col xs={24} sm={24} md={16}><Table pagination={{ defaultPageSize: 10, hideOnSinglePage: true }} columns={this.columns} dataSource={this.state.listePremiers} rowKey='cle' />
                        </Col></Row>

                    {this.state.afficheInfoJoueur &&
                        <React.Fragment>
                            <h2>Tes résultats {this.prenom.includes('@') ? this.prenom.split('@')[0] : this.prenom}</h2>
                                                            <p className='centre fontMoyenne margeHaut10'><b>Ton classement du mois :</b> {this.state.classement} / {this.state.nbJoueurs}</p>

                           <div><Radar tabScoreCategorie={this.state.tabScoreCategorie}></Radar></div>
                            <div><ul className='listem' >{this.state.tabScoreCategorie.map((info, i) => <li key={i + 10000}>{info.msg}</li>)}</ul></div>
                         
                         
                         <p className='fontMoyenne centre couleurHonneur margeHaut10'>Quels métiers sont faits pour toi ? Découvre-le grâce à ChatGPT ! (nouveau)</p>
              <div className="texteImageIa"> <img src={ia1} width="150" height="225" alt="chercheuse"></img><div>ou</div>
               <img src={ia2} width="150" height="225" alt="artiste de rue"></img>
              </div>
              
                <p className='centre'>{!this.state.disabled ? <span>Bravo, tu as terminé tous les jeux possibles, tu peux toujours améliorer ton score, ChatGPT te proposera d'autres métiers si tu augmentes ton score de 200 points.</span> : <span>Tu as terminé {this.state.nbJeux} {this.state.nbJeux > 2 ? 'jeu' : 'jeux'} sur {this.state.nbJeuxTotal} possibles.</span>}</p>
                    <p className='centre'>Si tu termines tous les jeux, ChatGPT pourra analyser tes résultats et te donner une liste de métiers qui correspondent à tes compétences. Il ne s'agit pas, bien sûr, d'un résultat scientifique et nous ne contrôlons absolument pas ce que dit ChatGPT.  😊</p>
       <ModalGpt disabled={this.state.disabled} tabScoreCategorie={this.state.tabScoreCategorie} prenom={this.prenom} score={this.state.scoreTotal} ></ModalGpt>
                        

                      
                        
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
                            </div></React.Fragment>}

                </div>
                <p className="centre fontPetite" ><a href="https://evalquiz.com">evalquiz.com</a></p>
            </div></React.Fragment>
    }
}
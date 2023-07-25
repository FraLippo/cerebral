import React, {Component} from 'react';
import { verifierStatus } from './utilitaire';
import { Table, Row, Col } from 'antd';
import { readFirstName } from '../../../components/commun/localStorage';
import { moisEnFrancais } from '../../../components/commun/utilitaire';
import { nomType, tabJeu } from './utilitaire';


export default class ClassementMois extends Component {

    constructor(props) {
        super(props);
        this.prenom = readFirstName();
        const d = new Date();
        this.nomMois = moisEnFrancais[d.getMonth()];
        if (this.prenom === null)
        {
            this.prenom='inconnu';
        }
        this.state =
        {
            listePremiers : [],
            classement : 0,
            score : 0,
            resultatsJeux : [],
            afficheInfoJoueur: false
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
                    return prenom.includes('@') ? prenom.split('@')[0] : prenom;
                }
                
            },
            {
                title: 'Score',
                dataIndex: 'score',
                key: 'score',
            }
           
        ]
 
    }

    async componentDidMount() { 
       
        let url = new URL(process.env.REACT_APP_URL_RAPIDITECLASSEMENTMOIS);

       
        const reponse = await fetch(url + '?prenom=' + this.prenom);
        if (!verifierStatus(reponse.status))
        {
            return;
        }
        if(reponse.ok) {
            const res = await reponse.json();
           
            this.setState({
            listePremiers : res.classementJoueurs,
            classement : res.classement,
            score : res.scoreTotal,
            resultatsJeux : res.resultats,
            afficheInfoJoueur : this.prenom !== 'inconnu'


        })
        }
        else 
        {
            alert("Désolé, il y a un problème.")
            window.location.href = "/"
        }
        
    }

    construireJeu(typeJeu, i)
    {
       
        let nomJeu = nomType(typeJeu);
        let lien = '/'+ typeJeu;
        let resultat = this.state.resultatsJeux.find(x => x.nomJeu === typeJeu);
        let score = 0;
        if (resultat != undefined)
        {
            score = resultat.score
        }
    
        return <tr key={i}><td>{nomJeu}</td><td>{score}</td><td><a href={lien}>Jouer</a></td></tr>
    }

    render()
    {
        return <div className="marge20">
           
        <div>
            <h1>Les résultats du mois  {this.nomMois === 'août' || this.nomMois === 'avril' || this.nomMois === 'octobre' ? "d'" + this.nomMois : 'de ' + this.nomMois}</h1>
        {this.state.afficheInfoJoueur &&
<React.Fragment>
    <h2>Tes résultats {this.prenom.includes('@') ? this.prenom.split('@')[0] : this.prenom}</h2>
<div className="centre">
    <p className='fontMoyenne'>Ton classement : {this.state.classement}</p>
<div className="listeJeux">
<table>
<thead>
<tr>
   
    <th>Nom du jeu</th>
    <th>Score</th>
    <th>Action</th>
  </tr></thead>
    <tbody>{tabJeu.map((jeu,i) => this.construireJeu(jeu,i)) }
    <tr><td>Score total</td><td>{this.state.score}</td></tr>
    </tbody>
</table></div>
</div></React.Fragment>}  
  <h2>Les 10 meilleurs du mois</h2>
             <Row justify="center">
        <Col xs={24} sm={24} md={16}><Table    pagination={{ defaultPageSize: 10, hideOnSinglePage: true }} columns={this.columns} dataSource={this.state.listePremiers} rowKey='cle' />
        </Col></Row>
</div>   
<p className="centre fontPetite" ><a href="https://evalquiz.com">evalquiz.com</a></p>
            </div>    
    }
}
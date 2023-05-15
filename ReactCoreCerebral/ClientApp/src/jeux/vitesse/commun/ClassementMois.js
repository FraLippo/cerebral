import React, {Component} from 'react';
import { verifierStatus } from './utilitaire';
import { Table, Row, Col } from 'antd';
import { readFirstName } from '../../../components/commun/localStorage';



export default class ClassementMois extends Component {

    constructor(props) {
        super(props);
        this.prenom = readFirstName();
        if (this.prenom === null)
        {
            this.prenom='Inconnu';
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
            console.log(res.classementJoueurs);
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


    render()
    {
        return <div className="marge20">
           
        <div> <Row justify="center">
        <Col xs={24} sm={24} md={16}><Table    pagination={{ defaultPageSize: 10, hideOnSinglePage: true }} columns={this.columns} dataSource={this.state.listePremiers} rowKey='cle' /></Col></Row>
</div>
{this.state.afficheInfoJoueur &&<div>
    <div>Tes Resultats {this.prenom.includes('@') ? this.prenom.split('@')[0] : this.prenom}</div>
    <div>Classement Joueur {this.state.classement}</div>
<div>Score {this.state.score}</div>
<div>Liste Jeux {this.state.resultatsJeux.toString()}</div>

</div>}
   
            </div>
            
          
    }
}
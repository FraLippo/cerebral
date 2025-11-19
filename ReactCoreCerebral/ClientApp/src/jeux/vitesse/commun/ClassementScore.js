import React, { Component } from 'react';
import { verifierStatus } from './utilitaire';
import { Link } from 'react-router-dom';
import { nomType } from './utilitaire';
import { Row, Col, Table } from 'antd';
import {readFirstName } from '../../../components/commun/localStorage';


export default class ClassementScore extends Component {

    constructor(props) {
        super(props);
        this.prenom = readFirstName();
        this.state =
        {
            listePremiers: [],
            position: 0,
            score: 0
        }
        if (this.prenom === null) {
            this.prenom = 'inconnu';
        }
        this.columns = [

            {
                title: 'Prénom',
                dataIndex: 'prenom',
                key: 'prenom',
                render: (prenom) => {
                    return prenom.includes('@') ? prenom.split('@')[0].slice(0, 15) : prenom.slice(0, 15);
                }

            },
            {
                title: 'Score',
                dataIndex: 'score',
                key: 'score',
            },
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
            }

        ]
    }

    async componentDidMount() {
        let url = new URL(process.env.REACT_APP_URL_RAPIDITECLASSEMENT);


        const reponse = await fetch(url + "?typeExo=" + this.props.typeExo + "&prenom=" + this.prenom);
        if (!verifierStatus(reponse.status)) {
            return;
        }
        if (reponse.ok) {
            const res = await reponse.json();

            this.setState({
                listePremiers: res.classementScores,
                position: res.position,
                score: res.score
            })
        }
        else {
            alert("Désolé, il y a un problème.")
            window.location.href = "/"
        }

    }


    render() {
        return <React.Fragment>
            <h1 className='centre'>{nomType(this.props.typeExo)}</h1>
            {this.state.score === 0 ? <div className='centre'>Tu n'as pas encore joué à ce jeu.</div> :
                <React.Fragment>
                    <div className='centre fontMoyenne'>Ton score : <b>{this.state.score}</b></div>
                    <div className='centre fontMoyenne'>Ton classement du mois pour ce jeu : <b>{this.state.position}</b></div>
                </React.Fragment>}
            <div className="marge20 centre"><Link className='illusion-btn' to={'/' + this.props.typeExo}>Commencer le jeu</Link></div>
            <div className="marge20 centre"><Link to={'/'}>Retour à l'accueil</Link></div>
            <p>Classement des 20 meilleurs scores du mois en cours. Le classement repart à 0 en début de chaque mois.</p>

            <div className="marge20">

                <div> <Row justify="center">
                    <Col xs={24} sm={24} md={16}><Table pagination={{ defaultPageSize: 10, hideOnSinglePage: true }} columns={this.columns} dataSource={this.state.listePremiers} rowKey='cle' /></Col></Row>
                </div>

            </div>
        </React.Fragment>

    }
}
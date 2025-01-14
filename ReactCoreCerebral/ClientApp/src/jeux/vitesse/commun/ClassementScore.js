import React, {Component} from 'react';
import {verifierStatus} from './utilitaire';
import { Table, Row, Col } from 'antd';

export default class ClassementScore extends Component {

    constructor(props) {
        super(props);
   
        this.state =
        {
            listePremiers : [],
        }
        this.columns = [
          
            {
                title: 'Prénom',
                dataIndex: 'prenom',
                key: 'prenom',
                render: (prenom) => {
                    return prenom.includes('@') ? prenom.split('@')[0].slice(0,15) : prenom.slice(0,15);
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

       
        const reponse = await fetch(url + "?typeExo=" + this.props.typeExo);
        if (!verifierStatus(reponse.status))
        {
            return;
        }
        if(reponse.ok) {
            const res = await reponse.json();

            this.setState({
            listePremiers : res,
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
        return <React.Fragment>
       
        <div className="marge20">
           
        <div> <Row justify="center">
        <Col xs={24} sm={24} md={16}><Table    pagination={{ defaultPageSize: 10, hideOnSinglePage: true }} columns={this.columns} dataSource={this.state.listePremiers} rowKey='cle' /></Col></Row>
</div>
   
            </div>
            </React.Fragment> 
          
    }
}
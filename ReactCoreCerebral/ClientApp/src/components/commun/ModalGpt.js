import { Modal, Button } from 'antd';
import React, { Component } from 'react';
import { verifierStatus } from '../../jeux/vitesse/commun/utilitaire';


export default class ModalGpt extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageGpt: '',
            visible: false,
            loading : false
        }
      
    }

     envoiMessageGPT= async() => {
        let msgHtml = '';
         this.setState({
          loading: true});

//         let message = `Voici les résultats d'une personne à des tests cognitifs (note sur 100) :
// - mémoire (${this.props.tabScoreCategorie[0].score})
// - calcul (${this.props.tabScoreCategorie[2].score})
// - planification (${this.props.tabScoreCategorie[5].score})
// - aptitude verbale (${this.props.tabScoreCategorie[3].score})
// - concentration (${this.props.tabScoreCategorie[1].score})
// - culture générale (${this.props.tabScoreCategorie[4].score})
// Peux-tu me proposer 4 idées de métiers qui pourraient lui convenir, en incluant 3 métiers intellectuels et 1 métier plus manuel ou technique ?
// Pour chaque métier, ajoute une courte description engageante, en utilisant le tutoiement (tu/toi) et un ton positif et encourageant.
// **Réponds uniquement avec un extrait HTML, sans <html>, <body>, ni CSS.**`
    
        let message = `Voici les résultats d'une personne à des tests cognitifs (note sur 100) :
- mémoire (${this.props.tabScoreCategorie[0].score})
- calcul (${this.props.tabScoreCategorie[2].score})
- planification (${this.props.tabScoreCategorie[5].score})
- aptitude verbale (${this.props.tabScoreCategorie[3].score})
- concentration (${this.props.tabScoreCategorie[1].score})
- culture générale (${this.props.tabScoreCategorie[4].score})
Analyse les résultats et crée 4 traits de personnalité.
Pour les bon scores adopte un ton très positif et motivant.
Pour les mauvais scores adopte un ton franc, piquant, avec humour, mais constructif.
Utilise le tutoiement. **Réponds uniquement avec un extrait HTML, sans <html>, <body>, ni CSS.**`
    
        const reponse = await fetch(process.env.REACT_APP_URL_MESSAGEGPT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, prenom: this.props.prenom, score : this.props.score })
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
        }, this.showModal);
       
    }


    showModal = () => {

        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

   

    render() {
        return (
            <>
                <div className='centre'><Button type="primary"
                disabled={this.props.disabled}
                onClick={this.envoiMessageGPT}   
                loading={this.state.loading}
                >
                 
                    Découvre ta personnalité
                </Button></div>
                <Modal closable={false}
                
                cancelButtonProps={{ style: { display: 'none' } }}
                    title="Découvre ta personnalité avec chatGPT"
                    open={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                 
                    <div style = {{userSelect : 'all'}} dangerouslySetInnerHTML={{ __html: this.state.messageGpt }}></div>
                </Modal>
            </>
        );
    }
}
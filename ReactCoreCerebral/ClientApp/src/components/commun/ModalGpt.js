import { Modal, Button } from 'antd';
import React, { Component } from 'react';
import { verifierStatus } from '../../jeux/vitesse/commun/utilitaire';


export default class ModalGpt extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageGpt: '',
            visible: false
        }
      
    }

     envoiMessageGPT= async() => {
        // let msgHtml = '';
        // let message = `Voici les résultats d’une personne à des tests cognitifs (sur 100) : mémoire (${this.props.tabScoreCategorie[0].score}), calcul (${this.props.tabScoreCategorie[2].score}), planification (${this.props.tabScoreCategorie[5].score}), aptitude verbale (${this.props.tabScoreCategorie[3].score}), concentration (${this.props.tabScoreCategorie[1].score}), culture (${this.props.tabScoreCategorie[4].score}). Peux-tu me proposer 3 ou 4 idées de métiers qui lui conviendraient ? Pour chaque métier, ajoute une courte description. Le ton doit rester assez positif et joyeux en utlisant le tu (toi). Réponds uniquement avec un extrait HTML (sans balises <html>, <body>, ni CSS).`
        // console.log(message);
        // const reponse = await fetch(process.env.REACT_APP_URL_MESSAGEGPT, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ message })
        // });
        // if (verifierStatus(reponse.status) && reponse.ok) {

        //     msgHtml = await reponse.text();
        // }
        // else {
        //     msgHtml = "Désolé, il y a un problème. Revenez plus tard."
        // }
        // this.setState({
        //     messageGpt: msgHtml
        // }, this.showModal);
        this.showModal();
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
                onClick={this.envoiMessageGPT}>
                    Ton futur métier ? On l’a trouvé, et c’est…
                </Button></div>
                <Modal closable={false}
                
                cancelButtonProps={{ style: { display: 'none' } }}
                    title=" Vos choix de carrière par chatGpt"
                    open={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div dangerouslySetInnerHTML={{ __html: this.state.messageGpt }}></div>
                </Modal>
            </>
        );
    }
}
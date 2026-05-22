import { Modal, Button, Spin } from 'antd';
import React, { Component } from 'react';
import { verifierStatus } from '../../jeux/vitesse/commun/utilitaire';


export default class ModalGpt extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageGpt: '',
            visible: false,
            loading: false
        }
        console.log("chat")
    }

    componentDidMount = async () => {
        this.envoiMessageGPT();
        this.setState({
            visible: true,
        });
    }

    envoiMessageGPT = async () => {
        console.log("envoi")
        let msgHtml = '';
        this.setState({
            loading: true
        });

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

        //         let message = `Voici les résultats d'une personne à des tests cognitifs (note sur 100) :
        // - mémoire (${this.props.tabScoreCategorie[0].score})
        // - calcul (${this.props.tabScoreCategorie[2].score})
        // - planification (${this.props.tabScoreCategorie[5].score})
        // - aptitude verbale (${this.props.tabScoreCategorie[3].score})
        // - concentration (${this.props.tabScoreCategorie[1].score})
        // - culture générale (${this.props.tabScoreCategorie[4].score})
        // 1.Propose 4 métiers adaptés au profil cognitif du joueur.
        // Pour chaque métier explique brièvement pourquoi il correspond à ses points forts/faiblesses.
        // 2. Donne 1 ou 2 pistes d'amélioration pour élargir ses possibilités professionnelles.
        // Pour les bons scores, adopte un ton enthousiaste et valorisant.
        // Pour les mauvais scores, fais de l'humour franc, un peu piquant, mais toujours constructif.
        // Utilise le tutoiement. **Réponds uniquement avec un extrait HTML, sans <html>, <body>, ni CSS.**`

        const reponse = await fetch(process.env.REACT_APP_URL_RESULTATGPT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.props.prenom)
        });
        if (verifierStatus(reponse.status) && reponse.ok) {
            msgHtml = `<div class='couleurTitre'>Résultat de <strong>${this.props.prenom.includes('@') ? this.props.prenom.split('@')[0] : this.props.prenom}</strong></div>`;
            msgHtml += await reponse.text();
        }
        else {
            msgHtml = "Désolé, il y a un problème. Revenez plus tard."
        }
        this.setState({
            messageGpt: msgHtml,
            loading: false
        });

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
             this.props.finModal();
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
        this.props.finModal();
    };



    render() {
        return (
            <>

                <Modal closable={false}

                    cancelButtonProps={{ style: { display: 'none' } }}
                    title="Analyse des résultats par chatGPT"
                    open={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {this.state.loading ? (
                        <div style={{ textAlign: 'center', padding: 40 }}>
                            <Spin size="large" tip="Analyse en cours..." />
                        </div>
                    ) :
                        <div style={{ userSelect: 'all' }} dangerouslySetInnerHTML={{ __html: this.state.messageGpt }}></div>
                    }
                </Modal>
            </>
        );
    }
}
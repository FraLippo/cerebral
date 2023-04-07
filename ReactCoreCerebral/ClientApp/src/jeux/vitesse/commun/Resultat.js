import React, { Component } from 'react';
import {verifierStatus} from '../commun/utilitaire';
import withRouter from '../../../components/commun/withRouter';
import ButtonLink from '../../../components/commun/ButtonLink';
import Prenom from '../../../components/commun/Prenom';
import Confetti from 'react-confetti';
import { addFirstName, readFirstName } from '../../../components/commun/localStorage';
import { analytics } from '../../../components/commun/analytics';
import {Helmet } from 'react-helmet';
import Ad from  '../../../components/commun/adSense';

class Resultat extends Component {

    constructor(props) {
        super();
        this.state = {
            prenom: "",
            resultat: 0,
            prenomVisible: false
        }
        analytics();
        }

   

    componentDidMount = () => {
        
            const prenom = readFirstName();
            if (prenom === null) {
                this.setState({
                    prenomVisible: true
                })
            }
            else {

                this.envoyerMessage(prenom);

            }
        
    }

    callbackPrenom = (prenom) => {
        addFirstName(prenom);

        this.envoyerMessage(prenom);
        this.setState({
            prenomVisible: false
        })


    }



    async envoyerMessage(prenom) {
        let url = new URL(process.env.REACT_APP_URL_RAPIDITERESULTAT);
        var data = new FormData();
        data.append('typeExo', this.props.typeExo);
        data.append('score', this.props.score);
        data.append('prenom', prenom);

        const reponse = await fetch(url, {
            method: "POST",
            body: data
        })
        if (!verifierStatus(reponse.status)) {
            return;
        }
        if (reponse.ok) {
            const res = await reponse.json();
            this.setState({
                classement: res.classement,
                prenom: res.prenom,
                meilleur: res.meilleur,
                moyenne: res.moyenne,
                nbJoueurs : res.nbJoueurs
            })

        }
        else {
            alert("Désolé, il y a un problème.")
            window.location.href = "/"
        }

    }


    render() {
        return <div>
             <Helmet>
                <title>Résultat des exercices de conjugaison en anglais</title>
                <meta name="description" content="Les résultats des exercices de conjugaison des verbes irréguliers en anglais." />
            </Helmet>
            
            <div className="couleurTitre centre fontMoyenne">Voici tes résultats {this.state.prenom}</div>
            {this.state.prenomVisible && <Prenom callbackPrenom={this.callbackPrenom}></Prenom>}
            <div className='centre fontMoyenne'>
                {this.state.classement === 1 && <div>
                    <Confetti></Confetti>
                    <div>Fantastique <b>{this.state.prenom} ! </b>tu es le meilleur</div>
                    <div>Tu es un champion !</div>
                  
                </div>}
                 <div className="margeHaut30">
                    <p>Ton score : {this.props.score}</p>
                    <div>Le meilleur score : {this.state.meilleur}</div>
                    <div>La moyenne des scores : {this.state.moyenne}</div>
                    <div>Ton classement : <b>{this.state.classement}</b> / {this.state.nbJoueurs}</div>

                <div className="marge20"><ButtonLink titre="Recommencer" href={'/' + this.props.typeExo}></ButtonLink></div>
                <div className="marge20"><ButtonLink titre="Retour à l'accueil" href={'/'}></ButtonLink></div>

                <Ad></Ad>
            </div>
        </div>
        </div>
    }
}

export default withRouter(Resultat);
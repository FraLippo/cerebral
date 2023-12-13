import React, { Component } from 'react';
import { verifierStatus } from '../commun/utilitaire';
import withRouter from '../../../components/commun/withRouter';
import ButtonLink from '../../../components/commun/ButtonLink';
import Prenom from '../../../components/commun/Prenom';
import Confetti from 'react-confetti';
import { addFirstName, readFirstName } from '../../../components/commun/localStorage';

import { Helmet } from 'react-helmet';
import Ad from '../../../components/commun/adSense';

class Resultat extends Component {

    constructor(props) {
        super();
        this.state = {
            prenom: "",
            resultat: 0,
            prenomVisible: false,
            ancien : 0,
            moyenne : 0,
            nbJoueurs :0 
        }

    }



    componentDidMount = () => {

        let prenom = readFirstName();
        if (prenom !== null && !prenom.includes('@')) {
            prenom = prenom + '@' + Math.floor(Math.random() * 100000);
            addFirstName(prenom);
        }
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
                prenom: res.prenom.includes('@') ? res.prenom.split('@')[0] : res.prenom,
                ancien: res.ancien,
                moyenne: res.moyenne,
                nbJoueurs: res.nbJoueurs
            })

        }
        else {
            alert("Désolé, il y a un problème.")
            window.location.href = "/"
        }

    }
    messageEncouragement = () => {
  
        if (!(this.props.score === 0 || this.state.ancien === 0)) {
        
            if (this.props.score > this.state.ancien) {
                return <div className='rotationEspace'> 
                   <div className='rotationVic'> 🏆 Bravo ! nouveau record personnel 🎉</div>
                </div>
           }
            else {
                let pourcent = 100 - ((this.props.score * 100) / this.state.ancien);
                console.log(pourcent);
                if (pourcent <= 20) {
                    return <div ><div>Ton meilleur score ce mois : {this.state.ancien}</div><div className='rotationEspace'>Tu n'es vraiment pas passer loin de battre ton record sur ce jeu.</div></div>
                }
                else {
                    return <div><div>Ton meilleur score ce mois : {this.state.ancien}</div> <div className='rotationEspace'>Tu peux recommencer pour améliorer ton score.</div></div>
                }
           }
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
                    <div>Tu es le champion incontesté de ce jeu !</div>

                </div>}
         
                <div className="margeHaut30">
                    <p>Ton score : {this.props.score}</p>
 

                    <div>{this.messageEncouragement()}</div> 
                  
                    <div>La moyenne des autres joueurs sur l'année : {this.state.moyenne}</div>
                    <div>Ton classement de l'année : <b>{this.state.classement}</b></div>
                  
                    <div className="marge20"><ButtonLink titre="Recommencer" href={'/' + this.props.typeExo}></ButtonLink></div>
                    <div className="marge20"><ButtonLink titre="Retour à l'accueil" href={'/'}></ButtonLink></div>
                 
                  
                    
                </div>  <Ad></Ad>
            </div>
        </div>
    }
}

export default withRouter(Resultat);
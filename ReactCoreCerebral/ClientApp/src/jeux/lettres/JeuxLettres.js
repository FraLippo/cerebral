import React, { Component } from 'react';
import '../../style/jeux.css';
import Confetti from 'react-confetti';
import { Modal } from 'antd';
import EspaceJoueur from './EspaceJoueurs';
import EspaceLettres from './EspaceLettres';
import EspaceSaisie from './EspaceSaisie';
import LogiqueLettre from './LogiqueLettre';
import { Helmet } from 'react-helmet';
import Manche from './Manche';
import withRouter from '../../components/commun/withRouter';
import { readGameNumber } from '../../components/commun/localStorage';
import Regle from './Regle';
import FinEtape from '../concours/FinEtape';
import lettres from '../../images/lettres.png'
import * as signalR from "@microsoft/signalr";

class JeuxLettres extends Component {

    constructor(props) {
        super()
        this.state = {
            msg: "",
            prenomVisible: false,
            prenom: "Vous",
            etat: "attente",
            messageErreur: "",
            msgJoueurs: [],
            compteur: "",
            tabLettres: Array(9).fill(" "),
            tabLettresSaisies : [],
            manche: 0,
            boutonManche : true,
            vainqueur: "",
            messages: LogiqueLettre.messageIntro(),
            erreur : false
        }

        this.id = parseInt(props.params.id);
        this.perdu = false;
        this.concours = false;
        this.donneesJeu ={};
        this.nbJoueurs = parseInt(props.params.nbJoueurs);
        this.niveau = parseInt(props.params.niveau);
        if (this.id > 10000)
        {
            this.concours = true;   
            const idComplet = this.id + '/' + this.nbJoueurs + '/' + this.niveau;
            this.donneesJeu = {id : idComplet,
                idConcours : LogiqueLettre.findConcours(idComplet)}
        }
        this.id = Math.floor(Math.random() * 10000000);
      
        this.tabLettresOrigine = [];
        this.gameNumber = readGameNumber();
        this.hubConnection = null;
        this.motEnCours = "";
        this.dicoLettres = new Map();
      
        this.confirm = Modal.confirm;
  
    }
    setServeur =() =>
    {
   
        this.hubConnection.invoke("InscriptionJeu", this.id, this.state.prenom, this.niveau, this.nbJoueurs).catch(function (err) {
           this.setState({erreur: true});
         
            return console.error(err.toString());
        });
    


    this.hubConnection.on("AfficheCompteRebours", this.afficheCompteRebours);
    this.hubConnection.on("AfficheInfoJoueur", this.afficheInfoJoueur);
    this.hubConnection.on("AfficheMessage", this.afficherMessage);
    this.hubConnection.on("CommencerManche", this.commencerManche);
    this.hubConnection.on("EstValide", this.estValide);
    this.hubConnection.on("FinJeu", this.finJeu);
}

async componentDidMount()  {
         this.hubConnection =  new signalR.HubConnectionBuilder()
        .withUrl(process.env.REACT_APP_URL_LETTREHUB)
        .build();
        await this.hubConnection.start();
        window.onpopstate = this.onBackButtonEvent;
        this.setServeur();
        // const prenom = readFirstName();

        // if (prenom === null) {
        //     this.setState({ prenomVisible: true });
        // }
        // else {
        //     this.setState({ prenom }, this.setServeur);
        // }
    }
    onBackButtonEvent = (e) => {
       this.hubConnection.stop();
}




    commencerManche = (tabLettres, manche) => {
        this.setState({
            etat: "jeu",
            tabLettres,
            manche,
            boutonManche: false, 
            vainqueur: "",
            tabLettresSaisies: []
        });
        this.changeMessage('');
        this.tabLettresOrigine = [...tabLettres];
        for (const lettre of tabLettres) {
            if (this.dicoLettres.has(lettre)) {
                this.dicoLettres.set(lettre, this.dicoLettres.get(lettre) + 1);
            }
            else {
                this.dicoLettres.set(lettre, 1);
            }
        }

    }

    afficheCompteRebours = (compteur) => {
        this.setState({ compteur});
       
        if (compteur === 0)
        {
            this.setState({ boutonManche : true});
            if (this.state.manche === 3)
            {
                this.hubConnection.invoke("FinJeu",this.id).catch(function (err) {
                    return console.error(err.toString());
               });
            }
        
        }


    }

    afficheInfoJoueur = (msgJoueurs) => {
        this.setState({ msgJoueurs })
    }

    afficherMessage = (prenom, message) =>
    {
        let listeMessage = [...this.state.messages];
        listeMessage.unshift({id: listeMessage.length+1, de : prenom, contenu: message});
        this.setState({messages:  listeMessage})
    }

    changeMessage = (msg) => {
        this.setState({ messageErreur: msg });
    }


    estValide = (motCorrect) => {
        this.changeMessage(motCorrect ? "Bravo ! Vous avez trouvé un mot." : `Le mot "${this.motEnCours}" est inconnu dans notre dictionnaire.`);
     if (!motCorrect)
     {
         this.reset(false);
     }
    }


    // callbackPrenom = (prenom) => {
    //     addFirstName(prenom);
    //     this.setState({ prenom }, this.setServeur);
    // }

    verifierReponse = () => {
        const mot = this.state.tabLettresSaisies.join('');
        this.motEnCours = mot;
        let motOK = LogiqueLettre.verifierLettresMot(new Map(this.dicoLettres), mot);
        if (motOK) {
            this.hubConnection.invoke("NouveauMot", this.id, mot, this.state.prenom).catch(function (err) {
                return console.error(err.toString());
            });
        }
        else {
            this.changeMessage(`Au moins une lettre de  "${this.motEnCours}" n'est pas dans le tirage.`);

        }
    }

    nouveauJeu = () =>
    {
        
        this.hubConnection.invoke("NouveauJeu",this.id).catch(function (err) {
            return console.error(err.toString());
       });
    
    } 

    finJeu = (vainqueur) =>
    {
        if (this.nbJoueurs === 1) this.hubConnection.stop();
        if (vainqueur === "L'ordinateur a gagné.") this.perdu=true;
        this.setState({vainqueur});
    }

    envoyerMessage = (message) =>
    {
        this.hubConnection.invoke("NouveauMessage",this.id,this.state.prenom, message ).catch(function (err) {
            return console.error(err.toString());
        });
    }

    clickCarte = (id) =>
    {

        let nouveauTab = [...this.state.tabLettres];
        let nouveauTabSaisies = [...this.state.tabLettresSaisies,this.state.tabLettres[id]];
        nouveauTab[id] = "0";
        this.setState({tabLettres: nouveauTab,
        tabLettresSaisies: nouveauTabSaisies});
    }

    reset = (full) =>
    {
        this.setState({tabLettres:  this.tabLettresOrigine,
            tabLettresSaisies: []});

            if(full) this.changeMessage(''); 
    }

    render() {
        return (         
            <div>
                <Helmet>
                    <title>Jeu entrainement cérébral : le mot le plus long</title>
                    <meta name="description" content="Retrouvez le mot le plus long en jouant avec les lettres" />
                </Helmet>
                {this.state.erreur ? <h2>Désolé, la partie n'est plus disponible. Vous pouvez recommencer une nouvelle partie.</h2>:
                <div className="grilleLettrePrincipal espaceHaut">
             <div className="titreLettre centre"><span className="titreBingo margeDroit tailleMoyenne">Le mot le plus long</span><Regle></Regle></div>
                    {this.state.etat === "attente" && this.nbJoueurs >= 2 && this.state.msgJoueurs[1] !== undefined && this.state.msgJoueurs[1].infoJeu.includes('attente')  && <p>Le seul moyen pour jouer à plusieurs est d'inviter vos amis en leur envoyant ce lien par messagerie : <b>{process.env.REACT_APP_URL_JEUXLETTRES}/{this.gameNumber}/2/2 </b> . Vous pouvez ensuite revenir quand ils sont prêts.</p>}
                    <EspaceLettres clickCarte={this.clickCarte} disabled={this.state.boutonManche} etat={this.state.etat} lettres={this.state.tabLettres}></EspaceLettres>
                   <div className="vainqueur">{!this.perdu && this.state.vainqueur !== '' && <Confetti  />}{this.state.vainqueur}</div>
                    <div className="compteur">{this.state.compteur}</div>
                    <Manche noManche={this.state.manche} concours={this.concours} id={this.id} boutonManche={this.state.boutonManche} nouveauJeu={this.nouveauJeu} niveau={this.niveau} nbJoueurs={this.nbJoueurs}></Manche>
                    {this.concours && this.state.vainqueur !== '' && <FinEtape donneesJeu={this.donneesJeu} perdu={this.perdu}></FinEtape> }
                    <div className="grilleAction">
                        <EspaceJoueur msgJoueurs={this.state.msgJoueurs}></EspaceJoueur>
                        <div className="espaceSaisie">
                        <EspaceSaisie disabled={this.state.boutonManche} reset={this.reset} tabLettresSaisies={this.state.tabLettresSaisies}  verifierReponse={this.verifierReponse} changeMessage={this.changeMessage} messageErreur={this.state.messageErreur}></EspaceSaisie>
              </div>  
                    </div>

                </div>}
                  {this.state.vainqueur !== '' &&  <a href="https://concours.evalquiz.com/presmot"><div className="centre"><img  className="img-responsive" src={lettres} width="360" height="202" alt="défi des jeux de lettres en 99 étapes"></img></div></a> }
                {/*this.state.prenomVisible && <Prenom callbackPrenom={this.callbackPrenom}></Prenom>*/}
            </div>
        );
    }
}

export default withRouter(JeuxLettres);

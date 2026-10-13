import React, { Component } from 'react';

import donneesConcoursCerebral from '../../data/donneesConcoursCerebral';
import donneesConcoursCalcul from '../../data/donneesConcoursCalcul';
import donneesConcoursMot from '../../data/donneesConcoursMot';
import ButtonLink from '../../components/commun/ButtonLink';
import { Steps } from 'antd';
import victory from '../../images/victory.jpg';
import { prochainObjectif, imageJeu, creerEtape } from './logiqueConcours';
import Ad from '../../components/commun/adSense'

import { addGameContest, addAttemptGameContest, addGame, addFirstName, readFirstName, readInfoContest } from '../../components/commun/localStorage';
import SousMenu from '../../components/principal/SousMenu';
import Prenom from '../../components/commun/Prenom';
import confetti from '../../images/confetti.webp';
import Confetti from 'react-confetti';
import applause from '../../images/applause.webp';
import withRouter from '../../components/commun/withRouter';

let donneesConcours = [...donneesConcoursCerebral,...donneesConcoursCalcul,...donneesConcoursMot];


class FinEtape extends Component {

    constructor(props) {
        super();
        this.donneesJeu = props.donneesJeu;
        this.nbFautes = props.nbFautes;
        this.temps = props.temps;
        this.perdu = props.perdu;
        this.concours = null;
        this.erreur = false;
        this.prenomVisible = false;
        this.tentative = 1;

        this.concours = donneesConcours.find(x => x.id === this.donneesJeu.idConcours);
    
        if (this.concours == null) this.erreur = true;
        else {
            this.victoire = this.verificationVictoire();
            this.jeuSuivant = this.rechercheProchainJeu();
            let infoContest = readInfoContest(this.concours.id);
         
                if (this.victoire) {


                    if (this.jeuSuivant.id !== -1) {
                        addGameContest(this.concours.id, this.jeuSuivant.indexEnCours + 1)
                    }
                    else {   
                        this.tentative = infoContest.attempt;
                        if (this.tentative === 1)
                        {
                            this.verifierPrenom();
                        }
                        
                        addGame('defi', this.donneesJeu.idConcours);
                        addGameContest(this.concours.id, 0)  //reset si gagné
                        
                    }
                }
                else {
                    addAttemptGameContest(this.concours.id);
                }
            }
        
        this.state = { erreur: this.erreur };
   

    }

    componentDidMount = () => {

    }
    verifierPrenom = () => {
        const prenom = readFirstName();

        if (prenom === null) {
            this.prenomVisible = true;
        }
        else {
            this.envoyerMessage(prenom);
        }
    }

    callbackPrenom = (prenom) => {
        addFirstName(prenom);
        this.envoyerMessage(prenom);

    }

    verificationVictoire() {
        if ((this.perdu !== undefined && !this.perdu) ||
            (this.nbFautes !== undefined && this.donneesJeu.qualifFaute !== undefined && this.nbFautes <= this.donneesJeu.qualifFaute) ||
            (this.temps !== undefined  && this.donneesJeu.qualifTemps !== undefined && this.temps < this.donneesJeu.qualifTemps)) {
            return true;
        }


        return false;

    }

    envoyerMessage = (prenom) =>
    {
        let url = new URL(import.meta.env.VITE_URL_QUIZAJOUTERTABLEAU);
        var data = new FormData();
        data.append('prenom', prenom);
        data.append('nomConcours', this.concours.titre)
        fetch(url, {
            method: "POST",
            body: data
        })
    }

    rechercheProchainJeu() {
        let jeuSuivant = { type: '', id: -1, titre: '', index: -1 }
        let index = this.concours.liste.findIndex(x => x.id === this.donneesJeu.id);
        if (index === -1) {
            this.erreur = true;
        }
        if (!this.victoire)
        {
            jeuSuivant = this.concours.liste[index]
        }
        else if (index < this.concours.liste.length - 1)
        {
            jeuSuivant = this.concours.liste[index + 1];
        }

        return { ...jeuSuivant, indexEnCours: index };
    }



    render() {
        return <div>
            {this.state.erreur ? <div className="centre"><ButtonLink titre={"Désolé, il y a un problème."} href={'/'}></ButtonLink><p>{"Il est préférable de réaliser les exercices dans l'ordre pour ne pas avoir de message d'erreur (n'utilisez pas le bouton retour)."} </p></div> : <div>{this.victoire ?
                this.jeuSuivant.id !== -1 ? <div className="centre">
                          <div><img className="img-responsive" src={confetti} alt="confetti"></img></div>
                    <h1 className="animationSuite couleurTitre">{"Parfait, tu es qualifié pour le test suivant."}</h1>
                    <p><ButtonLink titre={"Commencer le jeu"} href={'/' + this.jeuSuivant.type + '/' + this.jeuSuivant.id}></ButtonLink></p>
                    <p>{"Objectif prochain test :"} <b>{prochainObjectif(this.jeuSuivant.id)}</b></p>
                    {imageJeu(this.jeuSuivant.titre)}
                </div>

                    : <div className="centre">
                        <div><img className="img-responsive" src={applause} alt="applause"></img></div>
                        <div className="animationSuite"><p className="grandeLettre couleurTitre">{"Bravo ! Tu as réussi le défi."}</p>
                       <h1>{this.concours.titre}</h1></div>
                        <p>{"Tu as eu besoin de"} <b>{this.tentative} {this.tentative <= 1 ? "tentative"  : "tentatives"}</b>.</p><img className="img-responsive" src={victory} alt="victoire"></img>
                    {this.tentative === 1 &&  <div><Confetti width={window.innerWidth - 30} height={300} /><p className="tailleMoyenne">{"Félicitation ! Tu as réussi en une seule tentative, tu es désormais sur notre"} {"tableau d'honneur de la page d'accueil"}.</p></div>}
                        {this.prenomVisible && <Prenom callbackPrenom={this.callbackPrenom}></Prenom>
                        }<Ad></Ad></div>
                : <div className="centre"><p>{"Malheureusement tu n'as pas réussi le test."} </p>
                    <p>{"Tu peux recommencer."}</p>
                    <div><ButtonLink titre={"Refaire le test"} href={'/' +  this.jeuSuivant.type + '/' + this.jeuSuivant.id}></ButtonLink></div></div>}
                <div className="margeStep">
                    
                    <div className="margeStep">
                <Steps size="small" current={this.victoire ? this.jeuSuivant.indexEnCours + 1 : this.jeuSuivant.indexEnCours} items={creerEtape(this.concours.liste)}>  
                </Steps>

            </div>
                    <p className="centre espaceHautMemoire">{"Votre progression est automatiquement sauvegardée."}</p>
                </div>
                {this.jeuSuivant.id === -1 && <div>
                <SousMenu type="defiCerebral" titre="Les défis cérébraux" supprimer={this.concours.id}></SousMenu>
                <SousMenu type="defiCalcul" titre="Les défis calcul" supprimer={this.concours.id}></SousMenu>
                <SousMenu type="defiMot" titre="Les défis des chiffres et des lettres" supprimer={this.concours.id}></SousMenu>
                </div>}
            </div>}
        </div>
    }
}
export default withRouter(FinEtape);
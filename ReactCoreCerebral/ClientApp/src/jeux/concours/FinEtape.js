import React, { Component } from 'react';

import donneesConcoursCerebral from '../../data/donneesConcoursCerebral';
import donneesConcoursCalcul from '../../data/donneesConcoursCalcul';
import donneesConcoursMot from '../../data/donneesConcoursMot';
import ButtonLink from '../../components/commun/ButtonLink';
import { Link } from 'react-router-dom';
import { Steps } from 'antd';
import victory from '../../images/victory.jpg';
import { prochainObjectif, imageJeu, titreJeu } from './logiqueConcours';
import intl from 'react-intl-universal';
import Ad from '../../components/commun/adSense'
import { analytics } from '../../components/commun/analytics';
import { addGameContest, addAttemptGameContest, addGame, addFirstName, readFirstName, readInfoContest } from '../../components/commun/localStorage';
import SousMenu from '../../components/principal/SousMenu';
import Prenom from '../../components/commun/Prenom';
import confetti from '../../images/confetti.webp';
import Confetti from 'react-confetti';
import applause from '../../images/applause.webp';
const { Step } = Steps;
let donneesConcours = [...donneesConcoursCerebral,...donneesConcoursCalcul,...donneesConcoursMot];


export default class FinEtape extends Component {

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
            if (infoContest === -1 || this.jeuSuivant.indexEnCours !== infoContest.level) {
                this.erreur = true;
            }
            else {
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
        }
        this.state = { erreur: this.erreur };
        analytics();

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
        let url = new URL(process.env.REACT_APP_URL_QUIZAJOUTERTABLEAU);
        var data = new FormData();
        data.append('prenom', prenom);
        data.append('nomConcours', intl.get(this.concours.titre))
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
            {this.state.erreur ? <div className="centre"><ButtonLink titre={intl.get('DEFI_PB')} href={'/'}></ButtonLink><p>{intl.get('DEFI_WARNING')} </p></div> : <div>{this.victoire ?
                this.jeuSuivant.id !== -1 ? <div className="centre">
                          <div><img className="img-responsive" src={confetti} alt="confetti"></img></div>
                    <h1 className="animationSuite couleurTitre">{intl.get('DEFI_PARFAIT')}</h1>
                    <p><ButtonLink titre={intl.get('DEFI_DEBUT')} href={'/' + intl.get(this.jeuSuivant.type) + '/' + this.jeuSuivant.id}></ButtonLink></p>
                    <p>{intl.get('DEFI_OBJECTIF')} <b>{prochainObjectif(this.jeuSuivant.id)}</b></p>
                    {imageJeu(this.jeuSuivant.titre)}
                </div>

                    : <div className="centre">
                        <div><img className="img-responsive" src={applause} alt="applause"></img></div>
                        <div className="animationSuite"><p className="grandeLettre couleurTitre">{intl.get('DEFI_BRAVO')}</p>
                       <h1>{intl.get(this.concours.titre)}</h1></div>
                        <p>{intl.get('DEFI_TENTATIVE1')} <b>{this.tentative} {this.tentative <= 1 ? intl.get('DEFI_TENTATIVE2')  : intl.get('DEFI_TENTATIVE3')}</b>.</p><img className="img-responsive" src={victory} alt="victoire"></img>
                    {this.tentative === 1 &&  <div><Confetti width={window.innerWidth - 30} height={300} /><p className="tailleMoyenne">{intl.get('DEFI_HONNEUR1')} <Link to={intl.get('LIEN_TABLEAU')}>{intl.get('DEFI_HONNEUR2')}</Link>.</p></div>}
                        {this.prenomVisible && <Prenom callbackPrenom={this.callbackPrenom}></Prenom>
                        }<Ad></Ad></div>
                : <div className="centre"><p>{intl.get('DEFI_ERREUR')} </p>
                    <p>{intl.get('DEFI_RECO')}</p>
                    <div><ButtonLink titre={intl.get('DEFI_REFAIRE')} href={'/' +  intl.get(this.jeuSuivant.type) + '/' + this.jeuSuivant.id}></ButtonLink></div></div>}
                <div className="margeStep">
                    <Steps size="small" current={this.victoire ? this.jeuSuivant.indexEnCours + 1 : this.jeuSuivant.indexEnCours}>
                        {this.concours.liste.map((jeu, i) => <Step key={i} title={titreJeu(jeu.titre)}></Step>)}
                        <Step title={intl.get('DEFI_FIN')}></Step>
                    </Steps>
                    <p className="centre espaceHautMemoire">{intl.get('DEFI_PROGRESSION')}</p>
                </div>
                {this.jeuSuivant.id === -1 && <div>
                <SousMenu type="defiCerebral" titre="NOM_DEFI_CEREBRAL" supprimer={this.concours.id}></SousMenu>
                <SousMenu type="defiCalcul" titre="NOM_DEFI_CALCUL" supprimer={this.concours.id}></SousMenu>
                <SousMenu type="defiMot" titre="NOM_DEFI_MOT" supprimer={this.concours.id}></SousMenu>
                </div>}
            </div>}
        </div>
    }
}
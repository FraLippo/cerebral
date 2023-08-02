import React, { Component } from 'react';
import Pyramide from "./Pyramide";
import LogiquePyramide from './LogiquePyramide';
import Choix from './Choix';
import { message } from 'antd';
import intl from 'react-intl-universal';
import ResultatCommun from '../../components/commun/ResultatCommun';
import FinEtape from '../concours/FinEtape';
import ProgressBar from '../../components/commun/ProgressBar';
import withRouter from '../../components/commun/withRouter';

import { Helmet } from 'react-helmet';
import { addGame } from '../../components/commun/localStorage';


class JeuxPyramide extends Component {

    constructor(props) {
        super(props);
        this.id = parseInt(props.params.id);
        this.logiquePyramide = new LogiquePyramide(this.id);
       
            const tabValeurs = this.logiquePyramide.donnees.info.valeurs;
            this.tabChoixOrigine = this.logiquePyramide.donnees.info.choix;
            this.tabValeursCorrection = this.logiquePyramide.donnees.info.valeursCorrection;
            this.taille = this.logiquePyramide.donnees.info.taille;
            this.nbFauteMax = this.logiquePyramide.donnees.info.nbFauteMax;
            this.temps = this.logiquePyramide.donnees.info.temps;
            this.perdu = false;
            this.reponseEnCours = false;
         
            this.dureeJeu = Date.now();
            this.state = {
                tabValeurs,
                tabChoix: [...this.tabChoixOrigine],
                numeroEnCours: -1,
                choixEnCours: -1,
                nbFautes: 0,
                afficheResultat: false
            }

            addGame('jeuxpyramide', this.id);
       

        
    }
    clickNumero = (id) => {
        if (this.state.tabValeurs[id] === '?' && !this.reponseEnCours) {
            if (this.state.numeroEnCours === id) {
                this.setState({ numeroEnCours: -1 })
            }
            else {
                this.setState({ numeroEnCours: id }, this.verificationResultat);
            }
        }
    }

    clickChoix = (id) => {
        if (!this.reponseEnCours) {
            if (id === this.state.choixEnCours) {
                this.setState({ choixEnCours: -1 });
            }
            else {
                this.setState({ choixEnCours: id }, this.verificationResultat);
            }
        }
    }
    finPartie = () => 
    {
        this.reponseEnCours = false;
        this.setState({
            afficheResultat: true
        })
    }
    verificationFin = (nouvelleValeurs) => {
        if (nouvelleValeurs.find(x => x === '?') === undefined) {
            this.reponseEnCours = true;
            message.success(intl.get('FINREUSSI'), 1.5, this.finPartie);
        
            this.dureeJeu = Date.now() - this.dureeJeu;  
            return true;
        }
        return false;

    }

    verificationPerdu = (fautes) => {
        if (fautes === this.nbFauteMax) {
            this.perdu = true;
            this.reponseEnCours = true;
            this.dureeJeu = Date.now() - this.dureeJeu;
            message.error(intl.get('PERDU'), 3, this.finPartie);
            return true;
        }
        return false;
    }

    finJeu = () =>
    {
        if (!this.reponseEnCours)
        {
            this.setState({  tabValeurs: [...this.tabValeursCorrection]});
            this.verificationPerdu(this.nbFauteMax);
        
        }
    }

    verificationResultat = () => {
        let nouveauChoix = [...this.state.tabChoix];
        let nouvellesValeurs = [...this.state.tabValeurs];
        let fautes = this.state.nbFautes;
        if (this.state.numeroEnCours !== -1 && this.state.choixEnCours !== -1) {
            if (this.tabValeursCorrection[this.state.numeroEnCours] === this.state.tabChoix[this.state.choixEnCours]) {
                nouveauChoix[this.state.choixEnCours] = '';
                nouvellesValeurs[this.state.numeroEnCours] = this.tabValeursCorrection[this.state.numeroEnCours];
                if (!this.verificationFin(nouvellesValeurs)) {
                    message.success(intl.get('BRAVO'), 1.5);
                }
               
            
              
            }
            else {
                fautes++;
                if (!this.verificationPerdu(fautes))
                {
                    message.error(intl.get('MAUVAIS'), 1.5);
                }
                else
                {
                    nouvellesValeurs = this.tabValeursCorrection;
                }
               

            }

            this.setState({ numeroEnCours: -1, choixEnCours: -1, tabChoix: nouveauChoix, tabValeurs: nouvellesValeurs, nbFautes: fautes })
        }
    }



    render() {
        return <div className="pyramide">
             <Helmet>
        <title>{intl.get('PY_TITLE')}</title>
        <meta name="description" content={intl.get('PY_META')} />
               </Helmet>
            <h1 className="couleurTitre">{intl.get('PY_TITRE')}</h1>
 
        {this.state.afficheResultat ? this.logiquePyramide.concours ? <FinEtape donneesJeu={this.logiquePyramide.donnees} perdu={this.perdu}></FinEtape> : <ResultatCommun  dureeMax={this.temps/10} perdu={this.perdu} prochainJeu={this.logiquePyramide.obtenirProchainJeu()} type='pyramide' idTest={this.id} dureeJeu={this.dureeJeu}></ResultatCommun> : <React.Fragment>
        <div> <p className="marge10">{intl.get('PY_REGLE1')}<br></br>{intl.get('PY_REGLE2')}</p>
        <div>{intl.get('PY_FAUTE')} <b>{this.state.nbFautes}</b> / {this.nbFauteMax}</div>
        <Pyramide numeroEnCours={this.state.numeroEnCours} clickNumero={this.clickNumero} taille={this.taille} valeurs={this.state.tabValeurs}></Pyramide></div>
            <div className="centrePy"><Choix choixEnCours={this.state.choixEnCours} clickChoix={this.clickChoix} tabChoix={this.state.tabChoix}></Choix></div>
            <ProgressBar  temps={this.temps} finTimer={this.finJeu}></ProgressBar></React.Fragment>}</div>
    }
}

export default withRouter(JeuxPyramide);
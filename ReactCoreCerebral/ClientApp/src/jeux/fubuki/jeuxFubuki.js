import React, { Component } from 'react';
import Logique from './Logique';
import Grille from './Grille';
import Choix from './Choix';
import { Button, message } from 'antd';
import intl from 'react-intl-universal';
import { Helmet } from 'react-helmet';
import ResultatCommun from '../../components/commun/ResultatCommun';
import FinEtape from '../concours/FinEtape';
import ProgressBar from '../../components/commun/ProgressBar';
import { addGame } from '../../components/commun/localStorage';
import { analytics } from '../../components/commun/analytics';
import withRouter from '../../components/commun/withRouter';

class JeuxFubuki extends Component {

    constructor(props) {
        super(props);
        this.id = parseInt(this.props.params.id);
   
        this.logiqueFubuki = new Logique(this.id);

       
            this.taille = this.logiqueFubuki.donnees.info.taille;
            const tabValeurs = this.logiqueFubuki.donnees.info.valeurs;
            this.tabValeursOrigine = [...this.logiqueFubuki.donnees.info.valeurs];
            const tabChoix = this.logiqueFubuki.donnees.info.choix;
            this.tabChoixOrigine = [...this.logiqueFubuki.donnees.info.choix];
            this.temps = this.logiqueFubuki.donnees.info.temps;
            this.perdu = false
            this.reponseEnCours = false;
            this.dureeJeu = Date.now();
            this.state = {
                tabValeurs,
                tabChoix,
                choixEnCours: -1,
                numeroEnCours: -1,
                afficheResultat: false,

            }

            addGame('jeuxFubuki', this.id);
            analytics();
        
    }

    clickNumero = (id) => {

        if (this.tabValeursOrigine[id] === '?' && !this.reponseEnCours) {
            if (this.state.numeroEnCours === id) {

                this.setState({ numeroEnCours: -1 }, this.verifierModification)
            }
            else {
                this.setState({ numeroEnCours: id }, this.verifierModification);
            }

        }
    }
    clickChoix = (id) => {
        if (!this.reponseEnCours) {
            if (id === this.state.choixEnCours) {
                this.setState({ choixEnCours: -1 }, this.verifierModification);
            }
            else {
                this.setState({ choixEnCours: id }, this.verifierModification);
            }

        }
    }

    verifierModification = () => {

        let nouveauTableauValeurs = [...this.state.tabValeurs];
        let nouveauChoix = [...this.state.tabChoix];
        let modif = false;
        if (this.state.numeroEnCours !== -1 && !this.reponseEnCours) {
            const i = this.tabChoixOrigine.findIndex((x, index) => x === nouveauTableauValeurs[this.state.numeroEnCours] && this.state.tabChoix[index] === '');
            //suppression
            if (this.state.choixEnCours === -1 && nouveauTableauValeurs[this.state.numeroEnCours] !== '?') {

                nouveauChoix[i] = this.state.tabValeurs[this.state.numeroEnCours];
                nouveauTableauValeurs[this.state.numeroEnCours] = this.tabValeursOrigine[this.state.numeroEnCours];
                modif = true;

            }//modification
            if (this.state.choixEnCours !== -1) {
                if (nouveauTableauValeurs[this.state.numeroEnCours] !== '?') {
                    nouveauChoix[i] = nouveauTableauValeurs[this.state.numeroEnCours];
                }
                nouveauTableauValeurs[this.state.numeroEnCours] = this.state.tabChoix[this.state.choixEnCours];
                nouveauChoix[this.state.choixEnCours] = '';
                modif = true;
            }
            if (modif) {
                this.setState({
                    tabChoix: nouveauChoix,
                    tabValeurs: nouveauTableauValeurs,
                    choixEnCours: -1,
                    numeroEnCours: -1
                }, this.verificationVictoire);
            }


        }
    }

    finPartie = () => {
        this.reponseEnCours = false;
        this.reset();
        this.setState({
            afficheResultat: true
        })
    }

    finJeu = () => {
        if (!this.reponseEnCours) {
            this.perdu = true;
            this.reponseEnCours = true;
            this.dureeJeu = Date.now() - this.dureeJeu;
            message.error(intl.get('PERDU'), 3, this.finPartie);

        }
    }

    verificationVictoire = () => {
        let fin = this.state.tabValeurs.findIndex(x => x === '?');
        if (fin === -1) {
            this.dureeJeu = Date.now() - this.dureeJeu;
            this.reponseEnCours = true;
            if (!Logique.verificationVictoire(this.state.tabValeurs, this.taille)) {
                this.perdu = false;
                message.success(intl.get('FINREUSSI'), 1.5, this.finPartie);
            }
            else {
                this.perdu = true;
                message.error(intl.get('PERDU'), 3, this.finPartie);
            }
        }

    }



    reset = () => {

        this.setState({
            tabChoix: [...this.tabChoixOrigine],
            tabValeurs: [...this.tabValeursOrigine],
            choixEnCours: -1,
            numeroEnCours: -1
        });

    }

    render() {

        return <React.Fragment><h1>{intl.get('FU_TITRE')}</h1>
            {this.state.afficheResultat ? this.logiqueFubuki.concours ? <FinEtape donneesJeu={this.logiqueFubuki.donnees} perdu={this.perdu}></FinEtape> : <ResultatCommun perdu={this.perdu} prochainJeu={this.logiqueFubuki.obtenirProchainJeu()} type="fubuki" idTest={this.id} dureeJeu={this.dureeJeu} dureeMax={this.temps/10}></ResultatCommun> :
                <div><div className="centreFu">
                    <Helmet>
                        <title>Le Fubuki</title>
                        <meta name="description" content={intl.get('FU_META')} />
                    </Helmet>

                    <p>{intl.get('FU_REGLE')}</p>
                    <Grille numeroEnCours={this.state.numeroEnCours} grilleOrigine={this.tabValeursOrigine} clickNumero={this.clickNumero} taille={this.taille} grille={this.state.tabValeurs}></Grille>
                    <Choix choixEnCours={this.state.choixEnCours} clickChoix={this.clickChoix} tabChoix={this.state.tabChoix}></Choix>

                    <div><Button danger onClick={this.reset} >{intl.get('RESET')}</Button></div>

                </div>
                    <ProgressBar temps={this.temps} finTimer={this.finJeu}></ProgressBar>
                </div>}</React.Fragment>
    }


}

export default withRouter(JeuxFubuki);
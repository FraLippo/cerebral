import React, { Component } from 'react';
import Choix from './Choix';
import Reponse from './Reponse';
import { Button, message } from 'antd';
import ResultatCommunFaute from '../../components/commun/ResultatCommunFaute';
import LogiqueMath from './LogiqueMath';
import { analytics } from '../../components/commun/analytics';
import { Helmet } from 'react-helmet';
import { withRouter} from 'react-router-dom';
import { addGame } from '../../components/commun/localStorage';
import FinEtape from '../concours/FinEtape';



 class MathJeu extends Component {

    constructor(props) {
        super();
       
        this.id = parseInt(props.match.params.id);
        this.donneeJeu = null;
        this.reponseEnCours = false;
        this.noQuestion = 0;
        this.indiceReponse = 0;
        this.tabChoixInitiale = [];
        this.tabReponseInitiale = [];
        this.state = {
            tabChoix: [],
            tabReponse: [],
            tabEnonce : [],
            fin: false,
            nbFautes: 0,
            nbQuestionTotal: 0,
            enonceDebut: '',
            enonceFin: '',
            questionEnCours: 0
        }
        analytics();

    }


    async componentDidMount() {
        this.donneeMath = new LogiqueMath(this.id);
        if (this.donneeMath.donnees.info != null) {
            this.donneeJeu = this.donneeMath.donnees.info;
            this.dureeJeu = Date.now();
            this.initJeu();
            addGame('jeuxMath', this.id);
        } else {
            alert("Désolé, il y a un problème.")
            window.location.href = "/";
        }
    }

    initJeu = () => {
      

        let donneeConcours = this.donneeJeu[this.noQuestion];
        const enonceComplet = donneeConcours.enonce;

        this.tabChoixInitiale = donneeConcours.choix.split('');
        this.tabReponseInitiale = donneeConcours.reponse.split('');
       
        const indexBase = enonceComplet.indexOf('@');

        let enonceDebut = '';
        let enonceFin = '';
        if (indexBase !== -1) {
            enonceDebut = enonceComplet.substring(0, indexBase);
            if (enonceDebut.includes('$'))
            {
                enonceDebut = enonceDebut.replace('$','');
                enonceDebut = '<div>' + enonceDebut + '</div>';
            }

            enonceFin = enonceComplet.substring(indexBase + this.tabReponseInitiale.length, enonceComplet.length);
        }
        const tabReponse = new Array(this.tabReponseInitiale.length).fill(' ');
         const nbQuestionTotal = this.donneeJeu.length;
         this.setState({ tabChoix: this.tabChoixInitiale, tabReponse, enonceDebut, enonceFin, nbQuestionTotal, noQuestion: this.noQuestion });

    }

    reset = () => {
        this.indiceReponse = 0;
        this.setState({ tabChoix: this.tabChoixInitiale, tabReponse: new Array(this.tabReponseInitiale.length).fill(' ') });
    }

    suivant = () => {
        this.reponseEnCours = false;
        this.indiceReponse = 0;
        this.noQuestion++;
        if (this.noQuestion === this.donneeJeu.length) {
            this.dureeJeu = Date.now() - this.dureeJeu;
            this.setState({ fin: true });
        }
        else {
            this.initJeu();
        }


    }

    clicChoix = (i) => {
        if (this.reponseEnCours) return;
        if (this.state.tabChoix[i] === '') return;
        let nouveauTabReponse = [...this.state.tabReponse];
        let nouveauTabChoix = [...this.state.tabChoix];

        nouveauTabReponse[this.indiceReponse] = nouveauTabChoix[i];
        nouveauTabChoix[i] = '';
        let nbFautes = this.state.nbFautes;
        this.indiceReponse++;
        if (this.indiceReponse === this.tabReponseInitiale.length) {
            this.reponseEnCours = true;
            if (nouveauTabReponse.toString() === this.tabReponseInitiale.toString()) {
                message.success('Bravo', 1, this.suivant);
            }
            else {
                nbFautes++;
                message.error("Erreur, réponse : " + this.tabReponseInitiale.join(''), 3, this.suivant);
            }
        }
        this.setState({
            tabReponse: nouveauTabReponse,
            tabChoix: nouveauTabChoix,
            nbFautes
        });
    }

    render() {

        return <div>
            <Helmet>
                <title>Test de calcul mental en ligne pour tous les niveaux du cm1 aux seniors</title>
                <meta name="description" content="Des petits exercices de calcul mental en ligne pour tous les âges et pour tous les niveaux : ce2, cm1, cm2 et adultes." />
            </Helmet>
            <h1>Le jeu du calcul mental</h1>
            <p>Trouver les chiffres ou les sigles manquants</p>

            {this.state.fin ? this.donneeMath.concours ? <FinEtape donneesJeu={this.donneeMath.donnees} nbFautes={this.state.nbFautes}></FinEtape> :<ResultatCommunFaute prochainJeu={this.donneeMath.obtenirProchainJeu()} type='math' idTest={this.id} nbFautes={this.state.nbFautes}></ResultatCommunFaute> :
                <div>
                    <div className="fontMoyenne  hauteurMath">
                        <span dangerouslySetInnerHTML={{__html: this.state.enonceDebut}}></span>
                        <Reponse tabReponse={this.state.tabReponse}></Reponse>
                        <span>{this.state.enonceFin}</span>
                        
                      
                        </div>  
                    <Choix clicChoix={this.clicChoix} tabChoix={this.state.tabChoix}></Choix>
                    <div className="marge10"><Button onClick={this.reset}>Reset</Button></div>

                    <div className="marge10">Question: {this.state.noQuestion + " / " + this.state.nbQuestionTotal}</div>
                    <div className="marge10">Nombre de fautes : {this.state.nbFautes}</div>
                </div>}
        </div>

    }
}

export default withRouter(MathJeu);
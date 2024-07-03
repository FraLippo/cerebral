import React, { Component } from 'react';
import '../../style/jeux.css';
import Confetti from 'react-confetti';
import Prenom from '../../components/commun/Prenom';
import EspaceLettres from './EspaceLettres';
import EspaceSaisie from './EspaceSaisie';
import LogiqueLettre from './LogiqueLettre';
import { Helmet } from 'react-helmet';
import Manche from './Manche';
import withRouter from '../../components/commun/withRouter';
import CompteRebours from '../../components/commun/CompteRebours';
import Regle from './Regle';
import anchor from '../../images/anchor.jpg';
import Dialogue from './Dialogue';
import { addFirstName, readFirstName} from '../../components/commun/localStorage';



class JeuxLettres extends Component {

    constructor(props) {
        super();
        let niveau = parseInt(props.params.niveau);
        this.niveau = niveau === 1 ? 0 : niveau === 2 ? 4 : niveau === 3 ? 8 : niveau === 4 ? 17 : 0;
     this.temps = 30;

    
        let prenom = LogiqueLettre.obtenirPrenom();
        this.prenom = readFirstName();
        let infoPartie = this.resetInfo(prenom);
        this.state = {
            prenomAdversaire: prenom,
            messageErreur: "",
            compteur: "",
            tabLettres: Array(9).fill(" "),
            tabLettresSaisies: [],
            manche: 1,
            boutonManche: true,
            etape: 'debut',
            scoreJoueur: 0,
            scoreAdversaire: 0,
            infoPartie,
            prenomVisible : false

        }
        this.lettresJeu = null;
        this.perdu = false;
        this.tabLettresOrigine = [];


        this.motEnCours = "";




    }

    resetInfo(prenom) {
      
        return {
            adversaire: prenom,
            prenom: this.prenom == null ? '' : this.prenom.includes('@') ? this.prenom.split('@')[0].slice(0, 15)  : this.prenom.slice(0, 15),
            niveau: LogiqueLettre.obtenirNiveau(this.niveau).titre,
            intervalle: LogiqueLettre.obtenirNiveau(this.niveau).intervalle,
            nbLettres: 0,
            resultatManche: '',
            resultatFinal: '',
            nbLettresAdversaire: 0,
            motAdversaire: '',
            maj: true
        }

    }


    nouveauJeu = () => {
        let url = new URL(process.env.REACT_APP_URL_INITJEU);
        var data = new FormData();
        data.append('niveau', this.niveau);
        fetch(url, {
            method: "POST",
            body: data
        }).then(res => res.json())
            .then(res => {

                let tabLettres = res.lettres.split('');
                this.tabLettresOrigine = tabLettres;
                this.setState({
                    tabLettres: [...tabLettres],
                    boutonManche: false,
                    tabLettresSaisies: [],

                });
                this.changeMessage('');
         
                this.motOrdinateur = res.mot;
                this.motEnCours = '';

            });

    }

    continuer = (suite) => {

        if (suite && this.niveau < LogiqueLettre.obtenirNbNiveau() - 1) {
            this.niveau++;
       
        }
        let infoPartie = { ...this.state.infoPartie };
        infoPartie.maj = false;
        this.setState({ infoPartie }, this.continuerMaj)
    }

    continuerMaj = () => {

        let prenom = LogiqueLettre.obtenirPrenom();
        let infoPartie = this.resetInfo(prenom);
        this.setState({
            prenomAdversaire: prenom,
            messageErreur: "",
            compteur: "",
            tabLettres: Array(9).fill(" "),
            tabLettresSaisies: [],
            manche: 1,
            boutonManche: true,
            etape: 'debut',
            scoreJoueur: 0,
            scoreAdversaire: 0,
            infoPartie,


        })


    }

    componentDidMount() {

    }


    verifierReponse = () => {


        const mot = this.state.tabLettresSaisies.join('');
        if (mot.length <= 1) {
            this.motEnCours = '';
            this.changeMessage("Les mots doivent faire plus d'une lettre.");
            return;
        }
   
        this.motEnCours = mot;

        let url = new URL(process.env.REACT_APP_URL_VALIDITEMOT);
        var data = new FormData();
        data.append('mot', mot);
        fetch(url, {
            method: "POST",
            body: data
        }).then(res => res.json())
            .then(res => {
                if (!res.resultat) {
                    this.motEnCours = '';
                    this.changeMessage("Le mot  " + this.motEnCours + " est inconnu dans notre dictionnaire.");

                }
                else {

                    this.changeMessage("Tu as trouvé un mot de " + this.motEnCours.length + " lettres.");

                }
            });
    }




    afficheCompteRebours = (compteur) => {
        this.setState({ compteur });

        if (compteur === 0) {
            this.setState({ boutonManche: true });
            if (this.state.manche === 3) {

            }

        }
    }



    changeMessage = (msg) => {
        this.setState({ messageErreur: msg });
    }




    clickCarte = (id) => {

        let nouveauTab = [...this.state.tabLettres];
        let nouveauTabSaisies = [...this.state.tabLettresSaisies, this.state.tabLettres[id]];
        nouveauTab[id] = "0";
        this.setState({
            tabLettres: nouveauTab,
            tabLettresSaisies: nouveauTabSaisies
        });
    }

    reset = (full) => {
        this.setState({
            tabLettres: this.tabLettresOrigine,
            tabLettresSaisies: []
        });

        if (full) this.changeMessage('');
    }

    ajoutTableauHonneur()
    {
        const prenom = readFirstName();

        if (prenom === null) {
            this.setState({ prenomVisible: true });
        }
        else {
            this.envoyerMessage(prenom);
        }
    }

    callbackPrenom = (prenom) => {
        addFirstName(prenom);
        this.envoyerMessage(prenom);
        this.setState({ prenomVisible: false });

    }

    
    envoyerMessage = (prenom) =>
        {
            let url = new URL(process.env.REACT_APP_URL_QUIZAJOUTERTABLEAUMOT);
            var data = new FormData();
            data.append('prenom', prenom);
            data.append('niveau', this.niveau)
            fetch(url, {
                method: "POST",
                body: data
            })
        }

    finTimer = () => {
        let etape = '';
        let infoPartie = { ...this.state.infoPartie };
        if (this.state.manche === 3) {
            etape = 'fin';
        }
        else {
            etape = 'finManche';
        }
        let scoreJoueur = this.state.scoreJoueur;
        let scoreAdversaire = this.state.scoreAdversaire;
        infoPartie.motAdversaire = this.motOrdinateur;
        if (this.motOrdinateur.length > this.motEnCours.length) {
            infoPartie.resultatManche = 'défaite';
            scoreAdversaire += 2 + this.motOrdinateur.length;
        }
        else if (this.motOrdinateur.length === this.motEnCours.length) {
            infoPartie.resultatManche = 'nul';
        }
        else {
            infoPartie.resultatManche = 'victoire';
            scoreJoueur += 2 + this.motEnCours.length;
        }
        infoPartie.nbLettresAdversaire = this.motOrdinateur.length;
        infoPartie.nbLettres = this.motEnCours.length;

        if (etape === 'fin') {
            if (scoreJoueur > scoreAdversaire) {

                infoPartie.resultatFinal = 'victoire';
                if (this.niveau >= 5) {
                    this.ajoutTableauHonneur();
                }

            }
            else if (scoreJoueur === scoreAdversaire) {
                infoPartie.resultatFinal = 'nul';
            }
            else {

                infoPartie.resultatFinal = 'défaite';
            }
        }


        this.setState({ boutonManche: true, etape, scoreJoueur, scoreAdversaire, manche: this.state.manche + 1, infoPartie });
    }

    nouvelleManche = () => {
        this.nouveauJeu();
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Jeu entrainement cérébral : le mot le plus long</title>
                    <meta name="description" content="Retrouvez le mot le plus long en jouant avec les lettres" />
                </Helmet>

                <div className="grilleLettrePrincipal espaceHaut">
                    <div className="titreLettre centre espaceBasMemoire"><span className="titreBingo margeDroit  tailleMoyenne">Le mot le plus long</span><Regle></Regle></div>
                    <EspaceLettres clickCarte={this.clickCarte} disabled={this.state.boutonManche} lettres={this.state.tabLettres}></EspaceLettres>
                    {this.state.boutonManche && this.state.infoPartie.resultatFinal === 'victoire' && <Confetti />}
                    {this.state.boutonManche && <React.Fragment> <img src={anchor} id="anchor" className="centre" alt="presentatrice"></img>
                        {this.state.infoPartie.maj && <Dialogue etape={this.state.etape} info={this.state.infoPartie} ></Dialogue>}</React.Fragment>}
                    {!this.state.boutonManche && <div className="centre"><CompteRebours temps={this.temps} finTimer={this.finTimer}></CompteRebours></div>}
                    <Manche noManche={this.state.manche} boutonManche={this.state.boutonManche} nouveauJeu={this.nouveauJeu} continuer={this.continuer} resultat={this.state.infoPartie.resultatFinal}></Manche>

                    <EspaceSaisie disabled={this.state.boutonManche} reset={this.reset} tabLettresSaisies={this.state.tabLettresSaisies} verifierReponse={this.verifierReponse} changeMessage={this.changeMessage} messageErreur={this.state.messageErreur}></EspaceSaisie>

                    <div>Ton score : {this.state.scoreJoueur}</div>
                    <div>Le score de {this.state.prenomAdversaire} : {this.state.scoreAdversaire}</div>
                    
                    {this.state.prenomVisible && <Prenom callbackPrenom={this.callbackPrenom}></Prenom>}

                </div>

            </div>
        );
    }
}

export default withRouter(JeuxLettres);

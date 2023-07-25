import React, { Component } from 'react';
import Logique from './Logique';
import Grille from './Grille';
import { message } from 'antd';
import MessagesOrdi from './MessagesOrdi';
import Resultat from './Resultat';
import intl from 'react-intl-universal';
import { Helmet } from 'react-helmet';

import FinEtape from '../concours/FinEtape';
import withRouter from '../../components/commun/withRouter';
import Regle from './Regle';


 class JeuxBingo extends Component {

    constructor(props) {
        super();
        this.id = parseInt(props.params.id);
  
        this.jeu = new Logique(this.id);
    
            this.perdu = true;
            this.taille = this.jeu.taille;
            this.intervalle = this.jeu.intervalle;
            this.state = {
                grille: this.jeu.grilleHumain,
                messagePossibilite: '',
                numeroTire: '',
                messagesOrdinateur: this.jeu.messagePossibiliteOrdinateur().messagesJoueurs,
                fin: false,
                nbErreurs: 0,
                afficheResultat : false
            }

            this.tabReponse = [];
            this.grillesOrdinateur = this.jeu.grillesOrdinateur;
            this.numeroPrecedent = -1;
            this.timer = 0;
            this.stop = false;
         

    }
    componentWillUnmount() {
        clearTimeout(this.timer);
    }
    componentDidMount() {
        this.timer = setTimeout(this.miseJourTimer, this.intervalle);
    }

    miseJourTimer = () => {

        if (this.stop) {
            message.error(intl.get('BINGO_DEFAITE'), 5, this.afficheFin);
            const manque = this.jeu.calculCaseManque();
            const msg = this.state.messagePossibilite !== intl.get('BINGO_GAGNE') ? manque > 0 ? intl.get('BINGO_OUBLI') + (manque === 1 ? intl.get('BINGO_CASE') : manque + intl.get('BINGO_CASES')) : '' : '';
            clearTimeout(this.timer);
            this.setState({
                fin: true,
                numeroTire: intl.get('BINGO_FIN'),
                messagePossibilite: msg
            });
            return;
        }
        const numeroTire = this.jeu.tirageNombre();
        if (numeroTire === -1) clearTimeout(this.timer);

        this.jeu.miseAJourTableaux(numeroTire);
        let resultats = this.jeu.messagePossibiliteOrdinateur();
        if (resultats.fin) {
            this.stop = true;
        }
        this.intervalle -= 50;
        this.timer = setTimeout(this.miseJourTimer, this.intervalle);


        this.setState({
            messagesOrdinateur: resultats.messagesJoueurs
        });
        this.setState({
            numeroTire
        });
    }

    afficheFin = () =>
    {
        this.setState({
            afficheResultat : true
        });
    }

    clickNumero = (id) => {
        let nouveauTableau = [...this.state.grille];
        let trouve = this.jeu.verificationBonNumero(id);
        if (!trouve) this.setState({ nbErreurs: this.state.nbErreurs + 1 })
        if (this.state.nbErreurs === 2 && !this.state.fin) {
            this.setState({
                messagePossibilite: intl.get('BINGO_PERDU'),
                fin: true,
                numeroTire: intl.get('BINGO_FIN')
            });
            message.error(intl.get('BINGO_DEFAITE'), 4, this.afficheFin);
            clearTimeout(this.timer);
            return;
        }
        if (trouve && !this.state.fin) {

            nouveauTableau[id].couleur = 'noir';
            const tabPossibilite = this.jeu.calculPossibiliteGagner(0);
            const nbPossibilite = this.jeu.nombrePossibiliteGagner(tabPossibilite);
            const fin = this.jeu.testGagne(tabPossibilite);
            if (fin) {
                this.jeu.finJeuLigneColonneVictoire(tabPossibilite, nouveauTableau);

                this.setState({
                    messagePossibilite: intl.get('BINGO_GAGNE'),
                    fin: true,
                    numeroTire: intl.get('BINGO_FIN')
                });
                message.success(intl.get('BINGO_VICTOIRE'), 3, this.afficheFin);
                this.perdu = false;
                clearTimeout(this.timer);
            }
            else if (nbPossibilite > 0) {
                this.setState({
                    messagePossibilite: intl.get('BINGO_AVOIR') + nbPossibilite + (nbPossibilite === 1 ? intl.get('BINGO_CHANCE') : intl.get('BINGO_CHANCES')) + intl.get('BINGO_DEGAGNER')
                })
            }
            this.setState({
                grille: nouveauTableau
            })
        }

    }

    render() {
  
        return <div>  <Helmet>
            <title>{intl.get('BINGO_TITLE')}</title>
            <meta name="description" content={intl.get('BINGO_META')} />
        </Helmet>
            <div><span className="titreBingo grandeLettre margeDroit">{intl.get('BINGO_TITRE')}</span><Regle></Regle></div>
            {this.state.afficheResultat ?  (this.jeu.concours ? <FinEtape donneesJeu={this.jeu.donnees} perdu={this.perdu} ></FinEtape> :<Resultat id={this.id}></Resultat>) :
           <div><div>{intl.get('BINGO_NBERREUR')}{this.state.nbErreurs}</div><div className="espaceJeuBingo espaceHaut"><div className="joueurBingo"><div className="grandeLettre hauteurTirage couleurNumero">{this.state.numeroTire}</div>
                <Grille taille={this.taille} grille={this.state.grille} clickNumero={this.clickNumero}></Grille>
                <div className="espaceHaut hauteurBingo tailleMoyenne"><b>{this.state.messagePossibilite}</b></div></div>
                <div className="infoBingo espaceHaut">

                    <h2 className="couleurJoueur">{intl.get('BINGO_JOUEURS')}</h2>
                    <MessagesOrdi messageOrdis={this.state.messagesOrdinateur} ></MessagesOrdi>
                  </div> 
            </div></div>}</div>
    }
}

export default withRouter(JeuxBingo);
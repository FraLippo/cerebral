import React, { Component } from 'react';
import Logique from './Logique';
import Grille from './Grille';
import { message } from 'antd';
import MessagesOrdi from './MessagesOrdi';
import Resultat from './Resultat';
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
            message.error("Perdu", 5, this.afficheFin);
            const manque = this.jeu.calculCaseManque();
            const msg = this.state.messagePossibilite !== "Tu as gagné !" ? manque > 0 ? "Tu as oublié de cocher " + (manque === 1 ? "1 case." : manque + " cases.") : '' : '';
            clearTimeout(this.timer);
            this.setState({
                fin: true,
                numeroTire: "Fin",
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
                messagePossibilite: "Perdu. Tu as fait trop de fautes.",
                fin: true,
                numeroTire: "Fin"
            });
            message.error("Perdu", 4, this.afficheFin);
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
                    messagePossibilite: "Tu as gagné !",
                    fin: true,
                    numeroTire: "Fin"
                });
                message.success("Tu as gagné", 3, this.afficheFin);
                this.perdu = false;
                clearTimeout(this.timer);
            }
            else if (nbPossibilite > 0) {
                this.setState({
                    messagePossibilite: "Tu as " + nbPossibilite + (nbPossibilite === 1 ? " possibilité" : " possibilités") + " de gagner"
                })
            }
            this.setState({
                grille: nouveauTableau
            })
        }

    }

    render() {
  
        return <div>  <Helmet>
            <title>{"Jeu entrainement cérébral : Le Bingo"}</title>
            <meta name="description" content={"Essayez de cocher les cases dans ce jeu de Bingo en ligne et gratuit."} />
        </Helmet>
            <div><span className="titreBingo grandeLettre margeDroit">{"Le Bingo"}</span><Regle></Regle></div>
            {this.state.afficheResultat ?  (this.jeu.concours ? <FinEtape donneesJeu={this.jeu.donnees} perdu={this.perdu} ></FinEtape> :<Resultat id={this.id}></Resultat>) :
           <div><div>{"Nombre d'erreur : "}{this.state.nbErreurs}</div><div className="espaceJeuBingo espaceHaut"><div className="joueurBingo"><div className="grandeLettre hauteurTirage couleurNumero">{this.state.numeroTire}</div>
                <Grille taille={this.taille} grille={this.state.grille} clickNumero={this.clickNumero}></Grille>
                <div className="espaceHaut hauteurBingo tailleMoyenne"><b>{this.state.messagePossibilite}</b></div></div>
                <div className="infoBingo espaceHaut">

                    <h2 className="couleurJoueur">{"Tu joues contre "}</h2>
                    <MessagesOrdi messageOrdis={this.state.messagesOrdinateur} ></MessagesOrdi>
                  </div> 
            </div></div>}</div>
    }
}

export default withRouter(JeuxBingo);
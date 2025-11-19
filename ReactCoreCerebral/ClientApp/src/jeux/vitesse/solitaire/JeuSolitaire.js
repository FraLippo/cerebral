import React, { Component } from 'react';
import GrilleJoueur from './GrilleJoueur';
import Logique from './Logique';
import { message } from 'antd';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat';
import withRouter from '../../../components/commun/withRouter';



import { Helmet } from 'react-helmet';




class JeuSolitaire extends Component {

    constructor(props) {
        super();

        this.logique = new Logique();


        this.tabOrigine = this.logique.creerGrille();
        this.state = {
            grille: this.tabOrigine,
            afficheResultat: false,
            score: 0
        }
        this.fin = false;

        this.reponseEnCours = false;
 

    }
    nouveauJeu = () => {
        if (this.fin) return;
        let score = this.state.score;
        let ajout = 3;
        if (this.logique.grilleEnCours > 3) ajout = 6;
        score += ajout;
        if (this.logique.grilleEnCours < this.logique.tabDonnee.length - 1) {
            this.logique.grilleEnCours++;
        }


        this.tabOrigine = this.logique.creerGrille();
        this.setState({
            grille: this.tabOrigine,

            score
        });
        this.reponseEnCours = false;
    }

    clickImage = (no) => {
        if (!this.reponseEnCours) {
            let nouveauTableau = [...this.state.grille];

            const result = Logique.testResultat(nouveauTableau[no], nouveauTableau);

            if (result === "ok") {
                message.success("Well done", .7, this.nouveauJeu);
                nouveauTableau[no] = -1;
                this.reponseEnCours = true;

            }
            if (result === "erreur") {

                message.error("It's not the right tile", 1.2);

            }
        
            this.setState({ grille: nouveauTableau });
        }
    }


    finTimer = () => {
        this.fin = true;
        this.setState({ afficheResultat: true });

    }

    render() {


        return <React.Fragment>
            <Helmet>
                <title>Finding the lone tile</title>
                <meta name="description" content="A game accessible to all, where you need to concentrate to find the solitary mahjong tile among a series of tiles." />

            </Helmet>
            <div> {this.state.afficheResultat ?
                <Resultat score={this.state.score} typeExo='vitessesolitaire'></Resultat> :
                <div className="espaceJeuMahj"><div className="joueurMahj"><GrilleJoueur grille={this.state.grille} taille={5} clickImage={this.clickImage}></GrilleJoueur></div>
                    <div className="infoFamille">
                        <h1 className="couleurTitre espaceHaut">Finding the lone tile</h1>
                        <p>Click on the lone tile</p>
                        <div className="centre"><CompteRebours temps={60} finTimer={this.finTimer}></CompteRebours>

                        </div>
                    </div></div>}</div>
        </React.Fragment>


    }
}
export default withRouter(JeuSolitaire);
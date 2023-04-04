import React, { Component } from 'react';
import GrilleJoueur from './GrilleJoueur';
import Logique from './Logique';
import { message } from 'antd';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat';
import withRouter from '../../../components/commun/withRouter';
import { analytics } from '../../../components/commun/analytics';


import { Helmet } from 'react-helmet';



class JeuSolitaire extends Component {

    constructor(props) {
        super();

        this.logique = new Logique();
       

            this.tabOrigine = this.logique.creerGrille();
            console.log(this.tabOrigine)
            this.state = {
                grille: this.tabOrigine,
                afficheResultat: false,
                score : 0
            }
            this.fin = false;
            this.perdu = false;
            this.reponseEnCours = false;
            analytics();
        
    }
    nouveauJeu = () => {
        if (this.fin) return;
        let score = this.state.score;
        if (!this.perdu) {
             score += ((this.logique.grilleEnCours + 1) *2);
            if (this.logique.grilleEnCours < this.logique.tabDonnee.length - 1)
            {
                this.logique.grilleEnCours++;
            }
           
        }
        console.log(score);
        this.tabOrigine = this.logique.creerGrille();
        this.perdu = false;
        this.setState({  grille: this.tabOrigine,

            score});
        this.reponseEnCours = false;
    }

    clickImage = (no) => {
        if (!this.reponseEnCours) {
            let nouveauTableau = [...this.state.grille];

            const result = Logique.testResultat(nouveauTableau[no], nouveauTableau);

            if (result === "ok") {
                message.success("Bravo", .7, this.nouveauJeu);
                nouveauTableau[no] = -1;
          

            }
            if (result === "erreur") {
                this.perdu = true;
                message.error("Ce n'est pas la bonne tuile", 1.2, this.nouveauJeu);
   
            }
            this.reponseEnCours = true;
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
                <title>Retrouver la tuile solitaire</title>
                <meta name="description" content="TO DO" />
                
            </Helmet>
            <div> {this.state.afficheResultat ?
                <Resultat score={this.state.score} typeExo='vitesseSolitaire'></Resultat> :
                <div className="espaceJeuMah"><div className="joueurMah"><GrilleJoueur grille={this.state.grille} taille={5} clickImage={this.clickImage}></GrilleJoueur></div>
                    <div className="infoFamille">
                        <h1 className="couleurTitre espaceHaut">La tuile solitaire</h1>
                        <p>Cliquer sur la tuile solitaire</p>
                       <div className="centre"><CompteRebours temps={60} finTimer={this.finTimer}></CompteRebours>

                    </div>
                </div></div>}</div>
        </React.Fragment>


    }
}
export default withRouter(JeuSolitaire);
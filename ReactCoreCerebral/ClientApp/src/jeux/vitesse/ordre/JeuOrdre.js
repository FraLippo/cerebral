import React, { Component } from 'react';
import Logique from './Logique';
import Pion from './Pion';
import Bouton from './Bouton';
import { message } from 'antd';
import Resultat from '../commun/Resultat';
import '../../../style/jeux.css';
import withRouter from '../../../components/commun/withRouter';

import CompteRebours from '../commun/CompteRebours';
import { Helmet } from 'react-helmet';






class JeuOrdre extends Component {
    constructor(props) {
        super(props);
        this.nombrePion = 6;

        this.donneeLogique = new Logique();


        this.tabPion = [];
        this.fin= false;
        this.stop = false;
        this.state = {
            donnees: this.donneeLogique.creerDonnees(this.nombrePion),
            boutonSupprimer: false,
            finJeu: false,
            afficheRebours: true,
            score: 0
        }


     
    }



    afficherMessage(resultat) {

        if (resultat === null) return;

        if (resultat) {

            this.stop = true;
            message.success("Bravo", .7, this.nouveauJeu);

        }
        else {
            message.error("L'ordre n'est pas correcte", 1.5, this.reset);
        }
    }

    nouveauJeu = () => {
        if (this.fin===true) return;
        this.stop = false;
        let score= this.state.score+ this.tabPion.length;
        this.tabPion = [];
      
        
        if (this.nombrePion < 10) {
            this.nombrePion++;
        }
        this.setState({
            donnees: this.donneeLogique.creerDonnees(this.nombrePion),
            boutonSupprimer: false,
            finJeu: false,
            score

        });
    }

    reset = () => {
        this.setState({ boutonSupprimer: true });
    }

    terminerJeu = () => {
        this.setState({ finJeu: true });
    }

    finTimer = () => {
        this.fin = true;
        let scoreFin = this.donneeLogique.nombrePionsTries(this.tabPion);
        this.setState({ finJeu: true, score : this.state.score + scoreFin });
    }

    clickPion = (ordre) => {
        if (this.state.donnees[ordre].emplacement === -1) {
            let donneeActualise = [...this.state.donnees];
            donneeActualise[ordre].emplacement = this.tabPion.length + 1;
            this.tabPion = [...this.tabPion, ordre];
            this.setState({ donnees: donneeActualise });
            this.setState({ boutonSupprimer: true });
            this.afficherMessage(this.donneeLogique.EstCorrect(this.tabPion, this.state.donnees))
        }
    }

    clickBouton = () => {
        if (this.stop) return;
        let donneeActualise = [...this.state.donnees];
        let ordre = this.tabPion[this.tabPion.length - 1];
        this.tabPion.splice(this.tabPion.length - 1, 1);
        donneeActualise[ordre].emplacement = -1;
        this.setState({ donnees: donneeActualise});
        if (this.tabPion.length === 0) this.setState({ boutonSupprimer: false })
    }

    render() {

        return (<div>
            <Helmet>
                <title>Remettre les nombres dans l'ordre</title>
                <meta name="description" content="Un jeu très facile à comprendre où il suffit de remettre une série de nombres dans l'ordre croissant." />

            </Helmet>

            {!this.state.finJeu ? <React.Fragment><div className="fontMoyenne couleurTitre margeEcran ">Remettre les nombres dans l'ordre</div><div className="jeuOrdre"><div className="centre">
                {this.state.afficheRebours && <CompteRebours temps={60} finTimer={this.finTimer}></CompteRebours>}</div><div className="containerOrdre">{this.state.donnees.map((el, i) => <Pion key={el.ordre} donnee={el} click={this.clickPion} test={this.state.test}></Pion>)}
                    <div className="ligneGrise"></div>  </div>  {this.state.boutonSupprimer && <div className='centre'><Bouton click={this.clickBouton}></Bouton></div>}</div>
            </React.Fragment> : <Resultat score={this.state.score} typeExo='vitesseordre'></Resultat>}
        </div>)
    }

}


export default withRouter(JeuOrdre);
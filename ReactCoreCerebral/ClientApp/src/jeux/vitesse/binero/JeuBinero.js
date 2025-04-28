import React, { Component } from 'react';
import Grille from './Grille';
import Logique from './Logique';
import { Button, message } from 'antd';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat';
import { Helmet } from 'react-helmet';

export default class JeuBinero extends Component {
    constructor(props) {
        super(props);
        this.jeu = new Logique();
        this.nbTrous = 4;
        this.tabs = (this.jeu.genererGrille(this.nbTrous));
        this.score = 0;
        this.fin = false;
        this.state = {
            tabGrille: this.tabs.grille,
            afficheResultat: false,

        }
    }

    nouveauJeu = () => {
        this.fin = false;
        if (this.nbTrous >= 12) {
            this.nbTrous += 2;
        }
        else {
            this.nbTrous += 4;
        }
        this.tabs = (this.jeu.genererGrille(this.nbTrous));
        this.setState({
            tabGrille: this.tabs.grille
        })
    }


    clic = (x, y) => {
        if (this.fin) return;
        let tabGrille = [...this.state.tabGrille];
        if (tabGrille[x][y] < 11) {
            tabGrille[x][y]++;
        }
        else {
            tabGrille[x][y] = 9;
        }
        this.setState({
            tabGrille
        })

    }

    valider = () => {
        if (this.fin) return;
        if (this.jeu.estComplete(this.state.tabGrille)) {

            this.fin = true;
            let result = this.jeu.verifierGrille(this.state.tabGrille, this.tabs.solution);


            if (result.estValide) {
                this.score += (this.nbTrous * 3);
                message.success("Grille validée !", 1, this.nouveauJeu);
            }
            else {
                let tabGrille = [...this.state.tabGrille];
                for (let i = 0; i < result.erreurs.length; i++) {
                    let erreur = result.erreurs[i];
                    tabGrille[erreur.row][erreur.col] = tabGrille[erreur.row][erreur.col] + 20;
                }
                this.score = this.score > 10 ? this.score - 10 : 0;;
                message.error("Grille non validée", 2, this.nouveauJeu);
                this.setState({
                    tabGrille,

                })

            }
        }

    }

    finTimer = () => {
        this.setState({ afficheResultat: true });
    }


    render() {
        return <React.Fragment>
            <Helmet>
            <title>Joue au Binero en ligne - Casse-tête logique</title>
            <meta name="description" content="Entraînez votre logique avec notre jeu de Binero en ligne gratuit. Remplissez la grille avec des 0 et des 1 selon les règles du Binero."></meta>
            </Helmet>
            {this.state.afficheResultat ? <Resultat score={this.score} typeExo='vitessebinero'></Resultat> :
                <div className="jeuBino">
                    <Grille tabGrille={this.state.tabGrille} clic={this.clic} />
                    <Button className="marge10" type="primary" onClick={this.valider}>Je valide</Button>
                    <div className="marge10 centre"><CompteRebours temps={90} finTimer={this.finTimer}></CompteRebours></div>
                </div>}
        </React.Fragment>
    }
}

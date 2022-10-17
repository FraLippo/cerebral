import React, { Component } from 'react';
import Grille from './Grille';
import { Button, message } from 'antd';
import CompteRebours from '../../components/commun/CompteRebours2';
import Regle from './Regle';
import ResultatCommun from '../../components/commun/ResultatCommun';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { analytics } from '../../components/commun/analytics';
import Logique from './Logique';
import FinEtape from '../concours/FinEtape';
import { addGame } from '../../components/commun/localStorage';

export default class JeuxBinero extends Component {

    constructor(props) {
        super(props);
        this.id = parseInt(this.props.match.params.id);
        this.stop = false;
        this.jeu = new Logique(this.id);

        if (isNaN(this.id) || this.jeu.donnees === undefined) {
            this.stop = true;
        }
        else {
            this.taille = 0;
            this.perdu = false;
            this.state = {
                tabJeu: [],
                boutonTermine: false,
                afficheRebours: false,
                finJeu: false
            }
            this.fin = false;
            analytics();
            addGame('binero', this.id);
        }
    }

    async componentDidMount() {
       
            this.taille = this.jeu.donnees.taille;
            let tabJeu = this.jeu.donnees.jeu;
            this.temps = this.jeu.donnees.temps;
            this.setState({
                taille: this.taille,
                tabJeu,
                afficheRebours: true
            })
        
    }

    clic = (id) => {
        if (this.fin) return;
        let boutonTermine = false;
        let tabNouveauJeu = [...this.state.tabJeu];
        if (tabNouveauJeu[id] < 11) {
            tabNouveauJeu[id]++;
        }
        else {
            tabNouveauJeu[id] = 9;
        }
        if (tabNouveauJeu.find(x => x === 9) === undefined) {
            boutonTermine = true;
        }
        this.setState({
            tabJeu: tabNouveauJeu,
            boutonTermine

        })
    }

    afficheResultat = () => {
        this.setState({
            finJeu: true

        })
    }

    termine = () => {

        let trouve = true;
        let tabJeuResultat = [...this.state.tabJeu];
        tabJeuResultat = tabJeuResultat.map(x => { if (x > 9) (x -= 10); return x; });
        for (let i = 0; i < this.state.taille; i++) {
            let sommeX = 0;
            let sommeY = 0;
            for (let j = 0; j < this.state.taille; j++) {
                if (j < this.state.taille - 2) {
                    if (tabJeuResultat[j + (i * this.state.taille)] === tabJeuResultat[j + (i * this.state.taille) + 2] && tabJeuResultat[j + (i * this.state.taille)] === tabJeuResultat[j + (i * this.state.taille) + 1]) {
                        trouve = false;
                        break;
                    }
                }
                sommeX += tabJeuResultat[j + (i * this.state.taille)];
                sommeY += tabJeuResultat[i + (j * this.state.taille)];
                if (i < this.state.taille - 2) {
                    if (tabJeuResultat[j + (i * this.state.taille)] === tabJeuResultat[j + (i * this.state.taille) + (this.state.taille * 2)] && tabJeuResultat[j + (i * this.state.taille)] === tabJeuResultat[j + (i * this.state.taille) + (this.state.taille)]) {
                        trouve = false;
                        break;
                    }
                }
            }


            if (sommeX !== this.state.taille / 2 || sommeY !== this.state.taille / 2) {
                trouve = false;
                break;
            }


        }
        if (trouve) {
            message.success("Bravo, vous avez réussi", 2, this.afficheResultat);
        } else {
            this.perdu = true;
            message.error("Perdu, ce n'est pas la bonne solution", 2, this.afficheResultat);
        }
        this.fin = true;
        this.setState({
            afficheRebours: false,
            boutonTermine: false

        })

    }

    finJeu = () => {
        this.perdu = true;
        message.error("Perdu, le temps est dépassé.", 2, this.afficheResultat);
        this.setState({
            afficheRebours: false,
            boutonTermine: false

        })
    }


    render() {
        if (this.stop) return (<Redirect to="/"></Redirect>);
        return <div className="JeuBinero">
            <Helmet>
                <title>Sport cérebral : le binero</title>
                <meta name="description" content="Le classique jeu du binero où vous devez remplir une grille uniquement avec des 0 ou des 1." />
            </Helmet>
            {this.state.finJeu ?  (this.jeu.concours ? <FinEtape donneesJeu={this.jeu.donnees} perdu={this.perdu}>

</FinEtape> : <ResultatCommun type='binero' perdu={this.perdu} prochainJeu={this.jeu.obtenirProchainJeu()} idTest={this.id} dureeJeu={this.dureeJeu} dureeMax={200}></ResultatCommun>)  :
                <React.Fragment>
                    <div className="titreJeu">Jeu binaire<span className="margeGauche10"><Regle></Regle></span></div>
                    <div className="marge10 grilleCentre">
                        <Grille taille={this.taille} tabJeu={this.state.tabJeu} clic={this.clic}></Grille>
                    </div>

                    <div className="marge10 lignes"><div>{this.state.afficheRebours && <div><CompteRebours temps={this.temps} finTimer={this.finJeu}></CompteRebours></div>}</div></div>
                    <div className="centre marge10">{this.state.boutonTermine && <Button type="primary" onClick={this.termine}>J'ai terminé</Button>}</div>
                </React.Fragment>}
        </div>
    }
}
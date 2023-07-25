import React, { Component } from 'react';
import GrilleJoueur from './GrilleJoueur';
import LogiqueFamille from './LogiqueFamille';
import Erreur from './Erreur';
import CompteRebours from '../../components/commun/CompteRebours';
import ResultatCommun from '../../components/commun/ResultatCommun';
import withRouter from '../../components/commun/withRouter';

import { addGame } from '../../components/commun/localStorage';
import FinEtape from '../concours/FinEtape';
import { Helmet } from 'react-helmet';
import intl from 'react-intl-universal';



class JeuxFamille extends Component {

    constructor(props) {
        super(props);
        this.id = parseInt(this.props.params.id);

        this.logique = new LogiqueFamille(this.id);
      
            this.dureeJeu = Date.now();
            this.tabOrigine = this.logique.obtenirGrille();
            this.state = {
                grille: this.tabOrigine,
                afficheErreur: false,
                afficheResultat: false
            }
            this.perdu = false;
            this.familleEnCours = -10;

            addGame('jeuxFamille', this.id);
         
        
    }

    modifFamille = () => {
        this.familleEnCours = -10;
    }

    testFin = () => {
        if (this.state.grille.filter(x => x !== -1).length === 0) {
            this.dureeJeu = Date.now() - this.dureeJeu;
            this.perdu = false;
            this.setState({ afficheResultat: true });
        }
    }

    clickImage = (no) => {
        let nouveauTableau = [...this.state.grille];

        const result = LogiqueFamille.testResultat(nouveauTableau[no], this.familleEnCours, nouveauTableau);
        if (result === "finSerie") {
            this.familleEnCours = -10;
            nouveauTableau[no] = -1;
        }
        if (result === "ok") {
            this.familleEnCours = nouveauTableau[no];
            nouveauTableau[no] = -1;
        }
        if (result === "erreur") {
            for (let index = 0; index < this.tabOrigine.length; index++) {
                if (nouveauTableau[index] === -1 && this.tabOrigine[index] === this.familleEnCours) {
                    nouveauTableau[index] = this.familleEnCours;
                }
            }

            this.setState({ afficheErreur: true }, this.modifFamille);
        }
        this.setState({ grille: nouveauTableau }, this.testFin);
    }

    finErreur = () => {
        this.setState({ afficheErreur: false });
    }

    finTimer = () => {
        this.perdu = true;
        this.setState({ afficheResultat: true });
    }

    render() {

        return <React.Fragment>
            <Helmet>
                <title>{intl.get('FAMILLE_TITLE')}</title>
                <meta name="description" content={intl.get('FAMILLE_META')} />
                <link rel="alternate" hreflang="fr" href={`https://cerebral.evalquiz.com/jeuxFamille/${this.id}`} />
                <link rel="alternate" hreflang="en" href={`https://cerebral.evalquiz.com/brain-game-family/${this.id}`} />

            </Helmet>
            <div> {this.state.afficheResultat ?
               this.logique.concours ? <FinEtape donneesJeu={this.logique.donnees} perdu={this.perdu}></FinEtape> : <ResultatCommun   dureeMax={this.logique.obtenirTemps()} perdu={this.perdu} type='memoireFamille' prochainJeu={this.logique.obtenirProchainJeu()} idTest={this.id} dureeJeu={this.dureeJeu}></ResultatCommun> :
                <div className="espaceJeuFamille"><div className="joueurFamille"><GrilleJoueur taille={this.logique.obtenirTaille()} grille={this.state.grille} clickImage={this.clickImage}></GrilleJoueur></div>
                    <div className="infoFamille">
                        <h1 className="couleurTitre espaceHaut">{intl.get('FAMILLE_TITRE')}</h1>
                        <p>{intl.get('FAMILLE_EXPLICATION')}.</p>
                        <div className="centre"><CompteRebours temps={this.logique.obtenirTemps()} finTimer={this.finTimer}></CompteRebours></div>
                        {this.state.afficheErreur && <Erreur no={this.familleEnCours} finErreur={this.finErreur} ></Erreur>}
                    </div>
                </div>}</div>
        </React.Fragment>

    }
}
export default withRouter(JeuxFamille);
import React, { Component } from 'react';
import GrilleJoueur from './GrilleJoueur';
import LogiqueMah from './LogiqueMah';
import { message } from 'antd';
import CompteRebours from '../../components/commun/CompteRebours';
import ResultatCommun from '../../components/commun/ResultatCommun';
import withRouter from '../../components/commun/withRouter';
import { analytics } from '../../components/commun/analytics';
import { addGame } from '../../components/commun/localStorage';
import FinEtape from '../concours/FinEtape';
import { Helmet } from 'react-helmet';
import intl from 'react-intl-universal';


class JeuxMah extends Component {

    constructor(props) {
        super();
        this.id = parseInt(props.params.id);
        this.logique = new LogiqueMah(this.id);
       
            this.dureeJeu = Date.now();
            this.tabOrigine = this.logique.obtenirGrille();
            this.state = {
                grille: this.tabOrigine,
                afficheErreur: false,
                afficheResultat: false,
                afficheRebours: true
            }
            this.perdu = false;
            this.reponseEnCours = false;
     
            addGame('jeuxMahJong', this.id);
            analytics();
        
    }
    afficheResultat = () => {
        this.setState({ afficheResultat: true });
        this.reponseEnCours = false;
    }

    clickImage = (no) => {
        if (!this.reponseEnCours) {
            let nouveauTableau = [...this.state.grille];

            const result = LogiqueMah.testResultat(nouveauTableau[no], nouveauTableau);

            if (result === "ok") {
                message.success(intl.get('BRAVO'), 1.2, this.afficheResultat);
                nouveauTableau[no] = -1;
                this.perdu = false;

            }
            if (result === "erreur") {
                message.error(intl.get('MAH_ERREUR'), 1.2, this.afficheResultat);
                this.perdu = true;
            }
            this.reponseEnCours = true;
            this.dureeJeu = Date.now() - this.dureeJeu;
            this.setState({ grille: nouveauTableau, afficheRebours: false });
        }
    }


    finTimer = () => {
        if (!this.reponseEnCours) {
            this.perdu = true;
            this.setState({ afficheResultat: true });
        }
    }

    render() {
    

        return <React.Fragment>
            <Helmet>
                <title>{intl.get('MAH_TITLE')}</title>
                <meta name="description" content={intl.get('MAH_META')} />
                <link rel="alternate" hreflang="fr" href={`https://cerebral.evalquiz.com/jeuxMahJong/${this.id}`} />
                <link rel="alternate" hreflang="en" href={`https://cerebral.evalquiz.com/brain-game-solo/${this.id}`} />

            </Helmet>
            <div> {this.state.afficheResultat ?
                this.logique.concours ? <FinEtape donneesJeu={this.logique.donnees} perdu={this.perdu}></FinEtape> : <ResultatCommun dureeMax={this.logique.obtenirTemps()} perdu={this.perdu} type='mahJong' prochainJeu={this.logique.obtenirProchainJeu()} idTest={this.id} dureeJeu={this.dureeJeu}></ResultatCommun> :
                <div className="espaceJeuMah"><div className="joueurMah"><GrilleJoueur grille={this.state.grille} taille={this.logique.obtenirTaille()} clickImage={this.clickImage}></GrilleJoueur></div>
                    <div className="infoFamille">
                        <h1 className="couleurTitre espaceHaut">{intl.get('MAH_SOLITAIRE')}</h1>
                        <p>{intl.get('MAH_EXPLICATION')}</p>
                        {this.state.afficheRebours && <div className="centre"><CompteRebours temps={this.logique.obtenirTemps()} finTimer={this.finTimer}></CompteRebours></div>}

                    </div>
                </div>}</div>
        </React.Fragment>


    }
}
export default withRouter(JeuxMah);
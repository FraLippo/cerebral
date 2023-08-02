import React, { Component } from 'react';
import Logique from './LogiqueOrdre';
import Pion from './Pion';
import Bouton from './Bouton';
import { message } from 'antd';
import ResultatCommun from '../../components/commun/ResultatCommun';
import '../../style/jeux.css';
import withRouter from '../../components/commun/withRouter';

import { addGame } from '../../components/commun/localStorage';
import { Helmet } from 'react-helmet';
import CompteRebours from '../../components/commun/CompteRebours';
import FinEtape from '../concours/FinEtape';
import intl from 'react-intl-universal';




class JeuxOrdre extends Component {
    constructor(props) {
        super(props);
        this.id = parseInt(this.props.params.id);
  
        this.donneeLogique = new Logique(this.id);
      
            this.perdu = false;
            this.tabPion = [];
            this.debutJeu = 0;
            this.finJeu = 0;
            this.dureeJeu = 0;
            this.temps = this.donneeLogique.temps;
            this.state = {
                donnees: this.donneeLogique.obtenirDonnees(),
                boutonSupprimer: false,
                finJeu: false,
                afficheRebours : true
            }
 
            addGame('jeuxordre', this.id);
        
       
    }

    componentDidMount() {
        this.debutJeu = Date.now();
    }

    afficherMessage(resultat) {

        if (resultat === null) return;
        this.setState({ boutonSupprimer: false });
        if (resultat) {
            this.finJeu = Date.now();
            this.dureeJeu = this.finJeu - this.debutJeu;
            this.setState({ afficheRebours : false });
            message.success(intl.get('BRAVO'), .7, this.terminerJeu);

        }
        else {
            message.error(intl.get('ORDRE_ERREUR'), 1.5, this.reset);
        }
    }

    reset = () => {
        this.setState({ boutonSupprimer: true });
    }

    terminerJeu = () => {
        this.setState({ finJeu: true });
    }

    finTimer = () => {
        this.perdu = true;
        this.setState({ finJeu: true });
    }

    clickPion = (ordre) => {
        if (this.state.donnees[ordre].emplacement === -1) {
            let donneeActualise = [...this.state.donnees];
            donneeActualise[ordre].emplacement = this.tabPion.length + 1;
            this.tabPion = [...this.tabPion, ordre];
            this.setState({ donnees: donneeActualise });
            this.setState({ boutonSupprimer: true });
            this.afficherMessage(this.donneeLogique.EstCorrect(this.tabPion))
        }
    }

    clickBouton = () => {
        let donneeActualise = [...this.state.donnees];
        let ordre = this.tabPion[this.tabPion.length - 1];
        this.tabPion.splice(this.tabPion.length - 1, 1);
        donneeActualise[ordre].emplacement = -1;
        this.setState({ donnees: donneeActualise });
        if (this.tabPion.length === 0) this.setState({ boutonSupprimer: false })
    }

    render() {
      
            return (<div>
                <Helmet>
                    <title>{intl.get('ORDRE_TITLE')}</title>
                    <meta name="description" content={intl.get('ORDRE_META')} />
                    <link rel="alternate" hreflang="fr" href={`https://cerebral.evalquiz.com/jeuxordre/${this.id}`} />
                    <link rel="alternate" hreflang="en" href={`https://cerebral.evalquiz.com/brain-game-order/${this.id}`} />

                </Helmet>

                {!this.state.finJeu ? <React.Fragment><h1 className="couleurTitre">{intl.get('ORDRE_TITRE')}</h1><div className="jeuOrdre"><div className="centre">
                {this.state.afficheRebours && <CompteRebours temps={this.temps} finTimer={this.finTimer}></CompteRebours>}</div><div className="containerOrdre">{this.state.donnees.map((el, i) => <Pion key={el.ordre} donnee={el} click={this.clickPion} test={this.state.test}></Pion>)}
                    <div className="ligneGrise"></div>  </div>  {this.state.boutonSupprimer && <div className='centre'><Bouton click={this.clickBouton}></Bouton></div>}</div>
                    </React.Fragment>  :  this.donneeLogique.concours ? <FinEtape donneesJeu={this.donneeLogique.donnees} perdu={this.perdu}></FinEtape> :<ResultatCommun   dureeMax={this.temps} type='ordre' perdu={this.perdu} prochainJeu={this.donneeLogique.obtenirProchainJeu()} dureeJeu={this.dureeJeu} idTest={this.id}></ResultatCommun>}
            </div>)
        }
    
}


export default withRouter(JeuxOrdre);
import React, { Component } from 'react';
import GrilleJeu from './GrilleJeu';
import GrilleJoueur from './GrilleJoueur';
import Revoir from './Revoir';
import ResultatCommun from '../../components/commun/ResultatCommun';
import LogiqueMemoire from './LogiqueMemoire';
import { Button, message } from 'antd';
import { withRouter, Redirect } from 'react-router-dom';
import FinEtape from '../concours/FinEtape';

import { addGame} from '../../components/commun/localStorage';
import CompteRebours from '../../components/commun/CompteRebours';


import { Helmet } from 'react-helmet';
import intl from 'react-intl-universal';

class JeuxDessin extends Component {
    constructor(props) {
        super(props);
        this.id = parseInt(this.props.match.params.id);
        this.stop = false;
        this.logiqueMem = new LogiqueMemoire(this.id);

        if (isNaN(this.id) || this.logiqueMem.donnees === undefined) {
            this.stop = true;
        }
        else {
            this.dureeJeu = Date.now();

            ({ grille: this.tabGrille, taille: this.taille, nbCouleurs: this.nbCouleurs, nbRevoir: this.nbRevoirTotal } = this.logiqueMem.obtenirInfo());
            this.nbRevoirJoueur = 0;
            this.tabJoueur = Array(this.taille * this.taille).fill('white');
            this.perdu = false;
            this.temps =  this.logiqueMem.obtenirTemps();
            this.state = {
                grilleJeu: false,
                nbRevoirJoueur: this.nbRevoirJoueur,
                afficheResultat: false,
                afficheRebours : true
            };

   
            addGame('jeuxMemoireDessin', this.id);
        }
    }

    terminerJeu = () => {
        this.setState({ grilleJeu: true, afficheResultat: true });
    }
    checkFin = (id, couleur) => {
        this.tabJoueur[id] = couleur;
        let i = 0;
        while (i < this.tabGrille.length && this.tabJoueur[i] === this.tabGrille[i]) {
            i++;
        }
        if (i === this.tabGrille.length) {
            this.dureeJeu = Date.now() - this.dureeJeu - 5;
            message.success(intl.get('BRAVO'), .8, this.terminerJeu);
            this.setState({afficheRebours : false });

        }
    }

    timer = () => {
        setTimeout(this.finAffichage, 3500);
    }

    finAffichage = () => {
        this.setState({ grilleJeu: false });
    }

    componentDidMount() {
        this.setState({ grilleJeu: true });
        this.timer();

    }

    changeNbRevoir = () => {
        if (!this.state.grilleJeu) {
            this.setState({ nbRevoirJoueur: this.state.nbRevoirJoueur + 1 });
            this.setState({ grilleJeu: true });
            this.timer();
        }
    }

    abandon = () => {
        this.perdu = true;
        this.setState({ grilleJeu: true, afficheResultat: true });
    }

    finJeu = () => {
        this.dureeJeu = this.logiqueMem.obtenirTemps();
        this.perdu = true;
        this.setState({ afficheResultat: true, grilleJeu: true });
    }

    render() {
        if (this.stop)  return (<Redirect to={intl.get('LIEN_HOME')}></Redirect>);
   

            return <div>
                <Helmet>
                    <title>{intl.get('DESSIN_TITLE')}</title>
                    <meta name="description" content={intl.get('DESSIN_META')} />
                    <link rel="alternate" hreflang="fr" href={`https://cerebral.evalquiz.com/jeuxMemoireDessin/${this.id}`} />
                    <link rel="alternate" hreflang="en" href={`https://cerebral.evalquiz.com/brain-game-drawing/${this.id}`} />

                </Helmet>
                <h1 id="titreMemoire">{intl.get('DESSIN_TITLE')}</h1>
               <div className="espaceJeuMemoire">
                
               <div className="imageMemoire espaceHautMemoire">{this.state.grilleJeu && <GrilleJeu taille={this.taille} tabGrille={this.tabGrille}></GrilleJeu>}</div>
                   <div className="joueurMemoire">
                    {this.state.afficheResultat ? this.logiqueMem.concours ? <FinEtape donneesJeu={this.logiqueMem.donnees} perdu={this.perdu} temps={this.dureeJeu}></FinEtape> :
                        <ResultatCommun perdu={this.perdu} type='memoireDessin' prochainJeu={this.logiqueMem.obtenirProchainJeu()} idTest={this.id} dureeJeu={this.dureeJeu} dureeMax={this.temps}></ResultatCommun> :
                    <div className="espaceHautMemoire"><GrilleJoueur grilleJeu={this.state.grilleJeu} checkFin={this.checkFin} nbCouleurs={this.nbCouleurs} taille={this.taille} tabGrille={this.tabJoueur}></GrilleJoueur>
                        {!this.state.grilleJeu &&  <React.Fragment>{this.nbRevoirTotal - this.state.nbRevoirJoueur !== 0 && <Revoir abandon={this.abandon} changeNbRevoir={this.changeNbRevoir} nbRevoir={this.nbRevoirTotal - this.state.nbRevoirJoueur}></Revoir>}
                            <Button className="espaceHautMemoire espaceBasMemoire espaceBouton" type="danger" onClick={this.abandon} >{intl.get('BOUTON_ABANDON')}</Button>
                            {this.state.afficheRebours &&   <div className="centre"><CompteRebours temps={this.temps} finTimer={this.finJeu}></CompteRebours></div>}</React.Fragment>}</div>}
                </div>
                   
                </div></div>
        }
    
}
export default withRouter(JeuxDessin);
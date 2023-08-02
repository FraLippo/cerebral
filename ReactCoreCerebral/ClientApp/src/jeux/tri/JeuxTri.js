import React, { Component } from 'react';
import LogiqueTri from './LogiqueTri'
import '../../style/jeux.css';
import withRouter from '../../components/commun/withRouter';
import Choix from './Choix';
import { addGame } from '../../components/commun/localStorage';
import { Helmet } from 'react-helmet';
import CompteRebours from '../../components/commun/CompteRebours';
import ResultatCommun from '../../components/commun/ResultatCommun';
import { message} from 'antd';
import FinEtape from '../concours/FinEtape';
import intl from 'react-intl-universal';




class JeuxTri extends Component {
    constructor(props) {
        super(props);
        this.id = parseInt(props.params.id);
        this.logiqueTri = new LogiqueTri(this.id);
       
            this.state = {
                jeuEnCours: 0,
                finJeu: false,
                annuler: false,
                redirection: false,
                disable: '',
                afficheRebours : true
            }
            this.perdu = false;


            this.temps = this.logiqueTri.temps;
            this.dureeJeu = Date.now();
            this.chemin = "";
            addGame('jeuxtri', this.id);
   

    }

    testResultat = (id) => {
        if (id !== this.logiqueTri.infoJeu[this.state.jeuEnCours].resultat) {
            this.setState({ disable: 'disableTri' });
            this.nbFautes++;
            return false;
        }
        return true;
    }

    finDisable = () => {
        this.setState({ disable: '' });
    }

    afficheResultat = () =>
    {
        this.setState({ finJeu: true });
    }
    nouveauTirage = () => {
        if (this.state.jeuEnCours < this.logiqueTri.infoJeu.length - 1) {
            this.setState({ jeuEnCours: this.state.jeuEnCours + 1 });

        }
        else {
            this.dureeJeu = Date.now() - this.dureeJeu;
            message.success(intl.get('BRAVO'), .7, this.afficheResultat);
        
            this.setState({disable: 'disableTri', afficheRebours : false  });
        }
    }



    finTimer = () => {
        this.perdu = true;
        this.setState({ finJeu: true });
    }

    render() {
        return <div>
            <Helmet>
                <title>{intl.get('TRI_TITLE')}</title>
                <meta name="description" content={intl.get('TRI_META')} />
                <link rel="alternate" hreflang="fr" href={`https://cerebral.evalquiz.com/jeuxtri/${this.id}`} />
                <link rel="alternate" hreflang="en" href={`https://cerebral.evalquiz.com/brain-game-sorting/${this.id}`} />

            </Helmet>
            {this.state.finJeu ?  this.logiqueTri.concours ? <FinEtape donneesJeu={this.logiqueTri.donnees} perdu={this.perdu}></FinEtape> :
                <ResultatCommun  dureeMax={this.temps} type='tri' perdu={this.perdu} prochainJeu={this.logiqueTri.obtenirProchainJeu()} idTest={this.id} dureeJeu={this.dureeJeu}></ResultatCommun> :
                <div>
                      <h1 className="couleurTitre">{intl.get('TRI_TITRE')}</h1><div className={"espaceHaut gridPrincipale " + this.state.disable}>

                    {this.logiqueTri.choix.map((el, i) => <Choix finDisable={this.finDisable} key={i} donnee={el} numero={i} finRebours={this.finRebours} testResultat={this.testResultat} nouveauTirage={this.nouveauTirage}></Choix>)}

                    <div className="empPrincipale grandeLettreTri lettreViolet">{this.logiqueTri.infoJeu[this.state.jeuEnCours].caractere}</div>
                </div>
                    <div className="centre espaceHautTri">{this.state.afficheRebours && <CompteRebours temps={this.temps} finTimer={this.finTimer}></CompteRebours>}</div>
                </div>
            }</div>
    }
}


export default withRouter(JeuxTri);
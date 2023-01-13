import React, { Component } from 'react';
import Indice from './Indice';
import Grille from './Grille';
import { message, Button } from 'antd';
import ResultatCommun from '../../components/commun/ResultatCommun';
import FinEtape from '../concours/FinEtape';
import Regle from './Regle';
import Logique from './Logique';
import CompteRebours from '../../components/commun/CompteRebours2';
import { addGame } from '../../components/commun/localStorage';
import Helmet from 'react-helmet';
import { analytics } from '../../components/commun/analytics';
import { Redirect } from 'react-router-dom';
import withRouter from '../../components/commun/withRouter';
 class JeuxPicross extends Component {

    constructor(props) {
        super(props);
        this.id = parseInt(this.props.params.id);
       
        this.jeu = new Logique(this.id);
      
            this.taille = 0;
            this.dureeJeu = Date.now();
            this.perdu = false;
            this.temps = 0;
            this.state =
            {
                tabIndiceX: [],
                tabIndiceY: [],
                tabJeu: [],
                afficheResultat: false,
                afficheRebours: false,

            }
            analytics();
            addGame('picross', this.id);
        
    }

    async componentDidMount() {

            this.taille = this.jeu.donnees.taille;
            this.resultat = this.jeu.donnees.resultat;
            this.temps = this.jeu.donnees.temps;
            this.stop = false;
            this.setState({

                tabIndiceX: this.jeu.donnees.indiceX,
                tabIndiceY: this.jeu.donnees.indiceY,
                tabJeu: new Array(this.taille * this.taille).fill(0),
                afficheRebours: true
            }
            )
        
    }


    clic = (id) => {
        if (this.stop) return;
        let nouveauTabJeu = [...this.state.tabJeu];
        if (nouveauTabJeu[id] === 1) {
            nouveauTabJeu[id] = 0;
        }
        else {
            nouveauTabJeu[id] = 1;
        }


        if (nouveauTabJeu.toString() === this.resultat.toString()) {
            this.stop = true;
            message.success('Bravo ! Vous avez réussi', 3, this.afficherResultat);
        }
        this.setState({
            tabJeu: nouveauTabJeu,
            afficheRebours: !this.stop

        })
    }

    afficherResultat = () => {
        this.dureeJeu = Date.now() - this.dureeJeu;
        this.setState({
            afficheResultat: true,
        });
    }


    finJeu = () => {
        this.perdu = true;
        this.stop = true;
        this.setState({
            afficheRebours: !this.stop

        })
        message.error("Perdu, vous avez dépassé le temps.", 2, this.afficherResultat);
    }

    abandon = () => {
        if (this.stop) return;
        this.perdu = true;
        this.stop = true;
        this.setState({
            afficheRebours: !this.stop

        })
        message.error("Perdu, vous n'avez pas réussi.", 2, this.afficherResultat);
    }


    render() {

        return <React.Fragment>
            <Helmet>
                <title>Jeu cérebral : Picross</title>
                <meta name="description" content="Le classique jeu de réflexion du Picross dans la lignée du Binero ou Sudoku, vous devez construire un dessin à partir des indices donnés dans la grille." />
            </Helmet>
            {this.state.afficheResultat ?   (this.jeu.concours ? <FinEtape donneesJeu={this.jeu.donnees} perdu={this.perdu}>

</FinEtape> : <ResultatCommun type='picross' perdu={this.perdu} prochainJeu={this.jeu.obtenirProchainJeu()} idTest={this.id} dureeJeu={this.dureeJeu} dureeMax={200}></ResultatCommun>)  :

                <div className="JeuPicross">
                    <div className="titreJeu">Picross<span className="margeGauche10"><Regle></Regle></span></div>
                    <div><Button danger onClick={this.abandon}>Abandon</Button></div>
                    <div className="grilleCentre">
                        <div className="grillePicross">
                            <Indice type="x" indice={this.state.tabIndiceX} ></Indice>
                            <Indice type="y" indice={this.state.tabIndiceY} ></Indice>
                            <Grille taille={this.taille} tabJeu={this.state.tabJeu} clic={this.clic}></Grille>

                        </div>
                    </div>
                    <div className="marge10 lignes"><div>{this.state.afficheRebours && <div><CompteRebours temps={this.temps} finTimer={this.finJeu}></CompteRebours></div>}</div>
                    </div>
                </div>}
        </React.Fragment>

    }
}

export default withRouter(JeuxPicross)
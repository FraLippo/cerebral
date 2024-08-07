import React, { Component } from 'react';
import Logique from './Logique';
import Grille from './Grille'
import { Button, message } from 'antd';
import ResultatCommun from '../../components/commun/ResultatCommun';
import Helmet from 'react-helmet';
import withRouter from '../../components/commun/withRouter';

import { addGame } from '../../components/commun/localStorage';
import intl from 'react-intl-universal';

import FinEtape from '../concours/FinEtape';


class JeuxSimon extends Component {
    constructor(props) {
        super(props);
        this.id = parseInt(props.params.id);
        this.stop = false;
        this.jeu = new Logique(this.id);
        if (isNaN(this.id) || this.jeu.donnees === undefined) {
            this.stop = true;
        }
        else {
            this.taille = this.jeu.donnees.taille;
            this.intervalle = this.jeu.donnees.intervalle;
            this.tabCase = this.jeu.donnees.tabCase;
            this.state = {
                tabGrille: Array(this.taille * this.taille).fill(0),
                debutJeu: false,
                finJeu: false,
            }
            this.dureeJeu = Date.now();
            this.noEnCours = 0;
            this.finVue = false;
            this.perdu = false;
            this.finJeu = false;
            this.timer = setTimeout(this.finTimer, this.intervalle);
 
            addGame('jeuxsimon', this.id);
        
        }
    }

    finTimer = () => {
        let nouvelleGrille = [...this.state.tabGrille];
        if (this.noEnCours === this.tabCase.length) {
            nouvelleGrille[this.tabCase[this.noEnCours - 1]] = 0;
            this.finVue = true;
        }
        else {
            nouvelleGrille[this.tabCase[this.noEnCours]] = 1;
            if (this.noEnCours > 0) {
                nouvelleGrille[this.tabCase[this.noEnCours - 1]] = 0;
            }

            this.timer = setTimeout(this.finTimer, this.intervalle);
            this.noEnCours++;
        }
        this.setState({ tabGrille: nouvelleGrille }, this.finSequence());
    }

    finSequence = () => {
        if (this.finVue) {
            this.noEnCours = 0;
            this.setState({ debutJeu: true })
        }
    }

    clic = (id) => {
        if (this.finVue && !this.finJeu) {
            let nouvelleGrille = [...this.state.tabGrille];
            nouvelleGrille[id] = 1;
            if (this.noEnCours > 0) {
                nouvelleGrille[this.tabCase[this.noEnCours - 1]] = 0
            }
            nouvelleGrille[id] = 1;

            if (this.tabCase[this.noEnCours] !== id) {
                message.error("Tu as perdu", 2, this.fin);
                this.perdu = true;
                this.finJeu = true;
            }
            this.setState({ tabGrille: nouvelleGrille });
            this.noEnCours++;
            if (this.noEnCours === this.tabCase.length && !this.perdu) {
                message.success("Tu as gagné", 2, this.fin);
                this.finJeu = true;
            }
        }
    }

    fin = () => {
        this.dureeJeu = Date.now() - this.dureeJeu - 5;
        this.setState({ finJeu: true })
    }

    reset = () => {
        if (!this.finJeu && this.finVue) {
            this.finVue = false;
            this.noEnCours = 0;
            this.setState({
                tabGrille: Array(this.taille * this.taille).fill(0),
                debutJeu: false
            });
            this.timer = setTimeout(this.finTimer, 200);
        }
    }

    render() {
   
        return <div>
            <Helmet>
                <title>Le jeu Simon pour améliorer sa mémoire</title>
                <meta name="description" content="Le classique jeu Simon dans lequel vous devez mémoriser la séquence qui s'affiche à l'écran. Un jeu pour faire travailler sa mémoire visuelle tout en s'amusant." />
            </Helmet>
            <h1 className='couleurTitre'>Le jeu du Simon</h1>
            <p>Vous devez mémoriser la séquence des cercles qui s'affiche pour ensuite la reproduire à l'identique.</p>
            <div>Nombre de cases à mémoriser : {this.tabCase.length}</div>
            {this.state.finJeu ?
                (this.jeu.concours ? <FinEtape donneesJeu={this.jeu.donnees} perdu={this.perdu}>

                </FinEtape> : <ResultatCommun type='simon' perdu={this.perdu} prochainJeu={this.jeu.obtenirProchainJeu()} idTest={this.id} dureeJeu={this.dureeJeu} dureeMax={60}></ResultatCommun>) : <div className='centreGrille'><div><Grille tabGrille={this.state.tabGrille} taille={this.taille} clic={this.clic}></Grille></div>
                    {this.state.debutJeu && <div className='espaceHaut centre'><Button onClick={this.reset}>Revoir la séquence</Button><div className='fontMoyenne espaceHaut'>Refaire la séquence que vous venez de voir.</div></div>}
                </div>}
        </div>
    }

}
export default withRouter(JeuxSimon)
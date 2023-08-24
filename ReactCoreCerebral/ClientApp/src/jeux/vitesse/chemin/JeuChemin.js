import React, { Component } from 'react';
import Logique from './Logique';
import Grille from './Grille'
import '../../../style/vitesse.css';
import Helmet from 'react-helmet';

import Resultat from '../commun/Resultat';
import Direction from './Direction';
import depart from '../../../images/depart.png';
import arrivee from '../../../images/arrivee.png';
import { message } from 'antd';
import CompteRebours from '../commun/CompteRebours';


export default class JeuChemin extends Component {
    constructor(props) {
        super(props);
        this.erreur = 0;
        this.etape = 0;
        let jeu = Logique.constuireParcours(this.etape);
        this.tabParcours = jeu.tabCase;

        this.last = this.tabParcours[this.tabParcours.length - 1];
        this.taille = 7;
        this.state = {
            tabGrille: Array(this.taille * this.taille).fill(0),
            tabDep: jeu.tabDep,
            depart: this.tabParcours[0],
            debutJeu: false,
            finJeu: false,
            etape: 0,
            afficheReponse: false,
            score: 0

        }
       

    }

    init = () => {
        let jeu = Logique.constuireParcours(this.etape);

        this.tabParcours = jeu.tabCase;
      
        this.last = this.tabParcours[this.tabParcours.length - 1];
        this.setState({
            tabDep: jeu.tabDep,
            depart: this.tabParcours[0],
            debutJeu: false,
            finJeu: false,
            afficheReponse: false
        })

    }


    clic = (id) => {
        let score = this.state.score;
        if (this.last === id) {
            this.etape++;
            message.success('Bravo !', .5, this.init);
            score+=3;
        }
        else {
            message.error("Ce n'est pas la bonne case", 1.5, this.init);
        }
        this.setState({
            afficheReponse: true,
            score
        })

    }

    finTimer = () => {
        this.setState({finJeu : true});
    }
  

    render() {

        return <div>
            <Helmet>
                <title>Trouver son chemin</title>
                <meta name="description" content="Un jeu simple d'entrainement cérébral. Retrouvez la sortie en suivant les flêches." />
            </Helmet>
            {this.state.finJeu ?
                <Resultat score={this.state.score} typeExo='vitessechemin'></Resultat> :
                <div> <div className="titreJeu">Retrouver son chemin</div>
                    <div>Score : {this.state.score}</div>
                    <div className="centreGrilleChemin"><div className="grilleChemin"><Grille tabGrille={this.state.tabGrille} taille={this.taille} clic={this.clic}></Grille>
                        <img src={depart} alt="depart" style={Logique.constructionEmplacement(this.state.depart, this.taille)}></img>
                        {this.state.afficheReponse && <img src={arrivee} alt="arrivee" style={Logique.constructionEmplacement(this.last, this.taille)}></img>}
                    </div>


                    </div>
                    <div className="centre"> <Direction tabDep={this.state.tabDep}></Direction></div>
                    <div className="centre marge10"><CompteRebours temps={60} finTimer={this.finTimer}></CompteRebours></div>

                </div>}
        </div>
    }


}

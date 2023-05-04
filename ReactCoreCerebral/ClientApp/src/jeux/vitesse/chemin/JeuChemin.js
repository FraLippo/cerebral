import React, { Component } from 'react';
import Logique from './Logique';
import Grille from './Grille'
import '../../../style/vitesse.css';
import Helmet from 'react-helmet';
import { analytics } from '../../../components/commun/analytics';
import Resultat from '../commun/Resultat';
import Direction from './Direction';
import depart from '../../../images/depart.png';
import { message } from 'antd';

export default class JeuChemin extends Component {
    constructor(props) {
        super(props);
        this.erreur = 0;
        let jeu = Logique.constuireParcours(0);
        this.tabParcours = jeu.tabCase;

        this.last = this.tabParcours[this.tabParcours.length - 1];
        this.taille = 6;
        this.state = {
            tabGrille: Array(this.taille * this.taille).fill(0),
            tabDep : jeu.tabDep,
            depart: this.tabParcours[0],
            debutJeu: false,
            finJeu: false,
            etape: 0,
      
        }
        analytics();

    }

    init = (etape) => {
        let jeu = Logique.constuireParcours(1);
     
        this.tabParcours = jeu.tabCase;
        console.log(this.tabParcours);
        console.log(jeu.tabDep);
        this.last = this.tabParcours[this.tabParcours.length - 1];
        this.setState({
            tabDep : jeu.tabDep,
            depart: this.tabParcours[0],
            debutJeu: false,
            finJeu: false,
         
        })

    }


  clic = (id) => {
   
    if (this.last === id) {
      message.success('Bravo !');
      this.init(1);
    } 
    else
    {
        message.error("Ce n'est pas la bonne case");
    }
  }
   


    render() {
 
            return <div>
                <Helmet>
                    <title>Le jeu Simon</title>
                    <meta name="description" content="Le classique jeu Simon dans lequel vous devez mémoriser la séquence qui s'affiche à l'écran. Un jeu pour faire travailler sa mémoire visuelle tout en s'amusant." />
                </Helmet>
               {this.state.finJeu ?
                    <Resultat erreur={this.state.erreur}></Resultat> :
                    <div> <div className="titreJeu">Retrouver son chemin</div>                       
                        <div className="centreGrilleChemin"><div className="grilleChemin"><Grille tabGrille={this.state.tabGrille} taille={this.taille} clic={this.clic}></Grille>
                                           <img src={depart} alt="depart" style={Logique.constructionEmplacement(this.state.depart, this.taille)}></img>
                                          </div>


                  </div>
                 <div className="centre"> <Direction tabDep={this.state.tabDep}></Direction></div>
                    </div>}
            </div>
    }


}

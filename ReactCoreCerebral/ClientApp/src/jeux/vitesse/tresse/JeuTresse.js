import React, { Component } from 'react';
import GrilleCouleur from './GrilleCouleur';
import Grille from './Grille';
import { message } from 'antd';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat';
import { Helmet } from 'react-helmet';

const data = [['', 'vert', ''], ['', 'orange', ''],
 ['', 'vert', 'bleu'], ['', 'orange', ''],
   ['orange', 'vert', 'bleu'], ['vert', '', 'bleu'],
['vert', 'orange', ''], ['orange', 'orange', 'vert'],
 ['vert', 'rose', 'bleu'], ['orange', 'bleu', 'orange'],
  ['vert', 'rose', 'vert'], ['bleu', 'rose', 'vert'],
  ['orange', 'rose', 'vert'], ['bleu', 'orange', 'vert'],
  ['rose', 'bleu', 'vert'], ['rose', 'orange', 'bleu'],
  ['orange', 'vert', 'vert'], ['rose', 'orange', 'rose'],
  ['vert', 'bleu', 'orange'], ['vert', 'orange', 'rose'],

  ]

export default class JeuTresse extends Component {
    constructor() {
        super();
        this.noJeu = 0;
       this.fin = false;
        this.tabGrilleInit = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.state = {
            afficheResultat : false,
            tabGrilleH : data[this.noJeu],
            tabGrilleV :  data[this.noJeu+1],
            noJeu : 1,
            score: 0,
            tabGrille: [...this.tabGrilleInit],
            tabGrilleVerif: this.construire( [...this.tabGrilleInit])
        }
    }

  
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Génère un indice aléatoire entre 0 et i inclus
            [array[i], array[j]] = [array[j], array[i]]; // Échange les éléments d'indice i et j
        }
        return array;
    }
  noCouleur =(couleur) =>
  {
    let noCouleur = 1;
    if (couleur === 'bleu') noCouleur = 2;
    else if (couleur === 'orange')  noCouleur = 3;
    else if (couleur === 'rose')  noCouleur = 4;
    
    return noCouleur;
  }
    construire = (tabGrilleVerif) => {
        let tabCouleur = [];
        for (let index = 0; index < data[this.noJeu].length; index++) {
            console.log(data[this.noJeu][index] );
            if (data[this.noJeu][index] !== '') {
                tabCouleur.push({ orientation: 'H', couleur: data[this.noJeu][index], index })
            }
        }
        for (let index = 0; index < data[this.noJeu+1].length; index++) {
            if (data[this.noJeu+1][index] !== '') {
                tabCouleur.push({ orientation: 'V', couleur: data[this.noJeu+1][index], index })
            }
        }
        console.log(tabCouleur);
        tabCouleur = this.shuffleArray(tabCouleur);

        for (let i = 0; i < tabCouleur.length; i++) {
            let couleur = this.noCouleur(tabCouleur[i].couleur);
           
            if (tabCouleur[i].orientation === 'H') {
                for (let index = 0; index < 3; index++) {
                    tabGrilleVerif[(tabCouleur[i].index + (index * 3))] = couleur;
                }
            }
            else {
                for (let index = 0; index < 3; index++) {
                    tabGrilleVerif[(tabCouleur[i].index * 3) + index] = couleur;

                }
            }
        }
        return tabGrilleVerif;
    }


    nouveauJeu = () =>
    {
        
        this.noJeu+= 2;
        if (this.noJeu >= data.length)
        {
            this.setState({afficheResultat : true,
                score : this.state.score + 50
            })
        }
        else
        {
            this.fin = false;
        this.setState({
            noJeu : (this.noJeu/2) +1,
            score : this.state.score + this.noJeu,
            tabGrilleH : data[this.noJeu],
            tabGrilleV :  data[this.noJeu+1],
            tabGrille: [...this.tabGrilleInit],
            tabGrilleVerif: this.construire( [...this.tabGrilleInit])
        })
    }
    }

    verifierFin = () =>
    {
        for (let i = 0; i < this.state.tabGrilleVerif.length; i++) {
            if (this.state.tabGrilleVerif[i] !== this.state.tabGrille[i]) {
              return false;
            }
          }
          this.fin = true;
          message.success('bravo', .5, this.nouveauJeu)
    }

    clicH = (id) => {
        if (this.state.tabGrilleH[id] === ''|| this.fin) return;
        console.log(id);
        let couleur = this.noCouleur(this.state.tabGrilleH[id]);
        let nouveauTabGrille = [...this.state.tabGrille];

        for (let index = 0; index < 3; index++) {
            nouveauTabGrille[(id + (index * 3))] = couleur;

        }
        console.log(nouveauTabGrille);
        this.setState({ tabGrille: nouveauTabGrille }, this.verifierFin)
    }

    clicV = (id) => {
    
        if (this.state.tabGrilleV[id] === '' || this.fin) return;
        let couleur = this.noCouleur(this.state.tabGrilleV[id]);
        let nouveauTabGrille = [...this.state.tabGrille];

        for (let index = 0; index < 3; index++) {
            nouveauTabGrille[(id * 3) + index] = couleur;

        }
        this.setState({ tabGrille: nouveauTabGrille }, this.verifierFin)

    }

    finTimer = () => {
        this.setState({ afficheResultat: true });
    }

    render() {
        return (
            <React.Fragment>
                <Helmet>
                <title>Le jeu du peintre</title>
                <meta name="description" content="Un test d'attention et de concentration où vous devez reconstituer les bonnes couleurs d'un dessin dans l'ordre." />
            </Helmet>
                 {this.state.afficheResultat ?
                <Resultat score={this.state.score} typeExo='vitessetresse'></Resultat> :
            <div><div className='jeuTresse'>
                <div className='grilleTresse'>
                    <GrilleCouleur clicV={this.clicV} clicH={this.clicH} tabGrilleH={this.state.tabGrilleH} tabGrilleV={this.state.tabGrilleV}></GrilleCouleur>
                    <Grille tabGrille={this.state.tabGrille}></Grille>
                </div>
                <div className='grilleTresse'>
                    <Grille tabGrille={this.state.tabGrilleVerif}></Grille>
                </div>
              
                </div>  <div className="centre marge10"><CompteRebours temps={50} finTimer={this.finTimer}></CompteRebours></div>
            <div className="centre fontMoyenne">Jeu : {this.state.noJeu} / {data.length / 2}</div>
            <p>Clique sur les pinceaux dans l'ordre pour reconstituer le dessin à gauche.</p>
              </div>  }
</React.Fragment>
        );
    }
}

import React, { Component } from 'react';
import Logique from './Logique'
import Grille from './Grille';
import data from './data'
import MotResultat from './MotResultat';
import {message, Button} from 'antd';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat.js';
import { Helmet } from 'react-helmet';
const LONGMOT = 7;
export default class JeuMaitremot extends Component {


  constructor(props) {
    super(props);
    this.logique = {};

    this.posReponse = 0;
    this.fin = false;
    this.state = {
      tabListeReponse: [],
      tabReponse: [],
      score :0

    }



  }

  componentDidMount() {
    this.construireJeu();
  }

  construireJeu = () => {
    this.fin = false;
    let res = false;
    do {
      this.logique = new Logique();
      this.logique.construireNouveauJeu();
      res = this.logique.constructionListeReponse();
    } while (!res)

    this.setState({
      tabListeReponse: this.logique.tabListeMots,
      tabReponse: this.construireReponse()
    });

  }

  prochaineLettre(tab) {
    let index = tab.finIndex(x => x.etat === 'init');
    if (index != -1) {

    }
  }

  construireReponse() {
    let tab = Array.from({ length: LONGMOT }).map((_, i) => {

      return {
        lettre: '',
        etat: 'init',
        pos: i
      }
    })

    for (let index = 0; index < this.logique.reponseReference.length; index++) {
      if (this.logique.reponseReference[index].etat === 'trouve') {
        tab[index].etat = 'reserve';
      }

    }
 
    let index = tab.findIndex(x => x.etat === 'init')
    if (index === -1) {
      //Erreur impossible
      this.construireJeu();
    }
    else {
      this.posReponse = index;
      tab[index].etat = 'encours';
    }
    return tab;


  }

  finErreur = () =>
  {
      let nouveauTabReponse = [...this.state.tabReponse];
     for (let i = 0; i < this.logique.reponseReference.length; i++) {
      nouveauTabReponse[i].lettre =   this.logique.reponseReference[i].lettre;
          nouveauTabReponse[i].etat = 'erreur';
      }

       this.setState({
      tabReponse: nouveauTabReponse
    })
    window.setTimeout(() => {
      this.construireJeu();
    }, 2000)
  }

  clicGrille = (etat, i, lettre) => {
    if (this.fin) return;
    let score = this.state.score;
    if (etat === 'init') return;
    let nouveauTabReponse = [...this.state.tabReponse];
    if (etat === 'trouve') {
      nouveauTabReponse[i].lettre = lettre;
    }
    if (etat === 'mauvais') {
      nouveauTabReponse[this.posReponse].lettre = lettre;
      nouveauTabReponse[this.posReponse].etat = 'rempli';
      let index = nouveauTabReponse.findIndex(x => x.etat === 'init')
      if (index !== -1) {
        this.posReponse = index;
        nouveauTabReponse[index].etat = 'encours';
      }
    }

    let index = nouveauTabReponse.findIndex(x => x.lettre === '')
    if (index === -1) {
      this.fin = true;
      let i;
      for (i = 0; i < this.logique.reponseReference.length; i++) {
          if (this.logique.reponseReference[i].lettre !== nouveauTabReponse[i].lettre)
          {
            break;
          }
      }
      if (i === this.logique.reponseReference.length)
      {
          message.success("Bravo", 2,this.construireJeu );
          score += 10;
      }
      else
      {
        message.error("Ce n'est pas le bon mot", 1.5, this.finErreur);
        score = score > 10 ? score - 5 : 0; 
       
      }
    }

    this.setState({
      tabReponse: nouveauTabReponse,
      score
    })
  }
 reset = () =>
    {
     
      let nouveauTabReponse = this.construireReponse();
      this.setState({tabReponse : nouveauTabReponse});
    }

   finTimer = () =>
    {
        this.setState({
            finJeu: true
        });
    }

  render() {
    return <div>
       <Helmet>
                    <title>Motus</title>
                    <meta name="description" content="Retrouvez une version de Motus, le célèbre jeu de lettre dans une version amélioré. Votre challenge : retrouvez le bon ordre des lettres." />
                </Helmet>
      
       { this.state.finJeu ? <Resultat score={this.state.score} typeExo='vitessemotus'></Resultat> :<div className='jeumaitre'>
      <div className='grillemaitre'><Grille clicGrille={this.clicGrille} tabListeReponse={this.state.tabListeReponse}></Grille></div>
      <div><MotResultat tabReponse={this.state.tabReponse}></MotResultat></div>
      <div className='centre marge10'><Button onClick={this.reset}>Reset</Button></div>
       <div className='centre marge10'>Score {this.state.score}</div>
      <div className="centre marge10"><CompteRebours temps={90} finTimer={this.finTimer}></CompteRebours></div>
      

    </div>}</div>
  }
}
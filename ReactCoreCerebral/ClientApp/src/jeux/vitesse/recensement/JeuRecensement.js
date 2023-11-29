import React, { Component } from 'react';
import Grille from './Grille';
import Reponses from './Reponses';
import Logique from './Logique';
import { message } from 'antd';
import CompteRebours from '../commun/CompteRebours';
import Resultat from '../commun/Resultat';

export default class JeuRecensement extends Component
{
  constructor()
  {
    super();
    this.long = 9;
    this.larg = 9; 
    this.nbJeu = 0;
    this.tabLettres = ['ψ', ' α', 'β', 'δ', 'π', 'Ω'];
    this.typeQuestion = this.choixJeu();
    let tabGrille = this.creationGrille();
   this.fin = false;
    this.logique = new Logique(tabGrille, this.tabLettres, this.long, this.larg); 
    this.reponse = null;
    this.score= 0;
    this.state={
        tabGrille,
        tabReponses : [],
        question : '',
        cssFade : 'fade-outRece',
        afficheResultat :false,
        score : 0
    }
  }

  choixJeu()
  { 
    const hasard = Math.floor(Math.random() * 10) + 1;
    let jeu = '';

    if (this.nbJeu < 5)
    {
        jeu = hasard > 4 ? 'vraiFaux' :'vraiFauxDirection' ;
    }
    else
    {
        jeu = hasard > 8 ? 'ligne' : hasard > 5 ? 'colonne' :hasard > 3 ? 'nbcolonne' : 'nbligne' ;
    }

 
    return jeu;
  }


 componentDidMount()
 {
     this.choixQuestion();
 }

 choixQuestion()
 {
    let tabReponses = [];
    let question, reponse;
    if (this.typeQuestion === 'vraiFaux')
    {
        ({question, reponse} = this.logique.ReponseVraiFauxCase());
        this.reponse = reponse;
         tabReponses = ['Vrai', 'Faux']
    }
    else if (this.typeQuestion === 'vraiFauxDirection')
    {
        ({question, reponse} = this.logique.ReponseVraiFauxCaseGaucheDroite());
        this.reponse = reponse;
         tabReponses = ['Vrai', 'Faux']
    }
    else if (this.typeQuestion === 'ligne')
    {
        ({question, reponse} = this.logique.ReponseContenirLigneColonne('ligne'));
        this.reponse = reponse;
        tabReponses = [1,2,3,4,5,6,7,8];
    }
    else if (this.typeQuestion === 'colonne')
    {
        ({question, reponse} = this.logique.ReponseContenirLigneColonne('colonne'));
        this.reponse = reponse;
         tabReponses = ['A','B','C', 'D', 'E', 'F', 'G', 'H'];
    }
    else if (this.typeQuestion === 'nbcolonne')
    {
        ({question, reponse} = this.logique.ReponseContenirNombre('colonne'));
        this.reponse = reponse;
         tabReponses = ['1','2','3', '4', '5', '6', '7', '8'];
    }
    else if (this.typeQuestion === 'nbligne')
    {
        ({question, reponse} = this.logique.ReponseContenirNombre('ligne'));
        this.reponse = reponse;
        tabReponses = ['1','2','3', '4', '5', '6', '7', '8'];
    }
    this.setState({question, tabReponses});
 }

  

  creationTableauLettres()
  {
    let tab = [];

    for (let index = 0; index < this.long * this.larg; index++) {
        const no = Math.floor(Math.random() * this.tabLettres.length);
 
        tab[index] = this.tabLettres[no];
        
    }
    return tab;
  }
   
  creationGrille()
  {
    let tabGrille = this.creationTableauLettres();
    let l = 65;
    tabGrille[0] = '';
    for (let index = 1;  index < this.long + 1; index++) {
        tabGrille[index] = String.fromCharCode(l);
        l++;   
    }
    l = 1;
    for (let index = 1;  index < this.larg; index++) {
        tabGrille[index * this.larg] = l;
        
        l++;   
    }
    return tabGrille;
  }


 jeuSuivant = () =>
 {
    this.fin = false;
    this.nbJeu++;
    this.setState({cssFade : 'fade-outRece'});
    this.typeQuestion = this.choixJeu();
    this.choixQuestion();

 }

  succes = () =>
  {
    message.success('Bravo', .8, this.jeuSuivant);

    this.score += 5;
    this.setState({cssFade : ' fade-outRece fade', score: this.score});
  }

  echec = () =>
  {
    message.error('Erreur',.8, this.jeuSuivant);
    
    this.score = this.score > 6 ? this.score -= 6 : 0;
    this.setState({cssFade : 'fade-outRece fade', score: this.score});
  }
  verifierVraiFaux = (id) =>
  {
    let reponse = this.reponse ? this.state.tabReponses[0] : this.state.tabReponses[1];
    if (this.state.tabReponses[id] === reponse)
    {
        this.succes();
    }
    else
    {
        this.echec();
    }
  }

  verifierLigneColonne = (id) =>
  {
        if (this.reponse.findIndex( x => x === this.state.tabReponses[id]) !== -1)
        {
            this.succes();
        }
        else
        {
            this.echec();
        }
  }

  verifierNbLigneColonne = (id) =>
  {
  
        if (parseInt(this.state.tabReponses[id]) === this.reponse)
        {
            this.succes();
        }
        else
        {
            this.echec();
        }
  }

    clic = (id) =>
    {
        if (this.fin) return;
        this.fin = true;
        if (this.typeQuestion === 'vraiFaux' || this.typeQuestion === 'vraiFauxDirection')
        {
            this.verifierVraiFaux(id)
        }
        else if (this.typeQuestion === 'ligne' || (this.typeQuestion === 'colonne'))
        {
            this.verifierLigneColonne(id)
        }
        else if (this.typeQuestion === 'nbligne' || (this.typeQuestion === 'nbcolonne'))
        {
            this.verifierNbLigneColonne(id)
        }
    } 
    
    finTimer = () =>
    {
        this.setState({afficheResultat : true});
    }



    render()
    {
    return <React.Fragment>
       {this.state.afficheResultat ?  <Resultat score={this.score} typeExo='vitesserecensement'></Resultat>  : <React.Fragment>
        <div className="jeuMatch"><Grille tabGrille={this.state.tabGrille}></Grille>
        <div className={this.state.cssFade}>
        <div className="marge20 questionRece">{this.state.question}</div>
        <Reponses tabReponses={this.state.tabReponses} clic={this.clic}></Reponses></div>
        <div className="marge20"> <CompteRebours temps={90} finTimer={this.finTimer}></CompteRebours></div>
       <div className="marge20">Score : {this.state.score}</div>
       <div className='titreJeu'>Le jeu du recensement</div>
        </div></React.Fragment>}
        </React.Fragment>
    }
}
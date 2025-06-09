import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import GraphiqueRapidite from '../commun/GraphiquesRapidité';
import Ad from '../commun/adSense';
import '../../style/jeux.css';


import { Helmet } from 'react-helmet';


export default class TestCalcul extends Component {

  constructor()
  {
    super();
    this.prenom = '';
    this.state =
    {
        resultatsJoueur : [],
       
    }
  }

  recupererResultatJoueur = (prenom, resultats)=>
  {
    this.prenom = prenom;
    this.setState({
        resultatsJoueur : resultats
       
    });
  }
  render() {
    return <div>
         <Helmet>
            <title>Tests de calcul mental</title>
            <meta name="description" content="Améliorez vos compétences en calcul mental avec nos tests interactifs. Évaluez votre rapidité et précision en mathématiques à travers une série d'exercices stimulants conçus pour affiner votre agilité numérique et renforcer vos capacités cognitives." />
            <link rel="alternate" hreflang="en" href="https://brain-games.evalquiz.com/arithmetic-games" />
<link rel="alternate" hreflang="fr" href="https://cerebral.evalquiz.com/test-calcul" />
<link rel="alternate" hreflang="x-default" href="https://cerebral.evalquiz.com/test-calcul" />
          
            </Helmet>

      <h1 className="titre couleurTitre centre">Les tests de calcul mental</h1>
      <p>Évaluez et perfectionnez vos compétences en mathématiques avec nos tests de calcul mental stimulants, conçus pour améliorer votre rapidité et précision en calculs numériques.</p> 
      <GraphiqueRapidite categorie='c' recupererResultatJoueur={this.recupererResultatJoueur}></GraphiqueRapidite>

   
      <div className='jeuVitesse marge20'>
                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitesseoperation"] != null ? "dejaFaitCognito" : ""}`}>
    <Link to='/vitesseoperation'>    <div className="centre titreVitesse">➕ Les 4 opérations</div>
        <p className="marge20">But du jeu : Le plus simple des jeux de calcul mental, calculer le plus vite possible le résultat d'une simple opération. Les 4 opérateurs sont utilisés. Tu as 90 secondes pour réaliser le meilleur score. Chaque bonne réponse rapporte 1 point.</p>
      </Link>  <p className='centre'>{this.state.resultatsJoueur["vitesseoperation"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitesseoperation"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitesseoperation'>Classement</Link></div>
 </div>
                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessecalcul"] != null ? "dejaFaitCognito" : ""}`}>
      <Link to='/vitessecalcul '> <div className="centre titreVitesse">🟰 La grille de calcul</div>
        <p className="marge20">But du jeu : On te donne 9 petits calculs (des additions et des soustractions) dans une grille, tu dois pointer les cases qui sont supérieures ou inférieures à un résultat donné. Tu as 60 secondes pour réaliser le meilleur score, +1 par bonne réponse, -1 en cas de mauvaise réponse.</p>
</Link>
        <p className='centre'>{this.state.resultatsJoueur["vitessecalcul"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessecalcul"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessecalcul'>Classement</Link></div>
      </div>
                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessearithmetique"] != null ? "dejaFaitCognito" : ""}`}>
       <Link to='/vitessearithmetique'> <div className="centre titreVitesse" >🔀  Nombres en désordre</div>
          <p className="marge20">But du jeu : Retrouve la bonne opération. Des nombres sont affichés dans le désordre tu dois les remettre en ordre pour reconstituer une opération. Tu as 60 secondes, chaque bonne réponse rapporte 6 points.  </p>
       </Link>   <p className='centre'>{this.state.resultatsJoueur["vitessearithmetique"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessearithmetique"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessearithmetique'>Classement</Link></div>
      </div>
                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessemonnaie"] != null ? "dejaFaitCognito" : ""}`}>
       <Link to='/vitessemonnaie'>  <div className="centre titreVitesse" >💵 La monnaie</div>
          <p className="marge20">But du jeu : Tu dois rendre la monnaie au client en cliquant sur les pièces pour faire l'appoint. Tu dois gérer le maximum de clients en 60 secondes. Tu gagnes des points à chaque client content.   </p>
       </Link>   <p className='centre'>{this.state.resultatsJoueur["vitessemonnaie"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessemonnaie"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessemonnaie'>Classement</Link></div>
      </div>

     </div>
     <p>Les tests de calcul mental sont essentiels pour maintenir et améliorer vos capacités cognitives. Ils stimulent votre cerveau en renforçant la rapidité et la précision de vos calculs, tout en améliorant votre mémoire et votre concentration. En pratiquant régulièrement, vous développez une agilité mentale qui vous sera utile dans de nombreuses situations quotidiennes, que ce soit pour gérer vos finances, résoudre des problèmes rapidement, ou simplement garder votre esprit vif et alerte. Ces exercices sont un moyen efficace et ludique de renforcer vos compétences en mathématiques et de préserver votre acuité intellectuelle.</p>
     <Ad></Ad>
     <div className='autreVitesse centre'> <a href="/">Les autres catégories</a> </div>

       </div>
  }
}
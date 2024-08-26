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
            </Helmet>

      <h1 className="titre couleurTitre centre">Les tests de calcul mental</h1>
      <p>Évaluez et perfectionnez vos compétences en mathématique avec nos tests de calcul mental stimulants, conçus pour améliorer votre rapidité et précision en calculs numériques.</p> 
      <GraphiqueRapidite categorie='c' recupererResultatJoueur={this.recupererResultatJoueur}></GraphiqueRapidite>

   
      <div className='jeuVitesse marge20'>
                <div className="lienJeuRapidité presentationJeu marge20">
        <div className="centre titreVitesse">➕ <Link to='/vitesseoperation'>Les 4 opérations</Link></div>
        <p className="marge20">But du jeu : Le plus simple des jeux de calcul mental, calculer le plus vite possible le résultat d'une simple opération. Les 4 opérateurs sont utilisés. Tu as 90 secondes pour réaliser le meilleur score. Chaque bonne réponse rapporte 1 point.</p>
        <p className='centre'>{this.state.resultatsJoueur["vitesseoperation"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitesseoperation"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitesseoperation'>Classement</Link></div>
 </div>
        <div className="lienJeuRapidité presentationJeu marge20">
        <div className="centre titreVitesse">🟰 <Link to='/vitessecalcul'>La grille de calcul</Link></div>
        <p className="marge20">But du jeu : On te donne 9 petits calculs (des additions et des soustractions) dans une grille, tu dois pointer les cases qui sont supérieures ou inférieures à un résultat donné. Tu as 60 secondes pour réaliser le meilleur score, +1 par bonne réponse, -1 en cas de mauvaise réponse.</p>

        <p className='centre'>{this.state.resultatsJoueur["vitessecalcul"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessecalcul"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessecalcul'>Classement</Link></div>
      </div>
      <div className="lienJeuRapidité presentationJeu marge20">
        <div className="centre titreVitesse" >🔀 <Link to='/vitessearithmetique'> Nombres en désordre</Link></div>
          <p className="marge20">But du jeu : Retrouve la bonne opération. Des nombres sont affichés dans le désordre tu dois les remettre en ordre pour reconstituer une opération. Tu as 60 secondes, chaque bonne réponse rapporte 6 points.  </p>
          <p className='centre'>{this.state.resultatsJoueur["vitessearithmetique"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessearithmetique"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessearithmetique'>Classement</Link></div>
      </div>
      <div className="lienJeuRapidité presentationJeu marge20">
        <div className="centre titreVitesse" >💵 <Link to='/vitessemonnaie'> La monnaie 🆕</Link></div>
          <p className="marge20">But du jeu : Tu dois rendre la monnaie au client en cliquant sur les pièces pour faire l'appoint. Tu dois gérer le maximum de clients en 60 s. Tu gagnes des points à chaque client content.   </p>
          <p className='centre'>{this.state.resultatsJoueur["vitessemonnaie"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessemonnaie"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessemonnaie'>Classement</Link></div>
      </div>

     </div>
       </div>
  }
}
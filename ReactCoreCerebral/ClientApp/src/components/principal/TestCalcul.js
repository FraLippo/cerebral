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
<link rel="alternate" hreflang="x-default" href="https://brain-games.evalquiz.com/arithmetic-games" />
          
            </Helmet>

      <h1 className="titre couleurTitre centre">Les tests de calcul mental</h1>
      <p className='centre'>Évaluez et perfectionnez vos compétences en mathématiques avec nos tests de calcul mental stimulants, conçus pour améliorer votre rapidité et précision en calculs numériques.</p> 
      <GraphiqueRapidite categorie='c' recupererResultatJoueur={this.recupererResultatJoueur}></GraphiqueRapidite>

   <Ad></Ad>
      <div className='jeuVitesse marge20'>

         <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessecompte"] != null ? "dejaFaitCognito" : ""}`}>
    <Link to='/vitessecompte'>    <div className="centre titreVitesse">🎯 Le compte est bon</div>
        <p className="marge20">But du jeu : Réussir à trouver un résultat à partir de 6 nombres et des 4 opérations. Il y a toujours une solution, les solutions sont de type (a + b) x c, mais peu importe le moyen d'arriver aux résultats. Tu peux reprendre le résultat d'une opération pour construire un nouveau calcul. Tu as 80 s et tu marques 15 points par calcul correct.</p>
      </Link>  <p className='centre'>{this.state.resultatsJoueur["vitessecompte"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessecompte"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessecompte'>Classement</Link></div>
 </div>

                  <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessefraction"] != null ? "dejaFaitCognito" : ""}`}>
    <Link to='/vitessefraction'>    <div className="centre titreVitesse">➗ Les fractions</div>
        <p className="marge20">But du jeu : colorier un certain nombre de cases dans une figure. Exemple : si la figure contient 15 carrés et que l'objectif est de colorier les 2/3 des carrés, tu dois colorier (15 / 3) x 2 = 5 x 2 = 10 carrés en orange. Tu dois réussir 9 calculs pour obtenir un bonus de 60 points. </p>
      </Link>  <p className='centre'>{this.state.resultatsJoueur["vitessefraction"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessefraction"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessefraction'>Classement</Link></div>
 </div>


                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitesseoperation"] != null ? "dejaFaitCognito" : ""}`}>
    <Link to='/vitesseoperation'>    <div className="centre titreVitesse">➕ Les 4 opérations</div>
        <p className="marge20">But du jeu : le plus simple des jeux de calcul mental, calculer le plus vite possible le résultat d'une simple opération. Les 4 opérateurs sont utilisés. Tu as 90 secondes pour réaliser le meilleur score. Chaque bonne réponse rapporte 1 point.</p>
      </Link>  <p className='centre'>{this.state.resultatsJoueur["vitesseoperation"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitesseoperation"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitesseoperation'>Classement</Link></div>
 </div>
                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessecalcul"] != null ? "dejaFaitCognito" : ""}`}>
      <Link to='/vitessecalcul '> <div className="centre titreVitesse">🟰 La grille de calcul</div>
        <p className="marge20">But du jeu : on te donne 9 petits calculs (des additions et des soustractions) dans une grille, tu dois pointer les cases qui sont supérieures ou inférieures à un résultat donné. Tu as 60 secondes pour réaliser le meilleur score, +1 par bonne réponse, -1 en cas de mauvaise réponse.</p>
</Link>
        <p className='centre'>{this.state.resultatsJoueur["vitessecalcul"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessecalcul"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessecalcul'>Classement</Link></div>
      </div>
                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessearithmetique"] != null ? "dejaFaitCognito" : ""}`}>
       <Link to='/vitessearithmetique'> <div className="centre titreVitesse" >🔀  Nombres en désordre</div>
          <p className="marge20">But du jeu : retrouve la bonne opération. Des nombres sont affichés dans le désordre tu dois les remettre en ordre pour reconstituer une opération. Tu as 60 secondes, chaque bonne réponse rapporte 6 points.  </p>
       </Link>   <p className='centre'>{this.state.resultatsJoueur["vitessearithmetique"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessearithmetique"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessearithmetique'>Classement</Link></div>
      </div>
                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessemonnaie"] != null ? "dejaFaitCognito" : ""}`}>
       <Link to='/vitessemonnaie'>  <div className="centre titreVitesse" >💵 La monnaie</div>
          <p className="marge20">But du jeu : tu dois rendre la monnaie au client en cliquant sur les pièces pour faire l'appoint. Tu dois gérer le maximum de clients en 60 secondes. Tu gagnes des points à chaque client content.   </p>
       </Link>   <p className='centre'>{this.state.resultatsJoueur["vitessemonnaie"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessemonnaie"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessemonnaie'>Classement</Link></div>
      </div>

     </div>
    <div>
  <h2>Des tests de calcul mental gratuits en ligne pour tous les niveaux scolaires</h2>
  <p>
    Entraîne-toi au calcul mental grâce à nos exercices gratuits en ligne, adaptés au <strong>CM1</strong> et <strong>CM2</strong> jusqu'à la <strong>6e</strong> et la <strong>3e</strong>. Chaque jeu est rapide, ludique et conçu pour améliorer ta <strong>concentration</strong>, ta <strong>rapidité</strong> et ta <strong>précision</strong> en mathématiques.
  </p>

  <h3>Des jeux variés pour progresser à ton rythme</h3>
  <p>
    Les exercices proposés couvrent plusieurs compétences&nbsp;: retrouver un résultat à partir de six nombres, colorier une fraction, résoudre des opérations simples le plus vite possible, pointer les bonnes cases dans une grille, remettre une opération dans le bon ordre ou encore rendre la monnaie à un client.  
    Certains jeux sont <strong>faciles</strong> et parfaits pour les niveaux CM1 et CM2, tandis que d'autres sont plus <strong>difficiles</strong> et idéaux pour les élèves de la 6e à la 3e ou pour les adultes qui veulent se challenger.
  </p>

  <h3>Convient aussi parfaitement aux adultes</h3>
  <p>
    Les adultes peuvent utiliser ces tests pour entretenir leur <strong>agilité mentale</strong>, améliorer leur <strong>concentration</strong> et garder un esprit vif. Les jeux rapides comme les opérations chronométrées ou la monnaie sont parfaits pour stimuler le cerveau en quelques minutes par jour.
  </p>

  <h3>Un excellent entraînement pour la concentration</h3>
  <p>
    Le calcul mental est l'un des meilleurs moyens de renforcer la <strong>concentration</strong> et la <strong>réflexion rapide</strong>. Les jeux chronométrés présents sur cette page t'obligent à rester attentif, à analyser vite et à prendre des décisions précises sous pression.
  </p>

  <h3>Gratuit, en ligne et sans inscription</h3>
  <p>
    Tous les tests sont entièrement <strong>gratuits</strong> et accessibles directement en ligne, sans création de compte. Tu peux jouer à ton rythme, suivre tes scores et tenter de monter dans le classement du mois. Une manière simple, rapide et motivante de progresser en calcul mental.
  </p>

  <p>
    Que tu sois élève, parent, adulte ou senior, ces jeux de calcul mental t'aideront à progresser, à renforcer ta concentration et à garder ton cerveau en pleine forme.
  </p>
</div>

     <div className='autreVitesse centre'> <a href="/">Les autres catégories</a> </div>

       </div>
  }
}
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import GraphiqueRapidite from '../commun/GraphiquesRapidité';
import Ad from '../commun/adSense';
import '../../style/jeux.css';


import { Helmet } from 'react-helmet';


export default class TestPlanification extends Component {

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
            <title>Tests de planification mentale</title>
            <meta name="description" content="Découvrez nos tests de planification mentale conçus pour évaluer et améliorer vos compétences en organisation et en gestion du temps. Testez votre capacité à planifier, anticiper et résoudre des problèmes complexes avec nos outils interactifs." />        </Helmet>

      <h1 className="titre couleurTitre centre">Les tests de planification</h1>
      <p>Développez votre esprit stratégique et améliorez vos compétences en planification avec nos jeux stimulants et captivants !</p>

      <GraphiqueRapidite categorie='p' recupererResultatJoueur={this.recupererResultatJoueur}></GraphiqueRapidite>

      <div className='jeuVitesse marge20'>

<div className="lienJeuRapidité presentationJeu marge20">
 <Link to='/vitessetaquin'><div className="centre titreVitesse" >🔄 Le taquin</div>
<p className="marge20">But du jeu : Dans ce classique du jeu de réflexion, tu dois déplacer des tuiles pour créer une ligne puis une colonne. Tu as 90 secondes pour construire la ligne et la colonne. 40 points te sont donnés après la ligne et 70 points après la colonne.  </p>
</Link>
<p className='centre'>{this.state.resultatsJoueur["vitessetaquin"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessetaquin"]:"Pas encore de résultat" }</p>

<div className="centre"><Link to='/classement/vitessetaquin'>Classement</Link></div>
</div>


<div className="lienJeuRapidité presentationJeu marge20">
<Link to='/vitessetresor'><div className="centre titreVitesse" >🪙 La chasse au trésor</div>

<p className="marge20">But du jeu : Ramasser le plus rapidement possible les pièces disséminées dans une grille en indiquant la direction des pièces à votre personnage. Chaque pièce récoltée te fait gagner 2 points. Ramasser toutes les pièces ajoute un bonus de 2 points. Il y a un malus de 5 points si tu n'arrives pas à ramasser toutes les pièces sur la grille. Le temps alloué est de 60 secondes. </p>
 </Link>
 <p className='centre'>{this.state.resultatsJoueur["vitessetresor"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessetresor"]:"Pas encore de résultat" }</p>

<div className="centre"><Link to='/classement/vitessetresor'>Classement</Link></div>
</div>



<div className="lienJeuRapidité presentationJeu marge20">
<Link to='/vitessetresse'><div className="centre titreVitesse" >🎨  Le jeu du peintre</div>
<p className="marge20">But du jeu : Tu dois refaire le dessin qui est affiché en cliquant sur les pinceaux de couleur. Les pinceaux colorient une ligne ou une colonne entière. Une nouvelle couleur efface les autres. Il suffit de trouver le bon ordre dans lequelle le dessin a été colorié. Tu as 50 secondes pour terminer les 10 figures (+50 points).</p>
</Link>
<p className='centre'>{this.state.resultatsJoueur["vitessetresse"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessetresse"]:"Pas encore de résultat" }</p>

<div className="centre"><Link to='/classement/vitessetresse'>Classement</Link></div>
</div>


<div className="lienJeuRapidité presentationJeu marge20">
<Link to='/vitessechemin'><div className="centre titreVitesse">⬆️ Retrouver son chemin</div>
<p className="marge20">But du jeu : Trouver la sortie en suivant  les flèches, on t'indique le point de départ et tu dois trouver le point d'arrivée, le chemin est indiqué par une suite de flèches (haut, bas, droite, gauche). tu as 60 secondes pour réaliser le meilleur score. Chaque bonne réponse rapporte 1 point.</p>
</Link>
<p className='centre'>{this.state.resultatsJoueur["vitessechemin"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessechemin"]:"Pas encore de résultat" }</p>

<div className="centre"><Link to='/classement/vitessechemin'>Classement</Link></div>
</div>


</div>
<h2>Les tests de planification</h2>
      <p>La planification est une compétence essentielle qui nous aide à organiser et à anticiper les actions nécessaires pour atteindre nos objectifs. Cela implique de savoir quelles étapes suivre, dans quel ordre, et comment utiliser nos ressources efficacement. Chacun a une capacité de planification différente, influencée par des facteurs comme la flexibilité du cerveau et les connexions neuronales. Si notre capacité à planifier est altérée, des tâches quotidiennes comme organiser un événement ou suivre des instructions peuvent devenir plus difficiles. Heureusement, cette compétence peut être améliorée grâce à nos exercices mentaux et de bonnes habitudes. </p>
     <Ad></Ad>
     <div className='autreVitesse centre'> <a href="/">Les autres catégories</a> </div>

      </div>
  }
}
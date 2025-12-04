
import React, { Component } from 'react';
import GraphiqueRapidite from '../commun/GraphiquesRapidité';
import Ad from '../commun/adSense';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';



export default class TestMemoire extends Component {

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
            <title>Les tests de la mémoire </title>
            <meta name="description" content="Évaluez et améliorez votre mémoire avec une gamme de tests interactifs. Découvrez des évaluations des différents types de mémoire pour mieux comprendre et renforcer vos capacités cognitives."></meta>

            <link rel="alternate" hreflang="en" href="https://brain-games.evalquiz.com/memory-games" />
<link rel="alternate" hreflang="fr" href="https://cerebral.evalquiz.com/test-memoire" />
<link rel="alternate" hreflang="x-default" href="https://cerebral.evalquiz.com/test-memoire" />
            </Helmet>
      <h1 className="titre couleurTitre centre">Bilan mémoire : testez votre mémoire</h1>
     <p>Évaluez vos capacités de mémorisation à travers une série de jeux interactifs conçus pour faire un bilan complet de votre mémoire.</p>
<GraphiqueRapidite categorie='m' recupererResultatJoueur={this.recupererResultatJoueur}></GraphiqueRapidite>
<Ad></Ad>
<div className='jeuVitesse marge20'>
             <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitesseloup"] != null ? "dejaFaitCognito" : ""}`}>
      <Link  to='/vitesseloup'> <div className="centre titreVitesse" >🐺  Attrape le loup</div>    
          <p className="marge20">But du jeu : Mémorise le déplacement d'un loup sur une grille pour pouvoir le reproduire. Le but est de rejoindre le loup. Le loup démarre avec 4 secondes d'avance. +10 points si tu rattrapes le loup. 30 points de bonus si tu arrives au bout des 10 parties en moins de 110 s. </p>
 </Link>
     <p className='centre'>{this.state.resultatsJoueur["vitesseloup"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitesseloup"]:"Pas encore de résultat" }</p>
        <div className="centre"><Link to='/classement/vitesseloup'>Classement</Link></div>
      </div>

                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessealz"] != null ? "dejaFaitCognito" : ""}`}>
      <Link  to='/vitessealz'> <div className="centre titreVitesse" >🎗️  La mémoire longue</div>    
          <p className="marge20">But du jeu : Se souvenir des mots affichés. À la différence des autres tests, on ne vous demande pas de vous souvenir de la liste de mots tout de suite, vous devez jouer à un petit jeu avant de restituer la liste. Ce jeu de mémoire est inspiré d'un test d'Alzheimer, le test des 5 mots, mais dans une version ludique. 7 points par mot, bonus de 50 points si vous trouvez les 12 mots. </p>
 </Link>
     <p className='centre'>{this.state.resultatsJoueur["vitessealz"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessealz"]:"Pas encore de résultat" }</p>
        <div className="centre"><Link to='/classement/vitessealz'>Classement</Link></div>
      </div>


                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessememory"] != null ? "dejaFaitCognito" : ""}`}>
      <Link  to='/vitessememory'> <div className="centre titreVitesse" >🎩  Le jeu du memory</div>    
          <p className="marge20">But du jeu : Trouver toutes les paires comme dans le classique jeu du Memory. Une différence avec le jeu classique : tu découvres les paires à ton rythme. Elles ne disparaissent pas au bout d'un certain temps. Le temps alloué est de 60 secondes pour tenter de trouver toutes les paires, un bonus de 30 points est alloué si tu finis le jeu.</p>
 </Link>
     <p className='centre'>{this.state.resultatsJoueur["vitessememory"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessememory"]:"Pas encore de résultat" }</p>
        <div className="centre"><Link to='/classement/vitessememory'>Classement</Link></div>
      </div>


                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessenombre"] != null ? "dejaFaitCognito" : ""}`}>
      <Link to='/vitessenombre'><div className="centre titreVitesse" >✅  Mémoire des nombres</div>

          <p className="marge20">But du jeu : Mémoriser une série de chiffres pour pouvoir la restituer plus tard. La suite de chiffres augmente à chaque fois d'un chiffre jusqu'à 8 ensuite elle redescend pour revenir à 1 chiffre. Chaque nombre trouvé rapporte 5 points. Si tu réussis à revenir à 1 chiffre en moins de 75 secondes tu obtiens un bonus de 50 points.</p>
  </Link>       
    <p className='centre'>{this.state.resultatsJoueur["vitessenombre"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessenombre"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessenombre'>Classement</Link></div>
      </div>

                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitesseforme"] != null ? "dejaFaitCognito" : ""}`}>
     <Link to='/vitesseforme'><div className="centre titreVitesse" >🔺 Mémoire des formes</div>
           <p className="marge20">But du jeu : Se souvenir des formes et de la couleur des éléments présentés sur des cartes. Une fois les cartes mémorisées, elles sont retournées puis c'est à toi de les retrouver. Chaque bonne réponse rapporte 2 points puis 4 points, une mauvaise réponse te fait perdre 3 points. Le temps alloué est de 60 secondes.</p>
        </Link>    
         <p className='centre'>{this.state.resultatsJoueur["vitesseforme"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitesseforme"]:"Pas encore de résultat" }</p>

        <div className="centre "><Link to='/classement/vitesseforme'>Classement</Link></div>
      </div>

                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessememoire"] != null ? "dejaFaitCognito" : ""}`}>
       <Link to='/vitessememoire'> <div className="centre titreVitesse" >🔵 Se souvenir des cercles</div>
   
        <p className="marge20">But du jeu : On te montre un certain nombre de cercles dans une grille, tu dois mémoriser leurs emplacements et reproduire ce que tu viens de voir dans une nouvelle grille. Le temps alloué est de 90 secondes, chaque cercle trouvé rapporte 1 point, il n'y a pas de pénalité en cas d'erreur.</p>
      </Link>   <p className='centre'>{this.state.resultatsJoueur["vitessememoire"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessememoire"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessememoire'>Classement</Link></div>
      </div>
                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessepaire"] != null ? "dejaFaitCognito" : ""}`}>
      <Link to='/vitessepaire'>  <div className="centre titreVitesse">🐈‍⬛ L'animal précédent</div>
  
        <p className="marge20">But du jeu : On te montre une suite d'images d'animaux, tu dois indiquer si l'animal que tu as vu juste avant est le même que l'animal affiché. Tu as 30 secondes pour obtenir le meilleur score, +2 points par bonne réponse, -3 points par mauvaise réponse.</p>
     </Link>   <p className='centre'>{this.state.resultatsJoueur["vitessepaire"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessepaire"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessepaire'>Classement</Link></div>
      </div>
</div>
<h2>Tests de la mémoire gratuits</h2>
<p>Les tests de mémoire sont des outils essentiels pour évaluer les différentes facettes de nos capacités cognitives. Ils permettent de mesurer comment notre cerveau enregistre, stocke et rappelle les informations, fournissant ainsi un aperçu précieux de notre santé mentale et de nos fonctions cognitives.</p>
<h2>Les différents types de mémoire</h2>
<p><b>Mémoire sensorielle</b> : Première étape du traitement de l'information, la mémoire sensorielle capture brièvement les sensations perçues par nos sens (comme une image ou un son) pendant une fraction de seconde. C'est grâce à elle que nous pouvons intégrer ces informations dans des processus cognitifs plus complexes.</p>

<p><b>Mémoire à court terme (ou mémoire de travail)</b> : Ce type de mémoire retient une quantité limitée d'informations pendant une courte durée, généralement quelques secondes à quelques minutes. Elle est essentielle pour les tâches cognitives immédiates, comme se souvenir d'un numéro de téléphone juste le temps de le composer.</p>

<p><b>Mémoire à long terme </b>: Elle stocke des informations sur une période prolongée.</p>

<p><b>Mémoire prospective</b> : Ce type de mémoire est dédié à la gestion des tâches futures, comme se rappeler de prendre un rendez-vous ou de faire une course plus tard.</p>


<div className='autreVitesse centre'> <a href="/">Les autres catégories</a> </div>
</div>
  }
}
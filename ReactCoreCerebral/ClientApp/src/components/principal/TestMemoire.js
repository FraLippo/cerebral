
import React, { Component } from 'react';
import GraphiqueRapidite from '../commun/GraphiquesRapidité';
import Ad from '../commun/adSense';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';



export default class TestMemoire extends Component {

  constructor() {
    super();
    this.prenom = '';
    this.state =
    {
      resultatsJoueur: [],

    }
  }

  recupererResultatJoueur = (prenom, resultats) => {
    this.prenom = prenom;
    this.setState({
      resultatsJoueur: resultats

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
      <p className='centre'>Évaluez vos capacités de mémorisation à travers une série de jeux interactifs conçus pour faire un bilan complet de votre mémoire.</p>
      <GraphiqueRapidite categorie='m' recupererResultatJoueur={this.recupererResultatJoueur}></GraphiqueRapidite>
      <Ad></Ad>
      <div className='jeuVitesse marge20'>
        <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessedessin"] != null ? "dejaFaitCognito" : ""}`}>
          <Link to='/vitessedessin'> <div className="centre titreVitesse" >🖼️  Lignes brisées</div>
            <p className="marge20">But du jeu : Mémorise une ligne brisée puis reconstitue la ligne en cliquant sur les points présents. Le départ se fait toujours en haut à gauche. Tu ne peux sélectionner que des points adjacents. 20 points par dessin reconstitué.  </p>
          </Link>
          <p className='centre'>{this.state.resultatsJoueur["vitessedessin"] != null ? "Ton score : " + this.state.resultatsJoueur["vitessedessin"] : "Pas encore de résultat"}</p>
          <div className="centre"><Link to='/classement/vitessedessin'>Classement</Link></div>
        </div>


        <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitesseloup"] != null ? "dejaFaitCognito" : ""}`}>
          <Link to='/vitesseloup'> <div className="centre titreVitesse" >🐺  Attrape le loup</div>
            <p className="marge20">But du jeu : Mémorise le déplacement d'un loup sur une grille pour pouvoir le reproduire. Le but est de rejoindre le loup. Le loup démarre avec 4 secondes d'avance. +10 points si tu rattrapes le loup. 30 points de bonus si tu arrives au bout des 10 parties en moins de 110 s. </p>
          </Link>
          <p className='centre'>{this.state.resultatsJoueur["vitesseloup"] != null ? "Ton score : " + this.state.resultatsJoueur["vitesseloup"] : "Pas encore de résultat"}</p>
          <div className="centre"><Link to='/classement/vitesseloup'>Classement</Link></div>
        </div>

        <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessealz"] != null ? "dejaFaitCognito" : ""}`}>
          <Link to='/vitessealz'> <div className="centre titreVitesse" >🎗️  La mémoire longue</div>
            <p className="marge20">But du jeu : Se souvenir des mots affichés. À la différence des autres tests, on ne vous demande pas de vous souvenir de la liste de mots tout de suite, vous devez jouer à un petit jeu avant de restituer la liste. Ce jeu de mémoire est inspiré d'un test d'Alzheimer, le test des 5 mots, mais dans une version ludique. 7 points par mot, bonus de 50 points si vous trouvez les 12 mots. </p>
          </Link>
          <p className='centre'>{this.state.resultatsJoueur["vitessealz"] != null ? "Ton score : " + this.state.resultatsJoueur["vitessealz"] : "Pas encore de résultat"}</p>
          <div className="centre"><Link to='/classement/vitessealz'>Classement</Link></div>
        </div>


        <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessememory"] != null ? "dejaFaitCognito" : ""}`}>
          <Link to='/vitessememory'> <div className="centre titreVitesse" >🎩  Le jeu du memory</div>
            <p className="marge20">But du jeu : Trouver toutes les paires comme dans le classique jeu du Memory. Une différence avec le jeu classique : tu découvres les paires à ton rythme. Elles ne disparaissent pas au bout d'un certain temps. Le temps alloué est de 60 secondes pour tenter de trouver toutes les paires, un bonus de 30 points est alloué si tu finis le jeu.</p>
          </Link>
          <p className='centre'>{this.state.resultatsJoueur["vitessememory"] != null ? "Ton score : " + this.state.resultatsJoueur["vitessememory"] : "Pas encore de résultat"}</p>
          <div className="centre"><Link to='/classement/vitessememory'>Classement</Link></div>
        </div>


        <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessenombre"] != null ? "dejaFaitCognito" : ""}`}>
          <Link to='/vitessenombre'><div className="centre titreVitesse" >✅  Mémoire des nombres</div>

            <p className="marge20">But du jeu : Mémoriser une série de chiffres pour pouvoir la restituer plus tard. La suite de chiffres augmente à chaque fois d'un chiffre jusqu'à 8 ensuite elle redescend pour revenir à 1 chiffre. Chaque nombre trouvé rapporte 5 points. Si tu réussis à revenir à 1 chiffre en moins de 75 secondes tu obtiens un bonus de 50 points.</p>
          </Link>
          <p className='centre'>{this.state.resultatsJoueur["vitessenombre"] != null ? "Ton score : " + this.state.resultatsJoueur["vitessenombre"] : "Pas encore de résultat"}</p>

          <div className="centre"><Link to='/classement/vitessenombre'>Classement</Link></div>
        </div>

        <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitesseforme"] != null ? "dejaFaitCognito" : ""}`}>
          <Link to='/vitesseforme'><div className="centre titreVitesse" >🔺 Mémoire des formes</div>
            <p className="marge20">But du jeu : Se souvenir des formes et de la couleur des éléments présentés sur des cartes. Une fois les cartes mémorisées, elles sont retournées puis c'est à toi de les retrouver. Chaque bonne réponse rapporte 2 points puis 4 points, une mauvaise réponse te fait perdre 3 points. Le temps alloué est de 60 secondes.</p>
          </Link>
          <p className='centre'>{this.state.resultatsJoueur["vitesseforme"] != null ? "Ton score : " + this.state.resultatsJoueur["vitesseforme"] : "Pas encore de résultat"}</p>

          <div className="centre "><Link to='/classement/vitesseforme'>Classement</Link></div>
        </div>

        <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessememoire"] != null ? "dejaFaitCognito" : ""}`}>
          <Link to='/vitessememoire'> <div className="centre titreVitesse" >🔵 Se souvenir des cercles</div>

            <p className="marge20">But du jeu : On te montre un certain nombre de cercles dans une grille, tu dois mémoriser leurs emplacements et reproduire ce que tu viens de voir dans une nouvelle grille. Le temps alloué est de 90 secondes, chaque cercle trouvé rapporte 1 point, il n'y a pas de pénalité en cas d'erreur.</p>
          </Link>   <p className='centre'>{this.state.resultatsJoueur["vitessememoire"] != null ? "Ton score : " + this.state.resultatsJoueur["vitessememoire"] : "Pas encore de résultat"}</p>

          <div className="centre"><Link to='/classement/vitessememoire'>Classement</Link></div>
        </div>
        <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessepaire"] != null ? "dejaFaitCognito" : ""}`}>
          <Link to='/vitessepaire'>  <div className="centre titreVitesse">🐈‍⬛ L'animal précédent</div>

            <p className="marge20">But du jeu : On te montre une suite d'images d'animaux, tu dois indiquer si l'animal que tu as vu juste avant est le même que l'animal affiché. Tu as 30 secondes pour obtenir le meilleur score, +2 points par bonne réponse, -3 points par mauvaise réponse.</p>
          </Link>   <p className='centre'>{this.state.resultatsJoueur["vitessepaire"] != null ? "Ton score : " + this.state.resultatsJoueur["vitessepaire"] : "Pas encore de résultat"}</p>

          <div className="centre"><Link to='/classement/vitessepaire'>Classement</Link></div>
        </div>
      </div>
      <div>
        <h2>Des tests de mémoire gratuits en ligne, simples et rapides</h2>
        <p>
          Nos tests de mémoire gratuits en ligne sont spécialement pensés pour tous ceux qui souhaitent entretenir leur cerveau en douceur. Chaque exercice est court, facile à comprendre et peut être réalisé en quelques minutes seulement. C'est une manière agréable et rapide de stimuler la <strong>mémoire</strong> et la <strong>concentration</strong> au quotidien.
        </p>

        <h3>Des exercices variés pour faire travailler votre mémoire</h3>
        <p>
          Les jeux proposés sollicitent plusieurs formes de mémoire essentielles&nbsp;: mémoire visuelle, mémoire des chiffres, mémoire des mots ou encore mémoire de travail. Vous pouvez mémoriser des déplacements, retenir des listes, retrouver des formes ou repérer des positions dans une grille. Ces activités simples renforcent la capacité à rester concentré et à rappeler les informations plus facilement.
        </p>

        <h3>Une stimulation cognitive accessible à tous</h3>
        <p>
          Quelques minutes par jour suffisent pour garder l'esprit actif. Les tests sont rapides, bienveillants et ne demandent aucun prérequis. Ils conviennent parfaitement aux seniors qui souhaitent entretenir leur mémoire, améliorer leur concentration ou simplement prendre un moment pour stimuler leur cerveau de manière ludique.
        </p>

        <h3>Jouez gratuitement, sans inscription</h3>
        <p>
          Tous nos tests de mémoire sont entièrement gratuits et disponibles en ligne. Vous pouvez jouer à votre rythme, suivre vos scores et constater vos progrès au fil du temps. L'objectif n'est pas la performance, mais le plaisir de faire travailler votre mémoire dans un environnement simple et motivant.
        </p>

        <p>
          Ces exercices constituent une activité cognitive efficace, rapide et agréable pour garder l'esprit en forme jour après jour.
        </p>
      </div>

      <div className='autreVitesse centre'> <a href="/">Les autres catégories</a> </div>
    </div>
  }
}
import SousMenu from './SousMenu';
import React, { Component } from 'react';
import GraphiqueRapidite from '../commun/GraphiquesRapidité';
import Ad from '../commun/adSense';
import '../../style/jeux.css';
import { Link } from 'react-router-dom';


import { Helmet } from 'react-helmet';


export default class TesConcentration extends Component {

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
         <title>Tests de concentration</title>
            <meta name="description" content="Renforcez votre attention avec nos tests de concentration interactifs. Mesurez et améliorez votre capacité à rester concentré sur des tâches spécifiques grâce à des exercices stimulants conçus pour optimiser vos performances cognitives." />
            <link rel="alternate" hreflang="en" href="https://brain-games.evalquiz.com/concentration-games" />
<link rel="alternate" hreflang="fr" href="https://cerebral.evalquiz.com/test-concentration" />
<link rel="alternate" hreflang="x-default" href="https://cerebral.evalquiz.com/test-concentration" />
       
        </Helmet>

      <h1 className="titre couleurTitre centre">Les tests de concentration</h1>
    <p>Plongez dans nos jeux de concentration captivants et découvrez le plaisir de renforcer votre attention tout en vous amusant !</p>
    <GraphiqueRapidite categorie='r' recupererResultatJoueur={this.recupererResultatJoueur}></GraphiqueRapidite>
    <div className='jeuVitesse'>
    <div className="lienJeuRapidité presentationJeu marge20">
     <Link to='/vitessebonneteau'>   <div className="centre titreVitesse" >🎩 Le bonneteau</div>
       
          <p className="marge20">But du jeu : Retrouve la carte cachée après plusieurs permutations de 4 cartes. Tu as 90 secondes pour découvrir le maximum de cartes. Le score augmente en fonction du niveau.   </p>
        </Link>  <p className='centre'>{this.state.resultatsJoueur["vitessebonneteau"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessebonneteau"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessebonneteau'>Classement</Link></div>
      </div>
           

                <div className="lienJeuRapidité presentationJeu marge20">
     <Link to='/vitessecomplet'>   <div className="centre titreVitesse" >🧩 Pièce du puzzle</div>
       
          <p className="marge20">But du jeu : Retrouvez la bonne pièce du puzzle qui s'encastre parfaitement dans une autre pièce. Un bonus peut t'être accordé si tu réussis à trouver 10 pièces.   </p>
        </Link>  <p className='centre'>{this.state.resultatsJoueur["vitessecomplet"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessecomplet"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessecomplet'>Classement</Link></div>
      </div>
           

              
             
      <div className="lienJeuRapidité presentationJeu marge20">
       <Link to='/vitesserecensement'>  <div className="centre titreVitesse" >🔍 Le recensement</div>
 
          <p className="marge20">But du jeu : Une grille est affichée avec des symboles, il suffit de répondre aux questions concernant l'emplacement de certains symboles ou le nombre de symboles. Attention aux négations dans les questions. Le jeu dure 90 secondes. Une bonne réponse rapporte 5 points et une mauvaise te fait perdre 6 points.</p>
       </Link>   <p className='centre'>{this.state.resultatsJoueur["vitesserecensement"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitesserecensement"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitesserecensement'>Classement</Link></div>
      </div>


      <div className="lienJeuRapidité presentationJeu marge20">
      <Link to='/vitessematch'>  <div className="centre titreVitesse" >🐒  Former des paires</div>
         <p className="marge20">But du jeu : Un jeu très simple, reconstituer des paires à partir des éléments qui sont présents sur la page. Le temps alloué est de 60 secondes. Chaque paire trouvée rapporte 1 point. Des bonus te sont alloués à la fin de chaque tableau (5, 10 et 15 points).</p>
         <p className='centre'>{this.state.resultatsJoueur["vitessematch"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessematch"]:"Pas encore de résultat" }</p>
</Link>
        <div className="centre "><Link to='/classement/vitessematch'>Classement</Link></div>
      </div>


      
      <div className="lienJeuRapidité presentationJeu marge20">
       <Link to='/vitesseaddition'> <div className="centre titreVitesse" >⊕ L'addition XOR</div>
         <p className="marge20">But du jeu : Faire la somme de deux grilles dans une troisième grille. L'addition se fait case par case comme une addition normale sauf que si tu additionnes deux cases bleues le résultat est une case blanche. Le terme XOR (ou exclusif) désigne un opérateur logique en informatique. Si tu termines une grille tu gagnes 2 points par bonne réponse. Le temps alloué est de 90 secondes. </p>
      </Link>   <p className='centre'>{this.state.resultatsJoueur["vitesseaddition"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitesseaddition"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitesseaddition'>Classement</Link></div>
      </div>
    
  
      <div className="lienJeuRapidité presentationJeu marge20">
        <Link to='/vitesseburger'><div className="centre titreVitesse">🍔 Préparer des burgers</div>

        <p className="marge20">But du jeu : Créer des burger en plaçant les ingrédients de la recette dans l'ordre. Chaque burger créé rapporte 8 points. Le temps alloué pour obtenir le meilleur score est de 40 secondes.</p>
      </Link>  <p className='centre'>{this.state.resultatsJoueur["vitesseburger"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitesseburger"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitesseburger'>Classement</Link></div>
      </div>
     
    
   
      <div className="lienJeuRapidité presentationJeu marge20">
      <Link to='/vitessecouleur'>  <div className="centre titreVitesse">🎨 Reconnaitre les couleurs</div>
     
        <p className="marge20">But du jeu : Reconnaitre la couleur dans laquelle est écrit un mot. La difficulté provient du fait  que le mot affiché est une couleur.
          Par exemple si l'on écrit le mot "rouge" en vert. Le but est de reconnaitre la couleur verte et pas le mot rouge. Rassure-toi on comprend très vite en jouant. Tu as 40 s pour réaliser le meilleur score, tu gagnes un point par bonne réponse, chaque faute retranche 2 points à ton score.</p>
       </Link>   <p className='centre'>{this.state.resultatsJoueur["vitessecouleur"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessecouleur"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessecouleur'>Classement</Link></div>

      </div>
      <div className="lienJeuRapidité presentationJeu marge20">
       <Link to='/vitessesolitaire'> <div className="centre titreVitesse">🈂 La tuile solitaire</div>
      
        <p className="marge20">But du jeu : Retrouver la tuile solitaire parmi un ensemble de tuiles. Tu as 60 secondes pour réaliser le meilleur score, le score augmente par multiple de 2. La première tuile trouvée te donne 2 points, la seconde 4 points, etc...   </p>
      </Link>  <p className='centre'>{this.state.resultatsJoueur["vitessesolitaire"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessesolitaire"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessesolitaire'>Classement</Link></div>
      </div>

      <div className="lienJeuRapidité presentationJeu marge20">
      <Link to='/vitesseintrus'>  <div className="centre titreVitesse">👯 Repérer les différences</div>
     
        <p className="marge20">But du jeu : Repérer tous les intrus dans une grille de 3x3 c'est-à-dire toutes les images qui ne correspondent pas à l'image de référence. Tu as 60 secondes pour réaliser le meilleur score, +1 point par bonne réponse, -2 points par mauvaise réponse.</p>
      </Link>  <p className='centre'>{this.state.resultatsJoueur["vitesseintrus"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitesseintrus"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitesseintrus'>Classement</Link></div>
      </div>

      <div className="lienJeuRapidité presentationJeu marge20">
       <Link to='/vitesseordre'> <div className="centre titreVitesse">🔢 Remettre dans l'ordre</div>
     
        <p className="marge20">But du jeu : Remettre dans l'ordre des nombres entre 1 et 100. Tu as 60 secondes pour réaliser le meilleur score, tu gagnes un point si tu places un nombre dans le bon ordre.</p>
     </Link>   <p className='centre'>{this.state.resultatsJoueur["vitesseordre"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitesseordre"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitesseordre'>Classement</Link></div>
      </div>

    </div>
<Ad></Ad>
<h2>Les différents types de tests de rapidité et de concentration</h2>

<p>Les jeux de concentration sont un excellent moyen de stimuler votre esprit tout en vous divertissant. Ils sont conçus pour améliorer différentes facettes de votre attention et de vos capacités cognitives. Voici les principaux types de jeux de concentration que vous pouvez explorer :</p>

<p><b>Jeux de mémoire visuelle</b> :Ces jeux vous demandent de retenir et de rappeler des images, des séquences de formes ou des couleurs. Ils renforcent votre mémoire à court terme et votre capacité à vous concentrer sur des détails visuels précis.</p>
<p><b>Jeux de recherche visuelle</b> : Dans ces jeux, vous devez trouver des objets ou des différences cachés dans des images complexes. Ils testent votre attention aux détails et votre capacité à focaliser sur des éléments spécifiques au milieu de distractions.</p>
<p><b>Jeux de suivi de cibles</b> : Ici, vous devez suivre des objets en mouvement ou garder un œil sur une cible spécifique. Ces jeux améliorent votre vigilance et votre capacité à rester concentré sur une tâche précise malgré des distractions potentielles.</p>
<p><b>Jeux de résolution de puzzles</b> : Résoudre des puzzles, comme des sudokus ou des casse-têtes, nécessite une concentration soutenue et une pensée logique. Ces jeux stimulent votre capacité à rester concentré pendant une longue période et à penser de manière analytique.</p>
<p><b>Jeux d’attention partagée</b> : Ces jeux vous obligent à gérer plusieurs tâches en même temps, par exemple, surveiller deux choses à la fois ou répondre à des stimuli multiples. Ils développent votre capacité à diviser votre attention efficacement entre plusieurs sources d’information.</p>
<p><b>eux de réaction rapide</b> : Dans ces jeux, vous devez réagir rapidement à des changements ou des stimuli, comme appuyer sur un bouton dès qu'une lumière s'allume. Ils affinent votre réactivité et votre capacité à rester alerte.</p>
<p><b>Jeux de réflexion</b> : Des jeux comme les échecs ou les jeux de stratégie nécessitent une concentration intense pour anticiper les mouvements de l'adversaire et planifier vos actions. Ils développent votre capacité à rester concentré sur des objectifs à long terme.</p>
<p>Chaque type de jeu de concentration cible une compétence cognitive différente, ce qui vous permet de choisir ceux qui correspondent le mieux à vos besoins ou à vos envies du moment. Que vous cherchiez à renforcer votre attention aux détails, à améliorer votre mémoire, ou simplement à rester mentalement alerte, ces jeux offrent une façon amusante et efficace d'y parvenir.</p>
   
<div className='autreVitesse centre'> <a href="/">Les autres catégories</a> </div>

       </div>
  }
}
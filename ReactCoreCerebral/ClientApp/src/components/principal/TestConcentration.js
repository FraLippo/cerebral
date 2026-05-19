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
<link rel="alternate" hreflang="x-default" href="https://brain-games.evalquiz.com/concentration-games" />
       
        </Helmet>

      <h1 className="titre couleurTitre centre">Les tests de concentration</h1>
    <p className='centre'>Plongez dans nos jeux de concentration captivants et découvrez le plaisir de renforcer votre attention tout en vous amusant !</p>
    <GraphiqueRapidite categorie='r' recupererResultatJoueur={this.recupererResultatJoueur}></GraphiqueRapidite>
  <Ad></Ad>
    <div className='jeuVitesse'>

 <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessemulti"] != null ? "dejaFaitCognito" : ""}`}>
     <Link to='/vitessemulti'>   <div className="centre titreVitesse" >💻 Multitâche</div>
       
          <p className="marge20">But du jeu : être capable d'effectuer 2 actions en même temps. Tu dois suivre le déplacement d'un cercle avec le doigt ou la souris et répondre à des questions en même temps. Tu as besoin des 2 mains. Tu dois utiliser la barre d'espace (PC) ou taper sur le bandeau/bouton bleu (smartphone) pour indiquer si l'affirmation est fausse. 10 points par bonne réponse. On revient à 0 en cas d'erreur. Score maximum 110 points. </p>
        </Link> 
        
         <p className='centre'>{this.state.resultatsJoueur["vitessemulti"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessemulti"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessemulti'>Classement</Link></div>
      </div>


 <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessemah"] != null ? "dejaFaitCognito" : ""}`}>
     <Link to='/vitessemah'>   <div className="centre titreVitesse" >🀄 Le mahjong solitaire</div>
       
          <p className="marge20">But du jeu : Retrouver toutes les paires des tuiles du mahjong. Vous pouvez sélectionner une tuile s'il y a un espace disponible à gauche <b>ou</b> à droite. Si vous voyez que le jeu est bloqué (plus aucune paire n'est possible), vous pouvez changer de grille sans pénalité sauf si vous avez oublié des paires. </p>
        </Link> 
        
         <p className='centre'>{this.state.resultatsJoueur["vitessemah"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessemah"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessemah'>Classement</Link></div>
      </div>

                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessebinero"] != null ? "dejaFaitCognito" : ""}`}>
     <Link to='/vitessebinero'>   <div className="centre titreVitesse" >0️⃣ Le binero</div>
       
          <p className="marge20">But du jeu : Compléter une grille du jeu Binero. Le jeu est aussi connu sous le nom Takuzu ou Binoxxo. Il faut valider une grille pour obtenir des points, -10 points par grille non validée. Peut-on réussir plus de 72 points ?</p>
        </Link> 
        
        <p>Si tu ne connais pas le jeu, tu peux retrouver <Link to='/regles-binero'>l'ensemble des règles</Link> pour compléter les grilles.</p>
         <p className='centre'>{this.state.resultatsJoueur["vitessebinero"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessebinero"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessebinero'>Classement</Link></div>
      </div>




                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessebonneteau"] != null ? "dejaFaitCognito" : ""}`}>
     <Link to='/vitessebonneteau'>   <div className="centre titreVitesse" >🎩 Le bonneteau</div>
       
          <p className="marge20">But du jeu : Retrouve la carte cachée après plusieurs permutations de 4 cartes. Tu as 90 secondes pour découvrir le maximum de cartes. Le score augmente en fonction du niveau.   </p>
        </Link>  <p className='centre'>{this.state.resultatsJoueur["vitessebonneteau"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessebonneteau"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessebonneteau'>Classement</Link></div>
      </div>
           

                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessecomplet"] != null ? "dejaFaitCognito" : ""}`}>
     <Link to='/vitessecomplet'>   <div className="centre titreVitesse" >🧩 Pièce du puzzle</div>
       
          <p className="marge20">But du jeu : Retrouvez la bonne pièce du puzzle qui s'encastre parfaitement dans une autre pièce. Un bonus peut t'être accordé si tu réussis à trouver 10 pièces.   </p>
        </Link>  <p className='centre'>{this.state.resultatsJoueur["vitessecomplet"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessecomplet"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessecomplet'>Classement</Link></div>
      </div>
           

              
             
                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitesserecensement"] != null ? "dejaFaitCognito" : ""}`}>
       <Link to='/vitesserecensement'>  <div className="centre titreVitesse" >🔍 Le recensement</div>
 
          <p className="marge20">But du jeu : Une grille est affichée avec des symboles, il suffit de répondre aux questions concernant l'emplacement de certains symboles ou le nombre de symboles. Attention aux négations dans les questions. Le jeu dure 90 secondes. Une bonne réponse rapporte 5 points et une mauvaise te fait perdre 6 points.</p>
       </Link>   <p className='centre'>{this.state.resultatsJoueur["vitesserecensement"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitesserecensement"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitesserecensement'>Classement</Link></div>
      </div>


                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessematch"] != null ? "dejaFaitCognito" : ""}`}>
      <Link to='/vitessematch'>  <div className="centre titreVitesse" >🐒  Former des paires</div>
         <p className="marge20">But du jeu : Un jeu très simple, reconstituer des paires à partir des éléments qui sont présents sur la page. Le temps alloué est de 60 secondes. Chaque paire trouvée rapporte 1 point. Des bonus te sont alloués à la fin de chaque tableau (5, 10 et 15 points).</p>
         <p className='centre'>{this.state.resultatsJoueur["vitessematch"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessematch"]:"Pas encore de résultat" }</p>
</Link>
        <div className="centre "><Link to='/classement/vitessematch'>Classement</Link></div>
      </div>


      
                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitesseaddition"] != null ? "dejaFaitCognito" : ""}`}>
       <Link to='/vitesseaddition'> <div className="centre titreVitesse" >⊕ L'addition XOR</div>
         <p className="marge20">But du jeu : Faire la somme de deux grilles dans une troisième grille. L'addition se fait case par case comme une addition normale sauf que si tu additionnes deux cases bleues le résultat est une case blanche. Le terme XOR (ou exclusif) désigne un opérateur logique en informatique. Si tu termines une grille tu gagnes 2 points par bonne réponse. Le temps alloué est de 90 secondes. </p>
      </Link>   <p className='centre'>{this.state.resultatsJoueur["vitesseaddition"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitesseaddition"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitesseaddition'>Classement</Link></div>
      </div>
    
  
                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitesseburger"] != null ? "dejaFaitCognito" : ""}`}>
        <Link to='/vitesseburger'><div className="centre titreVitesse">🍔 Préparer des burgers</div>

        <p className="marge20">But du jeu : Créer des burger en plaçant les ingrédients de la recette dans l'ordre. Chaque burger créé rapporte 8 points. Le temps alloué pour obtenir le meilleur score est de 40 secondes.</p>
      </Link>  <p className='centre'>{this.state.resultatsJoueur["vitesseburger"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitesseburger"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitesseburger'>Classement</Link></div>
      </div>
     
    
   
                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessecouleur"] != null ? "dejaFaitCognito" : ""}`}>
      <Link to='/vitessecouleur'>  <div className="centre titreVitesse">🎨 Reconnaitre les couleurs</div>
     
        <p className="marge20">But du jeu : Reconnaitre la couleur dans laquelle est écrit un mot. La difficulté provient du fait  que le mot affiché est une couleur.
          Par exemple si l'on écrit le mot "rouge" en vert. Le but est de reconnaitre la couleur verte et pas le mot rouge. Rassure-toi on comprend très vite en jouant. Tu as 40 s pour réaliser le meilleur score, tu gagnes un point par bonne réponse, chaque faute retranche 2 points à ton score.</p>
       </Link>   <p className='centre'>{this.state.resultatsJoueur["vitessecouleur"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessecouleur"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessecouleur'>Classement</Link></div>

      </div>
                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessesolitaire"] != null ? "dejaFaitCognito" : ""}`}>
       <Link to='/vitessesolitaire'> <div className="centre titreVitesse">🈂 La tuile solitaire</div>
      
        <p className="marge20">But du jeu : Retrouver la tuile solitaire parmi un ensemble de tuiles. Tu as 60 secondes pour réaliser le meilleur score, le score augmente par multiple de 2. La première tuile trouvée te donne 2 points, la seconde 4 points, etc...   </p>
      </Link>  <p className='centre'>{this.state.resultatsJoueur["vitessesolitaire"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessesolitaire"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessesolitaire'>Classement</Link></div>
      </div>

                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitesseintrus"] != null ? "dejaFaitCognito" : ""}`}>
      <Link to='/vitesseintrus'>  <div className="centre titreVitesse">👯 Repérer les différences</div>
     
        <p className="marge20">But du jeu : Repérer tous les intrus dans une grille de 3x3 c'est-à-dire toutes les images qui ne correspondent pas à l'image de référence. Tu as 60 secondes pour réaliser le meilleur score, +1 point par bonne réponse, -2 points par mauvaise réponse.</p>
      </Link>  <p className='centre'>{this.state.resultatsJoueur["vitesseintrus"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitesseintrus"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitesseintrus'>Classement</Link></div>
      </div>

                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitesseordre"] != null ? "dejaFaitCognito" : ""}`}>
       <Link to='/vitesseordre'> <div className="centre titreVitesse">🔢 Remettre dans l'ordre</div>
     
        <p className="marge20">But du jeu : Remettre dans l'ordre des nombres entre 1 et 100. Tu as 60 secondes pour réaliser le meilleur score, tu gagnes un point si tu places un nombre dans le bon ordre.</p>
     </Link>   <p className='centre'>{this.state.resultatsJoueur["vitesseordre"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitesseordre"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitesseordre'>Classement</Link></div>
      </div>

    </div>

<div>
  <h2>Des tests de concentration gratuits en ligne pour enfants et adultes</h2>
  <p>
    Nos jeux de concentration gratuits en ligne sont conçus pour aider aussi bien les enfants que les adultes à améliorer leur <strong>attention</strong>, leur <strong>vigilance</strong> et leur <strong>capacité à rester focalisés</strong>. Ils sont rapides, ludiques et parfaits pour tous ceux qui souhaitent entraîner leur cerveau, que ce soit pour l'école, le travail ou simplement pour mieux se concentrer au quotidien.
  </p>

  <h3>Des jeux variés pour travailler toutes les formes d'attention</h3>
  <p>
    Les exercices proposés sur cette page sollicitent plusieurs types de concentration&nbsp;: suivre une cible en mouvement, repérer des différences, retrouver une carte cachée, résoudre un puzzle, compter des symboles, reconnaître des couleurs ou encore gérer deux tâches en même temps. Ces jeux sont idéaux pour les enfants qui ont du mal à rester attentifs, mais aussi pour les adultes qui souhaitent renforcer leur capacité à se concentrer malgré les distractions.
  </p>

  <h3>Une aide pour les problèmes d'attention</h3>
  <p>
    Les difficultés de concentration sont fréquentes&nbsp;: fatigue, stress, surcharge mentale, écrans, multitâche… Ces tests permettent de travailler l'attention de manière progressive et amusante. Ils aident à améliorer la <strong>focalisation</strong>, la <strong>mémoire visuelle</strong>, la <strong>réactivité</strong> et la <strong>gestion des distractions</strong>.
  </p>

  <h3>Convient aux enfants, adolescents et adultes</h3>
  <p>
    Les enfants y trouvent des jeux simples et motivants pour renforcer leur attention. Les adolescents peuvent s'entraîner pour améliorer leurs performances scolaires. Les adultes, eux, utilisent ces exercices pour garder un esprit vif, rester concentrés au travail ou compenser un manque d'attention lié au stress ou à la fatigue.
  </p>

  <h3>Gratuit, en ligne et sans inscription</h3>
  <p>
    Tous les tests de concentration sont entièrement <strong>gratuits</strong> et accessibles directement en ligne. Aucun compte n'est nécessaire&nbsp;: il suffit de lancer un jeu et de se laisser guider. Chaque exercice est court, ce qui permet de s'entraîner quelques minutes par jour et de constater ses progrès grâce au score et au classement du mois.
  </p>

  <p>
    Que tu sois un enfant, un parent, un étudiant ou un adulte, ces jeux de concentration t'aideront à améliorer ton attention, ta précision et ta capacité à rester focalisé dans un monde rempli de distractions.
  </p>
</div>
 
<div className='autreVitesse centre'> <a href="/">Les autres catégories</a> </div>

       </div>
  }
}
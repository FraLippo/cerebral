import GraphiqueRapidite from '../commun/GraphiquesRapidité';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Ad from '../commun/adSense';
import '../../style/jeux.css';


import { Helmet } from 'react-helmet';


export default class TestCulture extends Component {

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
            <title>Tests divers sur la culture (musique, langue, code de la route)</title>
            <meta name="description" content="Teste tes compétences pratiques avec des tests interactifs variés sur la musique, le code de la route ou les langues étrangères." />
            <link rel="alternate" hreflang="en" href="https://brain-games.evalquiz.com/culture-games" />
<link rel="alternate" hreflang="fr" href="https://cerebral.evalquiz.com/test-culture" />
<link rel="alternate" hreflang="x-default" href="https://cerebral.evalquiz.com/test-culture" />
</Helmet>
  
      <h1 className="titre couleurTitre centre">Tests divers sur la culture</h1>
      <p className='centre'>Teste et améliore tes compétences pratiques avec nos exercices interactifs variés sur la culture générale. </p>
      <GraphiqueRapidite categorie='d' recupererResultatJoueur={this.recupererResultatJoueur}></GraphiqueRapidite>
      <Ad></Ad>
      <div className='jeuVitesse marge20'>
        <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessetetris"] != null ? "dejaFaitCognito" : ""}`}>
           <Link to='/vitessetetris'>   <div className="centre titreVitesse" >🏛️ Tetris Musée</div>
   
          <p className="marge20">Dans ce jeu, tu dois reconstituer une image à partir des fragments d'image qui tombent du haut de l'écran. Le principe est le même que le jeu Tetris. Sur PC, il faut utiliser les touches directionnelles pour déplacer les pièces. Sur smartphone, on déplace les pièces en glissant le doigt vers la gauche ou la droite sur l'espace de jeu, un appui sur l'écran (tap) fait tomber l'image plus vite. Le score maximum est de 100 (2 x 25 + 50).   </p>
     </Link>
     <p className='centre'>{this.state.resultatsJoueur["vitessetetris"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessetetris"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessetetris'>Classement</Link></div>
    </div>
                    <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessebar"] != null ? "dejaFaitCognito" : ""}`}>
           <Link to='/vitessebar'>   <div className="centre titreVitesse" >🥁 Boite à rythmes</div>
   
          <p className="marge20">La grille de séquence d'une boîte à rythmes est affichée à l'écran. Pour gagner, tu dois reproduire fidèlement le motif rythmique en appuyant sur les bons boutons au bon moment : kick (grosse caisse), snare (caisse claire) et hi-hat (charleston). Chaque grille complétée rapporte 20 points. +30 pour 4 grilles réussies. La précision est essentielle : pour que cela sonne comme de la musique, aucun décalage n'est permis… la musique ne pardonne pas l'approximation, contrairement à notre jeu 😉. </p>
     </Link>
     <p className='centre'>{this.state.resultatsJoueur["vitessebar"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessebar"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessebar'>Classement</Link></div>
    </div>
              
                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessepanneauroutier"] != null ? "dejaFaitCognito" : ""}`}>
           <Link to='/vitessepanneauroutier'>   <div className="centre titreVitesse" >🚦Le code de la route</div>
   
          <p className="marge20">But du jeu : Une grille est affichée avec des panneaux routiers, il suffit de retrouver le panneau routier indiqué par la question. Tu as 120 secondes pour essayer de trouver tous les panneaux. Tu gagnes 2 points par panneau trouvé, -4 points en cas d'erreur. Si tu termines la grille, bonus de 20 points ! Le maximum est de (36 x 2) + 20 = 92 points. </p>
     </Link>
     <p className='centre'>{this.state.resultatsJoueur["vitessepanneauroutier"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessepanneauroutier"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessepanneauroutier'>Classement</Link></div>
    </div>
                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitesselangue"] != null ? "dejaFaitCognito" : ""}`}>
   <Link to='/vitesselangue'> <div className="centre titreVitesse" >👋 La politesse</div>   
        <p className="marge20">But du jeu : Identifier 5 mots de politesse dans différentes langues. Clique sur le lecteur (le triangle) pour démarrer l'audio s'il ne commence pas automatiquement. Tu as 80 secondes pour essayer de trouver 10 mots. Tu gagnes 9 points par mot trouvé, -3 points en cas d'erreur. </p>
     </Link> 
     <p>Tu peux consulter tous les mots de politesse du jeu sur cette <Link to='/politesse-langues'>page</Link>.</p> 
     <p className='centre'>{this.state.resultatsJoueur["vitesselangue"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitesselangue"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitesselangue'>Classement</Link></div>
    </div>
                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitesseecrire"] != null ? "dejaFaitCognito" : ""}`}>
   <Link to='/vitesseecrire'> <div className="centre titreVitesse" >📠 La dactylographie</div>   
        <p className="marge20">But du jeu : Taper une série de mots le plus vite possible au clavier. Le temps alloué est de 30 secondes pour 19 mots. Chaque mot correctement saisi augmente votre score de 3 points, il n'y a pas de pénalité si tu ne tapes pas la bonne lettre. Si tu réussis à écrire les 19 mots tu obtiens un bonus de 50 points !
       </p>
     </Link>  
     <p>  Tu peux consulter ce <a target='_blank' style={{all: 'revert'}} href="https://fr.wikihow.com/apprendre-la-dactylographie">wiki</a> si tu désires améliorer ta cadence de frappe.</p>
     <p className='centre'>{this.state.resultatsJoueur["vitesseecrire"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitesseecrire"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitesseecrire'>Classement</Link></div>
    </div>
                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessenotes"] != null ? "dejaFaitCognito" : ""}`}>
    <Link to='/vitessenotes'><div className="centre titreVitesse" >♬ L'oreille musicale</div>
   
        <p className="marge20">But du jeu : Retrouver une note inconnue. L'ordinateur joue une note inconnue représentée par un point d'interrogation. Tu dois retrouver à quelle note elle correspond, simplement avec ton oreille. Tu peux réécouter les notes autant de fois que tu le désires. Tu n'as pas besoin de connaissance musicale pour jouer, seule ton oreille est mise à contribution. Tout le monde a la capacité de reconnaitre les notes par contre certains doivent s'entrainer plus que d'autres.  Chaque note trouvée rapporte 7 points. Le temps alloué est de 90 secondes.</p>
        </Link>
        <p className='centre'>{this.state.resultatsJoueur["vitessenotes"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessenotes"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessenotes'>Classement</Link></div>
   
    </div>
      </div> 
     <div>
  <h2 className="couleurTitre">Entraînez votre cerveau avec nos mini-jeux de culture et de logique</h2>

  <p>
    Envie de stimuler votre cerveau quelques minutes par jour ? Cette page rassemble plusieurs mini-jeux rapides et accessibles qui font travailler la mémoire, la logique, la perception, la concentration et la culture générale. Chaque jeu est court, ludique et idéal pour progresser à votre rythme.
  </p>

  <h3>Tetris Musée - Reconstituez un tableau célèbre</h3>
  <p>
    Assemblez les fragments qui tombent pour reformer une œuvre d'art. Ce jeu entraîne la <strong>perception visuelle</strong>, la <strong>mémoire spatiale</strong> et la <strong>concentration</strong>, tout en vous faisant découvrir ou redécouvrir des tableaux célèbres.
  </p>

  <h3>Reconnaissance des notes musicales</h3>
  <p>
    Écoutez une note et choisissez la bonne parmi plusieurs propositions. Vous améliorez ainsi votre <strong>oreille musicale</strong>, votre <strong>mémoire auditive</strong> et votre <strong>attention aux détails</strong>.
  </p>

  <h3>Test de dactylographie</h3>
  <p>
    Tapez une série de mots le plus vite possible. Ce test est parfait pour développer votre <strong>rapidité de frappe</strong>, votre <strong>précision au clavier</strong> et votre <strong>coordination</strong>.
  </p>

  <h3>Test du code de la route</h3>
  <p>
    Retrouvez un maximum de panneaux routiers en un temps limité. Vous révisez vos connaissances tout en travaillant votre <strong>reconnaissance visuelle rapide</strong> et vos <strong>réflexes</strong>.
  </p>

  <h3>Mots de politesse en langues étrangères</h3>
  <p> Écoutez un mot de politesse et choisissez sa signification. Ce jeu renforce votre <strong>culture générale</strong>, votre <strong>mémoire auditive</strong> et votre curiosité pour les langues.
  </p>

  <h3>Boîte à rythmes</h3>
  <p>Reproduisez un motif rythmique en appuyant au bon moment. Vous entraînez votre <strong>coordination</strong>, votre <strong>précision</strong> et votre <strong>sens du rythme</strong>.
  </p>

  <h2>Les bénéfices de ces jeux cérébraux</h2>
  <p>
    En jouant régulièrement à ces mini-jeux, vous pouvez&nbsp;:
  </p>
  <ul>
    <li>stimuler votre <strong>mémoire</strong> et votre <strong>concentration</strong> ;</li>
    <li>améliorer votre <strong>rapidité de réflexion</strong> ;</li>
    <li>développer votre <strong>logique</strong> et votre <strong>perception visuelle</strong> ;</li>
    <li>entretenir vos <strong>capacités cognitives</strong> au quotidien ;</li>
    <li>apprendre et réviser en vous amusant, sans pression.</li>
  </ul>

  <p>
    Chaque jeu est gratuit, simple d'accès et idéal pour une pause intelligente. Jouez,
    comparez vos scores et suivez vos progrès mois après mois.
  </p>
</div>

       <div className='autreVitesse centre'> <a href="/">Les autres catégories</a> </div>
       </div>
  }
}
import GraphiqueRapidite from '../commun/GraphiquesRapidité';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Ad from '../commun/adSense';
import '../../style/jeux.css';
import genmots from '../../images/genmots.png'



import { Helmet } from 'react-helmet';


export default class TestLettres extends Component {

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
            <title>Jeux de mots gratuits</title>
            <meta name="description" content="Découvrez une collection de jeux captivants pour tester et améliorer votre habileté avec les mots et affiner vos compétences verbales."></meta>
            <link rel="alternate" hreflang="en" href="https://brain-games.evalquiz.com/words-games" />
<link rel="alternate" hreflang="fr" href="https://cerebral.evalquiz.com/test-lettres" />
<link rel="alternate" hreflang="x-default" href="https://cerebral.evalquiz.com/test-lettres" />
       
       
            </Helmet>
  
      <h1 className="titre couleurTitre centre">Jouer avec les mots</h1>
      <p>Découvrez notre série de jeux de mots fascinants et stimulants pour mettre à l'épreuve votre vocabulaire, améliorer votre agilité verbale et vous amuser tout en enrichissant votre langue ! </p>
      <GraphiqueRapidite categorie='l' recupererResultatJoueur={this.recupererResultatJoueur}></GraphiqueRapidite>
      <Ad></Ad>
      <div className='jeuVitesse marge20'>

                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessemotus"] != null ? "dejaFaitCognito" : ""}`}>
      <Link to='/vitessemotus'><div className="centre titreVitesse" >Ⓜ️ Motus</div>
      <p className="marge20">But du jeu : Retrouver le mot caché en remettant les lettres dans l'ordre, ce jeu est inspiré de Motus, Wordle ou Tusmo. Les lettres bleues sont bien placées, les lettres dans les cercles rouges sont mal placées. Il suffit de cliquer sur les lettres pour les remettre dans l'ordre. Le niveau de difficulté est très variable suivant les mots, la difficulté n'augmente pas.  </p>
     </Link>
     <p className='centre'>{this.state.resultatsJoueur["vitessemotus"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessemotus"]:"Pas encore de résultat" }</p>

      <div className="centre"><Link to='/classement/vitessemotus'>Classement</Link></div>
    </div>


                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessecoupe"] != null ? "dejaFaitCognito" : ""}`}>
      <Link to='/vitessecoupe'><div className="centre titreVitesse" >✂️ Les mots coupés</div>
      <p className="marge20">But du jeu : Le classique jeu des mots coupés où il faut reconstituer les mots qui sont coupés en plusieurs syllabes. Vous avez 100 s pour reconstituer le plus grand nombre de mots. +4 points par bonne réponse, -2 par mauvaise réponse. Attention, nous ne validons pas tous les mots, même ceux qui sont correctes grammaticalement, il faut trouver le mot attendu.  </p>
     </Link>
     <p className='centre'>{this.state.resultatsJoueur["vitessecoupe"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessecoupe"]:"Pas encore de résultat" }</p>

      <div className="centre"><Link to='/classement/vitessecoupe'>Classement</Link></div>
    </div>


                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessechasse"] != null ? "dejaFaitCognito" : ""}`}>
      <Link to='/vitessechasse'><div className="centre titreVitesse" >📯 La chasse aux mots</div>
      <p className="marge20">But du jeu : Trouver des mots à partir des lettres disséminées dans une grille. Terminer une grille rapporte un bonus de 30 points. Plus le mot est long, plus tu gagnes de points. Le temps alloué est de 90 secondes. </p>
     </Link>
     <p className='centre'>{this.state.resultatsJoueur["vitessechasse"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessechasse"]:"Pas encore de résultat" }</p>

      <div className="centre"><Link to='/classement/vitessechasse'>Classement</Link></div>
    </div>
                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitesselettres"] != null ? "dejaFaitCognito" : ""}`}>
      <Link to='/vitesselettres'><div className="centre titreVitesse" >✍ Les lettres manquantes</div>
      <p className="marge20">But du jeu : Retrouver les lettres manquantes dans les mots. Les lettres sont cachées sous des carrés de couleur. L'ordre pour retrouver les lettres associées aux couleurs est toujours le même : bleu, rouge et jaune. Chaque bonne réponse rapporte 3 point puis 4 points quand il y a 2 lettres à retrouver. Chaque mauvaise réponse te fait perdre 1 point, le fait de passer te coûte 2 points. Le temps alloué est de 80 secondes. </p>
     </Link>
     <p className='centre'>{this.state.resultatsJoueur["vitesselettres"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitesselettres"]:"Pas encore de résultat" }</p>

      <div className="centre"><Link to='/classement/vitesselettres'>Classement</Link></div>
    </div>

                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitessecercle"] != null ? "dejaFaitCognito" : ""}`}>
    <Link to='/vitessecercle'>  <div className="centre titreVitesse" >⭕  Cercles de mots</div>
        <p className="marge20">But du jeu : Retrouver des mots de 8 lettres à partir de lettres mélangées. Les lettres du mot sont placées autour d'un cercle. Tu dois indiquer la première lettre du mot puis un sens de rotation pour retrouver le mot caché. Chaque mot trouvé rapporte 10 points, -10 en cas d'erreur. Si tu trouves les 6 mots en moins de 55 secondes tu as un bonus de 50 points. Le score maximal est donc de (6 x 10) + 50 = 110.  </p>
   </Link>
   <p className='centre'>{this.state.resultatsJoueur["vitessecercle"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessecercle"]:"Pas encore de résultat" }</p>

      <div className="centre"><Link to='/classement/vitessecercle'>Classement</Link></div>
    </div>
                <div className={`lienJeuRapidité presentationJeu marge20 + ${this.state.resultatsJoueur["vitesseboogle"] != null ? "dejaFaitCognito" : ""}`}>
      <Link to='/vitesseboogle'> <div className="centre titreVitesse" >🖋️ Le Boogle</div>
        <p className="marge20">But du jeu : Créer des mots à partir de lettres. La lettre centrale est obligatoire dans les mots. Les mots acceptés sont ceux du Scrabble. Il faut créer des mots de plus de 3 lettres. Les points sont doublés pour les mots les plus longs. Si tu trouves 9 mots en moins de 90 s, tu obtiens un bonus de 40 points. </p>
   </Link>
   <p className='centre'>{this.state.resultatsJoueur["vitesseboogle"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitesseboogle"]:"Pas encore de résultat" }</p>

      <div className="centre"><Link to='/classement/vitesseboogle'>Classement</Link></div>
    </div>
      </div> 
<h2>Nos autres jeux de mots</h2>
<p>Vous aimez les jeux de mots et de lettres ? N'hésitez pas à essayer nos jeux sur les mots et les lettres quotidiens. Un nouveau défi chaque jour !</p>
            <div className='plateauCategorie'>
        <a href='https://concours.evalquiz.com/pres-jeux-du-jour'>   <div className='categorieVitesse'>
    <div className='titreCategorie'>Jeux de mots quotidiens</div>
    <div className='imageCategorie'><img src={genmots} alt="jeux de lettres quotidiens"></img></div>
        </div>
        </a>
      </div>
 
 <h2>Les jeux de mots</h2>
  <p>Les jeux sur les mots ne sont pas seulement divertissants, ils offrent également de nombreux avantages cognitifs et éducatifs. En engageant votre esprit dans des activités ludiques telles que les mots croisés, les anagrammes et les jeux de mots, vous stimulez plusieurs aspects de votre intelligence linguistique et cognitive.</p>

<p><b>Enrichissement du vocabulaire</b> : En jouant avec les mots, vous découvrez de nouveaux termes et expressions, ce qui enrichit votre vocabulaire et améliore votre compréhension de la langue.</p>

<p><b>Amélioration de la mémoire</b> : Les jeux de mots requièrent souvent de se souvenir de définitions, de règles et de structures, ce qui contribue à renforcer votre mémoire à court terme et votre mémoire de travail.</p>

<p><b>Développement de la flexibilité cognitive</b> : Manipuler les mots et les lettres pour résoudre des puzzles améliore votre capacité à penser de manière créative et flexible, en cherchant des solutions alternatives et en explorant différentes associations.</p>

<p><b>Stimulation mentale</b> : Ces jeux sollicitent votre esprit, vous poussant à réfléchir de manière critique et analytique, ce qui peut aider à maintenir votre cerveau actif et en bonne santé, particulièrement à mesure que vous vieillissez.</p>

<p><b>Amélioration des compétences en communication</b> : Une meilleure compréhension des mots et une utilisation plus précise du langage peuvent améliorer vos compétences en communication écrite et orale, vous permettant de vous exprimer plus clairement et efficacement.</p>

<p><b>Réduction du stress</b> : Les jeux sur les mots offrent un moyen agréable de se détendre et de s’évader, en vous concentrant sur des défis amusants qui détournent votre esprit des préoccupations quotidiennes.</p>
              
     
       <div className='autreVitesse centre'> <a href="/">Les autres catégories</a> </div>

       </div>
  }
}
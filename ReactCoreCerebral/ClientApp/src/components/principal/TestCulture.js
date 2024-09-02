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
            <title>Tests divers de culture</title>
            <meta name="description" content="Améliorez vos compétences pratiques avec des tests interactifs de reconnaissance des notes musicales, de dactylographie, et de code de la route." />

</Helmet>
  
      <h1 className="titre couleurTitre centre">Tests divers sur la culture</h1>
      <p>Testez et améliorez vos compétences pratiques avec nos exercices interactifs de reconnaissance des notes musicales, de dactylographie, et de code de la route. </p>
      <GraphiqueRapidite categorie='d' recupererResultatJoueur={this.recupererResultatJoueur}></GraphiqueRapidite>
      <div className='jeuVitesse marge20'>
              
              <div className="lienJeuRapidité presentationJeu marge20">
           <Link to='/vitessepanneauroutier'>   <div className="centre titreVitesse" >🚦Le code de la route</div>
   
          <p className="marge20">But du jeu : Une grille est affichée avec des panneaux routiers, il suffit de retrouver le panneau routier indiqué par la question. Tu as 120 secondes pour essayer de trouver tous les panneaux. Tu gagnes 2 points par panneau trouvé, -4 points en cas d'erreur. Si tu termines la grille, bonus de 20 points ! Le maximum est de (36 x 2) + 20 = 92 points. </p>
     </Link>
     <p className='centre'>{this.state.resultatsJoueur["vitessepanneauroutier"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessepanneauroutier"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessepanneauroutier'>Classement</Link></div>
    </div>

    <div className="lienJeuRapidité presentationJeu marge20">
   <Link to='/vitesseecrire'> <div className="centre titreVitesse" >📠 La dactylographie</div>   
        <p className="marge20">But du jeu : Taper une série de mots le plus vite possible au clavier. Le temps alloué est de 30 secondes pour 19 mots. Chaque mot correctement saisi augmente votre score de 3 points, il n'y a pas de pénalité si tu ne tapes pas la bonne lettre. Si tu réussis à écrire les 19 mots tu obtiens un bonus de 50 points !
        Tu peux consulter ce <a target='_blank' style={{all: 'revert'}} href="https://fr.wikihow.com/apprendre-la-dactylographie">wiki</a> si tu désires améliorer ta cadence de frappe. </p>
     </Link>  
     <p className='centre'>{this.state.resultatsJoueur["vitesseecrire"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitesseecrire"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitesseecrire'>Classement</Link></div>
    </div>
    <div className="lienJeuRapidité presentationJeu marge20">
    <Link to='/vitessenotes'><div className="centre titreVitesse" >♬ L'oreille musicale</div>
   
        <p className="marge20">But du jeu : Retrouver une note inconnue. L'ordinateur joue une note inconnue représentée par un point d'interrogation. Tu dois retrouver à quelle note elle correspond, simplement avec ton oreille. Tu peux réécouter les notes autant de fois que tu le désires. Tu n'as pas besoin de connaissance musicale pour jouer, seule ton oreille est mise à contribution. Tout le monde a la capacité de reconnaitre les notes par contre certains doivent s'entrainer plus que d'autres.  Chaque note trouvée rapporte 7 points. Le temps alloué est de 90 secondes.</p>
        </Link>
        <p className='centre'>{this.state.resultatsJoueur["vitessenotes"] != null ? "Ton score : " +  this.state.resultatsJoueur["vitessenotes"]:"Pas encore de résultat" }</p>

        <div className="centre"><Link to='/classement/vitessenotes'>Classement</Link></div>
   
    </div>
      </div> 
      <p>Les tests que nous proposons couvrent des compétences pratiques essentielles et variées, allant de la reconnaissance des notes musicales à la maîtrise de la dactylographie, en passant par les connaissances du code de la route.</p>

<p><b>Test de reconnaissance de notes musicales</b> : Ce test est conçu pour évaluer et améliorer votre capacité à identifier les notes.</p>
<p><b>Test de dactylographie</b> : La vitesse et la précision au clavier sont au cœur de ce test qui vise à améliorer vos compétences en dactylographie. Que vous cherchiez à taper plus rapidement ou à perfectionner votre technique, cet exercice est fait pour vous.</p>
<p><b>Test du code de la route</b> : Idéal pour tester si vos connaissances sur le code de la route sont toujours à jour.
<p></p>Ces tests variés vous permettent de développer des compétences pratiques et utiles au quotidien, tout en vous offrant un moyen interactif et engageant d’évaluer vos progrès. Que ce soit pour la musique, la dactylographie ou la conduite, vous trouverez ici de quoi vous entraîner et vous perfectionner.</p>
       <Ad></Ad>       

       <div className='autreVitesse centre'> <a href="/">Les autres catégories</a> </div>
       </div>
  }
}
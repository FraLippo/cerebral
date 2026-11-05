import { Link } from 'react-router-dom';
import { Component } from 'react';
import GraphiqueRapidite from '../commun/GraphiquesRapidité';
import Ad from '../commun/adSense';
import '../../style/jeux.css';


import { Helmet } from 'react-helmet';
import { listeJeuxPlanification } from '../commun/dataListeJeux';
import Regles from '../commun/Regles';


export default class TestPlanification extends Component {

  constructor()
  {
    super();
    this.prenom = '';
    this.state =
    {
        resultatsJoueur : [],
        jeuReglesOuvert: null,
       
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
            <title>Tests de logique</title>
            <meta name="description" content="Découvrez nos tests de logique conçus pour évaluer et améliorer vos compétences en organisation et en gestion du temps. Testez votre capacité à planifier, anticiper et résoudre des problèmes complexes avec nos tests interactifs." />     
            <link rel="alternate" hreflang="en" href="https://brain-games.evalquiz.com/planning-games" />
<link rel="alternate" hreflang="fr" href="https://cerebral.evalquiz.com/test-planification" />
<link rel="alternate" hreflang="x-default" href="https://brain-games.evalquiz.com/planning-games" />
               </Helmet>
<div className="hero-small">
                <img
                    src="/pres/logique.webp"
                    alt=""
                    className="hero-image"
                />

                <div className="hero-content">
                    <h1>Développez votre logique</h1>
                    <p>Exercez votre capacité d'analyse et<br/>votre raisonnement grâce à nos défis cognitifs.</p>
                </div>
            </div>
        <GraphiqueRapidite categorie='p' recupererResultatJoueur={this.recupererResultatJoueur}></GraphiqueRapidite>
        <div className='centre'> <div className='fontMoyenne bandeauLien'>Rejoins-nous sur <a href="https://discord.gg/hyGc2PD5T6">Discord</a></div>
        </div> <p>Discord est une messagerie comme WhatsApp, trés utilisé dans le monde des jeux vidéo.</p>

    <Ad></Ad>
      <div className="jeuVitesse marge20">
        {listeJeuxPlanification.map((info) => (
          <div
            className={`carte-jeu ${this.state.resultatsJoueur[info.nom] != null ? "dejaFaitCognito" : ""}`}
            key={info.nom}
          >
            <Link to={`/${info.nom}`}>
              <div className="jeu-emoji">{info.emoji}</div>
              <h3>{info.titre}</h3>
              <p className="jeu-benefice">{info.sousTitre}</p>
            </Link>
            {info.lienComplementaire && (
              <p>
                {info.lienComplementaire.avant}
                {info.lienComplementaire.externe ? (
                  <a
                    href={info.lienComplementaire.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ all: 'revert' }}
                  >
                    {info.lienComplementaire.texte}
                  </a>
                ) : (
                  <Link to={info.lienComplementaire.url}>{info.lienComplementaire.texte}</Link>
                )}
                {info.lienComplementaire.apres}
              </p>
            )}
            <div className="jeu-infos">
              <p className="centre">
                {this.state.resultatsJoueur[info.nom] != null
                  ? "Ton score : " + this.state.resultatsJoueur[info.nom]
                  : "📊 Pas encore de résultat"}
              </p>
              <div className="centre fontMoyenne">
                <Link to={`/classement/${info.nom}`}>🏆 Classement</Link>
              </div>
            </div>
            <button
              className="btn-regles"
              onClick={() => this.setState({ jeuReglesOuvert: info })}
            >
              Voir les règles
            </button>
          </div>
        ))}
      </div>
      <Regles
        jeu={this.state.jeuReglesOuvert?.description}
        open={this.state.jeuReglesOuvert !== null}
        onClose={() => this.setState({ jeuReglesOuvert: null })}
      />
<h2>Pourquoi pratiquer des jeux de logique ?</h2>
      <p>Les exercices de logique entraînent votre esprit à analyser, comparer et déduire. Ils vous invitent à rechercher des indices, établir des liens pertinents et construire des raisonnements cohérents. Une pratique régulière contribue à développer votre agilité intellectuelle et votre capacité à résoudre efficacement de nouveaux problèmes.</p>
<h2>Les bénéfices des jeux de logique au quotidien</h2>
<ul>
<li>Gérer plus facilement des situations complexes comportant de nombreuses informations.</li>
<li>Développer sa capacité à résoudre des problèmes inattendus.</li>
<li>Améliorer sa capacité à anticiper les conséquences de ses actions.</li>
<li>Comprendre plus rapidement les règles d'un nouveau jeu ou d'un nouveau logiciel.</li>
<li>Trouver des solutions créatives face à un défi.</li>
<li>Décomposer un problème complexe en étapes plus simples.</li>
</ul>
     <div className='autreVitesse centre'> <a href="/">Les autres catégories</a> </div>

      </div>
  }
}
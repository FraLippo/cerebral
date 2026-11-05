import { Component } from 'react';
import GraphiqueRapidite from '../commun/GraphiquesRapidité';
import Ad from '../commun/adSense';
import '../../style/jeux.css';
import { Link } from 'react-router-dom';


import { Helmet } from 'react-helmet';
import { listeJeuxConcentration } from '../commun/dataListeJeux';
import Regles from '../commun/Regles';


export default class TesConcentration extends Component {

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
         <title>Tests de concentration</title>
            <meta name="description" content="Renforcez votre attention avec nos tests de concentration interactifs. Mesurez et améliorez votre capacité à rester concentré sur des tâches spécifiques grâce à des exercices stimulants conçus pour optimiser vos performances cognitives." />
            <link rel="alternate" hreflang="en" href="https://brain-games.evalquiz.com/concentration-games" />
<link rel="alternate" hreflang="fr" href="https://cerebral.evalquiz.com/test-concentration" />
<link rel="alternate" hreflang="x-default" href="https://brain-games.evalquiz.com/concentration-games" />
       
        </Helmet>
 <div className="hero-small">
                <img
                    src="/pres/concentration.webp"
                    alt=""
                    className="hero-image"
                />

                <div className="hero-content">
                    <h1>Entraînez votre concentration</h1>
                    <p>Des entraînements cognitifs conçus <br/>pour améliorer votre capacité de concentration.</p>
                </div>
            </div>
         <GraphiqueRapidite categorie='r' recupererResultatJoueur={this.recupererResultatJoueur}></GraphiqueRapidite>
        <div className='centre'> <div className='fontMoyenne bandeauLien'>Rejoins-nous sur <a href="https://discord.gg/hyGc2PD5T6">Discord</a></div>
        </div> <p>Discord est une messagerie comme WhatsApp, trés utilisé dans le monde des jeux vidéo.</p>

    <Ad></Ad>
      <div className="jeuVitesse">
        {listeJeuxConcentration.map((info) => (
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
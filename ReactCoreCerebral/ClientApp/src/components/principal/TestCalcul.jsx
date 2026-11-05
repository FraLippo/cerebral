import { Link } from 'react-router-dom';
import { Component } from 'react';
import GraphiqueRapidite from '../commun/GraphiquesRapidité';
import Ad from '../commun/adSense';
import '../../style/jeux.css';


import { Helmet } from 'react-helmet';
import { listeJeuxCalcul } from '../commun/dataListeJeux';
import Regles from '../commun/Regles';


export default class TestCalcul extends Component {

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
            <title>Tests de calcul mental</title>
            <meta name="description" content="Améliorez vos compétences en calcul mental avec nos tests interactifs. Évaluez votre rapidité et précision en mathématiques à travers une série d'exercices stimulants conçus pour affiner votre agilité numérique et renforcer vos capacités cognitives." />
            <link rel="alternate" hreflang="en" href="https://brain-games.evalquiz.com/arithmetic-games" />
<link rel="alternate" hreflang="fr" href="https://cerebral.evalquiz.com/test-calcul" />
<link rel="alternate" hreflang="x-default" href="https://brain-games.evalquiz.com/arithmetic-games" />
          
            </Helmet>
 <div className="hero-small">
                <img
                    src="/pres/calcul.webp"
                    alt=""
                    className="hero-image"
                />

                <div className="hero-content">
                    <h1>Les défis du calcul mental</h1>
                    <p>Relevez des défis numériques pour entraîner votre vivacité d'esprit.</p>
                </div>
            </div>      <GraphiqueRapidite categorie='c' recupererResultatJoueur={this.recupererResultatJoueur}></GraphiqueRapidite>
        <div className='centre'> <div className='fontMoyenne bandeauLien'>Rejoins-nous sur <a href="https://discord.gg/hyGc2PD5T6">Discord</a></div>
        </div> <p>Discord est une messagerie comme WhatsApp, trés utilisé dans le monde des jeux vidéo.</p>

   <Ad></Ad>
      <div className="jeuVitesse marge20">
        {listeJeuxCalcul.map((info) => (
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
  <h2>Des tests de calcul mental gratuits en ligne pour tous les niveaux scolaires</h2>
  <p>
    Entraîne-toi au calcul mental grâce à nos exercices gratuits en ligne, adaptés au <strong>CM1</strong> et <strong>CM2</strong> jusqu'à la <strong>6e</strong> et la <strong>3e</strong>. Chaque jeu est rapide, ludique et conçu pour améliorer ta <strong>concentration</strong>, ta <strong>rapidité</strong> et ta <strong>précision</strong> en mathématiques.
  </p>

  <h3>Des jeux variés pour progresser à ton rythme</h3>
  <p>
    Les exercices proposés couvrent plusieurs compétences&nbsp;: retrouver un résultat à partir de six nombres, colorier une fraction, résoudre des opérations simples le plus vite possible, pointer les bonnes cases dans une grille, remettre une opération dans le bon ordre ou encore rendre la monnaie à un client.  
    Certains jeux sont <strong>faciles</strong> et parfaits pour les niveaux CM1 et CM2, tandis que d'autres sont plus <strong>difficiles</strong> et idéaux pour les élèves de la 6e à la 3e ou pour les adultes qui veulent se challenger.
  </p>

  <h3>Convient aussi parfaitement aux adultes</h3>
  <p>
    Les adultes peuvent utiliser ces tests pour entretenir leur <strong>agilité mentale</strong>, améliorer leur <strong>concentration</strong> et garder un esprit vif. Les jeux rapides comme les opérations chronométrées ou la monnaie sont parfaits pour stimuler le cerveau en quelques minutes par jour.
  </p>

  <h3>Un excellent entraînement pour la concentration</h3>
  <p>
    Le calcul mental est l'un des meilleurs moyens de renforcer la <strong>concentration</strong> et la <strong>réflexion rapide</strong>. Les jeux chronométrés présents sur cette page t'obligent à rester attentif, à analyser vite et à prendre des décisions précises sous pression.
  </p>

  <h3>Gratuit, en ligne et sans inscription</h3>
  <p>
    Tous les tests sont entièrement <strong>gratuits</strong> et accessibles directement en ligne, sans création de compte. Tu peux jouer à ton rythme, suivre tes scores et tenter de monter dans le classement du mois. Une manière simple, rapide et motivante de progresser en calcul mental.
  </p>

  <p>
    Que tu sois élève, parent, adulte ou senior, ces jeux de calcul mental t'aideront à progresser, à renforcer ta concentration et à garder ton cerveau en pleine forme.
  </p>
</div>

     <div className='autreVitesse centre'> <a href="/">Les autres catégories</a> </div>

       </div>
  }
}
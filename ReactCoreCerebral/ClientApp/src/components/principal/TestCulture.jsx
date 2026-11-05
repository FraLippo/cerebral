import GraphiqueRapidite from '../commun/GraphiquesRapidité';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import Ad from '../commun/adSense';
import '../../style/jeux.css';


import { Helmet } from 'react-helmet';
import { listeJeuxCulture } from '../commun/dataListeJeux';
import Regles from '../commun/Regles';


export default class TestCulture extends Component {

  constructor() {
    super();
    this.prenom = '';
    this.state =
    {
      resultatsJoueur: [],
      jeuReglesOuvert: null,

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
        <title>Tests divers sur la culture (musique, langue, code de la route)</title>
        <meta name="description" content="Teste tes compétences pratiques avec des tests interactifs variés sur la musique, le code de la route ou les langues étrangères." />
        <link rel="alternate" hreflang="en" href="https://brain-games.evalquiz.com/culture-games" />
        <link rel="alternate" hreflang="fr" href="https://cerebral.evalquiz.com/test-culture" />
        <link rel="alternate" hreflang="x-default" href="https://brain-games.evalquiz.com/culture-games" />
      </Helmet>
<div className="hero-small">
                <img
                    src="/pres/culture.webp"
                    alt=""
                    className="hero-image"
                />

                <div className="hero-content">
                    <h1>Cultivez votre curiosité</h1>
                    <p>Des défis variés pour enrichir vos connaissances et stimuler votre réflexion.</p>
                </div>
    </div>
        <GraphiqueRapidite categorie='d' recupererResultatJoueur={this.recupererResultatJoueur}></GraphiqueRapidite>
      <div className='centre'> <div className='fontMoyenne bandeauLien'>Rejoins-nous sur <a href="https://discord.gg/hyGc2PD5T6">Discord</a></div>
      </div> <p>Discord est une messagerie comme WhatsApp, trés utilisé dans le monde des jeux vidéo.</p>

      <Ad></Ad>
      <div className="jeuVitesse marge20">
        {listeJeuxCulture.map((info) => (
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
          Écoutez une note et retrouvez-la sur le clavier d'un piano. Vous améliorez ainsi votre <strong>oreille musicale</strong>, votre <strong>mémoire auditive</strong> et votre <strong>attention aux détails</strong>.
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


        <h3>Le test de l'oreille absolue</h3>

        <p>Un test très rapide pour savoir si vous possédez l'oreille absolue. L'oreille absolue permet de reconnaître immédiatement la hauteur de n’importe quelle note de musique. Ce test est aussi un excellent exercice pour celles et ceux qui veulent entraîner leur oreille.</p>


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
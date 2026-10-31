
import { Component } from 'react';
import GraphiqueRapidite from '../commun/GraphiquesRapidité';
import Ad from '../commun/adSense';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Regles from '../commun/Regles';
import { listeJeuxMemoire } from '../commun/dataListeJeux';

export default class TestMemoire extends Component {

  constructor() {
    super();
    this.prenom = '';
    this.state =
    {
      resultatsJoueur: [],
      jeuReglesOuvert: null

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
        <link rel="alternate" hreflang="x-default" href="https://brain-games.evalquiz.com/memory-games" />
      </Helmet>
      <h1 className="titre couleurTitre centre">Bilan mémoire : testez votre mémoire</h1>
      <p className='centre'>Évaluez vos capacités de mémorisation à travers une série de jeux interactifs conçus pour faire un bilan complet de votre mémoire.</p>
      <GraphiqueRapidite categorie='m' recupererResultatJoueur={this.recupererResultatJoueur}></GraphiqueRapidite>
      <div className='centre'> <div className='fontMoyenne bandeauLien'>Rejoins-nous sur <a href="https://discord.gg/hyGc2PD5T6">Discord</a></div>
      </div> <p>Discord est une messagerie comme WhatsApp, trés utilisé dans le monde des jeux vidéo.</p>

      <Ad></Ad>
      <div className='jeuVitesse marge20'>
        {listeJeuxMemoire.map((info) =>
          <div
            className={`carte-jeu ${this.state.resultatsJoueur[info.nom] != null ? "dejaFaitCognito" : ""}`}
            key={info.nom}
          >
            <Link to={`/${info.nom}`}>
              <div className="jeu-emoji">{info.emoji}</div>

              <h3>{info.titre}</h3>

              <p className="jeu-benefice">
                {info.sousTitre}
              </p>
            </Link>
            <div className="jeu-infos">
              <p className='centre'>{this.state.resultatsJoueur[info.nom] != null ? "Ton score : " + this.state.resultatsJoueur[info.nom] : "📊 Pas encore de résultat"}</p>
              <div className="centre fontMoyenne"><Link to={`/classement/${info.nom}`}>🏆 Classement</Link></div>
            </div>

            <button className="btn-regles" onClick={(e) => {
              e.preventDefault();
              this.setState({ jeuReglesOuvert: info })
            }
            }>
              Voir les règles
            </button>
          </div>
        )}
      </div>
      <Regles
        jeu={this.state.jeuReglesOuvert?.regles}
        open={this.state.jeuReglesOuvert !== null}
        onClose={() => this.setState({ jeuReglesOuvert: null })}
      />

      <div className="table-responsive">
        <table className="tableau-memoire">
          <thead>
            <tr>
              <th>Jeu</th>
              <th>Type de mémoire</th>
              <th>Exemple du quotidien</th>
              <th>Sensibilité au déclin lié à l'âge</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>🖼️ Lignes brisées</strong></td>
              <td>Visuo-spatiale</td>
              <td>Retrouver son chemin ou visualiser un trajet sans GPS</td>
              <td className="centre"><strong>++</strong></td>
            </tr>
            <tr>
              <td><strong>🐺 Attrape le loup</strong></td>
              <td>Séquentielle &amp; Réactivité</td>
              <td>Réagir rapidement face à un imprévu sur la route</td>
              <td className="centre"><strong>++</strong></td>
            </tr>
            <tr>
              <td><strong>🎗️ La mémoire longue</strong></td>
              <td>Mémorisation à long terme</td>
              <td>Retenir une liste de courses ou un rendez-vous à venir</td>
              <td className="centre"><strong>+</strong></td>
            </tr>
            <tr>
              <td><strong>🎩 Le jeu du memory</strong></td>
              <td>Visuelle &amp; Repérage</td>
              <td>Se souvenir d'où on a posé ses clés ou ses lunettes</td>
              <td className="centre"><strong>+</strong></td>
            </tr>
            <tr>
              <td><strong>✅ Mémoire des nombres</strong></td>
              <td>Mémoire de travail <em>(Chiffres)</em></td>
              <td>Retenir un code SMS de validation le temps de le saisir</td>
              <td className="centre"><strong>++</strong></td>
            </tr>
            <tr>
              <td><strong>🔺 Mémoire des formes</strong></td>
              <td>Visuelle des détails</td>
              <td>Reconnaître un visage, un logo ou un objet précis</td>
              <td className="centre"><strong>+</strong></td>
            </tr>
            <tr>
              <td><strong>🔵 Se souvenir des cercles</strong></td>
              <td>Spatial des emplacements</td>
              <td>Se rappeler dans quel rayon est rangé un produit en magasin</td>
              <td className="centre"><strong>+</strong></td>
            </tr>
            <tr>
              <td><strong>🐈‍⬛ L'animal précédent</strong></td>
              <td>Concentration rapide <em>(N-back)</em></td>
              <td>Suivre le fil d'une conversation rapide à plusieurs personnes</td>
              <td className="centre"><strong>++</strong></td>
            </tr>
          </tbody>
        </table>

        <p className="legende-declin">
          <small>
            <strong>Légende :</strong><br></br>
            <strong>+</strong> : Déclin modéré (facile à maintenir avec un peu de pratique).<br></br>
            <strong>++</strong> : Déclin plus sensible à l'âge (réagit très bien à l'entraînement cérébral régulier).
          </small>
        </p>
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
    </div >
  }
}
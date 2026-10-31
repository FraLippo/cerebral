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
            <title>Tests de planification mentale</title>
            <meta name="description" content="Découvrez nos tests de planification mentale conçus pour évaluer et améliorer vos compétences en organisation et en gestion du temps. Testez votre capacité à planifier, anticiper et résoudre des problèmes complexes avec nos outils interactifs." />     
            <link rel="alternate" hreflang="en" href="https://brain-games.evalquiz.com/planning-games" />
<link rel="alternate" hreflang="fr" href="https://cerebral.evalquiz.com/test-planification" />
<link rel="alternate" hreflang="x-default" href="https://brain-games.evalquiz.com/planning-games" />
               </Helmet>

      <h1 className="titre couleurTitre centre">Les tests de planification</h1>
      <p className='centre'>Développez votre esprit stratégique et améliorez vos compétences en planification avec nos jeux stimulants et captivants !</p>

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
<h2>Les tests de planification</h2>
      <p>La planification est une compétence essentielle qui nous aide à organiser et à anticiper les actions nécessaires pour atteindre nos objectifs. Cela implique de savoir quelles étapes suivre, dans quel ordre, et comment utiliser nos ressources efficacement. Chacun a une capacité de planification différente, influencée par des facteurs comme la flexibilité du cerveau et les connexions neuronales. Si notre capacité à planifier est altérée, des tâches quotidiennes comme organiser un événement ou suivre des instructions peuvent devenir plus difficiles. Heureusement, cette compétence peut être améliorée grâce à nos exercices mentaux et de bonnes habitudes. </p>

     <div className='autreVitesse centre'> <a href="/">Les autres catégories</a> </div>

      </div>
  }
}
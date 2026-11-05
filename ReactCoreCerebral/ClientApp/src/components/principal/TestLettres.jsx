import GraphiqueRapidite from '../commun/GraphiquesRapidité';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import Ad from '../commun/adSense';
import '../../style/jeux.css';
import genmots from '../../images/genmots.png'



import { Helmet } from 'react-helmet';
import { listeJeuxLettre } from '../commun/dataListeJeux';
import Regles from '../commun/Regles';


export default class TestLettres extends Component {

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
            <title>Jeux de mots gratuits</title>
            <meta name="description" content="Découvrez une collection de jeux captivants pour tester et améliorer votre habileté avec les mots et affiner vos compétences verbales."></meta>
            <link rel="alternate" hreflang="en" href="https://brain-games.evalquiz.com/words-games" />
<link rel="alternate" hreflang="fr" href="https://cerebral.evalquiz.com/test-lettres" />
<link rel="alternate" hreflang="x-default" href="https://brain-games.evalquiz.com/words-games" />
       
       
            </Helmet>
   <div className="hero-small">
                <img
                    src="/pres/mots.webp"
                    alt=""
                    className="hero-image"
                />

                <div className="hero-content">
                    <h1>Jouer avec les mots</h1>
                    <p>Des défis de vocabulaire pour enrichir votre expression et stimuler votre réflexion.</p>
                </div>
            </div>
          <GraphiqueRapidite categorie='l' recupererResultatJoueur={this.recupererResultatJoueur}></GraphiqueRapidite>
        <div className='centre'> <div className='fontMoyenne bandeauLien'>Rejoins-nous sur <a href="https://discord.gg/hyGc2PD5T6">Discord</a></div>
        </div> <p>Discord est une messagerie comme WhatsApp, trés utilisé dans le monde des jeux vidéo.</p>

      <Ad></Ad>
      <div className="jeuVitesse marge20">
        {listeJeuxLettre.map((info) => (
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
<h2>Nos autres jeux de mots</h2>
<p>Vous aimez les jeux de mots et de lettres ? N'hésitez pas à essayer nos jeux sur les mots et les lettres quotidiens. Un nouveau défi chaque jour !</p>
            <div className='plateauCategorie'>
        <a href='https://concours.evalquiz.com/pres-jeux-du-jour'>   <div className='categorieVitesse' style={{backgroundColor : 'lavender'}}>
    <div className='titreCategorie'>Jeux de mots quotidiens</div>
    <div className='imageCategorie'>📝</div>
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
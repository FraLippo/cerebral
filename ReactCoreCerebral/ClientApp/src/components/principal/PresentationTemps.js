import SousMenu from './SousMenu';
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Ad from '../commun/adSense';
import '../../style/vitesse.css';
import border from '../../images/border.png';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import pres from '../../images/pres.png';


export default class PresentationTemps extends Component {



  render() {
    return <div>
      <Helmet>
        <title>Sport cérébral et jeux de réflexion</title>
        <meta name="description" content="Des jeux de réflexion pour faire travailler son cerveau tout en s'amusant. Tous les jeux sont accessibles en ligne gratuitement, ils peuvent être pratiqués aussi bien par les enfants que les adultes." />
      </Helmet>
      <h1 className="titre centre couleurTitre">Sport cérébral et jeux de réflexion</h1>
      <div className='centre'>evalquiz : le site numéro 1 du divertissement intelligent</div>
      <div className="centre"><img src={pres} width="200" height="176" alt="fleur"></img></div>
      <Row gutter={8} className="espaceHaut">
        <Col md={24}>
          <p>Nous vous proposons une série de tests simples et de petits jeux de réflexion pour faire travailler son cerveau en espérant améliorer ses capacités cognitives et son intelligence. Tous les jeux sont gratuits et ne nécessitent aucune inscription.</p>
          <p>Chaque série de tests stimule une partie du cerveau différente : la mémoire, la capacité de concentration, la vitesse de réaction, le discernement des couleurs et des formes...</p>
          <p>Les tests sont simples à comprendre et peuvent être réalisés par des juniors ou des seniors.</p>
          <p>Les tests ne sont en aucun cas des tests scientifiques. Ce sont surtout des petits jeux de réflexion qui servent à évaluer ses capacités par rapport aux autres. A la fin de chaque jeu vous obtenez votre classement et votre position par rapport aux autres utilisateurs.</p>

          <Ad></Ad>
          <div className="centre"><img src={border} alt="bordure" width="100" height="41" ></img></div>

        </Col>
      </Row>
      <h1>Nos jeux d'entrainement cérébral</h1>
      <p>Tous nos jeux en ligne sont gratuits et ne nécessitent pas d'inscription. Vous pouvez recommencer autant de fois que vous le désirez. Nous demandons simplement le prénom pour établir des classements. </p>
      <div className="presentationJeu">
        <div className="centre fontMoyenne titreVitesse"><Link to='vitesseCouleur'>Jeu de reconnaissance des couleurs</Link></div>
        <p className="marge20">But du jeu : Reconnaitre la couleur dans laquelle est écrit un mot. La difficulté provient du fait  que le mot affiché est une couleur.
          Par exemple si l'on écrit le mot "rouge" en vert. Le but est de reconnaitre la couleur verte. Rassurez-vous vous comprendrez très vite en jouant. Vous avez 40 s pour réaliser le meilleur score, vous gagnez un point par bonne réponse, chaque faute retranche 2 points à votre score.</p>
        <div>Intêret du jeu :</div>
        <ul>
          <li>Développe la perception des couleurs</li>
          <li>Améliore la mémoire</li>
          <li>Développe la coordination œil-main</li>
          <li>Améliore la vitesse de traitement de l'information visuelle </li>
        </ul>
        <div className="centre fontMoyenne"><Link to='classement/vitesseCouleur'>Classement</Link></div>

      </div>
      <div className="presentationJeu marge20">
        <div className="centre fontMoyenne titreVitesse"><Link to='vitesseSolitaire'>Jeu de la tuile solitaire</Link></div>
        <p className="marge20">But du jeu : Retrouver la tuile solitaire parmi un ensemble de tuiles. Vous avez 60 s pour réaliser le meilleur score, le score augmente par multiple de 2. La première tuile trouvée vous donne 2 points, la seconde 4 points, etc...   </p>
        <div>Intêret du jeu :</div>
        <ul>
          <li>Développe la perception des élements</li>
          <li>Améliore la concentration</li>
          <li>Améliore la vitesse de traitement de l'information visuelle</li>
          <li>Augmente la capacité d'analyse</li>
        </ul>
        <div className="centre fontMoyenne"><Link to='classement/vitesseSolitaire'>Classement</Link></div>
      </div>

      <div className="presentationJeu marge20">
        <div className="centre fontMoyenne titreVitesse"><Link to='vitesseIntrus'>Repérer les différences</Link></div>
        <p className="marge20">But du jeu : Repérer tous les intrus dans une grille de 3x3 c'est-à-dire toutes les images qui ne correspondent pas à l'image de référence. Vous avez 60 s pour réaliser le meilleur score, +1 point par bonne réponse, -2 points par mauvaise réponse.</p>
        <div>Intêret du jeu :</div>
        <ul>
          <li>Améliore la concentration et l'attention</li>
          <li>Développe les compétences visuelles</li>
          <li>Améliore la mémoire</li>

        </ul>
        <div className="centre fontMoyenne"><Link to='classement/vitesseIntrus'>Classement</Link></div>
      </div>

      <div className="presentationJeu marge20">
        <div className="centre fontMoyenne titreVitesse"><Link to='vitesseOrdre'>Remettre des nombres dans l'ordre</Link></div>
        <p className="marge20">But du jeu : Remettre dans l'ordre des nombres entre 1 et 100. Vous avez 60 s pour réaliser le meilleur score, vous gagnez un point si vous placez un nombre dans le bon ordre.</p>
        <div>Intêret du jeu :</div>
        <ul>
          <li>Améliore la capacité de traitement de l'information</li>
          <li>Développe les compétences de prise de décision</li>
          <li>Développe les compétences en résolution de problèmes</li>
          <li>Renforce les compétences en mathématiques de base (comparaison de nombres)</li>
        </ul>
        <div className="centre fontMoyenne"><Link to='classement/vitesseOrdre'>Classement</Link></div>
      </div>

      <div className="presentationJeu marge20">
        <div className="centre fontMoyenne titreVitesse"><Link to='vitessePaire'>Se souvenir de l'animal précédent</Link></div>
        <p className="marge20">But du jeu : On vous montre une suite d'images d'animaux, vous devez indiquer si l'animal que vous avez vu juste avant est le même que l'animal affiché. Vous avez 30 s pour obtenir le meilleur score, +1 point par bonne réponse, -3 points par mauvaise réponse.</p>
        <div>Intêret du jeu :</div>
        <ul>
          <li>Améliore la mémoire à court terme</li>
          <li>Améliore la concentration</li>
          <li>Développe les capacités cognitives</li>
        </ul>
        <div className="centre fontMoyenne"><Link to='classement/vitessePaire'>Classement</Link></div>
      </div>

      <div className="presentationJeu marge20">
        <div className="centre fontMoyenne titreVitesse"><Link to='vitesseCalcul'>La grille de calcul</Link></div>
        <p className="marge20">But du jeu : On vous donne 9 petits calculs (des additions et des soustractions) dans une grille, vous devez pointer les cases qui sont supérieures ou inférieures à un résultat donné. Vous avez 60 s pour réaliser le meilleur score, +1 par bonne réponse, -1 en cas de mauvaise réponse.</p>
        <div>Intêret du jeu :</div>
        <ul>
          <li>Améliore les compétences en calcul mental</li>
          <li>Améliore la concentration</li>
          <li>Renforce la confiance en soi</li>

        </ul>
        <div className="centre fontMoyenne"><Link to='classement/vitesseCalcul'>Classement</Link></div>
      </div>

      <h2>Nos autres jeux</h2>
      <p>Dans nos défis vous pouvez trouver des autres séries de petits jeux cérebraux.</p>
      <div  className="margeHaut defiVitesse">
        <div  className="carteVitesse">
          <h3>Les défis de la logique</h3>
          <ul>
            <li> <span><a className="espaceVitesseUl" href="/defi/14">Défi puzzle - difficile</a></span></li>
            <li> <span><a href="/defi/35">Défi Binero - facile</a></span></li>
            <li> <span><a href="/defi/36">Défi Picross - facile </a></span></li>
            <li> <span><a href="/defi/37">Défi Binero et Picross</a></span></li>
            <li> <span><a href="/defi/38">Défi Binero - moyen</a></span></li>
            <li> <span><a href="/defi/39">Défi Picross - difficile</a></span></li>
          </ul>
        </div>
        <div className="carteVitesse">
          <h3>Les défis du calcul mental</h3>
          <ul>
            <li> <span><a href="/defi/19">Défi calcul - facile</a></span></li>
            <li> <span><a href="/defi/20">Défi calcul - intermédiaire</a></span></li>
            <li> <span><a href="/defi/21">Défi calcul mental rapide - facile</a></span></li>
            <li> <span><a href="/defi/22">Défi calcul mental rapide - intermédiaire</a></span></li>
            <li> <span><a href="/defi/23">Pour les amateurs de maths mentales - facile</a></span></li>
            <li> <span><a href="/defi/24">Pour les amateurs de maths mentales - intermédiaire</a></span></li>
            <li> <span><a href="/defi/34">Exercices de calcul mental - intermédiaire</a></span></li>
            <li> <span><a href="/defi/11">Défi compte est bon - simple</a></span></li>
          </ul>
        </div>
      </div>

      <div className="margeHaut ">
        <div className="fontMoyenne centre autreVitesse"><a href="/defi">Tous les autres défis et jeux cérébraux</a></div>
    </div>
    <Ad></Ad>
      <p>Le respect de votre vie privée est notre priorité : <a href="https://evalquiz.com/home/choisir">Choisir ses cookies</a></p>
      <h2>Crédits</h2>
      <p>Les icônes de bordure sont l'oeuvre d'<a href="https://thenounproject.com/zzyzz/">Olena Panasovska.</a></p>
      <p>Les cartes Zener sont issues du travail de <a href="https://commons.wikimedia.org/w/index.php?curid=31927664">Mikhail Ryazanov</a></p>
      <p>Les images des animaux et des peintures pour les puzzles proviennent de <a href="https://commons.wikimedia.org/">Wikimedia Commons</a> license:  Creative Commons Attribution 2.0 Generic</p>
      <p>Images puzzle défi : Photo by Tim Gouw, julie aagaard,  Vanessa GarciaP, Pham Hoang Kha, cottonbro,  Julius Silver, Pixabay, Matheus Cenali,  Polina Tankilevitch, Michael Block from Pexels</p>
      <p>L'image de fin pour la victoire (Photo par Andrea Piacquadio from Pexels)</p>
      <p>Les tuiles du mah-jong <a href="http://www.martinpersson.org/">Martin Persson</a></p>
      <p>Vous pouvez nous contacter si vous avez des remarques ou des propositions en consultant la page des <a href="https://evalquiz.com/home/faq">mentions légales.</a></p>
    </div>
  }
}
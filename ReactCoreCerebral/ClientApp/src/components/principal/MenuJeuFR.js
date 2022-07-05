import SousMenu from './SousMenu';
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Ad from '../commun/adSense';
import '../../style/jeux.css';
import border from '../../images/border.png';
import presentation from '../../images/presentation.webp'
import { Helmet } from 'react-helmet';
import concours from '../../images/concours.jpg';

import Tableau from '../commun/Tableau';

import { Link } from 'react-router-dom';


export default class MenuJeuFR extends Component {



  render() {
    return <div>
 <Helmet>
            <title>evalquiz : le sport cérébral</title>
            <meta name="description" content="Des jeux de sports cérébraux pour faire travailler son cerveau tout en s'amusant. Tous les jeux sont accessibles en ligne gratuitement, ils peuvent être pratiqués aussi bien par les enfants que les adultes."/>
        </Helmet>
      <h1 className="titre centre couleurTitre">Sport cérébral</h1>
      <div className='centre'>evalquiz : le site numéro 1 du divertissement intelligent</div>
      <Row className="centre"><img src={border} alt="bordure"></img></Row>
      <Row gutter={8} className="espaceHaut">
        <Col md={24}>
          <p>Nous vous proposons une série de tests simples et de petits jeux pour faire travailler son cerveau en espérant améliorer ses capacités cognitives et son intelligence. Tous les jeux sont gratuits et ne nécessitent aucune inscription.</p>
          <p>Chaque série de tests stimule une partie du cerveau différente : la mémoire, la capacité de concentration, la vitesse de réaction, le discernement des couleurs et des formes...</p>
          <p>Les tests sont simples à comprendre et peuvent être réalisés par des juniors ou des seniors.</p>
          <p>Les tests ne sont en aucun cas des tests scientifiques. Ce sont surtout des petits jeux qui servent à évaluer ses capacités par rapport aux autres. A la fin de chaque jeu vous obtenez votre classement et votre position par rapport aux autres utilisateurs.</p>
          <Row gutter={8}><Col md={8} className="centre"><img className="img-responsive" src={concours} alt="concours"></img></Col>
            <Col md={16}> <h3>Le challenge des mots </h3>
          <p>Vous aimez les jeux de lettres et de mots comme le Boogle, le Scrabble, Motus, les anagrammes ? Alors vous devez essayer notre nouveau <a href="https://concours.evalquiz.com">challenge des lettres et des mots</a>.</p>
        <p>Les jeux sont ouvert à tous (junior ou senior) et ils ne nécessitent pas d'inscription.</p>
        <p>Arrivez-vous à réussir les 32 étapes de notre challenge ?</p>
</Col>
                 </Row>
          
          <Row className="centre"><img src={border} alt="bordure" ></img></Row>

        </Col>

      </Row>


      <Row>
        <h1 className="titre couleurTitre centre">Les défis</h1>
        <Row className="centre"><img src={border} alt="bordure"></img></Row>
        <Row gutter={8} className="espaceHaut">

          <Col md={10}>
            <h2>Pouvez-vous réussir un défi ?</h2>
            <p>Un défi est un ensemble de petits jeux et tests, toutes vos compétences et votre agilité seront nécessaires pour arriver au bout de ces défis.</p>
            <p>Il est préférable de s'entraîner avec les jeux ci-dessous avant de se lancer dans un défi.</p>
            <p>Si vous arrivez à terminer un défi à la première tentative votre prénom sera inscrit sur notre  <Link to="/tableau">tableau honneur</Link>.</p>
          </Col>
          <Col md={14}>
          <SousMenu type="defiCerebral" titre="NOM_DEFI_CEREBRAL"></SousMenu>
            <SousMenu type="defiCalcul" titre="NOM_DEFI_CALCUL"></SousMenu>
            <SousMenu type="defiMot" titre="NOM_DEFI_MOT"></SousMenu>
          </Col>
        </Row>
      </Row>

      <div className="centre"><img src={border} alt="bordure"></img></div>
<h1 className="titre centre">Les tests</h1>
    <Row className="margeHaut">
    <Col xs={12}><Link to="/calcul-mental"><div className="tuile">Calcul mental / Mathématique</div></Link></Col>
    <Col xs={12}><Link to="/puzzle"><div className="tuile">Puzzle</div></Link></Col>
    <Col xs={12}><Link to="/logique"><div className="tuile">Logique</div></Link></Col>
    <Col xs={12}><Link to="/memoire"><div className="tuile">Mémoire</div></Link></Col>
    </Row>



      <div className="centre"><img src={border} alt="bordure"></img></div>
      <div className="centre"><img className="img-responsive" width="1000" height="396" src={presentation} alt="presentation"></img></div>
    <Tableau></Tableau>
      <Row><Ad></Ad></Row>
      <p>Le respect de votre vie privée est notre priorité : <a   href="https://evalquiz.com/home/choisir">Choisir ses cookies</a></p>
      <h2>Crédits</h2>
      <p>Les icônes de bordure sont l'oeuvre d'<a href="https://thenounproject.com/zzyzz/">Olena Panasovska.</a></p>
      <p>Les cartes Zener sont issues du travail de <a href="https://commons.wikimedia.org/w/index.php?curid=31927664">Mikhail Ryazanov</a></p>
      <p>Les images des animaux et des peintures pour les puzzles proviennent de <a href="https://commons.wikimedia.org/">Wikimedia Commons</a> license:  Creative Commons Attribution 2.0 Generic</p>
      <p>Images puzzle défi : Photo by Tim Gouw, julie aagaard,  Vanessa GarciaP, Pham Hoang Kha, cottonbro,  Julius Silver, Pixabay, Matheus Cenali,  Polina Tankilevitch, Michael Block from Pexels</p>
      <p>L'image de fin pour la victoire (Photo par Andrea Piacquadio from Pexels)</p>
      <p>Les icônes des animaux pour le jeu des suites et de la météo pour  le jeu des familles  <a href="https://icon-icons.com/fr/pack/Flat-Animal-Icons/365">icons-icons.com</a></p>
      <p>Les tuiles du mah-jong <a href="http://www.martinpersson.org/">Martin Persson</a></p>
      <p>Vous pouvez nous contacter si vous avez des remarques ou des propositions en consultant la page des <a href="https://evalquiz.com/home/faq">mentions légales.</a></p>
    </div>
  }
}
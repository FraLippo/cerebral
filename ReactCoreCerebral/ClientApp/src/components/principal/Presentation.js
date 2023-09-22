import SousMenu from './SousMenu';
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Ad from '../commun/adSense';
import '../../style/jeux.css';
import border from '../../images/border.png';
import presentation from '../../images/presentation.webp'
import { Helmet } from 'react-helmet';
import concours from '../../images/presentation.jpg';


import Tableau from '../commun/Tableau';

import { Link } from 'react-router-dom';


export default class Presentation extends Component {



  render() {
    return <div>
 <Helmet>
            <title>Sport cérébral et jeux de réflexion</title>
            <meta name="description" content="Des jeux de réflexion pour faire travailler son cerveau tout en s'amusant. Tous les jeux sont accessibles en ligne gratuitement, ils peuvent être pratiqués aussi bien par les enfants que les adultes."/>
        </Helmet>
      <h1 className="titre centre couleurTitre">Sport cérébral et jeux de réflexion</h1>
      <div className='centre'>evalquiz : le site numéro 1 du divertissement intelligent</div>
      <div className="centre"><img src={border} width="100" height="41" alt="bordure"></img></div>
 
      <div>
      <div className="centre marge20 fontMoyenne"><a href="https://docs.google.com/forms/d/e/1FAIpQLSdryjIBFEJam5wua6P2v6EHUafayIQrV4d4_QjHUjiEe7878w/viewform?usp=pp_url">Venez donner votre avis !</a></div>

     <h1 className="titre couleurTitre centre">Les défis</h1>
        <div className="centre"><img src={border} alt="bordure"  width="100" height="41"></img></div>
        <p>Un défi est un ensemble de petits jeux et tests, toutes vos compétences et votre agilité seront nécessaires pour arriver au bout de ces défis.</p>
            <p>Si vous arrivez à terminer un défi à la première tentative votre prénom sera inscrit sur notre tableau honneur.</p>
         <Row gutter={8} className="espaceHaut">

           
          <Col md={10}>  
          <h3>Les jeux cognitifs</h3>
                    <p>Une série de jeux de réflexion à enchainer pour réaliser les défis. On retrouve des défis orientés sur les jeux de logique, de mémoire ou de réflexion. La sélection des jeux comporte des grands classiques comme les jeux Memory, Simon, Picross, Binero... </p>

              </Col>
          <Col md={14}>
          <SousMenu type="defiCerebral" titre="NOM_DEFI_CEREBRAL"></SousMenu>
          </Col>
          </Row>
          <Row gutter={8} className="espaceHaut">
          <Col md={10}>  
          <h3>Les jeux de calcul</h3>
                      <p>Testez votre capacité de calcul en résolvant des opérations mathématiques. Que ce soit en addition, en soustraction, en multiplication ou en division, chaque jeu offre des défis uniques pour affiner vos compétences en calcul. Vous pouvez choisir entre des exercices simples pour les débutants ou des défis plus complexes pour les experts.</p>

              </Col>
              <Col md={14}>
            <SousMenu type="defiCalcul" titre="NOM_DEFI_CALCUL"></SousMenu>
            </Col>
            </Row>
            <Row gutter={8} className="espaceHaut">
            <Col md={10}>
              <h3>Des chiffres et des lettres</h3>
              <p>Découvrez le jeu des chiffres et des lettres, une combinaison captivante de réflexion mathématique et de compétences linguistiques. Mettez votre esprit à l'épreuve en résolvant des calculs arithmétiques complexes et en formant des mots à partir d'un ensemble de lettres données. Ce jeu stimulant est parfait pour les amateurs de défis intellectuels à la recherche d'une expérience divertissante alliant mathématiques et mots.</p>
              </Col>
              <Col md={14}>
            <SousMenu type="defiMot" titre="NOM_DEFI_MOT"></SousMenu>
          </Col>
        </Row>
      </div>
<Ad></Ad>
      <div className="centre"><img src={border} alt="bordure"  width="100" height="41"></img></div>
      <a href="https://cerebral.evalquiz.com">
      <div className="centre "><img src={concours} className="img-responsive" width="600" height="337" alt="présentation concours jeu cognitif"></img></div>
      <div className="centre fontMoyenne">Participer au concours</div>  </a> 
      <div className="centre espaceHaut"><img src={border} alt="bordure"  width="100" height="41"></img></div>
<h1 className="titre centre">Tous les tests</h1>
    <Row className="margeHaut">
    <Col xs={24} sm={12}><Link to="/calcul-mental"><div className="tuile">Calcul mental</div></Link></Col>
    <Col xs={24} sm={12}><Link to="/puzzle"><div className="tuile">Puzzle</div></Link></Col>
    <Col xs={24} sm={12}><Link to="/logique"><div className="tuile">Logique</div></Link></Col>
    <Col xs={24} sm={12}><Link to="/memoire"><div className="tuile">Mémoire</div></Link></Col>
    <Col xs={24} sm={12}><Link to="/chiffres-lettres"><div className="tuile">Des chiffres et des lettres</div></Link></Col>
    </Row>



      <div className="centre"><img src={border} alt="bordure"  width="100" height="41"></img></div>
      <div className="centre"><img className="img-responsive" width="1000" height="396" src={presentation} alt="presentation"></img></div>
    <Tableau></Tableau>
    
      
      <p>Vous pouvez nous contacter si vous avez des remarques ou des propositions en consultant la page des <a href="https://evalquiz.com/home/faq">mentions légales.</a></p>
    </div>
  }
}
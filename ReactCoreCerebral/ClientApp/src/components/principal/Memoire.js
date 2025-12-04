import SousMenu from './SousMenu';
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Ad from '../commun/adSense';
import '../../style/jeux.css';
import border from '../../images/border.png';
import esp from '../../images/esp.webp';
import imagePre from '../../images/imagePre.webp';
import dessin from '../../images/dessin.webp';
import memory from '../../images/memory.webp';
import simon from '../../images/simon.webp';

import { Helmet } from 'react-helmet';


export default class Memoire extends Component {

  constructor()
  {
    super();
  }

  render() {
    return <div>
         <Helmet>
            <title>Jeu cérébral : la mémoire </title>
            <meta name="description" content="Des jeux simples et amusants de sport cérébral axés sur la mémoire. Ces jeux sont disponibles pour les seniors et les juniors, ils sont tous gratuits."/>
        </Helmet>
      <div className="titre centre couleurTitre">Sport cérébral</div>
      <div className='centre'>evalquiz : le site numéro 1 du divertissement intelligent</div>
      <h2 className="titre couleurTitre centre">Les tests de la mémoire</h2>
      <p>Entraînez votre cerveau et stimulez votre mémoire avec une sélection captivante de jeux de mémoire gratuits en ligne pour les adultes ou les enfants. Testez vos capacités de rappel, votre concentration et votre capacité à mémoriser des informations tout en vous amusant. 

Plongez dans un monde d'énigmes et de défis conçus pour exercer votre mémoire à court terme et à long terme. Découvrez des jeux de cartes où vous devez retrouver des paires identiques ou des jeux de séquences où vous devez mémoriser et reproduire des modèles.</p>

<p>Les jeux de mémoire ne sont pas seulement amusants, mais ils sont également bénéfiques pour votre développement cognitif. Ils améliorent votre concentration, votre capacité de rétention et votre vitesse de traitement de l'information. En jouant régulièrement, vous pouvez renforcer votre mémoire et votre capacité d'apprentissage, ce qui peut être utile dans de nombreux aspects de la vie quotidienne.</p>

        
            <div className="centre"><img src={border} alt="bordure" width="100" height="20"></img></div>
            <Ad></Ad>
        <Row gutter={8} className="espaceHaut">
          <Col md={10}>
            <h2>Le Memory</h2>
            <p>Le classique jeu de Memory, vous devez former des paires pour les supprimer de l'espace de jeu.</p>
           <p>Ce test de mémoire est une variante du jeu classique de type Memory car vous pouvez voir tous les éléments qui sont situés dans une même ligne ou colonne pendant quelques instants.</p>
           
            <p>Ce jeu permet d'améliorer votre capacité de concentration et de mémorisation.</p>
            <div className="centre"><img className="img-responsive" width="300" height="139" src={memory} alt="le jeu du memory"></img></div>


          </Col>
          <Col md={14}>
            <SousMenu type="memoryGame" titre="MEMORY_TITLE"></SousMenu>
          </Col>
        </Row>
            <div className="centre"><img src={border} alt="bordure" width="100" height="20"></img></div>
  <Row gutter={8} className="espaceHaut">
          <Col md={10}>
            <h2>Le jeu de Simon</h2>
            <p>Le jeu du Simon évoquera certainement des souvenirs aux plus anciens, il s'agit d'un ancêtre des jeux vidéo modernes dans lequel vous devez reconstituer une séquence après l'avoir vu.</p> 
            <p>Le principe est repris dans ce petit jeu qui vous permettra de tester votre mémoire.</p>
            <div className="centre"><img className="img-responsive" width="300" height="212" src={simon} alt="le jeu du memory"></img></div>


          </Col>
          <Col md={14}>
            <SousMenu type="simon" titre="SIMON_TITLE"></SousMenu>
          </Col>
        </Row>
            <div className="centre"><img src={border} alt="bordure" width="100" height="20"></img></div>
        <Row gutter={8} className="espaceHaut">
          <Col md={10}>
            <h2>Mémoriser des cartes</h2>
            <p>Dans ce jeu des cartes s'affichent pendant quelques secondes vous devez les mémoriser puis reconstituer la liste des cartes.</p>
            <p>Ces tests deviennent rapidement très difficiles dès que le nombre de cartes augmente. Est-il seulement possible de se souvenir de 8 cartes en quelques secondes ? </p>
            <p>Ce test détermine votre capacité à mémoriser des formes et des couleurs. </p>
            <div className="centre"><img className="img-responsive" width="300" height="101" src={esp} alt="jeu memoire carte"></img></div>
          </Col>
          <Col md={14}>
            <SousMenu type="esp" titre="ESP_TITLE"></SousMenu>
          </Col>
        </Row>
            <div className="centre"><img src={border} alt="bordure" width="100" height="20"></img></div>
        <Row gutter={8} className="espaceHaut">
          <Col md={10}>
            <h2>Mémoriser un dessin</h2>
            <p>Un nouveau jeu pour entraîner sa mémoire. Il s'agit de reconstituer un dessin après l'avoir vu pendant quelques secondes.</p>
            <p>Ce test détermine votre capacité à mémoriser des formes et des couleurs dans l'espace. </p>
            <div className="centre"><img className="img-responsive" width="300" height="282" src={dessin} alt="memoire dessin"></img></div>
          </Col>

          <Col md={14}>
            <SousMenu type="memoireDessin" titre="DESSIN_TITLE"></SousMenu>
          </Col>
        </Row>
            <div className="centre"><img src={border} alt="bordure" width="100" height="20"></img></div>
        <Row gutter={8} className="espaceHaut">
          <Col md={10}>
            <h2>Se souvenir de l'image précédente</h2>
            <p>Dans ce test vous voyez apparaitre successivement plusieurs images, il faut cliquer sur un bouton dès que la même image apparait successivement.  </p>
            <p>Un jeu simple qui permet de tester sa mémoire.</p>
            <div className="centre"><img className="img-responsive" width="300" height="98" src={imagePre} alt="jeu mémoire précédent"></img></div>
          </Col>

          <Col md={14}>
            <SousMenu type="suite" titre="SUITE_TITLE"></SousMenu>
          </Col>
        </Row>
 
      <div className="centre"><img src={border} alt="bordure"></img></div>

        </div>
  }
}
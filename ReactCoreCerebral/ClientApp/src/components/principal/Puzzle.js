import SousMenu from './SousMenu';
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Ad from '../commun/adSense';
import '../../style/jeux.css';
import border from '../../images/border.png';
import puzzle from '../../images/puzzle.webp';
import puzzleRotation from '../../images/puzzleRotation.webp';
import { analytics } from '../../components/commun/analytics';
import { Helmet } from 'react-helmet';


export default class Puzzle extends Component {

  constructor()
  {
    super();
    analytics();
  }


  render() {
    return <div>
 <Helmet>
            <title>Sport cérébral : les puzzles</title>
            <meta name="description" content="Des jeux simples et amusants de sport cérébral sur les puzzles et le jeu du mot le plus long. Les tests en ligne sont tous gratuits. Ils ne nécessitent pas d'inscription."/>
        </Helmet>
<div className="titre centre couleurTitre">Jeux d'entrainement cérébral</div>
<div className='centre'>evalquiz.com : le site numéro 1 du divertissement intelligent</div>

    
        <h2 className="titre couleurTitre centre">Les puzzles</h2>
            <div className="centre"><img src={border} alt="bordure" width="100" height="41"></img></div>
        <Row gutter={8} className="espaceHaut">

          <Col md={10}>
            <h2>Puzzle : reconstituer une image</h2>
            <p>Dans ce jeu de type puzzle une image apparaît pendant quelques secondes, vous devez ensuite la reconstituer dans le bon ordre.</p>
            <p>Ce jeu améliore vos capacités de mémorisation et de logique.</p>
            <p>Tous les puzzles en ligne sont gratuits et ne nécessitent aucune inscription.</p>
            <div className="centre"><img className="img-responsive" width="300" height="102" src={puzzle} alt="Les puzzles"></img></div>

          </Col>
          <Col md={14}>
            <SousMenu type="puzzle" titre="PUZZLE_TITLE"></SousMenu>
          </Col>
        </Row>
        
       <Ad></Ad>
            <div className="centre"><img src={border} alt="bordure" width="100" height="41"></img></div>
        <Row gutter={8} className="espaceHaut">
          <Col md={10}>
            <h1>Puzzle : remettre en ordre une image</h1>
            <p>Dans ce jeu de type puzzle vous devez remettre à l'endroit des morceaux d'une image pour reconstituer une image complète. </p>
            <p>Ce jeu améliore la capacité logique du cerveau et la concentration.</p>
            <div className="centre"><img className="img-responsive" width="300" height="170" src={puzzleRotation} alt="puzzle rotation"></img></div>

          </Col>
          <Col md={14}>
            <SousMenu type="puzzleRotation" titre="ROTATION_TITLE"></SousMenu>
          </Col>
        </Row>
     
    
   


         </div>
  }
}
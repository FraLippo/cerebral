import SousMenu from './SousMenu';
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Ad from '../commun/adSense';
import '../../style/jeux.css';
import border from '../../images/border.png';
import puzzle from '../../images/puzzle.webp';
import puzzleRotation from '../../images/puzzleRotation.webp';
import motLong from '../../images/motLong.webp';

import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { Helmet } from 'react-helmet';


export default class MenuJeuFR extends Component {



  render() {
    return <div>
 <Helmet>
            <title>Sport cérébral : les puzzles</title>
            <meta name="description" content="Des jeux simples et amusants de sport cérébral sur les puzzles et le jeu du mot le plus long. Les tests en ligne sont tous gratuits. Ils ne nécessitent pas d'inscription."/>
        </Helmet>
<div className="titre centre couleurTitre">Jeux d'entrainement cérébral</div>
<div className='centre'>evalquiz.com : le site numéro 1 du divertissement intelligent</div>

      <Row>
        <h2 className="titre couleurTitre centre">Les puzzles / Le mot le plus long</h2>
        <Row className="centre"><img src={border} alt="bordure"></img></Row>
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
        <div className="centre"><img src={border} alt="bordure"></img></div>
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
      </Row>
    
      <div className="centre"><img src={border} alt="bordure"></img></div>
        <Row gutter={8} className="espaceHaut">
          <Col md={10}>
            <h2>Le mot le plus long</h2>
            <p>Un jeu qui ressemble au jeu du mot le plus long de l'émission <b>"Des chiffres et des lettres"</b>.</p>
            <p>Vous devez retouver le mot le plus long à partir d'une suite de lettres tirées au hasard. Vous jouez seul contre l'ordinateur.</p>
            <p>Le programme accepte tous les mots et les verbes conjugués. Dans l'esprit des mots acceptés on est plus proche du Scrabble que des chiffres et des lettres. </p>
            <p> La partie se joue en 3 manches, si vous remportez la manche, c'est à dire si vous trouvez un mot plus long que celui de l'ordinateur, vous gagnez 3 points (6 points pour la dernière manche) plus le nombre de lettres du mot.</p>

          </Col>
          <Col md={14}>
            <div> <Card title={<span style={{ whiteSpace: 'normal' }}>Le mot le plus long</span>}>
              <ul>
                <li><Link to={"/JeuxLettres/0/1/1"}>Le mot le plus long niveau facile contre l'ordinateur.</Link></li>
                <li><Link to={"/JeuxLettres/0/1/2"}>Le mot le plus long niveau intermédiaire contre l'ordinateur.</Link></li>
                <li><Link to={"/JeuxLettres/0/1/3"}>Le mot le plus long niveau difficile contre l'ordinateur.</Link></li>
                <li><Link to={"/JeuxLettres/0/1/4"}>Le mot le plus long niveau très difficile contre l'ordinateur.</Link></li>
                <li><Link to={"/JeuxLettres/0/1/5"}>Le mot le plus long niveau impossible contre l'ordinateur (mot de 9 lettres possibles).</Link></li>
              </ul>
              {/* <p>La fréquentation de ce site n'est pas suffisante pour trouver des joueurs en ligne. Vous devez inviter vos propres amis.
            Il suffit de leur envoyer ce lien <b>{process.env.REACT_APP_URL_JEUXLETTRES}/{this.gameNumber}/2/2 </b> <span className="copier" onClick={this.copier}>copier</span> par mail ou par messagerie.
            Ensuite vous devez attendre votre ou vos camarades de jeu (4 au maximum) ou revenir plus tard quand ils seront disponibles, un message est affiché dès qu'un autre joueur vient dans la partie.
            Le lien vers votre salle de jeu ne change pas, vous pouvez venir jouer quand vous le souhaitez, il suffit de se synchroniser avec vos amis pour jouer en même temps.</p>
              <ul>
                <li><Link to={"/JeuxLettres/" + this.gameNumber + "/2/2"}>Jouer au mot le plus long niveau avec vos amis en ligne.</Link></li>
              </ul> */}
            </Card>
              <div className="centre"><img className="espaceHaut img-responsive" width="500" height="66" src={motLong} alt="le mot le plus long"></img></div>
            </div>
          </Col>
        </Row>
 <Ad></Ad>

         </div>
  }
}